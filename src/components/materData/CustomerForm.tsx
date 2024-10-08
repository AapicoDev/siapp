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
      setIsEdit(false);
    } else {
      setFormHeader("View / Edit Customer");
      setIsEdit(true);
    }
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    console.log("formData", formData);
  };

  const addArea = () => {
    setAreas([...areas, { id: areas.length + 1, name: "" }]);
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
            <Box className="flex w-full space-x-5 pt-4">
              {/* Segment */}
              <Box className="w-1/2">
                {/* <FormControl focused className="w-full">
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
              </FormControl> */}
                <Selector
                  selectorLabel={"Segment"}
                  itemSource={segments}
                  handleChange={handleSelectChange}
                  selectedVal={formData.segmentId}
                  name={"segmentId"}
                />
              </Box>

              {/* Group */}
              <Box className="w-1/2">
                <Selector
                  selectorLabel={"Group"}
                  itemSource={groups}
                  handleChange={handleSelectChange}
                  selectedVal={formData.groupId}
                  name={"groupId"}
                />
              </Box>
            </Box>

            <Box className="flex w-full space-x-5 pt-3">
              {/* Zone */}
              <Box className="w-1/2">
                <Selector
                  selectorLabel={"Zone"}
                  itemSource={zones}
                  handleChange={handleSelectChange}
                  selectedVal={formData.zoneId}
                  name={"zoneId"}
                />
              </Box>

              <Box className="w-1/2">
                {/* <Typography
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
              /> */}
                <Textbox
                  header="Customer"
                  name="customerName"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.customerName}
                  handleChange={handleChange}
                />
              </Box>
            </Box>

            <Box className="flex w-full space-x-5 pt-3">
              <Box className="w-[40%]">
                <Textbox
                  header="HR Code"
                  name="hrCode"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.hrCode}
                  handleChange={handleChange}
                />
              </Box>
              <Box className="w-[40%]">
                <Textbox
                  header="Code"
                  name="code"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.code}
                  handleChange={handleChange}
                />
              </Box>
              <Box className="w-[20%]">
                <Typography
                  textAlign="left"
                  sx={{fontSize: "14px", paddingBottom: "0.25rem", color: "#2C5079", fontWeight: "700"}}
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
                    sx={{fontSize: "14px", paddingBottom: "0.25rem", color: "#2C5079", fontWeight: "700", paddingLeft: '0.5rem', paddingTop: "0.5rem"}}
                  >
                    {formData.isActive === true ? "Active" : "Inactive"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography
              textAlign="left"
              sx={{fontSize: "14px", paddingBottom: "0.25rem", color: "#2C5079", fontWeight: "700", paddingTop: "0.75rem"}}
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
                    sx={{fontSize: "14px", color: "#2C5079", paddingTop: "1.25rem"}}
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
              <AddButton onAddBtnClick={addArea} />
            </Box>

            <Box className="w-full justify-between items-center pt-5">
              <Typography sx={{fontSize: "16px", color:"#4C9BF5", textDecorationLine: "underline"}}>
                Total: {areas.length} area{areas.length > 1 ? "s" : ""}
              </Typography>
            </Box>
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

export default CustomerForm;
