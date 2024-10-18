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
  TextareaAutosize,
  Grid2,
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
import LabelTextField3 from "../ui/textboxs/labelTextField3";
import { GoArrowUpRight } from "react-icons/go";

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

interface IncidentFormProps {
  editCustomer: any;
  customeraAeas: any;
  closeModal: () => void;
}

const IncidentForm = ({
  editCustomer,
  closeModal,
  customeraAeas,
}: IncidentFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [areas, setAreas] = useState<AreaData[]>(customeraAeas);
  const [formHeader, setFormHeader] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
      setFormHeader("+ New Incident Type");
      setIsEdit(false);
    } else {
      setFormHeader("View / Edit Incident Type");
      setIsEdit(true);
    }
  });

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

  function handleCloseForm() {
    closeModal();
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
          width: "760px",
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

      <div className="bg-white rounded-b-lg shadow-lg min-h-[604px] max-h-[734px] w-[760px]">
        {/* Body */}
        <div className="max-h-[638px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <Box className="w-full flex space-x-4">
              <Box className="w-1/2">
                <Textbox
                  header="Incident Type (EN)"
                  name="incidentTypeEN"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.customerName}
                  handleChange={handleChange}
                />
              </Box>
              <Box className="w-1/2">
                <Textbox
                  header="Incident Type (TH)"
                  name="incidentTypeTH"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.customerName}
                  handleChange={handleChange}
                />
              </Box>
            </Box>

            <Box className="w-full">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  paddingBottom: "0.25rem",
                  color: "#2C5079",
                  fontWeight: "700",
                  paddingTop: "0.75rem",
                }}
              >
                Corrective Action
              </Typography>
              <Box
                sx={{
                  border: `1px solid ${isFocused ? "#1D7A9B" : "#1D7A9B"}`, // Change border color on focus
                  borderRadius: "8px", // Optional: customize the border radius
                  padding: "4px", // Optional: space between border and textarea
                  transition: "border 0.3s ease", // Smooth transition
                }}
              >
                <TextareaAutosize
                  minRows={5}
                  maxRows={8}
                  placeholder="Type here..."
                  onFocus={() => setIsFocused(true)} // Set focus state
                  onBlur={() => setIsFocused(false)} // Remove focus state
                  style={{
                    width: "100%",
                    outline: "none", // Remove default outline
                    border: "none", // Remove internal border
                    fontSize: "14px", // Optional: custom font size
                    padding: "0.25rem",
                  }}
                />
              </Box>
            </Box>
            <Typography
              textAlign="left"
              sx={{
                fontSize: "14px",
                paddingBottom: "0.25rem",
                color: "#2C5079",
                fontWeight: "700",
                paddingTop: "0.75rem",
              }}
            >
              Contact
            </Typography>
            {/* {areas.map((area, index) => ( */}
            <Box
              // key={area.id}
              className="flex w-full bg-[#F1F4F4] rounded-lg justify-items-center align-middle justify-between mb-3"
            >
              <Grid2 container sx={{ width: "100%", p: 2 }} spacing={2}>
                <Grid2 size={6} sx={{ bgcolor: "white" }}>
                  <LabelTextField3
                    label={"Name-Surname"}
                    placeholder={"Type here..."}
                    inputVal={undefined}
                    field={"nameSurname"}
                    id={undefined}
                    handleChangeVal={function (
                      id: any,
                      field: any,
                      value: any
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </Grid2>
                <Grid2 size={6} sx={{ bgcolor: "white" }}>
                  <LabelTextField3
                    label={"Tel"}
                    placeholder={"Type here..."}
                    inputVal={undefined}
                    field={"tel"}
                    id={undefined}
                    handleChangeVal={function (
                      id: any,
                      field: any,
                      value: any
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </Grid2>
                <Grid2 size={6} sx={{ bgcolor: "white" }}>
                  <LabelTextField3
                    label={"Email"}
                    placeholder={"Type here..."}
                    inputVal={undefined}
                    field={"email"}
                    id={undefined}
                    handleChangeVal={function (
                      id: any,
                      field: any,
                      value: any
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </Grid2>
              </Grid2>
              <Box className="flex align-middle ml-2 justify-around">
                <Button
                  //onClick={() => removeArea(area.id)}
                  className="bg-[#F66262] rounded-r-lg rounded-l-none w-14 h-full"
                >
                  <Trash color="white" />
                </Button>
              </Box>
            </Box>
            {/* ))} */}

            <Box className="justify-start flex w-full">
              <AddButton onAddBtnClick={addArea} />
            </Box>

            <Box className="w-full justify-center" textAlign="center">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#2C5079",
                  fontWeight: "700",
                  paddingTop: "0.75rem",
                }}
              >
                Attachment
              </Typography>
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#F66262",
                  pb: "0.25rem",
                }}
              >
                *File type : PDF, JPG, PNG and GIF (each file must not exceed 2
                MB)
              </Typography>
              <Grid2 container sx={{ width: "100%" }} spacing={2}>
                <Grid2 size={4}>
                  <Box className="justify-between flex p-1 bg-white border-[1px] border-[#4C9BF5] cursor-pointer rounded-lg">
                    <Typography className="py-1 px-2 text-[#2C5079]">
                      row.attachment
                    </Typography>
                    <GoArrowUpRight
                      size={24}
                      color="#4C9BF5"
                      style={{ marginTop: 5 }}
                    />
                  </Box>
                </Grid2>
              </Grid2>

              <Box className="justify-start flex w-full pt-3">
                <AddButton onAddBtnClick={addArea} />
              </Box>
            </Box>
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

export default IncidentForm;
