"use client";
import { Box, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material/";
import SegmentTable from "@/components/materData/SegmentTable";
import Navbar from "@/components/Navbar";
import LabelTextField from "@/components/ui/LabelTextField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/input";

type RowData = {
    zone: string;
  description: string;
  department: number;
  customer: number;
};

// interface SegmentTableProps {
//   row: RowData[]
// }

export default function Zone() {

  const rows: RowData[] = [
    {
      zone: "BMR",
      description: "กรุงเทพมหานครและปริมณฑล",
      department: 6,
      customer: 5,
    },
    {
        zone: "RONE",
      description: "ภาคตะวันออกเฉียงเหนือ",
      department: 1,
      customer: 1,
    },
    {
        zone: "SVN",
      description: "สนามบินสุวรรณภูมิ",
      department: 4,
      customer: 3,
    },
    {
        zone: "DMK",
      description: "สนามบินดอนเมือง",
      department: 1,
      customer: 1,
    },
  ];

  const totalItems = rows.length;

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
    <div>
      <Navbar menu={'Master Data'} submenu={'Zone'} />
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
                  label={"Zone"}
                  placeholder={"Type here..."}
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
                <TableCell align="left" className="w-[5%]">
                    <Checkbox2 />
                  </TableCell>
                  <TableCell align="center" className="w-[19%]">Zone</TableCell>
                  <TableCell align="center" className="w-[24%]">Description</TableCell>
                  <TableCell align="center" className="w-[19%]">Department</TableCell>
                  <TableCell align="center" className="w-[19%]">Customer</TableCell>
                  <TableCell align="center" className="w-[14%]"></TableCell>
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
                          className="border-[#4C9BF5] bg-white p-4 min-w-fit justify-between"
                          value={row.zone}
                          // onChange={(e) => handleInputChange(index, 'segment', e.target.value)}
                          onChange={handleChange}
                        />
                      ) : (
                        `${row.zone}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          style={{ borderRadius: "10px", textAlign: "center" }}
                          className="border-[#4C9BF5] bg-white p-4 min-w-fit justify-between"
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