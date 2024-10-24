"use client";

import {
  Box,
  Typography,
  Button as Button2,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid2,
} from "@mui/material";
import {
  Calendar,
  Gallery,
  Location,
  Printer,
  SmsTracking,
  Trash,
} from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import { PatrolStatus } from "./PatrolStatus";
import { CheckListStatus } from "./CheckListStatus";
import { getIncidentTypeData } from "../../app/lib/api";
import { Row } from "react-day-picker";
import { Button } from "../ui/buttons/button";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { BlueButttonFooter } from "../ui/buttons/blueButtonFooter";

type RowData = {
  rowNo: number;
  dateTime: string;
  customerName: string;
  incidentType: string;
  topic: string;
  reporter: string;
  status: string;
  location: string;
  locationName: string;
  detail: string;
  shiftName: string;
  image: string[];
  relatedPerson: string[];
  correctiveDetail: string;
  approvers: string[];
  updatedDateTime: string;
};

interface IncidentDeatilViewProps {
  selectedIncident: RowData;
  closeModal: () => void;
}

const IncidentDeatilView = ({
  selectedIncident,
  closeModal,
}: IncidentDeatilViewProps) => {
  const [formHeader, setFormHeader] = useState("View Incident");
  const [masterIncidentTypes, setMasterIncidentTypes] = useState<any[]>();
  const [roundTime, setRoundTime] = useState<any>();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    //console.log("patrolCheckpoint =", patrolCheckpoint)
    getMasterIncidentTypes();
    getRoundDetailData();
  }, []);

  const getMasterIncidentTypes = async () => {
    const getIncidentTypes = await getIncidentTypeData();
    setMasterIncidentTypes(getIncidentTypes?.documents);
  };

  const getRoundDetailData = async () => {
    // const response = await getMasterRoundData(checkpoint.areaId);
    // const startTime = formatTime(response?.documents[0].startTime);
    // const endTime = formatTime(response?.documents[0].endTime);
    // setRoundTime(startTime + " - " + endTime);
    // console.log("roundTime = ", startTime + " - " + endTime);
  };

  function handleCloseCustomerForm() {
    closeModal();
  }

  const handleSendEmail = () => {};

  const handlePrint = () => {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          width: "700px",
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

      <div className="bg-white rounded-b-lg shadow-lg min-h-[614px] max-h-[714px] w-[700px]">
        {/* Body */}
        <div className="max-h-[638px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <Box
              className="flex w-full space-x-2 mb-2 pb-2"
              sx={{ borderBottom: "1px solid #C7D4D7" }}
            >
              <Box className="w-[70%]">
                <div>
                  <div className="bg-[#37B7c3] text-white text-xs font-medium px-2 py-1 rounded-lg mr-2 w-fit">
                    {
                      masterIncidentTypes?.find(
                        (i) =>
                          i.IncidentType_EN === selectedIncident.incidentType
                      )?.IncidentType_TH
                    }
                  </div>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#1D7A9B",
                      paddingTop: "0.25rem",
                      pr: 1,
                      fontWeight: 700,
                    }}
                  >
                    {selectedIncident.topic}
                  </Typography>
                </div>
                <div className="flex">
                  <Calendar size={18} className="mt-1 text-[#1D7A9B]" />
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      ml: 0.5,
                    }}
                  >
                    {selectedIncident.dateTime}
                  </Typography>
                </div>
                <div className="flex">
                  <Location size={18} className="mt-1 text-[#1D7A9B]" />
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      ml: 0.5,
                    }}
                  >
                    {selectedIncident.locationName}
                  </Typography>
                </div>
              </Box>
              <Box className="flex w-[30%] justify-end mt-8">
                {selectedIncident.status === "Approved" ? (
                  <Box
                    className={`justify-between flex px-5 py-1 bg-[#86DC89] rounded-lg h-fit`}
                  >
                    <Typography
                      sx={{ py: 0.5, px: 2, color: "white", fontSize: "14px" }}
                    >
                      Solved
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Box>

            <Box className="flex space-x-2 justify-center">
              <Box className="flex w-fit bg-[#EBF4F6] rounded-lg mb-3 py-1 px-3">
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#1D7A9B",
                    fontWeight: 700,
                  }}
                >
                  ลูกค้า :
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#1D7A9B",
                  }}
                >
                  {selectedIncident.customerName}
                </Typography>
              </Box>
              <Box className="flex w-fit bg-[#EBF4F6] rounded-lg mb-3 py-1 px-3">
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#1D7A9B",
                    fontWeight: 700,
                  }}
                >
                  แจ้งโดย :
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#1D7A9B",
                  }}
                >
                  {selectedIncident.reporter}
                </Typography>
              </Box>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#1D7A9B",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                รายละเอียด
              </Typography>
              <Box textAlign={"left"}>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    paddingTop: "0.25rem",
                    ml: 1,
                  }}
                >
                  {selectedIncident.detail}
                </Typography>
              </Box>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#1D7A9B",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                ผู้ที่เกี่ยวข้อง
              </Typography>
              <Box textAlign={"left"}>
                {selectedIncident.relatedPerson.length === 0 ? "-" : ""}
                {selectedIncident.relatedPerson.map((person, index) => (
                  <Typography
                  key={index}
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      ml: 1,
                    }}
                  >
                    • {person}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#1D7A9B",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                การดำเนินการแก้ไขปัญหา
              </Typography>
              <Box textAlign={"left"}>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    paddingTop: "0.25rem",
                    ml: 1,
                  }}
                >
                  {selectedIncident.correctiveDetail}
                </Typography>
              </Box>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#1D7A9B",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                ผลัด
              </Typography>
              <Box textAlign={"left"}>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    paddingTop: "0.25rem",
                    ml: 1,
                  }}
                >
                  {selectedIncident.shiftName}
                </Typography>
              </Box>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#1D7A9B",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                ภาพเหตุการณ์
              </Typography>
              <Grid2 container spacing={1}>
                {selectedIncident.image.length > 0 &&
                  selectedIncident.image.map((img, index) => (
                    <Grid2
                      key={index}
                      size={6}
                      height={160}
                      sx={{
                        bgcolor: "#F1F4F4",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={img}
                        alt="Incident Img"
                        style={{
                          maxWidth: "100%",
                          borderRadius: "10px",
                          maxHeight: "160px",
                          marginTop: "0px",
                        }}
                      />
                    </Grid2>
                  ))}
                  {selectedIncident.image.length === 0 ? "-" : ""}
              </Grid2>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#1D7A9B",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                การรับทราบ
              </Typography>
              <Grid2 container spacing={1}>
              {selectedIncident.approvers.length === 0 ? "-" : ""}
              {selectedIncident.approvers.map((approver, index) => (
                <Grid2
                key={index}
                  size={6}
                  sx={{ bgcolor: "#F1F4F4", borderRadius: "10px" }}
                >
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      ml: 1,
                    }}
                  >
                    {approver.split(" ")[0]}
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      ml: 1,
                    }}
                  >
                    {approver.split(" ")[1]}
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      ml: 1,
                    }}
                  >
                    DateTime
                  </Typography>
                </Grid2>))}
              </Grid2>
            </Box>

            <Box className="w-full mb-3 p-1 flex justify-center">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#37B7C3",
                  paddingTop: "0.25rem",
                  ml: 0.5,
                }}
              >
                แก้ไขล่าสุด : {selectedIncident.updatedDateTime}
              </Typography>
            </Box>
          </Box>
        </div>

        <Box className="flex w-full justify-center border-t-2 p-4 space-x-3">
          <BlueButttonFooter
            onBtnFooterClick={handleSendEmail}
            disable={true}
            icon={<SmsTracking className="mr-1" />}
            content={"Email"}
          />
          <BlueButttonFooter
            onBtnFooterClick={handlePrint}
            disable={true}
            icon={<Printer className="mr-1" />}
            content={"Print"}
          />
        </Box>
      </div>
    </div>
  );
};

export default IncidentDeatilView;
