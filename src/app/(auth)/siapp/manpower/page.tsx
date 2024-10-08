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
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
import CustomerForm from "@/components/materData/CustomerForm";
import { Switch } from "@/components/ui/switch";
import ContractForm from "@/components/materData/ContractForm";
import { AddButton } from "@/components/ui/buttons/addButton";
import { ViewButton } from "@/components/ui/buttons/viewButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { DatePicker } from "@/components/ui/datePicker";
import data from "@/app/mockData.json";
import { PatrolStatus } from "@/components/siapp/PatrolStatus";
import { TablePatrolRandom } from "@/components/siapp/TablePatrolRandom";
import { TickCircle } from "iconsax-react";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import { TableCorrectiveAction } from "@/components/siapp/TableCorrectiveAction";
import { TableDailyManpower } from "@/components/siapp/TableDailyManpower";
import { IoClose } from "react-icons/io5";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3";

type RowData = {
  dateTime: string;
  customerId: number;
  shift: any;
  amount: any;
  present: any;
  absent: any;
  ot: any;
  otReserve: any;
  otHoliday: any;
  otHolidayReserve: any;
  normalManpower: any;
  specialManpower: any;
};

const rows: RowData[] = [
  {
    dateTime: "10/2/2024",
    customerId: 1,
    shift: "07:00 - 18:00 (จ-ส)",
    amount: 5,
    present: 5,
    absent: 0,
    ot: 0,
    otReserve: 0,
    otHoliday: 0,
    otHolidayReserve: 0,
    normalManpower: 0,
    specialManpower: 0,
  },
  {
    dateTime: "10/2/2024",
    customerId: 2,
    shift: "07:00 - 18:00 (จ-ส)",
    amount: 5,
    present: 5,
    absent: 0,
    ot: 0,
    otReserve: 0,
    otHoliday: 0,
    otHolidayReserve: 0,
    normalManpower: 0,
    specialManpower: 0,
  },
  {
    dateTime: "10/2/2024",
    customerId: 3,
    shift: "07:00 - 18:00 (จ-ส)",
    amount: 5,
    present: 5,
    absent: 0,
    ot: 0,
    otReserve: 0,
    otHoliday: 0,
    otHolidayReserve: 0,
    normalManpower: 0,
    specialManpower: 0,
  },
  {
    dateTime: "10/2/2024",
    customerId: 4,
    shift: "07:00 - 18:00 (จ-ส)",
    amount: 5,
    present: 5,
    absent: 0,
    ot: 0,
    otReserve: 0,
    otHoliday: 0,
    otHolidayReserve: 0,
    normalManpower: 0,
    specialManpower: 0,
  },
];
const totalItems = rows.length;

export default function Manpower() {
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows);
  const [incidentTypes, setIncidentTypes] = useState(data.incidentTypes);
  const [customers, setCustomers] = useState(data.customers);
  const [segments, setSegment] = useState(data.segments);
  const [groups, setGroups] = useState(data.groups);
  const [zones, setZones] = useState(data.zones);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openDailyFilterModal, setOpenDailyFilterModal] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);
  const [isSummaryPage, setIsSummaryPage] = useState<boolean>(true);
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState();
  const [selectedShiftFilter, setSelectedShiftFilter] = useState();
  const [isWorkStatusAll, setIsWorkStatusAll] = useState(false);
  const [isWorkStatusWork, setIsWorkStatusWork] = useState(false);
  const [isWorkStatusNoWork, setIsWorkStatusNoWork] = useState(false);
  const [isWorkStatusPresent, setIsWorkStatusPresent] = useState(false);
  const [isWorkStatusAbsent, setIsWorkStatusAbsent] = useState(false);
  const [isWorkStatusOT, setIsWorkStatusOT] = useState(false);
  const [isWorkStatusLate, setIsWorkStatusLate] = useState(false);

  useEffect(() => {
    const time = new Date().toLocaleString(); //Output format = 10/2/2024, 1:28:36 PM
  }, []);

  const handleAddNewCust = () => {};

  const setToggleFilter = () => {
      setOpenFilterModal(!openFilterModal);
  };

  function handleCloseCustomerForm(isEdit: boolean) {
    if (!isEdit) {
      setShowAddCustModal(false);
    } else {
      setOpenEditCustModal(false);
    }
    setRowData(rows);
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

  const handleSelectChkPtPage = (checked: boolean) => {
    if (checked) setIsSummaryPage(true);
  };

  const handleSelectRandomPage = (checked: boolean) => {
    if (checked) setIsSummaryPage(false);
  };

  return (
    <div>
      <Navbar menu={"SIAPP"} submenu={"Manpower"} />
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
                    checked={isSummaryPage}
                    onCheckedChange={handleSelectChkPtPage}
                  />
                  <Typography sx={{fontWeight: "700", color: "#1D7A9B"}} className="py-1 px-2">
                    Summary
                  </Typography>
                </Box>
                <Box className="justify-center flex p-1 bg-white rounded-lg h-10">
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={!isSummaryPage}
                    onCheckedChange={handleSelectRandomPage}
                  />
                  <Typography sx={{fontWeight: "700", color: "#1D7A9B"}} className="py-1 px-2">
                    Daily
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
                <Input
                  type="text"
                  placeholder="Search..."
                  style={{
                    boxShadow: "0px 5px 12px rgba(29, 122, 155, 0.1)",
                    borderRadius: "10px",
                  }}
                  className="border-none bg-white p-4 mr-2 min-w-80 custom-placeholder"
                />
                <Button
                  className="w-40 bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]"
                  onClick={setToggleFilter}
                >
                  <Filter size={20} style={{ marginRight: "5px" }} /> Filter
                </Button>
              </Box>
            </Box>
          </Box>

          {isSummaryPage && (
            <>
              <TableContainer
                className="h-screen bg-white"
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
                      className={`${styles.table} px-2`}
                    >
                      <TableCell
                        align="center"
                        className="w-[ุ10%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[16%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        Customer
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[16%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        Shift
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ10%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        จำนวนที่จ้าง
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ10%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        มาทำงาน
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ10%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        ขาดงาน
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ10%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        โอทีต่อเนื่อง
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ12%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        โอทีต่อเนื่องสำรอง
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ10%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        โอทีวันหยุด
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ12%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        โอทีวันหยุดสำรอง
                      </TableCell>
                      <TableCell
                        align="center"
                        className="w-[ุ12%]"
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        กำลังพลปกติ
                      </TableCell>
                      <TableCell align="center" className="w-[ุ10%]">
                        กำลังพลพิเศษ
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Allow the TableBody to grow and fill vertical space */}
                  <TableBody sx={{ flexGrow: 1 }}>
                    {rowData.map((row, index) => (
                      <TableRow
                        key={index}
                        className={
                          editMode[index]
                            ? `bg-[#D8EAFF]`
                            : `${
                                index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                              }`
                        }
                        sx={{ borderRight: "1px solid #C7D4D7" }}
                      >
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.dateTime}
                        </TableCell>

                        {/* Customer */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {
                            customers.find(
                              (c) => c.id === row.customerId
                            )?.customerName
                          }
                        </TableCell>

                        {/* Shift*/}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.shift === null
                            ? "-"
                            : row.shift}
                        </TableCell>

                        {/* Amount */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.amount === null ? "-" : row.amount}
                        </TableCell>

                        {/* present */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.present === null ? "-" : row.present}
                        </TableCell>

                        {/* absent */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.absent === null ? "-" : row.absent}
                        </TableCell>

                        {/* ot */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.ot === null ? "-" : row.ot}
                        </TableCell>

                        {/* otReserve */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.otReserve === null ? "-" : row.otReserve}
                        </TableCell>

                        {/* otHoliday */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.otHoliday === null ? "-" : row.otHoliday}
                        </TableCell>

                        {/* otHolidayReserve */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.otHolidayReserve === null ? "-" : row.otHolidayReserve}
                        </TableCell>

                        {/* normalManpower */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.normalManpower === null ? "-" : row.normalManpower}
                        </TableCell>
                        {/* specialManpower */}
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #C7D4D7" }}
                        >
                          {row.specialManpower === null ? "-" : row.specialManpower}
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
                              <GradientButton
                                content={"Customer Report"}
                                onBtnClick={handleAddNewCust}
                              />
                            </Box>
                            <Box className="w-fit p-2">
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

          {!isSummaryPage && (
            <TableDailyManpower />
          )}
        </Box>
      </Box>

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
                    selectorLabel={"Shift"}
                    itemSource={segments}
                    setSelectedVal={setSelectedShiftFilter}
                    selectedVal={selectedShiftFilter}
                    name={"shift"}
                    defaultSelected="Select Shift"
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
                    Work Status
                  </Typography>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isWorkStatusAll
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsWorkStatusAll(!isWorkStatusAll)
                      }
                      checked={isWorkStatusAll}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                      ทั้งหมด
                    </Typography>
                  </Box>
                  {isSummaryPage && (
                    <>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isWorkStatusWork
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsWorkStatusWork(!isWorkStatusWork)
                      }
                      checked={isWorkStatusWork}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                    มีการทำงาน
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isWorkStatusNoWork
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsWorkStatusNoWork(!isWorkStatusNoWork)
                      }
                      checked={isWorkStatusNoWork}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                    ไม่มีการทำงาน
                    </Typography>
                  </Box></>)}

                  {!isSummaryPage && (
                    <>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isWorkStatusPresent
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsWorkStatusPresent(!isWorkStatusPresent)
                      }
                      checked={isWorkStatusPresent}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                    มาทำงาน
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isWorkStatusAbsent
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsWorkStatusAbsent(!isWorkStatusAbsent)
                      }
                      checked={isWorkStatusAbsent}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                    ขาดงาน
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isWorkStatusOT
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsWorkStatusOT(!isWorkStatusOT)
                      }
                      checked={isWorkStatusOT}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                    OT
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isWorkStatusLate
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#83A2AD]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      className="border-[#83A2AD]"
                      onCheckedChange={() =>
                        setIsWorkStatusLate(!isWorkStatusLate)
                      }
                      checked={isWorkStatusLate}
                    />
                    <Typography sx={{ color: "#2C5079" }} className="py-1 px-2">
                    สาย
                    </Typography>
                  </Box>
                  </>)}
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
