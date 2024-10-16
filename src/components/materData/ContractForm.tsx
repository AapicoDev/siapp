"use client";

import {
  Box,
  Typography,
  Button as Button2,
  FormControl,
  SelectChangeEvent,
  Tab,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@/components/ui/textboxs/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/buttons/button";
import { Trash } from "iconsax-react";
import { Clock } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { VscRefresh } from "react-icons/vsc";
import { DatePicker } from "../ui/datePicker";
import { DatePickerWithRange } from "../ui/datePickerWithRange";
import { GoArrowUpRight } from "react-icons/go";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { SubmitBtn } from "../ui/buttons/submitBtn";
import { CancelBtn } from "../ui/buttons/cancelBtn";
import { IoClose } from "react-icons/io5";
import { Selector } from "../ui/selectors/selector";
import { Textbox } from "../ui/textboxs/textbox";
import { FaSortDown } from "react-icons/fa6";
import data from "@/app/mockData.json";
import LabelTextField from "../ui/textboxs/LabelTextField";
import FloatingLabelBox from "../ui/floatingLabelBox";
import { TimePicker } from "../ui/selectors/timePicker";
import { LabelSelector } from "../ui/selectors/labelSelector";
import { Checkbox } from "@/components/ui/checkbox3";
import { AddButton } from "../ui/buttons/addButton";
import { LabelSelector2 } from "../ui/selectors/labelSelector2";
import { LabelSelector3 } from "../ui/selectors/labelSelector3";
import LabelTextField2 from "../ui/textboxs/LabelTextField2";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { convert12HourTo24Hour } from "../ui/selectors/timePickerUtils";
import CheckBoxDropDown from "../ui/checkBoxDropDown";
import LabelTextField3 from "../ui/textboxs/labelTextField3";
import AlertToDatail from "./AlertToDetail";

type AreaData = {
  id: number;
  name: string;
  totalChkPt: number;
  round: any[];
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

type ShiftListType = {
  id: number;
  desc: any;
  workdays: any[];
  manpowers: ManpowerType[];
};

type ManpowerType = {
  id: any;
  nameInReport: string;
  roleId: any;
  quantity: number;
};

type PatrolAlertListType = {
  id: any;
  isAsm: any;
  name: string;
  email: string;
  otherPositionId: any[];
  desc: any;
};

const mockIsSameDayList = [
  {
    id: 1,
    desc: "วันเดียวกัน",
  },
  {
    id: 2,
    desc: "ข้ามวัน",
  },
];

const ContractForm = ({
  selectedCustomer,
  closeModal,
  customeraAreas,
  isEditFromCustPage,
  custList = [{ id: 1, desc: "" }],
}: any) => {
  const [isEdit, setIsEdit] = useState(isEditFromCustPage);
  const [customer, setCustomer] = useState(
    selectedCustomer || {
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
  const [areas, setAreas] = useState<AreaData[]>(customeraAreas);
  const [formHeader, setFormHeader] = useState("");
  const [customerList, setCustomerList] = useState(
    custList || [{ id: 1, desc: "" }]
  );
  const [customerAdd, setCustomerAdd] = useState(customerList[0]?.id);
  const [addContractNo, setAddContractNo] = useState("");
  const [tabValue, setTabValue] = useState("1");
  const [areaOpen, setAreaOpen] = useState(Array(areas.length).fill(false)); // Array to track edit state for each row

  const [isSameDayList, setIsSameDayList] = useState<any[]>(mockIsSameDayList);
  const [shiftList, setShiftList] = useState<ShiftListType[]>([
    { id: 0, desc: "", workdays: [], manpowers: [] },
  ]);
  const [totalManpower, setTotalManpower] = useState(0);
  const [alertToList, setAlertToList] = useState<PatrolAlertListType[]>([
    { id: 0, isAsm: 0, name: "", email: "", otherPositionId: [], desc: "" },
  ]);
  const [asmAlertNames, setAsmAlertNames] = useState<any[]>([
    { id: "", desc: "", email: "" },
  ]);
  const [areaList, setAreaList] = useState<AreaListType[]>([
    {
      areaId: 0,
      areaName: "",
      totalChkPt: null,
      roundList: [
        {
          id: 1,
          number: "",
          startTimeHr: "",
          finishTimeHr: "",
          startTimeMin: "",
          finishTimeMin: "",
          totalTimeMin: "",
          isSameDay: 1,
          shift: 0,
          alertTo: [],
          isNeed: false,
          isStrictOrder: false,
        },
      ],
      latestRoundID: 0,
    },
  ]);
  const [contractList, setContractList] = useState<any[]>([]); //[{id: "", desc: ""}]
  const [selectedContractId, setSelectedContractId] = useState("");
  const [attachmentList, setAttachmentList] = useState<any[]>([""]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(addDays(new Date(), 1));
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [deleteRoundList, setDeleteRoundList] = useState<any[]>([]);
  const [deleteShiftList, setDeleteShiftList] = useState<any[]>([]);
  const [deleteManpowerList, setDeleteManpowerList] = useState<any[]>([]);
  const [deleteAlertToList, setDeleteAlertToList] = useState<any[]>([]);
  const [showAlertToDeatil, setShowAlertToDeatil] = useState(false);
  const [selectedALertTo, setSelectedALertTo] = useState<PatrolAlertListType>();

  useEffect(() => {
    if (!isEdit) {
      setFormHeader("+ New Contract");
    } else {
      setFormHeader("View / Edit Contract");
    }
    initialData();
    const initialSeelctedContract = contractListInitial();
    contractDetail(initialSeelctedContract);
  }, []);

  const initialData = () => {
    areas.forEach((area) => {
      //Find checkpoint from API with all received area ID
      area.totalChkPt = data.checkpoints.filter(
        (c) => c.areaId === area.id
      ).length;
    });
  };

  const contractListInitial = () => {
    const contracts = data.contracts.filter(
      (c) => c.customerId === customer.customerId && c.isActive === 1
    );
    const mappedContract = contracts.map((contract) => ({
      id: contract.id,
      desc: contract.id,
    }));
    console.log("mappedContract", mappedContract);
    setContractList(mappedContract);
    setSelectedContractId(mappedContract[0]?.id || "");
    return mappedContract[0]?.id;
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    console.log("selected =", e.target);
    console.log("contrtactList =", contractList);
    if (name === "addContractCustomer") {
      setCustomerAdd(value);
    } else if (name === "selectedContractId") {
      setSelectedContractId(value);
      contractDetail(value);
    }
  };

  const contractDetail = (selectedContract: any = "") => {
    //Mapped area
    const mappedAreaList: AreaListType[] = areas.map((area: AreaData) => {
      return {
        areaId: area.id, // Mapping `id` from AreaData
        areaName: area.name, // Mapping `name` from AreaData
        totalChkPt: area.totalChkPt, // Mapping `totalChkPt` from AreaData
        roundList: roundManagement(area.id, selectedContract), // Assigning the filtered round data
        latestRoundID: 0,
      };
    });
    mappedAreaList.map(
      (a) =>
        (a.latestRoundID = a.roundList.reduce(
          (max, round) => (round.id > max ? round.id : max),
          0
        ))
    );
    setAreaList(mappedAreaList);

    // StartDate - FinishDate
    const filteredContract = data.contracts.find(
      (c) => c.id === selectedContract
    );
    setDate({
      from: new Date(filteredContract?.startDate || "") || date?.from,
      to: new Date(filteredContract?.finishDate || "") || date?.to,
    });

    //attachmentList
    const attachments = filteredContract?.attachment;
    setAttachmentList(attachments || attachmentList);

    // Shift list
    const mappedShiftList: ShiftListType[] =
      filteredContract?.shiftList.map((shift) => ({
        id: shift.id,
        desc: shift.name,
        workdays: shift.workdays,
        manpowers: shift.manpowerList || [],
      })) || shiftList;
    setShiftList(mappedShiftList);
    calTotalManPowerOfAllShift(mappedShiftList);
    console.log("filteredContract =", filteredContract);
    console.log("mappedShiftList =", mappedShiftList);

    //Alert to List
    const mappedAlertList: PatrolAlertListType[] =
      filteredContract?.patrolAlertList.map((alertTo) => ({
        id: alertTo.id,
        isAsm: alertTo.isAsm,
        name: alertTo.name,
        email: alertTo.email,
        otherPositionId: alertTo.otherPositionId,
        desc: alertTo.name,
      })) || alertToList;
    setAlertToList(mappedAlertList || alertToList);

    //asmAlertNames
    const asmAlertNameList = data.employees.map((a) => ({
      id: a.fname + " " + a.lname,
      desc: a.fname + " " + a.lname,
      email: a.email,
    }));
    setAsmAlertNames(asmAlertNameList);
  };

  const calTotalManPowerOfAllShift = (shiftList: ShiftListType[]) => {
    const totalQuantity = shiftList.reduce((sum, shift) => {
      return (
        sum +
        shift.manpowers.reduce(
          (innerSum, manpower) => innerSum + manpower.quantity,
          0
        )
      );
    }, 0);
    setTotalManpower(totalQuantity);
  };

  const handleFieldDataInRoundChange = (
    areaId: any,
    roundId: any,
    field: keyof RoundData,
    value: any
  ) => {
    let isTime = false;
    if (
      field === "startTimeHr" ||
      "startTimeMin" ||
      "finishTimeHr" ||
      "finishTimeMin"
    ) {
      isTime = true;
      if (value.length > 2) return;
    }
    const updatedAreaList = areaList.map((area) => {
      if (area.areaId === areaId) {
        // Update the roundList for the matched areaId
        let updatedRoundData = area.roundList.map((item) =>
          item.id === roundId ? { ...item, [field]: value } : item
        );

        if (isTime) {
          updatedRoundData = calMinutes(roundId, updatedRoundData);
        }
        // Return the updated area object
        return {
          ...area,
          roundList: updatedRoundData, // Update the roundList with the modified rounds
        };
      }
      // Return the area unchanged if areaId does not match
      return area;
    });

    // Set the updated areaList
    setAreaList(updatedAreaList);
  };

  const handleFieldShiftListTypeChange = (
    shiftId: any,
    id2: any,
    field: keyof ShiftListType,
    value: any
  ) => {
    if (field === "workdays" && value.includes(data.daysOfWeek[0].id)) {
      value = data.daysOfWeek.map((day) => day.id);
    }
    const updatedShiftList = shiftList.map((shift) =>
      shift.id === shiftId ? { ...shift, [field]: value } : shift
    );
    setShiftList(updatedShiftList);
  };

  const addShift = () => {
    const latestId = shiftList.reduce(
      (max, area) => (area.id > max ? area.id : max),
      0
    );
    setShiftList([
      ...shiftList,
      { id: latestId + 1, desc: "", workdays: [], manpowers: [] },
    ]);
  };

  const removeShift = (id: number) => {
    const deleteShiftIds = deleteShiftList;
    if (!deleteShiftIds.includes(id)) deleteShiftIds?.push(id);
    setDeleteShiftList(deleteShiftIds);

    if (shiftList.length > 0) {
      const filteredShifts = shiftList.filter((shift) => shift.id !== id);
      setShiftList(filteredShifts);
      calTotalManPowerOfAllShift(filteredShifts);
    }
  };

  const handleFieldManpowerTypeChange = (
    shiftId: any,
    manpowerId: any,
    field: keyof ManpowerType,
    value: any
  ) => {
    const quantityRegex = /^[0-9]+$/;
    if (field === "quantity") {
      if (!quantityRegex.test(value)) value = "";
    }
    const updatedShiftList = shiftList.map((shift) => {
      if (shift.id === shiftId) {
        const updatedManpowerData = shift.manpowers.map((item) =>
          item.id === manpowerId
            ? { ...item, [field]: field === "quantity" ? Number(value) : value }
            : item
        );
        return {
          ...shift,
          manpowers: updatedManpowerData,
        };
      }
      return shift;
    });
    console.log("updatedShiftList = ", updatedShiftList);
    setShiftList(updatedShiftList);
    calTotalManPowerOfAllShift(updatedShiftList);
  };

  const addManpower = (selectedShift: any) => {
    const mappedShiftList: ShiftListType[] = shiftList.map((shift) => {
      if (shift.id === selectedShift) {
        return {
          id: shift.id,
          desc: shift.desc,
          workdays: shift.workdays,
          manpowers: [
            ...shift.manpowers,
            {
              id:
                shift.manpowers.reduce(
                  (max, mp) => (mp.id > max ? mp.id : max),
                  0
                ) + 1,
              nameInReport: "",
              roleId: undefined,
              quantity: 0,
            },
          ],
        };
      } else {
        return shift;
      }
    });
    setShiftList(mappedShiftList);
  };

  const removeManpower = (selectedShiftId: any, selectedMapowerId: any) => {
    const manpowers =
      shiftList.find((s) => s.id === selectedShiftId)?.manpowers || [];

    const deleteManpowerIds = deleteManpowerList;
    if (!deleteManpowerIds.includes(selectedMapowerId))
      deleteManpowerIds?.push(selectedMapowerId);
    setDeleteManpowerList(deleteManpowerIds);

    if (manpowers.length > 0) {
      const filterManpowers = manpowers.filter(
        (mp) => mp.id !== selectedMapowerId
      );
      const mappedShiftList: ShiftListType[] = shiftList.map((shift) => {
        if (shift.id === selectedShiftId) {
          {
            return {
              id: shift.id,
              desc: shift.desc,
              workdays: shift.workdays,
              manpowers: filterManpowers,
            };
          }
        } else {
          return shift;
        }
      });
      setShiftList(mappedShiftList);
      calTotalManPowerOfAllShift(mappedShiftList);
    }
  };

  const handleFieldPatrolAlertListTypeChange = (
    patrolAlertId: any,
    id2: any,
    field: keyof PatrolAlertListType,
    value: any
  ) => {
    const updatedPatrolAlertList = alertToList.map((alertTo) =>
      alertTo.id === patrolAlertId ? { ...alertTo, [field]: value } : alertTo
    );
    setAlertToList(updatedPatrolAlertList);
  };

  const addAlertToList = () => {
    const latestId = alertToList.reduce(
      (max, alert) => (alert.id > max ? alert.id : max),
      0
    );
    setAlertToList([
      ...alertToList,
      {
        id: latestId + 1,
        isAsm: undefined,
        name: "",
        email: "",
        otherPositionId: [],
        desc: "",
      },
    ]);
  };

  const removeAlertToList = (id: number) => {
    const deleteAlertIds = deleteAlertToList;
    if (!deleteAlertIds.includes(id)) deleteAlertIds?.push(id);
    setDeleteAlertToList(deleteAlertIds);

    if (alertToList.length > 0) {
      const filteredAlertList = alertToList.filter((alert) => alert.id !== id);
      setAlertToList(filteredAlertList);
    }
  };

  const handleInputHour = (value: any, time: any) => {
    let maxVal = 23;
    if (time != "hr") maxVal = 59;
    if (value > maxVal || value < 0) {
      value = "0" + 0;
    }
    console.log("value = ", value);
    if (value.length === 1) {
      value = "0" + value;
    }
    if (value.length === 0) {
      value = "0" + 0;
    }
    return value;
  };

  const calMinutes = (roundId: any, roundList: RoundData[]) => {
    console.log("roundList", roundList);
    const rounds: RoundData[] = roundList.map((item) => {
      if (item.id === roundId) {
        let mins = 0;
        const startHr = parseInt(item.startTimeHr, 10);
        const finishHr = parseInt(item.finishTimeHr, 10);
        const startTotalMins =
          parseInt(item.startTimeHr, 10) * 60 + parseInt(item.startTimeMin, 10);
        let finishTotalMins =
          parseInt(item.finishTimeHr, 10) * 60 +
          parseInt(item.finishTimeMin, 10);
        if (item.isSameDay == 1) {
          if (startHr < finishHr) {
            mins = finishTotalMins - startTotalMins;
            console.log(mins);
          } else mins = 0;
        } else {
          if (finishTotalMins < startTotalMins) {
            finishTotalMins += 24 * 60;
          }
          mins = finishTotalMins - startTotalMins;
        }
        item.totalTimeMin = mins.toString();
      }
      return item;
    });
    return rounds;
  };

  const addArea = () => {
    console.log("alertToList = ", alertToList);
  };

  const addRound = (selectedAreaId: any) => {
    const mappedAreaList: AreaListType[] = areaList.map((area) => {
      if (area.areaId === selectedAreaId) {
        return {
          areaId: area.areaId,
          areaName: area.areaName,
          totalChkPt: area.totalChkPt,
          roundList: [
            ...area.roundList,
            {
              id: area.latestRoundID + 1,
              number: "",
              startTimeHr: "00",
              finishTimeHr: "00",
              startTimeMin: "00",
              finishTimeMin: "00",
              totalTimeMin: "0",
              isSameDay: undefined,
              shift: 0,
              alertTo: [],
              isNeed: false,
              isStrictOrder: false,
            },
          ],
          latestRoundID: area.latestRoundID + 1,
        };
      } else {
        return area;
      }
    });
    setAreaList(mappedAreaList);
    console.log("mappedAreaList =", mappedAreaList);
  };

  const removeRound = (selectedAreaId: any, selectedRoundId: any) => {
    const rounds = areaList.find((a) => a.areaId === selectedAreaId)?.roundList;
    console.log("rounds=", rounds);

    const deleteRoundId = deleteRoundList;
    if (!deleteRoundId.includes(selectedRoundId))
      deleteRoundId?.push(selectedRoundId);
    setDeleteRoundList(deleteRoundId);
    console.log("deleteRoundId = ", deleteRoundId);

    if (rounds != undefined && rounds?.length > 0) {
      const filterRounds = rounds.filter(
        (round) => round.id !== selectedRoundId
      );
      const mappedAreaList: AreaListType[] = areaList.map((area) => {
        if (area.areaId === selectedAreaId) {
          {
            return {
              areaId: area.areaId,
              areaName: area.areaName,
              totalChkPt: area.totalChkPt,
              roundList: filterRounds,
              latestRoundID: area.latestRoundID,
            };
          }
        } else {
          return area;
        }
      });
      setAreaList(mappedAreaList);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "contractNumber") {
      setAddContractNo(value);
    }
    //setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleUndo = () => {
    console.log("initialData");
    initialData();
    const initialSeelctedContract = contractListInitial();
    contractDetail(initialSeelctedContract);
  };

  const handleDelete = () => {};

  const handleSave = () => {};

  const handleSubmit = () => {};

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  function roundManagement(areaId: any, contractId: any) {
    const filteredRound = data.rounds.filter(
      (round) => round.areaId === areaId && round.contrtactId === contractId
    );
    const roundDataArray: RoundData[] = filteredRound.map((round) => ({
      id: round.id,
      number: round.roundNo,
      startTimeHr: new Date(round.startTime)
        .getHours()
        .toString()
        .padStart(2, "0"),
      startTimeMin: new Date(round.startTime)
        .getMinutes()
        .toString()
        .padStart(2, "0"),
      finishTimeHr: new Date(round.finishTime)
        .getHours()
        .toString()
        .padStart(2, "0"),
      finishTimeMin: new Date(round.finishTime)
        .getMinutes()
        .toString()
        .padStart(2, "0"),
      totalTimeMin: calMinFromDate(round.startTime, round.finishTime),
      isSameDay: round.isSameDay,
      shift: round.shiftId,
      alertTo: round.alertTo,
      isNeed: round.isNeedto,
      isStrictOrder: round.isStrictOrder,
    }));

    console.log("roundDataArray =", roundDataArray);
    return roundDataArray;
  }

  function calMinFromDate(start: any, finish: any) {
    const hoursToMins =
      Math.abs(new Date(finish).getHours() - new Date(start).getHours()) * 60;
    const sumMins =
      hoursToMins +
      new Date(start).getMinutes() +
      new Date(finish).getMinutes();
    return sumMins;
  }

  function handleCloseContractForm() {
    closeModal(isEdit);
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    // use the file
    console.log(file);
  };

  function handleAddFileClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("inputRef =", inputRef);
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  }

  function handleAlertToDetail(alertTo: PatrolAlertListType) {
    setSelectedALertTo(alertTo);
    handleDisplayAlertToDetail();
  }

  function handleDisplayAlertToDetail() {
    setShowAlertToDeatil(!showAlertToDeatil);
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop'>
      {/* Header */}
      {!showAlertToDeatil && (
        <>
          <Box
            sx={{
              display: "flex",
              width: "700px",
              backgroundColor: "#D9F0EC",
              paddingY: "5px",
              borderRadius: "8px 8px 0px 0px", // Adjust rounded corners as needed
              justifyContent: "center",
            }}>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  width: "fit-content",
                  fontSize: "1.125rem", // text-lg equivalent
                  fontWeight: "bold",
                  color: "#1D7A9B",
                  marginTop: "0.25rem",
                  marginLeft: "78px",
                }}>
                {formHeader}
              </Typography>
            </Box>
            <Button2
              className='bg-transparent float w-fit'
              sx={{ position: "relative", right: 0, top: 0, color: "#83A2AD" }}
              onClick={handleCloseContractForm}>
              <IoClose size={26} />
            </Button2>
          </Box>
          <div className='bg-white rounded-b-lg shadow-lg min-h-[544px] max-h-[654px] w-[700px]'>
            {/* Body */}
            <div className='max-h-[528px] min-h-[528px] overflow-auto'>
              <Box className='w-full px-6 py-2 rounded-t-lg pb-6'>
                {/* View / Edit Customer */}
                {isEdit && (
                  <Box>
                    <Box className='flex w-full space-x-5 pt-2'>
                      <Box className='w-full border-b-2 pb-2 flex'>
                        <Box className='w-[70%]'>
                          <Box className='flex'>
                            <Typography
                              textAlign='left'
                              sx={{
                                fontWeight: "700",
                                color: "#2C5079",
                                fontSize: "16px",
                                paddingBottom: "0.25rem",
                              }}>
                              {`Customer : `}
                            </Typography>
                            <Typography
                              textAlign='left'
                              sx={{
                                color: "#2C5079",
                                fontSize: "16px",
                                paddingBottom: "0.25rem",
                                paddingLeft: "0.25rem",
                              }}>
                              {`${customer?.customerName}` + " "}
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              color: "#4C9BF5",
                              textDecorationLine: "underline",
                              fontSize: "16px",
                            }}
                            textAlign={"left"}>
                            Total : {contractList.length} contract
                            {contractList.length > 1 ? "s" : ""}
                          </Typography>
                        </Box>

                        <Box className='w-[30%] flex justify-end'>
                          <Button
                            onClick={addArea}
                            className=' bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] px-4'>
                            + New Contract
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    <Box className='flex w-full space-x-5 pt-2'>
                      <Box className='w-1/2'>
                        <Selector
                          selectorLabel={"Contract No."}
                          itemSource={contractList}
                          handleChange={handleSelectChange}
                          selectedVal={selectedContractId}
                          name={"selectedContractId"}
                        />
                      </Box>

                      <Box className='w-fit'>
                        <Typography
                          textAlign='left'
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}>
                          Start Date - End Date
                        </Typography>
                        <DatePickerWithRange
                          dateRange={date}
                          setDateRange={setDate}
                          className={`bg-[#D9F0EC] w-full rounded-lg`}
                        />
                      </Box>
                    </Box>

                    <Typography
                      textAlign='left'
                      sx={{
                        fontWeight: "700",
                        color: "#2C5079",
                        fontSize: "14px",
                        paddingBottom: "0.25rem",
                        marginTop: "0.5rem",
                      }}>
                      Attachment
                    </Typography>
                    <Box className='w-full flex space-x-3 '>
                      {attachmentList.map((attach, index) => (
                        <Box
                          key={index}
                          sx={{ borderRadius: "10px" }}
                          className='justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5]'>
                          <Typography
                            sx={{
                              color: "#2C5079",
                              paddingX: "0.5rem",
                              paddingY: "0.25rem",
                            }}>
                            {attach}
                          </Typography>
                          <Trash
                            size={24}
                            color='#F66262'
                            style={{ marginTop: 5 }}
                            className='cursor-pointer'
                          />
                        </Box>
                      ))}
                      <FormControl>
                        <Button
                          onClick={handleAddFileClick}
                          className='w-[82px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] pr-4'>
                          + Add File
                        </Button>
                        <input
                          type='file'
                          ref={inputRef}
                          hidden
                          onChange={handleFileChange}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                )}

                {/* Add New Customer */}
                {!isEdit && (
                  <Box>
                    <Box className='flex w-full space-x-5 pt-2'>
                      <Box className='w-1/2'>
                        <Selector
                          selectorLabel={"Customer"}
                          itemSource={customerList}
                          handleChange={handleSelectChange}
                          selectedVal={customerAdd}
                          name={"addContractCustomer"}
                        />
                      </Box>

                      <Box className='w-1/2'>
                        <Textbox
                          header='Contract Number'
                          name='contractNumber'
                          inputType='text'
                          placeHolder='Type here...'
                          value={addContractNo}
                          handleChange={handleChange}
                        />
                      </Box>
                    </Box>

                    <Box className='flex w-full space-x-5 pt-2'>
                      <Box className='w-1/2'>
                        <Typography
                          textAlign='left'
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}>
                          Start Date
                        </Typography>
                        <DatePicker h={"h-10"} />
                      </Box>

                      <Box className='w-1/2'>
                        <Typography
                          textAlign='left'
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}>
                          End Date
                        </Typography>
                        <DatePicker h={"h-10"} />
                      </Box>
                    </Box>

                    <Typography
                      textAlign='left'
                      sx={{
                        fontWeight: "700",
                        color: "#2C5079",
                        fontSize: "14px",
                        paddingBottom: "0.25rem",
                        marginTop: "0.5rem",
                      }}>
                      Attachment
                    </Typography>
                    <Box className='w-full flex space-x-3 '>
                      <Button
                        onClick={addArea}
                        className='w-[84px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] pr-4'>
                        + Add File
                      </Button>
                    </Box>
                  </Box>
                )}

                <Box sx={{ width: "100%" }}>
                  <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleTabChange} aria-label='areaTabs'>
                        <Tab label='Shift' value='1' />
                        <Tab label='Manpower' value='2' />
                        <Tab label='Patrol Alert List' value='3' />
                        <Tab label='Patrol Round' value='4' />
                      </TabList>
                    </Box>
                    <TabPanel value='1' sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className='w-full text-center items-center'>
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}>
                          Total shift: {shiftList.length}
                        </Typography>
                        {shiftList.map((shift, index) => (
                          <div className='mb-2' key={index}>
                            <Box className='flex w-full'>
                              <Box
                                key={index}
                                sx={{
                                  bgcolor: "#EBF4F6",
                                  width: "100%",
                                  display: "flex",
                                  p: 2,
                                  borderRadius: "10px 0px 0px 10px",
                                }}
                                className='space-x-2'>
                                <Box
                                  sx={{
                                    width: "50%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}>
                                  <LabelTextField2
                                    label={"Shift name"}
                                    placeholder={"Type here..."}
                                    inputVal={shift.desc}
                                    field={"desc"}
                                    id={shift.id}
                                    handleChangeVal={
                                      handleFieldShiftListTypeChange
                                    }
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    maxWidth: "50%",
                                    width: "50%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}>
                                  <CheckBoxDropDown
                                    itemSource={data.daysOfWeek}
                                    label='Working Days'
                                    unit='วัน'
                                    selectedVal={shift.workdays}
                                    handleChangeVal={
                                      handleFieldShiftListTypeChange
                                    }
                                    id={shift.id}
                                    field={"workdays"}
                                    desc='จำนวน'
                                    maxLength={8}
                                    maxDiaplay={7}
                                  />
                                </Box>
                              </Box>
                              <Box className='h-[72px]'>
                                <Button
                                  onClick={() => removeShift(shift.id)}
                                  className='bg-[#F66262] rounded-r-lg rounded-l-none h-full px-2'>
                                  <Trash color='white' />
                                </Button>
                              </Box>
                            </Box>
                          </div>
                        ))}
                        <Box className='flex'>
                          <AddButton onAddBtnClick={(e) => addShift()} />
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value='2' sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className='w-full text-center items-center'>
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}>
                          Total manpower: {totalManpower}
                        </Typography>

                        {shiftList.map((shift, index) => (
                          <div className='mb-2' key={index}>
                            <Accordion
                              sx={{ bgcolor: "#EBF4F6", mb: "0.5rem" }}>
                              <AccordionSummary
                                sx={{ borderBottom: "1px solid #C7D4D7" }}
                                expandIcon={<FaSortDown />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}>
                                <Box className='w-full flex justify-between'>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      color: "#1D7A9B",
                                      fontWeight: 700,
                                    }}>
                                    {shift.desc}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "#F66262",
                                      textDecorationLine: "underline",
                                      fontSize: "16px",
                                      mr: 3,
                                    }}>
                                    {shift.manpowers.length} role
                                    {shift.manpowers.length > 1 ? "s" : ""}
                                  </Typography>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                {shift.manpowers.map((manpower, index) => (
                                  <Box sx={{ display: "flex" }} key={index}>
                                    <Box
                                      key={index}
                                      sx={{
                                        bgcolor: "white",
                                        width: "100%",
                                        display: "flex",
                                        p: 2,
                                        mb: 1.5,
                                        borderRadius: "10px",
                                      }}>
                                      <Box
                                        sx={{
                                          width: "100%",
                                        }}
                                        className='space-y-4'>
                                        <Box
                                          sx={{ display: "flex", mr: 0.5 }}
                                          className='space-x-2'>
                                          <Box sx={{ width: "42%" }}>
                                            <LabelTextField2
                                              label={"ตำแหน่งของลูกค้า"}
                                              placeholder={"Type here..."}
                                              inputVal={manpower.nameInReport}
                                              handleChangeVal={
                                                handleFieldManpowerTypeChange
                                              }
                                              field={"nameInReport"}
                                              id={shift.id}
                                              id2={manpower.id}
                                            />
                                          </Box>
                                          <Box sx={{ width: "42%" }}>
                                            <LabelSelector3
                                              selectorLabel={"ตำแหน่ง"}
                                              itemSource={data.roles}
                                              handleSelectedVal={
                                                handleFieldManpowerTypeChange
                                              }
                                              selectedVal={manpower.roleId}
                                              field={"roleId"}
                                              defaultSelected='select'
                                              id={shift.id}
                                              id2={manpower.id}
                                            />
                                          </Box>
                                          <Box sx={{ width: "16%" }}>
                                            <LabelTextField2
                                              label={"จำนวน"}
                                              placeholder={"Type here..."}
                                              inputVal={manpower.quantity}
                                              handleChangeVal={
                                                handleFieldManpowerTypeChange
                                              }
                                              field={"quantity"}
                                              id={shift.id}
                                              id2={manpower.id}
                                            />
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      key={`${manpower}-${index}`}
                                      className='h-[72px]'>
                                      <Button
                                        onClick={() =>
                                          removeManpower(shift.id, manpower.id)
                                        }
                                        className='bg-[#F66262] rounded-r-lg rounded-l-none h-full px-2'>
                                        <Trash color='white' />
                                      </Button>
                                    </Box>
                                  </Box>
                                ))}

                                <Box
                                  sx={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                  }}>
                                  <AddButton
                                    onAddBtnClick={(e) => addManpower(shift.id)}
                                  />
                                  <Typography
                                    sx={{
                                      color: "#4C9BF5",
                                      textDecorationLine: "underline",
                                      fontSize: "16px",
                                      mt: 1,
                                    }}>
                                    Total manpower:{" "}
                                    {shift.manpowers.reduce((sum, mp) => {
                                      return (sum += mp.quantity);
                                    }, 0)}
                                  </Typography>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                      </Box>
                    </TabPanel>
                    <TabPanel value='3' sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className='w-full text-center items-center'>
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}>
                          Total Alert: {alertToList.length}
                        </Typography>
                        {alertToList.map((alertTo, index) => (
                          <div className='mb-2' key={`${alertTo} - ${index}`}>
                            <Box
                              sx={{
                                bgcolor: "#EBF4F6",
                                p: 2,
                                borderRadius: "10px 0px 0px 10px",
                                width: "100%",
                              }}
                              className='space-y-4'>
                              <Box
                                key={`${alertTo} - ${index}-contentBox`}
                                className='space-x-2 flex'>
                                <Box className='w-11 h-10 bg-[#37B7C3] rounded-lg justify-center text-white pt-2'>
                                  {index + 1}
                                </Box>
                                <Box
                                  sx={{
                                    width: "40%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}>
                                  <LabelSelector3
                                    selectorLabel={"สังกัด"}
                                    itemSource={[
                                      { id: 1, desc: "ASM" },
                                      { id: 2, desc: "ลูกค้า" },
                                    ]}
                                    selectedVal={alertTo.isAsm}
                                    field={"isAsm"}
                                    id={alertTo.id}
                                    handleSelectedVal={
                                      handleFieldPatrolAlertListTypeChange
                                    }
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    width: "40%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}>
                                  {" "}
                                  {alertTo.isAsm === 2 ? (
                                    <LabelTextField2
                                      label={"ชื่อ นามสกุล"}
                                      placeholder={"Type here..."}
                                      inputVal={alertTo.name}
                                      field={"name"}
                                      id={alertTo.id}
                                      handleChangeVal={
                                        handleFieldPatrolAlertListTypeChange
                                      }
                                    />
                                  ) : (
                                    <LabelSelector3
                                      selectorLabel={"ชื่อ นามสกุล"}
                                      itemSource={asmAlertNames}
                                      selectedVal={alertTo.name}
                                      field={"name"}
                                      id={alertTo.id}
                                      handleSelectedVal={
                                        handleFieldPatrolAlertListTypeChange
                                      }
                                    />
                                  )}
                                </Box>
                                <Button
                                  onClick={() => removeAlertToList(alertTo.id)}
                                  className='bg-[#F66262] rounded-lg h-full px-2'>
                                  <Trash color='white' />
                                </Button>
                              </Box>
                              <Box key={index} className='space-x-2 flex'>
                                <Box
                                  sx={{
                                    ml: "9%",
                                    width: "40%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}>
                                  <LabelTextField2
                                    label={"Email"}
                                    placeholder={"Type here..."}
                                    inputVal={
                                      alertTo.isAsm === 1
                                        ? asmAlertNames.find(
                                            (a) => a.desc === alertTo.name
                                          )?.email || ""
                                        : alertTo.email
                                    }
                                    field={"email"}
                                    id={alertTo.id}
                                    handleChangeVal={
                                      handleFieldPatrolAlertListTypeChange
                                    }
                                    disable={alertTo.isAsm === 1 ? true : false}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    width: "40%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}>
                                  <CheckBoxDropDown
                                    itemSource={data.roles}
                                    label={"ตำแหน่งอื่นๆ ที่ต้องการรับ Alert"}
                                    unit={"ตำแหน่ง"}
                                    selectedVal={alertTo.otherPositionId}
                                    id={alertTo.id}
                                    field={"otherPositionId"}
                                    handleChangeVal={
                                      handleFieldPatrolAlertListTypeChange
                                    }
                                    desc={"เลือก"}
                                    maxLength={data.roles.length}
                                    maxDiaplay={data.roles.length}
                                  />
                                </Box>
                              </Box>
                              <Button
                                className='flex text-[#1D7A9B] bg-transparent hover:bg-transparent underline w-full pt-0 justify-center'
                                onClick={() => handleAlertToDetail(alertTo)}>
                                ดู Area & Round ที่รับ Alert
                                <GoArrowUpRight
                                  size={24}
                                  color='#1D7A9B'
                                  style={{ marginTop: 5 }}
                                />
                              </Button>
                            </Box>
                          </div>
                        ))}
                        <Box className='flex'>
                          <AddButton onAddBtnClick={(e) => addAlertToList()} />
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value='4' sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className='w-full text-center items-center'>
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}>
                          Total: {areas.length} area
                          {areas.length > 1 ? "s" : ""}
                        </Typography>

                        {areaList.map((area, index) => (
                          <div className='mb-2' key={index}>
                            <Accordion
                              sx={{ bgcolor: "#EBF4F6", mb: "0.5rem" }}>
                              <AccordionSummary
                                sx={{ borderBottom: "1px solid #C7D4D7" }}
                                expandIcon={<FaSortDown />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}>
                                <Box className='w-full flex justify-between'>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      color: "#1D7A9B",
                                      fontWeight: 700,
                                    }}>
                                    {area.areaName}
                                  </Typography>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  sx={{
                                    color: "#2C5079",
                                    textDecorationLine: "underline",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    pb: 1,
                                  }}>
                                  Patrol Round
                                </Typography>
                                {area.roundList.map((round, index) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      bgcolor: "white",
                                      width: "100%",
                                      display: "flex",
                                      p: 2,
                                      mb: 1.5,
                                      borderRadius: "10px",
                                    }}>
                                    <Box
                                      sx={{
                                        width: "90%",
                                      }}
                                      className='space-y-4'>
                                      <Box
                                        sx={{ display: "flex", mr: 0.5 }}
                                        className='space-x-3'>
                                        <Box sx={{ width: "15%" }}>
                                          <LabelTextField2
                                            label={"รอบที่"}
                                            placeholder={""}
                                            inputVal={round.number}
                                            handleChangeVal={
                                              handleFieldDataInRoundChange
                                            }
                                            field={"number"}
                                            id={area.areaId}
                                            id2={round.id}
                                          />
                                        </Box>
                                        <Box sx={{ width: "30%" }}>
                                          <FloatingLabelBox
                                            labelAlign={"left"}
                                            label={"ตั้งแต่"}
                                            field={
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  color: "#2C5079",
                                                }}>
                                                <Clock
                                                  className='w-[24%] mt-2 ml-2'
                                                  size={20}
                                                />
                                                <Input
                                                  value={round.startTimeHr}
                                                  className='p-0 ml-1 w-[26%] border-none text-center text-[14px]'
                                                  type='number'
                                                  min={0}
                                                  max={24}
                                                  onChange={(e) =>
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "startTimeHr",
                                                      e.target.value
                                                    )
                                                  }
                                                  onBlur={(e) => {
                                                    const value =
                                                      handleInputHour(
                                                        e.target.value,
                                                        "hr"
                                                      );
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "startTimeHr",
                                                      value
                                                    );
                                                  }}
                                                />
                                                <Typography
                                                  sx={{
                                                    fontSize: "18px",
                                                    mt: 0.5,
                                                  }}>
                                                  :
                                                </Typography>
                                                <Input
                                                  value={round.startTimeMin}
                                                  className='p-0 w-[25%] border-none text-center mr-1 text-[14px]'
                                                  onChange={(e) =>
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "startTimeMin",
                                                      e.target.value
                                                    )
                                                  }
                                                  onBlur={(e) => {
                                                    const value =
                                                      handleInputHour(
                                                        e.target.value,
                                                        "min"
                                                      );
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "startTimeMin",
                                                      value
                                                    );
                                                  }}
                                                />
                                              </Box>
                                            }
                                          />
                                        </Box>
                                        <Box sx={{ width: "30%" }}>
                                          <FloatingLabelBox
                                            labelAlign={"left"}
                                            label={"ถึง"}
                                            field={
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  color: "#2C5079",
                                                }}>
                                                <Clock
                                                  className='w-[25%] mt-2 ml-2'
                                                  size={20}
                                                />
                                                <Input
                                                  value={round.finishTimeHr}
                                                  className='p-0 w-[25%] border-none text-center text-[14px]'
                                                  onChange={(e) =>
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "finishTimeHr",
                                                      e.target.value
                                                    )
                                                  }
                                                  onBlur={(e) => {
                                                    const value =
                                                      handleInputHour(
                                                        e.target.value,
                                                        "hr"
                                                      );
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "finishTimeHr",
                                                      value
                                                    );
                                                  }}
                                                />
                                                <Typography
                                                  sx={{
                                                    fontSize: "18px",
                                                    mt: 0.5,
                                                  }}>
                                                  :
                                                </Typography>
                                                <Input
                                                  value={round.finishTimeMin}
                                                  className='p-0 w-[25%] border-none text-center mr-1 text-[14px]'
                                                  onChange={(e) =>
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "finishTimeMin",
                                                      e.target.value
                                                    )
                                                  }
                                                  onBlur={(e) => {
                                                    const value =
                                                      handleInputHour(
                                                        e.target.value,
                                                        "min"
                                                      );
                                                    handleFieldDataInRoundChange(
                                                      area.areaId,
                                                      round.id,
                                                      "finishTimeMin",
                                                      value
                                                    );
                                                  }}
                                                />
                                              </Box>
                                            }
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            width: "25%",
                                            border: "1px solid #2C5079",
                                            borderRadius: "10px",
                                            bgcolor: "#EBF4F6",
                                          }}>
                                          <Typography
                                            sx={{
                                              color: "#2C5079",
                                              mt: 1,
                                            }}>
                                            {round.totalTimeMin} minutes
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Box
                                        sx={{ display: "flex", mr: 0.5 }}
                                        className='space-x-3'>
                                        <Box sx={{ width: "50%" }}>
                                          <LabelSelector3
                                            selectorLabel={"ของวัน"}
                                            itemSource={isSameDayList}
                                            handleSelectedVal={
                                              handleFieldDataInRoundChange
                                            }
                                            selectedVal={round.isSameDay}
                                            field={"isSameDay"}
                                            defaultSelected='เลือก'
                                            id={area.areaId}
                                            id2={round.id}
                                          />
                                        </Box>
                                        <Box sx={{ width: "50%" }}>
                                          <LabelSelector3
                                            selectorLabel={"ผลัด"}
                                            itemSource={shiftList}
                                            handleSelectedVal={
                                              handleFieldDataInRoundChange
                                            }
                                            selectedVal={round.shift}
                                            field={"shift"}
                                            defaultSelected='เลือก'
                                            id={area.areaId}
                                            id2={round.id}
                                          />
                                        </Box>
                                      </Box>

                                      <Box
                                        sx={{ display: "flex", mr: 0.5 }}
                                        className='space-x-3'>
                                        <Box
                                          sx={{
                                            width: "50%",
                                            display: "flex",
                                          }}>
                                          <Box
                                            sx={{
                                              width: "45%",
                                              display: "flex",
                                              textAlign: "left",
                                            }}>
                                            <Checkbox
                                              className='w-9 h-9 mt-1'
                                              checked={round.isNeed}
                                              onCheckedChange={(e) =>
                                                handleFieldDataInRoundChange(
                                                  area.areaId,
                                                  round.id,
                                                  "isNeed",
                                                  !round.isNeed
                                                )
                                              }
                                            />
                                            <Typography className='pl-1 pt-2 text-[#2C5079] text-[15px]'>
                                              บังคับเดิน
                                            </Typography>
                                          </Box>
                                          <Box
                                            sx={{
                                              width: "55%",
                                              display: "flex",
                                            }}>
                                            <Checkbox
                                              className='w-9 h-9 mt-1'
                                              checked={round.isStrictOrder}
                                              onCheckedChange={(e) =>
                                                handleFieldDataInRoundChange(
                                                  area.areaId,
                                                  round.id,
                                                  "isStrictOrder",
                                                  !round.isStrictOrder
                                                )
                                              }
                                            />
                                            <Typography className='pl-1 pt-2 text-[#2C5079] text-[15px]'>
                                              เดินตามลำดับ
                                            </Typography>
                                          </Box>
                                        </Box>
                                        <Box sx={{ width: "50%" }}>
                                          <CheckBoxDropDown
                                            itemSource={alertToList}
                                            label={"Alert to"}
                                            unit={""}
                                            selectedVal={round.alertTo}
                                            id={area.areaId}
                                            id2={round.id}
                                            field={"alertTo"}
                                            handleChangeVal={
                                              handleFieldDataInRoundChange
                                            }
                                            desc={"เลือก"}
                                            maxLength={alertToList.length}
                                            maxDiaplay={alertToList.length}
                                          />
                                        </Box>
                                      </Box>
                                    </Box>

                                    <Button
                                      onClick={() =>
                                        removeRound(area.areaId, round.id)
                                      }
                                      className='bg-[#F66262] rounded-lg w-14 h-full'>
                                      <Trash color='white' />
                                    </Button>
                                  </Box>
                                ))}

                                <Box
                                  sx={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                  }}>
                                  <AddButton
                                    onAddBtnClick={(e) => addRound(area.areaId)}
                                  />
                                  <Typography
                                    sx={{
                                      color: "#4C9BF5",
                                      textDecorationLine: "underline",
                                      fontSize: "16px",
                                      mt: 1,
                                    }}>
                                    Total: {area.roundList.length} round
                                    {area.roundList.length > 1 ? "s" : ""}
                                  </Typography>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </div>

            {/* Footer */}
            {!isEdit && (
              <Box className='flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4'>
                <CancelBtn onCancelBtnClick={handleCloseContractForm} />
                <SubmitBtn onSubmitBtnClick={handleSubmit} />
              </Box>
            )}
            {isEdit && (
              <Box className='flex w-full justify-between px-6 border-t-2 pt-4 pb-4'>
                <Button
                  className='flex text-[#2C5079] pt-2 bg-transparent hover:bg-transparent underline'
                  onClick={handleUndo}>
                  <VscRefresh
                    style={{ transform: "rotate(-60deg) scaleX(-1)" }}
                    size={24}
                  />
                  Undo all changes
                </Button>
                <Box className='space-x-4'>
                  <DeleteBtnFooter
                    onDeleteBtnFooterClick={handleDelete}
                    disable={false}
                  />
                  <SaveBtnFooter onSaveBtnFooterClick={handleSave} />
                </Box>
              </Box>
            )}
          </div>
        </>
      )}

      {showAlertToDeatil && (
        <AlertToDatail
          closeModal={handleDisplayAlertToDetail}
          selectedAlertTo={selectedALertTo}
          areaList={areaList}
          shiftList={shiftList}
        />
      )}
    </div>
  );
};

export default ContractForm;
