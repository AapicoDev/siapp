"use client";

import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styles from "../../app/styles.module.css";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { SaveButton } from "../ui/buttons/saveButton";
import { EditButton } from "../ui/buttons/editButton";
import { Input } from "@/components/ui/textboxs/input";
import { GradientButton } from "../ui/buttons/gradientButton";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { DeleteButton } from "../ui/buttons/deleteButton";
import { GoArrowUpRight } from "react-icons/go";
import IncidentForm from "./IncidentForm";

type incidentType = {
  rowNo: number;
  incidentTypeTH: string;
  incidentTypeEN: string;
  correctiveAction: string;
  contacts: string[]; 
  attchments: string[];
};

interface TableCorrectiveActionProps {
  incidentTypes: incidentType[];
}

type selectedDelete = {
  isSelected: boolean;
  segId: number;
};

export function TableCorrectiveAction({
  incidentTypes,
}: TableCorrectiveActionProps) {
  const [rowData, setRowData] = useState(incidentTypes);
  const [editMode, setEditMode] = useState(
    Array(incidentTypes.length).fill(false)
  );
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openIncidentForm, setOpenIncidentForm] = useState(false);
  const totalItems = rowData.length;
  const [selected, setSelected] = useState<selectedDelete[]>(
    incidentTypes.map((row) => ({
      isSelected: false,
      segId: row.rowNo,
    }))
  );

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

  const handleInputChange = <T extends keyof incidentType>(
    index: number,
    field: T,
    value: incidentType[T]
  ) => {
    const newRowData = [...incidentTypes];
    newRowData[index][field] = value;
    setRowData(newRowData);
  };

  const handleEdit = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = true; // Enable edit mode for the clicked row
    setEditMode(newEditMode);
  };

  const handleSave = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = false; // Disable edit mode after saving
    setEditMode(newEditMode);
    // Optionally save changes to the server or state
  };

  const handleRowClick = (row: any) => {
    console.log("selectedRow =", row);
    //setOpenIncidentForm(true);
  };

  function handleCloseIncidentForm() {
    setOpenIncidentForm(false);
  }

  const handleDelete = () => {};

  const handleAddNewIncident = () => {
    setOpenIncidentForm(true);
  };

  return (
    <>
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
                <Checkbox2
                  className="mt-1 mb-2"
                  checked={isSelectedAll}
                  onCheckedChange={handleCheckAll}
                />
              </TableCell>
              <TableCell align="center" className="w-[25%]">
                Incident Type
              </TableCell>
              <TableCell align="center" className="w-[25%]">
                Corrective Action
              </TableCell>
              <TableCell align="center" className="w-[30%]">
                Contact
              </TableCell>
              <TableCell align="center" className="w-[25%]">
                Attachment
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Allow the TableBody to grow and fill vertical space */}
          <TableBody sx={{ flexGrow: 1 }}>
            {rowData.map((row, index) => (
              <TableRow
                onClick={() => handleRowClick(row)}
                key={index}
                className={`${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`}
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
                  <Checkbox2
                    checked={selected[index].isSelected}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click
                      handleSelected(index);
                    }}
                  />
                </TableCell>
                <TableCell align="center" className="max-w-48">
                    {row.incidentTypeTH} ({row.incidentTypeEN})
                </TableCell>
                <TableCell align="center">
                    {row.correctiveAction}
                </TableCell>
                <TableCell align="center">
                    {row.contacts}
                </TableCell>
                <TableCell align="center">
                  <Box className="justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5] cursor-pointer rounded-lg">
                    <Box className="w-[90%] text-left">
                      <Typography className="py-1 px-2 text-[#2C5079]">
                        row.attachment
                      </Typography>
                    </Box>
                    <GoArrowUpRight
                      size={24}
                      color="#4C9BF5"
                      style={{ marginTop: 5 }}
                    />
                  </Box>
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
                  <Box className="w-fit flex">
                    <Box className="w-fit p-2">
                      <DeleteButton
                        onDeleteBtnClick={handleDelete}
                        disable={!selected.some((item) => item.isSelected)}
                      />
                    </Box>
                    <Box className="w-fit p-2">
                      <GradientButton
                        content={"+ New"}
                        onBtnClick={handleAddNewIncident}
                      />
                    </Box>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {openIncidentForm && 
        <IncidentForm editCustomer={undefined} customeraAeas={undefined} closeModal={handleCloseIncidentForm}/>
      }
    </>
  );
}
