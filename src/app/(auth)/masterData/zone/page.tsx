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
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";
import { addNewZone, deleteZone, fetchMasterZoneData, filterMasterZoneData, getAllMasterZoneData, queryMasterCustomerData, queryMasterDepartmentData, updateZone } from "@/app/lib/api";
import { ClearButtton } from "@/components/ui/buttons/clearButton";

type RowData = {
  id: any;
  zone: string;
  description: string;
  departmentTotal: any;
  customerTotal: any;
};
type selectedDelete = {
  isSelected: boolean;
  id: any;
};

export default function Zone() {

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [editMode, setEditMode] = useState(Array(rowData.length).fill(false)); // Array to track edit state for each row
  const [addZoneVal, setAddZoneVal] = useState("");
  const [addZoneDescVal, setAddZoneDescVal] = useState(""); 
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [totalRows, setTotalRows] = useState(0);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    tableData();
  }, []); //[page, rowsPerPage]

  const getDeprtmentTotal = async (zoneId: string) => {
    const queryDept = await queryMasterDepartmentData("zone_Id", zoneId)
    return queryDept?.documents?.length;
  }
  const getCustomerTotal = async (zoneId: string) => {
    const queryDept = await queryMasterCustomerData("zone_Id", zoneId)
    return queryDept?.documents?.length;
  }

  const tableData = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const allGroup = await getAllMasterZoneData();
    console.log("allGroup =", allGroup);
    const tableData: RowData[] = allGroup?.documents?.map((doc: any) => {
        return {
          id: doc.$id,
          zone: doc.zone,
          description: doc.description,
          departmentTotal: getDeprtmentTotal(doc.$id),
          customerTotal: getCustomerTotal(doc.$id)
        };
      }) || []
    setRowData(tableData);
    setTotalRows(allGroup?.total || 0);
    console.log("tableData =", tableData);

    const mapSelect: selectedDelete[] = tableData.map((row: RowData) => ({
      isSelected: false,
      id: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  const handleEdit = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = true;
    setEditMode(newEditMode);
  };

  const handleSave = async (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = false;
    setEditMode(newEditMode);
    
    console.log("rowData[index] = ", rowData[index]);
    const dataToSubmit = {
      zone: rowData[index]?.zone,
      description: rowData[index]?.description,
    }
    setIsLoading(true);
    const updateZoneResult = await updateZone(dataToSubmit, rowData[index]?.id);
    if(updateZoneResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Save Zone Success",
        "Save Zone data successfully.",
        true, "success"
      );
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Save Zone",
        `${updateZoneResult.error}`,
        true, "danger"
      );
    }
    isSearch === true ? await search() : await tableData();
    setIsLoading(false);
  };

  const handleDelete = async () => {
    const confirmApprove = await confirmDialog(
      "Delete Zone",
      "Do you want to delete these selected Zone?", false, "danger"
    );
    if (confirmApprove) {
      if (confirmApprove) {
        let response: any;
        const deleteId = selected.filter(s => s.isSelected === true).map(s=>s.id);
        if (deleteId.length > 0) {
          response = await deleteZone(deleteId);
          console.log("response =", response);
        }
        if(response.result !== null){
          const confirmApprove = await confirmDialog(
            "Delete Zone Success",
            "Delete Zone data successfully.",
            true
          );
          setIsSelectedAll(false);
        }
        else{
          const confirmApprove = await confirmDialog(
            "Error to Delete Zone",
            `${response.error}`,
            true, "danger"
          );
        }
        isSearch === true ? await search() : await tableData();
      }
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = <T extends keyof RowData>(
    index: number,
    field: T,
    value: RowData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
  };

  const handleAdd = async () => {
    const dataToSubmit = {
      zone: addZoneVal,
      description: addZoneDescVal,
    }
    setIsLoading(true);
    const addZoneResult = await addNewZone(dataToSubmit);
    if(addZoneResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Add Zone Success",
        "Add Zone data successfully.",
        true, "success"
      );
      if(confirmApprove) {
        setAddZoneVal("");
        setAddZoneDescVal("");
        if(isSearch === true) setIsSearch(false);
      }
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Add Zone",
        `${addZoneResult.error}`,
        true, "danger"
      );
    }
    await tableData();
    setIsLoading(false);
  };

  const search = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const filterZone = await filterMasterZoneData([
      {field: "zone", value: addZoneVal},
      {field: "description", value: addZoneDescVal},
    ], offset, rowsPerPage);
    setTotalRows(filterZone?.total || 0);
    console.log("filterChecklist =", filterZone);
    const tableData: RowData[] = filterZone?.documents?.map((doc: any) => {
      return {
        id: doc.$id,
        zone: doc.zone,
        description: doc.description,
        departmentTotal: getDeprtmentTotal(doc.$id),
        customerTotal: getCustomerTotal(doc.$id)
      };
    }) || []
    setRowData(tableData);
    console.log("tableData =", tableData);

    const mapSelect: selectedDelete[] = tableData.map((row: RowData) => ({
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
    setAddZoneVal("");
    setAddZoneDescVal("");
    setIsSelectedAll(false);
    setIsSearch(false);
    handleCheckAll(false);
    setPage(0);
    tableData();
  }

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
      <Navbar menu={'Master Data'} submenu={'Zone'} />
      <Box className="px-2">
        {/* Main Content */}
        <Box flex={1} px={2} pb={2}>
          {/* Sub Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            justifyItems="center"
            mb={2}
          >
            <Box display="flex" justifyContent="center" className="w-full">
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
                justifyContent="space-between"
                className="space-x-4 p-4 flex w-1/2"
              >
                <Box className="flex space-x-4 w-full">
                <LabelTextField
                  label={"Zone"}
                  placeholder={"Type here..."}
                  inputVal={addZoneVal}
                  setInputVal={setAddZoneVal}
                />
                <LabelTextField
                  label={"Description"}
                  placeholder={"Type here..."}
                  inputVal={addZoneDescVal}
                  setInputVal={setAddZoneDescVal}
                />
                </Box>
                <AddButton disable={editMode.some(e=>e === true)} onAddBtnClick={handleAdd}/>
                <Box className="w-[15%]"><SearchButton disable={editMode.some(e=>e === true)} onSearchBtnClick={handleSearch}/></Box>
                <Box className="w-[15%]"><ClearButtton onBtnClick={handleClear}
                     disable={editMode.some(e=>e === true)} icon={undefined} content={"Clear"} /></Box>
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
                    onCheckedChange={handleCheckAll} disabled={totalRows === 0}/>
                  </TableCell>
                  <TableCell align="center" className="w-[19%]">Zone</TableCell>
                  <TableCell align="center" className="w-[24%]">Description</TableCell>
                  <TableCell align="center" className="w-[19%]">Department</TableCell>
                  <TableCell align="center" className="w-[19%]">Customer</TableCell>
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
                          value={row.zone}
                          onChange={(e) => handleInputChange(index + (page*rowsPerPage), 'zone', e.target.value)}
                        />
                      ) : (
                        `${row.zone}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.description}
                          onChange={(e) => handleInputChange(index + (page*rowsPerPage), 'description', e.target.value)}
                        />
                      ) : (
                        `${row.description}`
                      )}
                    </TableCell>
                    <TableCell align="center">{row.departmentTotal}</TableCell>
                    <TableCell align="center">{row.customerTotal}</TableCell>
                    <TableCell align="center" sx={{justifyItems:"center"}}>
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
                      <DeleteButton onDeleteBtnClick={handleDelete}  disable={!selected.some((item) => item.isSelected)}/>
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