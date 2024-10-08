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
import { DatePicker } from "../ui/datePicker";
import { DatePickerWithRange } from "../ui/datePickerWithRange";
import { GoArrowUpRight } from "react-icons/go";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { SubmitBtn } from "../ui/buttons/submitBtn";
import { CancelBtn } from "../ui/buttons/cancelBtn";
import { IoClose } from "react-icons/io5";
import { Selector } from "../ui/selectors/selector";

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
    smid: 1,
    desc: "Building",
  },
  {
    smid: 2,
    desc: "Education",
  },
  {
    smid: 3,
    desc: "Industrial",
  },
  {
    smid: 4,
    desc: "Resident",
  },
];

const groups = [
  {
    gid: 1,
    desc: "General Guard",
  },
  {
    gid: 2,
    desc: "Cargo",
  },
  {
    gid: 3,
    desc: "Cleaning",
  },
];

const zones = [
  {
    zid: 1,
    desc: "BMR",
  },
  {
    zid: 2,
    desc: "RO1",
  },
  {
    zid: 3,
    desc: "SVN",
  },
  {
    zid: 4,
    desc: "RO2",
  },
];

const mockContract = [
  {
    custId: 1,
    id: "0001",
    startDate: "",
    endDate: "",
  },
  {
    custId: 2,
    id: "0002",
    startDate: "",
    endDate: "",
  },
  {
    custId: 3,
    id: "0003",
    startDate: "",
    endDate: "",
  },
];

const ContractForm = ({ selectedCustomer, closeModal, customeraAeas }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(selectedCustomer);
  const [areas, setAreas] = useState<AreaData[]>(customeraAeas);
  const [formHeader, setFormHeader] = useState("");
  const [selectedContractId, setSelectedContractId] = useState<any>(
    areas[0]?.id
  );

  useEffect(() => {
    console.log("customer = ", selectedCustomer);
    if (selectedCustomer === undefined) {
      setFormHeader("+ New Contract");
      setIsEdit(false);
    } else {
      setFormHeader("View / Edit Contract");
      setIsEdit(true);
    }
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    //setFormData((prevData: any) => ({ ...prevData, [name]: value }));
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
    //setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleUndo = () => {
    //setFormData(editCustomer)
    setAreas(customeraAeas);
  };

  const handleDelete = () => {
    
  };

  const handleSave = () => {
    
  };

  const handleSubmit = () => {
    
  };

  function handleCloseContractForm() {
    console.log("enterHandleCloseContract", isEdit);
    console.log("editedCustomer =", selectedCustomer);
    closeModal(isEdit);
  }

  const handleSelectAreaChange = (e: SelectChangeEvent) => {
    setSelectedContractId(e.target.value);
    const areaChkPt = mockContract.filter((c) => c.id === e.target.value);
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
          onClick={handleCloseContractForm}
        >
          <IoClose size={26} />
        </Button2>
      </Box>
      <div className="bg-white rounded-b-lg shadow-lg min-h-[544px] max-h-[654px] w-[800px]">
        {/* Body */}
        <div className="max-h-[528px] overflow-auto">
          <Box className="w-full px-6 py-2 rounded-t-lg pb-6">
            {/* CustomerName */}
            <Box className="flex w-full space-x-5 pt-2">
              <Box className="w-full border-b-2 pb-2 flex">
                <Box className="w-1/2">
                    <Typography
                      textAlign="left"
                      sx={{ fontWeight: "700", color: "#2C5079", fontSize: "16px", paddingBottom: "0.25rem"}}
                    >
                      {`Customer : ${customer.customerName}`}
                    </Typography>

                  <Typography
                    sx={{ color: "#4C9BF5", textDecorationLine: "underline", fontSize: "16px"}}
                    textAlign={"left"}
                  >
                    Total : {customer?.contractTotal} contract
                    {customer?.contractTotal > 1 ? "s" : ""}
                  </Typography>
                </Box>

                <Box className="w-1/2 flex justify-end">
                  <Button
                    onClick={addArea}
                    className=" bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] px-4"
                  >
                    + New Contract
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box className="flex w-full space-x-5 pt-2">
              <Box className="w-1/2">
              <Selector
                  selectorLabel={"Contract No."}
                  itemSource={segments}
                  handleChange={handleSelectChange}
                  selectedVal={selectedContractId}
                  name={"contractId"}
                />
              </Box>

              <Box className="w-1/2">
                <Typography
                  textAlign="left"
                  sx={{fontWeight: "700", color: "#2C5079", fontSize: "14px", paddingBottom: "0.25rem"}}
                >
                  Start Date - End Date
                </Typography>
                <DatePickerWithRange />
              </Box>

              {/* Segment */}
              {/* <Box className="w-1/2">
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
                          (segment) => segment.smid === formData?.segmentId
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
                      key={segment.smid}
                      value={segment.smid}
                      className="text-sm text-[#2C5079]"
                    >
                      {segment.desc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> */}

              {/* Group */}
              {/* <Box className="w-1/2">
              <Typography
                textAlign="left"
                className="text-[14px] pb-1 text-[#2C5079] font-bold"
              >
                Group
              </Typography>
              <FormControl focused className="w-full">
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
                          (group) => group.gid === formData?.groupId
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
                      key={group.gid}
                      value={group.gid}
                      className="text-sm text-[#2C5079]"
                    >
                      {group.desc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> */}
            </Box>

            <Typography
              textAlign="left"
              sx={{fontWeight: "700", color: "#2C5079", fontSize: "14px", paddingBottom: "0.25rem", marginTop: "0.5rem"}}
            >
              Attachment
            </Typography>
            <Box className="w-full flex space-x-3 ">
              <Box
                sx={{ borderRadius: "10px" }}
                className="justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5] cursor-pointer"
              >
                <Typography sx={{color: "#2C5079", paddingX: "0.5rem", paddingY: "0.25rem"}}>
                  {"file_name"}
                </Typography>
                <GoArrowUpRight
                  size={24}
                  color="#4C9BF5"
                  style={{ marginTop: 5 }}
                />
              </Box>
              <Button
                onClick={addArea}
                className="w-[84px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] pr-2"
              >
                + Add
              </Button>
            </Box>

            {areas.map((area, index) => (
              <Box
                key={area.id}
                className="flex w-full bg-[#EBF4F6] rounded-lg justify-items-center align-middle justify-between mb-3"
              >
                {/* <Box className="flex w-full justify-center">
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
                </Box> */}
                {/* <Box className="flex align-middle ml-2 justify-around">
                  <Button
                    onClick={() => removeArea(area.id)}
                    className="bg-[#F66262] rounded-r-lg rounded-l-none w-14 h-full"
                  >
                    <Trash color="white" />
                  </Button>
                </Box> */}
              </Box>
            ))}

            <Box className="w-full justify-between items-center pt-5">
              <Typography sx={{ color: "#4C9BF5", textDecorationLine: "underline", fontSize: "16px"}}>
                Total: {areas.length} area{areas.length > 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Footer */}
        {!isEdit && (
          <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
            <CancelBtn onCancelBtnClick={handleCloseContractForm}/>
            <SubmitBtn onSubmitBtnClick={handleSubmit} />
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
            <DeleteBtnFooter onDeleteBtnFooterClick={handleDelete} disable={false} />
            <SaveBtnFooter onSaveBtnFooterClick={handleSave} />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default ContractForm;
