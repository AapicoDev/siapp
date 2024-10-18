"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button as Button2,
  Icon,
  IconButton,
  Grid2,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter, SmsTracking } from "iconsax-react";
import { DatePicker } from "@/components/ui/datePicker";
import data from "@/app/mockData.json";
import { PatrolStatus } from "@/components/siapp/PatrolStatus";
import { TablePatrolRandom } from "@/components/siapp/TablePatrolRandom";
import { TickCircle } from "iconsax-react";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import { TableCorrectiveAction } from "@/components/siapp/TableCorrectiveAction";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import { IoClose } from "react-icons/io5";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import {
  getIncidentData,
  getIncidentTypeData,
  updateIncidentStatus,
} from "../../../lib/api";
import IncidentDeatilView from "@/components/siapp/IncidentDetailView";
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";

type RowData = {
  incidentId: string;
  rowNo: number;
  dateTime: string;
  customerName: string;
  incidentType: string;
  topic: string;
  reporter: string;
  status: string;
  location: string;
  locationName: string;
  detail: string;
  shiftName: string;
  image: string[];
  relatedPerson: string[];
  correctiveDetail: string;
  approvers: string[];
  updatedDateTime: string;
};

type selectedDelete = {
  isSelected: boolean;
  segId: number;
};

type incidentType = {
  rowNo: number;
  incidentTypeTH: string;
  incidentTypeEN: string;
  correctiveAction: string;
  contacts: string[];
  attchments: string[];
};

export default function Incident() {
  //const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState<RowData[]>([
    {
      rowNo: 0,
      dateTime: "",
      customerName: "",
      incidentType: "",
      topic: "",
      reporter: "",
      status: "",
      location: "",
      locationName: "",
      detail: "",
      shiftName: "",
      image: [],
      relatedPerson: [],
      correctiveDetail: "",
      approvers: [],
      updatedDateTime: "",
      incidentId: "",
    },
  ]);
  const [incidentTypes, setIncidentTypes] = useState<incidentType[]>([
    {
      rowNo: 0,
      incidentTypeTH: "",
      incidentTypeEN: "",
      correctiveAction: "",
      contacts: [],
      attchments: [],
    },
  ]);
  const [customers, setCustomers] = useState(data.customers);
  const [segments, setSegment] = useState(data.segments);
  const [groups, setGroups] = useState(data.groups);
  const [zones, setZones] = useState(data.zones);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [openIncidentDeatilView, setOpenIncidentDeatilView] =
    useState<boolean>(false);
  const [confirmApprove, setConfirmApprove] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);
  const [isIncidentPage, setIsIncidentPage] = useState<boolean>(true);
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState();
  const [selectedIncidentTypeFilter, setSelectedIncidentTypeFilter] =
    useState();
  const [isIncidentStatusAll, setIsIncidentStatusAll] = useState(false);
  const [isIncidentStatusSolved, setIsIncidentStatusSolved] = useState(false);
  const [isIncidentStatusInProcess, setIsIncidentStatusInProcess] =
    useState(false);
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      segId: row.rowNo,
    }))
  );
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const totalItems = rowData.length;
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();

  useEffect(() => {
    const time = new Date().toLocaleString(); //Output format = 10/2/2024, 1:28:36 PM
    tableData();
    incidentTypeData();
  }, []);

  const formatDate = (dateString: string, isUTC7: boolean = false) => {
    let date = new Date(dateString);
    date = isUTC7 ? new Date(date.getTime() + 7 * 60 * 60 * 1000) : date;

    const day = String(date.getUTCDate()).padStart(2, "0"); // Get day and pad with 0 if necessary
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}/${month}/${year}\n@${hours}:${minutes}:${seconds}`;
  };

  const tableData = async () => {
    const response = await getIncidentData();
    console.log("incident =", response?.documents);
    const reOrder = response?.documents.sort((a, b) => {
      return new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime();
    });
    console.log("reOrder Incident Data =", reOrder);
    const tableData: RowData[] =
      response?.documents.map((incident, index) => {
        return {
          incidentId: incident.$id,
          rowNo: index + 1,
          dateTime: formatDate(incident.DateTime, false),
          customerName: incident.Customer,
          incidentType: incident.Incident,
          topic: incident.Topic,
          reporter: incident.Reporter,
          status: incident.Status,
          location: incident.Location,
          locationName: incident.LocationName,
          detail: incident.Detail,
          shiftName: incident.ShiftName,
          image: incident.Image,
          relatedPerson: incident.RelatedPerson,
          correctiveDetail: incident.CorrectiveDetail,
          approvers: incident.Approvers,
          updatedDateTime: formatDate(incident.$updatedAt, true),
        };
      }) || rowData;
    console.log("incident tableData = ", tableData);
    setRowData(tableData);
    const mapSelect = tableData.map((row) => ({
      isSelected: false,
      segId: row.rowNo,
    }));
    setSelected(mapSelect);
  };

  const incidentTypeData = async () => {
    const response = await getIncidentTypeData();
    console.log("incidentType =", response?.documents);
    const mapincidentTypes: incidentType[] =
      response?.documents.map((type, index) => {
        return {
          rowNo: index + 1,
          incidentTypeEN: type.IncidentType_EN,
          incidentTypeTH: type.IncidentType_TH,
          correctiveAction: type.CorrectiveAction,
          contacts: type.Contacts,
          attchments: type.Attachments
        };
      }) || incidentTypes;
    console.log("mapincidentTypes = ", mapincidentTypes);
    setIncidentTypes(mapincidentTypes);
  };

  const handleApproved = async (index: number, row: RowData) => {
    const approveRow = [...rowData];
    if (approveRow[index].status === "Pending") {
      const confirmApprove = await confirmDialog(
        "Approve Incident",
        "Do you want to approve this incident?"
      );
      console.log("confirmApprove =", confirmApprove);
      if (confirmApprove) {
        approveRow[index].status = "Approved";
        let dataToSubmit = { ["Status"]: approveRow[index]["status"] };
        const response = await updateIncidentStatus(
          row.incidentId,
          dataToSubmit
        );
        tableData();
        setConfirmApprove(false);
      }
    }
  };

  const handleAddNewCust = () => {};

  const setToggleFilter = () => {
    console.log("openFilterModal =", openFilterModal);
    setOpenFilterModal(!openFilterModal);
  };

  function handleCloseContractForm(isEdit: boolean) {
    if (!isEdit) {
      setOpenAddContract(false);
    } else {
      setOpenEditContract(false);
    }
  }

  const handleEditContract = (selecectedRow: any) => {
    console.log("row =", selecectedRow);
    setSelectedRow(selecectedRow);
    setOpenEditContract(true);
  };

  const handleSelectChkPtPage = (checked: boolean) => {
    if (checked) setIsIncidentPage(true);
  };

  const handleSelectRandomPage = (checked: boolean) => {
    if (checked) setIsIncidentPage(false);
  };

  const handleSelected = (index: number) => {
    const newSelected = [...selected];
    newSelected[index].isSelected = !selected[index].isSelected;
    setSelected(newSelected);
    const isCheckAll = !selected.some((item) => item.isSelected === false);
    if (isCheckAll) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
    console.log("isCheckAll", isCheckAll);
  };

  const handleCheckAll = (checked: boolean) => {
    console.log("checked =", checked);
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setSelected(selectedAll);
  };

  const handleRowClick = async (row: RowData) => {
    setSelectedRow(row);
    console.log("row =", row);
    setOpenIncidentDeatilView(true);
  };

  function handleCloseIncidentDetailView() {
    setOpenIncidentDeatilView(false);
  }

  return (
    <div>
      <Navbar menu={"SIAPP"} submenu={"Incident"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box className="w-full">
            <Box justifyContent="space-between" className="flex">
              <Box className="space-x-4 py-4 flex w-fit">
                <Box className="justify-center flex p-1 pb-0 bg-white rounded-lg h-10 w-30 ">
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={isIncidentPage}
                    onCheckedChange={handleSelectChkPtPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
                    Incident
                  </Typography>
                </Box>
                <Box className="justify-center flex p-1 bg-white rounded-lg h-10 w-fit">
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={!isIncidentPage}
                    onCheckedChange={handleSelectRandomPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
                    Corrective Action
                  </Typography>
                </Box>
              </Box>

              <Box className="space-x-2 py-4 flex">
                <Box className="justify-center flex p-1 bg-white rounded-lg">
                  <DatePicker />
                  <Typography className="text-[#2C5079] text-sm px-4 pt-1">
                    to
                  </Typography>
                  <DatePicker />
                </Box>
                <Grid2 size={{ xs: 6, md: 12 }}>
                  <Input
                    type="text"
                    placeholder="Search..."
                    style={{
                      boxShadow: "0px 5px 12px rgba(29, 122, 155, 0.1)",
                      borderRadius: "10px",
                    }}
                    className="border-none bg-white p-4 mr-2 custom-placeholder"
                  />
                </Grid2>

                <Button
                  className="w-40 bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]"
                  onClick={setToggleFilter}
                >
                  <Filter size={20} style={{ marginRight: "5px" }} /> Filter
                </Button>
              </Box>
            </Box>
          </Box>

          {isIncidentPage && (
            <>
              <TableContainer
                className="h-screen bg-white p-2"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "15px 15px 0px 0px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{ borderBottom: "1px solid #C7D4D7" }}
                      className={`${styles.table}`}
                    >
                      <TableCell align="left" className="w-[12%]">
                        <Checkbox2
                          className="mt-1 mb-2"
                          checked={isSelectedAll}
                          onCheckedChange={handleCheckAll}
                        />
                      </TableCell>
                      <TableCell align="center" className="w-[8%]">
                        Date & Time
                      </TableCell>
                      <TableCell align="center" className="w-[22%]">
                        Customer
                      </TableCell>
                      <TableCell align="center" className="w-[20%]">
                        Incident Type
                      </TableCell>
                      <TableCell align="center" className="w-[12%]">
                        Topic
                      </TableCell>
                      <TableCell align="center" className="w-[11%]">
                        Reporter
                      </TableCell>
                      <TableCell align="center" className="w-[13%]">
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Allow the TableBody to grow and fill vertical space */}
                  <TableBody sx={{ flexGrow: 1 }}>
                    {rowData.map((row, index) => (
                      <TableRow
                        onClick={() => handleRowClick(row)}
                        key={index}
                        className={`${
                          index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                        }`}
                        sx={{
                          cursor: "pointer",
                          "& .MuiTableCell-root": {
                            padding: "10px 20px 10px 20px", // Customize border color
                          },
                          "&:hover": {
                            backgroundColor: "#DCE9EB", // Optional: Change background color on hover
                          },
                        }}
                      >
                        <TableCell align="left">
                          <Checkbox2
                            checked={selected[index].isSelected}
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click
                              handleSelected(index);
                            }}
                          />
                        </TableCell>

                        <TableCell align="center">{row.dateTime}</TableCell>

                        {/* Customer */}
                        <TableCell align="center">{row.customerName}</TableCell>

                        {/* Incedent Type */}
                        <TableCell align="center">{row.incidentType}</TableCell>

                        {/* Topic */}
                        <TableCell align="center">
                          {row.topic === null ? "-" : row.topic}
                        </TableCell>

                        {/* Location */}
                        {/* <TableCell align="center">
                          {row.location === null ? "-" : row.location}
                        </TableCell> */}

                        {/* Reporter */}
                        <TableCell align="center">
                          {row.reporter === null ? "-" : row.reporter}
                        </TableCell>

                        {/* Status */}
                        <TableCell
                          align="center"
                          className="flex justify-center"
                        >
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApproved(index, row);
                            }}
                          >
                            <TickCircle
                              size={30}
                              variant="Bold"
                              className={`${
                                row.status === "Approved"
                                  ? `text-[#A7E5A6]`
                                  : `text-[#C7D4D7]`
                              } rounded-full bg-white p-[1px] mt-1`}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* TableFooter*/}
              <TableContainer
                className="bg-white border-t"
                sx={{
                  borderRadius: "0px 0px 15px 15px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
              >
                <Table>
                  <TableFooter className="w-full">
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography>Total: {totalItems} items</Typography>
                          <Box className="w-fit flex">
                            <Box className="w-fit p-2">
                              <Button
                                style={{ fontWeight: "bold" }}
                                className="w-32 h-10 bg-white text-[#4c9bf5] border-[1px] border-[#4c9bf5] hover:text-white hover:bg-[#4c9bf5]"
                                disabled={true}
                              >
                                <SmsTracking className="mr-1" />
                                {/* <SmsTracking className="mr-1"/> */}
                                Email
                              </Button>
                            </Box>

                            <Box className="w-fit p-2">
                              <GradientButton
                              disable={true}
                                content={"Customer Report"}
                                onBtnClick={handleAddNewCust}
                              />
                            </Box>
                            <Box className="w-fit p-2">
                              <GradientButton
                              disable={true}
                                content={"Summary"}
                                onBtnClick={handleAddNewCust}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </>
          )}

          {!isIncidentPage && (
            <TableCorrectiveAction incidentTypes={incidentTypes} />
          )}
        </Box>
      </Box>

      {openIncidentDeatilView && (
        <IncidentDeatilView
          closeModal={handleCloseIncidentDetailView}
          selectedIncident={selectedRow || rowData[0]}
        />
      )}

      {/* Confirm dialog */}
      {ConfirmAlertDialog}

      {openFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col">
          <Button
            className="w-24 text-[#1D7A9B] bg-white hover:bg-[#D9F0EC] hover:text-[#1D7A9B] fixed right-6 top-[80px]"
            onClick={() => setOpenFilterModal(false)}
          >
            <Filter size={20} style={{ marginRight: "5px" }} /> Filter
          </Button>
          <div className="bg-white rounded-lg shadow-lg h-fit w-[498px] overflow-auto fixed right-6 top-[136px] pb-2">
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                backgroundColor: "#D9F0EC",
                paddingY: "5px",
                borderRadius: "8px 8px 0px 0px", // Adjust rounded corners as needed
                justifyContent: "center",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    width: "fit-content",
                    fontSize: "1.125rem", // text-lg equivalent
                    fontWeight: "bold",
                    color: "#1D7A9B",
                    marginTop: "0.25rem",
                    marginLeft: "65px",
                    display: "flex",
                  }}
                >
                  <Filter
                    size={20}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
                </Typography>
              </Box>
              <Button2
                className="bg-transparent float w-fit"
                sx={{ position: "relative", right: 0, color: "#83A2AD" }}
                onClick={() => setOpenFilterModal(false)}
              >
                <IoClose size={26} />
              </Button2>
            </Box>

            {/* Body */}
            <Box
              className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
              textAlign="center"
            >
              <Box className="w-full space-y-6 pt-4">
                {/* Customer */}
                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Customer"}
                    itemSource={customers}
                    setSelectedVal={setSelectedCustomerFilter}
                    selectedVal={selectedCustomerFilter}
                    name={"customer"}
                    defaultSelected="Select Customer"
                  />
                </Box>

                {/* Incident Type */}
                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Incident Type"}
                    itemSource={segments}
                    setSelectedVal={setSelectedIncidentTypeFilter}
                    selectedVal={selectedIncidentTypeFilter}
                    name={"incidentType"}
                    defaultSelected="Select Incident Type"
                  />
                </Box>

                <Box className="space-y-2">
                  <Typography
                    sx={{
                      fontWeight: "700",
                      color: "#2C5079",
                      fontSize: "14px",
                      textAlign: "left",
                    }}
                  >
                    Incident Status
                  </Typography>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isIncidentStatusAll
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsIncidentStatusAll(!isIncidentStatusAll)
                      }
                      checked={isIncidentStatusAll}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                      All
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isIncidentStatusSolved
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsIncidentStatusSolved(!isIncidentStatusSolved)
                      }
                      checked={isIncidentStatusSolved}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                      Solved
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isIncidentStatusInProcess
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsIncidentStatusInProcess(!isIncidentStatusInProcess)
                      }
                      checked={isIncidentStatusInProcess}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                      In process of solving
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <Box className="flex w-full justify-center px-6 pt-1 pb-4">
              <Box className="space-x-4">
                <Button className="w-32 h-11 bg-white text-[#F66262] border-[1px] border-[#F66262] hover:text-white hover:bg-[#F66262]">
                  Reset
                </Button>
                <Button className="w-32 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6] disabled:bg-[#83A2AD]">
                  Apply
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
