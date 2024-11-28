"use client";

import {
  Box,
  Typography,
  Button as Button2,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Tab,
  Grid2,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@/components/ui/textboxs/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/buttons/button";
import { Add, CloseCircle, Minus, Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { VscRefresh } from "react-icons/vsc";
import { Selector } from "../ui/selectors/selector";
import { Textbox } from "../ui/textboxs/textbox";
import { AddButton } from "../ui/buttons/addButton";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import data from "@/app/mockData.json";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LabelTextField2 from "../ui/textboxs/LabelTextField2";
import { LabelSelector3 } from "../ui/selectors/labelSelector3";
import { CheckCircle } from "../ui/checkCircle";
import {
  addNewUser,
  addNewUserRole,
  deleteAuthUser,
  deleteUser,
  deleteUserRole,
  fetchPermissionData,
  fetchRolesData,
  filterRoleWithField,
  filterUserRoleData,
  getAllMasterCustomerData,
  getAllMasterDepartmentData,
  registerNewUserAuth,
  updateAuthUser,
  updateAuthUserPW,
  updateUser,
  updateUserRole,
} from "@/app/lib/api";
import { SearchSelector } from "../ui/selectors/searchSelector";
import { PasswordTextbox } from "../ui/textboxs/passwordTextbox";
import { useConfirmDialog } from "../ui/alertDialog/confirmDialog";

type AreaData = {
  id: number;
  name: string;
};

type RoleType = {
  id: any;
  desc: string;
};

type FormDataType = {
  id: any;
  userId: string;
  employeeId: string;
  name: string;
  surname: string;
  userRoleId: any[];
  roles: RoleType[];
  userName: any;
  email: any;
  isActive: any;
};

type ItemSourceType = {
  id: string;
  desc: string;
  label: string;
};

type UserRoleData = {
  id: string;
  departmentId: any;
  customerId: any;
  roleIds: any[];
  status: string;
};

interface UsersFormProps {
  userDetail: FormDataType;
  closeModal: any;
  allRoles: RoleType[];
  isEdit: boolean;
  setIsAddOrUpdateSuccess: any;
}

const UsersForm = ({
  userDetail,
  closeModal,
  allRoles,
  isEdit,
  setIsAddOrUpdateSuccess,
}: UsersFormProps) => {
  const [tabValue, setTabValue] = useState("1");
  const [customerItemSource, setCustomerItemSource] = useState<ItemSourceType[]>([]);
  const [departmentItemSource, setDepartmentItemSource] = useState<ItemSourceType[]>([]);
  const [permissionItemSource, setPermissionItemSource] = useState<ItemSourceType[]>([]);
  const [userRoles, setUserRoles] = useState<UserRoleData[]>([]);
  const [userData, setUserData] = useState<FormDataType>(userDetail);
  const [formData, setFormData] = useState<FormDataType>(
    userDetail || {
      id: undefined,
      employeeId: "",
      name: "",
      surname: "",
      userRoleId: [],
      roles: [],
      userName: "",
      email: "",
      status: true,
    }
  );
  const [displayRoles, setDisplayRoles] = useState<any[]>([]);
  const [displayPermissions, setDisplayPermissions] = useState<any[]>([]);
  const formHeader = isEdit ? "View / Edit User" : "+ New User";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [rolesOfUser, setRolesOfUser] = useState<any[]>([]);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [userRoleRemoveList, setUserRoleRemoveList] = useState<any[]>([]);
  const [isShowNewPasswordForm, setIsShowNewPasswordForm] =
    useState<boolean>(false);

  useEffect(() => {
    itemSource();
    initialData();
  }, []);

  useEffect(() => {
    if (tabValue === "2" && userRoles !== undefined && userRoles?.length > 0) {
      mapAllRolesAndPermissions();
    }
  }, [tabValue]);

  const itemSource = async () => {
    setIsLoading(true);
    const allCust = await getAllMasterCustomerData();
    const mapCust: ItemSourceType[] =
      allCust?.documents?.map((cust) => {
        return {
          id: cust.$id,
          desc: cust.CustomerName,
          label: cust.CustomerName,
        };
      }) || [];
    setCustomerItemSource(mapCust);

    const allDept = await getAllMasterDepartmentData();
    const mapDept: ItemSourceType[] =
      allDept?.documents?.map((dept) => {
        return {
          id: dept.$id,
          desc: dept.departmentName,
          label: dept.departmentName,
        };
      }) || [];
    setDepartmentItemSource(mapDept);

    const getPermissions = await fetchPermissionData();
    const allPermission: ItemSourceType[] =
      getPermissions?.documents.map((doc) => {
        return {
          id: doc.$id,
          desc: doc.permission_Name,
          label: doc.permission_Name,
        };
      }) || [];
    setPermissionItemSource(allPermission);
    setIsLoading(false);
  };

  const initialData = async () => {
    setIsLoading(true);
    const getUserRoles = await filterUserRoleData([
      { field: "userId", value: formData.userId },
    ]);
    const mappedUserRole: UserRoleData[] =
      getUserRoles?.documents.map((doc) => {
        return {
          id: doc.$id,
          departmentId: doc.department_Id,
          customerId: doc.customer_Id,
          roleIds: doc.role_Ids,
          status: "existed",
        };
      }) || [];
    console.log("mappedUserRole =", mappedUserRole);
    setUserRoles(mappedUserRole);
    setIsLoading(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const mapAllRolesAndPermissions = async () => {
    setIsLoading(true);
    const maproleId = Array.from(
      new Set(userRoles.map((ur) => ur?.roleIds).flat())
    );
    setDisplayRoles(maproleId);
    const selectedId = maproleId[0];
    setSelectedRoleId(selectedId || "");
    console.log("userRoles =", userRoles);
    console.log("maproleId =", maproleId);

    const fetchRoles = await filterRoleWithField([
      { field: "$id", value: maproleId },
    ]);
    const roles = fetchRoles?.documents;
    setRolesOfUser(roles || []);
    // const mappermission = Array.from(
    //   new Set(roles?.map((r) => r?.permission_Ids).flat())
    // );
    console.log("roles =", roles);
    setDisplayPermissions(
      roles !== undefined
        ? roles.find((r) => r.$id === selectedId)?.permission_Ids
        : []
    );
    setIsLoading(false);
  };

  const addUserRole = () => {
    setUserRoles([
      ...userRoles,
      {
        id: Date.now().toString(),
        departmentId: undefined,
        customerId: undefined,
        roleIds: [""],
        status: "new",
      },
    ]);
  };

  const removeUserRole = (userRole: UserRoleData) => {
    const removeList = userRoleRemoveList;
    if (userRole.status !== "new") {
      removeList.push(userRole.id);
    }
    setUserRoleRemoveList(removeList);
    if (userRoles.length > 0) {
      const filteredUserRoles = userRoles.filter(
        (userrole) => userrole.id !== userRole.id
      );
      setUserRoles(filteredUserRoles);
    }
  };

  const addRole = (userRoleId: any) => {
    const updatedUserRolesDatas = userRoles.map((userRole) =>
      userRole.id === userRoleId
        ? {
            ...userRole,
            roleIds: [...userRole.roleIds, ""],
            status: userRole.status === "new" ? "new" : "edit",
          }
        : userRole
    );
    console.log("updatedUserRolesDatas =", updatedUserRolesDatas);
    setUserRoles(updatedUserRolesDatas);
  };

  const removeRole = (userRoleId: any, index: any) => {
    const updateUserRoleDatas = userRoles.map((userRole) =>
      userRole.id === userRoleId && userRole.roleIds.length > 0
        ? {
            ...userRole,
            roleIds: userRole.roleIds.filter((_, i) => i !== index),
            status: userRole.status === "new" ? "new" : "edit",
          }
        : userRole
    );
    setUserRoles(updateUserRoleDatas);
  };

  const handleFieldUserRoleTypeChange = (
    id: any,
    id2: any,
    field: keyof UserRoleData,
    value: any,
    index?: any
  ) => {
    if (field === "roleIds") {
      const userRoleData: UserRoleData[] = userRoles?.map((ur) => {
        if (ur.id === id) {
          if (index !== undefined) {
            const updatedroleIds = [...ur.roleIds];
            updatedroleIds[index] = value;
            return {
              ...ur,
              roleIds: updatedroleIds,
            };
          }
        }
        return ur;
      });
      setUserRoles(userRoleData);
    } else {
      setUserRoles(
        userRoles?.map((userrole) =>
          userrole.id === id
            ? {
                ...userrole,
                [field]: value,
              }
            : userrole
        )
      );
    }
  };

  const handleSearchSelectorChange = (
    newValue: any,
    fieldName: any,
    id: string,
    index?: number
  ) => {
    console.log("newValue =", newValue);
    console.log("fieldName =", fieldName);
    console.log("id =", id);
    console.log("index =", index);
    if (fieldName === "roleIds") {
      const userRoleData: UserRoleData[] = userRoles?.map((ur) => {
        if (ur.id === id) {
          if (index !== undefined) {
            const updatedroleIds = [...ur.roleIds];
            updatedroleIds[index] = newValue?.id;
            return {
              ...ur,
              roleIds: updatedroleIds,
              status: ur.status === "new" ? "new" : "edit",
            };
          }
        }
        return ur;
      });
      setUserRoles(userRoleData);
    } else {
      setUserRoles(
        userRoles?.map((userrole) =>
          userrole.id === id
            ? {
                ...userrole,
                [fieldName]: newValue?.id,
                status: userrole.status === "new" ? "new" : "edit",
              }
            : userrole
        )
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } 
    else if(name === "newPassword"){
      setNewPassword(value);
    }
    else {
      setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUndo = () => {
    setFormData(userDetail);
    initialData();
    setUserRoleRemoveList([]);
  };

  const handleDelete = async () => {
    console.log("formData =", formData);
    console.log("userRoles =", userRoles);
    const confirmApprove = await confirmDialog(
      "Delete User",
      "Do you want to delete user?", false, "danger"
    );
    if (confirmApprove) {
      let deleteUserResult, deleteUserRoleResult;
      // -- Delete Auth User --
      setIsLoading(true);
      const deleteUserIdsSubmit = {
        userIds: formData.userId
      }
      const deleteAuthUserResult = await deleteAuthUser(deleteUserIdsSubmit); //result be like: "results": [{ "userId": "userId1", "status": "success" }, { "userId": "userId2", "status": "failed", "error": "User not found" }]
      if(deleteAuthUserResult.result !== null){
        // -- Delete User Data --
        deleteUserResult = await deleteUser([formData.id]);
        if(deleteUserResult.result !== null){
          if(formData.userRoleId?.length > 0){
            // -- Delete User Role --
            deleteUserRoleResult = await deleteUserRole(formData.userRoleId);
            if(deleteUserRoleResult.result ===  null){
              console.error(`Error to delete user role of ${formData.userId} : ${deleteUserRoleResult.error}`);
            }
          }
          const confirmApprove = await confirmDialog(
            "Delete User Data Success",
            "Delete User data successfully",
            true,
          );
          if(confirmApprove){
            setIsAddOrUpdateSuccess(true);
            handleCloseForm();
          }
        }
        else{
          const confirmApprove = await confirmDialog(
            "Error to delete User data",
            `${deleteUserResult.error}`,
            true,
            "danger"
          );
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

  const handleSaveNewPassword = async () => {
    console.log("newPassword =", newPassword);
    const authData = {
      userId: formData.userId,
      newPW: newPassword,
    };
    console.log("authData =", authData);
    setIsLoading(true);
    const updateAuthUserPWResult = await updateAuthUserPW(authData);
    setIsLoading(false);
    if (updateAuthUserPWResult.result !== null) {
      const confirmApprove = await confirmDialog(
        "Update New Password Success",
        "Update New Password successfully !",
        true,
        "success"
      );
      if(confirmApprove){
        setNewPassword("");
        setIsShowNewPasswordForm(false)
      } 
    }
    else {
      const confirmApprove = await confirmDialog(
        "Error to update new password",
        `${updateAuthUserPWResult?.error}`,
        true,
        "danger"
      );
    }
  };

  const handleSave = async () => {
    console.log("formData =", formData);
    console.log("userRoles =", userRoles);
    let addNewUserRoleResult,
      deleteUserRoleResult,
      updateUserRoleResult,
      updateUserResult;
    let formDataUserRoleIds = formData.userRoleId;

    //#region -- User Role --
    //Add User role
    const newUserRole = userRoles.filter((us) => us.status === "new");
    if (newUserRole?.length > 0) {
      console.log("newUserRole =", newUserRole);
      const dataToSubmit =
        newUserRole?.map((userRole) => {
          return {
            userId: formData.userId,
            role_Ids: userRole.roleIds,
            department_Id: userRole?.departmentId,
            department_Name: departmentItemSource.find(
              (d) => d.id === userRole.departmentId
            )?.desc,
            customer_Id: userRole.customerId,
            customer_Name: customerItemSource.find(
              (c) => c.id === userRole.customerId
            )?.desc,
          };
        }) || [];
      console.log("new User role dataToSubmit =", dataToSubmit);
      setIsLoading(true);
      addNewUserRoleResult = await addNewUserRole(dataToSubmit);
      setIsLoading(false);
      if (addNewUserRoleResult.result !== null) {
        formDataUserRoleIds = formDataUserRoleIds.concat(
          addNewUserRoleResult.result
        );
        setFormData({...formData, userRoleId: formDataUserRoleIds});
        console.log("formData.userRoleId =", formDataUserRoleIds);
      }
    }

    // Update User role
    const editUserRole = userRoles.filter((us) => us.status === "edit");
    if (editUserRole?.length > 0) {
      console.log("editUserRole =", editUserRole);
      const dataToSubmit =
        editUserRole?.map((userRole) => {
          return {
            documentId: userRole.id,
            updateFields: {
              userId: formData.userId,
              role_Ids: userRole.roleIds,
              department_Id: userRole?.departmentId,
              department_Name: departmentItemSource.find(
                (d) => d.id === userRole.departmentId
              )?.desc,
              customer_Id: userRole.customerId,
              customer_Name: customerItemSource.find(
                (c) => c.id === userRole.customerId
              )?.desc,
            },
          };
        }) || [];
      console.log("edit User role dataToSubmit =", dataToSubmit);
      setIsLoading(true);
      updateUserRoleResult = await updateUserRole(dataToSubmit);
      setIsLoading(false);
    }

    // Delete User role
    if (userRoleRemoveList?.length > 0) {
      console.log("userRoleRemoveList =", userRoleRemoveList);
      setIsLoading(true);
      deleteUserRoleResult = await deleteUserRole(userRoleRemoveList);
      setIsLoading(false);
      if (deleteUserRoleResult.result !== null) {
        formDataUserRoleIds = formDataUserRoleIds.filter(
          (id) => !userRoleRemoveList?.includes(id)
        );
      }
      console.log("formaDataUserRoleIds delete =", formDataUserRoleIds);
      setFormData({...formData, userRoleId: formDataUserRoleIds});
      setUserRoleRemoveList([]);
    }

    if (
      addNewUserRoleResult?.result === null ||
      deleteUserRoleResult?.result === null ||
      updateUserRoleResult?.result === null
    ) {
      const confirmApprove = await confirmDialog(
        "Error to update UserRole data of User",
        `${addNewUserRoleResult?.error} \n` +
          `${deleteUserRoleResult?.error} \n` +
          `${updateUserRoleResult?.error} \n`,
        true,
        "danger"
      );
    }
    //#endregion -- User Role --

    //#region -- User Data --
    // Update Auth
    const authData = {
      userId: formData.userId,
      userName: formData.userName === userData.userName ? null : formData.userName,
      email: formData.email === userData.email ? null : formData.email,
    };
    console.log("authData =", authData);
    setIsLoading(true);
    const updateAuthUserResult = await updateAuthUser(authData);
    setIsLoading(false);
    // Update User data in collection
    if (updateAuthUserResult.result !== null) {
      const uniqueRoleIds = Array.from(new Set(userRoles.map((ur) => ur?.roleIds).flat()));
      const dataToSubmit = {
        documentId: formData.id,
        updateFields: {
          emplyeeName: formData.name + " " + formData.surname,
          employeeId: formData.employeeId,
          userName: formData.userName,
          email: formData.email,
          isActive: formData.isActive,
          userRole_Ids: formDataUserRoleIds,
          roleIds: uniqueRoleIds
        },
      };
      console.log("User dataToSubmit =", dataToSubmit);
      setIsLoading(true);
      updateUserResult = await updateUser(dataToSubmit);
      setIsLoading(false);
      if (updateUserResult.result !== null) {
        setUserData(formData);
        const confirmApprove = await confirmDialog(
          "Update User Data Success",
          "Update User data successfully !",
          true,
          "success"
        );
      }
    } 
    else {
      const confirmApprove = await confirmDialog(
        "Error to update User auth data in Appwrite",
        `${updateAuthUserResult?.error} \n`,
        true,
        "danger"
      );
    }

    setIsAddOrUpdateSuccess(true);
    initialData();

    //#endregion -- User Data --
  };

  const handleSubmit = async () => {
    console.log("formData =", formData);
    console.log("userRoles =", userRoles);
    console.log("password =", password);
    let newUserRoleIds = null;
    setIsLoading(true);

    // -- Create New User at Appwrite
    const registerData = {
      email: formData.email,
      name: formData.userName,
      password: password,
    };
    const registUserResult = await registerNewUserAuth(registerData);
    console.log("registUserResult =", registUserResult);
    if (registUserResult.result !== null) {
      // Add new UserRoles
      if (userRoles.length > 0) {
        const dataToSubmit =
          userRoles?.map((userRole) => {
            return {
              userId: registUserResult?.result.$id,
              role_Ids: userRole?.roleIds,
              department_Id: userRole.departmentId,
              department_Name: departmentItemSource.find(
                (d) => d.id === userRole.departmentId
              )?.desc,
              customer_Id: userRole.customerId,
              customer_Name: customerItemSource.find(
                (c) => c.id === userRole.customerId
              )?.desc,
            };
          }) || [];
        console.log("dataToSubmit =", dataToSubmit);
        newUserRoleIds = await addNewUserRole(dataToSubmit);
        if (newUserRoleIds.result !== null) {
          console.log("newUserRoleIds = ", newUserRoleIds.result);
        } else {
          const confirmApprove = await confirmDialog(
            "Error to add UserRole of User",
            `${newUserRoleIds.error}`,
            true,
            "danger"
          );
        }
      }

      // Add new User data
      const userDataToSubmit = {
        emplyeeName: formData.name + " " + formData.surname,
        employeeId: formData.employeeId,
        userName: formData.userName,
        userId: registUserResult?.result.$id,
        email: formData.email,
        userRole_Ids:
          newUserRoleIds?.result !== null ? newUserRoleIds?.result : [],
        isActive: formData.isActive,
      };
      console.log("userDataToSubmit =", userDataToSubmit);
      const addNewUserResult = await addNewUser(userDataToSubmit);
      if (addNewUserResult.result !== null) {
        const confirmApprove = await confirmDialog(
          "Add User Data Success",
          "Add New User data successfully !",
          true,
          "success"
        );
      } else {
        const confirmApprove = await confirmDialog(
          "Error to add User data",
          `${addNewUserResult.error}`,
          true,
          "danger"
        );
      }
      setIsAddOrUpdateSuccess(true);
      handleCloseForm();
    } else {
      const confirmApprove = await confirmDialog(
        "Error to create New User at Appwrite",
        `${registUserResult.error}`,
        true,
        "danger"
      );
    }
    setIsLoading(false);
  };

  function handleCloseForm() {
    closeModal(isEdit);
  }

  const handleActiveChange = (checked: boolean) => {
    setFormData((prevData: any) => ({ ...prevData, isActive: checked }));
  };

  const handleSelectRole = (selectedRoleId: string) => {
    console.log("selectedRoleId =", selectedRoleId);
    setSelectedRoleId(selectedRoleId);
    const selectedRole = rolesOfUser.find((r) => r.$id === selectedRoleId);
    setDisplayPermissions(
      rolesOfUser !== undefined ? selectedRole?.permission_Ids : []
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-10">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          width: "800px",
          backgroundColor: "#D9F0EC",
          paddingY: "5px",
          borderRadius: "8px 8px 0px 0px", // Adjust rounded corners as needed
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              width: "fit-content",
              fontSize: "1.125rem", // text-lg equivalent
              fontWeight: "bold",
              color: "#1D7A9B",
              marginTop: "0.25rem",
              marginLeft: "78px",
            }}
          >
            {formHeader}
          </Typography>
        </Box>
        <Button2
          className="bg-transparent float w-fit"
          sx={{ position: "relative", right: 0, top: 0, color: "#83A2AD" }}
          onClick={handleCloseForm}
        >
          <IoClose size={26} />
        </Button2>
      </Box>

      <div className="bg-white rounded-b-lg shadow-lg min-h-[204px] max-h-[654px] w-[800px]">
        {/* Body */}
        <div className="max-h-[534px] overflow-auto">
          <Box
            className="w-full justify-center px-6 rounded-t-lg pb-6"
            textAlign="center"
          >
            <TabContext value={tabValue}>
              <Box
                sx={{
                  borderBottom: 1,
                  width: "735px",
                  borderColor: "divider",
                  position: "fixed",
                  zIndex: 20,
                  bgcolor: "white",
                }}
              >
                <TabList onChange={handleTabChange} aria-label="areaTabs">
                  <Tab label="Information" value="1" />
                  <Tab label="Permission" value="2" />
                </TabList>
              </Box>

              {/* Information Tab */}
              <TabPanel value="1" sx={{ padding: 0, py: "0.25rem", pt: 6 }}>
                <>
                  <Box className="flex w-full space-x-5 pt-4">
                    {/* Name */}
                    <Box className="w-1/2">
                      <Textbox
                        header="Name"
                        name="name"
                        inputType="text"
                        placeHolder="Type here..."
                        value={formData?.name}
                        handleChange={handleChange}
                      />
                    </Box>

                    {/* Surname */}
                    <Box className="w-1/2">
                      <Textbox
                        header="Surname"
                        name="surname"
                        inputType="text"
                        placeHolder="Type here..."
                        value={formData?.surname}
                        handleChange={handleChange}
                      />
                    </Box>
                  </Box>

                  <Box className="flex w-full space-x-5 pt-3">
                    {/* Employee ID */}
                    <Box className="w-1/2">
                      <Textbox
                        header="Employee ID"
                        name="employeeId"
                        inputType="text"
                        placeHolder="Type here..."
                        value={formData?.employeeId}
                        handleChange={handleChange}
                      />
                    </Box>
                    {/* Email */}
                    <Box className="w-1/2">
                      <Textbox
                        header="Email"
                        name="email"
                        inputType="text"
                        placeHolder="Type here..."
                        value={formData?.email}
                        handleChange={handleChange}
                      />
                    </Box>
                  </Box>

                  <Grid2
                    size={12}
                    className="flex"
                    container
                    columnSpacing={2.5}
                    rowSpacing={1}
                    sx={{ mt: "0.75rem" }}
                  >
                    {/* UserName */}
                    <Grid2
                      size={6}
                      sx={{
                        bgcolor: "white",
                        borderRadius: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Textbox
                        header="Log In Username"
                        name="userName"
                        inputType="text"
                        placeHolder="Type here..."
                        value={formData?.userName}
                        handleChange={handleChange}
                      />
                    </Grid2>

                    {/* Password */}
                    {!isEdit && (
                      <Grid2
                        size={6}
                        sx={{
                          bgcolor: "white",
                          borderRadius: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PasswordTextbox
                          header="Password"
                          name="password"
                          placeHolder={"Type here..."}
                          value={password}
                          handleChange={handleChange}
                        />
                      </Grid2>
                    )}

                    {/* {isEdit &&<Grid2
                      size={6}
                      sx={{
                        bgcolor: "white",
                        borderRadius: "10px",
                        alignItems: "center",
                        justifyContent: "left",
                        mt: 3
                      }}
                    >
                      <Button
                        className="w-32 h-10 bg-[#1D7A9B] text-white hover:text-[#1D7A9B] hover:bg-[#Ebf4f6]"
                      >
                        Change Password
                      </Button>
                      </Grid2>} */}

                    <Grid2
                      size={6}
                      sx={{
                        display: "flex",
                        bgcolor: "white",
                        borderRadius: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Typography
                          textAlign="left"
                          sx={{
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                            color: "#2C5079",
                            fontWeight: "700",
                          }}
                        >
                          Status
                        </Typography>
                        <Box className="flex">
                          <Switch
                            name="status"
                            checked={formData?.isActive}
                            onCheckedChange={handleActiveChange}
                          />
                          <Typography
                            textAlign="left"
                            sx={{
                              fontSize: "14px",
                              paddingBottom: "0.25rem",
                              color: "#2C5079",
                              fontWeight: "700",
                              paddingLeft: "0.5rem",
                              paddingTop: "0.5rem",
                            }}
                          >
                            {formData?.isActive === true
                              ? "Active"
                              : "Inactive"}
                          </Typography>
                        </Box>
                      </div>
                      {isEdit && (
                        <div className="mt-5">
                          <Button
                            className="w-32 h-10 bg-[#1D7A9B] text-white hover:text-[#1D7A9B] hover:bg-[#Ebf4f6]"
                            onClick={() => setIsShowNewPasswordForm(true)}
                          >
                            Change Password
                          </Button>
                        </div>
                      )}
                    </Grid2>
                  </Grid2>

                  {/* Roles */}
                  <Box
                    sx={{
                      borderLeft: "6px solid #4C9BF5",
                      marginY: 2,
                      borderBottom: "1px solid #C7D4d7",
                    }}
                  >
                    <Typography
                      textAlign="left"
                      sx={{
                        fontSize: "14px",
                        paddingBottom: "0.25rem",
                        color: "#2C5079",
                        fontWeight: "700",
                        paddingY: "0.25rem",
                        paddingX: "0.5rem",
                      }}
                    >
                      Roles
                    </Typography>
                  </Box>

                  {userRoles?.map((userRole, index) => (
                    <div className="mb-2 flex" key={`userRole` + index}>
                      <Box
                        className="space-y-3"
                        key={index}
                        sx={{
                          bgcolor: "#EBF4F6",
                          width: "100%",
                          p: 2,
                          borderRadius: "10px 0px 0px 10px",
                          justifyItems: "left",
                        }}
                      >
                        <Grid2
                          size={12}
                          className="flex"
                          container
                          spacing={1.5}
                        >
                          <Grid2
                            size={6}
                            sx={{
                              bgcolor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* <LabelSelector3
                              selectorLabel={"Department"}
                              itemSource={departmentItemSource}
                              selectedVal={userRole.departmentId}
                              field={"departmentId"}
                              id={userRole.id}
                              handleSelectedVal={handleFieldUserRoleTypeChange}
                            /> */}
                            <SearchSelector
                              itemSource={departmentItemSource}
                              handleChange={(newVal: any, name: any) =>
                                handleSearchSelectorChange(
                                  newVal,
                                  name,
                                  userRole.id
                                )
                              }
                              selectedVal={userRole.departmentId}
                              name={"departmentId"}
                              inlineLabel="Department"
                              textColor="black"
                            />
                          </Grid2>
                          <Grid2
                            size={6}
                            sx={{
                              bgcolor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* <LabelSelector3
                              selectorLabel={"Customer"}
                              itemSource={customerItemSource}
                              selectedVal={userRole.customerId}
                              field={"customerId"}
                              id={userRole.id}
                              handleSelectedVal={handleFieldUserRoleTypeChange}
                            /> */}
                            <SearchSelector
                              itemSource={customerItemSource}
                              handleChange={(newVal: any, name: any) =>
                                handleSearchSelectorChange(
                                  newVal,
                                  name,
                                  userRole.id
                                )
                              }
                              selectedVal={userRole.customerId}
                              name={"customerId"}
                              inlineLabel="Customer"
                              textColor="black"
                            />
                          </Grid2>
                        </Grid2>
                        <div className="w-full">
                          <Grid2
                            size={12}
                            className="flex"
                            container
                            spacing={1.5}
                          >
                            {userRole.roleIds?.map((roleId, index) => (
                              <Grid2
                                key={`roleId` + index}
                                size={6}
                                sx={{
                                  bgcolor: "white",
                                  borderRadius: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Grid2
                                  size={1}
                                  sx={{
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                ></Grid2>
                                {/* <LabelSelector3
                                  selectorLabel={"Role"}
                                  itemSource={allRoles}
                                  selectedVal={roleId}
                                  field={"roleIds"}
                                  id={userRole.id}
                                  index={index}
                                  handleSelectedVal={
                                    handleFieldUserRoleTypeChange
                                  }
                                /> */}
                                <SearchSelector
                                  itemSource={allRoles}
                                  handleChange={(newVal: any, name: any) =>
                                    handleSearchSelectorChange(
                                      newVal,
                                      name,
                                      userRole.id,
                                      index
                                    )
                                  }
                                  selectedVal={roleId}
                                  name={"roleIds"}
                                  inlineLabel="Role"
                                  textColor="black"
                                />
                                <Button
                                  onClick={() => removeRole(userRole.id, index)}
                                  className="w-fit bg-[white] rounded-lg text-[#F66262] hover:bg-[#F66262] hover:text-[white] px-1"
                                >
                                  <Minus size="24" />
                                </Button>
                              </Grid2>
                            ))}
                          </Grid2>
                        </div>
                        <Button
                          onClick={() => addRole(userRole.id)}
                          className="w-fit bg-[#4C9BF5] hover:bg-[#2C5079] px-2"
                        >
                          <Add size="24" />
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          onClick={() => removeUserRole(userRole)}
                          className="bg-[#F66262] rounded-r-lg rounded-l-none h-full px-2"
                        >
                          <Trash color="white" />
                        </Button>
                      </Box>
                    </div>
                  ))}

                  <Box className="justify-start flex w-full">
                    <AddButton onAddBtnClick={addUserRole} />
                  </Box>
                </>
              </TabPanel>
              {/* Permission View Tab */}
              <TabPanel value="2" sx={{ padding: 0, pt: 6 }}>
                <Box className="flex w-full space-x-2 pt-4">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      paddingBottom: "0.25rem",
                      color: "#2C5079",
                      fontWeight: "700",
                      paddingY: "0.25rem",
                      paddingX: "0.5rem",
                    }}
                  >
                    Roles :
                  </Typography>
                  {displayRoles?.map(
                    (role, index) =>
                      role !== "" && (
                        <Box
                          onClick={() => handleSelectRole(role)}
                          key={index}
                          className="flex w-fit"
                          sx={{
                            bgcolor: `${
                              selectedRoleId === role ? "#EBF4F6" : "white"
                            }`,
                            borderRadius: "9999px",
                            border: "1px solid #1D7A9B",
                            cursor: "pointer",
                            ":hover": { bgcolor: "#EBF4F6" },
                          }}
                        >
                          <Typography
                            textAlign="center"
                            sx={{
                              fontSize: "14px",
                              paddingBottom: "0.25rem",
                              color: `${
                                selectedRoleId === role ? "#2C5079" : "#1D7A9B"
                              }`,
                              paddingY: "0.25rem",
                              paddingX: "0.75rem",
                            }}
                          >
                            {allRoles.find((ar) => ar.id === role)?.desc}
                          </Typography>
                        </Box>
                      )
                  )}
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#4C9BF5",
                      textDecorationLine: "underline",
                    }}
                  >
                    Total: {displayPermissions?.length || 0} permission
                    {displayPermissions?.length !== undefined &&
                    displayPermissions?.length > 1
                      ? "s"
                      : ""}
                  </Typography>
                  {displayPermissions?.map((id, index) => (
                    <Box key={index} display={"flex"}>
                      <CheckCircle />
                      <Typography
                        textAlign="left"
                        sx={{
                          fontSize: "14px",
                          paddingBottom: "0.25rem",
                          color: "#2C5079",
                          mt: "1rem",
                          paddingLeft: "0.25rem",
                        }}
                      >
                        {permissionItemSource?.find((d) => d.id === id)?.desc}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </div>

        {/* Footer */}
        {!isEdit && (
          <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
            <Button
              className="w-28 h-11 bg-white text-[#83A2AD] border-[1px] border-[#83A2AD] hover:text-white hover:bg-[#83A2AD]"
              onClick={handleCloseForm}
            >
              Cancel
            </Button>
            <Button
              className="w-28 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                        disabled:bg-[#83A2AD]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        )}

        {isEdit && (
          <Box className="flex w-full justify-between px-6 border-t-2 pt-4 pb-4">
            {tabValue === "1" && (
              <Button
                className="flex text-[#2C5079] pt-2 bg-transparent hover:bg-transparent underline"
                onClick={handleUndo}
              >
                <VscRefresh
                  style={{ transform: "rotate(-60deg) scaleX(-1)" }}
                  size={24}
                />
                Undo all changes
              </Button>
            )}
            {tabValue === "1" && (
              <Box className="space-x-4">
                <DeleteBtnFooter
                  onDeleteBtnFooterClick={handleDelete}
                  disable={false}
                />
                <SaveBtnFooter onSaveBtnFooterClick={handleSave} />
              </Box>
            )}
          </Box>
        )}

        {/* Confirm dialog */}
        {ConfirmAlertDialog}

        {isLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-50">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        )}

        {isShowNewPasswordForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-30">
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                width: "400px",
                backgroundColor: "#D9F0EC",
                paddingY: "3px",
                borderRadius: "8px 8px 0px 0px", // Adjust rounded corners as needed
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    width: "fit-content",
                    fontSize: "1.125rem", // text-lg equivalent
                    fontWeight: "bold",
                    color: "#1D7A9B",
                    marginTop: "0.25rem",
                    marginLeft: "78px",
                  }}
                >
                  New Password
                </Typography>
              </Box>
              <Button2
                className="bg-transparent float w-fit"
                sx={{
                  position: "relative",
                  right: 0,
                  top: 0,
                  color: "#83A2AD",
                }}
                onClick={() => {setIsShowNewPasswordForm(false); setNewPassword("");}}
              >
                <IoClose size={26} />
              </Button2>
            </Box>
            <div className="bg-white rounded-b-lg shadow-lg min-h-[154px] max-h-[654px] w-[400px]">
              {/* Body */}
              <div className="max-h-[534px] overflow-auto">
                <Box
                  className="w-full justify-center px-6 rounded-t-lg py-6 space-y-5"
                  textAlign="center"
                >
                  <Grid2
                    size={6}
                    sx={{
                      bgcolor: "white",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PasswordTextbox
                      name="newPassword"
                      placeHolder={"Enter new password"}
                      value={newPassword}
                      handleChange={handleChange}
                    />
                  </Grid2>
                  <SaveBtnFooter onSaveBtnFooterClick={handleSaveNewPassword} />
                </Box>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersForm;
