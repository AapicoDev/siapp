"use client";

import { Box, Typography, Button as Button2 } from "@mui/material";
import { Button } from "@/components/ui/buttons/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Textbox } from "../ui/textboxs/textbox";
import { IoClose } from "react-icons/io5";
import data from "@/app/mockData.json";
import { Checkbox } from "../ui/checkbox3";

type AreaData = {
  id: number;
  name: string;
};

type RoleType = {
  id: any;
  desc: string;
};

type PermissionType = {
  id: any;
  desc: string;
};

type SelectedData = {
    isSelected: boolean;
    id: any;
};

type FormDataType = {
  roleName: string;
};

type UserRoleData = {
  id: string;
  departmentId: any;
  customerId: any;
  roleIds: any[];
};

interface RoleFormProps {
  closeModal: any;
}

const RoleForm = ({closeModal }: RoleFormProps) => {
  const [userRoles, setUserRoles] = useState<UserRoleData[]>([]);
  const [formData, setFormData] = useState<FormDataType>({ roleName: ""});
  const [displayRoles, setDisplayRoles] = useState<any[]>([]);
  const [displayPermissions, setDisplayPermissions] = useState<any[]>([]);
  const [allPermissions, setAllPermissions] = useState<PermissionType[]>([]);
  const [selected, setSelected] = useState<SelectedData[]>([])
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const formHeader = "+ New Role";

  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    mapAllRolesAndPermissions();
  }, [userRoles]);

  const initialData = () => {
    const permissions: PermissionType[] = data.permissions.map(p => {
        return {
            id: p.id,
            desc: p.desc
        };
    })
    setAllPermissions(permissions);
    const selected: SelectedData[] = permissions?.map((permission) => ({
        isSelected: false,
        id: permission.id,
    }))
    setSelected(selected);
  };

  const mapAllRolesAndPermissions = () => {
    const maproleId = Array.from(
      new Set(userRoles.map((ur) => ur?.roleIds).flat())
    );
    setDisplayRoles(maproleId);
    const roles = data.roles.filter((d) => maproleId.includes(d.id));
    const mappermission = Array.from(
      new Set(roles.map((r) => r?.permissions).flat())
    );
    console.log("roles =", roles);
    console.log("mappermission =", mappermission);
    setDisplayPermissions(["pm001"]);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  function handleCloseCustomerForm() {
    closeModal();
  }

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

      <div className="bg-white rounded-b-lg shadow-lg min-h-[204px] max-h-[654px] w-[800px]">
        {/* Body */}
        <div className="max-h-[534px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <Box className="flex w-full space-x-5 pt-4">
              {/* Role Name */}
              <Box className="w-full">
                <Textbox
                  header="Role"
                  name="roleName"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.roleName}
                  handleChange={handleChange}
                />
              </Box>
            </Box>
            <Box
              className="justify-between"
              sx={{
                borderBottom: "1px solid #C7D4d7",
                display: "flex",
                paddingY: 1,
              }}
            >
              <Typography
                textAlign="left"
                sx={{
                  borderLeft: "6px solid #4C9BF5",
                  fontSize: "14px",
                  color: "#2C5079",
                  fontWeight: "700",
                  paddingX: "0.5rem",
                  verticalAlign: "center",
                  pt: 1
                }}
              >
                Permissions
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Checkbox className="mt-1"
                  checked={isSelectedAll}
                  onCheckedChange={handleSelectAll}/>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    paddingBottom: "0.25rem",
                    color: "#2C5079",
                    mt: "0.5rem",
                    ml: "0.5rem",
                    paddingLeft: "0.25rem",
                  }}
                >
                  Select all permissions ({allPermissions?.length})
                </Typography>
              </Box>
            </Box>
            <Box sx={{ p: 1 }} className="space-y-2">
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4C9BF5",
                  textDecorationLine: "underline",
                }}
              >
                Selected: {selected?.filter(s => s.isSelected === true)?.length} permission
                {selected?.filter(s => s.isSelected === true)?.length !== undefined &&
                selected?.filter(s => s.isSelected === true)?.length > 1
                  ? "s"
                  : ""}
              </Typography>
              {allPermissions.map((permission, index) => (
                <Box key={index} display={"flex"}>
                  <Checkbox className="mt-1 mb-2"
                    checked={selected[index]?.isSelected}
                    onCheckedChange={(event) => {
                      handleSelected(index);
                    }}/>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      paddingBottom: "0.25rem",
                      color: "#2C5079",
                      mt: "0.5rem",
                      ml: "0.5rem",
                      paddingLeft: "0.25rem",
                    }}
                  >
                    {permission.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </div>

        {/* Footer */}
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
      </div>
    </div>
  );
};

export default RoleForm;
