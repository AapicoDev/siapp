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
  Button as Button2,
  IconButton,
  Switch as SwitchMUI,
  TablePagination,
  CircularProgress,
} from "@mui/material/";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox2";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
import { Switch } from "@/components/ui/switch";
import ViewQrCode from "@/components/materData/ViewQrCode";
import { AddButton } from "@/components/ui/buttons/addButton";
import { ViewButton } from "@/components/ui/buttons/viewButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { GoArrowUpRight } from "react-icons/go";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import data from "@/app/mockData.json";
import { Textbox } from "@/components/ui/textboxs/textbox";
import { ActiveStatusBox } from "@/components/ui/activeStatusBox";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import { SaveButton } from "@/components/ui/buttons/saveButton";
import RoleForm from "@/components/users/RoleForm";
import { deleteRole, fetchPermissionData, fetchRolesData, filterRole, getAllRoles, updateRole } from "@/app/lib/api";
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import { SearchSelector } from "@/components/ui/selectors/searchSelector";
import { ClearButtton } from "@/components/ui/buttons/clearButton";

type RowDataRoles = {
  id: any;
  roleName: string;
  permissions: any[];
};

type RolesItemSource = {
  id: any;
  label: string;
};

type RowDataPermission = {
  id: any;
  permissionName: string;
  label: string;
};

type selectedDelete = {
  isSelected: boolean;
  id: any;
};

export default function UsersPage() {
  const [rowDataRoles, setRowDataRoles] = useState<RowDataRoles[]>([]);
  const [roleDataPrev, setRoleDataPrev] = useState<RowDataRoles>();
  const [editMode, setEditMode] = useState(Array(rowDataRoles.length).fill(false));
  const [roles, setRoles] = useState(data.roles);
  const [permissions, setPermissions] = useState<RowDataPermission[]>([]);
  const [allPermissions, setAllPermissions] = useState<RowDataPermission[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isPermissionSelectedAll, setIsPermissionSelectedAll] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [selectedSearchRole, setSelectedSearchRole] = useState("");
  const [selectedSearchPermission, setSelectedSearchPermission] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowDataRoles.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const [permissionSelected, setPermissionSelected] = useState<
    selectedDelete[]
  >(
    permissions.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const [rolePage, setRolePage] = useState(0);
  const [rowsPerRolePage, setRowsPerRolePage] = useState(10);
  const [totalRoleRows, setTotalRoleRows] = useState(0);
  const [permissionPage, setPermissionPage] = useState(0);
  const [rowsPerPermissionPage, setRowsPerPermissionPage] = useState(10);
  const [totalPermissionRows, setTotalPermissionRows] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isAddOrUpdateSucces, setIsAddOrUpdateSucces] = useState(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  // useEffect(() => {
  //   const newPermissionSelected = permissions.map((row) => ({
  //     isSelected: false,
  //     id: row.id,
  //   }));
  //   setPermissionSelected(newPermissionSelected);
  //   const isCheckAll = !permissionSelected.some(
  //     (item) => item.isSelected === false
  //   );
  //   setIsPermissionSelectedAll(isCheckAll);
  // }, [editMode]);

  useEffect(() => {
    isSearch === true ? search() : RoleTable();
    if (isAddOrUpdateSucces) {
      setIsAddOrUpdateSucces(false);
    }
  }, [ isAddOrUpdateSucces]); //rolePage, rowsPerRolePage,

  useEffect(() => {
    PermissionTable();
  }, []); //[permissionPage, rowsPerPermissionPage]

  const RoleTable = async () => {
    console.log("Enter RoleTable");
    setIsLoading(true);
    const offset = rolePage * rowsPerRolePage;
    const fetchRole = await getAllRoles();
    console.log("fetchRole =", fetchRole?.documents);
    const tableData: RowDataRoles[] = fetchRole?.documents.map((doc: any) => {
      return {
        id: doc.$id,
        roleName: doc.role_Name,
        permissions: doc.permission_Ids,
      };
    }) || rowDataRoles;
    setRowDataRoles(tableData);
    setTotalRoleRows(fetchRole?.total || 0);

    const mapSelect: selectedDelete[] = tableData.map((row) => ({
      isSelected: false,
      id: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  const PermissionTable = async () => {
    setIsLoading(true);
    const fetchPermission = await fetchPermissionData();
    console.log("fetchPermission =", fetchPermission?.documents);
    const tableData: RowDataPermission[] = fetchPermission?.documents.map((doc: any) => {
      return {
        id: doc.$id,
        permissionName: doc.permission_Name,
        label: doc.permission_Name,
      };
    }) || permissions;
    setPermissions(tableData);
    setAllPermissions(tableData);
    setTotalPermissionRows(fetchPermission?.total || 0);
    const mapSelect: selectedDelete[] = tableData.map((row) => ({
      isSelected: false,
      id: row.id,
    }));
    setPermissionSelected(mapSelect);
    setIsLoading(false);
  };

  const handleAddNewRole = () => {
    setShowAddRoleModal(true);
  };

  const handleDelete = async () => {
    const confirmApprove = await confirmDialog(
      "Delete Role",
      "Do you want to delete these selected Role?", false, "danger"
    );
    if (confirmApprove) {
      if (confirmApprove) {
        let response: any;
        const deleteId = selected.filter(s => s.isSelected === true).map(s=>s.id);
        console.log("deleteId =", deleteId);
        if (deleteId.length > 0) {
          response = await deleteRole(deleteId);
          console.log("response =", response);
        }
        if(response.result !== null){
          const confirmApprove = await confirmDialog(
            "Delete Role Success",
            "Delete Role data successfully.",
            true
          );
          setIsSelectedAll(false);
        }
        else{
          const confirmApprove = await confirmDialog(
            "Error to Delete Role",
            `${response.error}`,
            true, "danger"
          );
        }
        setIsAddOrUpdateSucces(true);
      }
    }
  };

  const handleRowClick = (index: any, row: RowDataRoles) => {
    console.log("row.permissions =", row.permissions);
    if (!editMode.some((item) => item === true)) {
      const newEditMode = [...editMode];
      newEditMode[index] = true;
      setEditMode(newEditMode);
      console.log("newEditMode =", newEditMode);

      setRoleDataPrev({id: row.id, roleName: row.roleName, permissions: row.permissions});

      const mapPermissionSelected: selectedDelete[] = permissionSelected.map( per => {
        if(row.permissions.includes(per.id)){
          return{
            ...per,
             isSelected: true
          }
        }
        else return per
      })
      console.log("mapPermissionSelected =", mapPermissionSelected);
      setPermissionSelected(mapPermissionSelected);

      const isPermissionCheckAll = !mapPermissionSelected.some((item) => item.isSelected === false);
      if (isPermissionCheckAll) {
        setIsPermissionSelectedAll(true);
      }
    }
  };

  const handleSave = async () => {
    const newSelectedPermission = permissionSelected.filter(p => p.isSelected === true).map(p => p.id);
    const editIndex = editMode.findIndex(e => e === true);
    const editRow = rowDataRoles[editIndex];
    console.log("newSelectedPermission =",newSelectedPermission);
    console.log("editIndex =",editIndex);
    console.log("editRow =",editRow);

    const dataToSubmit = {
      role_Name: editRow.roleName,
      permission_Ids: newSelectedPermission,
    }
    console.log("dataToSubmit =", dataToSubmit);
    setIsLoading(true);
    const updateRoleResult = await updateRole(dataToSubmit, editRow?.id);
    if(updateRoleResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Update Role Success",
        "Update Role data successfully.",
        true, "success"
      );
    }
    else{
      const confirmApprove = await confirmDialog(
        "Error to Save Role Data",
        `${updateRoleResult.error}`,
        true, "danger"
      );
    }
    setIsAddOrUpdateSucces(true);
    setIsLoading(false);

    //After finish Update
    const newEditMode = editMode.map((element) =>
      element === true ? false : element
    );
    console.log("neweditMode =", newEditMode);
    setEditMode(newEditMode);
    const mapSelect: selectedDelete[] = permissions.map((row) => ({
      isSelected: false,
      id: row.id,
    }));
    console.log("mapSelect =", mapSelect);
    setPermissionSelected(mapSelect);
  };

  const handleCancel = async () => {
    console.log("roleDataPrev =", roleDataPrev);
    const editIndex = editMode.findIndex(e => e === true);
    const editRoles = [...rowDataRoles];
    editRoles[editIndex] = roleDataPrev || editRoles[editIndex];
    setRowDataRoles(editRoles);

    const newEditMode = editMode.map((element) =>
      element === true ? false : element
    );
    console.log("neweditMode =", newEditMode);
    setEditMode(newEditMode);
    const mapSelect: selectedDelete[] = permissions.map((row) => ({
      isSelected: false,
      id: row.id,
    }));
    console.log("mapSelect =", mapSelect);
    setPermissionSelected(mapSelect);
    setIsPermissionSelectedAll(false);
  };

  function handleCloseCustomerForm() {
    setShowAddRoleModal(false);
    setRowDataRoles(rowDataRoles);
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

  const handlePermissionSelected = (index: number) => {
    const newSelected = [...permissionSelected];
    newSelected[index].isSelected = !permissionSelected[index].isSelected;
    setPermissionSelected(newSelected);
    const isCheckAll = !permissionSelected.some(
      (item) => item.isSelected === false
    );
    if (isCheckAll) {
      setIsPermissionSelectedAll(true);
    } else {
      setIsPermissionSelectedAll(false);
    }
    console.log("permissionSelected", permissionSelected);

    const newSelectedPermission = newSelected.filter(p => p.isSelected === true).map(p => p.id);
    const editIndex = editMode.findIndex(e => e === true);
    const editRoles = [...rowDataRoles];
    editRoles[editIndex].permissions = newSelectedPermission;
    setRowDataRoles(editRoles);
  };

  const handlePermissionSelectAll = (checked: boolean) => {
    setIsPermissionSelectedAll(checked);
    const selectedAll = [...permissionSelected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setPermissionSelected(selectedAll);

    const newSelectedPermission = selectedAll.filter(p => p.isSelected === true).map(p => p.id);
    const editIndex = editMode.findIndex(e => e === true);
    const editRoles = [...rowDataRoles];
    editRoles[editIndex].permissions = newSelectedPermission;
    setRowDataRoles(editRoles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchVal(value);
    }
  };

  const handleInputChange = <T extends keyof RowDataRoles>(
    index: number,
    field: T,
    value: RowDataRoles[T]
  ) => {
    const newRowData = [...rowDataRoles];
    newRowData[index][field] = value;
    setRowDataRoles(newRowData);
  };

  const handleRolePageChange = (event: any, newPage: any) => {
    console.log("newPage", newPage);
    setRolePage(newPage);
  };
  const handleRoleRowsPerPageChange = (event: any) => {
    setRowsPerRolePage(parseInt(event.target.value, 10));
    setRolePage(0);
  };

  const handlePermissionPageChange = (event: any, newPage: any) => {
    console.log("newPage", newPage);
    setPermissionPage(newPage);
  };
  const handlePermissionRowsPerPageChange = (event: any) => {
    setRowsPerPermissionPage(parseInt(event.target.value, 10));
    setPermissionPage(0);
  };

  const search = async () => {
    console.log("selectedSearchRole =", selectedSearchRole)
    console.log("selectedSearchPermission =", selectedSearchPermission)
    setIsLoading(true);
    const offset = rolePage * rowsPerRolePage;
    const fetchRole = await filterRole(selectedSearchRole, selectedSearchPermission, offset, rowsPerRolePage);
    setTotalRoleRows(fetchRole?.total || 0);
    console.log("filterRow =", fetchRole);
    const tableData: RowDataRoles[] = fetchRole?.documents?.map((doc) => {
      return {
        id: doc.$id,
        roleName: doc.role_Name,
        permissions: doc.permission_Ids,
      };
    }) || []
    setRowDataRoles(tableData);
    console.log("tableData =", tableData);

    const mapSelect = tableData.map((row: RowDataRoles) => ({
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
    setRolePage(0);
    search();
  };

  const handleClear = () => {
    setSelectedSearchRole("");
    setSelectedSearchPermission("");
    setIsSelectedAll(false);
    setIsSearch(false);
    handleCheckAll(false);
    setRolePage(0);
    RoleTable();
  }

  const handleSearchSelectorChange = (newValue: any, name: any) => {
    console.log("newValue =", newValue);
    console.log("name =", name);
    if(name === "permission"){
      newValue === null ? setSelectedSearchPermission("") : setSelectedSearchPermission(newValue?.id);
    }
    else if(name === "role"){
      newValue === null ? setSelectedSearchRole("") : setSelectedSearchRole(newValue?.id);
    }
  };

  return (
    <div>
      <Navbar menu={"Users"} submenu={"Roles & Permissions"} />
      <Box className='px-2'>
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className='w-full flex justify-center'>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
              }}
              justifyContent="space-between"
              className="space-x-4 p-4 flex w-[55%]"
            >
              <Box className="flex w-full space-x-4">
                <Box className="w-40 bg-[#D9F0EC] rounded-lg flex text-[#37B7C3] py-2 px-4">
                  <Filter
                    size={16}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
                </Box>

                {/* Selector search Role */}
                <LabelTextField
                  label={"Role"}
                  placeholder={"Type here..."}
                  inputVal={selectedSearchRole}
                  setInputVal={setSelectedSearchRole}
                />

                {/* Selector Search Permissions */}
                  <SearchSelector
                    itemSource={permissions}
                    handleChange={(newVal: any, name: any) => handleSearchSelectorChange(newVal, name)}
                    selectedVal={selectedSearchPermission}
                    name={"permission"}
                    inlineLabel="Permission"
                  />
                 <Box className="w-[15%]"><SearchButton disable={editMode.some(e=>e === true)} onSearchBtnClick={handleSearch}/></Box>
                 <Box className="w-[15%]"><ClearButtton onBtnClick={handleClear}
                                disable={editMode.some(e=>e === true)} icon={undefined} content={"Clear"} /></Box>
              </Box>
            </Box>
          </Box>

          {/* Tables */}
          <Box className='w-full flex'>
            {/* Role Table */}
            <Box className='w-[50%] pr-4'>
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
                  <TableHead sx={{ mt: 0 }}>
                    <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                      <TableCell align='left' className='w-[10%]'>
                        <Checkbox2
                          className='mt-1 mb-2 border-[#C7D4D7]'
                          checked={isSelectedAll}
                          onCheckedChange={handleCheckAll}
                          disabled={editMode.some((value) => value) || totalRoleRows === 0}
                        />
                      </TableCell>
                      <TableCell align='center' className='w-[60%]'>
                        Role
                      </TableCell>
                      <TableCell align='center' className='w-[30%]'>
                        Permissions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody sx={{ flexGrow: 1 }}>
                    {rowDataRoles.slice(rolePage * rowsPerRolePage, rowsPerRolePage + (rolePage * rowsPerRolePage))
                      .map((row, index) => (
                      <TableRow
                        onClick={() => handleRowClick(index + (rolePage * rowsPerRolePage), row)}
                        key={index + (rolePage * rowsPerRolePage)}
                        className={
                          editMode[index + (rolePage * rowsPerRolePage)]
                            ? `bg-[#D8EAFF]`
                            : `${
                                index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                              }`
                        }
                        sx={{
                          cursor: !editMode.some((value) => value)
                            ? "pointer"
                            : "default",
                          "& .MuiTableCell-root": {
                            padding: "10px 20px 10px 20px",
                          },
                          "&:hover": {
                            //backgroundColor: "#DCE9EB"
                            backgroundColor: editMode.some((value) => value)
                              ? `${
                                  index % 2 === 1
                                    ? `bg-inherit`
                                    : `bg-[#EBF4F6]`
                                }`
                              : "#DCE9EB",
                          },
                        }}>
                        <TableCell align='left'>
                          <Checkbox2
                            checked={selected[index + (rolePage * rowsPerRolePage)].isSelected}
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click
                              handleSelected(index + (rolePage * rowsPerRolePage));
                            }}
                            className="mb-2 border-[#C7D4D7]"
                            disabled={editMode.some((value) => value)}
                          />
                        </TableCell>
                        <TableCell align="center" className="max-w-48">
                          {editMode[index + (rolePage * rowsPerRolePage)] ? (
                            <Input
                              type='text'
                              className={`${styles.textBoxCell}`}
                              value={row.roleName}
                              onChange={(e) =>
                                handleInputChange(index + (rolePage * rowsPerRolePage), "roleName", e.target.value)
                              }
                            />
                          ) : (
                            `${row.roleName}`
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.permissions.length}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* TableFooter*/}
              <TableContainer
                className='bg-white border-t'
                sx={{
                  borderRadius: "0px 0px 15px 15px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableFooter className='w-full'>
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
                          <Box className="flex w-[55%]">
                          <TablePagination
                            sx={{ color: "#2C5079" }}
                            component="div"
                            count={totalRoleRows}
                            page={rolePage}
                            onPageChange={handleRolePageChange}
                            rowsPerPage={rowsPerRolePage}
                            onRowsPerPageChange={handleRoleRowsPerPageChange}
                          />
                          </Box>
                          <Box className="flex w-[45%]">
                            <Box className="flex w-[50%]">
                            {editMode.some((item) => item === true) ? 
                              (<Button
                                style={{ fontWeight: "bold" }}
                                className="w-[93%] h-10 bg-white text-[#83A2AD] border-[1px] border-[#83A2AD] hover:text-white hover:bg-[#83A2AD]"
                                onClick={handleCancel}
                              >
                                Cancel
                              </Button>) :
                              (<DeleteButton
                                onDeleteBtnClick={handleDelete}
                                disable={
                                  !selected.some((item) => item.isSelected)
                                }
                              />)}
                            </Box>
                            {editMode.some((item) => item === true) ? (
                              <Box className="flex w-[50%]">
                                <SaveButton onSaveBtnClick={handleSave} />
                              </Box>
                            ) : (
                              <Box className="flex w-[50%]">
                                <GradientButton
                                  content={"+ New"}
                                  onBtnClick={handleAddNewRole}
                                  minWidth={""}
                                />
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>

            {/* Permissions Table */}
            <Box className='w-[50%]'>
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
                  <TableHead sx={{ mt: 0, height: "64px"}}>
                    <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                      <TableCell align="left" className="w-[15%]">
                        {editMode.some((value) => value) && (
                          <Checkbox3
                            className="mt-1 mb-2 border-[#C7D4D7]"
                            checked={isPermissionSelectedAll}
                            onCheckedChange={handlePermissionSelectAll}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center" className="w-[85%] mr-4">
                        Permission
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Allow the TableBody to grow and fill vertical space */}
                  <TableBody sx={{ flexGrow: 1}}>
                    {permissions.slice(permissionPage * rowsPerPermissionPage, rowsPerPermissionPage + (permissionPage * rowsPerPermissionPage))
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        className={`${
                          index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                        }`}
                        sx={{ height: "60px"}}
                      >
                        <TableCell align="left">
                          {editMode.some((value) => value) && (
                            <Checkbox3
                              checked={permissionSelected[index + (permissionPage*rowsPerPermissionPage)].isSelected}
                              onCheckedChange={() => {
                                handlePermissionSelected(index + (permissionPage*rowsPerPermissionPage));
                              }}
                              className="mb-2 border-[#C7D4D7]"
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">{row.permissionName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* TableFooter*/}
              <TableContainer
                className='bg-white border-t'
                sx={{
                  borderRadius: "0px 0px 15px 15px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableFooter className='w-full'>
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
                            sx={{ color: "#2C5079" }}
                            rowsPerPageOptions={[10, 20, 60, 80, 100]}
                            component="div"
                            count={totalPermissionRows}
                            page={permissionPage}
                            onPageChange={handlePermissionPageChange}
                            rowsPerPage={rowsPerPermissionPage}
                            onRowsPerPageChange={handlePermissionRowsPerPageChange}
                          />
                          {/* <Box>
                            <DeleteButton
                              onDeleteBtnClick={handleDeleteCust}
                              disable={
                                !permissionSelected.some(
                                  (item) => item.isSelected
                                )
                              }
                            />
                            <Button
                              style={{ marginLeft: "auto", fontWeight: "bold" }}
                              className='w-48 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#4C9BF5] hover:to-[#D8EAFF] 
                                 hover:text-[#00336C] disabled:bg-[#83A2AD]'
                              onClick={() => handleAddNewCust()}>
                              + New
                            </Button>
                          </Box> */}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Add Role */}
      {showAddRoleModal && 
        <RoleForm 
          permissions={permissions} 
          closeModal={handleCloseCustomerForm} 
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}/>
      }

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
