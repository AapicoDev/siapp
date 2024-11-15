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
import {
  deleteArea,
  deleteCustomer,
  getAllMasterCustomerData,
  getAllMasterDepartmentData,
  getAllMasterGroupData,
  getAllMasterSegmentData,
  getAllMasterZoneData,
  getMasterAreaDataWithCustomerId,
  queryMasterContract,
} from "@/app/lib/api";
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";

type RowData = {
  id: any;
  department_Id: any;
  areaId: string[];
  segment_Id: any;
  group_Id: any;
  zone_Id: any;
  hr_code: string;
  code: string;
  isActive: boolean;
  customerName: string;
  totalCheckpoint: any;
  contractTotal: any;
};

type AreaData = {
  id: string;
  custId: any;
  name: string;
  roundIds: string[];
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

const mockChkPt = [
  {
    areaId: "1",
    chkPtName: "จุดที่ 1",
  },
  {
    areaId: "1",
    chkPtName: "จุดที่ 2",
  },
  {
    areaId: "2",
    chkPtName: "หน้าประตู",
  },
  {
    areaId: "3",
    chkPtName: "หน้าตึก",
  },
];

const mockContract = data.contracts;

const initialArea: AreaData[] = [
  {
    id: "",
    custId: "",
    name: "",
    roundIds: []
  },
];

export default function Customer() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [customerNameList, setCustomerNameList] = useState([
    { id: 1, desc: "" },
  ]);
  const [custAreas, setCustAreas] = useState<AreaData[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [showAddCustModal, setShowAddCustModal] = useState(false);
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
  const [departmantItemSource, setDepartmantItemSource] = useState<any[]>([]);
  const [allSegment, setAllSegment] = useState<any[]>([]);
  const [allGroup, setAllGroup] = useState<any[]>([]);
  const [allZone, setAllZone] = useState<any[]>([]);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row: any) => ({
      isSelected: false, // Default value for `selected`
      custId: row.customerId, // Convert customerId to string for custId
    }))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddOrUpdateSucces, setIsAddOrUpdateSucces] = useState(false);
  const totalItems = rowData.length;

  async function totalCheckpointsOfAreas(customerId: any) {
    const custArea = await getMasterAreaDataWithCustomerId(customerId);
    let sumChkPt = 0;
    if (custArea?.total !== undefined && custArea?.total > 0) {
        custArea.documents.map((area) => {
          sumChkPt += area.checkPointIDs?.length;
        });
    }
    return sumChkPt;
  }

  async function totalContractOfCustomer(customerId: any) {
    const contracts = await queryMasterContract("customer_Id", customerId);
    return contracts?.total;
  }

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
    handleScrollLock(openFilterModal);
    return () => handleScrollLock(false);
  }, [openFilterModal]);

  useEffect(() => {
    initialData();
    tableData();
  }, [isCustomerPage]);

  useEffect(() => {
    if (isAddOrUpdateSucces) {
      tableData();
      setIsAddOrUpdateSucces(false);
    }
  }, [isAddOrUpdateSucces]);

  const custNameList = (mappedRowData: RowData[]) => {
    const custName = mappedRowData.map((cust) => ({
      id: cust.id,
      desc: cust.customerName,
    }));
    setCustomerNameList(custName);
  };

  const initialData = async () => {
    setIsLoading(true);
    const getDepartments = await getAllMasterDepartmentData();
    const departmentItems =
      getDepartments?.documents?.map((d) => {
        return {
          id: d.$id,
          label: d.departmentName,
          segment_Id: d.segment_Id,
          group_Id: d.group_Id,
          zone_Id: d.zone_Id,
        };
      }) || [];
    setDepartmantItemSource(departmentItems);

    const getSegments = await getAllMasterSegmentData();
    const segmentItems =
      getSegments?.documents?.map((s) => {
        return {
          id: s.$id,
          desc: s.segment,
          description: s.description,
        };
      }) || [];
    setAllSegment(segmentItems);

    const getGroups = await getAllMasterGroupData();
    const groupItems =
      getGroups?.documents?.map((g) => {
        return {
          id: g.$id,
          desc: g.group,
          description: g.description,
        };
      }) || [];
    setAllGroup(groupItems);

    const getZones = await getAllMasterZoneData();
    const zoneItems =
      getZones?.documents?.map((z) => {
        return {
          id: z.$id,
          desc: z.zone,
          description: z.description,
        };
      }) || [];
    setAllZone(zoneItems);
    setIsLoading(false);
  };

  const tableData = async () => {
    console.log("enter table data");
    setIsLoading(true);
    const customers = await getAllMasterCustomerData();
    const tableData: RowData[] = await Promise.all(
      customers?.documents?.map(async (doc) => {
        return {
          id: doc.$id,
          customerName: doc.CustomerName,
          department_Id: doc.department_Id,
          segment_Id: doc.segment_Id,
          group_Id: doc.group_Id,
          zone_Id: doc.zone_Id,
          areaId: doc.area_id,
          hr_code: doc.hr_code,
          code: doc.code,
          isActive: doc.isActive,
          totalCheckpoint: await totalCheckpointsOfAreas(doc.$id),
          contractTotal: await totalContractOfCustomer(doc.$id),
        };
      }) || []
    );
    setRowData(tableData);
    console.log("tableData =", tableData);

    const mapSelect = tableData.map((row: any) => ({
      isSelected: false,
      custId: row.id,
    }));
    setSelected(mapSelect);
    custNameList(tableData);
    setIsLoading(false);
  };

  const handleAddNewCust = () => {
    setShowAddCustModal(true);
  };

  const handleDeleteCust = async () => {
    console.log("rowData =", rowData);
    const confirmApprove = await confirmDialog(
      "Delete Customer",
      "Do you want to delete these selected customer?"
    );
    if (confirmApprove) {
      let deleteResult = true;

      const deleteId = selected
        .filter((select) => select.isSelected === true)
        .map((item) => item.custId);
      const deleteRow = rowData.filter((row) => deleteId.includes(row.id));
      console.log("deleteRow =", deleteRow);

      setIsLoading(true);
      for (const dr of deleteRow) {
        let deleteCustResult = null;
        const deleteAreaResult = await deleteArea(dr.areaId);
        if (deleteAreaResult !== null) {
          deleteCustResult = await deleteCustomer([dr.id]);
          console.log("deleteCustResult =", deleteCustResult);

          if (deleteCustResult === null) {
            alert(
              `Error occurred while deleting Customer: ${dr.customerName}.`
            );
            deleteResult = false;
            break; // Exit the loop if an error occurs
          }
        } else {
          alert(
            `Error occurred while deleting area of Customer: ${dr.customerName}.`
          );
          deleteResult = false;
          break;
        }
      }

      if (deleteResult) {
        setIsAddOrUpdateSucces(true);
        setIsSelectedAll(false);
      }
      setIsLoading(false);
    }
  };

  const setToggleFilter = () => {
    console.log("openFilterModal =", openFilterModal);
    setOpenFilterModal(!openFilterModal);
  };

  const handleRowClick = async (row: RowData) => {
    setSelectedRow(row);
    await handleCustArea(row);
    setOpenEditCustModal(true);
  };

  function handleCloseCustomerForm(isEdit: boolean) {
    if (!isEdit) {
      setShowAddCustModal(false);
    } else {
      setOpenEditCustModal(false);
    }
    //setRowData(rows);
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

  const handleEditContract = async (selecectedRow: any) => {
    console.log("row =", selecectedRow);
    setSelectedRow(selecectedRow);
    await handleCustArea(selecectedRow);
    setOpenEditContract(true);
  };

  const handleOpenViewQr = async (selecectedRow: any) => {
    await handleCustArea(selecectedRow);
    setSelectedRow(selecectedRow);
    setOpenViewQR(true);
  };

  const handleCustArea = async (selecectedRow: RowData) => {
    setIsLoading(true);
    const getAreasOfCustomer = await getMasterAreaDataWithCustomerId(
      selecectedRow.id
    );
    console.log("getAreasOfCustomer =", getAreasOfCustomer);
    const custArea: AreaData[] =
      getAreasOfCustomer?.documents.map((doc) => {
        return {
          id: doc.$id,
          custId: doc.CustomerId,
          name: doc.name,
          roundIds: doc.roundIDs,
        };
      }) || [];
    console.log("custArea =", custArea);
    setCustAreas(custArea);
    setIsLoading(false);
  };

  const handleSelected = (index: number) => {
    console.log("selected =", selected);
    const newSelected = [...selected];
    newSelected[index].isSelected = !selected[index]?.isSelected;
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

  const handleAddContract = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedRow: any
  ) => {
    e.stopPropagation();
    setSelectedRow(selectedRow);
    handleCustArea(selectedRow);
    const selectedCust = customerNameList.find(
      (c) => c.id === selectedRow.customerId
    );
    console.log("selectedRow = ", selectedRow);
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
    } else if (name === "code") {
      setCodeFilter(value);
    }
  };

  return (
    <div>
      <Navbar menu={"Master Data"} submenu={"Customer"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>
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
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
                    Customer
                  </Typography>
                </Box>
                <Box className="justify-center flex p-1 bg-white rounded-lg">
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={!isCustomerPage}
                    onCheckedChange={handleSelectContractPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
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
                        <Checkbox
                          checked={selected[index]?.isSelected}
                          onClick={(event) => {
                            event.stopPropagation(); // Prevent row click
                            handleSelected(index);
                          }}
                        />
                      </TableCell>

                      {/* HR Code */}
                      <TableCell align="center">{row.hr_code}</TableCell>

                      {/* Customer */}
                      <TableCell align="center">{row.customerName}</TableCell>

                      {/* Department */}
                      <TableCell align="center">
                        {
                          departmantItemSource.find(
                            (d) => d.id === row.department_Id
                          )?.label
                        }
                      </TableCell>

                      {/* Segment */}
                      <TableCell align="center">
                        {row.segment_Id === null
                          ? "-"
                          : allSegment.find((s) => s.id === row.segment_Id)
                              ?.description}
                      </TableCell>

                      {/* Zone */}
                      <TableCell align="center">
                        {row.zone_Id === null
                          ? "-"
                          : allZone.find((z) => z.id === row.zone_Id)
                              ?.description}
                      </TableCell>

                      {/* ViewQR */}
                      <TableCell align="center">
                        {row.totalCheckpoint === 0 ? (
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
                          <AddButton                         
                            onAddBtnClick={(e) => handleAddContract(e, row)}
                          />
                        ) : (
                          <ViewButton
                              onViewBtnClick={handleEditContract}
                              row={row}                      />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!isCustomerPage && (
            <TableContract contractData={mockContract} custData={customerNameList} />
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
            </TableContainer>
          )}
        </Box>
      </Box>

      {/* Add customer */}
      {showAddCustModal && (
        <CustomerForm
          closeModal={handleCloseCustomerForm}
          customeraAeas={[]}
          departmantItemSource={departmantItemSource}
          allSegment={allSegment}
          allGroup={allGroup}
          allZone={allZone}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

      {/* Edit/Delete Customer */}
      {openEditCustModal && (
        <CustomerForm
          closeModal={handleCloseCustomerForm}
          editCustomer={selectedRow}
          customeraAeas={custAreas}
          departmantItemSource={departmantItemSource}
          allSegment={allSegment}
          allGroup={allGroup}
          allZone={allZone}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
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
                    marginLeft: "78px",
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
                    sx={{
                      fontSize: "14px",
                      paddingBottom: "0.25rem",
                      color: "#2C5079",
                      fontWeight: "700",
                      paddingLeft: "0.5rem",
                      paddingTop: "0.5rem",
                    }}
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
          customerAreas={custAreas}
          selectedCustomer={selectedRow}
        />
      )}

      {openAddContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customerAreas={custAreas}
          selectedCustomer={selectedRow}
          isEditContract={false}
          custList={[customerNameList.find((c) => c.id === selectedRow?.id)]}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

      {openEditContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customerAreas={custAreas}
          selectedCustomer={selectedRow}
          isEditContract={true}
          custList={customerNameList}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

      {/* Confirm dialog */}
      {ConfirmAlertDialog}

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
}
