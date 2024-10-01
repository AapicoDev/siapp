"use client";
import { Box, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material/";
import SegmentTable from "@/components/materData/SegmentTable";
import Navbar from "@/components/Navbar";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { Button } from "@/components/ui/buttons/button";
import { useState } from "react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/textboxs/input";
import { AddButton } from "@/components/ui/buttons/addButton";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import styles from "../../../styles.module.css"
import { EditButton } from "@/components/ui/buttons/editButton";
import { SaveButton } from "@/components/ui/buttons/saveButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3"

type RowData = {
  id: number;
  segment: string;
  description: string;
  department: number;
  customer: number;
};


export default function CheckList() {

  const rows: RowData[] = [
    {
      id: 1,
      segment: "Building",
      description: "กลุ่มอาคาร",
      department: 6,
      customer: 5,
    },
    {
      id: 2,
      segment: "Energy",
      description: "กลุ่มพลังงาน",
      department: 1,
      customer: 1,
    },
    {
      id: 3,
      segment: "Education",
      description: "กลุ่มการศึกษา",
      department: 4,
      customer: 3,
    },
    {
      id: 4,
      segment: "Hospitality",
      description: "กลุ่มการแพทย์",
      department: 1,
      customer: 1,
    },
  ];

  const totalItems = rows.length;

  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data
  const [addCheckList, setAddCheckList] = useState("");
  const [addNormmalStatus, setAddNormalStatus] = useState("");
  const [addAbnormmalStatus, setAddAbnormalStatus] = useState("");

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

  const handleAdd = () => {
  };

  const handleSearch = () => {

  };

  const handleDelete = () => {
    
  };

  // Handle input changes in edit mode
  const handleInputChange = <T extends keyof RowData>(
    index: number,
    field: T,
    value: RowData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Navbar menu={'Master Data'} submenu={'Check List'} />
      <Box className="px-2">
        {/* Main Content */}
        <Box flex={1} px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className="w-full flex justify-center">
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
                  label={"Check List"}
                  placeholder={"Type here..."}
                  inputVal={addCheckList}
                  setInputVal={setAddCheckList}
                />
                <LabelTextField
                  label={"Status: Normal"}
                  placeholder={"Type here..."}
                  inputVal={addNormmalStatus}
                  setInputVal={setAddNormalStatus}
                />
                <LabelTextField
                  label={"Status: Abnormal"}
                  placeholder={"Type here..."}
                  inputVal={addAbnormmalStatus}
                  setInputVal={setAddAbnormalStatus}
                />

                <Checkbox3 className="w-9 h-9 mt-1"/>

                <Box className="min-w-[108px] h-full">
                <Typography className="text-center mt-2">Attach photos</Typography>
                </Box>
                <Box className="min-w-[98px] h-full text-center align-middle">
                <Typography className="text-center border-[1px] rounded-lg h-10">Amount...</Typography>
                </Box>

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
                <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                <TableCell align="left" className="w-[5%]">
                    <Checkbox2 className="mt-1 mb-2"/>
                  </TableCell>
                  <TableCell align="center" className="w-[19%]">Segment</TableCell>
                  <TableCell align="center" className="w-[24%]">Description</TableCell>
                  <TableCell align="center" className="w-[19%]">Department</TableCell>
                  <TableCell align="center" className="w-[19%]">Customer</TableCell>
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
                  >
                    <TableCell align="left">
                      <Checkbox2 />
                    </TableCell>
                    <TableCell align="center" className="max-w-48">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.segment}
                          onChange={(e) => handleInputChange(index, 'segment', e.target.value)}
                        />
                      ) : (
                        `${row.segment}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.description}
                          onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        />
                      ) : (
                        `${row.description}`
                      )}
                    </TableCell>
                    <TableCell align="center">{row.department}</TableCell>
                    <TableCell align="center">{row.customer}</TableCell>
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