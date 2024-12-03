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
  CircularProgress,
} from "@mui/material";
import { Gallery, Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import { PatrolStatus } from "./PatrolStatus";
import { CheckListStatus } from "./CheckListStatus";
import { getPatrolCheckList } from "../../app/lib/api";
import { Row } from "react-day-picker";
import { formatDate } from "date-fns";
import PatrolCheckpointMapComponent from "../PatrolCheckpointMapView";

type RandomRowData = {
    startDateTime: string;
    endDateTime: string;
    customerName: string;
    areaName: any;
    checkpointId: string;
    checkPointName: any;
    patroller: string;
    remark: string;
    reasonIds: string[];
    reasons: string[];
    image: any[];
    longLat: any[];
    latestEdit: string;
  };

interface RandomPatrolDeatilViewProps {
  checkpoint: RandomRowData;
  normalWord: any[];
  abnormalWord: any[];
  closeModal: () => void;
}

const RandomPatrolDeatilView = ({
  checkpoint,
  normalWord,
  abnormalWord,
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
        longLat: ["0", "0"],
        image: [],
    }
  );
  const [checkList, setCheckList] = useState<any[]>();
  const [roundTime, setRoundTime] = useState<any>();
  const [openMapDetailView, setOpenMapDetailView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [image, setImage] = useState<any>();

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
    setIsLoading(true);
    const getCheckList = await getPatrolCheckList(checkpoint.checkpointId);
    setCheckList(getCheckList?.documents);
    console.log("checkList =", getCheckList?.documents);
    setIsLoading(false);
  };

  function handleCloseCustomerForm() {
    closeModal();
  }

  const handleMapClick = () => {
    setOpenMapDetailView(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-40">
      {/* Header */}
      {(!openMapDetailView && !openImage) && (
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
                        Date :
                      </Typography>
                      <Typography
                        textAlign="left"
                        sx={{
                          fontSize: "14px",
                          color: "#2C5079",
                          paddingTop: "0.25rem",
                        }}
                      >
                        {randomPatrolCheckpoint.endDateTime === null ? "" : formatDate(randomPatrolCheckpoint.endDateTime, "dd/MM/yyyy")}
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
                          textWrap: "nowrap"
                        }}
                      >
                        Reason :
                      </Typography>
                      <Typography
                        textAlign="left"
                        sx={{
                          fontSize: "14px",
                          color: "#2C5079",
                          paddingTop: "0.25rem",
                          pr: 1,
                        }}
                      >
                        {randomPatrolCheckpoint?.reasons?.length > 1 ?
                         randomPatrolCheckpoint?.reasons?.join(", ")
                         : randomPatrolCheckpoint?.reasons}
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
                    className="flex w-[30%] rounded-lg border-[#2C5079] border-[1px] bg-slate-200 p-1 justify-center hover:cursor-pointer"
                    onClick={(e) => setOpenMapDetailView(true)}
                  >
                    <PatrolCheckpointMapComponent
                      zoom={16}
                      longlat={[{
                        center: randomPatrolCheckpoint.longLat.length === 2 ?
                                [randomPatrolCheckpoint.longLat[1] < 0 ? 0 : randomPatrolCheckpoint.longLat[1], randomPatrolCheckpoint.longLat[0] < 0 ? 0 : randomPatrolCheckpoint.longLat[0]]
                                : [0,0],
                        checkpoint: randomPatrolCheckpoint.checkPointName,
                        patroller: randomPatrolCheckpoint.patroller,
                        time: `${formatTime(randomPatrolCheckpoint?.startDateTime)} - ${formatTime(randomPatrolCheckpoint?.endDateTime)}`,
                        status: randomPatrolCheckpoint.endDateTime === null ? "Not Finish" : "Finished",
                        longlat: randomPatrolCheckpoint.longLat.length === 2 ?
                                [randomPatrolCheckpoint.longLat[1] < 0 ? 0 : randomPatrolCheckpoint.longLat[1], randomPatrolCheckpoint.longLat[0] < 0 ? 0 : randomPatrolCheckpoint.longLat[0]]
                                : [0,0],
                      }]}/>
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
                              <CheckListStatus normal={normalWord} abnormal={abnormalWord} status={row.Status} />
                            </div>
                          </TableCell>

                          <TableCell align="center" sx={{ padding: 0 }}>
                            {row.Image.length > 0
                              ? row.Image.map(
                                  (i: string | undefined, index: any) => (
                                    <Box key={index} sx={{ maxHeight: "100px",display: "flex", justifyContent: "center", mb: 1, cursor: "pointer"}}
                                         onClick={(e) => {setOpenImage(true); setImage(i); console.log("randomPatrolCheckpoint.longLat =", randomPatrolCheckpoint.longLat)}}>
                                      <img
                                        src={i}
                                        alt="Checklist Img"
                                        style={{
                                          maxWidth: "100%",
                                          borderRadius: "10px",
                                          maxHeight: "100px",
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
                                cursor: "pointer"
                              }}
                              onClick={(e) => {setOpenImage(true); setImage(img)}}
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
              <div className="flex w-full h-[329px] rounded-lg border-[#2C5079] border-[1px] bg-slate-200 p-1 justify-center">
                  <PatrolCheckpointMapComponent
                    zoom={16}
                    longlat={[{
                      center: randomPatrolCheckpoint.longLat.length === 2 ?
                                [randomPatrolCheckpoint.longLat[1] < 0 ? 0 : randomPatrolCheckpoint.longLat[1], randomPatrolCheckpoint.longLat[0] < 0 ? 0 : randomPatrolCheckpoint.longLat[0]]
                                : [0,0],
                        checkpoint: randomPatrolCheckpoint.checkPointName,
                        patroller: randomPatrolCheckpoint.patroller,
                        time: `${formatTime(randomPatrolCheckpoint?.startDateTime)} - ${formatTime(randomPatrolCheckpoint?.endDateTime)}`,
                        status: randomPatrolCheckpoint.endDateTime === null ? "Not Finish" : "Finished",
                        longlat: randomPatrolCheckpoint.longLat.length === 2 ?
                                [randomPatrolCheckpoint.longLat[1] < 0 ? 0 : randomPatrolCheckpoint.longLat[1], randomPatrolCheckpoint.longLat[0] < 0 ? 0 : randomPatrolCheckpoint.longLat[0]]
                                : [0,0],
                    }]}/>
                    {/* [["100.55826768112321", "13.715759496081468"],["100.55857312480582", "13.715866960484869"]] */}
                </div>
              {/* <Box className="flex">
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
              </Box> */}
            </div>
          </div>
        </>
      )}

      {openImage && (
        <>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              width: "450px",
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
                onClick={() => setOpenImage(false)}
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
              </Typography>
            </Box>
          </Box>

          <div className="bg-white rounded-b-lg shadow-lg min-h-[394px] max-h-[700px] w-[450px]">
            {/* Body */}
            <div className="max-h-[700px] overflow-auto p-2">
              <div className="flex w-full rounded-lg border-[#2C5079] border-[1px] bg-slate-200 p-1 justify-center">
                <img
                  src={image}
                  alt="Checklist Img"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "10px",
                    maxHeight: "100%",
                   }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {isLoading && <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-50">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>}
    </div>
  );
};

export default RandomPatrolDeatilView;
