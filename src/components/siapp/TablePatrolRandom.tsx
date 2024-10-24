"use client";

import * as React from "react";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "../../app/styles.module.css";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getAllRandomPatrolCheckpointData
} from "../../app/lib/api";
import PatrolDeatilView from "./PatrolDetailView";
import RandomPatrolDeatilView from "./RandomPatrolDetailView";
import { GradientButton } from "../ui/buttons/gradientButton";
import { BlueButttonFooter } from "../ui/buttons/blueButtonFooter";
import { ImportCurve, Printer } from "iconsax-react";
import { Button } from "../ui/buttons/button";

type RandomRowData = {
  startDateTime: string;
  endDateTime: string;
  customerName: string;
  areaName: any;
  checkpointId: string;
  checkPointName: any;
  patroller: string;
  remark: string;
  reasonId: string;
  reason: string;
  image: any[];
  latestEdit: string;
};
type selectedCheckBox = {
  isSelected: boolean;
  id: string;
};

interface TableContractProps {

}

export function TablePatrolRandom({ }: TableContractProps) {

  const [selectedRow, setSelectedRow] = useState<RandomRowData>();
  const [openRandomPatrolDetailModal, setOpenRandomPatrolDetailModal] = useState<boolean>(false);
  const [patrolRandomCheckpoints, setPatrolRandomCheckpoints] = useState<RandomRowData[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selected, setSelected] = useState<selectedCheckBox[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getRandomData();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with 0 if necessary
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleRowClick = async (row: RandomRowData) => {
    setSelectedRow(row);
    console.log("row =", row)
    setOpenRandomPatrolDetailModal(true);
  }

  function handleClosePatrolDetailView() {
    setOpenRandomPatrolDetailModal(false);
  }

  const getRandomData = async () => {
    setIsLoading(true);
    const randomPatrols = await getAllRandomPatrolCheckpointData();
    console.log("randomPatrols =", randomPatrols);
    const reOrder = randomPatrols?.documents.sort((a, b) => {
      return new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime();
    });
    const tableData: RandomRowData[] =
      randomPatrols?.documents.map((random, index) => {
        return {
          startDateTime: random.startTime,
          endDateTime: random.endTime,
          customerName: random.customerName,
          areaName: random.areaName,
          checkpointId: random.$id,
          checkPointName: random.checkpointName,
          patroller: random.patrollerName,
          remark: random.remark,
          image: random.images,
          reasonId: random.reason_Id,
          reason: random.reason,
          latestEdit: random.$updatedAt,
        };
      }) || patrolRandomCheckpoints;
    console.log("random patrol tableData = ", tableData);
    setPatrolRandomCheckpoints(tableData);
    const mapSelect: selectedCheckBox[] = tableData.map((row) => ({
      isSelected: false,
      id: row.checkpointId,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
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

  return (
    <>
      <TableContainer
        className="h-screen bg-white p-2"
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
              <TableCell align="left" className="w-[5%]">
                <Checkbox className="mt-1 mb-2"
                checked={isSelectedAll}
                onCheckedChange={(checked: boolean) => handleCheckAll(checked)}
                />
              </TableCell>
              <TableCell align="center" className="w-[11%]">
                Date
              </TableCell>
              <TableCell align="center" className="w-[10%]">
                Start
              </TableCell>
              <TableCell align="center" className="w-[10%]">
                End
              </TableCell>
              <TableCell align="center" className="w-[18%]">
                Customer
              </TableCell>
              <TableCell align="center" className="w-[18%]">
                Area (RP)
              </TableCell>
              <TableCell align="center" className="w-[14%]">
                Check Point (RP)
              </TableCell>
              <TableCell align="center" className="w-[14%]">
                Patroller
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Allow the TableBody to grow and fill vertical space */}
          <TableBody sx={{ flexGrow: 1 }}>
            {patrolRandomCheckpoints.map((row, index) => (
              <TableRow
                onClick={() => handleRowClick(row)} // Row click handler
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
                }}>

                <TableCell align="left">
                  <Checkbox
                    className="mt-1 mb-2"
                    checked={selected[index].isSelected}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click
                      handleSelected(index);
                    }}
                  />
                </TableCell>

                {/* Date */}
                <TableCell align="center" className="p-4">{formatDate(row.endDateTime)}</TableCell>

                {/* Start */}
                <TableCell align="center">{formatTime(row.startDateTime)}</TableCell>

                {/* End */}
                <TableCell align="center">{formatTime(row.endDateTime)}</TableCell>

                {/* Customer */}
                <TableCell align="center">
                  {row.customerName}
                </TableCell>

                {/* Area */}
                <TableCell align="center">
                  {row.areaName}
                </TableCell>

                {/* Checkpoint */}
                <TableCell align="center">
                  {row.checkPointName}
                </TableCell>

                {/* Patroller */}
                <TableCell align="center">{row.patroller}</TableCell>
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
                  <Typography>Total: {patrolRandomCheckpoints.length} items</Typography>
                  <Box className="w-fit flex">
                    <Box className="w-fit p-2">
                      <Button disabled={true} className="flex items-center justify-center w-32 h-11 border-[1px] border-[#1D7A9B] bg-white font-bold text-[#1D7A9B] hover:bg-[#1D7A9B] hover:text-white disabled:bg-[#83A2AD]">
                        <Printer size={20} className="mr-2" />
                        Download
                      </Button>
                    </Box>
                    <Box className="w-fit p-2">
                      <Button disabled={true} className="flex items-center justify-center w-32 h-11 border-[1px] border-[#1D7A9B] bg-white font-bold text-[#1D7A9B] hover:bg-[#1D7A9B] hover:text-white disabled:bg-[#83A2AD]">
                        <ImportCurve size={20} className="mr-2" />
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

      {openRandomPatrolDetailModal && (
        <RandomPatrolDeatilView
          closeModal={handleClosePatrolDetailView}
          checkpoint={selectedRow || patrolRandomCheckpoints[0]}
        />
      )}

      {isLoading && <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>}
    </>
  );
}
