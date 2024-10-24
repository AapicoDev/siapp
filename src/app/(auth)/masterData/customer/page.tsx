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
import { IoClose } from "react-icons/io5";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import { Textbox } from "@/components/ui/textboxs/textbox";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import data from "@/app/mockData.json";

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
  {
    id: 4,
    custId: 3,
    name: "หน้าประตูทางออก 1",
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
];

const mockContract = data.contracts;

const totalItems = rows.length;

const initialArea: AreaData[] = [
  {
    id: 1,
    custId: null,
    name: "",
  },
];

export default function Customer() {
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data
  const [customerNameList,setCustomerNameList] = useState([{id: 1, desc: ""}]);
  const [areas, setAreas] = useState<AreaData[]>([
    { id: 1, custId: null, name: "" },
  ]);
  const [custAreas, setCustAreas] = useState<AreaData[]>(mockArea);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [selectedSegmentFilter, setSelectedSegmentFilter] = useState();
  const [selectedGroupFilter, setSelectedGroupFilter] = useState();
  const [selectedZoneFilter, setSelectedZoneFilter] = useState();
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState();
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState();
  const [hrCodeFilter, setHrCodeFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState("");
  const [openViewQR, setOpenViewQR] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);
  const [isCustomerPage, setIsCustomerPage] = useState<boolean>(true);
  const pathName = usePathname();
  const [selected, setSelected] = useState<selectedDelete[]>(
    rows.map((row) => ({
      isSelected: false, // Default value for `selected`
      custId: row.customerId, // Convert customerId to string for custId
    }))
  );

  //calculate total checkpoint to display QR Code row
  const calTotalChkPt = () => {
    const rowDataUpdate = [...rowData];
    rowDataUpdate.forEach((customer) => {
      customer.customerId;
      //use customerId to find area of that customer
      const custArea = mockArea.filter((a) => a.custId === customer.customerId);
      let sumChkPt = 0;
      if (custArea.length > 0) {
        custArea.forEach((area) => {
          //use areaId to find number of checkpoint of that area
          sumChkPt += mockChkPt.filter(
            (chkPt) => chkPt.areaId === area.id
          ).length;
        });
      }
      customer.chkPtTotal = sumChkPt;
    });
    setRowData(rowDataUpdate);
  };

  const calTotalContract = () => {
    const rowDataUpdate = [...rowData];
    rowDataUpdate.forEach((customer) => {
      customer.customerId;
      const custContract = mockContract.filter(
        (a) => a.customerId === customer.customerId
      );
      customer.contractTotal = custContract.length;
    });
    setRowData(rowDataUpdate);
  };

  const handleScrollLock = (isLocked: boolean) => {
    if (isLocked) {
      const scrollPosition = window.scrollY; // Get current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`; // Lock scroll at current position
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1); // Restore previous scroll position
    }
  };

  useEffect(() => {
    calTotalChkPt();
    calTotalContract();
    custNameList();
    handleScrollLock(openFilterModal);
    return () => handleScrollLock(false);
  }, [openFilterModal]);

  const custNameList = () => {
    const custName = rowData.map(cust => ({
      id: cust.customerId,
      desc: cust.customerName
    }));
    setCustomerNameList(custName);
  };

  const handleAddNewCust = () => {
    setShowAddCustModal(true);
  };

  const handleDeleteCust = () => {};

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
    setOpenViewQR(false);
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
    handleCustArea(selecectedRow);
    setOpenEditContract(true);
  };

  const handleOpenViewQr = (selecectedRow: any) => {
    setSelectedRow(selecectedRow);
    handleCustArea(selecectedRow);
    setOpenViewQR(true);
  };

  const handleCustArea = (selecectedRow: any) => {
    const custArea = mockArea.filter(
      (a) => a.custId === selecectedRow.customerId
    );
    setCustAreas(custArea);
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

  const handleAddBtnOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: any
  ) => {
    e.stopPropagation();
    setSelectedRow(selectedRow);
    handleCustArea(selectedRow);
    const selectedCust = customerNameList.find(c => c.id === selectedRow.customerId);
    console.log("selectedRow = ", selectedRow)
    setOpenAddContract(true);
  };

  const handleSelectCustomerPage = (checked: boolean) => {
    if (checked) setIsCustomerPage(true);
  };

  const handleSelectContractPage = (checked: boolean) => {
    if (checked) setIsCustomerPage(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "hrCode") {
      setHrCodeFilter(value);
    }
    else if (name === "code") {
      setCodeFilter(value);
    }
  };

  return (
    <div>
      <Navbar menu={"Master Data"} submenu={"Customer"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box className="w-full">
            <Box justifyContent="space-between" className="flex">
              <Box className="space-x-4 py-4 flex">
                <Box
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    padding: "0.25rem",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={isCustomerPage}
                    onCheckedChange={handleSelectCustomerPage}
                  />
                  <Typography sx={{fontWeight: "700", color: "#1D7A9B"}} className="py-1 px-2">
                    Customer
                  </Typography>
                </Box>
                <Box
                  className="justify-center flex p-1 bg-white rounded-lg"
                >
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={!isCustomerPage}
                    onCheckedChange={handleSelectContractPage}
                  />
                  <Typography sx={{fontWeight: "700", color: "#1D7A9B"}} className="py-1 px-2">
                    Contract
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

          {isCustomerPage && (
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
                    className={`${styles.table}`}
                  >
                    <TableCell align="left" className="w-[4%]">
                      <Checkbox
                        className="mt-1 mb-2"
                        checked={isSelectedAll}
                        onCheckedChange={handleCheckAll}
                      />
                    </TableCell>
                    <TableCell align="center" className="w-[14%]">
                      HR Code
                    </TableCell>
                    <TableCell align="center" className="w-[18%]">
                      Customer
                    </TableCell>
                    <TableCell align="center" className="w-[20%]">
                      Department
                    </TableCell>
                    <TableCell align="center" className="w-[14%]">
                      Segment
                    </TableCell>
                    <TableCell align="center" className="w-[12%]">
                      Zone
                    </TableCell>
                    {/* Edit button col */}
                    <TableCell align="center" className="w-[9%]">
                      QR Code
                    </TableCell>
                    <TableCell align="center" className="w-[9%]">
                      Contract
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
                        <Checkbox
                          checked={selected[index].isSelected}
                          onClick={(event) => {
                            event.stopPropagation(); // Prevent row click
                            handleSelected(index);
                          }}
                        />
                      </TableCell>

                      {/* HR Code */}
                      <TableCell align="center">{row.hrCode}</TableCell>

                      {/* Customer */}
                      <TableCell align="center">{row.customerName}</TableCell>

                      {/* Department */}
                      <TableCell align="center">
                        {
                          departments.find((d) => d.did === row.departmentId)
                            ?.desc
                        }
                      </TableCell>

                      {/* Segment */}
                      <TableCell align="center">
                        {row.segmentId === null
                          ? "-"
                          : segments.find((s) => s.smid === row.segmentId)
                              ?.desc}
                      </TableCell>

                      {/* Zone */}
                      <TableCell align="center">
                        {row.zoneId === null
                          ? "-"
                          : zones.find((z) => z.zid === row.zoneId)?.desc}
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
                              handleOpenViewQr(row);
                            }}
                          >
                            View
                          </Button>
                        )}
                      </TableCell>
                      {/* Contract */}
                      <TableCell align="center">
                        {row.contractTotal === 0 ? (
                          <AddButton onAddBtnClick={(e)=>handleAddBtnOnClick(e,row)} />
                        ) : (
                          <ViewButton
                            onViewBtnClick={handleEditContract}
                            row={row}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* {!isCustomerPage && (
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
                  className={`${styles.table}`}
                >
                  <TableCell align="left" className="w-[4%]">
                    <Checkbox className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Contract No
                  </TableCell>
                  <TableCell align="center" className="w-[18%]">
                    Start Date
                  </TableCell>
                  <TableCell align="center" className="w-[20%]">
                    End Date
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Customer
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                    Attachment
                  </TableCell>
                  <TableCell align="center" className="w-[9%]">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ flexGrow: 1 }}>
                {contractData.map((row, index) => (
                  <TableRow
                    //onClick={() => handleRowClick(row)} // Row click handler
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
                      <Checkbox
                        checked={selected[index].isSelected}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          handleSelected(index);
                        }}
                      />
                    </TableCell>


                    <TableCell align="center">{row.id}</TableCell>


                    <TableCell align="center">{row.startDate}</TableCell>


                    <TableCell align="center">{row.endDate}</TableCell>


                    <TableCell align="center">
                      {
                        rowData.find((d) => d.customerId === row.custId)
                          ?.customerName
                      }
                    </TableCell>


                    <TableCell align="center">
                      <Box
                        className="justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5] cursor-pointer rounded-lg"
                      >
                       <Box className="w-[90%] text-left">
                          <Typography className="py-1 px-2 text-[#2C5079]">
                            {row.attachment}
                          </Typography>
                        </Box>
                        <GoArrowUpRight size={24} color="#4C9BF5" style={{ marginTop: 5 }}/>
                      </Box>
                    </TableCell>


                    <TableCell align="center">
                      {row.isActive ? (
                        <Box className="justify-center flex p-1 bg-[#86DC89] max-w-[220px] cursor-pointer rounded-lg">
                          <Typography className="py-1 px-2 text-[white]">Active</Typography>
                        </Box>
                      ) : (
                        <Box className="justify-center flex p-1 bg-[#83A2AD] max-w-[220px] cursor-pointer rounded-lg">
                          <Typography className="py-1 px-2 text-[white]">Inactive</Typography>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}   */}

          {!isCustomerPage && (
            <TableContract
              contractData={mockContract}
              custData={rowData}
              isSelectedAll={isSelectedAll}
              handlecheckAll={handleCheckAll}
              selected={selected}
              handleSelected={handleSelected}
            />
          )}

          {/* TableFooter*/}
          {isCustomerPage && (
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
                        <DeleteButton
                          onDeleteBtnClick={handleDeleteCust}
                          disable={!selected.some((item) => item.isSelected)}
                        />
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
          </TableContainer>)}
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
            <Box 
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "#D9F0EC",
              paddingY: "5px",
              borderRadius: "8px 8px 0px 0px", // Adjust rounded corners as needed
              justifyContent: "center",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Typography 
                sx={{
                  width: "fit-content",
                  fontSize: "1.125rem", // text-lg equivalent
                  fontWeight: "bold",
                  color: "#1D7A9B",
                  marginTop: "0.25rem",
                  marginLeft: "78px",
                  display: "flex"
                }}>
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

                {/* Department */}
                <Box className="w-full">
                <LabelSelector
                  selectorLabel={"Department"}
                  itemSource={departments}
                  setSelectedVal={setSelectedDepartmentFilter}
                  selectedVal={selectedDepartmentFilter}
                  name={"department"}
                  defaultSelected="Select Department"
                />
                </Box>

                {/* Customer */}
                <Box className="w-full">
                  <LabelSelector
                  selectorLabel={"Customer"}
                  itemSource={customerNameList}
                  setSelectedVal={setSelectedCustomerFilter}
                  selectedVal={selectedCustomerFilter}
                  name={"customer"}
                  defaultSelected="Select Customer"
                />
                </Box>

                {/* HR Code & Code */}
                <Box className="w-full flex space-x-5">
                <LabelTextField
                  label="HR Code"
                  placeholder="Type here..."
                  inputVal={hrCodeFilter}
                  setInputVal={setHrCodeFilter}
                />
                  <LabelTextField
                  label="Code"
                  placeholder="Type here..."
                  inputVal={codeFilter}
                  setInputVal={setCodeFilter}
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
                    sx={{fontSize: "14px", paddingBottom: "0.25rem", color: "#2C5079", fontWeight: "700", paddingLeft: '0.5rem', paddingTop: "0.5rem"}}
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
                <Button className="w-32 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6] disabled:bg-[#83A2AD]">
                  Apply
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      )}

      {openViewQR && (
        <ViewQrCode
          closeModal={handleCloseViewQr}
          customeraAreas={custAreas}
          selectedCustomer={selectedRow}
        />
      )}

      {openAddContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customeraAreas={custAreas}
          selectedCustomer={selectedRow}
          isEditContract={false}
          custList={[customerNameList.find(c => c.id === selectedRow?.customerId)]}
        />
      )}

      {openEditContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customeraAreas={custAreas}
          selectedCustomer={selectedRow}
          isEditContract={true}
          custList={customerNameList}
        />
      )}
    </div>
  );
}
