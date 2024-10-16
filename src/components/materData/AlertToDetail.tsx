"use client";

import {
  Box,
  Typography,
  Button as Button2,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Button } from "@/components/ui/buttons/button";
import { VscRefresh } from "react-icons/vsc";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { FaSortDown } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";

type ShiftListType = {
  id: number;
  desc: any;
  workdays: any[];
  manpowers: ManpowerType[];
};

type RoundData = {
  id: number;
  number: any;
  startTimeHr: any;
  startTimeMin: any;
  finishTimeHr: any;
  finishTimeMin: any;
  totalTimeMin: any;
  isSameDay: any;
  shift: any;
  alertTo: any;
  isNeed: any;
  isStrictOrder: any;
};

type AreaListType = {
  areaId: number;
  areaName: any;
  totalChkPt: any;
  roundList: RoundData[];
  latestRoundID: number;
};

type ManpowerType = {
  id: any;
  nameInReport: string;
  roleId: any;
  quantity: number;
};

type detailType = {
    shiftName: string;
    
};

interface AlertToDatailProps {
  closeModal: () => void;
  selectedAlertTo: any;
  areaList: AreaListType[];
  shiftList: ShiftListType[];
}

const AlertToDatail = ({
  closeModal,
  selectedAlertTo,
  areaList,
  shiftList,
}: AlertToDatailProps) => {


  function handleCloseAlertToDetail() {
    closeModal();
  }

  const handleUndo = () => {};

  const handleDelete = () => {};

  const handleSave = () => {};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "700px",
          backgroundColor: "#D9F0EC",
          paddingY: "5px",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            px: "10px",
          }}
        >
          <Button2
            sx={{
              color: "#1D7A9B",
              backgroundColor: "white",
              width: "20%",
              border: "1px solid #1D7A9B",
              fontWeight: 700,
            }}
            onClick={() => handleCloseAlertToDetail()}
          >
            Back
          </Button2>
          <Box sx={{ width: "80%", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "1.125rem", // text-lg equivalent
                fontWeight: 700,
                color: "#1D7A9B",
                mt: "5px",
                mr: "25px",
              }}
            >
              {selectedAlertTo.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <div className="bg-white rounded-b-lg shadow-lg min-h-[544px] max-h-[654px] w-[700px]">
        {/* Body */}
        <div className="max-h-[528px] min-h-[528px] overflow-auto">
          <Box className="w-full px-6 py-2 rounded-t-lg pb-6">
            {areaList.map((area, index) => (
              <div className="mb-2" key={index}>
                <Accordion sx={{ mb: "0.5rem" }}>
                  <AccordionSummary
                    sx={{ borderBottom: "1px solid #1D7A9B" }}
                    expandIcon={<FaSortDown />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Box className="w-full flex justify-between">
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#1D7A9B",
                          fontWeight: 700,
                        }}
                      >
                        {area.areaName}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                          <TableCell
                            align="center"
                            className="w-[20%]"
                          ></TableCell>
                          <TableCell align="center" className="w-[30%]">
                            Shift
                          </TableCell>
                          <TableCell align="center" className="w-[25%]">
                            Round
                          </TableCell>
                          <TableCell align="center" className="w-[25%]">
                            Time
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {shiftList.map((row, index) => (
                          <TableRow
                            key={index}
                            className={`${
                              index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                            }`}
                            sx={{
                              "& .MuiTableCell-root": {
                                padding: "10px 20px 10px 20px", // Customize border color
                              },
                            }}
                          >
                            <TableCell align="left">
                              <Checkbox
                                className="mb-2 border-[#1D7A9B] data-[state=checked]:bg-[#4C9BF5]"
                                checked={undefined}
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent row click
                                  //handleSelected(index);
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">shift</TableCell>

                            <TableCell align="center">Round</TableCell>

                            <TableCell align="center">Time</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </Box>
        </div>
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
      </div>
    </>
  );
};

export default AlertToDatail;
