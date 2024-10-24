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
  Typography,
  Button as Button2,
  Grid2,
  CircularProgress,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
import CustomerForm from "@/components/materData/CustomerForm";
import { Switch } from "@/components/ui/switch";
import ViewQrCode from "@/components/materData/ViewQrCode";
import ContractForm from "@/components/materData/ContractForm";
import { DatePicker } from "@/components/ui/datePicker";
import data from "@/app/mockData.json";
import { PatrolStatus } from "@/components/siapp/PatrolStatus";
import { TablePatrolRandom } from "@/components/siapp/TablePatrolRandom";
import { IoClose } from "react-icons/io5";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import FloatingLabelBox from "@/components/ui/floatingLabelBox";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import PatrolDeatilView from "@/components/siapp/PatrolDetailView";
import {
  getPatrolRoundData,
  getAllPatrolCheckpointData,
} from "../../../lib/api";

type RowData = {
  dateTime: string;
  startDateTime: string;
  useTime: string;
  customerName: string;
  areaId: string;
  areaName: any;
  round: any;
  checkpointId: string;
  checkpointNo: any;
  checkPointName: any;
  patroller: string;
  status: string;
  allCheckpoints: number; //string[],
  remark: string;
  image: any[];
};

type RandomRowData = {
  endDateTime: string;
  startDateTime: string;
  useTime: string;
  customerName: string;
  areaId: string;
  areaName: any;
  round: any;
  checkpointId: string;
  checkpointNo: any;
  checkPointName: any;
  patroller: string;
  status: string;
  allCheckpoints: number; //string[],
  remark: string;
  image: any[];
};

const rows = [
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 1,
    areaId: 1,
    round: 1,
    checkPointId: 1,
    patroller: "Name Surname (Position)",
    status: 1,
  },
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 2,
    areaId: 2,
    round: 1,
    checkPointId: 2,
    patroller: "Name Surname (Position)",
    status: 2,
  },
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 3,
    areaId: 3,
    round: 2,
    checkPointId: 3,
    patroller: "Name Surname (Position)",
    status: 3,
  },
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 4,
    areaId: 4,
    round: 1,
    checkPointId: 4,
    patroller: "Name Surname (Position)",
    status: 4,
  },
];

// const randomRows: RandomRowData[] = [
//   {
//     date: "10/2/2024",
//     start: "11:52:06",
//     end: "12:52:06",
//     customerId: 1,
//     areaId: "0001",
//     round: 1,
//     checkPointId: 1,
//     patroller: "Name Surname (Position)",
//   },
//   {
//     date: "10/2/2024",
//     start: "11:52:06",
//     end: "12:52:06",
//     customerId: 2,
//     areaId: 2,
//     round: 1,
//     checkPointId: 2,
//     patroller: "Name Surname (Position)",
//   },
//   {
//     date: "10/2/2024",
//     start: "11:52:06",
//     end: "12:52:06",
//     customerId: 3,
//     areaId: 3,
//     round: 2,
//     checkPointId: 3,
//     patroller: "Name Surname (Position)",
//   },
//   {
//     date: "10/2/2024",
//     start: "11:52:06",
//     end: "12:52:06",
//     customerId: 4,
//     areaId: 4,
//     round: 1,
//     checkPointId: 4,
//     patroller: "Name Surname (Position)",
//   },
// ];

const randomRows: RandomRowData[] = [
  {
    endDateTime: "Wed Oct 09 2024 18:00:00 GMT+0700 (GMT+07:00)",
    startDateTime: "Wed Oct 09 2024 18:00:00 GMT+0700 (GMT+07:00)",
    useTime: "12",
    customerName: "cust1",
    areaId: "0001",
    areaName: "area1",
    round: 1,
    checkpointId: "0001",
    checkpointNo: 1,
    checkPointName: "checkpoint1",
    patroller: "Name Surname",
    status: "OnTime",
    allCheckpoints: 1, //string[],
    remark: "remark",
    image: ["textImg"],
  },
];

export default function Patrol() {
  const [rowData, setRowData] = useState<RowData[]>([
    {
      dateTime: "",
      startDateTime: "",
      useTime: "",
      customerName: "",
      areaName: "",
      areaId: "",
      round: 0,
      checkPointName: "",
      checkpointId: "",
      checkpointNo: undefined,
      patroller: "",
      status: "",
      allCheckpoints: 0,
      remark: "",
      image: [],
    },
  ]);
  //const [editMode, setEditMode] = useState(Array(rowData.length).fill(false)); // Array to track edit state for each row
  const [randomRowData, setRandomRowData] = useState(randomRows);
  const [customers, setCustomers] = useState(data.customers);
  const [areas, setAreas] = useState(data.areas);
  const [statusList, setStatusList] = useState(data.patrolStatus);
  const [checkpoints, setCheckpoints] = useState(data.checkpoints);
  const [segments, setSegment] = useState(data.segments);
  const [groups, setGroups] = useState(data.groups);
  const [zones, setZones] = useState(data.zones);
  const [selectedRow, setSelectedRow] = useState<RowData>();
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openPatrolDetailModal, setOpenPatrolDetailModal] =
    useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [selectedSegmentFilter, setSelectedSegmentFilter] = useState();
  const [selectedGroupFilter, setSelectedGroupFilter] = useState();
  const [selectedZoneFilter, setSelectedZoneFilter] = useState();
  const [selectedAreaFilter, setSelectedAreaFilter] = useState();
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState();
  const [roundFilter, setRoundFilter] = useState(0);
  const [checkPointFilter, setCheckPointFilter] = useState(0);
  const [openViewQR, setOpenViewQR] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);
  const [isCheckpointPage, setIsCheckpointPage] = useState<boolean>(true);
  const totalItems = rowData.length;
  const [patrolRounds, setPatrolRounds] = useState<any>();
  const [patrolCheckpoints, setPatrolCheckpoints] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    tableData();
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

  function calCheckpointDiffTime(start: any, end: any) {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime.getTime() - startTime.getTime();
    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return hours + " " + minutes + " " + seconds;
  }

  const tableData = async () => {
    setIsLoading(true);
    const allPatrolRoundData = await getPatrolRoundData();
    console.log("data = ", allPatrolRoundData);
    const allPatrolCheckpointData = await getAllPatrolCheckpointData();
    console.log("patrolCheckpointData = ", allPatrolCheckpointData);
    const tableData: RowData[] =
      allPatrolCheckpointData?.documents.map((chkPt) => {
        return {
          dateTime: formatDate(chkPt.EndTime),
          startDateTime: formatDate(chkPt.StartTime),
          useTime: calCheckpointDiffTime(chkPt.StartTime, chkPt.EndTime),
          customerName: allPatrolRoundData?.documents.find(
            (p) => p.$id === chkPt.PatrolRoundId
          )?.Customer,
          areaId: allPatrolRoundData?.documents.find(
            (p) => p.$id === chkPt.PatrolRoundId
          )?.AreaId,
          areaName: allPatrolRoundData?.documents.find(
            (p) => p.$id === chkPt.PatrolRoundId
          )?.Area,
          round: allPatrolRoundData?.documents.find(
            (p) => p.$id === chkPt.PatrolRoundId
          )?.Round,
          checkpointId: chkPt.$id,
          checkpointNo: chkPt.CheckpointNumber,
          checkPointName: chkPt.CheckpointName,
          patroller: chkPt.Patroller,
          status: chkPt.Status,
          allCheckpoints: allPatrolCheckpointData?.documents.length, //allPatrolRoundData?.documents.find(p => p.$id === chkPt.PatrolRoundId)?.PatrolCheckPointId,
          remark: chkPt.Remark,
          image: chkPt.Image,
        };
      }) || rowData;
    console.log("tableData", tableData);
    setRowData(tableData);
    setIsLoading(false);
  };

  const handleAddNewCust = () => {
    setShowAddCustModal(true);
  };

  const setToggleFilter = () => {
    console.log("openFilterModal =", openFilterModal);
    setOpenFilterModal(!openFilterModal);
  };

  function handleClosePatrolDetailView() {
    setOpenPatrolDetailModal(false);
    //setRowData(rows);
  }

  function handleRoundFilter(operation: any) {
    if (operation === "-") {
      if (roundFilter > 0) {
        setRoundFilter(roundFilter - 1);
      }
    } else if (operation === "+") {
      setRoundFilter(roundFilter + 1);
    }
  }

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

  const handleAddBtnOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpenAddContract(true);
  };

  const handleSelectChkPtPage = (checked: boolean) => {
    if (checked) setIsCheckpointPage(true);
  };

  const handleSelectRandomPage = (checked: boolean) => {
    if (checked) setIsCheckpointPage(false);
  };

  const handleRowClick = async (row: RowData) => {
    setSelectedRow(row);
    console.log("row =", row);

    setOpenPatrolDetailModal(true);
  };

  return (
    <div>
      <Navbar menu={"SIAPP"} submenu={"Patrol"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box className="w-full">
            <Box justifyContent="space-between" className="flex">
              <Box className="space-x-4 py-4 flex w-fit">
                <Box className="justify-center flex p-1 pb-0 bg-white rounded-lg h-10 ">
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={isCheckpointPage}
                    onCheckedChange={handleSelectChkPtPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
                    Check Point
                  </Typography>
                </Box>
                <Box className="justify-center flex p-1 bg-white rounded-lg h-10">
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={!isCheckpointPage}
                    onCheckedChange={handleSelectRandomPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
                    Random
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
                <Grid2 size={{ xs: 1, sm: 4, lg: 12 }}>
                  <Input
                    type="text"
                    placeholder="Search..."
                    style={{
                      boxShadow: "0px 5px 12px rgba(29, 122, 155, 0.1)",
                      borderRadius: "10px",
                    }}
                    className="border-none bg-white p-4 mr-2 w-auto custom-placeholder"
                  />
                </Grid2>

                <Button disabled={true}
                  className="w-auto px-8 bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]"
                  onClick={setToggleFilter}
                >
                  <Filter size={20} style={{ marginRight: "5px" }} /> Filter
                </Button>
              </Box>
            </Box>
          </Box>

          {isCheckpointPage && (
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
                      <TableCell align="center" className="w-[6%]">
                        Date & Time
                      </TableCell>
                      <TableCell align="center" className="w-[22%]">
                        Customer
                      </TableCell>
                      <TableCell align="center" className="w-[20%]">
                        Area
                      </TableCell>
                      <TableCell align="center" className="w-[12%]">
                        Round
                      </TableCell>
                      <TableCell align="center" className="w-[19%]">
                        Check Point
                      </TableCell>
                      {/* Edit button col */}
                      <TableCell align="center" className="w-[11%]">
                        Patroller
                      </TableCell>
                      <TableCell align="center" className="w-[10%]">
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Allow the TableBody to grow and fill vertical space */}
                  <TableBody sx={{ flexGrow: 1 }}>
                    {rowData.map((row, index) => (
                      <TableRow
                        onClick={() => handleRowClick(row)} // Row click handler
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
                        <TableCell align="center">{row.dateTime}</TableCell>

                        {/* Customer */}
                        <TableCell align="center">
                          {/* {
                          customers.find((c) => c.id === row.customerId)
                            ?.customerName
                        } */}
                          {row.customerName}
                        </TableCell>

                        {/* Area */}
                        <TableCell align="center">
                          {/* {row.areaId === null
                          ? "-"
                          : areas.find((a) => a.id === row.areaId)?.name} */}
                          {row.areaName}
                        </TableCell>

                        {/* Round */}
                        <TableCell align="center">
                          {row.round === null ? "-" : row.round}
                        </TableCell>

                        {/* checkpoint name */}
                        <TableCell align="center">
                          {/* {row.checkPointId === null
                          ? "-"
                          : checkpoints.find((ch) => ch.id === row.checkPointId)
                              ?.chkPtName} */}
                          {row.checkPointName}
                        </TableCell>

                        {/* Patroller */}
                        <TableCell align="center">
                          {row.patroller === null ? "-" : row.patroller}
                        </TableCell>

                        {/* Status */}
                        <TableCell
                          align="center"
                          className="flex justify-center"
                        >
                          <PatrolStatus status={row.status} />
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
                          {isCheckpointPage && (
                            <Box className="w-fit flex">
                              <Box className="w-fit p-2">
                                <GradientButton
                                  content={"Customer Report"}
                                  onBtnClick={handleAddNewCust}
                                  disable={true}
                                />
                              </Box>
                              <Box className="w-fit p-2">
                                <GradientButton
                                  content={"Summary"}
                                  onBtnClick={handleAddNewCust}
                                  disable={true}
                                />
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </>
          )}

          {!isCheckpointPage && <TablePatrolRandom />}
        </Box>
      </Box>

      {openPatrolDetailModal && (
        <PatrolDeatilView
          closeModal={handleClosePatrolDetailView}
          checkpoint={selectedRow || rowData[0]}
        />
      )}

      {openFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col">
          <Button
            className="w-24 text-[#1D7A9B] bg-white hover:bg-[#D9F0EC] hover:text-[#1D7A9B] fixed right-6 top-[80px]"
            onClick={() => setOpenFilterModal(false)}
          >
            <Filter size={20} style={{ marginRight: "5px" }} /> Filter
          </Button>
          <div className="bg-white rounded-lg shadow-lg h-[660px] w-[498px] overflow-auto fixed right-6 top-[136px]">
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
                {/* Segment */}
                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Segment"}
                    itemSource={segments}
                    setSelectedVal={setSelectedSegmentFilter}
                    selectedVal={selectedSegmentFilter}
                    name={"segment"}
                    defaultSelected="Select Segment"
                  />
                </Box>

                {/* Group */}
                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Group"}
                    itemSource={groups}
                    setSelectedVal={setSelectedGroupFilter}
                    selectedVal={selectedGroupFilter}
                    name={"group"}
                    defaultSelected="Select Group"
                  />
                </Box>

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

                {/* Zone */}
                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Zone"}
                    itemSource={zones}
                    setSelectedVal={setSelectedZoneFilter}
                    selectedVal={selectedZoneFilter}
                    name={"zone"}
                    defaultSelected="Select Zone"
                  />
                </Box>

                {/* Area */}
                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Area"}
                    itemSource={areas}
                    setSelectedVal={setSelectedAreaFilter}
                    selectedVal={selectedAreaFilter}
                    name={"area"}
                    defaultSelected="Select Area"
                  />
                </Box>

                {/* Round and Checkpoints */}
                <Box className="w-full flex space-x-5">
                  <FloatingLabelBox
                    label={"Round"}
                    field={
                      <>
                        <Button
                          className="w-fit h-fit text-[#1D7A9B] bg-[#D9F0EC] hover:bg-[#D9F0EC]"
                          onClick={() => handleRoundFilter("-")}
                        >
                          <FiMinus size={18} />
                        </Button>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingTop: "0.5rem",
                          }}
                        >
                          {roundFilter === 0 ? "--" : roundFilter}
                        </Typography>
                        <Button
                          className="w-fit h-fit text-[#1D7A9B] bg-[#D9F0EC] hover:bg-[#D9F0EC] "
                          onClick={() => handleRoundFilter("+")}
                        >
                          <FiPlus size={18} />
                        </Button>
                      </>
                    }
                  />

                  <Box className=" w-[80%] justify-center flex p-1 rounded-lg border-[1px] border-[#2C5079] bg-[#EBF4F6]">
                    <Typography className="text-[#2C5079] text-sm px-4 pt-1">
                      {checkPointFilter === 0 ? "--" : checkPointFilter} Check
                      Points
                    </Typography>
                  </Box>
                </Box>

                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Check Points"}
                    itemSource={areas}
                    setSelectedVal={setSelectedAreaFilter}
                    selectedVal={selectedAreaFilter}
                    name={"checkpoints"}
                    defaultSelected="Select Check Points"
                  />
                </Box>

                <Box className="w-full">
                  <LabelSelector
                    selectorLabel={"Patrol Status"}
                    itemSource={areas}
                    setSelectedVal={setSelectedAreaFilter}
                    selectedVal={selectedAreaFilter}
                    name={"patrolstatus"}
                    defaultSelected="Select Patrol Status"
                  />
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

      {isLoading && <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>}
    </div>
  );
}
