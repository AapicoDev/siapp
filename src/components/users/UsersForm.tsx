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
  employeeId: string;
  name: string;
  surname: string;
  userRoleId: any[];
  roles: RoleType[];
  userName: any;
  email: any;
  isActive: any;
};

type UserRoleData = {
  id: string;
  departmentId: any;
  customerId: any;
  roleIds: any[];
};

interface UsersFormProps {
  userDetail: FormDataType;
  closeModal: any;
  allRoles: RoleType[];
  isEdit: boolean;
}

const UsersForm = ({
  userDetail,
  closeModal,
  allRoles,
  isEdit,
}: UsersFormProps) => {
  const [tabValue, setTabValue] = useState("1");
  const [customerItemSource, setCustomerItemSource] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<UserRoleData[]>([]);
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

  useEffect(() => {
    itemSource();
    initialData();
  }, []);

  useEffect(() => {
    mapAllRolesAndPermissions();
  }, [userRoles]);

  const itemSource = () => {
    const mapCust = data.customers?.map((cust) => {
      return {
        id: cust.id,
        desc: cust.customerName,
      };
    });
    setCustomerItemSource(mapCust);
  };

  const initialData = () => {
    const mappedUserRole: UserRoleData[] = formData.userRoleId?.map((ur) => {
      const userRole = data.userRoles.find((u) => u.id === ur);
      return {
        id: ur,
        departmentId: userRole?.departmentId,
        customerId: userRole?.customerId,
        roleIds: userRole?.roleIds || [""],
      };
    });
    console.log("mappedUserRole =", mappedUserRole);
    setUserRoles(mappedUserRole);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const mapAllRolesAndPermissions = () => {
    const maproleId = Array.from(
      new Set(userRoles.map((ur) => ur?.roleIds).flat())
    );
    setDisplayRoles(maproleId);
    //const roles = data.roles.filter(d=>d.id.includes(maproleId))
    //console.log("roles =", roles);
  };

  const addUserRole = () => {
    setUserRoles([
      ...userRoles,
      {
        id: "new" + userRoles.length,
        departmentId: undefined,
        customerId: undefined,
        roleIds: [""],
      },
    ]);
  };

  const removeUserRole = (id: any) => {
    if (userRoles.length > 1) {
      const filteredUserRoles = userRoles.filter(
        (userrole) => userrole.id !== id
      );
      setUserRoles(filteredUserRoles);
    }
  };

  const addRole = (userRoleId: any) => {
    const updatedUserRolesDatas = userRoles.map((userRole) =>
      userRole.id === userRoleId
        ? { ...userRole, roleIds: [...userRole.roleIds, ""] }
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
            //status: "edit",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleUndo = () => {
    setFormData(userDetail);
    initialData();
  };

  const handleDelete = () => {};

  const handleSave = () => {};

  function handleCloseCustomerForm() {
    closeModal(isEdit);
  }

  const handleActiveChange = (checked: boolean) => {
    setFormData((prevData: any) => ({ ...prevData, isActive: checked }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop">
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
          onClick={handleCloseCustomerForm}
        >
          <IoClose size={26} />
        </Button2>
      </Box>

      <div className="bg-white rounded-b-lg shadow-lg min-h-[504px] max-h-[654px] w-[800px]">
        {/* Body */}
        <div className="max-h-[534px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange} aria-label="areaTabs">
                  <Tab label="Information" value="1" />
                  <Tab label="Permission" value="2" disabled={true}/>
                </TabList>
              </Box>
              {/* Information Tab */}
              <TabPanel value="1" sx={{ padding: 0, py: "0.25rem" }}>
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

                  <Box className="flex w-full space-x-5 pt-3">
                    <Box className="w-1/2">
                      <Textbox
                        header="Log In Username"
                        name="userName"
                        inputType="text"
                        placeHolder="Type here..."
                        value={formData?.userName}
                        handleChange={handleChange}
                      />
                    </Box>
                    <Box className="w-1/2">
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
                          {formData?.isActive === true ? "Active" : "Inactive"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

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
                            <LabelSelector3
                              selectorLabel={"Department"}
                              itemSource={data.departments}
                              selectedVal={userRole.departmentId}
                              field={"departmentId"}
                              id={userRole.id}
                              handleSelectedVal={handleFieldUserRoleTypeChange}
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
                            <LabelSelector3
                              selectorLabel={"Customer"}
                              itemSource={customerItemSource}
                              selectedVal={userRole.customerId}
                              field={"customerId"}
                              id={userRole.id}
                              handleSelectedVal={handleFieldUserRoleTypeChange}
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
                                <LabelSelector3
                                  selectorLabel={"Role"}
                                  itemSource={allRoles}
                                  selectedVal={roleId}
                                  field={"roleIds"}
                                  id={userRole.id}
                                  index={index}
                                  handleSelectedVal={
                                    handleFieldUserRoleTypeChange
                                  }
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
                          onClick={() => removeUserRole(userRole.id)}
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
              <TabPanel value="2" sx={{ padding: 0 }}>
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
                    {displayRoles?.map((role, index) => (
                      <Box
                      key={index}
                        className="flex w-fit"
                        sx={{
                          bgcolor: "#EBF4F6",
                          borderRadius: "9999px",
                          border: "1px solid #1D7A9B",
                        }}
                      >
                        <Typography
                          textAlign="center"
                          sx={{
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                            color: "#1D7A9B",
                            paddingY: "0.25rem",
                            paddingX: "0.75rem",
                          }}
                        >
                          {allRoles.find((ar) => ar.id === role)?.desc}
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
              onClick={handleCloseCustomerForm}
            >
              Cancel
            </Button>
            <Button
              className="w-28 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                               disabled:bg-[#83A2AD]"
            >
              Submit
            </Button>
          </Box>
        )}

        {isEdit && (
          <Box className="flex w-full justify-between px-6 border-t-2 pt-4 pb-4">
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
            <Box className="space-x-4">
              <DeleteBtnFooter
                onDeleteBtnFooterClick={handleDelete}
                disable={false}
              />
              <SaveBtnFooter onSaveBtnFooterClick={handleSave} />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default UsersForm;
