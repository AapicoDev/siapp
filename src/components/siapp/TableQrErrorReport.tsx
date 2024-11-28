"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Button as Button2,
  IconButton,
  CircularProgress,
  TablePagination,
} from "@mui/material/";
import { useEffect, useState } from "react";
import styles from "../../app/styles.module.css";
import { TickCircle } from "iconsax-react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import {
    fetchIncidentQrErrorReport,
  getIncidentData,
  getIncidentTypeData,
  updateIncidentQrErrorReportStatus,
  updateIncidentStatus,
} from "../../../src/app/lib/api";
import IncidentDeatilView from "@/components/siapp/IncidentDetailView";
import { useConfirmDialog } from "../../components/ui/alertDialog/confirmDialog";
import { useData } from '../../../src/context/DataContext';

type RowData = {
  id: string;
  reason: string;
  reason_Id: string;
  dateTime: string;
  createdBy: string;
  createdBy_Id: string;
  status: string;
  approver_Name: string;
  approver_Id: string;
};

type selectedDelete = {
  isSelected: boolean;
  id: string;
};

export default function TableQrErrorReport() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [totalRows, setTotalRows] = useState(0);
  const { user } = useData();

  useEffect(() => {
    const time = new Date().toLocaleString(); //Output format = 10/2/2024, 1:28:36 PM
    tableData();
  }, [page, rowsPerPage]);

  const formatDate = (dateString: string, isUTC7: boolean = false) => {
    let date = new Date(dateString);
    date = isUTC7 ? new Date(date.getTime() + 7 * 60 * 60 * 1000) : date;

    const day = String(date.getUTCDate()).padStart(2, "0"); // Get day and pad with 0 if necessary
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}/${month}/${year}\n@${hours}:${minutes}:${seconds}`;
  };

  const tableData = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const response = await fetchIncidentQrErrorReport(offset, rowsPerPage);
    console.log("qrErrorReport =", response?.documents);
    const reOrder = response?.documents.sort((a: any, b:any) => {
      return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
    });
    console.log("reOrder qrError report Data =", reOrder);
    const tableData: RowData[] =
        response?.documents?.map((doc: any) => {
        return {
          id: doc.$id,
          reason: doc.reason,
          reason_Id: doc.reason_Id,
          dateTime: formatDate(doc.dateTime, false),
          createdBy: doc.createdBy,
          createdBy_Id: doc.createdBy_Id,
          status: doc.status,
          approver_Name: doc.approver_Name,
          approver_Id: doc.approver_Id
        };
      }) || rowData;
    console.log("incident tableData = ", tableData);
    setRowData(tableData);
    setTotalRows(response?.total || 0);
    const mapSelect: selectedDelete[] = tableData.map((row) => ({
      isSelected: false,
      id: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  const handleApproved = async (index: number, row: RowData) => {
    const approveRow = [...rowData];
    if (approveRow[index].status === "Pending") {
      const confirmApprove = await confirmDialog(
        "Approve QR Code Error Status",
        "Do you want to approve this QR Code Error Status?"
      );
      console.log("confirmApprove =", confirmApprove);
      if (confirmApprove) {
        approveRow[index].status = "Approved";
        const dataToSubmit = { 
            ["status"]: approveRow[index]["status"],
            approver_Id: user?.$id,
            approver_Name: user?.name
        };
        const response = await updateIncidentQrErrorReportStatus(
          row.id,
          dataToSubmit
        );
        if(response.result === null){
            const confirmApprove = await confirmDialog(
            "Error to Approved QR Code Error Status",
            `${response.error}`, true, "danger"
            );
        }
        tableData();
      }
    }
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
    console.log("checked =", checked);
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setSelected(selectedAll);
  };

  const handlePageChange = (event: any, newPage: any) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        className="h-[76vh] max-h-[76vh] bg-white px-2"
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px 15px 0px 0px",
          boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ mt: 0 }}>
            <TableRow
              sx={{ borderBottom: "1px solid #C7D4D7" }}
              className={`${styles.table}`}
            >
              {/* <TableCell align="left" className="w-[12%]">
                <Checkbox2
                  className="mt-1 mb-2"
                  checked={isSelectedAll}
                  onCheckedChange={handleCheckAll}
                />
              </TableCell> */}
              <TableCell align="center" className="w-[10%]">
                Date & Time
              </TableCell>
              <TableCell align="center" className="w-[32%]">
                QR Error Reason
              </TableCell>
              <TableCell align="center" className="w-[29%]">
                Reporter
              </TableCell>
              <TableCell align="center" className="w-[29%]">
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Allow the TableBody to grow and fill vertical space */}
          <TableBody sx={{ flexGrow: 1 }}>
            {rowData.map((row, index) => (
              <TableRow
                key={index}
                className={`${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`}
                sx={{
                  "& .MuiTableCell-root": {
                    padding: "10px 20px 10px 20px", // Customize border color
                  },
                }}
              >
                {/* <TableCell align="left">
                  <Checkbox2
                    checked={selected[index].isSelected}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click
                      handleSelected(index);
                    }}
                  />
                </TableCell> */}

                <TableCell align="center">{row.dateTime}</TableCell>

                {/* Reason */}
                <TableCell align="center">
                  {row.reason === null ? "-" : row.reason}
                </TableCell>

                {/* Reporter */}
                <TableCell align="center">
                  {row.createdBy === null ? "-" : row.createdBy}
                </TableCell>

                {/* Status */}
                <TableCell align="center" className="flex justify-center">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApproved(index, row);
                    }}
                  >
                    <TickCircle
                      size={30}
                      variant="Bold"
                      className={`${
                        row.status === "Approved"
                          ? `text-[#A7E5A6]`
                          : `text-[#C7D4D7]`
                      } rounded-full bg-white p-[1px] mt-1`}
                    />
                  </IconButton>
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
                  <TablePagination
                        sx={{color: "#2C5079"}}
                        component="div"
                        count={totalRows}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                      />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Confirm dialog */}
      {ConfirmAlertDialog}

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </>
  );
}
