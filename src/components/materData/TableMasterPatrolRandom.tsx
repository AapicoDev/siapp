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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../app/styles.module.css";
import { Checkbox } from "@/components/ui/checkbox";
import { SaveButton } from "../ui/buttons/saveButton";
import { EditButton } from "../ui/buttons/editButton";
import { Input } from "@/components/ui/textboxs/input";
import { GradientButton } from "../ui/buttons/gradientButton";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { DeleteButton } from "../ui/buttons/deleteButton";
import { Button } from "@/components/ui/buttons/button";
import { GoArrowUpRight } from "react-icons/go";
import {
  getIncidentTypeData,
  deleteIncidentType,
  getAllMasterCheckListData,
  getAllMasterRandomPatrolReason,
  deleteRandomPatrol,
  fetchMasterRandomPatrolReason,
} from "../../../src/app/lib/api";
import PatrolRandomCheckpointForm from "./PatrolRandomCheckpointForm";
import { useConfirmDialog } from "../ui/alertDialog/confirmDialog";

type RowData = {
  id: any;
  randomPatrolReason: any;
  totalCheckList: number;
  checklist: any[];
  //isActive: boolean;
};
type CheckListData = {
  id: any;
  desc: any;
  normalStatus: any;
  abnormalStatus: string;
  //isDefault: boolean;
  isNeedAttachPhoto: boolean;
  attachPhotoAmount: number;
};
type selectedDelete = {
  isSelected: boolean;
  randomPatrolId: any;
};

const mockRandom = [
  {
    id: "1",
    reason: "ตรวจระเบียบเครื่องแต่งกายตาม Standard",
    checkListId: [
      "67107c37000aef40349b",
      "67107c25002ad97f6c07",
      "67107c010002f3401f5f",
      "670f5609001a28173ad0",
    ],
  },
  {
    id: "2",
    reason: "ตรวจอุปกรณ์ตามสัญญา TOR",
    totalCheckList: 2,
    checkListId: ["67107c37000aef40349b", "67107c25002ad97f6c07"],
  },
  {
    id: "3",
    reason: "ตรวจความเสี่ยงภายในหน่วยงาน",
    checkListId: [
      "67107c37000aef40349b",
      "67107c25002ad97f6c07",
      "67107c010002f3401f5f",
      "670f5609001a28173ad0",
    ],
  },
  {
    id: "4",
    reason: "เข้าพบลูกค้า อัพเดทข้อมูล/รับทราบปัญหาต่าง ๆ",
    checkListId: [
      "67107c37000aef40349b",
      "67107c25002ad97f6c07",
      "67107c010002f3401f5f",
      "670f5609001a28173ad0",
    ],
  },
];

interface TableMasterPatrolRandomProps {}

export function TableMasterPatrolRandom({}: TableMasterPatrolRandomProps) {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openEditCheckList, setOpenEditCheckList] = useState<boolean>(false);
  const [openAddRandomPatrol, setOpenAddRandomPatrol] =
    useState<boolean>(false);
  const [allCheckListDatas, setAllCheckListDatas] = useState<CheckListData[]>(
    []
  );
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData?.map((row) => ({
      isSelected: false,
      randomPatrolId: row.id,
    }))
  );
  const [isAddOrUpdateSucces, setIsAddOrUpdateSucces] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const checkListsOfCheckpoint = async () => {
    setIsLoading(true);
    const fetchCheckList = await getAllMasterCheckListData();
    setIsLoading(false);
    const allCheckList = fetchCheckList?.documents;
    console.log("fetchCheckList =", fetchCheckList);
    setAllCheckListDatas(
      allCheckList?.map((checkList) => {
        return {
          id: checkList.$id,
          desc: checkList.name,
          normalStatus: checkList.normalStatus,
          abnormalStatus: checkList.abnormalStatus,
          isNeedAttachPhoto: checkList.isNeedAttachPhoto,
          attachPhotoAmount:
            checkList.attachPhotoAmount === null
              ? 0
              : checkList.attachPhotoAmount,
        };
      }) || allCheckListDatas
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAddOrUpdateSucces) {
      setIsAddOrUpdateSucces(false);
    }
    tableData();
  }, [isAddOrUpdateSucces]); //page, rowsPerPage

  useEffect(() => {
    checkListsOfCheckpoint();
  }, [rowData]);

  const tableData = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const fetchRandomPatrol = await getAllMasterRandomPatrolReason();
    const mappedToRowData: RowData[] =
      fetchRandomPatrol?.documents.map((r) => {
        return {
          id: r.$id,
          randomPatrolReason: r.reason,
          totalCheckList: r.checkList_Id?.length,
          checklist: r.checkList_Id,
        };
      }) || rowData;
    setRowData(mappedToRowData);
    setTotalRows(fetchRandomPatrol?.total || 0);
    setSelected(
      mappedToRowData?.map((row) => ({
        isSelected: false,
        randomPatrolId: row.id,
      }))
    );
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

  const handleSelectAll = (checked: boolean) => {
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setSelected(selectedAll);
  };

  const handleRowClick = (row: RowData) => {
    console.log("row =", row);
    setSelectedRow(row);
    setOpenEditCheckList(true);
  };

  function handleCloseCheckpointForm(isEdit: boolean) {
    isEdit ? setOpenEditCheckList(false) : setOpenAddRandomPatrol(false);
  }

  const handleDeleteRandomPatrol = async () => {
    const confirmApprove = await confirmDialog(
      "Delete Random Parol Reason",
      "Do you want to delete this Random Parol Reason?"
    );
    if (confirmApprove) {
      setIsLoading(true);
      const deleteId = selected.filter((select) => select.isSelected === true);
      const deleteResult = await deleteRandomPatrol(
        deleteId.map((item) => item.randomPatrolId)
      );
      setIsLoading(false);
      console.log("deleteResult =", deleteResult);
      if (deleteResult != null) {
        setIsAddOrUpdateSucces(true);
        setIsSelectedAll(false);
      } else {
        alert("Error occur to delete.");
      }
    }
  };
  const handleAddNewRandomPatrol = () => {
    console.log("handleAddNewRandomPatrol");
    setOpenAddRandomPatrol(true);
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
        className="h-[76vh] max-h-[76vh] bg-white"
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px 15px 0px 0px",
          boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
        }}
      >
        <Table stickyHeader sx={{ zIndex: 0 }}>
          <TableHead sx={{ mt: 0 }}>
            <TableRow
              sx={{ borderBottom: "1px solid #C7D4D7" }}
              className={`${styles.table}`}
            >
              <TableCell align="left" className="w-[10%]">
                <Checkbox
                  className="mt-1 mb-2"
                  checked={isSelectedAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableCell>
              <TableCell align="center" className="w-[50%]">
                Random Patrol Reason
              </TableCell>
              <TableCell align="center" className="w-[40%]">
                Total Check List
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Allow the TableBody to grow and fill vertical space */}
          <TableBody sx={{ flexGrow: 1 }}>
            {rowData.slice(page * rowsPerPage, rowsPerPage + (page * rowsPerPage))
              .map((row, index) => (
              <TableRow
                onClick={() => handleRowClick(row)} // Row click handler
                key={index + (page*rowsPerPage)}
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
                    className="mt-1 mb-2"
                    checked={selected[index + (page*rowsPerPage)]?.isSelected}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click
                      handleSelected(index + (page*rowsPerPage));
                    }}
                  />
                </TableCell>

                {/* Customer */}
                <TableCell align="center">{row.randomPatrolReason}</TableCell>

                {/* Total Check List */}
                <TableCell align="center">{row.totalCheckList}</TableCell>
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
                  {/* <Typography>Total: {rowData.length} items</Typography> */}
                  <TablePagination
                    sx={{ color: "#2C5079" }}
                    component="div"
                    count={totalRows}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                  <Box>
                    <DeleteButton
                      onDeleteBtnClick={handleDeleteRandomPatrol}
                      disable={!selected.some((item) => item.isSelected)}
                    />
                    <Button
                      style={{ marginLeft: "auto", fontWeight: "bold" }}
                      className="w-48 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#4C9BF5] hover:to-[#D8EAFF] 
                                 hover:text-[#00336C] disabled:bg-[#83A2AD]"
                      onClick={() => handleAddNewRandomPatrol()}
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

      {openEditCheckList && (
        <PatrolRandomCheckpointForm
          selectedRow={selectedRow}
          closeModal={handleCloseCheckpointForm}
          isEdit={true}
          checklistItemSource={allCheckListDatas}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

      {openAddRandomPatrol && (
        <PatrolRandomCheckpointForm
          selectedRow={{
            id: "",
            randomPatrolReason: "",
            totalCheckList: 0,
            checklist: [],
          }}
          closeModal={handleCloseCheckpointForm}
          isEdit={false}
          checklistItemSource={allCheckListDatas}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

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
