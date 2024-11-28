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
import { Textbox } from "@/components/ui/textboxs/textbox";
import { addNewChecklist, deleteChecklist, fetchMasterCheckListData, filterMasterChecklistData, getAllMasterCheckListData, updateCheckList } from "@/app/lib/api";
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";
import { ClearButtton } from "@/components/ui/buttons/clearButton";

type CheckListData = {
  id: string;
  name: string;
  abnormalStatus: string;
  normalStatus: string;
  attachPhoto: any;
  isDefault: boolean;
  isNeedAttachPhoto: boolean;
};

type selectedDelete = {
  isSelected: boolean;
  id: any;
};

export default function CheckList() {

  const [rowData, setRowData] = useState<CheckListData[]>([]); // Local state for row data
  const [editMode, setEditMode] = useState(Array(rowData.length).fill(false)); // Array to track edit state for each row
  const [addCheckListName, setAddCheckListName] = useState("");
  const [addNormmalStatus, setAddNormalStatus] = useState("");
  const [addAbnormmalStatus, setAddAbnormalStatus] = useState("");
  const [photoAmt, setPhotoAmt] = useState<any>("");
  const [isNeedAttachPhoto, setIsNeedAttachPhoto] = useState<boolean>(false);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [totalRows, setTotalRows] = useState(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    tableData();
  }, []);

  const tableData = async () => {
    setIsLoading(true);
    const allChecklist = await getAllMasterCheckListData();
    console.log("allChecklist =", allChecklist);
    const tableData: CheckListData[] = allChecklist?.documents?.map((doc: any) => {
        return {
          id: doc.$id,
          name: doc.name,
          abnormalStatus: doc.abnormalStatus,
          normalStatus: doc.normalStatus,
          attachPhoto: doc.attachPhotoAmount,
          isDefault: doc.isDefault,
          isNeedAttachPhoto: doc.isNeedAttachPhoto,
        };
      }) || []
    setRowData(tableData);
    setTotalRows(allChecklist?.total || 0);
    console.log("tableData =", tableData);

    const mapSelect = tableData.map((row: CheckListData) => ({
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
      name: rowData[index]?.name,
      normalStatus: rowData[index]?.normalStatus,
      abnormalStatus: rowData[index]?.abnormalStatus,
      attachPhotoAmount: parseInt(rowData[index]?.attachPhoto),
      isNeedAttachPhoto: parseInt(rowData[index]?.attachPhoto) > 0 ? true : false
    }
    const updateChecklistResult = await updateCheckList(dataToSubmit, rowData[index]?.id);
    if(updateChecklistResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Save Checklist Success",
        "Save Checklist data successfully.",
        true, "success"
      );
      if(confirmApprove) {
        isSearch === true ?
        await search() : await tableData()
      }
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Save Checklist",
        `${updateChecklistResult.error}`,
        true, "danger"
      );
      if(confirmApprove) {
        isSearch === true ?
        await search() : await tableData()
      }
    }
  };

  const handleAdd = async () => {
    const dataToSubmit = {
      name: addCheckListName,
      normalStatus: addNormmalStatus,
      abnormalStatus: addAbnormmalStatus,
      attachPhotoAmount: parseInt(photoAmt),
      isNeedAttachPhoto: isNeedAttachPhoto
    }
    const addChecklistResult = await addNewChecklist(dataToSubmit);
    if(addChecklistResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Add Checklist Success",
        "Add Checklist data successfully.",
        true, "success"
      );
      if(confirmApprove) {
        setAddCheckListName("");
        setAddNormalStatus("");
        setAddAbnormalStatus("");
        setPhotoAmt("");
        setIsNeedAttachPhoto(false);
        if(isSearch === true) setIsSearch(false);
      }
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Add Checklist",
        `${addChecklistResult.error}`,
        true, "danger"
      );
    }
    await tableData();
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
    setAddCheckListName("");
    setAddNormalStatus("");
    setAddAbnormalStatus("");
    setPhotoAmt("");
    setIsNeedAttachPhoto(false);
    setIsSelectedAll(false);
    setIsSearch(false);
    handleCheckAll(false);
    setPage(0);
    tableData();
  }

  const search = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const filterChecklist = await filterMasterChecklistData([
      {field: "name", value: addCheckListName},
      {field: "normalStatus", value: addNormmalStatus},
      {field: "abnormalStatus", value: addAbnormmalStatus},
      {field: "attachPhotoAmount", value: photoAmt === "" ? "" : parseInt(photoAmt)},
      {field: "isNeedAttachPhoto", value: isNeedAttachPhoto},
    ], offset, rowsPerPage);
    setTotalRows(filterChecklist?.total || 0);
    console.log("filterChecklist =", filterChecklist);
    const tableData: CheckListData[] = filterChecklist?.documents?.map((doc) => {
      return {
        id: doc.$id,
        name: doc.name,
        abnormalStatus: doc.abnormalStatus,
        normalStatus: doc.normalStatus,
        attachPhoto: doc.attachPhotoAmount,
        isDefault: doc.isDefault,
        isNeedAttachPhoto: doc.isNeedAttachPhoto,
      };
    }) || []
    setRowData(tableData);
    console.log("tableData =", tableData);

    const mapSelect = tableData.map((row: CheckListData) => ({
      isSelected: false,
      id: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    console.log("selected =", selected);
    const confirmApprove = await confirmDialog(
      "Delete Checklist",
      "Do you want to delete these selected checklist?", false, "danger"
    );
    if (confirmApprove) {
      if (confirmApprove) {
        let response: any;
        const deleteId = selected.filter(s => s.isSelected === true).map(s=>s.id);
        if (deleteId.length > 0) {
          response = await deleteChecklist(deleteId);
          console.log("response =", response);
        }
        if(response.result !== null){
          const confirmApprove = await confirmDialog(
            "Delete Checklist Success",
            "Delete Checklist data successfully.",
            true
          );
          setIsSelectedAll(false);
        }
        else{
          const confirmApprove = await confirmDialog(
            "Error to delete Checklist",
            `${response.error}`,
            true, "danger"
          );
        }
        isSearch === true ?
        await search() : await tableData()
      }
    }
  };

  // Handle input changes in edit mode
  const handleRowInputChange = <T extends keyof CheckListData>(
    index: number,
    field: T,
    value: CheckListData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
  };

  const handleChange = (e: any, fieldName?: string) => {// React.ChangeEvent<HTMLInputElement>/
    const value = e.target?.value;
    const name = e.target?.name;
    if(fieldName === "isNeedAttachPhoto"){
      setIsNeedAttachPhoto(e);
      if(e === false){
        setPhotoAmt("");
      }
    }
    else if(name === "attachPhotoAmt"){
      setPhotoAmt(value);
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
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Navbar menu={'Master Data'} submenu={'Check List'} />
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
                className="p-4 flex w-[90%] flex-nowrap space-x-4 sm:space-y-0"
              >
                <div className="w-[26%] flex justify-center items-center">
                <LabelTextField
                  label={"Check List"}
                  placeholder={"Type here..."}
                  inputVal={addCheckListName}
                  setInputVal={setAddCheckListName}
                />
                </div>
                <div className="w-[16%] flex justify-center items-center">
                <LabelTextField
                  label={"Status: Normal"}
                  placeholder={"Type here..."}
                  inputVal={addNormmalStatus}
                  setInputVal={setAddNormalStatus}
                />
                </div>
                <div className="w-[16%] flex justify-center items-center">
                <LabelTextField
                  label={"Status: Abnormal"}
                  placeholder={"Type here..."}
                  inputVal={addAbnormmalStatus}
                  setInputVal={setAddAbnormalStatus}
                />
                </div>
                <div className="w-[12%] flex justify-center items-center">
                <Checkbox3 checked={isNeedAttachPhoto} className="w-9 h-9 mt-1 mr-2" onCheckedChange={(e) => handleChange(e, "isNeedAttachPhoto")} />
                <Typography sx={{color: "#2C5079", width: "full", mt: 0.5}}>Attach photos</Typography>
                </div>
                <div className="w-[10%] flex justify-center items-center">
                <Textbox name="attachPhotoAmt" inputType="number" placeHolder="Amount.." value={photoAmt} handleChange={handleChange}/>
                </div>
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
                <TableCell align="left" className="w-[5%]">
                    <Checkbox2 className="mt-1 mb-2"
                        checked={isSelectedAll}
                        onCheckedChange={handleCheckAll}
                        disabled={totalRows === 0}/>
                  </TableCell>
                  <TableCell align="center" className="w-[19%]">Check List</TableCell>
                  <TableCell align="center" className="w-[24%]">Status: Normal</TableCell>
                  <TableCell align="center" className="w-[19%]">Status: Abnormal</TableCell>
                  <TableCell align="center" className="w-[19%]">Attach photos</TableCell>
                  <TableCell align="center" className="w-[14%]"></TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
                {rowData.slice(page * rowsPerPage, rowsPerPage + (page * rowsPerPage))
                .map((row, index) => (
                  <TableRow
                    key={index + (page*rowsPerPage)}
                    className={
                      editMode[index + (page * rowsPerPage)]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
                  >
                    <TableCell align="left">
                      <Checkbox2
                          checked={selected[index + (page*rowsPerPage)].isSelected}
                          onCheckedChange={() => {
                            handleSelected(index + (page*rowsPerPage));
                          }}/>
                    </TableCell>
                    <TableCell align="center" className="max-w-48">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.name}
                          onChange={(e) => handleRowInputChange(index + (page*rowsPerPage), 'name', e.target.value)}
                        />
                      ) : (
                        `${row.name}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.normalStatus}
                          onChange={(e) => handleRowInputChange(index + (page*rowsPerPage), 'normalStatus', e.target.value)}
                        />
                      ) : (
                        `${row.normalStatus}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.abnormalStatus}
                          onChange={(e) => handleRowInputChange(index + (page*rowsPerPage), 'abnormalStatus', e.target.value)}
                        />
                      ) : (
                        `${row.abnormalStatus}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="number"
                          min={0}
                          className={`${styles.textBoxCell}`}
                          value={row.attachPhoto}
                          onChange={(e) => handleRowInputChange(index + (page*rowsPerPage), 'attachPhoto', e.target.value)}
                        />
                      ) : (
                        `${row.attachPhoto}`
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{justifyItems: "center"}}>
                      {editMode[index + (page*rowsPerPage)] ? (
                        <div className="w-[48px] mr-8">
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