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
} from "@mui/material";
import { Gallery, Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import { PatrolStatus } from "./PatrolStatus";
import { CheckListStatus } from "./CheckListStatus";
import {
  getPatrolCheckList, getMasterRoundData
} from "../../app/lib/api";
import { Row } from "react-day-picker";

type RowData = {
  dateTime: string;
  startDateTime: string;
  useTime: string;
  customerName: string;
  areaId: string;
  areaName: any;
  round: any;
  checkpointId: string;
  checkpointNo: any;
  checkPointName: any;
  patroller: string;
  status: string;
  allCheckpoints: string[];
  remark: string;
  image: any[];
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

interface PatrolDeatilViewProps {
  checkpoint: RowData;
  closeModal: () => void;
}

const PatrolDeatilView = ({
  checkpoint,
  closeModal,
}: PatrolDeatilViewProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formHeader, setFormHeader] = useState("View Check Point Patrol");
  const [patrolCheckpoint, setPatrolCheckpoint] = useState(
    checkpoint || {
      dateTime: "",
      customerName: "",
      areaName: "",
      round: 0,
      checkPointName: "",
      checkpointId: "",
      checkpointNo: undefined,
      patroller: "",
      status: "",
      allCheckpoints: [],
      remark: "",
      image: [],
    }
  );
  const [checkList, setCheckList] = useState<any[]>();
  const [roundTime, setRoundTime] = useState<any>();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    console.log("patrolCheckpoint =", patrolCheckpoint)
    getCheckListData();
    getRoundDetailData();
  },[]);

  const getCheckListData = async () => {
    const getCheckList = await getPatrolCheckList(checkpoint.checkpointId);
    setCheckList(getCheckList?.documents);
    console.log("checkList =", getCheckList?.documents);
  }

  const getRoundDetailData = async () => {
    const response = await getMasterRoundData(checkpoint.areaId);
    const startTime = formatTime(response?.documents[0].startTime);
    const endTime = formatTime(response?.documents[0].endTime);
    setRoundTime(startTime + " - " + endTime);
    console.log("roundTime = ", startTime + " - " + endTime);
  }

  function handleCloseCustomerForm() {
    closeModal();
  }

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

      <div className="bg-white rounded-b-lg shadow-lg min-h-[694px] max-h-[794px] w-[700px]">
        {/* Body */}
        <div className="max-h-[728px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <Box
              className="flex w-full space-x-2 mb-2 pb-2"
              sx={{ borderBottom: "1px solid #C7D4D7" }}
            >
              <Box className="w-[70%]">
                <div className="flex">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      pr: 1,
                      fontWeight: 700,
                    }}
                  >
                    Customer :
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                    }}
                  >
                    {patrolCheckpoint.customerName}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      pr: 1,
                      fontWeight: 700,
                      paddingTop: "0.25rem",
                    }}
                  >
                    Area :
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                    }}
                  >
                    {patrolCheckpoint.areaName}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      pr: 1,
                      fontWeight: 700,
                    }}
                  >
                    Date
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                    }}
                  >
                    {patrolCheckpoint.dateTime.split("@")[0]}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                      pr: 1,
                      fontWeight: 700,
                    }}
                  >
                    Round {patrolCheckpoint.round}
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "0.25rem",
                    }}
                  >
                    ({roundTime})
                  </Typography>
                </div>
                <div>
                  <Typography
                    sx={{
                      color: "#4C9BF5",
                      textDecorationLine: "underline",
                      fontSize: "14px",
                    }}
                    textAlign={"left"}
                  >
                    {patrolCheckpoint.allCheckpoints.length} Check Point {`${patrolCheckpoint.allCheckpoints.length > 1 ? `s`: ``}`}
                  </Typography>
                </div>
              </Box>
              <Box className="flex w-[30%] space-x-5 bg-[#F1F4F4] rounded-lg"></Box>
            </Box>

            <Box className="flex w-full bg-[#EBF4F6] rounded-lg mb-3 p-2">
              <Typography
                textAlign="center"
                sx={{
                  width: "2rem",
                  height: "1.9rem",
                  fontSize: "14px",
                  color: "white",
                  bgcolor: "#1D7A9B",
                  borderRadius: "9999px",
                  pt: 0.3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  m: "15px 15px 0px 5px",
                }}
              >
              {patrolCheckpoint.checkpointNo}
              </Typography>
              <Box className="w-[75%]">
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    fontWeight: 700,
                  }}
                >
                  {patrolCheckpoint.checkPointName}
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                  }}
                >
                  {patrolCheckpoint.startDateTime.split("@")[1]} - {patrolCheckpoint.dateTime.split("@")[1] + " "}
                  ({patrolCheckpoint.useTime.split(" ")[0] === "0" ? "" : patrolCheckpoint.useTime.split(" ")[0]+" hr "}
                  {patrolCheckpoint.useTime.split(" ")[1]+" min "}
                  {patrolCheckpoint.useTime.split(" ")[2]+" sec"})
                </Typography>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#1D7A9B",
                  }}
                >
                  {patrolCheckpoint.patroller} (Role)
                </Typography>
              </Box>
              <Box className="flex h-[50%] mt-2">
                <PatrolStatus status={1} />
              </Box>
            </Box>

            <Box
              className="flex w-full rounded-lg mb-3"
              sx={{ border: "1px solid #C7D4D7" }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                    <TableCell align="center" className="w-[15%]">
                      No.
                    </TableCell>
                    <TableCell align="center" className="w-[25%]">
                      Check List
                    </TableCell>
                    <TableCell align="center" className="w-[20%]">
                      Status
                    </TableCell>
                    <TableCell align="center" className="w-[20%]">
                      Picture
                    </TableCell>
                    <TableCell align="center" className="w-[20%]">
                      Remark
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkList?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "& .MuiTableCell-root": {
                          padding: "10px 20px 10px 20px", // Customize border color
                          borderBottom: "1px solid #C7D4D7",
                        },
                      }}
                    >
                      <TableCell align="center">{row.CheckListNo}</TableCell>
                      <TableCell align="center">{row.CheckListName}</TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CheckListStatus status={row.Status} />
                      </TableCell>

                      <TableCell align="center">{`${row.Image.length > 0 ? `${row.Image.length}` : `-` }`}</TableCell>

                      <TableCell align="center">{`${row.Remark != null ? `${row.Remark}` : `-` }`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#2C5079",
                  fontWeight: 700,
                }}
              >
                รูปภาพเพิ่มเติม
              </Typography>
              <Box textAlign={"left"}>
                {patrolCheckpoint.image.length > 0 ? patrolCheckpoint.image.length : "-"}
                {/* <Box className="flex w-[20%] h-[80px] space-x-5 bg-[#F1F4F4] rounded-lg justify-center">
                  <Gallery className="mt-6" />
                </Box> */}
              </Box>
            </Box>

            <Box className="w-full mb-3 p-2">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#2C5079",
                  fontWeight: 700,
                }}
              >
                ความคิดเห็นเพิ่มเติม
              </Typography>
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#2C5079",
                }}
              >
                {patrolCheckpoint.remark != null ? patrolCheckpoint.remark : "-"}
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PatrolDeatilView;
