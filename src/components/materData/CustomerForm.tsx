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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { VscRefresh } from "react-icons/vsc";
import { Selector } from "../ui/selector";

type RowData = {
  hrCode: string;
  customerId: any;
  departmentId: any;
  segmentId: any;
  groupId: any;
  zoneId: any;
  qrCode: any;
  contractId: any;
  code: string,
  isActive: boolean
  customerName: string
};

type AreaData = {
  id: number,
  name: string,
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

const CustomerForm = ({ editCustomer, closeModal, customeraAeas }: any) => {
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
      setFormHeader("+ New Customer");
      setIsEdit(false)
    } else {
      setFormHeader("View / Edit Customer");
      setIsEdit(true)
    }
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    console.log("formData", formData)
  };

  function fncHandleSelectChange(e: SelectChangeEvent){
    handleSelectChange(e);
  }

  const addArea = () => {
    setAreas([...areas, { id: areas.length + 1, name: '', }]);
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
    setFormData(editCustomer)
    setAreas(customeraAeas)
  };

  function handleCloseCustomerForm() {
    closeModal(isEdit);
  };

  const handleActiveChange = (checked: boolean) => {
    setFormData((prevData: any) => ({ ...prevData, isActive: checked }));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop">
      {/* Header */}
      <Box className="flex w-[800px] bg-[#D9F0EC] py-1 rounded-t-lg justify-center">
          <Box className="w-[100%] justify-center flex">
            <Typography className="w-fit text-lg font-semibold text-[#1D7A9B] h-fit mt-1 ml-[78px]">
              {formHeader}
            </Typography>
          </Box>
          <Button2
            className="bg-transparent text-[#83A2AD] float"
            sx={{ position: "relative", right: 0 }}
            onClick={handleCloseCustomerForm}
          >
            <CloseIcon className="w-[26px] h-[26px]" />
          </Button2>
        </Box>
      <div className="bg-white rounded-b-lg shadow-lg min-h-[544px] max-h-[654px] w-[800px]">

        {/* Body */}
        <div className="max-h-[578px] overflow-auto">
        <Box
          className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
          textAlign="center"
        >
          <Box className="flex w-full space-x-5 pt-4">
            {/* Segment */}
            <Box className="w-1/2">
              <FormControl focused className="w-full">
                <Typography
                  textAlign="left"
                  className="text-[14px] pb-1 text-[#2C5079] font-bold"
                >
                  Segment
                </Typography>
                <InputLabel className="font-bold text-[#2C5079] w-full"></InputLabel>
                <Select
                  name="segmentId"
                  size="small"
                  displayEmpty
                  value={formData?.segmentId || ""}
                  onChange={handleSelectChange}
                  renderValue={(value) =>
                    value === ""
                      ? "Select"
                      : segments.find(
                          (segment) => segment.id === formData?.segmentId
                        )?.desc
                  }
                  className={`${
                    formData?.segmentId === undefined
                      ? `text-[#83A2AD]`
                      : "text-[#2C5079]"
                  }`}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    height: "40px",
                    width: "100%",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Customize border color
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Customize border color on focus
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Hover border color
                    },
                    "& .MuiSelect-icon": {
                      color: "#83A2AD", // Customize arrow icon color
                    },
                  }}
                >
                  {segments.map((segment) => (
                    <MenuItem
                      key={segment.id}
                      value={segment.id}
                      className="text-sm text-[#2C5079]"
                    >
                      {segment.desc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <Selector selectorLabel={"Segment"} itemSource={segments} handleChange={fncHandleSelectChange} selected={formData.segmentId} selectorTargetName={"segmentId"}/> */}
            </Box>

            {/* Group */}
            <Box className="w-1/2">
              <FormControl focused className="w-full">
              <Typography
                textAlign="left"
                className="text-[14px] pb-1 text-[#2C5079] font-bold"
              >
                Group
              </Typography>
                <InputLabel className="font-bold text-[#2C5079] w-full"></InputLabel>
                <Select
                  name="groupId"
                  size="small"
                  displayEmpty
                  value={formData?.groupId || ""}
                  onChange={handleSelectChange}
                  renderValue={(value) =>
                    value === ""
                      ? "Select"
                      : groups.find(
                          (group) => group.id === formData?.groupId
                        )?.desc
                  }
                  className={`${
                    formData?.groupId === undefined
                      ? `text-[#83A2AD]`
                      : "text-[#2C5079]"
                  }`}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    height: "40px",
                    width: "100%",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Customize border color
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Customize border color on focus
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Hover border color
                    },
                    "& .MuiSelect-icon": {
                      color: "#83A2AD", // Customize arrow icon color
                    },
                  }}
                >
                  {groups.map((group) => (
                    <MenuItem
                      key={group.id}
                      value={group.id}
                      className="text-sm text-[#2C5079]"
                    >
                      {group.desc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <Selector selectorLabel={"Group"} itemSource={groups} handleChange={fncHandleSelectChange} selected={formData.groupId} selectorTargetName={"groupId"}/> */}
            </Box>
          </Box>

          <Box className="flex w-full space-x-5 pt-3">
            {/* Zone */}
            <Box className="w-1/2">
              <FormControl focused className="w-full">
              <Typography
                textAlign="left"
                className="text-[14px] pb-1 text-[#2C5079] font-bold"
              >
                Zone
              </Typography>
                <InputLabel className="font-bold text-[#2C5079] w-full"></InputLabel>
                <Select
                  name="zoneId"
                  size="small"
                  displayEmpty
                  value={formData?.zoneId || ""}
                  onChange={handleSelectChange}
                  renderValue={(value) =>
                    value === ""
                      ? "Select"
                      : zones.find((zone) => zone.id === formData?.zoneId)
                          ?.desc
                  }
                  className={`${
                    formData?.zoneId === undefined
                      ? `text-[#83A2AD]`
                      : "text-[#2C5079]"
                  }`}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    height: "40px",
                    width: "100%",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Customize border color
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Customize border color on focus
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1D7A9B", // Hover border color
                    },
                    "& .MuiSelect-icon": {
                      color: "#83A2AD", // Customize arrow icon color
                    },
                  }}
                >
                  {zones.map((zone) => (
                    <MenuItem
                      key={zone.id}
                      value={zone.id}
                      className="text-sm text-[#2C5079]"
                    >
                      {zone.desc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <Selector selectorLabel={"Zone"} itemSource={zones} handleChange={fncHandleSelectChange} selected={formData.zoneId} selectorTargetName={"zoneId"}/> */}
            </Box>

            <Box className="w-1/2">
              <Typography
                textAlign="left"
                className="text-[14px] pb-1 text-[#2C5079] font-bold"
              >
                Customer
              </Typography>
              <Input
                type="text"
                placeholder="Type here..."
                className="border-solid border-[#1D7A9B] rounded-[10px] bg-white p-4 mr-2 placeholder:text-[#83A2AD] text-[#2C5079]"
                value={formData?.customerName}
                onChange={handleChange}
                name="customerName"
              />
            </Box>
          </Box>

          <Box className="flex w-full space-x-5 pt-3">
            <Box className="w-[40%]">
              <Typography
                textAlign="left"
                className="text-[14px] pb-1 text-[#2C5079] font-bold"
              >
                HR Code
              </Typography>
              <Input
                type="text"
                placeholder="Type here..."
                className="border-solid border-[#1D7A9B] rounded-[10px] bg-white p-4 mr-2 placeholder:text-[#83A2AD] text-[#2C5079]"
                value={formData?.hrCode}
                onChange={handleChange}
                name="hrCode"
              />
            </Box>
            <Box className="w-[40%]">
              <Typography
                textAlign="left"
                className="text-[14px] pb-1 text-[#2C5079] font-bold"
              >
                Code
              </Typography>
              <Input
                type="text"
                placeholder="Type here..."
                className="border-solid border-[#1D7A9B] rounded-[10px] bg-white p-4 mr-2 placeholder:text-[#83A2AD] text-[#2C5079]"
                value={formData?.code}
                onChange={handleChange}
                name="code"
              />
            </Box>
            <Box className="w-[20%]">
              <Typography
                textAlign="left"
                className="text-[14px] pb-1 text-[#2C5079] font-bold"
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
                  className="text-[14px] pb-1 text-[#2C5079] font-bold pl-2 pt-2"
                >
                  {formData.isActive === true ? "Active" : "Inactive"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            textAlign="left"
            className="text-[14px] pb-1 text-[#2C5079] font-bold pt-3"
          >
            Area
          </Typography>
          {areas.map((area, index) => (
            <Box
              key={area.id}
              className="flex w-full bg-[#EBF4F6] rounded-lg justify-items-center align-middle justify-between mb-3"
            >
              <Box className="w-11 h-10 bg-[#37B7C3] rounded-lg justify-center text-white p-2 m-3">
                {area.id}
              </Box>
              <Box className="flex w-full justify-center">
                <Typography
                  textAlign="left"
                  className="text-[14px] text-[#2C5079] pt-5"
                >
                  Area's Name :
                </Typography>
                <Input
                  value={area.name}
                  onChange={(e) => handleAreaChange(area.id, e.target.value)}
                  type="text"
                  placeholder="Type here..."
                  className="max-w-80 border-solid border-[#1D7A9B] rounded-[10px] bg-white p-4 m-3 placeholder:text-[#83A2AD]"
                />
              </Box>
              <Box className="flex align-middle ml-2 justify-around">
                <Button
                  onClick={() => removeArea(area.id)}
                  className="bg-[#F66262] rounded-r-lg rounded-l-none w-14 h-full"
                >
                  <Trash color="white" />
                </Button>
              </Box>
            </Box>
          ))}

          <Box className="justify-start flex w-full">
            <Button
              onClick={addArea}
              className="w-[84px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] pr-2"
            >
              + Add
            </Button>
          </Box>

          <Box className="w-full justify-between items-center pt-5">
            <Typography className="text-[16px] text-[#4C9BF5] underline">
              Total: {areas.length} area{areas.length > 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>
        </div>

        {/* Footer */}
        {!isEdit && (
          <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
            <Button className="w-28 h-11 bg-white text-[#83A2AD] border-[1px] border-[#83A2AD] hover:text-white hover:bg-[#83A2AD]"
                    onClick={handleCloseCustomerForm}>
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
              <Button className="w-32 h-11 bg-white text-[#F66262] border-[1px] border-[#F66262] hover:text-white hover:bg-[#F66262]">
                Delete
              </Button>
              <Button
                className="w-32 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                               disabled:bg-[#83A2AD]"
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
