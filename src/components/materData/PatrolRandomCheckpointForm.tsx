"use client";

import { Box, Typography, Button as Button2, CircularProgress } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { Textbox } from "../ui/textboxs/textbox";
import Image from "next/image";
import { Selector3 } from "../ui/selectors/selector3";
import { LabelTextDisplayBox } from "../ui/labelTextDisplayBox";
import { Checkbox } from "../ui/checkbox3";
import { Button } from "../ui/buttons/button";
import { Trash } from "iconsax-react";
import { AddButton } from "../ui/buttons/addButton";
import { useEffect, useState } from "react";
import data from "@/app/mockData.json";
import { VscRefresh } from "react-icons/vsc";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import {
  addNewRandomPatrol,
  deleteCheckpoint,
  deleteRandomPatrol,
  getAllMasterCheckListData,
  getMasterCheckpointData,
  updateCheckpoint,
  updateRandomPatrol,
} from "../../app/lib/api";
import { useConfirmDialog } from "../ui/alertDialog/confirmDialog";

type RandomPatrolType = {
  id: any;
  randomPatrolReason: any;
  totalCheckList: number;
  checklist: any[];
};
type CheckListData = {
  id: any;
  desc: any;
  normalStatus: any;
  abnormalStatus: string;
  //isDefault: boolean;
  isNeedAttachPhoto: boolean;
  attachPhotoAmount: number;
};

interface PatrolRandomCheckpointFormProp {
  selectedRow: RandomPatrolType;
  closeModal: any;
  isEdit: boolean;
  checklistItemSource: CheckListData[];
  setIsAddOrUpdateSuccess: (value: any) => void;
}

const PatrolRandomCheckpointForm = ({
  selectedRow,
  closeModal,
  isEdit,
  checklistItemSource,
  setIsAddOrUpdateSuccess,
}: PatrolRandomCheckpointFormProp) => {
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [allCheckListDatas, setAllCheckListDatas] =
    useState<CheckListData[]>(checklistItemSource);
  const [formData, setFormData] = useState<RandomPatrolType>(selectedRow);
  const [formHeader, setFormHeader] = useState(
    isEdit ? "View / Edit Random Patrol Reason" : "+ New Random Patrol Reason"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    //initialData();
  }, []);

  const initialData = () => {
    //checkListsOfCheckpoint();
  };

  function handleCloseForm() {
    closeModal(isEdit);
  }

  const checkListsOfCheckpoint = async () => {
    //setIsLoading(true);
    const fetchCheckList = await getAllMasterCheckListData();
    const allCheckList = fetchCheckList?.documents;
    console.log("fetchCheckList =", fetchCheckList);
    setAllCheckListDatas(
      allCheckList?.map((checkList) => {
        return {
          id: checkList.$id,
          desc: checkList.name,
          normalStatus: checkList.normalStatus,
          abnormalStatus: checkList.abnormalStatus,
          isNeedAttachPhoto: checkList.isNeedAttachPhoto,
          attachPhotoAmount:
            checkList.attachPhotoAmount === null
              ? 0
              : checkList.attachPhotoAmount,
        };
      }) || allCheckListDatas
    );
    //setIsLoading(false);
  };

  const handleFieldDataInCheckpointChange = (
    id: any,
    field: keyof RandomPatrolType,
    value: any,
    index?: number
  ) => {
    let updatedData = { ...formData, [field]: value };
    if (field === "checklist" && index !== undefined) {
      const updatedCheckListId = [...formData.checklist];
      updatedCheckListId[index] = value;

      updatedData = { ...formData, [field]: updatedCheckListId };
    } else {
      updatedData = { ...formData, [field]: value };
    }
    setFormData(updatedData);
  };

  const addCheckList = () => {
    const updatedData = { ...formData, checklist: [...formData.checklist, ""] };
    setFormData(updatedData);
  };

  const removeCheckList = (index: number) => {
    if (formData.checklist.length > 0) {
      const updatedData = {
        ...formData,
        checklist: formData.checklist.filter((_, i) => i !== index),
      };
      setFormData(updatedData);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await addNewRandomPatrol(formData);
    console.log("result =", result);
    setIsLoading(false);
    if (result !== null) {
      const confirmApprove = await confirmDialog(
        "Add Success",
        "Add New Random Patrol Reason successfully !",
        true
      );
      setIsAddOrUpdateSuccess(true);
      if (confirmApprove) handleCloseForm();
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const result = await updateRandomPatrol(formData.id, formData);
    setIsLoading(false);
    console.log("result =", result);
    if (result !== null) {
      const confirmApprove = await confirmDialog(
        "Updated Success",
        "Update Random Patrol Reason successfully !",
        true
      );
      setIsAddOrUpdateSuccess(true);
      if (confirmApprove) handleCloseForm();
    }
  };

  const handleDelete = async () => {
    const confirmApprove = await confirmDialog(
       "Delete Random Parol Reason",
       "Do you want to delete this Random Parol Reason?"
    );
    if (confirmApprove) {
      setIsLoading(true);
      const deleteResult = await deleteRandomPatrol(formData.id);
      setIsLoading(false);
      console.log("deleteResult =", deleteResult);
      if (deleteResult !== null) {
        setIsAddOrUpdateSuccess(true);
        handleCloseForm();
      }
    }
  };

  const handleUndo = () => {
    setFormData(selectedRow);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          width: "750px",
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

      <div className="bg-white rounded-b-lg shadow-lg min-h-fit max-h-[654px] w-[750px]">
        {/* Body */}
        <div className="max-h-[578px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <Box className="mb-1">
              <Textbox
                header={"Random Parol Reason"}
                inputType={"text"}
                placeHolder={"Type here..."}
                handleChange={(e: any) =>
                  handleFieldDataInCheckpointChange(
                    formData.id,
                    "randomPatrolReason",
                    e.target.value
                  )
                }
                value={formData.randomPatrolReason}
                name={"checkPointName"}
              />
              <Box className="w-full flex justify-between mt-3">
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    paddingBottom: "0.25rem",
                    color: "#2C5079",
                    fontWeight: "700",
                  }}
                >
                  Check List
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#4C9BF5",
                    textDecorationLine: "underline",
                  }}
                >
                  Total: {formData?.checklist.length} checklist
                  {formData?.checklist.length !== undefined &&
                  formData?.checklist.length > 1
                    ? "s"
                    : ""}
                </Typography>
              </Box>
            </Box>
            {formData?.checklist?.map((checkListId: any, index: number) => (
              <Box
                key={index}
                sx={{
                  bgcolor: "#EBF4F6",
                  width: "100%",
                  display: "flex",
                  p: 2,
                  mb: 1.5,
                  borderRadius: "10px",
                }}
              >
                <Box className="w-11 h-10 bg-[#37B7C3] rounded-lg justify-center text-white p-2 mr-2">
                  {index + 1}
                </Box>
                <Box className="space-y-3 w-[90%] justify-center">
                  <Box sx={{ display: "flex", mr: 0.5 }} className="space-x-2">
                    <Box className="w-full">
                      <Selector3
                        selectorLabel={"Check List"}
                        itemSource={allCheckListDatas}
                        handleChange={handleFieldDataInCheckpointChange}
                        selectedVal={checkListId}
                        name={"checklist"}
                        id={checkListId.id}
                        index={index}
                      />
                    </Box>
                  </Box>

                  <Box className="space-x-3 flex">
                    <Box sx={{ width: "50%" }}>
                      <LabelTextDisplayBox
                        label={"Status: Normal"}
                        text={
                          allCheckListDatas.find((c) => c.id === checkListId)
                            ?.normalStatus
                        }
                      />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <LabelTextDisplayBox
                        label={"Status: Abnormal"}
                        text={
                          allCheckListDatas.find((c) => c.id === checkListId)
                            ?.abnormalStatus
                        }
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      mr: 0.5,
                      textAlign: "left",
                    }}
                    className="space-x-3"
                  >
                    <Checkbox
                      disabled={
                        !allCheckListDatas.find((c) => c.id === checkListId)
                          ?.isNeedAttachPhoto
                      }
                      className="w-9 h-9 mt-1 cursor-default"
                      checked={
                        allCheckListDatas.find((c) => c.id === checkListId)
                          ?.isNeedAttachPhoto
                      }
                      onCheckedChange={undefined}
                    />
                    <Typography
                      sx={{
                        paddingRight: 1,
                        pt: 1,
                        color: "#2C5079",
                      }}
                    >
                      Attach Photos
                    </Typography>
                    <Typography
                      sx={{
                        pt: 1,
                        color: "#2C5079",
                      }}
                    >
                      Amount :
                    </Typography>
                    <Box sx={{ width: "27%" }}>
                      <LabelTextDisplayBox
                        text={
                          allCheckListDatas.find((c) => c.id === checkListId)
                            ?.attachPhotoAmount
                        }
                      />
                    </Box>
                  </Box>
                </Box>

                <Box className="flex align-middle ml-2 justify-around">
                  <Button
                    onClick={() => removeCheckList(index)}
                    className="bg-[#F66262] rounded-lg"
                  >
                    <Trash color="white" />
                  </Button>
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <AddButton onAddBtnClick={(e) => addCheckList()} />
            </Box>
          </Box>
        </div>

        {/* Footer */}
        {!isEdit && (
          <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
            <Button
              className="w-28 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                                   disabled:bg-[#83A2AD]"
              onClick={() => handleSubmit()}
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

        {/* Confirm dialog */}
        {ConfirmAlertDialog}

        {isLoading && (
              <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              </div>
            )}
      </div>
    </div>
  );
};

export default PatrolRandomCheckpointForm;
