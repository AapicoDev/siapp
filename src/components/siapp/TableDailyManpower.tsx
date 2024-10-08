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
import { GradientButton } from "../ui/buttons/gradientButton";
import data from "@/app/mockData.json";
import { WorkStatus } from "./WorkStatus";
import { ExportCurve, ImportCurve, Printer } from "iconsax-react";
import { Button } from "@/components/ui/buttons/button";

interface TableDailyManpowerProps {}

type RowData = {
  dateTime: string;
  customerId: number;
  shift: any;
  nameSurName: any;
  workStatus: any;
  clockIn: any;
  clockOut: any;
};

const rows: RowData[] = [
  {
    dateTime: "10/2/2024",
    customerId: 1,
    shift: "07:00 - 18:00 (จ-ส)",
    nameSurName: "Name Surname (Position)",
    workStatus: 1,
    clockIn: "06 : 58 : 12",
    clockOut: null,
  },
  {
    dateTime: "10/2/2024",
    customerId: 2,
    shift: "07:00 - 18:00 (จ-ส)",
    nameSurName: "Name Surname (Position)",
    workStatus: 2,
    clockIn: "06 : 58 : 12",
    clockOut: null,
  },
  {
    dateTime: "10/2/2024",
    customerId: 3,
    shift: "07:00 - 18:00 (จ-ส)",
    nameSurName: "Name Surname (Position)",
    workStatus: 3,
    clockIn: "06 : 58 : 12",
    clockOut: null,
  },
  {
    dateTime: "10/2/2024",
    customerId: 4,
    shift: "07:00 - 18:00 (จ-ส)",
    nameSurName: "Name Surname (Position)",
    workStatus: 4,
    clockIn: "06 : 58 : 12",
    clockOut: null,
  },
];

export function TableDailyManpower({}: TableDailyManpowerProps) {
    
  const [customers, setCustomers] = useState(data.customers);
  const [rowData, setRowData] = useState(rows);
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false));
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const totalItems = rowData.length;

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

  const handleDelete = () => {};

  const handleAddNewIncident = () => {};

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
            <TableRow
              sx={{ borderBottom: "1px solid #C7D4D7" }}
              className={`${styles.table}`}
            >
              <TableCell align="center" className="w-[26%]">
                Customer
              </TableCell>
              <TableCell align="center" className="w-[22%]">
                Shift
              </TableCell>
              <TableCell align="center" className="w-[13%]">
                Name Surname
              </TableCell>
              <TableCell align="center" className="w-[13%]">
                Work Status
              </TableCell>
              {/* Edit button col */}
              <TableCell align="center" className="w-[12%]">
                Clock-in
              </TableCell>
              <TableCell align="center" className="w-[14%]">
                Clock-Out
              </TableCell>
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
                {/* Customer */}
                <TableCell align="center">
                  {
                    customers.find((c) => c.id === row.customerId)
                      ?.customerName
                  }
                </TableCell>

                {/* shift */}
                <TableCell align="center">
                  {row.shift === null ? "-" : row.shift}
                </TableCell>

                {/* nameSurName */}
                <TableCell align="center">
                  {row.nameSurName === null ? "-" : row.nameSurName}
                </TableCell>

                {/* work Status */}
                <TableCell align="center" className="flex justify-center">
                  <WorkStatus status={row.workStatus} />
                </TableCell>

                {/* clockIn */}
                <TableCell align="center">
                  {row.clockIn === null ? "-" : row.clockIn}
                </TableCell>

                {/* clockOut */}
                <TableCell align="center">
                  {row.clockOut === null ? "-" : row.clockOut}
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
                      <Button className="flex items-center justify-center w-32 h-11 border-[1px] border-[#1D7A9B] bg-white text-[#1D7A9B] hover:bg-[#1D7A9B] hover:text-white disabled:bg-[#83A2AD]">
                        <ExportCurve size={20} className="mr-2" />
                        Download
                      </Button>
                    </Box>
                    <Box className="w-fit p-2">
                      <Button className="flex items-center justify-center w-32 h-11 border-[1px] border-[#1D7A9B] bg-white text-[#1D7A9B] hover:bg-[#1D7A9B] hover:text-white disabled:bg-[#83A2AD]">
                        <Printer size={20} className="mr-2" />
                        Print
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
