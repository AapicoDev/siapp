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
import { Button } from "@/components/ui/buttons/button";
import { ChangeEvent, useState } from "react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/textboxs/input";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import { AddButton } from "@/components/ui/buttons/addButton";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import styles from "../../../styles.module.css"
import { EditButton } from "@/components/ui/buttons/editButton";
import { SaveButton } from "@/components/ui/buttons/saveButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { LabelSelector2 } from "@/components/ui/selectors/labelSelector2";

type RowData = {
  departmentCode: string;
  department: string;
  segmentId: any;
  groupId: any;
  zoneId: any;
};

const segments = [
  {
    id: 1,
    desc: "Building",
  },
  {
    id: 2,
    desc: "Energy",
  },
  {
    id: 3,
    desc: "Education",
  },
];

const groups = [
  {
    id: 1,
    desc: "General Guard",
  },
  {
    id: 2,
    desc: "Cargo",
  },
  {
    id: 3,
    desc: "Cleaning",
  },
];

const zones = [
  {
    id: 1,
    desc: "BMR",
  },
  {
    id: 2,
    desc: "RONE",
  },
  {
    id: 3,
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
  const [selectedAddSegment, setSelectedAddSegment] = useState<number>();
  const [selectedAddGroup, setSelectedAddGroup] = useState<string>();
  const [selectedAddZone, setsSelectedAddZone] = useState<string>();
  const [addDeptCodeVal, setAddDeptCodeVal] = useState("");
  const [addDeptVal, setAddDeptVal] = useState("");

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
    console.log("rowData =", rowData)
    // Optionally save changes to the server or state
  };

  const handleAdd = () => {
    console.log("AddDeptVal = ",addDeptVal);
    console.log("AddDeptCodeVal = ",addDeptCodeVal);
    console.log("addsegmentVal = ",selectedAddSegment);
    console.log("addGroupVal = ",selectedAddGroup);
    console.log("addZoneVal = ",selectedAddZone);
  };

  const handleSearch = () => {
    console.log("AddDeptVal = ",addDeptVal);
    console.log("AddDeptCodeVal = ",addDeptCodeVal);
    console.log("addsegmentVal = ",selectedAddSegment);
  };

  const handleDelete = () => {
    
  };

  const handleInputChange = <T extends keyof RowData>(
    index: number,
    field: T,
    value: RowData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
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
                className="space-x-4 p-4 flex w-full"
              >
                <LabelTextField
                  label={"Department Code"}
                  placeholder={"Type here..."}
                  inputVal={addDeptCodeVal}
                  setInputVal={setAddDeptCodeVal}
                />
                <LabelTextField
                  label={"Department"}
                  placeholder={"Type here..."}
                  inputVal={addDeptVal}
                  setInputVal={setAddDeptVal}
                />

                {/* Selector Add Segment */}
                <LabelSelector selectorLabel={"Segment"} itemSource={segments} setSelectedVal={setSelectedAddSegment} selectedVal={selectedAddSegment} name={"segment"} />

                {/* Selector Add Segment */}
                <LabelSelector selectorLabel={"Group"} itemSource={groups} setSelectedVal={setSelectedAddGroup} selectedVal={selectedAddGroup} name={"group"} />

                {/* Selector Add Segment */}
                <LabelSelector selectorLabel={"Zone"} itemSource={zones} setSelectedVal={setsSelectedAddZone} selectedVal={selectedAddZone} name={"zone"} />

                <Box className="space-x-4 w-full flex">
                  <AddButton onAddBtnClick={handleAdd}/>
                  <SearchButton onSearchBtnClick={handleSearch}/>
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
                    <Checkbox2 className="mt-1 mb-2"/>
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
                      padding: "10px 10px 10px 20px",
                    },}}>
                    <TableCell align="left">
                      <Checkbox2/>
                    </TableCell>

                    {/* DepartmentCode */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.departmentCode}
                          onChange={(e) => handleInputChange(index, 'departmentCode', e.target.value)}
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
                          className={`${styles.textBoxCell}`}
                          value={row.department}
                          onChange={(e) => handleInputChange(index, 'department', e.target.value)}
                        />
                      ) : (
                        `${row.department}`
                      )}
                    </TableCell>

                    {/* Segment */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <LabelSelector2 itemSource={segments} selectedVal={row.segmentId} id={row.departmentCode} handleSelectedVal={handleEditSegmentChange}/>
                      ) : (
                        `${row.segmentId === null ? "-" : segments.find(s => s.id === row.segmentId)?.desc}`
                      )}
                    </TableCell>

                    {/* Group */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <LabelSelector2 itemSource={groups} selectedVal={row.groupId} id={row.departmentCode} handleSelectedVal={handleEditGroupChange}/>
                      ) : (
                        `${row.groupId === null ? "-" : groups.find(s => s.id === row.groupId)?.desc}`
                      )}
                    </TableCell>

                    {/* Zone */}
                    <TableCell align="center">
                      {editMode[index] ? (
                        <LabelSelector2 itemSource={zones} selectedVal={row.zoneId} id={row.departmentCode} handleSelectedVal={handleEditZoneChange}/>
                      ) : (
                        `${row.zoneId === null ? "-" : zones.find(s => s.id === row.zoneId)?.desc}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <SaveButton onSaveBtnClick={handleSave} index={index}/>
                      ) : (
                        <EditButton onEditBtnClick={handleEdit} index={index}/>
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
                      <DeleteButton onDeleteBtnClick={handleDelete} disable={true}/>
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
