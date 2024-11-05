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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@/components/ui/textboxs/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/buttons/button";
import { Trash } from "iconsax-react";
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

type RowData = {
  hrCode: string;
  customerId: any;
  departmentId: any;
  segmentId: any;
  groupId: any;
  zoneId: any;
  qrCode: any;
  contractId: any;
  code: string;
  isActive: boolean;
  customerName: string;
};

type AreaData = {
  id: number;
  name: string;
};

const segments = [
  {
    id: 1,
    desc: "Building",
  },
  {
    id: 2,
    desc: "Education",
  },
  {
    id: 3,
    desc: "Industrial",
  },
  {
    id: 4,
    desc: "Resident",
  },
];

const groups = [
  {
    id: 1,
    desc: "General Guard",
  },
  {
    id: 2,
    desc: "Cargo",
  },
  {
    id: 3,
    desc: "Cleaning",
  },
];

const zones = [
  {
    id: 1,
    desc: "BMR",
  },
  {
    id: 2,
    desc: "RO1",
  },
  {
    id: 3,
    desc: "SVN",
  },
  {
    id: 4,
    desc: "RO2",
  },
];

const UsersForm = ({ editCustomer, closeModal, customeraAeas }: any) => {
  const [tabValue, setTabValue] = useState("1");
  const [isEdit, setIsEdit] = useState(false);
  const [areas, setAreas] = useState<AreaData[]>(customeraAeas);
  const [formHeader, setFormHeader] = useState("");
  const [formData, setFormData] = useState(
    editCustomer || {
      hrCode: "",
      customerId: null,
      departmentId: "",
      segmentId: "",
      groupId: "",
      zoneId: "",
      qrCode: "",
      contractId: "",
      code: "",
      isActive: true,
      customerName: "",
    }
  );

  useEffect(() => {
    if (editCustomer === undefined) {
      setFormHeader("+ New User");
      setIsEdit(false);
    } else {
      setFormHeader("View / Edit User");
      setIsEdit(true);
    }
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    console.log("formData", formData);
  };

  const addArea = () => {
    const latestId = areas.reduce(
      (max, area) => (area.id > max ? area.id : max),
      0
    );
    setAreas([...areas, { id: latestId + 1, name: "" }]);
  };

  const removeArea = (id: number) => {
    if (areas.length > 1) {
      const filteredAreas = areas.filter((area) => area.id !== id);
      const reorderedAreas = filteredAreas.map((area, index) => ({
        ...area,
        id: index + 1, // use index of array + 1 to set new id.
      }));
      setAreas(reorderedAreas);
    }
  };

  const handleAreaChange = (id: number, value: string) => {
    setAreas(
      areas.map((area) => (area.id === id ? { ...area, name: value } : area))
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleUndo = () => {
    setFormData(editCustomer);
    setAreas(customeraAeas);
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

      <div className="bg-white rounded-b-lg shadow-lg min-h-[544px] max-h-[654px] w-[800px]">
        {/* Body */}
        <div className="max-h-[578px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange} aria-label="areaTabs">
                  <Tab label="Information" value="1" />
                  <Tab label="Permission" value="2" />
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
                        value={formData?.code}
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
                        value={formData?.code}
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
                        value={formData?.code}
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
                        value={formData?.code}
                        handleChange={handleChange}
                      />
                    </Box>
                  </Box>

                  <Box className="flex w-full space-x-5 pt-3">
                    <Box className="w-1/2">
                      <Textbox
                        header="Log In Username"
                        name="logInUsername"
                        inputType="text"
                        placeHolder="Type here..."
                        value={formData?.code}
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
                          name="isActive"
                          checked={formData.isActive}
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
                          {formData.isActive === true ? "Active" : "Inactive"}
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

                  {areas.map((area, index) => (
                    <div className="mb-2 flex" key={index}>
                      <Box
                        className=" w-full space-y-3"
                        key={index}
                        sx={{
                          bgcolor: "#EBF4F6",
                          width: "100%",
                          p: 2,
                          borderRadius: "10px 0px 0px 10px",
                        }}
                      >
                        <div className="flex w-full space-x-3">
                          <Box
                            sx={{
                              maxWidth: "50%",
                              width: "50%",
                              bgcolor: "white",
                              borderRadius: "10px",
                            }}
                          >
                            <LabelSelector3
                              selectorLabel={"Department"}
                              itemSource={data.departments}
                              selectedVal={undefined}
                              field={"department"}
                              id={undefined}
                              handleSelectedVal={function (
                                id: any,
                                id2: any,
                                field: any,
                                value: any
                              ): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                            </Box>

                            <Box
                            sx={{
                              maxWidth: "50%",
                              width: "50%",
                              bgcolor: "white",
                              borderRadius: "10px",
                            }}
                          >
                            <LabelSelector3
                              selectorLabel={"Customer"}
                              itemSource={data.departments}
                              selectedVal={undefined}
                              field={"customer"}
                              id={undefined}
                              handleSelectedVal={function (
                                id: any,
                                id2: any,
                                field: any,
                                value: any
                              ): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                          </Box>
                        </div>

                        <div className="w-full flex space-x-3">
                          <Box
                            sx={{
                              maxWidth: "50%",
                              width: "50%",
                              bgcolor: "white",
                              borderRadius: "10px",
                            }}
                          >
                            <LabelSelector3
                              selectorLabel={"Role"}
                              itemSource={data.departments}
                              selectedVal={undefined}
                              field={"role"}
                              id={undefined}
                              handleSelectedVal={function (
                                id: any,
                                id2: any,
                                field: any,
                                value: any
                              ): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              maxWidth: "50%",
                              width: "50%",
                              borderRadius: "10px",
                            }}
                          ></Box>
                        </div>
                      </Box>
                      <Box>
                        <Button
                          onClick={() => removeArea(area.id)}
                          className="bg-[#F66262] rounded-r-lg rounded-l-none h-full px-2"
                        >
                          <Trash color="white" />
                        </Button>
                      </Box>
                    </div>
                  ))}

                  <Box className="justify-start flex w-full">
                    <AddButton onAddBtnClick={addArea} />
                  </Box>

                  <Box className="w-full justify-between items-center pt-5">
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#4C9BF5",
                        textDecorationLine: "underline",
                      }}
                    >
                      Total: {areas.length} area{areas.length > 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </>
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
