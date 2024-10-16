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
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
  Button as Button2,
  IconButton,
  Switch as SwitchMUI,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
import { usePathname } from "next/navigation";
import CustomerForm from "@/components/materData/CustomerForm";
import { Switch } from "@/components/ui/switch";
import ViewQrCode from "@/components/materData/ViewQrCode";
import ContractForm from "@/components/materData/ContractForm";
import { AddButton } from "@/components/ui/buttons/addButton";
import { ViewButton } from "@/components/ui/buttons/viewButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { GoArrowUpRight } from "react-icons/go";
import { TableContract } from "@/components/materData/TableContract";
import { mock } from "node:test";

type RowData = {
  hrCode: string;
  customerId: any;
  departmentId: any;
  segmentId: any;
  groupId: any;
  zoneId: any;
  chkPtTotal: any;
  contractTotal: any;
  code: string;
  isActive: boolean;
  customerName: string;
};

type AreaData = {
  id: number;
  custId: any;
  name: string;
};

type selectedDelete = {
  isSelected: boolean;
  custId: string;
};

const departments = [
  {
    did: 1,
    desc: "วิทยาลัยนานาชาติ มหาวิทยาลัยมหิดล",
  },
  {
    did: 2,
    desc: "เรนวูด ปาร์ค",
  },
  {
    did: 3,
    desc: "บริษัท สยามคอมเพรสเซอร์ อุตสาหกรรม จำกัด",
  },
  {
    did: 4,
    desc: "สายการบิน แควนตัสแอร์เวย์",
  },
];

const segments = [
  {
    smid: 1,
    desc: "Building",
  },
  {
    smid: 2,
    desc: "Education",
  },
  {
    smid: 3,
    desc: "Industrial",
  },
  {
    smid: 4,
    desc: "Resident",
  },
];

const groups = [
  {
    gid: 1,
    desc: "General Guard",
  },
  {
    gid: 2,
    desc: "Cargo",
  },
  {
    gid: 3,
    desc: "Cleaning",
  },
];

const zones = [
  {
    zid: 1,
    desc: "BMR",
  },
  {
    zid: 2,
    desc: "RO1",
  },
  {
    zid: 3,
    desc: "SVN",
  },
  {
    zid: 4,
    desc: "RO2",
  },
];

const rows: RowData[] = [
  {
    hrCode: "404-73-031-00",
    customerId: 1,
    departmentId: 1,
    groupId: 1,
    segmentId: 2,
    zoneId: 1,
    chkPtTotal: null,
    contractTotal: "View",
    code: "404-73-031-00",
    isActive: true,
    customerName: "วิทยาลัยนานาชาติ มหาวิทยาลัยมหิดล",
  },
  {
    hrCode: "401-13-035-00",
    customerId: 2,
    groupId: 1,
    departmentId: 2,
    segmentId: 4,
    zoneId: 4,
    chkPtTotal: null,
    contractTotal: "View",
    code: "401-13-035-00",
    isActive: true,
    customerName: "เรนวูด ปาร์ค",
  },
  {
    hrCode: "405-20-048-00",
    customerId: 3,
    groupId: 3,
    departmentId: 3,
    segmentId: 3,
    zoneId: 2,
    chkPtTotal: null,
    contractTotal: "12345",
    code: "405-20-048-00",
    isActive: true,
    customerName: "บริษัท สยามคอมเพรสเซอร์ อุตสาหกรรม จำกัด",
  },
  {
    hrCode: "601-10-077-00",
    customerId: 4,
    departmentId: 4,
    segmentId: null,
    groupId: 2,
    zoneId: 3,
    chkPtTotal: null,
    contractTotal: null,
    code: "601-10-077-00",
    isActive: false,
    customerName: "สายการบิน แควนตัสแอร์เวย์",
  },
];

const mockArea: AreaData[] = [
  {
    id: 1,
    custId: 1,
    name: "อาคาร1",
  },
  {
    id: 2,
    custId: 1,
    name: "อาคารใหญ่",
  },
  {
    id: 3,
    custId: 2,
    name: "อาคาร2",
  },
];

const mockChkPt = [
  {
    areaId: 1, 
    chkPtName: "จุดที่ 1",
  }, 
  {
    areaId: 1, 
    chkPtName: "จุดที่ 2",
  }, 
  {
    areaId: 2, 
    chkPtName: "หน้าประตู",
  }, 
  {
    areaId: 3, 
    chkPtName: "หน้าตึก",
  },
]

const mockContract = [
  {
    custId: 1, 
    id: "0001",
    startDate: "13/08/2024",
    endDate: "31/12/2024",
    attachment: "MUIC_contract2024_13.pdf",
    isActive: true
  },
  {
    custId: 2, 
    id: "0002",
    startDate: "01/05/2024",
    endDate: "31/12/2024",
    attachment: "contract2024_11.pdf",
    isActive: true
  },
  {
    custId: 3, 
    id: "0003",
    startDate: "01/04/2024",
    endDate: "31/12/2024",
    attachment: "contract2024_27.pdf",
    isActive: false
  }
]

const totalItems = rows.length;

const initialArea: AreaData[] = [
  {
    id: 1,
    custId: null,
    name: "",
  },
];

const mockRandom = [
    {
        reason: "ตรวจระเบียบเครื่องแต่งกายตาม Standard",
        totalCheckList: 4
    },
    {
        reason: "ตรวจอุปกรณ์ตามสัญญา TOR",
        totalCheckList: 2
    },
    {
        reason: "ตรวจความเสี่ยงภายในหน่วยงาน",
        totalCheckList: 2
    },
    {
        reason: "เข้าพบลูกค้า อัพเดทข้อมูล/รับทราบปัญหาต่าง ๆ",
        totalCheckList: 2
    }
]

export default function Patrol() {
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data
  const [contractData, setContractData] = useState(mockContract); // Local state for row data
  const [areas, setAreas] = useState<AreaData[]>([
    { id: 1, custId: null, name: "" },
  ]);
  const [custAreas, setCustAreas] = useState<AreaData[]>();
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false)
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openViewQR, setOpenViewQR] = useState<boolean>(false); 
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false); 
  const [isCheckpointPage, setIsCheckpointPage] = useState<boolean>(true); 
  const [selected, setSelected] = useState<selectedDelete[]>(
    rows.map((row) => ({
      isSelected: false, // Default value for `selected`
      custId: row.customerId, // Convert customerId to string for custId
    }))
  );

  //calculate total checkpoint to display QR Code row
  const calTotalChkPt = () => {
    const rowDataUpdate = [...rowData]
    rowDataUpdate.forEach(customer => {
      customer.customerId
      //use customerId to find area of that customer
      const custArea = mockArea.filter((a) => a.custId === customer.customerId);
      let sumChkPt = 0;
      if(custArea.length > 0){
          custArea.forEach(area => {
            //use areaId to find number of checkpoint of that area
            sumChkPt += mockChkPt.filter(chkPt => chkPt.areaId === area.id).length
          });
      }
      customer.chkPtTotal = sumChkPt;
    });
    setRowData(rowDataUpdate);
  }

  const calTotalContract = () => {
    const rowDataUpdate = [...rowData]
    rowDataUpdate.forEach(customer => {
      customer.customerId
      const custContract = mockContract.filter((a) => a.custId === customer.customerId);
      customer.contractTotal = custContract.length;
    });
    setRowData(rowDataUpdate);
  }

  useEffect(() => {
    calTotalChkPt();
    calTotalContract();
  }, []);

  const handleAddNewCust = () => {
    setShowAddCustModal(true);
  };

  const handleDeleteCust = () => {
    
  };

  const setToggleFilter = () => {
    console.log("openFilterModal =", openFilterModal);
    setOpenFilterModal(!openFilterModal);
  };

  const handleRowClick = (row: RowData) => {
    setSelectedRow(row);
    setOpenEditCustModal(true);

    const custArea = mockArea.filter((a) => a.custId === row.customerId);
    setAreas(initialArea);
    if (custArea.length != 0) {
      setAreas(
        custArea.map((area, index) => ({
          ...area,
          id: index + 1, // use index of array+1 to set new id.
        }))
      );
    }
  };

  function handleCloseCustomerForm(isEdit: boolean) {
    if (!isEdit) {
      setShowAddCustModal(false);
    } else {
      setOpenEditCustModal(false);
    }
    setRowData(rows);
  }

  function handleCloseViewQr() {
    setOpenViewQR(false)
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

  const handleOpenViewQr = (selecectedRow: any) => {
    setSelectedRow(selecectedRow);
    const custArea = mockArea.filter(a => a.custId === selecectedRow.customerId);
    setCustAreas(custArea);
    setOpenViewQR(true)
  }

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

  const handleAddBtnOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenAddContract(true);
  };

  const handleSelectCustomerPage = (checked: boolean) => {
    if (checked) setIsCheckpointPage(true);
  };

  const handleSelectContractPage = (checked: boolean) => {
    if (checked) setIsCheckpointPage(false);
  };

  return (
    <div>
      <Navbar menu={"Master Data"} submenu={"Patrol"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box className="w-full">
            <Box justifyContent="space-between" className="flex">
              <Box className="space-x-4 py-4 flex">
                <Box
                  sx={{ borderRadius: "10px" }}
                  className="justify-center flex p-1 pb-0 bg-white"
                >
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={isCheckpointPage}
                    onCheckedChange={handleSelectCustomerPage}
                  />
                  <Typography sx={{fontWeight: "700", color: "#1D7A9B"}} className="py-1 px-2">
                    Check Point
                  </Typography>
                </Box>
                <Box
                  sx={{ borderRadius: "10px" }}
                  className="justify-center flex p-1 bg-white"
                >
                  <Checkbox className="bg-[#EBF4F6] border-none" 
                    checked={!isCheckpointPage}
                    onCheckedChange={handleSelectContractPage}/>
                  <Typography sx={{fontWeight: "700", color: "#1D7A9B"}} className="py-1 px-2">
                    Random
                  </Typography>
                </Box>
              </Box>

              <Box className="space-x-2 py-4 flex">
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

          {isCheckpointPage && (<TableContainer
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
                  className={`${styles.table}`}
                >
                  <TableCell align="left" className="w-[4%]">
                    <Checkbox className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center" className="w-[26%]">
                    Customer
                  </TableCell>
                  <TableCell align="center" className="w-[26%]">
                    Area
                  </TableCell>
                  <TableCell align="center" className="w-[15%]">
                    Total Round
                  </TableCell>
                  <TableCell align="center" className="w-[15%]">
                    Total Checkpoint
                  </TableCell>
                  <TableCell align="center" className="w-[18%]">
                    QR Code
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
                {rowData.map((row, index) => (
                  <TableRow
                    onClick={() => handleRowClick(row)} // Row click handler
                    key={index}
                    className={
                      editMode[index]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
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
                      <Checkbox className="mt-1 mb-2"
                        checked={selected[index].isSelected}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          handleSelected(index);
                        }}
                      />
                    </TableCell>

                    {/* Customer */}
                    <TableCell align="center">{row.customerName}</TableCell>

                    {/* Area */}
                    <TableCell align="center">
                      {
                        mockArea.find((a) => a.custId === row.customerId)?.name
                      }
                    </TableCell>

                    {/* Total Round */}
                    <TableCell align="center">
                      {row.chkPtTotal}
                    </TableCell>

                    {/* Total Checkpoint */}
                    <TableCell align="center">
                      {row.chkPtTotal}
                    </TableCell>

                    {/* ViewQR */}
                    <TableCell align="center">
                      {row.chkPtTotal === 0 ? (
                        "-"
                      ) : (
                        <Button
                          style={{
                            border: "1px solid #37B7C3",
                            fontWeight: "bold",
                          }}
                          className="w-[84px] text-[#37B7C3] bg-white hover:bg-[#37B7C3] hover:text-white"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenViewQr(row)
                          }}
                        >
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)}

           
          {!isCheckpointPage && (<TableContainer
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
                  className={`${styles.table}`}
                >
                  <TableCell align="left" className="w-[10%]">
                    <Checkbox className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center" className="w-[50%]">
                    Random Patrol Reason
                  </TableCell>
                  <TableCell align="center" className="w-[40%]">
                    Total Check List
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
                {mockRandom.map((row, index) => (
                  <TableRow
                    // onClick={() => handleRowClick(row)} // Row click handler
                    key={index}
                    className={
                      editMode[index]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
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
                      <Checkbox className="mt-1 mb-2"
                        checked={selected[index].isSelected}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          handleSelected(index);
                        }}
                      />
                    </TableCell>

                    {/* Customer */}
                    <TableCell align="center">{row.reason}</TableCell>

                    {/* Total Check List */}
                    <TableCell align="center">
                      {row.totalCheckList}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)}
        

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
                      <Box>
                        <DeleteButton onDeleteBtnClick={handleDeleteCust} disable={!selected.some((item) => item.isSelected)}/>
                        <Button
                          style={{ marginLeft: "auto", fontWeight: "bold" }}
                          className="w-48 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#4C9BF5] hover:to-[#D8EAFF] 
                                 hover:text-[#00336C] disabled:bg-[#83A2AD]"
                          onClick={() => handleAddNewCust()}
                        >
                          +New
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Add customer */}
      {openAddCustModal && (
        <CustomerForm
          closeModal={handleCloseCustomerForm}
          customeraAeas={initialArea}
        />
      )}

      {/* Edit/Delete Customer */}
      {openEditCustModal && (
        <CustomerForm
          closeModal={handleCloseCustomerForm}
          editCustomer={selectedRow}
          customeraAeas={areas}
        />
      )}

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
                          key={`${segment.smid}-${index}`}
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
                          key={`${group.gid}-${index}`}
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
                          key={`${zone.zid}-${index}`}
                          value={zone.desc}
                        >
                          {zone.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Department */}
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
                      Department
                    </InputLabel>
                    <Select
                      label="Department"
                      size="small"
                      displayEmpty
                      value={undefined}
                      // onChange={handleAddSegmentChange}
                      renderValue={(selected) => {
                        if (selected === undefined) {
                          return "Select Department";
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
                      {departments.map((department, index) => (
                        <MenuItem
                          key={`${department.did}-${index}`}
                          value={department.desc}
                        >
                          {department.desc}
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
                          key={`${segment.smid}-${index}`}
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

      {openViewQR && (
        <ViewQrCode closeModal={handleCloseViewQr} customeraAeas={custAreas} selectedCustomer={selectedRow}/>
      )}

      {openAddContract && (
        <ContractForm closeModal={handleCloseContractForm} customeraAeas={areas}/>
      )}

      {openEditContract && (
        <ContractForm closeModal={handleCloseContractForm} customeraAeas={areas} selectedCustomer={selectedRow}/>
      )}
    </div>
  );
}
