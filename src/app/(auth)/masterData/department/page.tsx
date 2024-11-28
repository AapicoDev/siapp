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
  TextField,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
  CircularProgress,
} from "@mui/material/";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/textboxs/input";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import { AddButton } from "@/components/ui/buttons/addButton";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import styles from "../../../styles.module.css";
import { EditButton } from "@/components/ui/buttons/editButton";
import { SaveButton } from "@/components/ui/buttons/saveButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { LabelSelector2 } from "@/components/ui/selectors/labelSelector2";
import { addNewDepartment, deleteDepartment, fetchMasterDepartmentData, filterMasterDepartmentData, getAllMasterDepartmentData, getAllMasterGroupData, getAllMasterSegmentData, getAllMasterZoneData, updateDepartment } from "@/app/lib/api";
import { getgroups } from "process";
import { SearchSelector } from "@/components/ui/selectors/searchSelector";
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";
import { ClearButtton } from "@/components/ui/buttons/clearButton";

type RowData = {
  id: any;
  departmentCode: string;
  department: string;
  segmentId: any;
  groupId: any;
  zoneId: any;
};

type selectedDelete = {
  isSelected: boolean;
  id: any;
};

type ItemSource = {
  id: any;
  desc: string;
  name: string;
};

export default function Department() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [editMode, setEditMode] = useState(Array(rowData.length).fill(false)); // Array to track edit state for each row
  const [selectedAddSegment, setSelectedAddSegment] = useState<any>("");
  const [selectedAddGroup, setSelectedAddGroup] = useState<string>("");
  const [selectedAddZone, setsSelectedAddZone] = useState<string>("");
  const [addDeptCodeVal, setAddDeptCodeVal] = useState("");
  const [addDeptVal, setAddDeptVal] = useState("");
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
  const [segmentItemSource, setSegmentItemSource] = useState<ItemSource[]>([]);
  const [groupItemSource, setGroupItemSource] = useState<ItemSource[]>([]);
  const [zoneItemSource, setZoneItemSource] = useState<ItemSource[]>([]);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect( () => {
    initialData();
  }, []);
  useEffect(() => {
    tableData();
  }, []); //[page, rowsPerPage]

  const initialData = async () => {
    setIsLoading(true);
    const getSegments = await getAllMasterSegmentData();
    const getGroups = await getAllMasterGroupData();
    const getZones = await getAllMasterZoneData();

    const mapSegment: ItemSource[] = getSegments?.documents.map(s => {
      return{
        id: s.$id,
        label: s.segment,
        desc: s.segment,
        name: s.description
    }}) || [];
    setSegmentItemSource(mapSegment);

    const mapGroup: ItemSource[] = getGroups?.documents.map(g => {
      return{
        id: g.$id,
        label: g.group,
        desc: g.group,
        name: g.description
    }}) || [];
    setGroupItemSource(mapGroup);

    const mapZone: ItemSource[] = getZones?.documents.map(z => {
      return{
        id: z.$id,
        label: z.zone,
        desc: z.zone,
        name: z.description
    }}) || [];
    setZoneItemSource(mapZone);
    setIsLoading(false);
  };

  const tableData = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const allDept = await getAllMasterDepartmentData();
    console.log("allDept =", allDept);
    const tableData: RowData[] = allDept?.documents?.map((doc: any) => {
        return {
          id: doc.$id,
          department: doc.departmentName,
          departmentCode: doc.department_Code,
          groupId: doc.group_Id,
          segmentId: doc.segment_Id,
          zoneId: doc.zone_Id,
        };
      }) || []
    setRowData(tableData);
    setTotalRows(allDept?.total || 0);
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
    newEditMode[index] = false;
    setEditMode(newEditMode);
    console.log("rowData =", rowData);
    
    console.log("rowData[index] = ", rowData[index]);
    const dataToSubmit = {
      departmentName: rowData[index]?.department,
      department_Code: rowData[index]?.departmentCode,
      group_Id: rowData[index]?.groupId,
      segment_Id: rowData[index]?.segmentId,
      zone_Id: rowData[index]?.zoneId
    }
    const updateDepartmentResult = await updateDepartment(dataToSubmit, rowData[index]?.id);
    if(updateDepartmentResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Save Department Success",
        "Save Department data successfully.",
        true, "success"
      );
      if(confirmApprove) {
        isSearch === true ? await search() : await tableData();
      }
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Save Department",
        `${updateDepartmentResult.error}`,
        true, "danger"
      );
      if(confirmApprove) {
        isSearch === true ? await search() : await tableData();
      }
    }
  };

  const handleAdd = async () => {
    console.log("AddDeptVal = ", addDeptVal);
    console.log("AddDeptCodeVal = ", addDeptCodeVal);
    console.log("addsegmentVal = ", selectedAddSegment);
    console.log("addGroupVal = ", selectedAddGroup);
    console.log("addZoneVal = ", selectedAddZone);
    const dataToSubmit = {
      department_Code: addDeptCodeVal,
      departmentName: addDeptVal,
      segment_Id: selectedAddSegment,
      group_Id: selectedAddGroup,
      zone_Id: selectedAddZone
    }
    const addDeptResult = await addNewDepartment(dataToSubmit);
    if(addDeptResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Add Department Success",
        "Add Department data successfully.",
        true, "success"
      );
      if(confirmApprove) {
        setAddDeptVal("");
        setAddDeptCodeVal("");
        setSelectedAddSegment("");
        setSelectedAddGroup("");
        setsSelectedAddZone("");
        if(isSearch === true) setIsSearch(false);
      }
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Add Department",
        `${addDeptResult.error}`,
        true, "danger"
      );
    }
    await tableData();
  };

  const search = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const filterDepartment = await filterMasterDepartmentData([
      {field: "department_Code", value: addDeptCodeVal},
      {field: "departmentName", value: addDeptVal},
      {field: "segment_Id", value: selectedAddSegment},
      {field: "group_Id", value: selectedAddGroup},
      {field: "zone_Id", value: selectedAddZone},
    ], offset, rowsPerPage);
    setTotalRows(filterDepartment?.total || 0);
    console.log("filterDepartment =", filterDepartment);
    const tableData: RowData[] = filterDepartment?.documents?.map((doc) => {
      return {
        id: doc.$id,
        department: doc.departmentName,
        departmentCode: doc.department_Code,
        groupId: doc.group_Id,
        segmentId: doc.segment_Id,
        zoneId: doc.zone_Id,
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
    setAddDeptVal("");
    setAddDeptCodeVal("");
    setSelectedAddSegment("");
    setSelectedAddGroup("");
    setsSelectedAddZone("");
    setIsSelectedAll(false);
    setIsSearch(false);
    handleCheckAll(false);
    setPage(0);
    tableData();
  }

  const handleDelete = async () => {
    const confirmApprove = await confirmDialog(
      "Delete Department",
      "Do you want to delete these selected Department?", false, "danger"
    );
    if (confirmApprove) {
      if (confirmApprove) {
        let response: any;
        const deleteId = selected.filter(s => s.isSelected === true).map(s=>s.id);
        if (deleteId.length > 0) {
          response = await deleteDepartment(deleteId);
          console.log("response =", response);
        }
        if(response.result !== null){
          const confirmApprove = await confirmDialog(
            "Delete Department Success",
            "Delete Department data successfully.",
            true
          );
          setIsSelectedAll(false);
        }
        else{
          const confirmApprove = await confirmDialog(
            "Error to delete Department",
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

  const handleSearchSelectorChange = (newValue: any, name: any) => {
    console.log("newValue =", newValue);
    console.log("name =", name);
    if(name === "segmentId"){
      newValue === null ? setSelectedAddSegment("") : setSelectedAddSegment(newValue?.id);
    }
    else if(name === "groupId"){
      newValue === null ? setSelectedAddGroup("") : setSelectedAddGroup(newValue?.id);
    }
    else if(name === "zoneId"){
      newValue === null ? setsSelectedAddZone("") : setsSelectedAddZone(newValue?.id);
    }
  };
  
  const handleSearchSelectorInRowChange = (newValue: any, name: any, id: string) => {
    console.log("newValue =", newValue);
    console.log("name =", name);
    console.log("dept id =", id);
    const updatedData = rowData.map((item) =>
      item.id === id
        ? { ...item, [name]: newValue === null ? "" : newValue?.id }
        : item
    );
    setRowData(updatedData);
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

  return (
    <div>
      <Navbar menu={"Master Data"} submenu={"Department"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className="w-full flex justify-center">
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
              }}
              justifyContent="space-between"
              className="space-x-4 p-4 flex w-full"
            >
              <Box className="flex w-full space-x-4">
                <LabelTextField
                  label={"Department Code"}
                  placeholder={"Type here..."}
                  inputVal={addDeptCodeVal}
                  setInputVal={setAddDeptCodeVal}
                />
                <LabelTextField
                  label={"Department"}
                  placeholder={"Type here..."}
                  inputVal={addDeptVal}
                  setInputVal={setAddDeptVal}
                />

                {/* Selector Add Segment */}
                <SearchSelector
                    itemSource={segmentItemSource}
                    handleChange={(newVal: any, name: any) => handleSearchSelectorChange(newVal, name)}
                    selectedVal={selectedAddSegment}
                    name={"segmentId"}
                    inlineLabel="Segment"
                  />

                {/* Selector Add Group */}
                <SearchSelector
                    itemSource={groupItemSource}
                    handleChange={(newVal: any, name: any) => handleSearchSelectorChange(newVal, name)}
                    selectedVal={selectedAddGroup}
                    name={"groupId"}
                    inlineLabel="Group"
                  />

                {/* Selector Add Zone */}
                <SearchSelector
                    itemSource={zoneItemSource}
                    handleChange={(newVal: any, name: any) => handleSearchSelectorChange(newVal, name)}
                    selectedVal={selectedAddZone}
                    name={"zoneId"}
                    inlineLabel="Zone"
                  />
              </Box>

              <Box className="space-x-4 w-fit flex">
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
                <TableRow
                  sx={{ borderBottom: "1px solid #C7D4D7" }}
                  className={`${styles.table}`}
                >
                  <TableCell align="left" className="w-[4%]">
                    <Checkbox2 className="mt-1 mb-2" 
                               checked={isSelectedAll}
                               onCheckedChange={handleCheckAll}
                               disabled={totalRows === 0}/>
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                    Department Code
                  </TableCell>
                  <TableCell align="center" className="w-[20%]">
                    Department
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Segment
                  </TableCell>
                  <TableCell align="center" className="w-[18%]">
                    Group
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Zone
                  </TableCell>
                  {/* Edit button col */}
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
                    sx={{
                      "& .MuiTableCell-root": {
                        padding: "10px 10px 10px 20px",
                      },
                    }}
                  >
                    <TableCell align="left">
                      <Checkbox2 checked={selected[index + (page*rowsPerPage)].isSelected}
                          onCheckedChange={() => {
                            handleSelected(index + (page*rowsPerPage));
                          }}/>
                    </TableCell>

                    {/* DepartmentCode */}
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.departmentCode}
                          onChange={(e) =>
                            handleInputChange(
                              index + (page*rowsPerPage),
                              "departmentCode",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        `${row.departmentCode}`
                      )}
                    </TableCell>

                    {/* Department */}
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.department}
                          onChange={(e) =>
                            handleInputChange(
                              index + (page*rowsPerPage),
                              "department",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        `${row.department}`
                      )}
                    </TableCell>

                    {/* Segment */}
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                      <SearchSelector
                        itemSource={segmentItemSource}
                        handleChange={(newVal: any, name: any) => handleSearchSelectorInRowChange(newVal, name, row.id)}
                        selectedVal={row.segmentId}
                        name={"segmentId"}
                        borderColor="#4C9BF5"
                      />
                      ) : (
                        `${
                          row.segmentId === null
                            ? "-"
                            : segmentItemSource.find((s) => s.id === row.segmentId)?.desc
                        }`
                      )}
                    </TableCell>

                    {/* Group */}
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                      <SearchSelector
                        itemSource={groupItemSource}
                        handleChange={(newVal: any, name: any) => handleSearchSelectorInRowChange(newVal, name, row.id)}
                        selectedVal={row.groupId}
                        name={"groupId"}
                        borderColor="#4C9BF5"
                      />
                      ) : (
                        `${
                          row.groupId === null
                            ? "-"
                            : groupItemSource.find((s) => s.id === row.groupId)?.desc
                        }`
                      )}
                    </TableCell>

                    {/* Zone */}
                    <TableCell align="center">
                      {editMode[index + (page*rowsPerPage)] ? (
                      <SearchSelector
                        itemSource={zoneItemSource}
                        handleChange={(newVal: any, name: any) => handleSearchSelectorInRowChange(newVal, name, row.id)}
                        selectedVal={row.zoneId}
                        name={"zoneId"}
                        borderColor="#4C9BF5"
                      />
                      ) : (
                        `${
                          row.zoneId === null
                            ? "-"
                            : zoneItemSource.find((s) => s.id === row.zoneId)?.desc
                        }`
                      )}
                    </TableCell>
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
                      <DeleteButton
                        onDeleteBtnClick={handleDelete}
                        disable={!selected.some((item) => item.isSelected)}
                      />
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
