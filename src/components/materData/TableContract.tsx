"use client";

import * as React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "../../app/styles.module.css";
import { Checkbox } from "@/components/ui/checkbox";

interface TableContract{
    contractData: any[];
    custData: any[];
    isSelectedAll: boolean;
    handlecheckAll: (checked: boolean) => void;
    editMode: any[];
    selected: any[];
    handleSelected: (index: number) => void;
}

export function TableContract({contractData, custData, isSelectedAll, handlecheckAll, editMode, selected, handleSelected}: TableContract) {

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
                  <TableCell align="left" className="w-[4%]">
                    <Checkbox className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={(checked: boolean) => handlecheckAll(checked)}
                    />
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Contract No
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Start Date
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    End Date
                  </TableCell>
                  <TableCell align="center" className="w-[22%]">
                    Customer
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Attachment
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
                {contractData.map((row, index) => (
                  <TableRow
                    //onClick={() => handleRowClick(row)} // Row click handler
                    key={index}
                    className={
                      editMode[index]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
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
                      <Checkbox
                        checked={selected[index].isSelected}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          handleSelected(index);
                        }}
                      />
                    </TableCell>

                    {/* Contract No */}
                    <TableCell align="center">{row.id}</TableCell>

                    {/* Start Date */}
                    <TableCell align="center">{row.startDate}</TableCell>

                    {/* End Date */}
                    <TableCell align="center">{row.endDate}</TableCell>

                    {/* Customer */}
                    <TableCell align="center">
                      {
                        custData.find((d) => d.customerId === row.custId)
                          ?.customerName
                      }
                    </TableCell>

                    {/* Attachment */}
                    <TableCell align="center">
                      <Box
                        className="justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5] cursor-pointer rounded-lg"
                      >
                       <Box className="w-[90%] text-left">
                          <Typography className="py-1 px-2 text-[#2C5079]">
                            {row.attachment}
                          </Typography>
                        </Box>
                        <GoArrowUpRight size={24} color="#4C9BF5" style={{ marginTop: 5 }}/>
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell align="center" className="w-full flex justify-center">
                      {row.isActive ? (
                        <Box className="w-[128px] justify-center flex p-1 bg-[#86DC89] max-w-[220px] cursor-pointer rounded-lg">
                          <Typography className="py-1 px-2 text-[white]">Active</Typography>
                        </Box>
                      ) : (
                        <Box className="w-[128px] justify-center flex p-1 bg-[#83A2AD] max-w-[220px] cursor-pointer rounded-lg">
                          <Typography className="py-1 px-2 text-[white]">Inactive</Typography>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </>
  );
}
