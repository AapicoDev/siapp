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
  CircularProgress,
} from "@mui/material";
import { Button } from "@/components/ui/buttons/button";
import { VscRefresh } from "react-icons/vsc";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { FaSortDown } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { updateRoundData, updateRoundDataWithHandle } from "@/app/lib/api";
import { useConfirmDialog } from "../../components/ui/alertDialog/confirmDialog";

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
  status: string;
};

type AreaListType = {
  areaId: number;
  areaName: any;
  totalChkPt: any;
  roundList: RoundData[];
  roundIdList: string[];
  latestRoundID: number;
  areaStatus: string;
};

type ManpowerType = {
  id: any;
  nameInReport: string;
  positionId: any;
  quantity: number;
};

type detailType = {
    shiftName: string;
    
};

type selectedDelete = {
  isSelected: boolean;
  roundId: any;
};


interface AlertToDatailProps {
  closeModal: () => void;
  selectedAlertTo: any;
  areaList: AreaListType[];
  shiftList: ShiftListType[];
  setAreaList: (value: any) => void;
}

const AlertToDatail = ({
  closeModal,
  selectedAlertTo,
  areaList,
  shiftList,
  setAreaList
  
}: AlertToDatailProps) => {

  const [selected, setSelected] = useState<selectedDelete[]>(
    areaList.flatMap(area => 
      area.roundList
      .filter(round => round.alertTo.includes(selectedAlertTo.id))
      .map(round => ({
        roundId: round.id,
        isSelected: false
      }))
    )
  );
  const [areas, setAreas] = useState<AreaListType[]>(areaList);
  const [isEnbleSave, setIsEnbleSave] = useState<boolean>(false);
  const [isEnbleUndo, setIsEnbleUndo] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();

  function handleCloseAlertToDetail() {
    closeModal();
  }

  useEffect(() => {
    setSelected( areas.flatMap(area => 
      area.roundList
      .filter(round => round.alertTo.includes(selectedAlertTo.id))
      .map(round => ({
        roundId: round.id,
        isSelected: false
      }))
    ))
  }, [areas]);

  const handleUndo = () => {
    setAreas(areaList);
    setAreaList(areaList);
    setIsEnbleSave(false);
    console.log("shiftList", shiftList);
    console.log("areaList = ", areaList)
  };

  const handleDelete = () => {
    const filterRound = selected.filter(select => select.isSelected).map(s =>s.roundId);
    const removedAlertToFromRoundInArea = areaList.map(area => ({
        ...area,
        roundList: area.roundList.map(round => {
          if (filterRound.includes(round.id)) {
            return {
              ...round,
              alertTo: round.alertTo.filter((a: string) => a !== selectedAlertTo.id),
              status: "edit"
            };
          }
          return round;
        })
      }))
    console.log("selectedAlertTo = ", selectedAlertTo)
    console.log("filterRound = ", filterRound)
    setAreas(removedAlertToFromRoundInArea);
    setIsEnbleSave(true);
  };

  const handleSave = async () => {
    setIsEnbleUndo(false);
    console.log("selectedAlertTo = ", selectedAlertTo);
    console.log("selected =", selected);
    console.log("areaList =", areas);
    const editedRound = areas.flatMap(area => area.roundList).filter(round => round.status === "edit");
    console.log("editedRound =", editedRound);
    if(editedRound?.length > 0){
      const dataToSubmit =
      editedRound?.map((updateRound) => {
        return {
          documentId: updateRound.id,
          updateFields: {
            alertTo: updateRound.alertTo,
          }
         }
      })
      console.log("dataToSubmit =", dataToSubmit);
      setIsLoading(true);
      const updateRoundResult = await updateRoundDataWithHandle(dataToSubmit);
      setIsLoading(false);
      if(updateRoundResult.successfulUpdates !== null){
        const areaAfterUpdatedRound = areas.map(area => ({
          ...area,
          roundList: area.roundList.map(round => {
          if (round.status === "edit") {
            return {
              ...round,
              status: "existed"
            };
          }
          return round;
          })
        }))
        setAreaList(areaAfterUpdatedRound);
        if(updateRoundResult.failedUpdates?.length === 0){
          const confirmApprove = await confirmDialog(
            "Save Patrol Alert List of Round data Success",
            "Save Patrol Alert List of Round Data successfully.",
            true,
            "success"
          );
        }
        else {
          const confirmApprove = await confirmDialog(
            "Some Patrol Alert List of Round data failed to update",
            `Some Patrol Alert List of Round data failed to update : \n ${updateRoundResult.failedUpdates}` ,
            true,
            "Warning"
          );
        }
      }
      else{
        const confirmApprove = await confirmDialog(
          "Error to update Patrol Alert List of round data",
          `${updateRoundResult.failedUpdates}`,
          true, "danger"
        );
      }
    }
    
  };

  const handleSelected = (roundId: any) => {
    const newSelected = [...selected];
    const index = newSelected.findIndex(s => s.roundId === roundId);
    newSelected[index].isSelected = !newSelected[index].isSelected;
    setSelected(newSelected);
    console.log("newSelected =", newSelected);
  };

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
            {areas.map((area, index) => (
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
                        {area.roundList?.map((round, index) => (
                          round.alertTo?.includes(selectedAlertTo.id) ? 
                          (<TableRow
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
                                  handleSelected(round.id);
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              {shiftList.find(s => s.id === round.shift)?.desc}
                            </TableCell>

                            <TableCell align="center">{round.number}</TableCell>

                            <TableCell align="center">
                              {round.startTimeHr}:{round.startTimeMin} - {round.finishTimeHr}:{round.finishTimeMin}
                              </TableCell>
                          </TableRow>) : <TableRow key={index}></TableRow>))}
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
            disabled={!isEnbleUndo}
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
              disable={!selected.some(s => s.isSelected)}
            />
            <SaveBtnFooter onSaveBtnFooterClick={handleSave} disableBtn={!isEnbleSave}/>
          </Box>
        </Box>
      </div>

      {/* Confirm dialog */}
      {ConfirmAlertDialog}

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </>
  );
};

export default AlertToDatail;
