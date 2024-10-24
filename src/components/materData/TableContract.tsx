"use client";

import * as React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "../../app/styles.module.css";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteButton } from "../ui/buttons/deleteButton";
import { Button } from "@/components/ui/buttons/button";
import ContractForm from "./ContractForm";
import data from "@/app/mockData.json";

interface TableContract{
    contractData: any[];
    custData: any[];
    isSelectedAll: boolean;
    handlecheckAll: (checked: boolean) => void;
    selected: any[];
    handleSelected: (index: number) => void;
}

export function TableContract({contractData, custData, isSelectedAll, handlecheckAll, selected, handleSelected}: TableContract) {

  const [customerNameList, setCustomerNameList] = useState<any[]>([]);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);

  function handleCloseContractForm(isEdit: boolean) {
    if (!isEdit) {
      setOpenAddContract(false);
    } else {
      setOpenEditContract(false);
    }
  }

  const formatDate = (dateString: string, isUTC7: boolean = false) => {
    let date = new Date(dateString);
    date = isUTC7 ? new Date(date.getTime() + 7 * 60 * 60 * 1000) : date;

    const day = String(date.getUTCDate()).padStart(2, "0"); // Get day and pad with 0 if necessary
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const custNameList = () => {
    const custName = data.customers.map(cust => ({
      id: cust.id,
      desc: cust.customerName
    }));
    setCustomerNameList(custName);
  };

  const handleAddNewContract = () => {
    custNameList();
    setOpenAddContract(true);
  }

  const handleDeleteContract = () => {

  }
  
  const handleRowClick = (row: any) => {
    console.log("row = ", row);
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
                    <TableCell align="center">{formatDate(row.startDate)}</TableCell>

                    {/* End Date */}
                    <TableCell align="center">{formatDate(row.finishDate)}</TableCell>

                    {/* Customer */}
                    <TableCell align="center">
                      {
                        custData.find((d) => d.customerId === row.customerId)?.customerName
                      }
                    </TableCell>

                    {/* Attachment */}
                    <TableCell align="center">
                      <Box display={"flex"} className="w-full">
                      <Box
                        className="justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5] cursor-pointer rounded-lg"
                      >
                       <Box className="w-[100%] text-left">
                          <Typography className="py-1 px-2 text-[#2C5079]">
                            {row.attachment[0].length > 20 ? row.attachment[0].substring(0, 18)+"..." : row.attachment[0]}
                          </Typography>
                        </Box>
                        <GoArrowUpRight size={24} color="#4C9BF5" style={{ marginTop: 5 }}/>
                      </Box>
                      <Typography sx={{pl: 1, pt: 1, fontSize: "16px"}}>
                        {row.attachment.length > 1 ? "+" + (row.attachment.length-1) : ""}
                      </Typography>
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
                      <Typography>Total: {contractData.length} item{contractData.length > 1 ? "s" : ""}</Typography>
                      <Box>
                        <DeleteButton
                          onDeleteBtnClick={handleDeleteContract}
                          disable={!selected.some((item) => item.isSelected)}
                        />
                        <Button
                          style={{ marginLeft: "auto", fontWeight: "bold" }}
                          className="w-48 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#4C9BF5] hover:to-[#D8EAFF] 
                                 hover:text-[#00336C] disabled:bg-[#83A2AD]"
                          onClick={() => handleAddNewContract()}
                        >
                          +New
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

        {openAddContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customeraAreas={[]}
          selectedCustomer={selected}
          isEditContract={false}
          custList={customerNameList}
        />
      )}
      </>
  );
}
