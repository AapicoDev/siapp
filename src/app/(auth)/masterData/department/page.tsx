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
} from "@mui/material/";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/input";
import styles from '../../../styles.module.css'
import { SelectorLabelInline } from "@/components/ui/selectorLabelInline";

type RowData = {
  departmentCode: string;
  department: string;
  segmentId: any;
  groupId: any;
  zoneId: any;
};

const segments = [
  {
    smid: 1,
    desc: "Building",
  },
  {
    smid: 2,
    desc: "Energy",
  },
  {
    smid: 3,
    desc: "Education",
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
    desc: "RONE",
  },
  {
    zid: 3,
    desc: "SVN",
  },
];

const rows: RowData[] = [
  {
    departmentCode: "401-10-036-00",
    department: "สิตาเพชร ฟู้ดแพคเจ๊ดี้",
    segmentId: 1,
    groupId: 1,
    zoneId: 1,
  },
  {
    departmentCode: "401-10-240-00",
    department: "ศูนย์บอเนอร์ซี่สองแพค",
    segmentId: 2,
    groupId: 1,
    zoneId: 1,
  },
  {
    departmentCode: "721-10-036-00",
    department: "ครัวการบินกรุงเทพ",
    segmentId: null,
    groupId: 2,
    zoneId: null,
  },
  {
    departmentCode: "411-10-041-00",
    department: "บริษัท เคนซิล งานรักษาความสะอาด",
    segmentId: 3,
    groupId: 3,
    zoneId: 1,
  },
];

const totalItems = rows.length;

export default function Department() {
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data
  const [selectedAddSegment, setSelectedAddSegment] = useState<string>();
  const [selectedAddGroup, setSelectedAddGroup] = useState<string>();
  const [selectedAddZone, setsSelectedAddZone] = useState<string>();

  // Handle Edit button click
  const handleEdit = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = true; // Enable edit mode for the clicked row
    setEditMode(newEditMode);
  };

  // Handle Save button click
  const handleSave = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = false; // Disable edit mode after saving
    setEditMode(newEditMode);
    // Optionally save changes to the server or state
  };

  const handleAddSegmentChange = (
    event: SelectChangeEvent<typeof selectedAddSegment>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedAddSegment(value);
  };

  const handleAddGroupChange = (
    event: SelectChangeEvent<typeof selectedAddGroup>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedAddGroup(value);
  };

  const handleAddZoneChange = (
    event: SelectChangeEvent<typeof selectedAddZone>
  ) => {
    const {
      target: { value },
    } = event;
    setsSelectedAddZone(value);
  };

  const handleEditSegmentChange = (dataDepartmentCode: string, selectedSegmentId: any) => {
    const updatedSegmentData = rowData.map((item) =>
      item.departmentCode ===  dataDepartmentCode ? { ...item, segmentId: selectedSegmentId } : item
    );
    setRowData(updatedSegmentData);
  };

  const handleEditGroupChange = ( dataDepartmentCode: string, selectedGroupId: any) => {
    const updatedGroupData = rowData.map((item) =>
      item.departmentCode ===  dataDepartmentCode ? { ...item, groupId: selectedGroupId } : item
    );
    setRowData(updatedGroupData);
  };

  const handleEditZoneChange = ( dataDepartmentCode: string, selectedZoneId: any) => {
    const updatedZoneData = rowData.map((item) =>
      item.departmentCode ===  dataDepartmentCode ? { ...item, zoneId: selectedZoneId } : item
    );
    setRowData(updatedZoneData);
  };
  // Handle input changes in edit mode
  // const handleInputChange = (
  //   index: number,
  //   field: string,
  //   value: string
  // ) => {
  //   const newRowData = [...rowData];
  //   newRowData[index][field]=value;
  //   setRowData(newRowData);
  // };

  // const [inputValue, setInputValue] = useState('');
  // const handleInputChange = (newValue: React.SetStateAction<string>) => {
  //   setInputValue(newValue);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  // function fncHandleChange(e: SelectChangeEvent, selectorName: any){
  //   console.log("e = ", e);
  //   handleSelectChange(e, selectorName);
  // };

  // const handleSelectChange = (e: SelectChangeEvent,selectorName: any ) => {
  //   const { name, value } = e.target;
  //   if(selectorName.includes("Segment")){
  //     setSelectedAddSegment(value);
  //   }
    
  //   console.log("selectedAddSegment = ", selectedAddSegment)
  // };

  return (
    <div>
      <Navbar menu={"Master Data"} submenu={"Department"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>

          {/* Sub Header */}
          <Box mb={2} className="w-full">
            <Box justifyContent="center">
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
                justifyContent="space-between"
                className="space-x-4 p-4 flex"
              >
                <TextField
                  label="Department Code"
                  size="small"
                  className="w-[14%]"
                  focused
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        border: "1px solid #1D7A9B", // Focus border color
                        borderRadius: "10px",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2C5079", // Label color when focused
                      fontWeight: "bold",
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
                  className="w-[17%]"
                  focused
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        border: "1px solid #1D7A9B", // Focus border color
                        borderRadius: "10px",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2C5079", // Label color when focused
                      fontWeight: "bold",
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      color: "#83A2AD", // Customize placeholder text color
                      opacity: 1, // Ensure full opacity for the placeholder
                    },
                  }}
                  placeholder={"Type here..."}
                />

                <FormControl focused className="w-[16%]">
                  <InputLabel
                    className="font-bold text-[#2C5079]"
                    sx={{
                      "&.Mui-focused": {
                        color: "#2C5079", // Customize label color on focus
                        fontWeight: "bold",
                      },
                    }}>
                    Segment
                  </InputLabel>
                  <Select
                    label="Segment"
                    size="small"
                    displayEmpty
                    value={selectedAddSegment}
                    onChange={handleAddSegmentChange}
                    renderValue={(selected) => {
                      if (selected === undefined) {
                        return "Select";
                      }
                      return selected;
                    }}
                    className={`${ selectedAddSegment === undefined ? `text-[#83A2AD]` : "" }`}
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Customize border color
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Customize border color on focus
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Hover border color
                      },
                      "& .MuiSelect-icon": {
                        color: "#a0a0a0", // Customize arrow icon color
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

                <FormControl focused className="w-[18%]">
                  <InputLabel
                    className="font-bold text-[#2C5079]"
                    sx={{
                      "&.Mui-focused": {
                        color: "#2C5079", // Customize label color on focus
                        fontWeight: "bold",
                      },
                    }}
                  >
                    Group
                  </InputLabel>
                  <Select
                    label="Group"
                    size="small"
                    displayEmpty
                    value={selectedAddGroup}
                    onChange={handleAddGroupChange}
                    renderValue={(selected) => {
                      if (selected === undefined) {
                        return "Select";
                      }
                      return selected;
                    }}
                    className={`${
                      selectedAddGroup === undefined ? `text-[#83A2AD]` : ""
                    }`}
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Customize border color
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Customize border color on focus
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Hover border color
                      },
                      "& .MuiSelect-icon": {
                        color: "#a0a0a0", // Customize arrow icon color
                      },
                    }}
                  >
                    {groups.map((group) => (
                      <MenuItem key={group.gid} value={group.desc}>
                        {group.desc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl focused className="w-[16%]">
                  <InputLabel
                    className="font-bold text-[#2C5079]"
                    sx={{
                      "&.Mui-focused": {
                        color: "#2C5079", // Customize label color on focus
                        fontWeight: "bold",
                      },
                    }}
                  >
                    Zone
                  </InputLabel>
                  <Select
                    label="Zone"
                    size="small"
                    displayEmpty
                    value={selectedAddZone}
                    onChange={handleAddZoneChange}
                    renderValue={(selected) => {
                      if (selected === undefined) {
                        return "Select";
                      }
                      return selected;
                    }}
                    className={`${
                      selectedAddZone === undefined ? `text-[#83A2AD]` : ""
                    }`}
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Customize border color
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Customize border color on focus
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1D7A9B", // Hover border color
                      },
                      "& .MuiSelect-icon": {
                        color: "#a0a0a0", // Customize arrow icon color
                      },
                    }}
                  >
                    {zones.map((zone) => (
                      <MenuItem key={zone.zid} value={zone.desc}>
                        {zone.desc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box className="justify-around w-[16%] flex">
                  <Button className="w-[84px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] pr-2">
                    + Add
                  </Button>
                  <Button className="w-24 bg-[#37B7C3] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]">
                    Search
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

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
                <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }} 
                          className={`${styles.table}`} >
                  <TableCell align="left" className="w-[4%]">
                    <Checkbox2 />
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                    Department Code
                  </TableCell>
                  <TableCell align="center" className="w-[20%]">
                    Department
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Segment
                  </TableCell>
                  <TableCell align="center" className="w-[18%]">
                    Group
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Zone
                  </TableCell>
                  {/* Edit button col */}
                  <TableCell align="center" className="w-[14%]"></TableCell>
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
                    sx={{ "& .MuiTableCell-root": {
                      padding: "10px 10px 10px 20px", // Customize border color
                    },}}>
                    <TableCell align="left">
                      <Checkbox2/>
                    </TableCell>

                    {/* DepartmentCode */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          style={{ borderRadius: "10px", textAlign: "center"}}
                          className="border-[#4C9BF5] bg-white p-4 w-full justify-between"
                          value={row.departmentCode}
                          //onChange={(e) => handleInputChange(index, 'segment', e.target.value)}
                          onChange={(e)=>handleChange(e)}
                        />
                      ) : (
                        `${row.departmentCode}`
                      )}
                    </TableCell>

                    {/* Department */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          style={{ borderRadius: "10px", textAlign: "center" }}
                          className="border-[#4C9BF5] bg-white p-4 min-w-fit justify-between"
                          value={row.department}
                        />
                      ) : (
                        `${row.department}`
                      )}
                    </TableCell>

                    {/* Segment */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <FormControl focused className="w-full">
                          <InputLabel
                            className="font-bold text-[#2C5079] w-full"
                          ></InputLabel>
                          <Select
                            labelId={`select-segment-label-${row.departmentCode}`}
                            size="small"
                            value={row.segmentId || ""}
                            onChange={(e)=>handleEditSegmentChange(row.departmentCode, e.target.value)}
                            className={`${row.segmentId === null ? `text-[#83A2AD]` : ""} bg-white text-sm text-[#2C5079]`}
                            displayEmpty
                            renderValue={(value) => (value === "" ? "Select" : segments.find((segment) => segment.smid === value)?.desc)}
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{
                              height: "40px",
                              width: "100%",
                              borderRadius: "10px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #4C9BF5", // Customize border color
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px solid #4C9BF5", // Customize border color on focus
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #4C9BF5", // Hover border color
                              },
                              "& .MuiSelect-icon": {
                                color: "#a0a0a0", // Customize arrow icon color
                              },
                            }}
                          >
                            {segments.map((segment) => (
                              <MenuItem key={segment.smid} value={segment.smid} className="text-sm text-[#2C5079]">
                                {segment.desc}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        `${row.segmentId === null ? "-" : segments.find(s => s.smid === row.segmentId)?.desc}`
                      )}
                    </TableCell>

                    {/* Group */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <FormControl focused className="w-full">
                          <InputLabel
                            className="font-bold text-[#2C5079]"
                          ></InputLabel>
                          <Select
                            size="small"
                            value={row.groupId || ""}
                            onChange={(e)=>handleEditGroupChange(row.departmentCode, e.target.value)}
                            className={`${row.groupId === null ? `text-[#83A2AD]` : ""} bg-white text-sm text-[#2C5079]`}
                            displayEmpty
                            renderValue={(value) => (value === "" ? "Select" : groups.find((group) => group.gid === value)?.desc)}
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{
                              height: "40px",
                              width: "100%",
                              borderRadius: "10px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #4C9BF5", // Customize border color
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px solid #4C9BF5", // Customize border color on focus
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #4C9BF5", // Hover border color
                              },
                              "& .MuiSelect-icon": {
                                color: "#a0a0a0", // Customize arrow icon color
                              },
                            }}
                          >
                            {groups.map((group) => (
                              <MenuItem key={group.gid} value={group.gid} className="text-sm text-[#2C5079]">
                                {group.desc}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        `${row.groupId === null ? "-" : groups.find(s => s.gid === row.groupId)?.desc}`
                      )}
                    </TableCell>

                    {/* Zone */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <FormControl focused className="justify-center w-full">
                          <InputLabel
                            className="font-bold text-[#2C5079]"
                          ></InputLabel>
                          <Select
                            size="small"
                            value={row.zoneId || ""}
                            onChange={(e)=>handleEditZoneChange(row.departmentCode, e.target.value)}
                            className={`${row.zoneId === null ? `text-[#83A2AD]` : ""} bg-white text-sm text-[#2C5079]`}
                            displayEmpty
                            renderValue={(value) => (value === "" ? "Select" : zones.find((zone) => zone.zid === value)?.desc)}
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{
                              height: "40px",
                              width: "100%",
                              borderRadius: "10px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #4C9BF5", // Customize border color
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px solid #4C9BF5", // Customize border color on focus
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #4C9BF5", // Hover border color
                              },
                              "& .MuiSelect-icon": {
                                color: "#a0a0a0", // Customize arrow icon color
                              },
                            }}
                          >
                            {zones.map((zone) => (
                              <MenuItem key={zone.zid} value={zone.zid} className="text-sm text-[#2C5079]">
                                {zone.desc}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        `${row.zoneId === null ? "-" : zones.find(s => s.zid === row.zoneId)?.desc}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Button
                          style={{
                            fontWeight: "bold",
                          }}
                          className="w-[84px] bg-[#4C9BF5] hover:bg-[white] hover:text-[#4C9BF5] hover:border-[#4C9BF5] hover:border-2"
                          onClick={() => handleSave(index)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          style={{
                            border: "1px solid #37B7C3",
                            fontWeight: "bold",
                          }}
                          className="w-[84px] text-[#37B7C3] bg-white hover:bg-[#37B7C3] hover:text-white"
                          onClick={() => handleEdit(index)}
                        >
                          <Edit2 />
                          Edit
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
                      <Typography>Total: {totalItems} items</Typography>
                      <Button
                        style={{ marginLeft: "auto", fontWeight: "bold" }}
                        className="w-48 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#F66262] hover:to-[#FFD0D0] 
                                 hover:text-[#00336C] disabled:bg-[#83A2AD]"
                        disabled={true}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}
