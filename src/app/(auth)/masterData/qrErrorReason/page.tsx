"use client";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material/";
import Navbar from "@/components/Navbar";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
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
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";
import { addNewQRErrorReason, deleteQRErrorReason, fetchQrErrorReasonData, filterQRErrorReason, getAllQrErrorReasonData, updateQRErrorReason } from "@/app/lib/api";
import { SearchSelector } from "@/components/ui/selectors/searchSelector";
import { getLoggedInUser } from "@/app/appwrite";
import { ClearButtton } from "@/components/ui/buttons/clearButton";

type RowData = {
  id: string;
  reason: string;
  code: string;
};

type selectedDelete = {
  isSelected: boolean;
  id: any;
};

type CreatorType = {
  id: string;
  label: string;
};

export default function QrErrorReason() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [editMode, setEditMode] = useState(Array(rowData.length).fill(false));
  const [addCode, setAddCode] = useState("");
  const [addQRErrorReason, setAddQRErrorReason] = useState("");
  const [selectedCreatedBy, setSelectedCreatedBy] = useState<string>();
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [totalRows, setTotalRows] = useState(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    tableData();
  }, []); //[page, rowsPerPage]

  const tableData = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const allQRErrorReason = await getAllQrErrorReasonData();
    console.log("allQRErrorReason =", allQRErrorReason);
    const tableData: RowData[] = allQRErrorReason?.documents?.map((doc: any) => {
        return {
          id: doc.$id,
          reason: doc.reason,
          code: doc.code
        };
      }) || []
    setRowData(tableData);
    setTotalRows(allQRErrorReason?.total || 0);
    console.log("tableData =", tableData);

    const mapSelect = tableData.map((row: RowData) => ({
      isSelected: false,
      id: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  const handleEdit = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = true; // Enable edit mode for the clicked row
    setEditMode(newEditMode);
  };

  const handleSave = async (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = false; // Disable edit mode after saving
    setEditMode(newEditMode);
    
    console.log("rowData[index] = ", rowData[index]);
    const dataToSubmit = {
      reason: rowData[index]?.reason,
      code: rowData[index]?.code,
    }
    const updateQRErrorResult = await updateQRErrorReason(dataToSubmit, rowData[index]?.id);
    if(updateQRErrorResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Save QR Error Reason Success",
        "Save QR Error Reason data successfully.",
        true, "success"
      );
      if(confirmApprove) {
        isSearch === true ? await search() : await tableData();
      }
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Save QR Error Reason",
        `${updateQRErrorResult.error}`,
        true, "danger"
      );
      if(confirmApprove) {
        isSearch === true ? await search() : await tableData();
      }
    }
  };

  const handleAdd = async () => {
    const user = await getLoggedInUser();
    console.log("user =", user);
    console.log("addCode =", addCode);
    console.log("addQRErrorReason =", addQRErrorReason);

    const dataToSubmit = {
      reason: addQRErrorReason,
      code: addCode,
    }
    const addQrErrorResult = await addNewQRErrorReason(dataToSubmit);
    if(addQrErrorResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Add QR Error Reason Success",
        "Add QR Error Reason data successfully.",
        true, "success"
      );
      if(confirmApprove) {
        setAddCode("");
        setAddQRErrorReason("");
        if(isSearch === true) setIsSearch(false);
      }
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Add QR Error Reason",
        `${addQrErrorResult.error}`,
        true, "danger"
      );
    }
    await tableData();
  };

  const search = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const filterQRError = await filterQRErrorReason([
      {field: "reason", value: addQRErrorReason},
      {field: "code", value: addCode},
    ], offset, rowsPerPage);
    setTotalRows(filterQRError?.total || 0);
    console.log("filterQRError =", filterQRError);
    const tableData: RowData[] = filterQRError?.documents?.map((doc) => {
      return {
        id: doc.$id,
        reason: doc.reason,
        code: doc.code,
      };
    }) || []
    setRowData(tableData);
    console.log("tableData =", tableData);

    const mapSelect = tableData.map((row: RowData) => ({
      isSelected: false,
      id: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if(isSearch === false) {
      setIsSearch(true);
    }
    setIsSelectedAll(false);
    handleCheckAll(false);
    setPage(0);
    search();
  };

  const handleClear = () => {
    setAddCode("");
    setAddQRErrorReason("");
    setIsSelectedAll(false);
    setIsSearch(false);
    handleCheckAll(false);
    setPage(0);
    tableData();
  }

  const handleDelete = async () => {
    const confirmApprove = await confirmDialog(
      "Delete QR Error Reason",
      "Do you want to delete these selected QR Error Reason?", false, "danger"
    );
    if (confirmApprove) {
      if (confirmApprove) {
        let response: any;
        const deleteId = selected.filter(s => s.isSelected === true).map(s=>s.id);
        if (deleteId.length > 0) {
          response = await deleteQRErrorReason(deleteId);
          console.log("response =", response);
        }
        if(response.result !== null){
          const confirmApprove = await confirmDialog(
            "Delete QR Error Reason Success",
            "Delete QR Error Reason data successfully.",
            true
          );
          setIsSelectedAll(false);
        }
        else{
          const confirmApprove = await confirmDialog(
            "Error to Department Segment",
            `${response.error}`,
            true, "danger"
          );
        }
        isSearch === true ? await search() : await tableData();
      }
    }
  };

  const handleInputChange = <T extends keyof RowData>(
    index: number,
    field: T,
    value: RowData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
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
  };

  const handleCheckAll = (checked: boolean) => {
    console.log("checked =", checked)
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.map(s => s.isSelected = checked);
    console.log("selectedAll =", selectedAll);
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

  const handleSearchSelectorChange = (newValue: any, name: any) => {
    console.log("newValue =", newValue);
    console.log("name =", name);
    if(name === "createdBy_Id"){
      newValue === null ? setSelectedCreatedBy("") : setSelectedCreatedBy(newValue?.id);
    }
  };

  return (
    <div>
      <Navbar menu={'Master Data'} submenu={'QR Error Reason'} />
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
                className="p-4 flex w-[60%] flex-nowrap space-x-4 sm:space-y-0"
              >
                <div className="w-[30%] flex justify-center items-center">
                <LabelTextField
                  label={"Code"}
                  placeholder={"Type here..."}
                  inputVal={addCode}
                  setInputVal={setAddCode}
                />
                </div>
                <div className="w-[50%] flex justify-center items-center">
                <LabelTextField
                  label={"QR Error Reason"}
                  placeholder={"Type here..."}
                  inputVal={addQRErrorReason}
                  setInputVal={setAddQRErrorReason}
                />
                </div>
                {/* <div className="w-[20%] flex justify-center items-center">
                  <SearchSelector
                    inlineLabel="Added By"
                    itemSource={createdBy}
                    handleChange={(newVal: any, name: any) => handleSearchSelectorChange(newVal, name)}
                    selectedVal={selectedCreatedBy}
                    name={"createdBy_Id"}
                  />
                </div> */}
                <Box className="w-full sm:w-auto flex flex-nowrap sm:flex-nowrap space-x-4"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <AddButton disable={editMode.some(e=>e === true)} onAddBtnClick={handleAdd}/>
                  <SearchButton disable={editMode.some(e=>e === true)} onSearchBtnClick={handleSearch}/>
                  <ClearButtton onBtnClick={handleClear}
                     disable={editMode.some(e=>e === true)} icon={undefined} content={"Clear"} />
                </Box>
              </Box>
          </Box>

          <TableContainer
            className="h-[74vh] max-h-[74vh] bg-white"
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "15px 15px 0px 0px",
              boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
            }}
          >
            <Table stickyHeader>
            <TableHead sx={{mt:0}}>
                <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                <TableCell align="left" className="w-[6%]">
                    <Checkbox2 className="mt-1 mb-2"
                    checked={isSelectedAll}
                    onCheckedChange={handleCheckAll}
                    disabled={totalRows === 0}/>
                  </TableCell>
                  <TableCell align="center" className="w-[33%]">Code</TableCell>
                  <TableCell align="center" className="w-[37%]">QR Error Reason</TableCell>
                  {/* <TableCell align="center" className="w-[28%]">Added by</TableCell> */}
                  <TableCell align="center" className="w-[29%]"></TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
              {rowData.slice(page * rowsPerPage, rowsPerPage + (page * rowsPerPage))
                .map((row, index) => (
                  <TableRow
                    key={index + (page*rowsPerPage)}
                    className={
                      editMode[index + (page*rowsPerPage)]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
                  >
                    <TableCell align="left">
                      <Checkbox2 checked={selected[index + (page*rowsPerPage)].isSelected}
                          onCheckedChange={() => {
                            handleSelected(index + (page*rowsPerPage));
                          }}/>
                    </TableCell>
                    <TableCell align="center" className="max-w-48">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.code}
                          onChange={(e) => handleInputChange(index + (page*rowsPerPage), 'code', e.target.value)}
                        />
                      ) : (
                        `${row.code}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.reason}
                          onChange={(e) => handleInputChange(index + (page*rowsPerPage), 'reason', e.target.value)}
                        />
                      ) : (
                        `${row.reason}`
                      )}
                    </TableCell>
                    {/* <TableCell align="center">
                      {
                        createdBy.find((m) => m.id === row.createdBy_Id)
                          ?.label
                      }
                    </TableCell> */}
                    <TableCell align="center" sx={{justifyItems: "center"}}>
                      {editMode[index + (page*rowsPerPage)] ? (
                        <div className="w-[48px] mr-9">
                          <SaveButton onSaveBtnClick={handleSave} index={index + (page*rowsPerPage)}/>
                        </div>
                      ) : (
                        <EditButton disable={editMode.some(e=>e === true)} onEditBtnClick={handleEdit} index={index + (page*rowsPerPage)}/>
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
                      <TablePagination
                        sx={{color: "#2C5079"}}
                        component="div"
                        count={totalRows}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                      />
                      <DeleteButton onDeleteBtnClick={handleDelete} disable={!selected.some((item) => item.isSelected)}/>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}

      {/* Confirm dialog */}
      {ConfirmAlertDialog}
    </div>
  );
}