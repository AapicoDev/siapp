"use client";
import { Box, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material/";
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
import { Textbox } from "@/components/ui/textboxs/textbox";

type ChkListData = {
  id: number;
  name: string;
  abnormalStatus: string;
  normalStatus: string;
  attachPhoto: any;
};


export default function CheckList() {

  const rows: ChkListData[] = [
    {
      id: 1,
      name: "แสงสว่าง",
      abnormalStatus: "เพียงพอ",
      normalStatus: "ไม่เพียงพอ",
      attachPhoto: 1
    },
    {
      id: 2,
      name: "สิ่งกีดขวาง",
      abnormalStatus: "ไม่พบ",
      normalStatus: "พบ",
      attachPhoto: 1
    },
    {
      id: 3,
      name: "วัตถุอันตราย",
      abnormalStatus: "ไม่พบ",
      normalStatus: "พบ",
      attachPhoto: 2
    },
    {
      id: 4,
      name: "อุปกรณ์ชำรุด",
      abnormalStatus: "ไม่พบ",
      normalStatus: "พบ",
      attachPhoto: 2
    },
  ];

  const totalItems = rows.length;

  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data
  const [addCheckList, setAddCheckList] = useState("");
  const [addNormmalStatus, setAddNormalStatus] = useState("");
  const [addAbnormmalStatus, setAddAbnormalStatus] = useState("");
  const [photoAmt, setPhotoAmt] = useState<number>();

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
  const handleInputChange = <T extends keyof ChkListData>(
    index: number,
    field: T,
    value: ChkListData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //setRowData((prevData) => ({ ...prevData, [name]: value }));
    setPhotoAmt(value as unknown as number);
  };

  return (
    <div>
      <Navbar menu={'Master Data'} submenu={'Check List'} />
      <Box className="px-2">
        {/* Main Content */}
        <Box flex={1} px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className="w-full flex justify-center">
            <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
                justifyContent="space-between"
                className="space-x-4 p-4 flex w-fit"
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

                <Box className="w-full h-full flex space-x-2">
                <Checkbox3 className="w-9 h-9 mt-1"/>
                <Typography className="mt-3 text-[#2C5079] text-[15px] w-[220px]">Attach photos</Typography>
                <Textbox name="attachPhotoAmt" inputType="number" placeHolder="Amount.." value={photoAmt} handleChange={handleChange}/>
                </Box>

                <Box className="space-x-4 w-fit flex">
                  <AddButton onAddBtnClick={handleAdd}/>
                  <SearchButton onSearchBtnClick={handleSearch}/>
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
                  <TableCell align="center" className="w-[19%]">Check List</TableCell>
                  <TableCell align="center" className="w-[24%]">Status: Normal</TableCell>
                  <TableCell align="center" className="w-[19%]">Status: Abnormal</TableCell>
                  <TableCell align="center" className="w-[19%]">Attach photos</TableCell>
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
                          value={row.name}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                      ) : (
                        `${row.name}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.normalStatus}
                          onChange={(e) => handleInputChange(index, 'normalStatus', e.target.value)}
                        />
                      ) : (
                        `${row.normalStatus}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.abnormalStatus}
                          onChange={(e) => handleInputChange(index, 'abnormalStatus', e.target.value)}
                        />
                      ) : (
                        `${row.abnormalStatus}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.attachPhoto}
                          onChange={(e) => handleInputChange(index, 'attachPhoto', e.target.value)}
                        />
                      ) : (
                        `${row.attachPhoto}`
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