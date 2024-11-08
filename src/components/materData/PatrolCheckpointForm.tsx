"use client";

import {
  Box,
  Typography,
  Button as Button2,
  SelectChangeEvent,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  CircularProgress,
} from "@mui/material";
import { Input } from "@/components/ui/textboxs/input";
import { Button } from "@/components/ui/buttons/button";
import { Clock, CloseCircle, TickCircle, Trash } from "iconsax-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { VscRefresh } from "react-icons/vsc";
import { Selector } from "../ui/selectors/selector";
import { Textbox } from "../ui/textboxs/textbox";
import { AddButton } from "../ui/buttons/addButton";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import data from "@/app/mockData.json";
import { CustomStepIcon } from "../ui/customStepIcon";
import { FaSortDown } from "react-icons/fa6";
import LabelTextField2 from "../ui/textboxs/LabelTextField2";
import FloatingLabelBox from "../ui/floatingLabelBox";
import { LabelSelector3 } from "../ui/selectors/labelSelector3";
import { Checkbox } from "@/components/ui/checkbox3";
import CheckBoxDropDown from "../ui/checkBoxDropDown";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox2";
import { CheckCircle } from "../ui/checkCircle";
import { CrossCircle } from "../ui/crossCircle";
import Image from "next/image";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CiKeyboard } from "react-icons/ci";
import {
  addNewAssignedManpower,
  addNewCheckpoint,
  deleteAssignedManpower,
  deleteCheckpoint,
  getAllMasterCheckListData,
  getMasterAreaDataWithCustomerId,
  getMasterAssignedManpowerData,
  getMasterCheckpointData,
  getMasterManpowerRoleData,
  updatAssignedManpower,
  updateAreaData,
  updateCheckpoint,
} from "../../app/lib/api";
import { LabelTextDisplayBox } from "../ui/labelTextDisplayBox";
import { Selector3 } from "../ui/selectors/selector3";
import LabelTextField3 from "../ui/textboxs/labelTextField3";
import {
  getAllMasterAreaData,
  getMasterRoundData,
  getMasterShiftData,
} from "@/app/lib/api";
import { Models } from "appwrite";

import MapComponent from "././../MapView";
import { useConfirmDialog } from "../ui/alertDialog/confirmDialog";

interface PatrolCheckpointFromProp {
  selectedRow: any;
  closeModal: any;
  isEdit: boolean;
  custList: any[];
  areaList: any[];
  setIsAddOrUpdateSuccess: (value: any) => void;
}

type PreliminaryData = {
  customerId: any;
  areaId: any;
  rounds: Models.Document[] | undefined;
};

type CheckPointData = {
  checkPointId: any;
  checkPointName: any;
  areaId: any;
  locationName: string;
  latitude: any;
  longitude: any;
  altitude: any;
  isRestrictionTime: boolean;
  timeLimit: any;
  checkListId: any[];
  status: any;
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

type ShiftData = {
  shiftId: any;
  shiftName: any;
};

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

const PatrolCheckpointFrom = ({
  selectedRow,
  closeModal,
  isEdit,
  custList,
  areaList,
  setIsAddOrUpdateSuccess,
}: PatrolCheckpointFromProp) => {
  const [areas, setAreas] = useState<any[]>(areaList);
  const [formHeader, setFormHeader] = useState(
    isEdit ? "View / Edit Patrol" : "+ New Patrol"
  );
  const [formData, setFormData] = useState(
    selectedRow || {
      customerId: null,
      customerName: "",
      areaId: null,
      qrCode: "",
      isActive: true,
    }
  );
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Preliminary", "Check Point", "Check List", "Manpower"];
  const [tabValue, setTabValue] = useState("1");
  const [prelimData, setPrelimData] = useState<PreliminaryData>({
    areaId: selectedRow?.areaId,
    customerId: selectedRow?.customerId,
    rounds: [],
  });
  const [shiftsOfCustomer, setShiftsOfCustomer] = useState<any[]>([]);
  const [checkPointDatas, setCheckPointDatas] = useState<CheckPointData[]>([]);
  const [allCheckListDatas, setAllCheckListDatas] = useState<CheckListData[]>(
    []
  );
  const [shiftDatas, setShiftDatas] = useState<ShiftData[]>([]);
  const [uniqueShiftsInPrelim, setUniqueShiftsInPrelim] = useState<any[]>([]);
  const [filteredManpowerData, setfilteredManpowerData] = useState<any[]>([]);
  const [assignedManpowers, setAssignedManpowers] = useState<any[]>([]);
  const [checkpointItemSource, setCheckpointItemSource] = useState<any[]>([]);
  const initialCheckList = [
    "67107c37000aef40349b",
    "67107c25002ad97f6c07",
    "67107c010002f3401f5f",
    "670f5609001a28173ad0",
  ];
  const [checkpointRemoveList, setCheckpointRemoveList] = useState<any[]>([]);
  const [assignedManpowerRemoveList, setAssignedManpowerRemoveList] = useState<
    any[]
  >([]);
  const [assignedManpowerAddList, setAssignedManpowerAddList] = useState<any[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employeeItemSource, setEmployeeItemSource] = useState<any[]>([]);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();

  useEffect(() => {
    roundsOfArea();
    checkpointsOfArea();
  }, [prelimData.areaId]);

  useEffect(() => {
    checkListsOfCheckpoint();
  }, [selectedRow]);

  const roundsOfArea = async () => {
    setIsLoading(true);
    const rounds = await getMasterRoundData(prelimData.areaId);
    const filteredRound = rounds?.documents.filter(
      (round) => round.isActive === true
    );
    const updatedPrelimData = { ...prelimData, ["rounds"]: filteredRound };
    console.log("updatedPrelimData Round =", updatedPrelimData);
    setPrelimData(updatedPrelimData);

    const uniqueShiftIds = Array.from(
      new Set(updatedPrelimData.rounds?.map((item) => item.shiftId))
    );
    console.log("uniqueShiftIds =", uniqueShiftIds);
    setUniqueShiftsInPrelim(uniqueShiftIds);

    const shifts = await getMasterShiftData("customerID", prelimData.customerId);
    console.log("shifts= ", shifts);
    const filteredShifts = shifts?.documents
      .filter((s) => s.customerID === prelimData.customerId)
      .map((shift) => {
        return {
          shiftId: shift.$id,
          shiftName: shift.shiftName,
        };
      });
    console.log("filteredShifts =", filteredShifts);
    setShiftsOfCustomer(filteredShifts || shiftsOfCustomer);
    setIsLoading(false);
  };

  const checkpointsOfArea = async () => {
    setIsLoading(true);
    const checkpoints = await getMasterCheckpointData(prelimData.areaId);
    const filteredCheckpoint: CheckPointData[] =
      checkpoints?.documents.map((checkPoint) => {
        return {
          checkPointId: checkPoint.$id,
          checkPointName: checkPoint.checkpointName,
          areaId: checkPoint.areaId,
          locationName: checkPoint.locationName,
          latitude: checkPoint.latitude,
          longitude: checkPoint.longitude,
          altitude: checkPoint.altitude,
          isRestrictionTime: checkPoint.isRestrictionTime,
          timeLimit: checkPoint.timeLimit,
          checkListId: checkPoint.checkListId,
          status: "existed",
        };
      }) || [];
    console.log("filteredCheckpoint =", filteredCheckpoint);
    setCheckPointDatas(filteredCheckpoint);

    const itemsource = filteredCheckpoint.map((c) => {
      return {
        id: c.checkPointId,
        desc: c.checkPointName,
      };
    });
    setCheckpointItemSource(itemsource);
    setIsLoading(false);
  };

  const checkListsOfCheckpoint = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    console.log("formData", formData);
  };

  const addCheckPoint = () => {
    setCheckPointDatas([
      ...checkPointDatas,
      {
        checkPointId: Date.now(),
        checkPointName: "",
        areaId: prelimData.areaId,
        locationName: "",
        latitude: "",
        longitude: "",
        altitude: "",
        isRestrictionTime: false,
        timeLimit: 0,
        checkListId: initialCheckList,
        status: "new",
      },
    ]);
  };

  const removeCheckpoint = (id: any, status: any, selectedIndex: number) => {
    if (status === "existed" || status === "edit")
      setCheckpointRemoveList(checkpointRemoveList.concat(id));
    if (checkPointDatas.length > 0) {
      const filteredCheckpoints = checkPointDatas.filter(
        (checkpoint, index) => index !== selectedIndex//checkpoint.checkPointId !== id
      );
      setCheckPointDatas(filteredCheckpoints);
    }
  };

  const addCheckList = (checkpointId: any) => {
    const updatedCheckPointDatas = checkPointDatas.map((checkpoint) =>
      checkpoint.checkPointId === checkpointId
        ? { ...checkpoint, checkListId: [...checkpoint.checkListId, ""] }
        : checkpoint
    );
    console.log("updatedCheckPointDatas =", updatedCheckPointDatas);
    setCheckPointDatas(updatedCheckPointDatas);
  };

  const removeChecklist = (checkpointId: any, checkListId: any, index: any) => {
    const updatedCheckPointDatas = checkPointDatas.map((checkpoint) =>
      checkpoint.checkPointId === checkpointId &&
      checkpoint.checkListId.length > 0
        ? {
            ...checkpoint,
            checkListId: checkpoint.checkListId.filter((_, i) => i !== index),
            status: checkpoint.status === "new" ? checkpoint.status : "edit",
          }
        : checkpoint
    );
    setCheckPointDatas(updatedCheckPointDatas);
  };

  const handleUndo = () => {
    checkpointsOfArea();
    initialShiftData();
    setCheckpointRemoveList([]);
    setAssignedManpowerAddList([]);
    setAssignedManpowerRemoveList([]);
  };

  const handleDelete = () => {};

  const handleSave = async () => {
    let addNewCheckpointResult, updateCheckpointResult, deleteCheckpointResult;
    let addNewAssignedManpowerResult, updateAssignedManpowerResult, deleteAssignedManpowerResult;
    let updateNewCheckpoints = checkPointDatas.map((item) => item.checkPointId);

      //save new Checkpoint
      console.log("checkPointDatas = ", checkPointDatas);
      const newCheckpoints = checkPointDatas.filter(
        (checkpoint) => checkpoint.status === "new"
      );
      if (newCheckpoints.length > 0) {
        const dataToSubmit =
          newCheckpoints?.map((checkPoint) => {
            return {
              checkpointName: checkPoint.checkPointName,
              areaId: checkPoint.areaId,
              locationName: checkPoint.locationName,
              latitude: checkPoint.latitude,
              longitude: checkPoint.longitude,
              altitude: checkPoint.altitude,
              isRestrictionTime: checkPoint.isRestrictionTime,
              timeLimit: parseInt(checkPoint.timeLimit),
              checkListId: checkPoint.checkListId,
            };
          }) || [];
        setIsLoading(true);
        addNewCheckpointResult = await addNewCheckpoint(dataToSubmit);
        setIsLoading(false);
        //console.log("addNewCheckpointResult", addNewCheckpointResult);
        if (addNewCheckpointResult) {
          updateNewCheckpoints = checkPointDatas
            .filter((item) => item.status === "existed" || item.status === "edit")
            .map((item) => item.checkPointId);
          updateNewCheckpoints = updateNewCheckpoints.concat(addNewCheckpointResult);
          console.log("updateNewCheckpoints", updateNewCheckpoints);
          const resultUpdateCheckpoitsOfArea = await updateAreaData(
            prelimData.areaId,
            { checkPointIDs: updateNewCheckpoints }
          );
          checkpointsOfArea();
          setIsAddOrUpdateSuccess(true);
        }
      }

      //delete checkpoints
      if (checkpointRemoveList.length > 0) {
        setIsLoading(true);
        deleteCheckpointResult = await deleteCheckpoint(checkpointRemoveList);
        setIsLoading(false);
        //console.log("deleteResult", deleteCheckpointResult);
        if (deleteCheckpointResult) {
          setCheckpointRemoveList([]);
          console.log("updateNewCheckpoints delete", updateNewCheckpoints);
          setIsLoading(true);
          const resultUpdateCheckpoitsOfArea = await updateAreaData(
            prelimData.areaId,
            { checkPointIDs: updateNewCheckpoints }
          );
          setIsLoading(false);
          checkpointsOfArea();
          setIsAddOrUpdateSuccess(true);
        }
      }

      //edit checkpoints
      const editCheckpoints = checkPointDatas.filter(
        (checkpoint) => checkpoint.status === "edit"
      );
      console.log("editCheckpoints = ", editCheckpoints);
      if (editCheckpoints.length > 0) {
        const dataToSubmit =
          editCheckpoints?.map((checkPoint) => {
            return {
              documentId: checkPoint.checkPointId,
              updateFields: {
                checkpointName: checkPoint.checkPointName,
                areaId: checkPoint.areaId,
                locationName: checkPoint.locationName,
                latitude: checkPoint.latitude,
                longitude: checkPoint.longitude,
                altitude: checkPoint.altitude,
                isRestrictionTime: checkPoint.isRestrictionTime,
                timeLimit: parseInt(checkPoint.timeLimit),
                checkListId: checkPoint.checkListId,
              },
            };
          }) || [];
        console.log("dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        updateCheckpointResult = await updateCheckpoint(dataToSubmit);
        setIsLoading(false);
        //console.log("updateCheckpointResult =", updateCheckpointResult);
        checkpointsOfArea();
      }

    //Manpower Tab
      //delete assigned Manpower
      if (assignedManpowerRemoveList.length > 0) {
        console.log("assignedManpowerRemoveList=", assignedManpowerRemoveList);
        setIsLoading(true);
        deleteAssignedManpowerResult = await deleteAssignedManpower(
          assignedManpowerRemoveList
        );
        setIsLoading(false);
        console.log("deleteResult", deleteAssignedManpowerResult);
        setAssignedManpowerRemoveList([]);
      }

      if (assignedManpowers.length > 0) {
        //add new assigned Mnapower
        const newItems = assignedManpowers.filter((item) =>
          item.id?.includes("new")
        );
        if (newItems.length > 0) {
          console.log("filterAdd", newItems);
          const addataToSubmit =
            newItems?.map((man) => {
              return {
                employee_Id: man.employee_Id,
                employeeName: man.employeeName,
                shift_Id: man.shift_Id,
                checkpoint_IDs: man.checkpoint_IDs,
                manpowerRole_Id: man.manpowerRole_Id,
              };
            }) || [];
          console.log("dataToSubmit", addataToSubmit);
          setIsLoading(true);
          addNewAssignedManpowerResult = await addNewAssignedManpower(addataToSubmit);
          setIsLoading(false);
        }

        //update assigned Mnapower
        const updateItems = assignedManpowers.filter(
          (item) => !item.id.includes("new")
        );
        console.log("updateItems =", updateItems);
        if (updateItems.length > 0) {
          const dataToSubmit =
            updateItems?.map((man) => {
              return {
                documentId: man.id,
                updateFields: {
                  employee_Id: man.employee_Id,
                  employeeName: man.employeeName,
                  shift_Id: man.shift_Id,
                  checkpoint_IDs: man.checkpoint_IDs,
                  manpowerRole_Id: man.manpowerRole_Id,
                },
              };
            }) || [];
          console.log("dataToSubmit =", dataToSubmit);
          setIsLoading(true);
          updateAssignedManpowerResult = await updatAssignedManpower(dataToSubmit);
          setIsLoading(false);
          console.log("updateResult =", updateAssignedManpowerResult);
        }
        initialShiftData();
      }

      if (addNewCheckpointResult !== null && updateCheckpointResult !== null && deleteCheckpointResult !== null &&
          addNewAssignedManpowerResult !== null && updateAssignedManpowerResult !== null && deleteAssignedManpowerResult !== null)
          {
        const confirmApprove = await confirmDialog(
          "Save data Success",
          "Save Data of Patrol Checkpoint successfully.",
          true
        );
        setIsAddOrUpdateSuccess(true);
      }
      else {
        const confirmApprove = await confirmDialog(
          "Error to save data.",
          "Error to save data",
          true
        );
        setIsAddOrUpdateSuccess(false);
      }
  };

  function handleCloseCustomerForm() {
    closeModal(isEdit);
  }

  const handleActiveChange = (checked: boolean) => {
    setFormData((prevData: any) => ({ ...prevData, isActive: checked }));
  };
  const handleNext = () => {
    if (activeStep < steps.length - 1)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFieldPreliminaryChange = async (e: any) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    let updatedPrelimData = { ...prelimData, [fieldName]: value };
    console.log("updatedPrelimData = ", updatedPrelimData);
    if (fieldName === "customerId") {
      setIsLoading(true);
      const areaOfCustomer = await getMasterAreaDataWithCustomerId(value);
      const custAreaList = areaOfCustomer?.documents.map((area) => {
        return {
          id: area.$id,
          desc: area.name,
        };
      }) || [];
      console.log("custAreaList = ", custAreaList);
      setAreas(custAreaList);
      updatedPrelimData = {
        ...updatedPrelimData,
        ["areaId"]: custAreaList[0].id,
      };
    }
    console.log("updatedPrelimData = ", updatedPrelimData);
    setPrelimData(updatedPrelimData);
    setIsLoading(false);
  };

  const handleFieldCheckpointChange = (e: any, id: any) => {
    const fieldName: keyof CheckPointData = e.target.name;
    const value = e.target.value;

    const updatedCheckpointList = checkPointDatas.map((checkpoint) =>
      checkpoint.checkPointId === id
        ? { ...checkpoint, [fieldName]: value }
        : checkpoint
    );
    setCheckPointDatas(updatedCheckpointList);
  };

  const handleFieldDataInCheckpointChange = (
    checkpointId: any,
    field: keyof CheckPointData,
    value: any,
    selectedIndex?: number
  ) => {
    if (field === "checkListId") {
      const checkpointList: CheckPointData[] = checkPointDatas.map(
        (checkpoint) => {
          if (checkpoint.checkPointId === checkpointId) {
            if (selectedIndex !== undefined) {
              const updatedCheckListId = [...checkpoint.checkListId];
              updatedCheckListId[selectedIndex] = value;

              return {
                ...checkpoint,
                checkListId: updatedCheckListId,
                status: checkpoint.status != "new" ? "edit" : "new",
              };
            }
          }
          return checkpoint;
        }
      );
      setCheckPointDatas(checkpointList);
    } else {
      let updatedCheckpointList = checkPointDatas.map((checkpoint) =>
        checkpoint.checkPointId === checkpointId
          ? {
              ...checkpoint,
              [field]: value,
              status: checkpoint.status != "new" ? "edit" : "new",
            }
          : checkpoint
      );
      if (field === "isRestrictionTime" && value === false) {
        updatedCheckpointList = updatedCheckpointList.map((checkpoint) =>
          checkpoint.checkPointId === checkpointId
            ? { ...checkpoint, ["timeLimit"]: 0 }
            : checkpoint
        );
      }
      setCheckPointDatas(updatedCheckpointList);
    }
  };

  const handleFieldManpowerTypeChange = (
    id: any,
    id2: any,
    field: any,
    value: any
  ) => {
    setAssignedManpowers(
      assignedManpowers.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              [field]: value,
              ["employeeName"]:
                field === "employee_Id"
                  ? employeeItemSource.find((empId) => empId.id === value).desc
                  : emp.employeeName,
            }
          : emp
      )
    );
  };

  const initialShiftData = async () => {
    const filteredshiftDatas: ShiftData[] = uniqueShiftsInPrelim.map((s) => {
      return {
        shiftId: s,
        shiftName: shiftsOfCustomer.find((shift) => shift.shiftId === s)
          .shiftName,
      };
    });
    console.log("shiftDatas =", filteredshiftDatas);
    setShiftDatas(filteredshiftDatas);

    setIsLoading(true);
    //use unique shiftIds to find manpower roles
    if(uniqueShiftsInPrelim.length > 0){
      const manpowerRoles = await getMasterManpowerRoleData(uniqueShiftsInPrelim);
      setfilteredManpowerData(manpowerRoles?.documents || []);

      //use unique shiftIds to find assigned mnapowers
    const assignedManpower = await getMasterAssignedManpowerData(
      uniqueShiftsInPrelim
    );
    console.log("assignedManpower =", assignedManpower);
    const mappedAssigned =
      assignedManpower?.documents.map((man) => {
        return {
          id: man.$id,
          employee_Id: man.employee_Id,
          employeeName: man.employeeName,
          role_Name: man.role_Name,
          shift_Id: man.shift_Id,
          checkpoint_IDs: checkpointItemSource.filter(item => man.checkpoint_IDs.includes(item.id)).map(item => item.id),
          manpowerRole_Id: man.manpowerRole_Id,
        };
      }) || [];
    setAssignedManpowers(mappedAssigned || []);
    }
    
    ////// Mock Data ///////
    const mappedEmployeeItemSource = data.employees.map((emp) => {
      return {
        id: emp.empId,
        desc: emp.fname + " " + emp.lname,
        email: emp.email,
      };
    });
    setEmployeeItemSource(mappedEmployeeItemSource);

    setIsLoading(false);
  };

  const removeManpower = (id: string) => {
    if (!id?.includes("new")) {
      setAssignedManpowerRemoveList(assignedManpowerRemoveList.concat(id));
    }
    const filterEmployee = assignedManpowers.filter((e) => e.id !== id);
    setAssignedManpowers(filterEmployee);
  };
  const addManpower = (roleId: any, shiftId: any) => {
    console.log("add manpower");
    setAssignedManpowers([
      ...assignedManpowers,
      {
        id: "new" + assignedManpowers.length + 1,
        employee_Id: "",
        employeeName: "",
        manpowerRole_Id: roleId,
        shift_Id: shiftId,
        checkpoint_IDs: [],
      },
    ]);
    console.log("assignedManpowers =", assignedManpowers);
  };

  function manpowerRolesManagement(shiftId: any) {
    const manpowerOfShift = filteredManpowerData.filter(
      (m) => m.shiftId === shiftId
    );
    const manpowerAndPatrollerData = manpowerOfShift.map((mp) => ({
      ...mp,
      assignedManpowers: assignedManpowers.filter(
        (p) => p.shiftId === shiftId && p.manpowerId === mp.id
      ),
    }));
    console.log("manpowerAndPatrollerData =", manpowerAndPatrollerData);
    return manpowerAndPatrollerData;
  }
  const handleSubmit = () => {};

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    if (newValue === "4") {
      initialShiftData();
    }
  };

  const handleSameCheckList = (check: boolean) => {
    if (check) {
      const checkpointsSameCheckList = checkPointDatas.map((checkpoint) => {
        if (checkpoint != checkPointDatas[0]) {
          let updatedCheckListId = [...checkpoint.checkListId];
          updatedCheckListId = checkPointDatas[0].checkListId;
          return {
            ...checkpoint,
            checkListId: updatedCheckListId,
          };
        }
        return checkpoint;
      });
      setCheckPointDatas(checkpointsSameCheckList);
    }
  };

  const PreliminaryStep = () => {
    return (
      <>
        {/* Customer */}
        <Box className="flex w-full space-x-5 pt-4">
          {/* Customer */}
          <Box className="w-1/2">
            <Selector
              selectorLabel={"Customer"}
              itemSource={custList}
              handleChange={(e: ChangeEvent) => handleFieldPreliminaryChange(e)}
              selectedVal={prelimData.customerId}
              name={"customerId"}
            />
            {/* {isEdit ? 
            (<>
            <Typography
              sx={{
                fontSize: "14px",
                paddingBottom: "0.25rem",
                color: "#2C5079",
                fontWeight: "700",
                textAlign: "left"
              }}
            >
              Customer
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingY: "0.4rem",
                color: "#2C5079",
                textAlign: "center",
                border: "1px solid #1D7A9B",
                borderRadius:"10px"
              }}
            >
              {custList.find(c => c.id === prelimData.customerId).desc}
            </Typography></>)
            : (<Selector
              selectorLabel={"Customer"}
              itemSource={custList}
              handleChange={(e: ChangeEvent) => handleFieldPreliminaryChange(e)}
              selectedVal={prelimData.customerId}
              name={"customerId"}
            />)} */}
          </Box>
          {/* Area */}
          <Box className="w-1/2">
            <Selector
              selectorLabel={"Area"}
              itemSource={areas}
              handleChange={handleFieldPreliminaryChange}
              selectedVal={prelimData.areaId}
              name={"areaId"}
            />
          </Box>
        </Box>
        <Box className="w-full flex justify-between mt-3">
          <Typography
            sx={{
              fontSize: "14px",
              paddingBottom: "0.25rem",
              color: "#2C5079",
              fontWeight: "700",
            }}
          >
            Round
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#4C9BF5",
              textDecorationLine: "underline",
            }}
          >
            Total: {prelimData.rounds?.length} round
            {prelimData.rounds !== undefined && prelimData.rounds?.length > 1
              ? "s"
              : ""}
          </Typography>
        </Box>
        <Box className="w-full flex flex-col justify-between mt-3">
          {prelimData.rounds?.map((round, index) => (
            <Box
              key={index}
              className="w-full bg-[#EBF4F6] rounded-lg justify-items-center align-middle justify-between mb-3"
            >
              <Box className="w-full flex justify-between border-b-2">
                <Box className="bg-[#37B7C3] rounded-md justify-center text-white px-3 py-1 m-3 text-sm">
                  รอบที่ {round.roundNo}
                </Box>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    mt: 2,
                    ml: 1,
                  }}
                >
                  จาก
                </Typography>
                <Box className="flex flex-grow bg-[white] rounded-md justify-center text-[#2C5079] m-3 px-3 py-1 text-sm">
                  <Clock className="mr-2" size={20} />
                  {formatTime(round.startTime)}
                </Box>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    mt: 2,
                  }}
                >
                  ถึง
                </Typography>
                <Box className="flex flex-grow bg-[white] rounded-md justify-center text-[#2C5079] m-3 px-3 py-1 text-sm">
                  <Clock className="mr-2" size={20} />
                  {formatTime(round.endTime)}
                </Box>
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    mt: 2,
                  }}
                >
                  รวม
                </Typography>
                <Box className="flex flex-grow bg-[white] rounded-md justify-center text-[#2C5079] m-3 px-3 py-1 text-sm">
                  {round.totalTime} นาที
                </Box>
              </Box>
              <Box className="w-full flex justify-between">
                <Typography
                  textAlign="left"
                  sx={{
                    fontSize: "14px",
                    color: "#2C5079",
                    mt: 2,
                    ml: 12,
                  }}
                >
                  ผลัด
                </Typography>
                <Box className="flex flex-grow bg-[white] rounded-md justify-center text-[#2C5079] m-3 px-3 py-1 text-sm">
                  {
                    shiftsOfCustomer.find(
                      (shift) => shift.shiftId === round.shiftId
                    )?.shiftName
                  }
                </Box>
                <Box className="flex flex-grow pl-10">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      mt: 2,
                      mr: 2,
                    }}
                  >
                    เงื่อนไข :
                  </Typography>
                  {round.isNeedto ? <CheckCircle /> : <CrossCircle />}
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      mt: 2,
                      mr: 2,
                    }}
                  >
                    บังคับเดิน
                  </Typography>
                  {round.isStrictOrder ? <CheckCircle /> : <CrossCircle />}
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      mt: 2,
                    }}
                  >
                    เดินตามลำดับ
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </>
    );
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
          onClick={handleCloseCustomerForm}
        >
          <IoClose size={26} />
        </Button2>
      </Box>

      <div className="bg-white rounded-b-lg shadow-lg min-h-fit max-h-[654px] w-[750px]">
        {/* Body */}
        <div className="max-h-[578px] overflow-auto">
          {!isEdit && (
            <Box
              className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
              textAlign="center"
            >
              {/* Stepper */}
              <Box className="flex flex-col w-full pt-2">
                <Box className="w-full border-b-2 pb-3 flex">
                  <Stepper
                    activeStep={activeStep}
                    sx={{ width: "100%" }}
                    connector={
                      <StepConnector
                        sx={{
                          "& .MuiStepConnector-line": {
                            borderColor: "#C7D4D7", // Default connector color
                            borderWidth: "1.5px",
                          },
                          "&.Mui-completed .MuiStepConnector-line": {
                            borderColor: "#4C9BF5", // Connector color after step is passed
                          },
                          "&.Mui-active .MuiStepConnector-line": {
                            borderColor: activeStep > 0 ? "#4C9BF5" : "#C7D4D7",
                          },
                        }}
                      />
                    }
                  >
                    {steps.map((label, index) => (
                      <Step key={label} completed={activeStep > index}>
                        <StepLabel
                          StepIconComponent={(props) => (
                            <CustomStepIcon
                              icon={index + 1}
                              active={activeStep === index}
                              completed={activeStep > index}
                            />
                          )}
                          sx={{
                            "& .MuiStepLabel-label": {
                              color: "#C7D4D7", // Default label color
                              fontWeight: "normal", // Default font weight
                            },
                            "& .MuiStepLabel-label.Mui-active": {
                              color: "#4C9BF5", // Active step label color
                              fontWeight: "700", // Active step font weight
                            },
                            "& .MuiStepLabel-label.Mui-completed": {
                              color: "#4C9BF5", // Passed step label color
                              fontWeight: "700", // Passed step font weight
                            },
                          }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>

              {/* Step1--Preliminary */}
              {activeStep === 0 && (
                <Box className="w-full">
                  <PreliminaryStep />
                </Box>
              )}

              {/* Step2--Check point */}
              {activeStep === 1 && (
                <Box className="w-full">
                  <>
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
                      Check Point
                    </Typography>
                    {checkPointDatas.map((checkpoint, index) => (
                      <Box
                        key={checkpoint.checkPointId}
                        className="flex w-full bg-[#EBF4F6] rounded-lg justify-items-center align-middle justify-between mb-3 p-3 space-x-3"
                      >
                        <Box className="w-11 h-10 bg-[#37B7C3] rounded-lg justify-center text-white p-2">
                          {index + 1}
                        </Box>
                        <Box className="w-full justify-center space-y-2">
                          <div>
                            <Textbox
                              header={"Check Point Name"}
                              inputType={"text"}
                              placeHolder={"Type here..."}
                              handleChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handleFieldCheckpointChange(
                                  e,
                                  checkpoint.checkPointId,
                                )
                              }
                              value={checkpoint.checkPointName}
                              name={"checkPointName"}
                            />
                          </div>
                          <div>
                            <Textbox
                              header={"Location"}
                              inputType={"text"}
                              placeHolder={"Type here..."}
                              handleChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handleFieldCheckpointChange(
                                  e,
                                  checkpoint.checkPointId
                                )
                              }
                              value={checkpoint.locationName}
                              name={"locationName"}
                            />
                          </div>
                          {/* Map */}
                          <div className="flex w-full rounded-lg border-[#2C5079] border-[1px] bg-slate-200 p-1 justify-center">
                            {/* <Image
                              src={"/NoData.png"}
                              alt="No Data"
                              width={90}
                              height={90}
                            /> */}
                          </div>
                          <div className="w-full flex space-x-2 mt-2">
                            {/* <Box className="flex flex-grow bg-[white] rounded-md border-[1px] border-[#2C5079] text-[#2C5079] px-1 py-2 text-sm">
                              ละติจูด : {checkpoint.latitude}
                            </Box> */}
                            <Textbox
                              header={undefined}
                              inputType={"text"}
                              placeHolder={"Type here..."}
                              handleChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handleFieldCheckpointChange(
                                  e,
                                  checkpoint.checkPointId
                                )
                              }
                              value={checkpoint.latitude}
                              name={"latitude"}
                            />
                            <Box className="flex flex-grow bg-[white] rounded-md border-[1px] border-[#2C5079] text-[#2C5079] px-1 py-2 text-sm">
                              ลองจิจูด : {checkpoint.longitude}
                            </Box>
                            <Box className="flex flex-grow bg-[white] rounded-md border-[1px] border-[#2C5079] text-[#2C5079] px-1 py-2 text-sm">
                              อัลติจูด : {checkpoint.altitude}
                            </Box>
                          </div>
                          <Typography
                            textAlign="left"
                            sx={{
                              fontSize: "14px",
                              paddingBottom: "0.25rem",
                              color: "#2C5079",
                              fontWeight: "700",
                            }}
                          >
                            Patrol Time Restriction
                          </Typography>
                          <div className="w-fit">
                            <Box className="flex">
                              <Checkbox
                                className="mb-2"
                                checked={!checkpoint.isRestrictionTime}
                              />
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#2C5079",
                                  mt: "0.25rem",
                                  ml: 1,
                                }}
                              >
                                No Restriction
                              </Typography>
                            </Box>
                            <Box className="flex">
                              <Checkbox
                                className="mb-2 mt-1"
                                checked={checkpoint.isRestrictionTime}
                              />
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#2C5079",
                                  mt: "0.5rem",
                                  mr: 1,
                                  ml: 1,
                                }}
                              >
                                Not Exeed
                              </Typography>
                              <Box className="w-[15%]">
                                <Textbox
                                  inputType={"number"}
                                  placeHolder={"Type here..."}
                                  handleChange={undefined}
                                  value={checkpoint.timeLimit}
                                  name={"timeLimit"}
                                />
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#2C5079",
                                  mt: "0.5rem",
                                  ml: 1,
                                }}
                              >
                                minutes from previous check point
                              </Typography>
                            </Box>
                          </div>
                        </Box>
                        <Box className="flex align-middle ml-2 justify-around">
                          <Button
                            onClick={() =>
                              removeCheckpoint(
                                checkpoint.checkPointId,
                                checkpoint.status,index
                              )
                            }
                            className="bg-[#F66262] rounded-lg"
                          >
                            <Trash color="white" />
                          </Button>
                        </Box>
                      </Box>
                    ))}
                    <Box className="justify-start flex w-full">
                      <AddButton onAddBtnClick={addCheckPoint} />
                    </Box>
                  </>
                </Box>
              )}

              {/* Step3--Check List */}
              {/* {activeStep === 2 && <CheckListStep />} */}

              {/* Step3--Manpower */}
              {/* {activeStep === 3 && <ManpowerStep />} */}
            </Box>
          )}

          {isEdit && (
            <Box
              className="w-full justify-center px-6 rounded-t-lg pb-6 bg-white"
              textAlign="center"
            >
              <TabContext value={tabValue}>
                <Box sx={{ mt:0, width: "685px", borderBottom: 1, borderColor: "divider", position: 'fixed', zIndex: 1000, bgcolor: "white"}}>
                  <TabList onChange={handleTabChange} aria-label="areaTabs">
                    <Tab label="Preliminary" value="1" />
                    <Tab label="Check Point" value="2" />
                    <Tab label="Check List" value="3" />
                    <Tab label="Manpower" value="4" />
                  </TabList>
                </Box>
                {/* Preliminary Tab */}
                <TabPanel value="1" sx={{ padding: 0, py: "0.25rem", pt: 6 }}>
                  <PreliminaryStep />
                </TabPanel>
                {/* Checkpoint Tab */}
                <TabPanel value="2" sx={{ padding: 0, py: "0.25rem", pt: 6 }}>
                  <>
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
                        Check Point
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#4C9BF5",
                          textDecorationLine: "underline",
                        }}
                      >
                        Total: {checkPointDatas?.length} check point
                        {checkPointDatas?.length !== undefined &&
                        checkPointDatas?.length > 1
                          ? "s"
                          : ""}
                      </Typography>
                    </Box>
                    {checkPointDatas.map((checkpoint, index) => {

                      return (
                        <Box
                          key={index}
                          className="flex w-full bg-[#EBF4F6] rounded-lg justify-items-center align-middle justify-between mb-3 p-3 space-x-3"
                        >
                          <Box className="w-11 h-10 bg-[#37B7C3] rounded-lg justify-center text-white p-2">
                            {index + 1}
                          </Box>
                          <Box className="w-full justify-center space-y-2">
                            <div>
                              <Textbox
                                header={"Check Point Name"}
                                inputType={"text"}
                                placeHolder={"Type here..."}
                                handleChange={(e: any) =>
                                  handleFieldDataInCheckpointChange(
                                    checkpoint.checkPointId,
                                    "checkPointName",
                                    e.target.value
                                  )
                                }
                                value={checkpoint.checkPointName}
                                name={"checkPointName"}
                              />
                            </div>
                            <div>
                              <Textbox
                                header={"Location"}
                                inputType={"text"}
                                placeHolder={"Type here..."}
                                handleChange={(e: any) =>
                                  handleFieldDataInCheckpointChange(
                                    checkpoint.checkPointId,
                                    "locationName",
                                    e.target.value
                                  )
                                }
                                value={checkpoint.locationName}
                                name={"locationName"}
                              />
                            </div>
                            {/* Map */}
                            <div className="flex w-full rounded-lg border-[#2C5079] border-[1px] bg-slate-200 p-1 justify-center">
                              {/* <Image
                              src={"/NoData.png"}
                              alt="No Data"
                              width={90}
                              height={90}
                            /> */}

                              {/* // TO DO by Add Image View */}
                              <MapComponent
                                latitude={checkpoint.latitude}
                                longitude={checkpoint.longitude}
                                zoom={13}
                              />
                            </div>
                            <div className="w-full flex space-x-2 mt-2">
                              {/* <Box className="flex flex-grow bg-[white] rounded-md border-[1px] border-[#2C5079] text-[#2C5079] px-1 py-2 text-sm">
                              ละติจูด : {checkpoint.latitude}
                            </Box> */}
                              <div>
                                <Textbox
                                  header={"ละติจูด"}
                                  inputType={"text"}
                                  placeHolder={"Type here..."}
                                  handleChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) =>
                                    handleFieldDataInCheckpointChange(
                                      checkpoint.checkPointId,
                                      "latitude",
                                      e.target.value
                                    )
                                  }
                                  value={checkpoint.latitude}
                                  name={"latitude"}
                                />
                              </div>
                              <div>
                                <Textbox
                                  header={"ลองจิจูด"}
                                  inputType={"text"}
                                  placeHolder={"Type here..."}
                                  handleChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) =>
                                    handleFieldDataInCheckpointChange(
                                      checkpoint.checkPointId,
                                      "longitude",
                                      e.target.value
                                    )
                                  }
                                  value={checkpoint.longitude}
                                  name={"longitude"}
                                />
                              </div>
                              <div>
                                <Textbox
                                  header={"อัลติจูด"}
                                  inputType={"text"}
                                  placeHolder={"Type here..."}
                                  handleChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) =>
                                    handleFieldDataInCheckpointChange(
                                      checkpoint.checkPointId,
                                      "altitude",
                                      e.target.value
                                    )
                                  }
                                  value={checkpoint.altitude}
                                  name={"altitude"}
                                />
                              </div>
                            </div>
                            <Typography
                              textAlign="left"
                              sx={{
                                fontSize: "14px",
                                paddingBottom: "0.25rem",
                                color: "#2C5079",
                                fontWeight: "700",
                              }}
                            >
                              Patrol Time Restriction
                            </Typography>
                            <div className="w-fit">
                              <Box className="flex">
                                <Checkbox
                                  className="mb-2"
                                  checked={!checkpoint.isRestrictionTime}
                                  onCheckedChange={(e) =>
                                    handleFieldDataInCheckpointChange(
                                      checkpoint.checkPointId,
                                      "isRestrictionTime",
                                      false
                                    )
                                  }
                                />
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#2C5079",
                                    mt: "0.25rem",
                                    ml: 1,
                                  }}
                                >
                                  No Restriction
                                </Typography>
                              </Box>
                              <Box className="flex">
                                <Checkbox
                                  className="mb-2 mt-1"
                                  checked={checkpoint.isRestrictionTime}
                                  onCheckedChange={(e) =>
                                    handleFieldDataInCheckpointChange(
                                      checkpoint.checkPointId,
                                      "isRestrictionTime",
                                      true
                                    )
                                  }
                                />
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#2C5079",
                                    mt: "0.5rem",
                                    mr: 1,
                                    ml: 1,
                                  }}
                                >
                                  Not Exeed
                                </Typography>
                                <Box className="w-[15%]">
                                  <Textbox
                                    disable={!checkpoint.isRestrictionTime}
                                    inputType={"number"}
                                    placeHolder={"Type here..."}
                                    handleChange={(e: any) =>
                                      handleFieldDataInCheckpointChange(
                                        checkpoint.checkPointId,
                                        "timeLimit",
                                        e.target.value
                                      )
                                    }
                                    value={checkpoint.timeLimit}
                                    name={"timeLimit"}
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#2C5079",
                                    mt: "0.5rem",
                                    ml: 1,
                                  }}
                                >
                                  minutes from previous check point
                                </Typography>
                              </Box>
                            </div>
                            {(checkpoint.status === "new" || checkpoint.status === "edit") 
                              && (<Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#F66262",
                                    mt: "0.5rem",
                                    ml: 1,
                                  }}
                                >
                                  {checkpoint.status === "new"
                                    ? "New Checkpoint: Please save."
                                    : "Edit Checkpoint: Please save."}
                                </Typography>
                              )}
                          </Box>
                          <Box className="flex align-middle ml-2 justify-around">
                            <Button
                              onClick={() =>
                                removeCheckpoint(
                                  checkpoint.checkPointId,
                                  checkpoint.status,
                                  index
                                )
                              }
                              className="bg-[#F66262] rounded-lg"
                            >
                              <Trash color="white" />
                            </Button>
                          </Box>
                        </Box>
                      );
                    })}
                    <Box className="justify-start flex w-full">
                      <AddButton onAddBtnClick={addCheckPoint} />
                    </Box>
                  </>
                </TabPanel>
                {/* Checklist Tab */}
                <TabPanel value="3" sx={{ padding: 0, py: "0.25rem", pt: 6 }}>
                  <>
                    <Box className="w-full border-b-2 pb-3 mt-2 flex justify-end">
                      <Checkbox2
                        className="mt-1 mr-2 border-[#C7D4D7]"
                        onCheckedChange={handleSameCheckList}
                        disabled={checkPointDatas.length < 2}
                      />
                      <Typography
                        sx={{
                          color: "#2C5079",
                          mt: 1,
                        }}
                      >
                        Same check lists of
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          color: "#4C9BF5",
                          fontSize: "14px",
                          paddingX: "1rem",
                          mx: 1,
                          mt: 1.2,
                        }}
                        className="bg-[#D8EAFF] rounded-full flex w-fit h-fit"
                      >
                        Check Point 1
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2C5079",
                          mt: 1,
                        }}
                      >
                        for all check point
                      </Typography>
                    </Box>
                    {checkPointDatas.map((checkpoint, index) => (
                      <div className="mb-2" key={index}>
                        <Accordion sx={{ bgcolor: "white", mb: "0.5rem" }}>
                          <AccordionSummary
                            sx={{ borderBottom: "1px solid #C7D4D7" }}
                            expandIcon={<FaSortDown />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                          >
                            <Box className="w-full flex space-x-2">
                              <Typography
                                sx={{
                                  fontWeight: "600",
                                  color: "#4C9BF5",
                                  fontSize: "14px",
                                  paddingX: "1rem",
                                  mt: 1.5,
                                }}
                                className="bg-[#D8EAFF] rounded-full flex w-fit h-fit"
                              >
                                Check Point {index + 1}
                              </Typography>
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#2C5079",
                                    fontSize: "14px",
                                    textAlign: "left",
                                  }}
                                >
                                  {checkpoint.checkPointName}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "#2C5079",
                                    textDecorationLine: "underline",
                                    fontSize: "14px",
                                    textAlign: "left",
                                  }}
                                >
                                  Total : {checkpoint.checkListId.length} Check
                                  list
                                  {checkpoint.checkListId.length > 1 ? "s" : ""}
                                </Typography>
                              </Box>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails sx={{ p: 1 }}>
                            {checkpoint.checkListId.map(
                              (checkListId, index) => (
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
                                    <Box
                                      sx={{ display: "flex", mr: 0.5 }}
                                      className="space-x-2"
                                    >
                                      <Box className="w-full">
                                        <Selector3
                                          selectorLabel={"Check List"}
                                          itemSource={allCheckListDatas}
                                          handleChange={
                                            handleFieldDataInCheckpointChange
                                          }
                                          selectedVal={checkListId}
                                          name={"checkListId"}
                                          id={checkpoint.checkPointId}
                                          index={index}
                                        />
                                      </Box>
                                    </Box>

                                    <Box className="space-x-3 flex">
                                      <Box sx={{ width: "50%" }}>
                                        <LabelTextDisplayBox
                                          label={"Status: Normal"}
                                          text={
                                            allCheckListDatas.find(
                                              (c) => c.id === checkListId
                                            )?.normalStatus
                                          }
                                        />
                                      </Box>
                                      <Box sx={{ width: "50%" }}>
                                        <LabelTextDisplayBox
                                          label={"Status: Abnormal"}
                                          text={
                                            allCheckListDatas.find(
                                              (c) => c.id === checkListId
                                            )?.abnormalStatus
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
                                          !allCheckListDatas.find(
                                            (c) => c.id === checkListId
                                          )?.isNeedAttachPhoto
                                        }
                                        className="w-9 h-9 mt-1 cursor-default"
                                        checked={
                                          allCheckListDatas.find(
                                            (c) => c.id === checkListId
                                          )?.isNeedAttachPhoto
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
                                            allCheckListDatas.find(
                                              (c) => c.id === checkListId
                                            )?.attachPhotoAmount
                                          }
                                        />
                                      </Box>
                                    </Box>
                                  </Box>

                                  <Box className="flex align-middle ml-2 justify-around">
                                    <Button
                                      onClick={() =>
                                        removeChecklist(
                                          checkpoint.checkPointId,
                                          checkListId,
                                          index
                                        )
                                      }
                                      className="bg-[#F66262] rounded-lg"
                                    >
                                      <Trash color="white" />
                                    </Button>
                                  </Box>
                                </Box>
                              )
                            )}

                            <Box
                              sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <AddButton
                                onAddBtnClick={(e) =>
                                  addCheckList(checkpoint.checkPointId)
                                }
                              />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ))}
                  </>
                </TabPanel>
                {/* Mnapower Tab */}
                <TabPanel value="4" sx={{ padding: 0, py: "0.25rem", pt: 6 }}>
                  <>
                    <Box className="w-full text-center items-center">
                      <Typography
                        sx={{
                          color: "#4C9BF5",
                          textDecorationLine: "underline",
                          fontSize: "16px",
                          mt: 1,
                        }}
                      >
                        Total: {shiftDatas.length} shift
                        {shiftDatas.length > 1 ? "s" : ""}
                      </Typography>
                      {shiftDatas.map((shift, index) => (
                        <div className="mb-2" key={index}>
                          <Accordion sx={{ bgcolor: "#EBF4F6", mb: "0.5rem" }}>
                            <AccordionSummary
                              sx={{ borderBottom: "1px solid #C7D4D7" }}
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
                                  {shift.shiftName}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "#F66262",
                                    textDecorationLine: "underline",
                                    fontSize: "16px",
                                    mr: 3,
                                  }}
                                >
                                  Required manpower :{" "}
                                  {filteredManpowerData
                                    .filter(
                                      (man) => man.shift_Id === shift.shiftId
                                    )
                                    .reduce(
                                      (innerSum, manpower) =>
                                        innerSum + manpower.requireQuantity,
                                      0
                                    )}
                                </Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails key={"shiftName" + index}>
                              {filteredManpowerData
                                ?.filter(
                                  (item) => item.shift_Id === shift.shiftId
                                )
                                ?.map((role, index) => (
                                  <>
                                    <Box
                                      key={"manpowerDetail" + index}
                                      className="flex w-full justify-between py-1"
                                    >
                                      <div className="flex space-x-2">
                                        <Typography
                                          sx={{
                                            color: "#2C5079",
                                            textDecorationLine: "underline",
                                            fontSize: "14px",
                                          }}
                                        >
                                          ตำแหน่ง
                                        </Typography>
                                        <Typography
                                          sx={{
                                            color: "#2C5079",
                                            fontSize: "14px",
                                          }}
                                        >
                                          {
                                            // data.roles.find(
                                            //   (r) => r.id === role.roleId
                                            // )?.desc
                                            role.role_Name
                                          }
                                        </Typography>
                                      </div>
                                      <div className="flex space-x-2">
                                        <Typography
                                          sx={{
                                            color: "#2C5079",
                                            textDecorationLine: "underline",
                                            fontSize: "14px",
                                          }}
                                        >
                                          จำนวน :
                                        </Typography>
                                        <Typography
                                          sx={{
                                            color: "#2C5079",
                                            fontSize: "14px",
                                          }}
                                        >
                                          {
                                            assignedManpowers?.filter(
                                              (item) =>
                                                item.manpowerRole_Id ===
                                                role.$id
                                            ).length
                                          }
                                          /{role.requireQuantity}
                                        </Typography>
                                      </div>
                                    </Box>
                                    {assignedManpowers
                                      ?.filter(
                                        (item) =>
                                          item.manpowerRole_Id === role.$id
                                      )
                                      .map((man: any, index: number) => (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            width: "100%",
                                          }}
                                          key={index}
                                        >
                                          <Box
                                            key={"patroller" + index}
                                            sx={{
                                              bgcolor: "white",
                                              width: "100%",
                                              display: "flex",
                                              p: 2,
                                              mb: 1.5,
                                              borderRadius: "10px 0px 0px 10px",
                                            }}
                                            className="space-x-3"
                                          >
                                            <Box sx={{ width: "50%" }}>
                                              <LabelSelector3
                                                selectorLabel={"ชื่อ-นามสกุล"}
                                                itemSource={employeeItemSource}
                                                selectedVal={man.employee_Id}
                                                field={"employee_Id"}
                                                id={man.id}
                                                handleSelectedVal={
                                                  handleFieldManpowerTypeChange
                                                }
                                              />
                                              {/* <LabelTextField2
                                                label={"รหัสพนักงาน"}
                                                placeholder={"Type here..."}
                                                inputVal={man.employee_Id}
                                                field={"employee_Id"}
                                                id={man.id}
                                                handleChangeVal={
                                                  handleFieldManpowerTypeChange
                                                }
                                              /> */}
                                            </Box>
                                            <Box sx={{ width: "50%" }}>
                                              <CheckBoxDropDown
                                                itemSource={
                                                  checkpointItemSource
                                                }
                                                label="จุดลาดตระเวน"
                                                unit="จุด"
                                                selectedVal={man.checkpoint_IDs}
                                                handleChangeVal={
                                                  handleFieldManpowerTypeChange
                                                }
                                                id={man.id}
                                                field={"checkpoint_IDs"}
                                                desc="Assigned"
                                                maxLength={
                                                  checkpointItemSource.length
                                                }
                                                maxDiaplay={
                                                  checkpointItemSource.length
                                                }
                                              />
                                            </Box>
                                          </Box>
                                          <Box sx={{ display: "flex" }}>
                                            <Button
                                              onClick={() =>
                                                removeManpower(man.id)
                                              }
                                              className="bg-[#F66262] rounded-r-lg rounded-l-none h-[85%] px-2"
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
                                        mb: 1,
                                      }}
                                    >
                                      <AddButton
                                        disable={
                                          assignedManpowers?.filter(
                                            (item) =>
                                              item.manpowerRole_Id === role.$id
                                          ).length === role.requireQuantity
                                        }
                                        onAddBtnClick={(e) =>
                                          addManpower(role.$id, shift.shiftId)
                                        }
                                      />
                                    </Box>
                                  </>
                                ))}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      ))}
                    </Box>
                  </>
                </TabPanel>
              </TabContext>
            </Box>
          )}
        </div>

        {/* Footer */}
        {!isEdit && (
          <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
            {activeStep != 0 && (
              <Button
                className="w-28 h-11 bg-white text-[#83A2AD] border-[1px] border-[#83A2AD] hover:text-white hover:bg-[#83A2AD]"
                onClick={() => handleBack()}
              >
                Back
              </Button>
            )}
            <Button
              className="w-28 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                               disabled:bg-[#83A2AD]"
              onClick={() =>
                activeStep === steps.length - 1 ? handleSubmit() : handleNext()
              }
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        )}

        {isEdit && (
          <Box className="flex w-full justify-between px-6 border-t-2 pt-4 pb-4">
            {tabValue !== "1" &&<Button
              className="flex text-[#2C5079] pt-2 bg-transparent hover:bg-transparent underline"
              onClick={handleUndo}
            >
              <VscRefresh
                style={{ transform: "rotate(-60deg) scaleX(-1)" }}
                size={24}
              />
              Undo all changes
            </Button>}
            <Box className="space-x-4">
              {/* <DeleteBtnFooter
                onDeleteBtnFooterClick={handleDelete}
                disable={false}
              /> */}
              {tabValue !== "1" && <SaveBtnFooter onSaveBtnFooterClick={handleSave} />}
            </Box>
          </Box>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center z-indextop">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        )}

        {/* Confirm dialog */}
        {ConfirmAlertDialog}
      </div>
    </div>
  );
};

export default PatrolCheckpointFrom;
