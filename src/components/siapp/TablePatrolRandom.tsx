"use client";

import * as React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "../../app/styles.module.css";

type RandomRowData = {
    date: string;
    start: string;
    end: string;
    customerId: number;
    areaId: any;
    round: any;
    checkPointId: any;
    patroller: string;
  };

interface TableContractProps{
    randomData: RandomRowData[];
    areas: any[];
    checkpoints: any[];
}

export function TablePatrolRandom({randomData, areas, checkpoints}: TableContractProps) {

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
                  <TableCell align="center" className="w-[16%]">
                    Date
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Start
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    End
                  </TableCell>
                  <TableCell align="center" className="w-[22%]">
                    Area (RP)
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Check Point (RP)
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Patroller
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
                {randomData.map((row, index) => (
                  <TableRow
                    key={index}
                    className={`${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`}>

                    {/* Date */}
                    <TableCell align="center" className="p-4">{row.date}</TableCell>

                    {/* Start */}
                    <TableCell align="center">{row.start}</TableCell>

                    {/* End */}
                    <TableCell align="center">{row.end}</TableCell>

                    {/* Area */}
                    <TableCell align="center">
                      { areas.find((a) => a.id === row.areaId)?.name }
                    </TableCell>

                    {/* Checkpoint */}
                    <TableCell align="center">
                      { checkpoints.find((ch) => ch.id === row.areaId)?.chkPtName }
                    </TableCell>

                    {/* Patroller */}
                    <TableCell align="center">{row.patroller}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </>
  );
}
