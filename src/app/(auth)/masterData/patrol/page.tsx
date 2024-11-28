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
  TablePagination,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
import { Switch } from "@/components/ui/switch";
import ViewQrCode from "@/components/materData/ViewQrCode";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import PatrolCheckpointFrom from "@/components/materData/PatrolCheckpointForm";
import data from "@/app/mockData.json";
import {
  getAllMasterCustomerData,
  getAllMasterAreaData,
  getMasterRoundData,
  fetchMasterAreaData,
} from "@/app/lib/api";
import { TableMasterPatrolRandom } from "@/components/materData/TableMasterPatrolRandom";
import { IoClose } from "react-icons/io5";

type RowData = {
  customerId: any;
  customerName: any;
  areaId: any;
  areaName: any;
  checkpointId: any[];
  totalRound: any;
  totalCheckpoint: any;
  totalCheckpointOfArea: any;
  //isActive: boolean;
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

const mockContract = [
  {
    custId: 1,
    id: "0001",
    startDate: "13/08/2024",
    endDate: "31/12/2024",
    attachment: "MUIC_contract2024_13.pdf",
    isActive: true,
  },
  {
    custId: 2,
    id: "0002",
    startDate: "01/05/2024",
    endDate: "31/12/2024",
    attachment: "contract2024_11.pdf",
    isActive: true,
  },
  {
    custId: 3,
    id: "0003",
    startDate: "01/04/2024",
    endDate: "31/12/2024",
    attachment: "contract2024_27.pdf",
    isActive: false,
  },
];

export default function Patrol() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [contractData, setContractData] = useState(mockContract); // Local state for row data
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openViewQR, setOpenViewQR] = useState<boolean>(false);
  const [openAddCheckpoint, setOpenAddCheckpoint] = useState<boolean>(false);
  const [openEditCheckpoint, setOpenEditCheckpoint] = useState<boolean>(false);
  const [isCheckpointPage, setIsCheckpointPage] = useState<boolean>(true);
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData?.map((row) => ({
      isSelected: false, // Default value for `selected`
      custId: row.customerId, // Convert customerId to string for custId
    }))
  );
  const [customerList, setCustomerList] = useState<any[]>();
  const [custAreaList, setCustAreaList] = useState<any[]>();
  const [allArea, setAllArea] = useState<any[]>();
  const [isAddOrUpdateSucces, setIsAddOrUpdateSucces] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  useEffect(() => {
    tableData();
  }, [page, rowsPerPage]);

  const tableData = async () => {
    setIsLoading(true);
    const customers = await getAllMasterCustomerData();
    const custList = customers?.documents
      .filter((c) => c.area_id.length > 0)
      .map((cust) => {
        return {
          id: cust.$id,
          desc: cust.CustomerName,
        };
      });
    setCustomerList(custList);
    // const custAreaList = data.areas.map(area => {
    //   return {
    //     id: area.id,
    //     desc: area.name
    //   };
    // });
    // setCustAreaList(custAreaList);

    const offset = page * rowsPerPage;
    const areaList = await fetchMasterAreaData(offset, rowsPerPage);
    setAllArea(areaList?.documents);
    console.log("areaList =", areaList);
    const mappedPatrolList: RowData[] =
      areaList?.documents.map((area) => {
        return {
          customerId: area.CustomerId,
          customerName: area.customerName,
          areaId: area.$id,
          areaName: area.name,
          checkpointId: area.checkPointIDs,
          totalRound: getRound(area.$id),
          totalCheckpoint: area.checkPointIDs?.length,
          totalCheckpointOfArea: area.checkPointIDs?.length,
        };
      }) || [];
    console.log("mappedPatrolList =", mappedPatrolList);
    setRowData(mappedPatrolList);
    setTotalRows(areaList?.total || 0);
    setSelected(
      mappedPatrolList?.map((row) => ({
        isSelected: false, // Default value for `selected`
        custId: row.customerId, // Convert customerId to string for custId
      }))
    );
    setIsLoading(false);
  };

  const getRound = async (areaId: any) => {
    const rounds = await getMasterRoundData([{ field: "areaId", value: areaId }]);
    const filteredRound = rounds?.documents.filter(
      (round) => round.isActive === true
    ).length;
    return filteredRound;
  };

  const handleAddNewPatrol = () => {
    setOpenAddCheckpoint(true);
  };
  const handleDeleteCust = () => {};

  const setToggleFilter = () => {
    console.log("openFilterModal =", openFilterModal);
    setOpenFilterModal(!openFilterModal);
  };

  const handleRowClick = (row: RowData) => {
    console.log("row =", row);
    const custAreaList = allArea
      ?.filter((a) => a.CustomerId === row.customerId)
      .map((area) => {
        return {
          id: area.$id,
          desc: area.name,
        };
      });
    console.log("custAreaList =", custAreaList);
    setCustAreaList(custAreaList);
    setSelectedRow(row);
    setOpenEditCheckpoint(true);
  };

  function handleCloseViewQr() {
    setOpenViewQR(false);
  }

  function handleClosePatrolCheckpointForm(isEdit: boolean) {
    if (!isEdit) {
      setOpenAddCheckpoint(false);
    } else {
      setOpenEditCheckpoint(false);
      if (isAddOrUpdateSucces) {
        tableData();
        setIsAddOrUpdateSucces(false);
      }
    }
  }

  const handleOpenViewQr = (selecectedRow: RowData) => {
    let sumChkPt = 0;
    allArea?.forEach((area) => {
      if(area.CustomerId === selecectedRow.customerId){
        sumChkPt += area.checkPointIDs?.length
      }
    });
    console.log("allArea =", allArea)
    console.log("sumChkPt =", sumChkPt)
    const calChkPtOfAllArea = selecectedRow;
    calChkPtOfAllArea.totalCheckpoint = sumChkPt;
    setSelectedRow(calChkPtOfAllArea);

    const custAreaList = allArea
      ?.filter((a) => a.CustomerId === selecectedRow.customerId)
      .map((area) => {
        return {
          id: area.$id,
          custId: area.CustomerId,
          name: area.name,
        };
      });
    console.log("custAreaList= ", custAreaList);
    console.log("selecectedRow= ", selecectedRow);
    setCustAreaList(custAreaList);
    setOpenViewQR(true);
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

  const handleSelecCheckpointPage = (checked: boolean) => {
    if (checked) setIsCheckpointPage(true);
  };
  const handleSelectRandomPatrolPage = (checked: boolean) => {
    if (checked) setIsCheckpointPage(false);
  };

  const handlePageChange = (event: any, newPage: any) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Navbar menu={"Master Data"} submenu={"Patrol"} />
      <Box className='px-2'>
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box className='w-full'>
            <Box justifyContent='space-between' className='flex'>
              <Box className='space-x-4 py-4 flex'>
                <Box
                  sx={{ borderRadius: "10px" }}
                  className='justify-center flex p-1 pb-0 bg-white'>
                  <Checkbox
                    className='bg-[#EBF4F6] border-none'
                    checked={isCheckpointPage}
                    onCheckedChange={handleSelecCheckpointPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
                    Check Point
                  </Typography>
                </Box>
                <Box
                  sx={{ borderRadius: "10px" }}
                  className="justify-center flex p-1 bg-white"
                >
                  <Checkbox
                    className="bg-[#EBF4F6] border-none"
                    checked={!isCheckpointPage}
                    onCheckedChange={handleSelectRandomPatrolPage}
                  />
                  <Typography
                    sx={{ fontWeight: "700", color: "#1D7A9B" }}
                    className="py-1 px-2"
                  >
                    Random
                  </Typography>
                </Box>
              </Box>

              <Box className='space-x-2 py-4 flex'>
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
                  className="w-40 bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]"
                  onClick={setToggleFilter}
                  disabled={true}
                >
                  <Filter size={20} style={{ marginRight: "5px" }} /> Filter
                </Button>
              </Box>
            </Box>
          </Box>

          {isCheckpointPage && (
            <>
              <TableContainer
                className="h-[76vh] max-h-[76vh] bg-white"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "15px 15px 0px 0px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
              >
                <Table stickyHeader sx={{zIndex: 0}}>
                  <TableHead sx={{ mt: 0}}>
                    <TableRow
                      sx={{ borderBottom: "1px solid #C7D4D7", height: "64px" }}
                      className={`${styles.table}`}
                    >
                      {/* <TableCell align="left" className="w-[4%]">
                        <Checkbox className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                      </TableCell> */}
                      <TableCell align="center" className="w-[28%]">
                        Customer
                      </TableCell>
                      <TableCell align="center" className="w-[28%]">
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
                        className={`${
                          index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                        }`}
                        sx={{
                          height: "60px",
                          cursor: "pointer",
                          "& .MuiTableCell-root": {
                            padding: "10px 20px 10px 20px", // Customize border color
                          },
                          "&:hover": {
                            backgroundColor: "#DCE9EB", // Optional: Change background color on hover
                          },
                        }}
                      >
                        {/* <TableCell align="left">
                          <Checkbox className="mt-1 mb-2"
                        checked={selected[index]?.isSelected}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          handleSelected(index);
                        }}
                      />
                        </TableCell> */}

                        {/* Customer */}
                        <TableCell align="center">{row.customerName}</TableCell>

                        {/* Area */}
                        <TableCell align="center">{row.areaName}</TableCell>

                        {/* Total Round */}
                        <TableCell align="center">{row.totalRound}</TableCell>

                        {/* Total Checkpoint */}
                        <TableCell align="center">
                          {row.totalCheckpointOfArea}
                        </TableCell>

                        {/* ViewQR */}
                        <TableCell align="center">
                          {row.totalCheckpointOfArea === 0 ? (
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
                          {/* <Typography>Total: {rowData.length} items</Typography> */}
                          <TablePagination
                            sx={{color: "#2C5079"}}
                            component="div"
                            count={totalRows}
                            page={page}
                            onPageChange={handlePageChange}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleRowsPerPageChange}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </>
          )}

          {!isCheckpointPage && <TableMasterPatrolRandom />}
        </Box>
      </Box>

      {openFilterModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex flex-col'>
          <Button
            className='w-[122px] text-[#1D7A9B] bg-white hover:bg-[#D9F0EC] hover:text-[#1D7A9B] fixed right-6 top-[80px]'
            onClick={() => setOpenFilterModal(false)}>
            <Filter size={20} style={{ marginRight: "5px" }} /> Filter
          </Button>
          <div className='bg-white rounded-lg shadow-lg h-[600px] w-[498px] overflow-auto fixed right-6 top-[136px]'>
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
                <Box className='w-full'>
                  <FormControl focused className='w-full'>
                    <InputLabel
                      className='text-[#2C5079'
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}
                    >
                      Segment
                    </InputLabel>
                    <Select
                      label='Segment'
                      size='small'
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
                          fontSize: "18px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}>
                      {segments.map((segment, index) => (
                        <MenuItem
                          key={`${segment.smid}-${index}`}
                          value={segment.desc}>
                          {segment.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Group */}
                <Box className='w-full'>
                  <FormControl focused className='w-full'>
                    <InputLabel
                      className='text-[#2C5079'
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}
                    >
                      Group
                    </InputLabel>
                    <Select
                      label='Group'
                      size='small'
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
                          fontSize: "18px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}>
                      {groups.map((group, index) => (
                        <MenuItem
                          key={`${group.gid}-${index}`}
                          value={group.desc}>
                          {group.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Zone */}
                <Box className='w-full'>
                  <FormControl focused className='w-full'>
                    <InputLabel
                      className='text-[#2C5079'
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}
                    >
                      Zone
                    </InputLabel>
                    <Select
                      label='Zone'
                      size='small'
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
                          fontSize: "18px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}>
                      {zones.map((zone, index) => (
                        <MenuItem
                          key={`${zone.zid}-${index}`}
                          value={zone.desc}>
                          {zone.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Department */}
                <Box className='w-full'>
                  <FormControl focused className='w-full'>
                    <InputLabel
                      className='text-[#2C5079'
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}
                    >
                      Department
                    </InputLabel>
                    <Select
                      label='Department'
                      size='small'
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
                          fontSize: "18px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}>
                      {departments.map((department, index) => (
                        <MenuItem
                          key={`${department.did}-${index}`}
                          value={department.desc}>
                          {department.desc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Customer */}
                <Box className='w-full'>
                  <FormControl focused className='w-full'>
                    <InputLabel
                      className='text-[#2C5079'
                      sx={{
                        "&.Mui-focused": {
                          color: "#2C5079",
                          fontSize: "18px",
                        },
                      }}
                    >
                      Customer
                    </InputLabel>
                    <Select
                      label='Customer'
                      size='small'
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
                          fontSize: "18px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #1D7A9B", // Hover border color
                        },
                        "& .MuiSelect-icon": {
                          color: "#83A2AD", // Customize arrow icon color
                        },
                      }}>
                      {segments.map((segment, index) => (
                        <MenuItem
                          key={`${segment.smid}-${index}`}
                          value={segment.desc}>
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
                          fontSize: "18px",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#2C5079", // Label color when focused
                        fontSize: "18px",
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
                          fontSize: "18px",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#2C5079", // Label color when focused
                        fontSize: "18px",
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
                <Box className='w-full flex space-x-1'>
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
            <Box className='flex w-full justify-center px-6 pt-1 pb-4'>
              <Box className='space-x-4'>
                <Button className='w-32 h-11 bg-white text-[#F66262] border-[1px] border-[#F66262] hover:text-white hover:bg-[#F66262]'>
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
          customerAreas={custAreaList}
          selectedCustomer={selectedRow}
          selectArea={selectedRow?.areaId}
        />
      )}

      {/* {openAddCheckpoint && (
        <PatrolCheckpointFrom selectedRow={undefined} closeModal={handleClosePatrolCheckpointForm} custList={customerList || []} isEdit={false} areaList={[]}/>
      )} */}

      {openEditCheckpoint && (
        <PatrolCheckpointFrom
          selectedRow={selectedRow}
          closeModal={handleClosePatrolCheckpointForm}
          custList={customerList || []}
          isEdit={true}
          areaList={custAreaList || []}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

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
