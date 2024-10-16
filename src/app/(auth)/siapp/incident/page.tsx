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
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
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
import { getIncidentData, getIncidentTypeData } from "../../../lib/api";

type RowData = {
  rowNo: number;
  dateTime: string;
  customerName: string;
  incidentType: string;
  topic: string;
  reporter: string;
  status: string;
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
  contact: string;
};

export default function Patrol() {
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
    },
  ]);
  const [incidentTypes, setIncidentTypes] = useState<incidentType[]>([
    {
      rowNo: 0,
      incidentTypeTH: "",
      incidentTypeEN: "",
      correctiveAction: "",
      contact: "",
    },
  ]);
  const [customers, setCustomers] = useState(data.customers);
  const [segments, setSegment] = useState(data.segments);
  const [groups, setGroups] = useState(data.groups);
  const [zones, setZones] = useState(data.zones);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false);
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

  useEffect(() => {
    const time = new Date().toLocaleString(); //Output format = 10/2/2024, 1:28:36 PM
    tableData();
    incidentTypeData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

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
    const tableData: RowData[] =
      response?.documents.map((incident, index) => {
        return {
          rowNo: index + 1,
          dateTime: formatDate(incident.$createdAt),
          customerName: incident.Customer,
          incidentType: incident.Incident,
          topic: incident.Topic,
          reporter: incident.Reporter,
          status: incident.Status,
        };
      }) || rowData;
    console.log("incident tableData = ", tableData);
    setRowData(tableData);
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
          contact: type.Contact,
        };
      }) || incidentTypes;
    console.log("incident tableData = ", tableData);
    setIncidentTypes(mapincidentTypes);
  };

  const handleApproved = (index: number) => {
    const approveRow = [...rowData];
    approveRow[index].status =
      approveRow[index].status === "Pending"
        ? "Approved"
        : approveRow[index].status;
    setRowData(approveRow);
    console.log("approveRow =", approveRow);
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
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setSelected(selectedAll);
  };

  return (
    <div>
      <Navbar menu={"SIAPP"} submenu={"Incident"} />
      <Box className='px-2'>
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box className='w-full'>
            <Box justifyContent='space-between' className='flex'>
              <Box className='space-x-4 py-4 flex w-fit'>
                <Box className='justify-center flex p-1 pb-0 bg-white rounded-lg h-10 w-30 '>
                  <Checkbox
                    className='bg-[#EBF4F6] border-none'
                    checked={isIncidentPage}
                    onCheckedChange={handleSelectChkPtPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className='py-1 px-2'>
                    Incident
                  </Typography>
                </Box>
                <Box className='justify-center flex p-1 bg-white rounded-lg h-10'>
                  <Checkbox
                    className='bg-[#EBF4F6] border-none'
                    checked={!isIncidentPage}
                    onCheckedChange={handleSelectRandomPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className='py-1 px-2'>
                    Corrective Action
                  </Typography>
                </Box>
              </Box>

              <Box className='space-x-2 py-4 flex'>
                <Box className='justify-center flex p-1 bg-white rounded-lg'>
                  <DatePicker />
                  <Typography className='text-[#2C5079] text-sm px-4 pt-1'>
                    to
                  </Typography>
                  <DatePicker />
                </Box>
                <Input
                  type='text'
                  placeholder='Search...'
                  style={{
                    boxShadow: "0px 5px 12px rgba(29, 122, 155, 0.1)",
                    borderRadius: "10px",
                  }}
                  className='border-none bg-white p-4 mr-2 min-w-80 custom-placeholder'
                />
                <Button
                  className='w-40 bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]'
                  onClick={setToggleFilter}>
                  <Filter size={20} style={{ marginRight: "5px" }} /> Filter
                </Button>
              </Box>
            </Box>
          </Box>

          {isIncidentPage && (
            <>
              <TableContainer
                className='h-screen bg-white p-2'
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "15px 15px 0px 0px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{ borderBottom: "1px solid #C7D4D7" }}
                      className={`${styles.table}`}>
                      <TableCell align='left' className='w-[12%]'>
                        <Checkbox2
                          className='mt-1 mb-2'
                          checked={isSelectedAll}
                          onCheckedChange={handleCheckAll}
                        />
                      </TableCell>
                      <TableCell align='center' className='w-[8%]'>
                        Date & Time
                      </TableCell>
                      <TableCell align='center' className='w-[22%]'>
                        Customer
                      </TableCell>
                      <TableCell align='center' className='w-[20%]'>
                        Incident Type
                      </TableCell>
                      <TableCell align='center' className='w-[12%]'>
                        Topic
                      </TableCell>
                      <TableCell align='center' className='w-[11%]'>
                        Reporter
                      </TableCell>
                      <TableCell align='center' className='w-[13%]'>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Allow the TableBody to grow and fill vertical space */}
                  <TableBody sx={{ flexGrow: 1 }}>
                    {rowData.map((row, index) => (
                      <TableRow
                        key={index}
                        className={`${
                          index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                        }`}>
                        <TableCell align='left'>
                          <Checkbox2
                            checked={selected[index]?.isSelected}
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click
                              handleSelected(index);
                            }}
                          />
                        </TableCell>

                        <TableCell align='center'>{row.dateTime}</TableCell>

                        {/* Customer */}
                        <TableCell align='center'>{row.customerName}</TableCell>

                        {/* Incedent Type */}
                        <TableCell align='center'>{row.incidentType}</TableCell>

                        {/* Topic */}
                        <TableCell align='center'>
                          {row.topic === null ? "-" : row.topic}
                        </TableCell>

                        {/* Location */}
                        {/* <TableCell align="center">
                          {row.location === null ? "-" : row.location}
                        </TableCell> */}

                        {/* Reporter */}
                        <TableCell align='center'>
                          {row.reporter === null ? "-" : row.reporter}
                        </TableCell>

                        {/* Status */}
                        <TableCell
                          align='center'
                          className='flex justify-center'>
                          <IconButton onClick={() => handleApproved(index)}>
                            <TickCircle
                              size={30}
                              variant='Bold'
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
                className='bg-white border-t'
                sx={{
                  borderRadius: "0px 0px 15px 15px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableFooter className='w-full'>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}>
                          <Typography>Total: {totalItems} items</Typography>
                          <Box className='w-fit flex'>
                            <Box className='w-fit p-2'>
                              <GradientButton
                                content={"Customer Report"}
                                onBtnClick={handleAddNewCust}
                              />
                            </Box>
                            <Box className='w-fit p-2'>
                              <GradientButton
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

      {openFilterModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex flex-col'>
          <Button
            className='w-24 text-[#1D7A9B] bg-white hover:bg-[#D9F0EC] hover:text-[#1D7A9B] fixed right-6 top-[80px]'
            onClick={() => setOpenFilterModal(false)}>
            <Filter size={20} style={{ marginRight: "5px" }} /> Filter
          </Button>
          <div className='bg-white rounded-lg shadow-lg h-fit w-[498px] overflow-auto fixed right-6 top-[136px] pb-2'>
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
              }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Typography
                  sx={{
                    width: "fit-content",
                    fontSize: "1.125rem", // text-lg equivalent
                    fontWeight: "bold",
                    color: "#1D7A9B",
                    marginTop: "0.25rem",
                    marginLeft: "65px",
                    display: "flex",
                  }}>
                  <Filter
                    size={20}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
                </Typography>
              </Box>
              <Button2
                className='bg-transparent float w-fit'
                sx={{ position: "relative", right: 0, color: "#83A2AD" }}
                onClick={() => setOpenFilterModal(false)}>
                <IoClose size={26} />
              </Button2>
            </Box>

            {/* Body */}
            <Box
              className='w-full justify-center px-6 py-2 rounded-t-lg pb-6'
              textAlign='center'>
              <Box className='w-full space-y-6 pt-4'>
                {/* Customer */}
                <Box className='w-full'>
                  <LabelSelector
                    selectorLabel={"Customer"}
                    itemSource={customers}
                    setSelectedVal={setSelectedCustomerFilter}
                    selectedVal={selectedCustomerFilter}
                    name={"customer"}
                    defaultSelected='Select Customer'
                  />
                </Box>

                {/* Incident Type */}
                <Box className='w-full'>
                  <LabelSelector
                    selectorLabel={"Incident Type"}
                    itemSource={segments}
                    setSelectedVal={setSelectedIncidentTypeFilter}
                    selectedVal={selectedIncidentTypeFilter}
                    name={"incidentType"}
                    defaultSelected='Select Incident Type'
                  />
                </Box>

                <Box className='space-y-2'>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      color: "#2C5079",
                      fontSize: "14px",
                      textAlign: "left",
                    }}>
                    Incident Status
                  </Typography>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isIncidentStatusAll
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}>
                    <Checkbox3
                      className='border-[#83A2AD]'
                      onCheckedChange={() =>
                        setIsIncidentStatusAll(!isIncidentStatusAll)
                      }
                      checked={isIncidentStatusAll}
                    />
                    <Typography sx={{ color: "#2C5079" }} className='py-1 px-2'>
                      All
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isIncidentStatusSolved
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}>
                    <Checkbox3
                      className='border-[#83A2AD]'
                      onCheckedChange={() =>
                        setIsIncidentStatusSolved(!isIncidentStatusSolved)
                      }
                      checked={isIncidentStatusSolved}
                    />
                    <Typography sx={{ color: "#2C5079" }} className='py-1 px-2'>
                      Solved
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isIncidentStatusInProcess
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}>
                    <Checkbox3
                      className='border-[#83A2AD]'
                      onCheckedChange={() =>
                        setIsIncidentStatusInProcess(!isIncidentStatusInProcess)
                      }
                      checked={isIncidentStatusInProcess}
                    />
                    <Typography sx={{ color: "#2C5079" }} className='py-1 px-2'>
                      In process of solving
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <Box className='flex w-full justify-center px-6 pt-1 pb-4'>
              <Box className='space-x-4'>
                <Button className='w-32 h-11 bg-white text-[#F66262] border-[1px] border-[#F66262] hover:text-white hover:bg-[#F66262]'>
                  Reset
                </Button>
                <Button className='w-32 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6] disabled:bg-[#83A2AD]'>
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
