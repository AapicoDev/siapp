// components/SegmentPage.tsx

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  TableFooter,
  Typography,
  Checkbox,
  Button as Botton2,
} from "@mui/material";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import LabelTextField from "../ui/textboxs/LabelTextField";
import { Button } from "@/components/ui/buttons/button";
import { Edit2 } from "iconsax-react";
import { useState } from "react";

type RowData = {
  segment: string;
  description: string;
  department: number;
  customer: number;
};

// interface SegmentTableProps {
//   row: RowData[]
// }

// const SegmentTable: React.FC<SegmentTableProps> = ({ row }) => {
const SegmentTable = () => {
  const totalItems = 5;

  const rows: RowData[] = [
    {
      segment: "Building",
      description: "กลุ่มอาคาร",
      department: 6,
      customer: 5,
    },
    {
      segment: "Energy",
      description: "กลุ่มพลังงาน",
      department: 1,
      customer: 1,
    },
    {
      segment: "Education",
      description: "กลุ่มการศึกษา",
      department: 4,
      customer: 3,
    },
    {
      segment: "Hospitality",
      description: "กลุ่มการแพทย์",
      department: 1,
      customer: 1,
    },
  ];

  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data

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

  return (
    <>
      {/* <Box>
    <Input
              type="text"
              placeholder="Search..."
              style={{ position: "relative", top: -50, left:'930px',
                      boxShadow: "0px 5px 12px rgba(29, 122, 155, 0.1)",
                      borderRadius: "10px",}}
              className="border-none bg-white p-4 min-w-80 custom-placeholder max-w-36"
            />
    </Box> */}
      <Box className="px-2">
        {/* Main Content */}
        <Box flex={1} px={2} pb={2}>
          {/* Sub Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            justifyItems="center"
            mb={2}
          >
            <Box display="flex" justifyContent="center" className="w-full">
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
                justifyContent="space-between"
                className="space-x-4 p-4"
              >
                <LabelTextField
                  label={"Segment"}
                  placeholder={"Type here..."}
                  inputVal={undefined}
                  setInputVal={function (value: any): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <TextField
                  label="Description"
                  size="small"
                  className="w-72"
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
                <Button className="w-24 bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]">
                  + Add
                </Button>
                <Button className="w-24 bg-[#37B7C3] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]">
                  Search
                </Button>
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
                  <TableCell align="left">
                    <Checkbox2 />
                  </TableCell>
                  <TableCell align="center">Segment</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Department</TableCell>
                  <TableCell align="center">Customer</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
                {rows.map((row, index) => (
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
                          style={{ borderRadius: "10px", textAlign: "center" }}
                          className="border-[#4C9BF5] bg-white p-4 min-w-full justify-between"
                          value={row.segment}
                          // onChange={(e) => handleInputChange(index, 'segment', e.target.value)}
                          onChange={handleChange}
                        />
                      ) : (
                        `${row.segment}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          style={{ borderRadius: "10px", textAlign: "center" }}
                          className="border-[#4C9BF5] bg-white p-4 min-w-full justify-between"
                          value={row.description}
                        />
                      ) : (
                        `${row.description}`
                      )}
                    </TableCell>
                    <TableCell align="center">{row.department}</TableCell>
                    <TableCell align="center">{row.customer}</TableCell>
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
                        className="w-48 bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#F66262] hover:to-[#FFD0D0] hover:text-[#00336C]"
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
    </>
  );
};

export default SegmentTable;
