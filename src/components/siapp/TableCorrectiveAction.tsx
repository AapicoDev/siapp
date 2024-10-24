"use client";

import * as React from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import {
  getIncidentTypeData,
  deleteIncidentType,
} from "../../../src/app/lib/api";
import { useConfirmDialog } from "../ui/alertDialog/confirmDialog";

type IncidentType = {
  id: any;
  rowNo: number;
  incidentTypeTH: string;
  incidentTypeEN: string;
  correctiveAction: string;
  contacts: string[];
  attchments: string[];
};

interface TableCorrectiveActionProps {
  incidentTypes: IncidentType[];
}

type selectedDelete = {
  isSelected: boolean;
  incidentTypeId: any;
};

export function TableCorrectiveAction({
  incidentTypes,
}: TableCorrectiveActionProps) {
  const [rowData, setRowData] = useState(incidentTypes);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [editMode, setEditMode] = useState(
    Array(incidentTypes.length).fill(false)
  );
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isAddOrUpdateSucces, setIsAddOrUpdateSucces] = useState(false);
  const [openIncidentForm, setOpenIncidentForm] = useState(false);
  const totalItems = rowData.length;
  const [selected, setSelected] = useState<selectedDelete[]>(
    incidentTypes.map((row) => ({
      isSelected: false,
      incidentTypeId: row.id,
    }))
  );
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAddOrUpdateSucces) {
      incidentTypeData();
      setIsAddOrUpdateSucces(false);
    }
  }, [isAddOrUpdateSucces]);

  const incidentTypeData = async () => {
    setIsLoading(true);
    const response = await getIncidentTypeData();
    console.log("incidentType =", response?.documents);
    const mapincidentTypes: IncidentType[] =
      response?.documents.map((type, index) => {
        return {
          id: type.$id,
          rowNo: index + 1,
          incidentTypeEN: type.IncidentType_EN,
          incidentTypeTH: type.IncidentType_TH,
          correctiveAction: type.CorrectiveAction,
          contacts: type.Contacts,
          attchments: type.Attachments,
        };
      }) || incidentTypes;
    console.log("mapincidentTypes = ", mapincidentTypes);
    setRowData(mapincidentTypes);
    console.log("isAddOrUpdateSucces= ", isAddOrUpdateSucces);
    const mapSelect = mapincidentTypes.map((row) => ({
      isSelected: false,
      incidentTypeId: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  const handleSelected = (index: number, row: IncidentType) => {
    const newSelected = [...selected];
    newSelected[index].isSelected = !selected[index].isSelected;
    setSelected(newSelected);
    const isCheckAll = !selected.some((item) => item.isSelected === false);
    if (isCheckAll) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
    console.log("newSelected", newSelected);
    console.log("row = ", row);
    console.log("isAddOrUpdateSucces= ", isAddOrUpdateSucces);
  };

  const handleCheckAll = (checked: boolean) => {
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setSelected(selectedAll);
    console.log("selectedAll =", selectedAll);
  };

  const handleInputChange = <T extends keyof IncidentType>(
    index: number,
    field: T,
    value: IncidentType[T]
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
    setSelectedRow(row);
    setOpenIncidentForm(true);
  };

  function handleCloseIncidentForm() {
    setOpenIncidentForm(false);
    //incidentTypeData();
  }

  const handleDelete = async () => {
    const confirmApprove = await confirmDialog(
      "Delete Incident Type !",
      "Do you want to delete these incident types?"
    );
    if (confirmApprove) {
      let response: any;
      selected.forEach(async (s) => {
        if (s.isSelected === true) {
          response = await deleteIncidentType(s.incidentTypeId);
          console.log("response =", response);
        }
      });
      incidentTypeData();
      setIsAddOrUpdateSucces(true);
    }
  };

  const handleAddNewIncident = () => {
    setSelectedRow(undefined);
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
                    className="mt-1 mb-2"
                    checked={selected[index].isSelected}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click
                      handleSelected(index, row);
                    }}
                  />
                </TableCell>
                <TableCell align="center" className="max-w-48">
                  {row.incidentTypeTH} ({row.incidentTypeEN})
                </TableCell>
                <TableCell align="center">{row.correctiveAction}</TableCell>
                <TableCell align="center">
                  {row.contacts.map(
                    (contact) =>
                      `${
                        contact.replace(/;;/g, " ") +
                        `${row.contacts.length > 1 ? `,\n` : ``}`
                      }`
                  )}
                </TableCell>
                <TableCell align="center">
                  {row.attchments.length > 0 ? (
                    <Box className="justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5] cursor-pointer rounded-lg">
                      <Box className="w-[90%] text-left">
                        <Typography className="py-1 px-2 text-[#2C5079]">
                          {row.attchments[0].split(";;")[0].length > 20
                            ? row.attchments[0]
                                .split(";;")[0]
                                .substring(0, 20) + "..."
                            : row.attchments[0].split(";;")[0]}
                        </Typography>
                      </Box>
                      <GoArrowUpRight
                        size={24}
                        color="#4C9BF5"
                        style={{ marginTop: 5 }}
                      />
                    </Box>
                  ) : (
                    "-"
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

      {openIncidentForm && (
        <IncidentForm
          selectedIncidentType={selectedRow}
          customeraAeas={undefined}
          closeModal={handleCloseIncidentForm}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

      {/* Confirm dialog */}
      {ConfirmAlertDialog}

      {isLoading && <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>}
    </>
  );
}
