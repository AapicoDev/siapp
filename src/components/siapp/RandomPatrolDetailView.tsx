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
import { Gallery, Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import { PatrolStatus } from "./PatrolStatus";
import { CheckListStatus } from "./CheckListStatus";
import { getPatrolCheckList, getMasterRoundData } from "../../app/lib/api";
import { Row } from "react-day-picker";
import { formatDate } from "date-fns";

type RandomRowData = {
    startDateTime: string;
    endDateTime: string;
    customerName: string;
    areaName: any;
    checkpointId: string;
    checkPointName: any;
    patroller: string;
    remark: string;
    reasonId: string;
    reason: string;
    image: any[];
    latestEdit: string;
  };

interface RandomPatrolDeatilViewProps {
  checkpoint: RandomRowData;
  closeModal: () => void;
}

const RandomPatrolDeatilView = ({
  checkpoint,
  closeModal,
}: RandomPatrolDeatilViewProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formHeader, setFormHeader] = useState("View Random Patrol");
  const [randomPatrolCheckpoint, setRandomPatrolCheckpoint] = useState(
    checkpoint || {
        startDateTime: "",
        endDateTime: "",
        customerName: "",
        areaId: "",
        areaName: "",
        checkpointId: "",
        checkPointName: "",
        patroller: "",
        remark: "",
        image: [],
    }
  );
  const [checkList, setCheckList] = useState<any[]>();
  const [roundTime, setRoundTime] = useState<any>();
  const [openMapDetailView, setOpenMapDetailView] = useState<boolean>(false);

  const formatTime = (dateString: string, isUTC7: boolean = false) => {
    const date = new Date(dateString);
    const hours = String( isUTC7 ? date.getUTCHours() + 7 : date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    console.log("randomPatrolCheckpoint =", randomPatrolCheckpoint);
    getCheckListData();
    console.log("checkpoint =", checkpoint);
  }, []);

  const getCheckListData = async () => {
    const getCheckList = await getPatrolCheckList(checkpoint.checkpointId);
    setCheckList(getCheckList?.documents);
    console.log("checkList =", getCheckList?.documents);
  };

  function handleCloseCustomerForm() {
    closeModal();
  }

  const handleMapClick = () => {
    setOpenMapDetailView(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop">
      {/* Header */}
      {!openMapDetailView && (
        <>
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
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
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
                        {randomPatrolCheckpoint.customerName}
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
                        {randomPatrolCheckpoint.areaName}
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
                        {formatDate(randomPatrolCheckpoint.endDateTime, "dd/MM/yyyy")}
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
                        Reason {randomPatrolCheckpoint.reason}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        sx={{
                          color: "#83A2AD",
                          fontSize: "14px",
                        }}
                        textAlign={"left"}
                      >
                        Latest Edit : {formatDate(randomPatrolCheckpoint.latestEdit,"dd/MM/yyyy")+ "@" + formatTime(randomPatrolCheckpoint.latestEdit, true)}
                      </Typography>
                    </div>
                  </Box>
                  {/* Map */}
                  <Box
                    className="flex w-[30%] space-x-5 bg-[#F1F4F4] rounded-lg hover:cursor-pointer"
                    onClick={(e) => setOpenMapDetailView(true)}
                  >
                    Map
                  </Box>
                </Box>

                <Box className="flex w-full bg-[#EBF4F6] rounded-lg mb-3 p-2">
                  <Box className="w-[75%]">
                    <Typography
                      textAlign="left"
                      sx={{
                        fontSize: "14px",
                        color: "#2C5079",
                        fontWeight: 700,
                      }}
                    >
                      {randomPatrolCheckpoint.checkPointName}
                    </Typography>
                    <Typography
                      textAlign="left"
                      sx={{
                        fontSize: "14px",
                        color: "#2C5079",
                      }}
                    >
                      {formatTime(randomPatrolCheckpoint.startDateTime)} -{" "}
                      {formatTime(randomPatrolCheckpoint.endDateTime) + " "}
                    </Typography>
                    <Typography
                      textAlign="left"
                      sx={{
                        fontSize: "14px",
                        color: "#1D7A9B",
                      }}
                    >
                      {randomPatrolCheckpoint.patroller} (Role)
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className="flex w-full rounded-lg mb-3"
                  sx={{ border: "1px solid #C7D4D7" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                        <TableCell align="center" className="w-[10%]">
                          No.
                        </TableCell>
                        <TableCell align="center" className="w-[20%]">
                          Check List
                        </TableCell>
                        <TableCell align="center" className="w-[20%]">
                          Status
                        </TableCell>
                        <TableCell align="center" className="w-[30%]">
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
                              verticalAlign: "top",
                            },
                          }}
                        >
                          <TableCell align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">
                            {row.CheckListName}
                          </TableCell>

                          <TableCell
                            sx={{
                              alignItems: "center",
                            }}
                          >
                            <div className="flex justify-center w-full h-full">
                              <CheckListStatus status={row.Status} />
                            </div>
                          </TableCell>

                          <TableCell align="center" sx={{ padding: 0 }}>
                            {row.Image.length > 0
                              ? row.Image.map(
                                  (i: string | undefined, index: any) => (
                                    <Box key={index} sx={{ height: "90px" }}>
                                      <img
                                        src={i}
                                        alt="Checklist Img"
                                        style={{
                                          maxWidth: "100%",
                                          borderRadius: "10px",
                                          maxHeight: "200px",
                                          marginTop: "10px",
                                        }}
                                      />
                                    </Box>
                                  )
                                )
                              : "-"}
                          </TableCell>

                          <TableCell align="center">{`${
                            row.Remark != null ? `${row.Remark}` : `-`
                          }`}</TableCell>
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
                    <Grid2 container spacing={1}>
                      {randomPatrolCheckpoint.image?.length > 0
                        ? randomPatrolCheckpoint.image.map((img, index) => (
                            <Grid2
                              key={index}
                              size={3}
                              height={90}
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
                                alt="Checkpoint Img"
                                style={{
                                  maxWidth: "100%",
                                  borderRadius: "10px",
                                  maxHeight: "90px",
                                  marginTop: "0px",
                                }}
                              />
                            </Grid2>
                          ))
                        : randomPatrolCheckpoint.image?.length === 0 || randomPatrolCheckpoint.image === undefined
                        ? "-"
                        : ""}
                    </Grid2>
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
                    {randomPatrolCheckpoint.remark != null
                      ? randomPatrolCheckpoint.remark
                      : "-"}
                  </Typography>
                </Box>
              </Box>
            </div>
          </div>
        </>
      )}

      {openMapDetailView && (
        <>
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
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "left" }}
            >
              <Button2
                sx={{
                  color: "#1D7A9B",
                  backgroundColor: "white",
                  width: "20%",
                  border: "1px solid #1D7A9B",
                  fontWeight: 700,
                  ml: 1,
                }}
                onClick={() => setOpenMapDetailView(false)}
              >
                Back
              </Button2>
              <Typography
                sx={{
                  width: "fit-content",
                  fontSize: "1.125rem", // text-lg equivalent
                  fontWeight: "bold",
                  color: "#1D7A9B",
                  marginTop: "0.25rem",
                  marginLeft: "20%",
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

          <div className="bg-white rounded-b-lg shadow-lg min-h-[394px] max-h-[494px] w-[700px]">
            {/* Body */}
            <div className="max-h-[494px] overflow-auto p-2">
              <Box
                className="w-full justify-center p-2 rounded-lg bg-slate-100 h-[329px]"
                textAlign="center"
              >
                Map
              </Box>
              <Box className="flex">
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#2c5079",
                  marginTop: "1rem",
                  marginX: 1,
                }}
              >
                หมายเหตุ : 
              </Typography>
              <Box sx={{width: 40, height: 15, bgcolor: "#4C9BF5", borderRadius: "5px", mt:2.7}}></Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#2c5079",
                  marginTop: "1rem",
                  marginLeft: 1,
                }}
              >
                Name Surname1
              </Typography>
              <Box sx={{width: 40, height: 15, bgcolor: "#E9AAFF", borderRadius: "5px", mt:2.7, ml:2}}></Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#2c5079",
                  marginTop: "1rem",
                  marginLeft: 1,
                }}
              >
                Name Surname2
              </Typography>
              </Box>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomPatrolDeatilView;
