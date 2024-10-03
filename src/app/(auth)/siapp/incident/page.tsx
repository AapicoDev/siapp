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
import data from "@/app/mockData.json"
import { PatrolStatus } from "@/components/siapp/PatrolStatus";
import { TablePatrolRandom } from "@/components/siapp/TablePatrolRandom";
import { TickCircle } from "iconsax-react";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import { TableCorrectiveAction } from "@/components/siapp/TableCorrectiveAction";

type RowData = {
  dateTime: string;
  customerId: number;
  incidentId: any;
  topic: any;
  location: any;
  reporter: string;
  status: number;
};

const rows: RowData[] = [
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 1,
    incidentId: 1,
    topic: "แม่บ้าน ASM เกิดอุบัติเหตุที่ศีรษะ",
    location: "บริเวณบ้านจีนอาคาร B ห้องน้ำชาย",
    reporter: "Name Surname (Position)",
    status: 1,
  },
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 2,
    incidentId: 2,
    topic: "Incident’s topic",
    location: "Location",
    reporter: "Name Surname (Position)",
    status: 1,
  },
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 3,
    incidentId: 3,
    topic: "Incident’s topic",
    location: "Location",
    reporter: "Name Surname (Position)",
    status: 2,
  },
  {
    dateTime: "10/2/2024 @11:52:06",
    customerId: 4,
    incidentId: 4,
    topic: "Incident’s topic",
    location: "Location",
    reporter: "Name Surname (Position)",
    status: 2,
  },
];
const totalItems = rows.length;

export default function Patrol() {
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows);
  const [incidentTypes, setIncidentTypes] = useState(data.incidentTypes);
  const [customers, setCustomers] = useState(data.customers); 
  const [segments, setSegment] = useState(data.segments);
  const [groups, setGroups] = useState(data.groups);
  const [zones, setZones] = useState(data.zones);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false)
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false); 
  const [isIncidentPage, setIsIncidentPage] = useState<boolean>(true); 

  useEffect(() => {
    const time = new Date().toLocaleString(); //Output format = 10/2/2024, 1:28:36 PM
  }, []);

  const handleAddNewCust = () => {

  };

  const setToggleFilter = () => {
    console.log("openFilterModal =", openFilterModal);
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
    console.log("row =", selecectedRow)
    setSelectedRow(selecectedRow);
    setOpenEditContract(true)
  }

  const handleSelectChkPtPage = (checked: boolean) => {
    if (checked) setIsIncidentPage(true);
  };

  const handleSelectRandomPage = (checked: boolean) => {
    if (checked) setIsIncidentPage(false);
  };

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
                  <Typography className="py-1 px-2 text-[#1D7A9B] font-bold">
                    Incident
                  </Typography>
                </Box>
                <Box className="justify-center flex p-1 bg-white rounded-lg h-10">
                  <Checkbox className="bg-[#EBF4F6] border-none" 
                    checked={!isIncidentPage}
                    onCheckedChange={handleSelectRandomPage}/>
                  <Typography className="py-1 px-2 text-[#1D7A9B] font-bold">
                    Corrective Action
                  </Typography>
                </Box>
              </Box>

              <Box className="space-x-2 py-4 flex">
                <Box className="justify-center flex p-1 bg-white rounded-lg">
                  <DatePicker/>
                  <Typography className="text-[#2C5079] text-sm px-4 pt-1" >to</Typography>
                  <DatePicker/>
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
                  <TableCell align="center" className="w-[12%]">
                    Location
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
                    key={index}
                    className={
                      editMode[index]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
                  >
                    <TableCell align="center">{row.dateTime}</TableCell>

                    {/* Customer */}
                    <TableCell align="center">
                      {
                        customers.find((c) => c.id === row.customerId) ?.customerName
                      }
                    </TableCell>

                    {/* Incedent Type */}
                    <TableCell align="center">
                      { row.incidentId === null ? "-"
                        : incidentTypes.find((i) => i.id === row.incidentId) ?.desc
                      }
                    </TableCell>

                    {/* Topic */}
                    <TableCell align="center">
                      {row.topic === null ? "-"
                        : row.topic}
                    </TableCell>

                    {/* Location */}
                    <TableCell align="center">
                      {row.location === null
                        ? "-"
                        : row.location}
                    </TableCell>

                    {/* Reporter */}
                    <TableCell align="center">
                      {row.reporter === null ? "-" : row.reporter}
                    </TableCell>

                    {/* Status */}
                    <TableCell align="center" className="flex justify-center">
                      <IconButton>
                        <TickCircle size={30} variant="Bold" 
                                    className={`${
                                      row.status === 1
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
                        <GradientButton content={"Customer Report"} onBtnClick={handleAddNewCust}/>
                      </Box>
                      <Box className="w-fit p-2">
                        <GradientButton content={"Summary"} onBtnClick={handleAddNewCust}/>
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
          <TableCorrectiveAction incidentTypes={incidentTypes}/>
         )}

          
        </Box>
      </Box>

      {openFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col">
          <Button
            className="w-[122px] text-[#1D7A9B] bg-white hover:bg-[#D9F0EC] hover:text-[#1D7A9B] fixed right-6 top-[80px]"
            onClick={() => setOpenFilterModal(false)}
          >
            <Filter size={20} style={{ marginRight: "5px" }} /> Filter
          </Button>
          <div className="bg-white rounded-lg shadow-lg h-[600px] w-[498px] overflow-auto fixed right-6 top-[136px]">
            {/* Header */}
            <Box className="flex w-[full] bg-[#D9F0EC] py-2 rounded-t-lg justify-center">
              <Box className="w-[100%] justify-center flex">
                <Typography className="w-fit text-xl font-semibold text-[#1D7A9B] h-fit mt-1 ml-[78px] flex">
                  <Filter
                    size={20}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
                </Typography>
              </Box>
              <Button2
                className="bg-transparent text-[#83A2AD] float"
                sx={{ position: "relative", right: 0 }}
                onClick={() => setOpenFilterModal(false)}
              >
                <CloseIcon className="w-[26px] h-[26px]" />
              </Button2>
            </Box>

            {/* Body */}
            <Box className="w-full justify-center px-6 py-2 rounded-t-lg pb-6" textAlign="center">
              <Box className="w-full space-y-6 pt-4">

                {/* Segment */}
                <Box className="w-full">
                  <FormControl focused className="w-full">
                    <InputLabel
                      className="text-[#2C5079"
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}>
                      Segment
                    </InputLabel>
                    <Select
                      label="Segment"
                      size="small"
                      displayEmpty
                      value={undefined}
                      // onChange={handleAddSegmentChange}
                      renderValue={(selected) => {
                        if (selected === undefined) {
                          return "Select Segment";
                        }
                        return selected;
                      }}
                      // className={`${ selectedAddSegment === undefined ? `text-[#83A2AD]` : "" }`}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color on focus
                          fontSize: "18px"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}
                    >
                      {segments.map((segment, index) => (
                        <MenuItem
                          key={`${segment.id}-${index}`}
                          value={segment.desc}
                        >
                          {segment.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Group */}
                <Box className="w-full">
                  <FormControl focused className="w-full">
                    <InputLabel
                      className="text-[#2C5079"
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}>
                      Group
                    </InputLabel>
                    <Select
                      label="Group"
                      size="small"
                      displayEmpty
                      value={undefined}
                      // onChange={handleAddSegmentChange}
                      renderValue={(selected) => {
                        if (selected === undefined) {
                          return "Select Group";
                        }
                        return selected;
                      }}
                      // className={`${ selectedAddSegment === undefined ? `text-[#83A2AD]` : "" }`}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color on focus
                          fontSize: "18px"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}
                    >
                      {groups.map((group, index) => (
                        <MenuItem
                          key={`${group.id}-${index}`}
                          value={group.desc}
                        >
                          {group.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Zone */}
                <Box className="w-full">
                  <FormControl focused className="w-full">
                    <InputLabel
                      className="text-[#2C5079"
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}>
                      Zone
                    </InputLabel>
                    <Select
                      label="Zone"
                      size="small"
                      displayEmpty
                      value={undefined}
                      // onChange={handleAddSegmentChange}
                      renderValue={(selected) => {
                        if (selected === undefined) {
                          return "Select Zone";
                        }
                        return selected;
                      }}
                      // className={`${ selectedAddSegment === undefined ? `text-[#83A2AD]` : "" }`}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color on focus
                          fontSize: "18px"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}
                    >
                      {zones.map((zone, index) => (
                        <MenuItem
                          key={`${zone.id}-${index}`}
                          value={zone.desc}
                        >
                          {zone.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Customer */}
                <Box className="w-full">
                  <FormControl focused className="w-full">
                    <InputLabel
                      className="text-[#2C5079"
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}>
                      Customer
                    </InputLabel>
                    <Select
                      label="Customer"
                      size="small"
                      displayEmpty
                      value={undefined}
                      // onChange={handleAddSegmentChange}
                      renderValue={(selected) => {
                        if (selected === undefined) {
                          return "Select Customer";
                        }
                        return selected;
                      }}
                      // className={`${ selectedAddSegment === undefined ? `text-[#83A2AD]` : "" }`}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Customize border color on focus
                          fontSize: "18px"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}
                    >
                      {segments.map((segment, index) => (
                        <MenuItem
                          key={`${segment.id}-${index}`}
                          value={segment.desc}
                        >
                          {segment.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* HR Code & Code */}
                <Box className="w-full flex space-x-5">
                <TextField
                  label="Department"
                  size="small"
                  className="w-full"
                  focused
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        border: "1px solid #1D7A9B", // Focus border color
                        borderRadius: "10px",
                        fontSize: "18px"
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2C5079", // Label color when focused
                      fontSize: "18px"
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      color: "#83A2AD", // Customize placeholder text color
                      opacity: 1, // Ensure full opacity for the placeholder
                    },
                  }}
                  placeholder={"Type here..."}
                />
                  <TextField
                  label="Department"
                  size="small"
                  className="w-full"
                  focused
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        border: "1px solid #1D7A9B", // Focus border color
                        borderRadius: "10px",
                        fontSize: "18px"
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2C5079", // Label color when focused
                      fontSize: "18px"
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      color: "#83A2AD", // Customize placeholder text color
                      opacity: 1, // Ensure full opacity for the placeholder
                    },
                  }}
                  placeholder={"Type here..."}
                />
                </Box>

                {/* IsActive */}
                <Box className="w-full flex space-x-1">
                  <Switch
                     name="isActive"
                    //  checked={formData.isActive}
                    //  onCheckedChange={handleActiveChange}
                  />
                  <Typography
                  textAlign="left"
                  className="text-[14px] pb-1 text-[#2C5079] pl-2 pt-2"
                >
                  {/* {formData.isActive === true ? "Active" : "Inactive"} */}
                  Active
                </Typography>
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <Box className="flex w-full justify-center px-6 pt-1 pb-4">
              <Box className="space-x-4">
                <Button className="w-32 h-11 bg-white text-[#F66262] border-[1px] border-[#F66262] hover:text-white hover:bg-[#F66262]">
                  Reset
                </Button>
                <Button
                  className="w-32 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6] disabled:bg-[#83A2AD]"
                >
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
