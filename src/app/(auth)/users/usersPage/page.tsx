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
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
import { Switch } from "@/components/ui/switch";
import { AddButton } from "@/components/ui/buttons/addButton";
import { ViewButton } from "@/components/ui/buttons/viewButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import data from "@/app/mockData.json";
import { Textbox } from "@/components/ui/textboxs/textbox";
import { ActiveStatusBox } from "@/components/ui/activeStatusBox";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import UsersForm from "@/components/users/UsersForm";
import { deleteAuthUser, deleteUser, deleteUserRole, fetchUsersData, filterUserData, filterUserRoleData, getAllRoles, getAllUsersData } from "@/app/lib/api";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import { useConfirmDialog } from "../../../../components/ui/alertDialog/confirmDialog";
import { SearchSelector } from "@/components/ui/selectors/searchSelector";
import { ClearButtton } from "@/components/ui/buttons/clearButton";

type RowData = {
  id: any;
  employeeId: string;
  name: string;
  surname: string;
  userRoleId: any[];
  roles: RoleType[];
  userName: any;
  userId: any;
  email: any;
  isActive: any;
};

type RoleType = {
  id: any;
  desc: string;
}

type AreaData = {
  id: number;
  custId: any;
  name: string;
};

type selectedDelete = {
  isSelected: boolean;
  id: string;
};

const mockArea: AreaData[] = [
  {
    id: 1,
    custId: 1,
    name: "อาคาร1",
  },
  {
    id: 2,
    custId: 1,
    name: "อาคารใหญ่",
  },
  {
    id: 3,
    custId: 2,
    name: "อาคาร2",
  },
];

const initialArea: AreaData[] = [
  {
    id: 1,
    custId: null,
    name: "",
  },
];

export default function UsersPage() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [allRoles, setAllRoles] = useState<RoleType[]>([]);
  const [status, setStatus] = useState(data.activeStatus);
  const [employees, setEmployees] = useState(data.employees);
  const [areas, setAreas] = useState<AreaData[]>([
    { id: 1, custId: null, name: "" },
  ]);
  const [selectedRow, setSelectedRow] = useState<RowData>({
    id: undefined,
    employeeId: "",
    name: "",
    surname: "",
    userRoleId: [],
    roles: [],
    userName: "",
    userId: "",
    email: "",
    isActive: true,
  });
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState<boolean>(false);
  const [selectedSearchRole, setSelectedSearchRole] = useState("");
  const [selectedSearchStatus, setSelectedSearchStatus] = useState();
  const [searchEmpIdVal, setSearchEmpIdVal] = useState("");
  const [searchEmpNameVal, setSearchEmpNameVal] = useState("");
  const [searchUserNameVal, setSearchUserNameVal] = useState("");
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false, // Default value for `selected`
      id: row.id, // Convert customerId to string for custId
    }))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [totalRows, setTotalRows] = useState(0);
  const [isAddOrUpdateSucces, setIsAddOrUpdateSucces] = useState(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    isSearch === true ? search() : tableData();
    if (isAddOrUpdateSucces) {
      setIsAddOrUpdateSucces(false);
    }
  }, [isAddOrUpdateSucces]); //page, rowsPerPage, 

  useEffect(() => {
    //initialData();
  }, []);

  const initialData = async () => {
    const allRoles = await getAllRoles();
    const mappedAllRoles : RoleType[] = allRoles?.documents?.map(r => {
      return {
        id: r.$id,
        desc: r.role_Name,
        label: r.role_Name
      };
    }) || [];
    setAllRoles(mappedAllRoles);
    console.log("mappedAllRoles =", mappedAllRoles);
  };

  const tableData = async () => {
    console.log("allRoles =", allRoles);
    let mappedAllRoles: RoleType[];
    if(allRoles.length === 0){
      const fetchAllRoles = await getAllRoles();
      mappedAllRoles  = fetchAllRoles?.documents?.map(r => {
        return {
          id: r.$id,
          desc: r.role_Name,
          label: r.role_Name
        };
      }) || [];
      setAllRoles(mappedAllRoles);
      console.log("mappedAllRoles =", mappedAllRoles);
    }

    setIsLoading(true);
    const offset = page * rowsPerPage;
    const users = await getAllUsersData();
    console.log("users =", users);
    const tableData: RowData[] = await Promise.all(
      users?.documents?.map(async (doc: any) => {
        return {
          id: doc.$id,
          employeeId: doc.employeeId,
          name: doc.emplyeeName?.split(" ")[0],
          surname: doc.emplyeeName?.split(" ")[1],
          userRoleId: doc.userRole_Ids,
          roles: await roleManagement(doc.userRole_Ids, mappedAllRoles),
          userName: doc.userName,
          userId: doc.userId,
          email: doc.email,
          isActive: doc.isActive
        };
      }) || []
    );
    setRowData(tableData);
    setTotalRows(users?.total || 0);
    console.log("tableData =", tableData);

    const mapSelect: selectedDelete[] = tableData.map((row: RowData) => ({
      isSelected: false,
      id: row.id,
    }));
    setSelected(mapSelect);
    setIsLoading(false);
  };

  async function roleManagement(userRoleIds: any[], mapAllroles: RoleType[]) {
    const userRoleOfUser = await filterUserRoleData([{field: "$id", value: userRoleIds}]);
    console.log("userRoleOfUser =", userRoleOfUser);
    console.log("mspAllroles =", mapAllroles);
    console.log("allRoles =", allRoles);
    const validAllroles = mapAllroles === undefined ? allRoles : mapAllroles;
    const rolesId = Array.from(
                    new Set(userRoleIds.map(ur => userRoleOfUser?.documents?.find(userRole => userRole.$id === ur)?.role_Ids).flat()));
    const roles: RoleType[] = rolesId.map((rid) => {
      const roleDesc = validAllroles?.find(ar => ar.id === rid)?.desc || "";
      return{
        id: rid,
        desc: validAllroles?.find(ar => ar.id === rid)?.desc || ""
      };
    })
    return roles;
  }

  const handleAddNewUser = () => {
    setOpenAddUserModal(true);
    console.log("rowData =", rowData);
    console.log("allRoles =", allRoles);
  };

  const handleDelete = async () => {
    console.log("selected =", selected);
    const confirmApprove = await confirmDialog(
      "Delete User",
      "Do you want to delete these selected user?", false, "danger"
    );
    if (confirmApprove) {

      const deleteUserIds = selected
        .filter((select) => select.isSelected === true)
        .map((item) => item.id);

      const deleteRow = rowData.filter((row) => deleteUserIds.includes(row.id));
      const deleteAuthUserIds = deleteRow.map((r => r.userId));
      console.log("deleteRow =", deleteRow);
      console.log("deleteUserIds =", deleteUserIds);
      console.log("deleteAuthUserIds =", deleteAuthUserIds);

      // -- Delete Auth User --
      setIsLoading(true);
      const deleteUserIdsSubmit = {
        userIds: deleteAuthUserIds
      }
      const deleteAuthUserResult = await deleteAuthUser(deleteUserIdsSubmit); //result be like: "results": [{ "userId": "userId1", "status": "success" }, { "userId": "userId2", "status": "failed", "error": "User not found" }]
      if(deleteAuthUserResult.result !== null){
        const authUserDeleteSuccess = deleteAuthUserResult.result.filter((r: any) => r.status === "success");
        const authUserDeleteFailed = deleteAuthUserResult.result.filter((r: any) => r.status === "failed");
        const userRoleIdDeleteFail: any[] = [];
        const userIdDeleteFail: any[] = [];
        // delete User & User Role
        if(authUserDeleteSuccess?.length > 0){
          let deleteUserRoleResult, deleteUserResult;
          authUserDeleteSuccess.map(async (auth: any) => {
            //delete User
            const deleteUserId = deleteRow.find(row => row.userId === auth.userId)?.id || [];
            if(deleteUserId !== null && deleteUserId !== undefined && deleteUserId !== ""){
              deleteUserResult = await deleteUser([deleteUserId]);
              if(deleteUserResult.result === null){
                userIdDeleteFail.push({id: deleteUserId, error: deleteUserResult.error});
              }
            }
            //delete UserRole
            const deleteUserRoleIds = deleteRow.find(row => row.userId === auth.userId)?.userRoleId || [];
            if(deleteUserRoleIds?.length > 0){
              deleteUserRoleResult = await deleteUserRole(deleteUserRoleIds);
              if(deleteUserRoleResult.result === null){
                userRoleIdDeleteFail.push({ids: deleteUserRoleIds, error: deleteUserRoleResult.error});
              }
            }
          })
          if(userRoleIdDeleteFail.length > 0 || userIdDeleteFail.length > 0){
              const confirmApprove = await confirmDialog(
                "Error to delete User Data",
                `${userRoleIdDeleteFail.length > 0 ? 
                  userRoleIdDeleteFail.map(idFail => {
                  idFail.ids + ":" + idFail.error + "\n"
                }) : ""}` +
                `${userIdDeleteFail.length > 0 ? 
                  userIdDeleteFail.map(idFail => {
                  idFail.id + ":" + idFail.error + "\n"
                }) : "" }`,
                true, "danger"
              );
          
          }
        }
      }
      else {
        const confirmApprove = await confirmDialog(
          "Error to delete Auth User in Appwrite",
          `${deleteAuthUserResult.error}`,
          true,
          "danger"
        );
      }
      setIsLoading(false);
    }
  };

  const search = async () => {
    setIsLoading(true);
    const offset = page * rowsPerPage;
    const filterUser = await filterUserData([
      {field: "emplyeeName", value: searchEmpNameVal},
      {field: "userName", value: searchUserNameVal},
      {field: "isActive", value: selectedSearchStatus === 1 ? true : selectedSearchStatus === 2 ? false : ""},
      {field: "employeeId", value: searchEmpIdVal},
      {field: "roleIds", value: selectedSearchRole === undefined ? "" : selectedSearchRole},
    ], offset, rowsPerPage);
    setTotalRows(filterUser?.total || 0);
    console.log("filterUser =", filterUser);

    const tableData: RowData[] = await Promise.all(filterUser?.documents?.map(async (doc) => {
      return {
        id: doc.$id,
        employeeId: doc.employeeId,
        name: doc.emplyeeName?.split(" ")[0],
        surname: doc.emplyeeName?.split(" ")[1],
        userRoleId: doc.userRole_Ids,
        roles: await roleManagement(doc.userRole_Ids, allRoles),
        userName: doc.userName,
        userId: doc.userId,
        email: doc.email,
        isActive: doc.isActive
      };
    }) || []);
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
    setSearchEmpIdVal("");
    setSearchEmpNameVal("");
    setSearchUserNameVal("");
    setSelectedSearchRole("");
    setSelectedSearchStatus(undefined);
    setIsAddOrUpdateSucces(false);
    setIsSelectedAll(false);
    setIsSearch(false);
    handleCheckAll(false);
    setPage(0);
    tableData();
  }

  const handleRowClick = (row: RowData) => {
    console.log("row =", row);
    setSelectedRow(row);
    setOpenEditUserModal(true);

    const custArea = mockArea.filter((a) => a.custId === row.id);
    setAreas(initialArea);
    if (custArea.length != 0) {
      setAreas(
        custArea.map((area, index) => ({
          ...area,
          id: index + 1, // use index of array+1 to set new id.
        }))
      );
    }
  };

  function handleCloseUserForm(isEdit: boolean) {
    if (!isEdit) {
      setOpenAddUserModal(false);
    } else {
      setOpenEditUserModal(false);
    }
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

  const handlePageChange = (event: any, newPage: any) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (newValue: any, name: any) => {
    console.log("newValue =", newValue);
    console.log("name =", name);
    if(name === "role"){
      newValue === null ? setSelectedSearchRole("") : setSelectedSearchRole(newValue?.id);
    }
  };

  return (
    <div>
      <Navbar menu={"Users"} submenu={"Users"} />
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
              className="space-x-4 p-4 flex w-[95%]"
            >
              <Box className="flex w-full space-x-4">
                <Box className="w-[7%] bg-[#D9F0EC] rounded-lg flex text-[#37B7C3] py-2 px-4">
                  <Filter
                    size={16}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
                </Box>

                <Box className="w-[15%]">
                  <LabelTextField
                    label={"EmployeeId"}
                    placeholder={"Type here..."}
                    inputVal={searchEmpIdVal}
                    setInputVal={setSearchEmpIdVal}
                  />
                </Box>

                <Box className="w-[18%]">
                  <LabelTextField
                    label={"Name-Surname"}
                    placeholder={"Type here..."}
                    inputVal={searchEmpNameVal}
                    setInputVal={setSearchEmpNameVal}
                  />
                </Box>

                {/* Selector search Role */}
                <Box className="w-[21%]">
                  <SearchSelector
                    itemSource={allRoles}
                    handleChange={(newVal: any, name: any) => setSelectedSearchRole(newVal?.id)}
                    selectedVal={selectedSearchRole}
                    name={"role"}
                    inlineLabel="Role"
                  />
                </Box>

                <Box className="w-[12%]">
                  {/* Selector Search Status */}
                  <SearchSelector
                    itemSource={status}
                    handleChange={(newVal: any, name: any) => setSelectedSearchStatus(newVal?.id)}
                    selectedVal={selectedSearchStatus}
                    name={"status"}
                    inlineLabel="Status"
                  />
                </Box>

                <Box className="w-[15%]">
                  <LabelTextField
                    label={"Username"}
                    placeholder={"Type here..."}
                    inputVal={searchUserNameVal}
                    setInputVal={setSearchUserNameVal}
                  />
                </Box>

                <Box className="w-[6%]"><SearchButton onSearchBtnClick={handleSearch}/></Box>
                <Box className="w-[6%]"><ClearButtton onBtnClick={handleClear}
                              disable={false} icon={undefined} content={"Clear"} /></Box>
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
            <TableHead sx={{ mt: 0}}>
                <TableRow
                  sx={{ borderBottom: "1px solid #C7D4D7" }}
                  className={`${styles.table}`}
                >
                  {/* <TableCell align="left" className="w-[4%]">
                    <Checkbox
                      className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                  </TableCell> */}
                  <TableCell align="center" className="w-[14%]">
                    Employee ID
                  </TableCell>
                  <TableCell align="center" className="w-[20%]">
                    Name-Surname
                  </TableCell>
                  <TableCell align="center" className="w-[24%]">
                    Role
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Log In Username
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Email
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ flexGrow: 1 }}>
              {rowData.slice(page * rowsPerPage, rowsPerPage + (page * rowsPerPage))
                .map((row, index) => (
                  <TableRow
                    onClick={() => handleRowClick(row)} // Row click handler
                    key={index + (page * rowsPerPage)}
                    className={`${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`}
                    sx={{
                      cursor: "pointer",
                      "& .MuiTableCell-root": {
                        padding: "10px 20px 10px 20px",
                      },
                      "&:hover": {
                        backgroundColor: "#DCE9EB",
                      },
                    }}
                  >
                    {/* <TableCell align="left">
                      <Checkbox
                        checked={selected[index]?.isSelected}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          handleSelected(index);
                        }}
                      />
                    </TableCell> */}

                    <TableCell align="center">{row.employeeId}</TableCell>

                    <TableCell align="center">
                      {row.name + " " + row.surname}
                    </TableCell>

                    <TableCell align="center">
                      {row.roles?.length > 1 ? 
                       row.roles?.length > 2 ? `${row.roles[0]?.desc}, ${row.roles[1]?.desc}, ...` 
                       : row.roles?.map((r) => r.desc).join(", ") 
                       : row.roles[0]?.desc}
                    </TableCell>

                    <TableCell align="center">{row.userName}</TableCell>

                    <TableCell align="center">{row.email}</TableCell>

                    <TableCell align="center" sx={{display: "flex", justifyContent: "center"}}>
                      <ActiveStatusBox status={row.isActive} />
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
                      <Box display={"flex"}>
                        {/* <DeleteButton
                          onDeleteBtnClick={handleDelete}
                          disable={!selected.some((item) => item.isSelected)}
                        /> */}
                        <Box className="flex w-[12rem]">
                        <GradientButton
                          content={"+ New"}
                          onBtnClick={handleAddNewUser}
                        />
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Add customer */}
      {openAddUserModal && (
        <UsersForm
          closeModal={handleCloseUserForm}
          userDetail={{
            userId: "",
            id: undefined,
            employeeId: "",
            name: "",
            surname: "",
            userRoleId: [""],
            roles: [],
            userName: "",
            email: "",
            isActive: true,
          }}
          allRoles={allRoles}        
          isEdit={false}
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}/>
      )}

      {/* Edit/Delete Customer */}
      {openEditUserModal && (
        <UsersForm
          closeModal={handleCloseUserForm}
          userDetail={selectedRow}
          allRoles={allRoles}     
          isEdit={true}       
          setIsAddOrUpdateSuccess={setIsAddOrUpdateSucces}
        />
      )}

      {isLoading && <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>}

       {/* Confirm dialog */}
       {ConfirmAlertDialog}
    </div>
  );
}
