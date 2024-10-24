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
  Icon,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@/components/ui/textboxs/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/buttons/button";
import { CallCalling, Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { VscRefresh } from "react-icons/vsc";
import { Checkbox } from "@/components/ui/checkbox2";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3";
import { Printer, ImportCurve } from "iconsax-react";
import Image from "next/image";
import QRCode from "../../components/QRCode";
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
  custId: number;
  name: string;
};

type CheckpointData = {
  areaId: any;
  id: number;
  name: string;
  qr: string;
  lt: string;
  lg: string;
  ut: string;
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

const mockCheckpoints: CheckpointData[] = [
  {
    id: 1,
    areaId: 1,
    name: "หน้าห้องพักอาจารย์ 3051 ชั้น 5",
    qr: "https://www.google.com/",
    lt: "000.000000",
    lg: "000.000000",
    ut: "000.000000",
  },
  {
    id: 2,
    areaId: 1,
    name: "หน้าห้องเรียน 1515 ชั้น 5",
    qr: "https://www.google.com/",
    lt: "000.000000",
    lg: "000.000000",
    ut: "000.000000",
  },
  {
    id: 3,
    areaId: 2,
    name: "หน้าประตูใหญ่",
    qr: "https://www.google.com/",
    lt: "000.000000",
    lg: "000.000000",
    ut: "000.000000",
  },
  {
    id: 4,
    areaId: 3,
    name: "หน้าตึก",
    qr: "https://www.google.com/",
    lt: "000.000000",
    lg: "000.000000",
    ut: "000.000000",
  },
];

const ViewQrCode = ({ selectedCustomer, closeModal, customeraAreas }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(selectedCustomer);
  const [areas, setAreas] = useState<AreaData[]>(customeraAreas);
  const [checkpoints, setCheckpoints] =
    useState<CheckpointData[]>(mockCheckpoints);
  const formHeader = "View QR Code";
  const [selectedArea, setSelectedArea] = useState<any>(areas[0]?.id);
  const [isPrintCardType, setIsPrintCardType] = useState(true);
  const [selectedChkPtArr, setSelectedChkPtArr] = useState(
    Array(checkpoints.length).fill(false)
  );
  const [isSelectedChkPtAll, setIsSelectedChkPtAll] = useState(false);
  const [selectedChkPtTotal, setSelectedChkPtTotal] = useState(0);
  const [openViewQRCard, setOpenViewQRCard] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [chkPtQRCode, setChkPtQRCode] = useState({
    chkPtNO: null,
    chkPtname: "",
    areaName: "",
    qr: null,
  });

  const initialData = () => {
    const areaChkPt = mockCheckpoints.filter((c) => c.areaId === areas[0].id);
    setCheckpoints(areaChkPt);
    setSelectedChkPtArr(Array(areaChkPt.length).fill(false));
  };

  useEffect(() => {
    initialData();
  }, []);

  const handleSelectChkPt = (index: any) => {
    const newSelectedChkPt = [...selectedChkPtArr];
    newSelectedChkPt[index] = !selectedChkPtArr[index];
    console.log("newSelected = ", newSelectedChkPt[index]);
    setSelectedChkPtArr(newSelectedChkPt);
    const isCheckAll = !newSelectedChkPt.some((item) => item === false);
    if (isCheckAll) {
      setIsSelectedChkPtAll(true);
    } else {
      setIsSelectedChkPtAll(false);
    }
    setSelectedChkPtTotal(newSelectedChkPt.filter((s) => s === true).length);
    console.log("SelectedChkPt =", selectedChkPtArr);
    console.log("ischeckAll =", isCheckAll);
  };

  const handleChkPtCheckAll = (checked: boolean) => {
    setIsSelectedChkPtAll(checked);
    for (let i = 0; i < selectedChkPtArr.length; i++) {
      selectedChkPtArr[i] = checked;
    }
    setSelectedChkPtTotal(selectedChkPtArr.filter((s) => s === true).length);
  };

  const handleSelectAreaChange = (e: SelectChangeEvent) => {
    setSelectedArea(e.target.value);
    const areaChkPt = mockCheckpoints.filter(
      (c) => c.areaId === e.target.value
    );
    setCheckpoints(areaChkPt);
    setSelectedChkPtArr(Array(areaChkPt.length).fill(false));
    setIsSelectedChkPtAll(false);
    setSelectedChkPtTotal(0);
  };

  function handleCloseViewQr() {
    closeModal();
  }

  const handleSelectPaperType = (checked: boolean) => {
    if (checked) setIsPrintCardType(false);
  };

  const handleSelectCardType = (checked: boolean) => {
    if (checked) setIsPrintCardType(true);
  };

  const openQRcode = (no: any, chkPt: any) => {
    const checkpointQR = chkPtQRCode;
    checkpointQR.chkPtname = chkPt.name;
    const areaName = areas.find((area) => area.id === selectedArea)?.name;
    console.log("areaName = ", areaName);
    checkpointQR.areaName = areaName === undefined ? "" : areaName;
    checkpointQR.qr = chkPt.qr;
    checkpointQR.chkPtNO = no;
    setOpenViewQRCard(true);
    if(chkPtQRCode.chkPtNO != null){
      if(selectedChkPtArr[chkPtQRCode.chkPtNO-1]===false){
        handleSelectChkPt(no - 1); //index = no-1
      }
    }
  };

  const closeQRcode = () => {
    setOpenViewQRCard(false);
    
    handleSelectChkPt(
      chkPtQRCode.chkPtNO ? chkPtQRCode.chkPtNO - 1 : chkPtQRCode.chkPtNO
    );
    const resetCheckpointQR = chkPtQRCode;
    resetCheckpointQR.areaName = "";
    resetCheckpointQR.chkPtname = "";
    resetCheckpointQR.qr = null;
    resetCheckpointQR.chkPtNO = null;
    setQrCode(resetCheckpointQR.qr);
    setChkPtQRCode(resetCheckpointQR);
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
          borderRadius: "8px 8px 0px 0px", 
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              width: "fit-content",
              fontSize: "1.125rem",
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
          onClick={handleCloseViewQr}
        >
          <IoClose size={26} />
        </Button2>
      </Box>

      <div className="bg-white rounded-b-lg shadow-lg h-[604px] max-h-[604px] w-[800px] relative">
        {/* Body */}
        <div className="h-[528px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            {/* CustomerName */}
            <Box className="flex flex-col w-full space-x-5 pt-2">
              <Box className="w-full border-b-2 pb-2">
                <Box className="flex">
                  <Typography
                    textAlign="left"
                    sx={{fontWeight: "700", color: "#2C5079", fontSize: "16px", paddingBottom: "0.25rem"}}
                  >
                    {`Customer : `}
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{color: "#2C5079", fontSize: "16px", paddingBottom: "0.25rem", paddingLeft: "0.25rem"}}
                  >
                    {`${customer.customerName}`}
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#4C9BF5", textDecorationLine: "underline", fontSize: "16px"}}
                  textAlign={"left"}
                >
                  Total : {customer.chkPtTotal} check point
                  {customer.chkPtTotal > 1 ? "s" : ""}
                </Typography>
              </Box>
            </Box>

            <Box className="w-full pt-2 justify-between pb-2">
              <Box className="flex space-x-3">
                <Checkbox
                  className="mb-2 h-9 w-9 mt-[26px]"
                  checked={isSelectedChkPtAll}
                  onCheckedChange={handleChkPtCheckAll}
                />
                <FormControl focused className="w-full">
                  <Typography
                    textAlign="left"
                    sx={{ fontWeight: "700", color: "#2C5079", fontSize: "14px", paddingBottom: "0.25rem"}}
                  >
                    Area
                  </Typography>
                  <InputLabel sx={{ fontWeight: "700", color: "#2C5079"}} className="w-full"></InputLabel>
                  <Select
                    name="areaId"
                    size="small"
                    value={selectedArea}
                    onChange={handleSelectAreaChange}
                    renderValue={() =>
                      areas.find((area) => area.id === selectedArea)?.name
                    }
                    className={`${
                      selectedArea === undefined ? `text-[#83A2AD]` : ""
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
                    {areas.map((area) => (
                      <MenuItem
                        sx={{fontSize: "0.875rem", lineHeight: "1.25rem", color: "#2C5079"}}
                        key={area.id}
                        value={area.id}
                      >
                        {area.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box className="w-[35%]">
                  <Typography
                    textAlign="left"
                    sx={{ fontWeight: "700", color: "#2C5079", fontSize: "14px", paddingBottom: "0.25rem"}}
                  >
                    Print Type
                  </Typography>
                  <Box
                    sx={{ borderRadius: "10px" }}
                    className={`${
                      isPrintCardType
                        ? `bg-[#E2F7E1] border-[#86DC89]`
                        : `bg-white border-[#2C5079]`
                    } flex p-1 h-fit border-[1px]`}
                  >
                    <Checkbox3
                      onCheckedChange={handleSelectCardType}
                      checked={isPrintCardType}
                    />
                    <Typography sx={{ color: "#2C5079"}} className="py-1 px-2">
                      Card
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ borderRadius: "10px" }}
                  className={`${
                    !isPrintCardType
                      ? `bg-[#E2F7E1] border-[#86DC89]`
                      : `bg-white border-[#2C5079]`
                  } w-[35%] flex p-1 h-fit border-[1px] mt-6`}
                >
                  <Checkbox3
                    onCheckedChange={handleSelectPaperType}
                    checked={!isPrintCardType}
                  />
                  <Typography className="py-1 px-2" sx={{ color: "#2C5079"}}>
                    Paper
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ color: "#4C9BF5", textDecorationLine: "underline", fontSize: "16px"}}>
                Total : {checkpoints.length} check point
                {checkpoints.length > 1 ? "s" : ""}
              </Typography>
            </Box>

            {checkpoints.map((chkpt, index) => (
              <Box
                key={chkpt.id}
                className="flex w-full justify-items-center align-middle justify-between mb-2"
              >
                <Checkbox
                  className="h-9 w-9 mr-3 mt-5"
                  checked={selectedChkPtArr[index]}
                  onClick={() => handleSelectChkPt(index)}
                />

                <div
                  className="w-full"
                  onClick={() => openQRcode(index + 1, chkpt)}
                >
                  <Box
                    className={`${
                      selectedChkPtArr[index] ? `bg-[#D8EAFF]` : `bg-[#EBF4F6]`
                    } w-full rounded-lg p-2 cursor-pointer hover:bg-[#D8EAFF]`}
                  >
                    <Typography
                      textAlign="left"
                      sx={{ fontWeight: "700", color: "#2C5079", fontSize: "14px"}}
                    >
                      {index + 1}. {chkpt.name}
                    </Typography>
                    <Typography
                      textAlign="left"
                      sx={{ color: "#2C5079", fontSize: "14px"}}
                    >
                      QR Code : {chkpt.qr}
                    </Typography>
                    <Box className="flex justify-between">
                      <Typography
                        textAlign="left"
                        sx={{ color: "#2C5079", fontSize: "14px"}}
                      >
                        ละติจูด : {chkpt.lt}
                      </Typography>
                      <Typography
                        textAlign="left"
                        sx={{ color: "#2C5079", fontSize: "14px"}}
                      >
                        ลองติจูด : {chkpt.lg}
                      </Typography>
                      <Typography
                        textAlign="left"
                        sx={{ color: "#2C5079", fontSize: "14px"}}
                      >
                        อัลติจูด : {chkpt.ut}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </Box>
            ))}
          </Box>

          {/* QR Code Card modal */}
          {openViewQRCard && isPrintCardType && (
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50 w-full h-[528px]"
              onClick={() => closeQRcode()}
            >
              {/* Modal content */}
              <div className="bg-transparent rounded-b-lg shadow-lg">
                <div className="overflow-auto">
                  <Box
                    className="w-[350px] h-[200px] justify-center rounded-lg"
                    textAlign="center"
                  >
                    <Box className="h-1/2 bg-white justify-between items-center rounded-t-lg flex">
                      {/* Logo */}
                      <Box className="w-[55%] ml-7">
                        <Image
                          src="/ASMLogo.png"
                          alt="Logo"
                          width={150}
                          height={100}
                        />
                      </Box>
                      <Box className="w-[45%] justify-center text-center h-full pt-3 pl-1 pr-2">
                        <Typography sx={{ fontWeight: "600", color: "#00336D", fontSize: "14px", padding: "0.25rem"}}>
                          Call (24 hrs.)
                        </Typography>
                        <Typography sx={{ fontWeight: "600", color: "#00336D", fontSize: "14px", paddingX: "0.5rem", paddingY: "2px", marginX: "0.5rem"}}
                        className="flex bg-[#D8EAFF] rounded-full">
                          <CallCalling
                            className="text-[#4C9BF5] mt-[2px] mx-1"
                            size={16}
                          />
                          02-348-8812
                        </Typography>
                        <Box className="p-2">
                          <div
                            className="flex flex-col px-12 justify-center items-center"
                            key={`${window.location.origin}${chkPtQRCode.qr}`}
                          >
                            <QRCode
                              data={`${window.location.origin}${chkPtQRCode.qr}`}
                              qrCode={qrCode}
                              setQrCode={setQrCode}
                            />
                          </div>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="h-1/2 bg-[#00336D] rounded-b-lg text-center">
                      <Box className="w-[60%] p-3">
                        <Typography sx={{ fontWeight: "600", color: "white", fontSize: "14px", textDecorationLine: "underline"}}>
                          จุดที่ {chkPtQRCode.chkPtNO}
                        </Typography>
                        <Typography sx={{ fontWeight: "600", color: "white", fontSize: "14px"}}>
                          {chkPtQRCode.areaName}
                        </Typography>
                        <Typography sx={{ fontWeight: "600", color: "white", fontSize: "14px"}}>
                          {chkPtQRCode.chkPtname}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          )}

          {/* QR Code Paper modal */}
          {openViewQRCard && !isPrintCardType && (
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-10 w-full h-[528px]"
              onClick={() => closeQRcode()}
            >
              {/* Modal content */}
              <div className="bg-transparent rounded-b-lg shadow-lg">
                <div className="overflow-auto">
                  <Box
                    className="w-[200px] h-[380px] justify-center rounded-lg"
                    textAlign="center"
                  >
                    <Box className="h-[60%] bg-white justify-between items-center rounded-t-lg">
                      {/* Logo */}
                      <Box className="pl-6 pt-5">
                        <Image
                          src="/ASMLogo.png"
                          alt="Logo"
                          width={150}
                          height={100}
                        />
                      </Box>
                      <Box className="text-center h-full pt-7 pl-1 pr-2">
                        <Typography sx={{ fontWeight: "600", color: "#00336D", fontSize: "14px", textDecorationLine: "underline"}}>
                          จุดที่ {chkPtQRCode.chkPtNO}
                        </Typography>
                        <Typography sx={{ fontWeight: "600", color: "#00336D", fontSize: "14px", paddingX: "2px"}}>
                          {chkPtQRCode.areaName}
                        </Typography>
                        <Typography sx={{ fontWeight: "600", color: "#00336D", fontSize: "14px", paddingX: "2px"}}>
                          {chkPtQRCode.chkPtname}
                        </Typography>
                        <Box className="p-2 mt-4">
                          <div
                            className="flex flex-col px-12 justify-center items-center"
                            key={`${window.location.origin}${chkPtQRCode.qr}`}
                          >
                            <QRCode
                              data={`${window.location.origin}${chkPtQRCode.qr}`}
                              qrCode={qrCode}
                              setQrCode={setQrCode}
                            />
                          </div>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="h-[40%] bg-[#00336D] rounded-b-lg text-center">
                      <Typography sx={{ fontWeight: "600", color: "white", fontSize: "14px", padding: "0.25rem", paddingTop: "5rem"}}>
                        Call (24 hrs.)
                      </Typography>
                      <Typography sx={{ fontWeight: "600", color: "#00336D", fontSize: "14px", paddingX: "0.5rem", paddingY: "2px", marginLeft: "2.5rem"}}
                                  className="bg-[#D8EAFF] rounded-full flex w-fit">
                        <CallCalling
                          className="text-[#4C9BF5] mr-1 mt-[2px]"
                          size={16}
                        />
                        02-348-8812
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <Box className="flex w-full justify-between px-6 border-t-2 pt-4 pb-4">
          <Box>
            <Typography sx={{ color: "#2C5079", fontSize: "16px", textDecorationLine:"underline", marginTop: "0.25rem"}}>
              Selected : {selectedChkPtTotal}
            </Typography>
          </Box>
          <Box className="flex items-center space-x-4">
            <Button className="w-32 h-11 bg-white text-[#F66262] border-[1px] border-[#F66262] hover:text-white hover:bg-[#F66262]">
              Delete
            </Button>

            <Button className="flex items-center justify-center w-32 h-11 border-[1px] border-[#1D7A9B] bg-white text-[#1D7A9B] hover:bg-[#1D7A9B] hover:text-white disabled:bg-[#83A2AD]">
              <Printer size={20} className="mr-2" />
              Print
            </Button>

            <Button className="flex items-center justify-center w-32 h-11 border-[1px] border-[#1D7A9B] bg-white text-[#1D7A9B] hover:bg-[#1D7A9B] hover:text-white disabled:bg-[#83A2AD]">
              <ImportCurve size={20} className="mr-2" />
              Download
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ViewQrCode;
