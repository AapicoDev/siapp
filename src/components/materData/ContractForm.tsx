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
  Grid2,
  CircularProgress,
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
import AlertToDatail from "./AlertToDetail";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3";
import Image from "next/image";
import {
  addNewContract,
  addNewManpowerPosition,
  addNewPatrolAlertTo,
  addNewRoundData,
  addNewShifts,
  deleteContract,
  deleteManpowerPosition,
  deletePatrolAlertTo,
  deleteRoundData,
  deleteShift,
  getMasterAreaData,
  getMasterAreaDataWithCustomerId,
  getMasterManpowerPositionData,
  getMasterPatrolAlertToData,
  getMasterRoundData,
  getMasterShiftData,
  queryMasterContract,
  updateArea,
  updateContract,
  updateDataOfContract,
  updateManpowerPosition,
  updatePatrolAlertTo,
  updateRoundData,
  updateShifts,
} from "@/app/lib/api";
import { useConfirmDialog } from "../../components/ui/alertDialog/confirmDialog";

type AreaData = {
  id: number;
  custId: any;
  name: string;
  totalChkPt: number;
  round: any[];
  roundIds: string[];
};

type RoundData = {
  id: any;
  areaId: any;
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

type ShiftListType = {
  id: any;
  desc: any;
  workdays: any[];
  manpowers: ManpowerType[];
  manpowerIdList: string[];
  status: string;
};

type ManpowerType = {
  id: any;
  shiftId: string;
  customerId: string;
  nameInReport: string;
  positionId: any;
  positionName: string;
  quantity: number;
  status: string;
};

type PatrolAlertListType = {
  id: any;
  empId: any;
  isAsm: any;
  name: string;
  email: string;
  otherRoleId: any[];
  desc: any;
  status: string;
};

type ContractType = {
  id: string;
  desc: string;
  customer_Id: string;
  startDate: Date;
  endDate: Date;
  attachments: string[];
  isActive: boolean;
  shift_Ids: string[];
  alertTo_Ids: string[];
  status: string;
  isActivePreviousValue: boolean;
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

interface ContractFormProps {
  selectedCustomer: any;
  closeModal: any;
  customerAreas: any[];
  isEditContract: boolean;
  custList: any[];
  isFromCustomerPage?: boolean;
  setIsAddOrUpdateSuccess: any;
}

const ContractForm = ({
  selectedCustomer,
  closeModal,
  customerAreas,
  isEditContract,
  isFromCustomerPage = true,
  custList = [{ id: 1, desc: "" }],
  setIsAddOrUpdateSuccess,
}: ContractFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isEdit, setIsEdit] = useState(isEditContract);
  const [customer, setCustomer] = useState(
    selectedCustomer || {
      hr_code: "",
      id: "",
      department_Id: "",
      segment_Id: "",
      group_Id: "",
      zone_Id: "",
      code: "",
      isActive: true,
      customerName: "",
      areaId: [],
      contractTotal: 0,
    }
  );
  const [areas, setAreas] = useState<AreaData[]>(customerAreas);
  const [formHeader, setFormHeader] = useState("");
  const [customerList, setCustomerList] = useState(
    custList || [{ id: 1, desc: "" }]
  );
  const [customerAdd, setCustomerAdd] = useState(
    customerList.length > 1 ? "" : customerList[0]?.id
  );
  const [addContractNo, setAddContractNo] = useState("");
  const [tabValue, setTabValue] = useState("1");
  const [areaOpen, setAreaOpen] = useState(Array(areas.length).fill(false)); // Array to track edit state for each row

  const [isSameDayList, setIsSameDayList] = useState<any[]>(mockIsSameDayList);
  const [shiftList, setShiftList] = useState<ShiftListType[]>([]);
  const [totalManpower, setTotalManpower] = useState(0);
  const [alertToList, setAlertToList] = useState<PatrolAlertListType[]>([
    {
      id: 0,
      empId: undefined,
      isAsm: 0,
      name: "",
      email: "",
      otherRoleId: [],
      desc: "",
      status: "",
    },
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
          areaId: "",
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
          status: "new",
        },
      ],
      roundIdList: [],
      latestRoundID: 0,
      areaStatus: "existed",
    },
  ]);
  const [contractList, setContractList] = useState<ContractType[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractType>({
    id: "",
    desc: "",
    customer_Id: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    attachments: [],
    isActive: true,
    shift_Ids: [],
    alertTo_Ids: [],
    status: "new",
    isActivePreviousValue: false
  });
  const [attachmentList, setAttachmentList] = useState<any[]>([]);
  const [addContractStartDate, setAddContractStartDate] = useState<Date>(new Date());
  const [addContractFinishDate, setAddContractFinishDate] = useState<Date>(addDays(new Date(), 1));
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
  const [selectNewFile, setSelectNewFile] = useState<any[]>([]);
  const [allContractsOfCustomer, setAllContractsOfCustomer] = useState<ContractType[]>([]);

  useEffect(() => {
    if (!isEdit) {
      setFormHeader("+ New Contract");
    } else {
      setFormHeader("View / Edit Contract");
    }
    const initialize = async () => {
      const initialSelctedContract = await contractListInitial();
      console.log("initialSeelctedContract =", initialSelctedContract);
      contractDetail(initialSelctedContract.length > 0 ? initialSelctedContract[0] : selectedContract);
      //initialData();
    };
    initialize();
  }, [areas]);


  const initialData = () => {
    areas.forEach((area) => {
      //Find checkpoint from API with all received area ID
      area.totalChkPt = data.checkpoints.filter(
        (c) => c.areaId === area.id
      ).length;
    });
  };

  const contractListInitial = async () => {
    // const contracts = data.contracts.filter(
    //   (c) => c.customerId === customer.customerId && (!isFromCustomerPage ? customer.id === c.id : true) //&& c.isActive
    // );
    let queryContract;
    if(isFromCustomerPage){
      queryContract = {field: "customer_Id", value: customer.id};
    }
    else {
      queryContract = {field: "$id", value: customer.selectedContractId || ""};
    }
    console.log("queryContract = ", queryContract)
    const contracts = await queryMasterContract(queryContract.field,queryContract.value);
    const mappedContract =
      contracts?.documents.map((contract) => ({
        id: contract.$id,
        desc: contract.contractNo,
        customer_Id: contract.customer_Id,
        startDate: contract.startDate,
        endDate: contract.endDate,
        attachments: contract.attachments,
        isActive: contract.isActive,
        shift_Ids: contract.shift_Ids,
        alertTo_Ids: contract.alertTo_Ids,
        status: "existed",
        isActivePreviousValue: contract.isActive,
      })) || [];
    console.log("mappedContract", mappedContract);
    setContractList(mappedContract);
    console.log("mappedContract[0]", mappedContract[0]);

    const contractsOfCustomer = await queryMasterContract("customer_Id", customer.id);
    setAllContractsOfCustomer(
      contractsOfCustomer?.documents.map((contract) => ({
        id: contract.$id,
        desc: contract.contractNo,
        customer_Id: contract.customer_Id,
        startDate: contract.startDate,
        endDate: contract.endDate,
        attachments: contract.attachments,
        isActive: contract.isActive,
        shift_Ids: contract.shift_Ids,
        alertTo_Ids: contract.alertTo_Ids,
        status: "existed",
        isActivePreviousValue: contract.isActive,
      })) || []
    );
    setSelectedContract(mappedContract[0] || selectedContract);
    return mappedContract;
  };

  const addNewContractinitial = (selectedCustId: any) => {
    //Mapped area
    const customerAreas: AreaData[] = data.areas
      .filter((area) => area.custId === selectedCustId)
      .map((area) => ({
        id: area.id,
        custId: area.custId,
        name: area.name,
        totalChkPt: 0,
        round: [],
        roundIds: [],
      }));
    setAreas(customerAreas);
    // const mappedAreaList: AreaListType[] = customerAreas.map((area: AreaData) => {
    //   return {
    //     areaId: area.id, // Mapping `id` from AreaData
    //     areaName: area.name, // Mapping `name` from AreaData
    //     totalChkPt: area.totalChkPt, // Mapping `totalChkPt` from AreaData
    //     roundList: roundManagement(area.id, selectedContract), // Assigning the filtered round data
    //     latestRoundID: 0,
    //   };
    // });
    // mappedAreaList.map(
    //   (a) =>
    //     (a.latestRoundID = a.roundList.reduce(
    //       (max, round) => (round.id > max ? round.id : max),
    //       0
    //     ))
    // );
    // setAreaList(mappedAreaList);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    console.log("selected =", e.target);
    if (name === "addContractCustomer") {
      console.log("customerAdd = ", value);
      setCustomerAdd(value);
      addNewContractinitial(value);
    } else if (name === "selectedContractId") {
      contractDetail(selectedContract);
      console.log("customer =", customer);
    }
  };

  function formatToISOString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const adjustedDate = new Date(date.getTime() - timezoneOffset);
    console.log("adjustDate =", adjustedDate.toISOString());
    return adjustedDate.toISOString();
  }

  const handleFieldContractChange = (e: any, name?: string) => {
    let fieldName: keyof ContractType;
    let value: any;
    if (name === "startDate" || name === "endDate") {
      fieldName = name;
      value = formatToISOString(e);
    } 
    else {
      fieldName = e.target.name;
      value = e.target.value;
    }
    if (fieldName === "id") {
      console.log("contractList =", contractList);
      setSelectedContract(
        contractList.find((contract) => contract.id === value) || selectedContract
      );
      contractDetail(
        contractList.find((contract) => contract.id === value) || contractList[0]
      );
    }
    setSelectedContract((prevData: ContractType) => ({
      ...prevData,
      [fieldName]: value,
      status:
        fieldName === "id"
          ? prevData.status
          : prevData.status === "new"
          ? "new"
          : "edit",
    }));
  };

  const contractDetail = async (selectedContract: ContractType) => {
    //#region Not use StartDate - FinishDate
    // const filteredContract = data.contracts.find(
    //   (c) => c.id === selectedContract.id
    // );
    // setDate({
    //   from: new Date(filteredContract?.startDate || "") || date?.from,
    //   to: new Date(filteredContract?.finishDate || "") || date?.to,
    // });
    //#endregion

    //attachmentList
    setIsLoading(true);
    console.log("selectedContract =", selectedContract);
    const filesName = selectedContract.attachments?.map((file) => {
      const split = file.split(";;");
      return {
        fileName: split[0],
        fileUrl: split[1],
      };
    });
    console.log("filesName =", filesName);
    setAttachmentList(filesName);

    // Shift list
    const shiftsOfContract = await getShiftsOfContract(selectedContract.id);
    setShiftList(shiftsOfContract);
    calTotalManPowerOfAllShift(shiftsOfContract);
    console.log("shiftsOfContract =", shiftsOfContract);

    //Alert to List
    const patrolAlertToOfContract = await getAlertToOfContract(
      selectedContract.id
    );
    setAlertToList(patrolAlertToOfContract || alertToList);
    console.log("mappedAlertList =", patrolAlertToOfContract);

    //asmAlertNames
    const asmAlertNameList = data.employees.map((a) => ({
      id: a.empId,
      desc: a.fname + " " + a.lname,
      email: a.email,
    }));
    setAsmAlertNames(asmAlertNameList);

    //Mapped area
    const mappedAreaList: AreaListType[] = await Promise.all(
      areas.map(async (area: AreaData) => {
        const roundList = await roundManagement(area.id, selectedContract.id, patrolAlertToOfContract);
        return {
          areaId: area.id, // Mapping `id` from AreaData
          areaName: area.name, // Mapping `name` from AreaData
          totalChkPt: area.totalChkPt, // Mapping `totalChkPt` from AreaData
          roundList,
          roundIdList: area.roundIds,
          latestRoundID: 0,
          areaStatus: "existed",
        };
      })
    );
    mappedAreaList.map(
      (a) =>
        (a.latestRoundID = a.roundList.reduce(
          (max, round) => (round.id > max ? round.id : max),
          0
        ))
    );
    setAreaList(mappedAreaList);
    setIsLoading(false);
  };

  async function getShiftsOfContract(contractId: string) {
    const shiftsOfContract = await getMasterShiftData("contractID", contractId);
    const mappedShiftList: ShiftListType[] = await Promise.all(
      shiftsOfContract?.documents?.map(async (shift) => {
        const manpowers = await mappedManpowerOfEachShift(shift.$id);
        return {
          id: shift.$id,
          desc: shift.shiftName,
          workdays: shift.workDays,
          manpowers,
          manpowerIdList: shift.manpowerID_List,
          status: "existed",
        };
      }) || shiftList
    );
    return mappedShiftList;
  }

  async function getAlertToOfContract(contractId: string) {
    const patrolAlertToOfContract = await getMasterPatrolAlertToData(
      contractId
    );
    console.log("patrolAlertToOfContract =", patrolAlertToOfContract);
    const mappedAlertList: PatrolAlertListType[] =
      patrolAlertToOfContract?.documents.map((alertTo) => ({
        id: alertTo.$id,
        empId: alertTo.employee_Id,
        isAsm: alertTo.isASM,
        name: alertTo.name,
        email: alertTo.email,
        otherRoleId: alertTo.otherRole_Id,
        desc: alertTo.name,
        status: "existed",
      })) || alertToList;
    setAlertToList(mappedAlertList || alertToList);
    console.log("mappedAlertList =", mappedAlertList);
    return mappedAlertList;
  }

  async function getAreaAndRound(alertList=alertToList) {
    const mappedAreaList: AreaListType[] = await Promise.all(
      areas.map(async (area: AreaData) => {
        const roundList = await roundManagement(area.id, selectedContract.id, alertList);
        return {
          areaId: area.id, // Mapping `id` from AreaData
          areaName: area.name, // Mapping `name` from AreaData
          totalChkPt: area.totalChkPt, // Mapping `totalChkPt` from AreaData
          roundList,
          roundIdList: area.roundIds,
          latestRoundID: 0,
          areaStatus: "existed",
        };
      })
    );
    mappedAreaList.map(
      (a) =>
        (a.latestRoundID = a.roundList.reduce(
          (max, round) => (round.id > max ? round.id : max),
          0
        ))
    );
    return mappedAreaList;
  }

  const mappedManpowerOfEachShift = async (shiftId: any) => {
    const manpowerRolesOfShift = await getMasterManpowerPositionData(shiftId);
    const mappedManpower: ManpowerType[] =
      manpowerRolesOfShift?.documents.map((man) => {
        return {
          id: man.$id,
          shiftId: shiftId,
          customerId: man.customer_Id,
          nameInReport: man.nameInReport,
          positionId: man.position_Id,
          positionName: man.position_Name,
          quantity: man.requireQuantity,
          status: "existed",
        };
      }) || [];
    return mappedManpower;
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
    const updatedAreaList = areaList.map((area) => {
      if (area.areaId === areaId) {
        // Update the roundList for the matched areaId
        let updatedRoundData = area.roundList.map((item) =>
          item.id === roundId
            ? {
                ...item,
                [field]: value,
                status: item.status === "new" ? "new" : "edit",
              }
            : item
        );

        if (
          ((field === "startTimeHr" ||
            "startTimeMin" ||
            "finishTimeHr" ||
            "finishTimeMin") &&
            value.length <= 2) ||
          field === "isSameDay"
        ) {
          updatedRoundData = calMinutes(roundId, updatedRoundData);
        }
        // Return the updated area object
        return {
          ...area,
          areaStatus: "edit",
          roundList: updatedRoundData, // Update the roundList with the modified rounds
        };
      }
      // Return the area unchanged if areaId does not match
      return area;
    });

    // Set the updated areaList
    setAreaList(updatedAreaList);
    console.log("updatedAreaList =", updatedAreaList);
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
      shift.id === shiftId
        ? {
            ...shift,
            [field]: value,
            status: shift.status === "new" ? "new" : "edit",
          }
        : shift
    );
    setShiftList(updatedShiftList);
  };

  const addShift = () => {
    setShiftList([
      ...shiftList,
      {
        id: `${Date.now()}`,
        desc: "",
        workdays: [],
        manpowers: [],
        manpowerIdList: [],
        status: "new",
      },
    ]);
  };

  const removeShift = (id: any) => {
    const deleteShiftIds = deleteShiftList;
    const selectedShift = shiftList.find((shift) => shift.id === id);
    if (
      !deleteShiftIds.includes(id) &&
      (selectedShift?.status === "existed" || selectedShift?.status === "edit")
    ) {
      deleteShiftIds?.push(id);
    }
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
            ? {
                ...item,
                [field]: field === "quantity" ? Number(value) : value,
                status: item.status === "new" ? "new" : "edit",
              }
            : item
        );
        return {
          ...shift,
          manpowers: updatedManpowerData,
          status: "edit",
        };
      }
      return shift;
    });
    setShiftList(updatedShiftList);
    calTotalManPowerOfAllShift(updatedShiftList);
  };

  const addManpower = (selectedShift: any) => {
    const mappedShiftList: ShiftListType[] = shiftList.map((shift) => {
      if (shift.id === selectedShift) {
        return {
          ...shift,
          manpowers: [
            ...shift.manpowers,
            {
              id: Date.now().toString(),
              shiftId: shift.id,
              customerId: selectedContract.customer_Id,
              nameInReport: "",
              positionId: undefined,
              positionName: "",
              quantity: 0,
              status: "new",
            },
          ],
          status: "edit",
        };
      } else {
        return shift;
      }
    });
    setShiftList(mappedShiftList);
  };

  const removeManpower = (selectedShiftId: any, selectedManpowerId: any) => {
    const manpowers =
      shiftList.find((s) => s.id === selectedShiftId)?.manpowers || [];
    const selectedManpower = shiftList
      .find((s) => s.id === selectedShiftId)
      ?.manpowers.find((man) => man.id === selectedManpowerId);

    const deleteManpowerIds = deleteManpowerList;
    const uniqueManpowerId = Array.from(
      new Set(deleteManpowerIds?.map((item: any) => item.manpowerId))
    );
    if (
      !uniqueManpowerId.includes(selectedManpower?.id) &&
      selectedManpower?.status !== "new"
    ) {
      deleteManpowerIds?.push({
        shiftId: selectedShiftId,
        manpowerId: selectedManpowerId,
      });
      setDeleteManpowerList(deleteManpowerIds);
    }

    if (manpowers.length > 0) {
      const filterManpowers = manpowers.filter(
        (mp) => mp.id !== selectedManpowerId
      );
      const mappedShiftList: ShiftListType[] = shiftList.map((shift) => {
        if (shift.id === selectedShiftId) {
          {
            return {
              ...shift,
              manpowers: filterManpowers,
              status: "edit",
            };
          }
        } else {
          return shift;
        }
      });
      setShiftList(mappedShiftList);
      console.log("mappedShiftList =", mappedShiftList);
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
      alertTo.id === patrolAlertId
        ? {
            ...alertTo,
            [field]: value,
            status: alertTo.status === "new" ? "new" : "edit",
          }
        : alertTo
    );

    const mappedAlertList: PatrolAlertListType[] =
      updatedPatrolAlertList.map((alertTo) => ({
        id: alertTo.id,
        empId: alertTo.isAsm === 1 ? alertTo.empId : "",
        isAsm: alertTo.isAsm,
        name:
          alertTo.isAsm === 1
            ? asmAlertNames.find((a) => a.id === alertTo.empId)?.desc
            : alertTo.name,
        email:
          alertTo.isAsm === 1
            ? asmAlertNames.find((a) => a.id === alertTo.empId)?.email
            : alertTo.email,
        otherRoleId: alertTo.otherRoleId,
        desc:
          alertTo.isAsm === 1
            ? asmAlertNames.find((a) => a.id === alertTo.empId)?.desc
            : alertTo.name,
        status: alertTo.status,
      })) || alertToList;
    setAlertToList(mappedAlertList || alertToList);
  };

  const addAlertToList = () => {
    const latestId = alertToList.reduce(
      (max, alert) => (alert.id > max ? alert.id : max),
      0
    );
    setAlertToList([
      ...alertToList,
      {
        id: Date.now().toString(),
        empId: "",
        isAsm: undefined,
        name: "",
        email: "",
        otherRoleId: [],
        desc: "",
        status: "new",
      },
    ]);
  };

  const removeAlertToList = (id: any) => {
    const deleteAlertIds = deleteAlertToList;
    const selectedAlertTo = alertToList.find((alert) => alert.id === id);
    if (!deleteAlertIds.includes(id) && selectedAlertTo?.status !== "new") {
      deleteAlertIds?.push(id);
    }
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
    if (value.length === 1) {
      value = "0" + value;
    }
    if (value.length === 0) {
      value = "0" + 0;
    }
    return value;
  };

  const calMinutes = (roundId: any, roundList: RoundData[]) => {
    console.log("roundList =", roundList);
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
          if (startHr <= finishHr) {
            mins = finishTotalMins - startTotalMins;
            console.log("mins = ", mins);
          } else mins = 0;
        } else {
          //if (finishTotalMins <= startTotalMins) {
          finishTotalMins += 24 * 60;
          //}
          mins = finishTotalMins - startTotalMins;
        }
        item.totalTimeMin = mins < 0 ? "0" : mins.toString();
      }
      return item;
    });
    return rounds;
  };

  const addRound = (selectedAreaId: any) => {
    const mappedAreaList: AreaListType[] = areaList.map((area) => {
      if (area.areaId === selectedAreaId) {
        return {
          ...area,
          roundList: [
            ...area.roundList,
            {
              id: Date.now().toString(),
              areaId: area.areaId,
              number: "",
              startTimeHr: "00",
              finishTimeHr: "00",
              startTimeMin: "00",
              finishTimeMin: "00",
              totalTimeMin: "0",
              isSameDay: 1,
              shift: "",
              alertTo: [],
              isNeed: false,
              isStrictOrder: false,
              status: "new",
            },
          ],
          latestRoundID: area.latestRoundID + 1,
          areaStatus: "edit",
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
    const selectedRound = rounds?.find((r) => r.id === selectedRoundId);

    const deleteRoundIds = deleteRoundList;
    const uniqueRoundIds = Array.from(
      new Set(deleteRoundIds?.map((item: any) => item.roundId))
    );
    if (
      !uniqueRoundIds.includes(selectedRoundId) &&
      selectedRound?.status !== "new"
    ) {
      deleteRoundIds?.push({
        areaId: selectedAreaId,
        roundId: selectedRoundId,
      });
      setDeleteRoundList(deleteRoundIds);
      console.log("deleteRoundIds = ", deleteRoundIds);
    }

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
              roundIdList: filterRounds.map((round) => round.id),
              latestRoundID: area.latestRoundID,
              areaStatus: "edit",
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

  const handleUndo = async () => {
    let selectedContractBeforeUndo = selectedContract;
    const initialSelctedContract = await contractListInitial();
    selectedContractBeforeUndo = initialSelctedContract.find(c => c.id === selectedContractBeforeUndo.id) || initialSelctedContract[0];
    setSelectedContract(selectedContractBeforeUndo);
    await contractDetail(selectedContractBeforeUndo);
    setSelectNewFile([]);
    setDeleteShiftList([]);
    setDeleteManpowerList([]);
    setDeleteAlertToList([]);
    setDeleteRoundList([]);
  };

  const handleDelete = async () => {
    console.log("shiftList = ", shiftList);
    console.log("deleteManpowerList = ", deleteManpowerList);
    console.log("areaList = ", areaList);
    console.log("selectedContract =", selectedContract);
    const confirmApprove = await confirmDialog(
      "Delete Contract",
      "Do you want to delete this contract?", false, "danger"
   );
   if (confirmApprove) {

    //Delete shifts, alertTo, ManpowerPositions of contract
    let deleteContractResult = null;
        const roundOfContract = await getMasterRoundData([{field: "contractId", value: selectedContract.id}]);
        const patrolAlertToOfContract = await getMasterPatrolAlertToData(selectedContract.id);
        const shiftOfContract = await getMasterShiftData("contractID",selectedContract.id);
        const shiftIds = shiftOfContract?.documents?.map(shift => shift.$id);
        let manpowerPositionOfShift;
        if(shiftIds !== undefined && shiftIds?.length > 0 ){
          manpowerPositionOfShift = await getMasterManpowerPositionData(shiftIds);
        }
        if(patrolAlertToOfContract?.total !== undefined && patrolAlertToOfContract?.total > 0) {
          const deleteAlertToResult = await deletePatrolAlertTo(patrolAlertToOfContract?.documents?.map(alert => alert.$id));
          if(deleteAlertToResult === null) console.error("error to delete AlertToList of contract id:", selectedContract.id);
        }
        if(roundOfContract?.total !== undefined && roundOfContract?.total > 0) {
          const deleteRoundResult = await deleteRoundData(roundOfContract?.documents?.map(round => round.$id));
          if(deleteRoundResult === null) console.error("error to delete Round of contract id:", selectedContract.id);
        }
        if(manpowerPositionOfShift?.total !== undefined && manpowerPositionOfShift?.total > 0) {
          const deleteManpowerPositionResult = await deleteManpowerPosition(manpowerPositionOfShift?.documents?.map(man => man.$id));
          if(deleteManpowerPositionResult === null) console.error("error to delete ManpowerPOsition of shift ids:", manpowerPositionOfShift);
        }
        if(shiftIds !== undefined && shiftIds?.length > 0){
          const deleteShiftResult = await deleteShift(shiftIds);
          if(deleteShiftResult === null) console.error("error to delete Shift of contract id", selectedContract.id);
        }
        deleteContractResult = await deleteContract([selectedContract.id]);
        console.log("deleteCustResult =", deleteContractResult);
     if (deleteContractResult.result !== null) {
       const confirmApprove = await confirmDialog(
         "Delete Success",
         "delete customer success.", true
      );
      if(confirmApprove){
       setIsAddOrUpdateSuccess(true);
       handleCloseContractForm();
      }
     }
     else {
      const confirmApprove = await confirmDialog(
        "Error to delete contract",
        `${deleteContractResult.error}`,
        true, "danger"
      );
     }
    }
   }

  const handleSave = async () => {
    console.log("shiftList = ", shiftList);
    //#region  -- Tab Shift --
    if (tabValue === "1") {
      let addNewShiftResult, deleteShiftResult, updateShiftResult;
      let updateShiftsOfContract = shiftList.map((item) => item.id);
      // Add new shift
      const newShift = shiftList.filter((shift) => shift.status === "new");
      if (newShift.length > 0) {
        const dataToSubmit =
          newShift?.map((newShift) => {
            return {
              shiftName: newShift.desc,
              customerID: selectedContract.customer_Id,
              customerName: customer?.customerName,
              contractID: selectedContract.id,
              workDays: newShift.workdays,
              manpowerID_List: [],
              isActive: selectedContract.isActive,
            };
          }) || [];
        console.log("new shift dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        addNewShiftResult = await addNewShifts(dataToSubmit);
        setIsLoading(false);
        if (addNewShiftResult !== null) {
          if (addNewShiftResult) {
            updateShiftsOfContract = shiftList
              .filter(
                (item) => item.status === "existed" || item.status === "edit"
              )
              .map((item) => item.id);
            updateShiftsOfContract =
              updateShiftsOfContract.concat(addNewShiftResult);
            console.log("updateShiftOfContract =", updateShiftsOfContract);
            const resultUpdateShiftIofContract = await updateContract(
              selectedContract.id,
              { shift_Ids: updateShiftsOfContract }
            );
          }
        }
      }

      // Delete Shifts
      if (deleteShiftList.length > 0) {
        console.log("deleteShiftList =", deleteShiftList);
        setIsLoading(true);
        deleteShiftResult = await deleteShift(deleteShiftList);
        setIsLoading(false);
        //console.log("deleteResult", deleteCheckpointResult);
        if (deleteShiftResult != null) {
          setIsLoading(true);
          deleteShiftList.map(async shiftId => {
            const manpowerOfShift = await getMasterManpowerPositionData(shiftId);
            const manpowerId = manpowerOfShift?.documents?.map(man => man.$id);
            console.log("manpowerId =", manpowerId);
            const deleteManpowerOfShiftResult = await deleteManpowerPosition(manpowerId);
            if(deleteManpowerOfShiftResult === null){
              console.error("Error to delete mnapower of shift ", shiftId);
            }
          })
          setDeleteShiftList([]);
          const resultUpdateShiftOfContract = await updateContract(
            selectedContract.id,
            { shift_Ids: updateShiftsOfContract }
          );
          setIsLoading(false);
        }
      }

      // Edit Shift
      const editShiftList = shiftList.filter(
        (shift) => shift.status === "edit"
      );
      console.log("editShiftList = ", editShiftList);
      if (editShiftList.length > 0) {
        const dataToSubmit =
          editShiftList?.map((shift) => {
            return {
              documentId: shift.id,
              updateFields: {
                shiftName: shift.desc,
                workDays: shift.workdays,
                isActive: selectedContract.isActive,
              },
            };
          }) || [];
        console.log("dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        updateShiftResult = await updateShifts(dataToSubmit);
        setIsLoading(false);
      }

      let dataShiftUpdate = false;
      if (
        newShift.length > 0 ||
        editShiftList.length > 0 ||
        deleteShiftList.length > 0
      ) {
        dataShiftUpdate = true;
      }

      if (dataShiftUpdate) {
        if (
          addNewShiftResult !== null &&
          updateShiftResult !== null &&
          deleteShiftResult !== null
        ) {
          const confirmApprove = await confirmDialog(
            "Save shift data Success",
            "Save shift Data of Contract successfully.",
            true,
            "success"
          );
          const updatedShift = await getShiftsOfContract(selectedContract.id);
          setShiftList(updatedShift);
          setIsAddOrUpdateSuccess(true);
        } else {
          const confirmApprove = await confirmDialog(
            "Error to save shift data.",
            "Error to save shift data",
            true,
            "danger"
          );
          setIsAddOrUpdateSuccess(false);
        }
      }
    }
    //#endregion

    //#region -- Tab Manpower --
    else if (tabValue === "2") {
      let addNewManpowerPositionResult: any, deleteManpowerPositioResult, updateManpowerPositioResult;
      let updateManpowerIdOfShift;

      const manpowerChangesInShift = shiftList.filter(
        (shift) => shift.status === "edit"
      );
      console.log("manpowerChangesInShift =", manpowerChangesInShift);

      //Add Manpower Position
      const manpowerPositionNew = manpowerChangesInShift.flatMap((shift) =>
        shift.manpowers.filter((man) => man.status === "new")
      );
      if (manpowerPositionNew.length > 0) {
        const dataToSubmit =
          manpowerPositionNew?.map((mpPosition) => {
            return {
              nameInReport: mpPosition.nameInReport,
              requireQuantity: mpPosition.quantity,
              shift_Id: mpPosition.shiftId,
              customer_Id: mpPosition.customerId,
              position_Id: mpPosition.positionId,
              position_Name: data.positions.find(
                (item) => item.id === mpPosition.positionId
              )?.desc,
            };
          }) || [];
        console.log("New Manpower dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        addNewManpowerPositionResult = await addNewManpowerPosition(
          dataToSubmit
        );
        setIsLoading(false);
        console.log(
          "addNewManpowerPositionResult =",
          addNewManpowerPositionResult
        );
        if (addNewManpowerPositionResult !== null) {
          if (addNewManpowerPositionResult.length > 0) {
            const uniqueShiftIdToUpdate = Array.from(
              new Set(
                addNewManpowerPositionResult?.map((item: any) => item.shiftId)
              )
            );
            let shiftToUpdate = manpowerChangesInShift.filter((shift) =>
              uniqueShiftIdToUpdate.includes(shift.id)
            );
            shiftToUpdate = shiftToUpdate.map((shift) => {
              const matchingShiftIds = addNewManpowerPositionResult
                ?.filter((r: any) => r.shiftId === shift.id)
                .map((r: any) => r.id); // Extract id values
              // Concatenate matching ids to manpowerIdList
              return {
                ...shift,
                manpowerIdList: shift.manpowerIdList.concat(matchingShiftIds),
              };
            });
            console.log("shiftToUpdate Add Manpower =", shiftToUpdate);
            const dataToSubmit =
              shiftToUpdate?.map((shift) => {
                return {
                  documentId: shift.id,
                  updateFields: {
                    manpowerID_List: shift.manpowerIdList,
                  },
                };
              }) || [];
            console.log(
              "Update Add manpower to Shift dataToSubmit =",
              dataToSubmit
            );
            setIsLoading(true);
            updateManpowerIdOfShift = await updateShifts(dataToSubmit);
            setIsLoading(false);
            if (updateManpowerIdOfShift === null) {
              const confirmApprove = await confirmDialog(
                "Error to update shift data.",
                "Error to update manpowerId list of shift data",
                true,
                "danger"
              );
            }
          }
        }
      }

      // Delete Mnapower Position
      console.log("deleteManpowerList =", deleteManpowerList);
      const uniqueDeleteManpowerId = Array.from(
        new Set(deleteManpowerList?.map((item: any) => item.manpowerId))
      );
      const uniquShiftId = Array.from(
        new Set(deleteManpowerList?.map((item: any) => item.shiftId))
      );
      if (deleteManpowerList.length > 0) {
        const shiftToUpdateDeleteManpowerId = await getMasterShiftData(
          "$id",
          uniquShiftId
        );
        console.log(
          "shiftToUpdate =",
          shiftToUpdateDeleteManpowerId?.documents
        );
        setIsLoading(true);
        deleteManpowerPositioResult = await deleteManpowerPosition(
          uniqueDeleteManpowerId
        );
        setIsLoading(false);
        if (deleteManpowerPositioResult != null) {
          setDeleteManpowerList([]);
          const dataToSubmit =
            shiftToUpdateDeleteManpowerId?.documents?.map((shift) => {
              return {
                documentId: shift.$id,
                updateFields: {
                  manpowerID_List: shift.manpowerID_List.filter(
                    (id: any) => !uniqueDeleteManpowerId.includes(id)
                  ),
                },
              };
            }) || [];
          console.log("delete Manpower dataToSubmit =", dataToSubmit);
          setIsLoading(true);
          updateManpowerIdOfShift = await updateShifts(dataToSubmit);
          setIsLoading(false);
          if (updateManpowerIdOfShift === null) {
            const confirmApprove = await confirmDialog(
              "Error to update shift data.",
              "Error to update manpowerId list of shift data",
              true,
              "danger"
            );
          }
        }
      }

      // Update Manpower Position
      const manpowerPositionUpdate = manpowerChangesInShift.flatMap((shift) =>
        shift.manpowers.filter((man) => man.status === "edit")
      );
      if (manpowerPositionUpdate.length > 0) {
        const dataToSubmit =
          manpowerPositionUpdate?.map((mpPosition) => {
            return {
              documentId: mpPosition.id,
              updateFields: {
                nameInReport: mpPosition.nameInReport,
                requireQuantity: mpPosition.quantity,
                shift_Id: mpPosition.shiftId,
                customer_Id: mpPosition.customerId,
                position_Id: mpPosition.positionId,
                position_Name: data.positions.find(
                  (item) => item.id === mpPosition.positionId
                )?.desc,
              },
            };
          }) || [];
        console.log("update shift dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        updateManpowerPositioResult = await updateManpowerPosition(
          dataToSubmit
        );
        setIsLoading(false);
      }

      let dataManpowerPositionUpdate = false;
      if (manpowerPositionNew.length > 0 || manpowerPositionUpdate.length > 0 || deleteManpowerList.length > 0) {
        dataManpowerPositionUpdate = true;
      }

      if(dataManpowerPositionUpdate) {
        if ( addNewManpowerPositionResult !== null &&
          deleteManpowerPositioResult !== null &&
          updateManpowerPositioResult !== null) {
          const confirmApprove = await confirmDialog(
            "Save Manpower data Success",
            "Save manpower Data of Shift successfully.",
            true,
            "success"
          );
          const updatedShift = await getShiftsOfContract(selectedContract.id);
          setShiftList(updatedShift);
          setIsAddOrUpdateSuccess(true);
        } else {
          const confirmApprove = await confirmDialog(
            "Error to save data.",
            "Error to save manpower data",
            true,
            "danger"
          );
          setIsAddOrUpdateSuccess(false);
        }
      } 
    }
    //#endregion -- Manpower Tab --

    //#region  -- Tab Patrol Alert List
    if (tabValue === "3") {
      let addNewAlertToResult, deleteAlertToResult, updateAlertToResult;
      let updateAlertToOfContract = alertToList.map((item) => item.id);
      console.log("updateAlertToOfContract =", updateAlertToOfContract);
      // Add new Patrol Alert List
      const newAlertTo = alertToList.filter((alert) => alert.status === "new");
      console.log("newAlertTo =", newAlertTo);
      if (newAlertTo.length > 0) {
        const dataToSubmit =
          newAlertTo?.map((alertTo) => {
            return {
              name: alertTo.name,
              email: alertTo.email,
              isASM: alertTo.isAsm,
              otherRole_Id: alertTo.otherRoleId,
              contract_Id: selectedContract.id,
              isActive: selectedContract.isActive,
              employee_Id: alertTo.empId,
            };
          }) || [];
        console.log("new alertTo dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        addNewAlertToResult = await addNewPatrolAlertTo(dataToSubmit);
        setIsLoading(false);
        if (addNewAlertToResult !== null) {
          if (addNewAlertToResult) {
            updateAlertToOfContract = alertToList
              .filter(
                (item) => item.status === "existed" || item.status === "edit"
              )
              .map((item) => item.id);
            updateAlertToOfContract =
              updateAlertToOfContract.concat(addNewAlertToResult);
            console.log("updateAlertToOfContract =", updateAlertToOfContract);
            const resultUpdateAlertToOfContract = await updateContract(
              selectedContract.id,
              { alertTo_Ids: updateAlertToOfContract }
            );
          }
        }
      }

      // Delete Patrol Alert List
      console.log("deleteAlertToList =", deleteAlertToList);
      if (deleteAlertToList.length > 0) {
        setIsLoading(true);
        deleteAlertToResult = await deletePatrolAlertTo(deleteAlertToList);
        setIsLoading(false);
        //console.log("deleteResult", deleteCheckpointResult);
        if (deleteAlertToResult != null) {
          setDeleteAlertToList([]);
          setIsLoading(true);
          const resultUpdateShiftOfContract = await updateContract(
            selectedContract.id,
            { alertTo_Ids: updateAlertToOfContract }
          );
          setIsLoading(false);
        }
      }

      // Edit Patrol Alert List
      const editAlertList = alertToList.filter(
        (alert) => alert.status === "edit"
      );
      console.log("editAlertList = ", editAlertList);
      if (editAlertList.length > 0) {
        const dataToSubmit =
          editAlertList?.map((alertTo) => {
            return {
              documentId: alertTo.id,
              updateFields: {
                name: alertTo.name,
                email: alertTo.email,
                isASM: alertTo.isAsm,
                otherRole_Id: alertTo.otherRoleId,
                isActive: selectedContract.isActive,
                employee_Id: alertTo.empId,
              },
            };
          }) || [];
        console.log("dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        updateAlertToResult = await updatePatrolAlertTo(dataToSubmit);
        setIsLoading(false);
      }

      let dataPatrolAlertListUpdate = false;
      if (newAlertTo.length > 0 || editAlertList.length > 0 || deleteAlertToList.length > 0) {
        dataPatrolAlertListUpdate = true;
      }

      if(dataPatrolAlertListUpdate){
        if (
          addNewAlertToResult !== null &&
          updateAlertToResult !== null &&
          deleteAlertToResult !== null
        ) {
          const confirmApprove = await confirmDialog(
            "Save Patrol Alert List data Success",
            "Save Patrol Alert List of Contract successfully.",
            true,
            "success"
          );
          const updatedLaertTolist = await getAlertToOfContract(
            selectedContract.id
          );
          setAlertToList(updatedLaertTolist);
          const updatedRound = await getAreaAndRound(updatedLaertTolist);
          setAreaList(updatedRound);
          setIsAddOrUpdateSuccess(true);
        } else {
          const confirmApprove = await confirmDialog(
            "Error to save Patrol Alert List data.",
            "Error to save Patrol Alert List data",
            true,
            "danger"
          );
          setIsAddOrUpdateSuccess(false);
        }
      }
    }
    //#endregion

    //#region -- Tab Round --
    if (tabValue === "4") {
      console.log("areaList =", areaList);
      let addNewRoundResult: any, deleteRoundResult, updateRoundResult;
      let updateRoundOfArea;

      const roundChangesInArea = areaList.filter(
        (area) => area.areaStatus === "edit"
      );
      console.log("roundChangesInArea =", roundChangesInArea);

      //Add Round
      const newRound = roundChangesInArea.flatMap((area) =>
        area.roundList.filter((round) => round.status === "new")
      );
      if (newRound.length > 0) {
        const dataToSubmit =
          newRound?.map((newRound) => {
            return {
              contractId: selectedContract.id,
              areaId: newRound.areaId,
              endTime: mapToDateTime(
                newRound.finishTimeHr,
                newRound.finishTimeMin
              ),
              startTime: mapToDateTime(
                newRound.startTimeHr,
                newRound.startTimeMin
              ),
              totalTime: parseInt(newRound.totalTimeMin),
              shiftId: newRound.shift,
              roundNo: newRound.number,
              isStrictOrder: newRound.isStrictOrder,
              isNeedto: newRound.isNeed,
              isSameDay: newRound.isSameDay === 1 ? true : false,
              alertTo: newRound.alertTo,
              isActive: selectedContract.isActive,
            };
          }) || [];
        console.log("New Round dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        addNewRoundResult = await addNewRoundData(dataToSubmit);
        setIsLoading(false);
        console.log("addNewRoundResult =", addNewRoundResult);
        if (addNewRoundResult !== null) {
          if (addNewRoundResult.length > 0) {
            const uniqueAreaIdToUpdate = Array.from(
              new Set(addNewRoundResult?.map((item: any) => item.areaId))
            );
            let areaToUpdate = roundChangesInArea.filter((area) =>
              uniqueAreaIdToUpdate.includes(area.areaId)
            );
            console.log("areaToUpdate =", areaToUpdate);
            areaToUpdate = areaToUpdate.map((area) => {
              const newRoundIdOfArea = addNewRoundResult
                ?.filter((r: any) => r.areaId === area.areaId)
                .map((r: any) => r.id); // Extract id values
              return {
                ...area,
                roundIdList: area.roundIdList.concat(newRoundIdOfArea),
              };
            });
            console.log("areaToUpdate Add Round =", areaToUpdate);
            const dataToSubmit =
              areaToUpdate?.map((area) => {
                return {
                  documentId: area.areaId,
                  updateFields: {
                    roundIDs: area.roundIdList,
                  },
                };
              }) || [];
            console.log(
              "Update Addded Round to area dataToSubmit =",
              dataToSubmit
            );
            setIsLoading(true);
            updateRoundOfArea = await updateArea(dataToSubmit);
            setIsLoading(false);
            if (updateRoundOfArea === null) {
              const confirmApprove = await confirmDialog(
                "Error to update Area data.",
                "Error to update round ID list of area data",
                true,
                "danger"
              );
            }
          }
        }
      }

      // Delete Round
      console.log("deleteRoundList =", deleteRoundList);
      const uniqueDeleteRoundId = Array.from(
        new Set(deleteRoundList?.map((item: any) => item.roundId))
      );
      const uniquAreaId = Array.from(
        new Set(deleteRoundList?.map((item: any) => item.areaId))
      );
      if (deleteRoundList.length > 0) {
        const areaToUpdateDeleteRoundId = await getMasterAreaData(
          "$id",
          uniquAreaId
        );
        console.log(
          "areaToUpdateDeleteRoundId =",
          areaToUpdateDeleteRoundId?.documents
        );
        setIsLoading(true);
        deleteRoundResult = await deleteRoundData(uniqueDeleteRoundId);
        setIsLoading(false);
        if (deleteRoundResult != null) {
          setDeleteRoundList([]);
          const dataToSubmit =
            areaToUpdateDeleteRoundId?.documents?.map((area) => {
              return {
                documentId: area.$id,
                updateFields: {
                  roundIDs: area.roundIDs.filter(
                    (id: any) => !uniqueDeleteRoundId.includes(id)
                  ),
                },
              };
            }) || [];
          console.log("delete RoundIds dataToSubmit =", dataToSubmit);
          setIsLoading(true);
          updateRoundOfArea = await updateArea(dataToSubmit);
          setIsLoading(false);
          if (updateRoundOfArea === null) {
            const confirmApprove = await confirmDialog(
              "Error to update Area data.",
              "Error to update Round Id list of Area data",
              true,
              "danger"
            );
          }
        }
      }

      // Update Round
      const updateRounds = roundChangesInArea.flatMap((area) =>
        area.roundList.filter((round) => round.status === "edit")
      );
      console.log("updateRounds =", updateRounds);
      if (updateRounds.length > 0) {
        const dataToSubmit =
          updateRounds?.map((updateRound) => {
            return {
              documentId: updateRound.id,
              updateFields: {
                contractId: selectedContract.id,
                areaId: updateRound.areaId,
                endTime: mapToDateTime(
                  updateRound.finishTimeHr,
                  updateRound.finishTimeMin
                ),
                startTime: mapToDateTime(
                  updateRound.startTimeHr,
                  updateRound.startTimeMin
                ),
                totalTime: parseInt(updateRound.totalTimeMin),
                shiftId: updateRound.shift,
                roundNo: updateRound.number,
                isStrictOrder: updateRound.isStrictOrder,
                isNeedto: updateRound.isNeed,
                isSameDay: updateRound.isSameDay === 1 ? true : false,
                alertTo: updateRound.alertTo,
                isActive: selectedContract.isActive,
              },
            };
          }) || [];
        console.log("update round dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        updateRoundResult = await updateRoundData(dataToSubmit);
        setIsLoading(false);
      }

      let dataRoundUpdate = false;
      if (newRound.length > 0 || updateRounds.length > 0 || deleteRoundList.length > 0) {
        dataRoundUpdate = true;
      }

      if(dataRoundUpdate){
        if (
          addNewRoundResult !== null &&
          deleteRoundResult !== null &&
          updateRoundResult !== null
        ) {
          const confirmApprove = await confirmDialog(
            "Save Round data Success",
            "Save Round Data of Area successfully.",
            true,
            "success"
          );
          const updatedRound = await getAreaAndRound();
          setAreaList(updatedRound);
          setIsAddOrUpdateSuccess(true);
        } else {
          const confirmApprove = await confirmDialog(
            "Error to save data.",
            "Error to save Round data",
            true,
            "danger"
          );
          setIsAddOrUpdateSuccess(false);
        }
      }
    }
    //#endregion -- Tab Round --

    //Update Contract Data
    if (selectedContract.status === "edit" || selectNewFile?.length > 0) {
      const contractDataToSubmit = {
        id: selectedContract.id,
        startDate: selectedContract.startDate,
        endDate: selectedContract.endDate,
        attachments: selectedContract.attachments,
        isActive: selectedContract.isActive,
      };
      console.log("selectedContract =", selectedContract);
      setIsLoading(true);
      const resultUpdateDataOfContract = await updateDataOfContract(
        contractDataToSubmit,
        selectNewFile
      );
      setIsLoading(false);
      if (resultUpdateDataOfContract !== null) {
        let updateShiftResult, updatePatrolAlertResult, updateRoundAlertResult;
        // -- Update isActive of Shift, PatrolAlertList, Round --
        if(selectedContract.isActive !== selectedContract.isActivePreviousValue){
          const shiftOfContract = await getMasterShiftData("contractID", selectedContract.id);
          const patrolAlertListOfContract = await getMasterPatrolAlertToData(selectedContract.id);
          const roundOfContract = await getMasterRoundData([{field: "contractId", value: selectedContract.id}]);
          if (shiftOfContract?.documents !== undefined && shiftOfContract?.documents.length > 0) {
            const isActiveOfShiftToSubmit =
              shiftOfContract.documents?.map((shift) => {
                return {
                  documentId: shift.$id,
                  updateFields: {
                    isActive: selectedContract.isActive,
                  },
                };
              }) || [];
            console.log("isActiveOfShiftToSubmit =", isActiveOfShiftToSubmit);
            setIsLoading(true);
            updateShiftResult = await updateShifts(isActiveOfShiftToSubmit);
            setIsLoading(false);
            if(updateShiftResult === null) console.log("error to update isActive of Shift");
          }
          if (patrolAlertListOfContract?.documents !== undefined && patrolAlertListOfContract?.documents.length > 0) {
            const isActiveOfPatrolAlertToSubmit =
              patrolAlertListOfContract.documents?.map((alert) => {
                return {
                  documentId: alert.$id,
                  updateFields: {
                    isActive: selectedContract.isActive,
                  },
                };
              }) || [];
            console.log("isActiveOfPatrolAlertToSubmit =", isActiveOfPatrolAlertToSubmit);
            setIsLoading(true);
            updatePatrolAlertResult = await updatePatrolAlertTo(isActiveOfPatrolAlertToSubmit);
            setIsLoading(false);
            if(updatePatrolAlertResult === null) console.log("error to update isActive of Patrol Alert List");

          }
          if (roundOfContract?.documents !== undefined && roundOfContract?.documents.length > 0) {
            const isActiveOfRoundToSubmit =
              roundOfContract.documents?.map((alert) => {
                return {
                  documentId: alert.$id,
                  updateFields: {
                    isActive: selectedContract.isActive,
                  },
                };
              }) || [];
            console.log("isActiveOfRoundToSubmit =", isActiveOfRoundToSubmit);
            setIsLoading(true);
            updateRoundAlertResult = await updateRoundData(isActiveOfRoundToSubmit);
            setIsLoading(false);
            if(updateRoundAlertResult === null) console.log("error to update isActive of Round.");
          }
          if(updateShiftResult === null || updatePatrolAlertResult === null || updateRoundAlertResult === null){
            const confirmApprove = await confirmDialog(
              "Error to save data.",
              "Error to save isActive of Shift or PatrolAlertToList or Round of Contract data",
              true,
              "danger"
            );
          }
        }

        // -- Pull updated contract value --
        setSelectNewFile([]);
        let selectedContractBeforeSave = selectedContract;
        const mappedConract = await contractListInitial();
        console.log("mappedConract =", mappedConract);
        console.log("selectedContract =", selectedContract);
        selectedContractBeforeSave = mappedConract.find(c => c.id === selectedContractBeforeSave.id) || mappedConract[0];
        setSelectedContract(selectedContractBeforeSave);
        await contractDetail(selectedContractBeforeSave);
        const confirmApprove = await confirmDialog(
          "Save Contract data Success",
          "Save Contract Data successfully.",
          true,
          "success"
        );
        setIsAddOrUpdateSuccess(true);
      } else {
        const confirmApprove = await confirmDialog(
          "Error to save data.",
          "Error to save Contract data",
          true,
          "danger"
        );
        setIsAddOrUpdateSuccess(false);
      }
    }
  };

  function mapToDateTime(hr: string, min: string, targetDate = new Date()) {
    targetDate.setUTCHours(parseInt(hr), parseInt(min), 0, 0);
    // Convert to ISO string and replace the 'Z' with timezone offset "+00:00"
    return targetDate.toISOString().replace("Z", "+00:00");
  }

  const handleSubmit = async () => {
    console.log("customerAdd =", customerAdd);
    console.log("addContractStartDate =", addContractStartDate)
    console.log("addContractFinishDate =", addContractFinishDate)
    console.log("addContractNo =", addContractNo)
    console.log("selectNewFile =", selectNewFile)
    console.log("selectedContract =", selectedContract)
    console.log("custList =", custList)
    const contractDataToSubmit = {
      contractNo: addContractNo,
      customer_Id: customerAdd,
      customerName: custList.find(cust => cust.id === customerAdd).desc,
      startDate: addContractStartDate,
      endDate: addContractFinishDate,
      attachments: selectedContract.attachments,
      shift_Ids: selectedContract.shift_Ids,
      alertTo_Ids: selectedContract.alertTo_Ids,
      isActive: false,
    };
    console.log("contractDataToSubmit =", contractDataToSubmit);
    console.log("selectNewFile =", selectNewFile);
    setIsLoading(true);
    const resultAddNewContract = await addNewContract(
      contractDataToSubmit,
      selectNewFile
    );
    setIsLoading(false);
    if(resultAddNewContract.result !== null){
      const dialogRresult = await confirmDialog(
        "Submit new Contract data Success",
        "Submit new contract Data successfully.",
        true,
        "success"
      );
      if(dialogRresult){
        setIsAddOrUpdateSuccess(true);
        closeModal(isEdit);
      }
    }
    else {
      const confirmApprove = await confirmDialog(
        "Error to add new contract data.",
        `${resultAddNewContract.error}`,
        true,
        "danger"
      );
      setIsAddOrUpdateSuccess(false);
    }
  };

  const handleTabChange = async (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    if(isEdit){
      if (tabValue === "1") {
        //Shift Tab
        if (
          deleteShiftList.length > 0 ||
          shiftList.some(
            (shift) => shift.status === "edit" || shift.status === "new"
          )
        ) {
          const dialogResult = await warningChangeTab();
          if (dialogResult) return;
        }
      } else if (tabValue === "2") {
        //Manpower Tab
        if (
          deleteManpowerList.length > 0 ||
          shiftList.some((shift) => shift.status === "edit")
        ) {
          const dialogResult = await warningChangeTab();
          if (dialogResult) return;
        }
      } else if (tabValue === "3") {
        //Patrol Alert List Tab
        if (
          deleteAlertToList.length > 0 ||
          alertToList.some(
            (alert) => alert.status === "edit" || alert.status === "new"
          )
        ) {
          const dialogResult = await warningChangeTab();
          if (dialogResult) return;
        }
      } else if (tabValue === "4") {
        //Round Tab
        if (
          deleteRoundList.length > 0 ||
          areaList.some((area) => area.areaStatus === "edit")
        ) {
          const dialogResult = await warningChangeTab();
          if (dialogResult) return;
        }
      }
    }
    setTabValue(newValue);
  };

  async function warningChangeTab() {
    const confirmApprove = await confirmDialog(
      "Please save changes.",
      "Please save changes before change tab.",
      true,
      "warning"
    );
    return confirmApprove;
  }

  async function roundManagement(areaId: any, contractId: any, alertList = alertToList) {
    const roundOfAreaAndContract = await getMasterRoundData([
      { field: "areaId", value: areaId },
      { field: "contractId", value: contractId },
    ]);
    const roundDataArray: RoundData[] =
      roundOfAreaAndContract?.documents.map((round) => ({
        id: round.$id,
        areaId: areaId,
        number: round.roundNo,
        startTimeHr: new Date(round.startTime)
          .getUTCHours()
          .toString()
          .padStart(2, "0"),
        startTimeMin: new Date(round.startTime)
          .getMinutes()
          .toString()
          .padStart(2, "0"),
        finishTimeHr: new Date(round.endTime)
          .getUTCHours()
          .toString()
          .padStart(2, "0"),
        finishTimeMin: new Date(round.endTime)
          .getMinutes()
          .toString()
          .padStart(2, "0"),
        totalTimeMin: calMinFromData(round.startTime, round.endTime, round.isSameDay),
        isSameDay: round.isSameDay === true ? 1 : 2,
        shift: round.shiftId,
        alertTo: round.alertTo?.filter((alert: string) => alertList.map(alert => alert.id).includes(alert)),
        isNeed: round.isNeedto,
        isStrictOrder: round.isStrictOrder,
        status: "existed",
      })) || [];

    console.log("roundDataArray =", roundDataArray);
    return roundDataArray;
  }

  function calMinFromData(start: any, finish: any, isSameDay: any) {
    const finishHr = new Date(finish).getUTCHours();
    const startHr = new Date(start).getUTCHours();
    const startMin = new Date(start).getUTCMinutes();
    const finishMin = new Date(finish).getUTCMinutes();
    const startTotalMins = startHr * 60 + startMin;
    let finishTotalMins = finishHr * 60 + finishMin;
    let mins = 0;
    if (isSameDay === true) {
      if (startHr <= finishHr) {
        mins = finishTotalMins - startTotalMins;
        console.log("mins = ", mins);
      } else mins = 0;
    }
    else {
      finishTotalMins += 24 * 60;
      mins = finishTotalMins - startTotalMins;
    }
    mins = mins < 0 ? 0 : mins;
    // const hoursToMins =
    //   Math.abs(
    //     (finishHr === 0 ? 24 : finishHr) - (startHr === 0 ? 24 : startHr)
    //   ) * 60;
    // let sumMins =
    //   hoursToMins +
    //   (new Date(finish).getMinutes() - new Date(start).getMinutes());
    return mins
  }

  async function handleCloseContractForm() {
    if(isEdit){
      const isShiftEdit = shiftList.some(shift => shift.status === "edit" || shift.status === "new") || deleteShiftList.length > 0;
      const isPatrolAlertToListEdit = alertToList.some(alert => alert.status === "edit" || alert.status === "new") || deleteAlertToList.length > 0;
      const isRoundEdit = areaList.some(area => area.areaStatus === "edit") || deleteRoundList.length > 0;
      if(isShiftEdit || isPatrolAlertToListEdit || isRoundEdit || selectedContract.status === "edit"){
        const confirmClose = await confirmDialog(
          "Close without saving?",
          "Do you want to close this window without saving?",
          false,
          "warning"
        );
        if(!confirmClose) return;
      }
      closeModal(isEdit);
    }
    else{
      closeModal(isEdit);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes
    if (!files) {
      console.log("!files");
      return;
    }
    const file = files[0];
    if (!allowedTypes.includes(file?.type)) {
      alert("Only PDF, JPG, PNG, and GIF files are allowed.");
      return;
    }
    if (file.size > maxFileSize) {
      alert("File size must not exceed 2 MB.");
      return;
    }
    // use the file
    setSelectNewFile([...selectNewFile, file]);
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

  const handleContractInactive = (checked: boolean) => {
    if (checked) {
      setSelectedContract((prevData: ContractType) => ({
        ...prevData,
        ["isActive"]: false,
        status: prevData.status === "new" ? "new" : "edit",
      }));
    }
  };
  const handleContractActive = async (checked: boolean) => {
    if (checked) {
      if(allContractsOfCustomer.some(contract => contract.isActive === true && contract.id !== selectedContract.id)){
        const confirmClose = await confirmDialog(
          "Contract of customer can Active only one contract.",
          "Please check current Active contract",
          true,
          "warning"
        );
        return;
      }
      setSelectedContract((prevData: ContractType) => ({
        ...prevData,
        ["isActive"]: true,
        status: prevData.status === "new" ? "new" : "edit",
      }));
    }
  };

  const handleRemoveNewFile = (fileName: any) => {
    const remainFile = selectNewFile.filter((f) => f.name != fileName);
    setSelectNewFile(remainFile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-40">
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
              onClick={handleCloseContractForm}
            >
              <IoClose size={26} />
            </Button2>
          </Box>
          <div className={`bg-white rounded-b-lg shadow-lg min-h-${isEdit ? `[544px]`: `[344px]`} max-h-[654px] w-[700px]`}> 
            {/* Body */}
            <div className={`max-h-${isEdit ? `[528px]`: `[328px]`} min-h-${isEdit ? `[528px]`: `[328px]`} overflow-auto`}>
              <Box className="w-full px-6 py-2 rounded-t-lg pb-6">
                {/* View / Edit Customer */}
                {isEdit && (
                  <Box>
                    <Box className="flex w-full space-x-5 pt-2">
                      <Box className="w-full border-b-2 pb-2 flex">
                        <Box className="w-[70%]">
                          <Box className="flex">
                            <Typography
                              textAlign="left"
                              sx={{
                                fontWeight: "700",
                                color: "#2C5079",
                                fontSize: "16px",
                                paddingBottom: "0.25rem",
                              }}
                            >
                              {`Customer : `}
                            </Typography>
                            <Typography
                              textAlign="left"
                              sx={{
                                color: "#2C5079",
                                fontSize: "16px",
                                paddingBottom: "0.25rem",
                                paddingLeft: "0.25rem",
                              }}
                            >
                              {`${customer?.customerName}` + " "}
                            </Typography>
                          </Box>

                          {isFromCustomerPage && (
                            <Typography
                              sx={{
                                color: "#4C9BF5",
                                textDecorationLine: "underline",
                                fontSize: "16px",
                              }}
                              textAlign={"left"}
                            >
                              Total : {contractList.length} contract
                              {contractList.length > 1 ? "s" : ""}
                            </Typography>
                          )}
                        </Box>

                        <Box className="w-[30%] flex justify-end">
                          {/* <Button
                        onClick={addArea}
                        className=" bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] px-4"
                      >
                        + New Contract
                      </Button> */}
                        </Box>
                      </Box>
                    </Box>

                    <Box className="flex w-full space-x-5 pt-2">
                      <Box className="w-1/2">
                        <Selector
                          disable={
                            !isFromCustomerPage && contractList.length < 2
                          }
                          selectorLabel={"Contract No."}
                          itemSource={contractList}
                          handleChange={handleFieldContractChange}
                          selectedVal={selectedContract.id}
                          name={"id"}
                        />
                      </Box>

                      {/* <Box className="w-fit">
                    <Typography
                      textAlign="left"
                      sx={{
                        fontWeight: "700",
                        color: "#2C5079",
                        fontSize: "14px",
                        paddingBottom: "0.25rem",
                      }}
                    >
                      Start Date - End Date
                    </Typography>
                    <DatePickerWithRange
                      dateRange={date}
                      setDateRange={setDate}
                      className={`bg-[#D9F0EC] w-full rounded-lg`}
                    />
                  </Box> */}
                      <Box className="w-1/2">
                        <Typography
                          textAlign="left"
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}
                        >
                          Contract Status
                        </Typography>
                        <Box display={"flex"} className="space-x-2">
                          <Box
                            sx={{ borderRadius: "10px" }}
                            className={`${
                              selectedContract.isActive
                                ? `bg-[#E2F7E1] border-[#86DC89]`
                                : `bg-white border-[#2C5079]`
                            } flex p-1 h-fit border-[1px] w-1/2`}
                          >
                            <Checkbox3
                              onCheckedChange={handleContractActive}
                              checked={selectedContract.isActive}
                            />
                            <Typography
                              sx={{ color: "#2C5079" }}
                              className="py-1 px-2"
                            >
                              Active
                            </Typography>
                          </Box>
                          <Box
                            sx={{ borderRadius: "10px" }}
                            className={`${
                              !selectedContract.isActive
                                ? `bg-[#E2F7E1] border-[#86DC89]`
                                : `bg-white border-[#2C5079]`
                            } flex p-1 h-fit border-[1px] w-1/2`}
                          >
                            <Checkbox3
                              onCheckedChange={handleContractInactive}
                              checked={!selectedContract.isActive}
                            />
                            <Typography
                              className="py-1 px-2"
                              sx={{ color: "#2C5079" }}
                            >
                              Inactive
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box className="flex w-full space-x-7 pt-2">
                      <Box className="w-1/2">
                        <Typography
                          textAlign="left"
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}
                        >
                          Start Date
                        </Typography>
                        <DatePicker
                          date={new Date(selectedContract.startDate)}
                          setDate={(e) =>
                            handleFieldContractChange(e, "startDate")
                          }
                          h={"h-10"}
                        />
                      </Box>

                      <Box className="w-1/2">
                        <Typography
                          textAlign="left"
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}
                        >
                          End Date
                        </Typography>
                        <DatePicker
                          date={new Date(selectedContract.endDate)}
                          setDate={(e) =>
                            handleFieldContractChange(e, "endDate")
                          }
                          h={"h-10"}
                        />
                      </Box>
                    </Box>

                    <Typography
                      textAlign="left"
                      sx={{
                        fontWeight: "700",
                        color: "#2C5079",
                        fontSize: "14px",
                        paddingBottom: "0.25rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Attachment
                    </Typography>
                    <Typography
                      textAlign="left"
                      sx={{
                        fontSize: "14px",
                        color: "#4C9BF5",
                        fontWeight: "700",
                        paddingTop: "0.5rem",
                        pb: "0.5rem",
                      }}
                    >
                      Existing Files :
                    </Typography>
                    <Grid2 container sx={{ width: "100%", mb: 1 }} spacing={2}>
                      {attachmentList.map((attach, index) => (
                        <Grid2 size={4} key={index}>
                          <Box
                            key={index}
                            sx={{ borderRadius: "10px" }}
                            className="justify-between flex p-1 bg-white w-full border-[1px] border-[#4C9BF5]"
                          >
                            <a
                              target="_blank"
                              href={attach.fileUrl}
                              className="w-full flex justify-between"
                            >
                              <Typography className="py-1 px-2 text-[#2C5079]">
                                {attach.fileName.length > 17
                                  ? attach.fileName.substring(0, 17) + "..."
                                  : attach.fileName}
                              </Typography>
                              <GoArrowUpRight
                                size={24}
                                color="#4C9BF5"
                                style={{ marginTop: 5 }}
                              />
                              {/* <Trash
                              size={22}
                              color="#F66262"
                              style={{ marginTop: 5 }}
                              className="cursor-pointer"
                            /> */}
                            </a>
                          </Box>
                        </Grid2>
                      ))}
                    </Grid2>
                    {selectNewFile.length > 0 && (
                      <Typography
                        textAlign="left"
                        sx={{
                          fontSize: "14px",
                          color: "#4C9BF5",
                          fontWeight: "700",
                          paddingTop: "0.5rem",
                          pb: "0.5rem",
                        }}
                      >
                        New Upload Files :
                      </Typography>
                    )}
                    <Grid2
                      container
                      sx={{ width: "100%", mb: 1.5 }}
                      spacing={2}
                    >
                      {selectNewFile.map((file, index) => (
                        <Grid2 size={4} key={index}>
                          <Box className="justify-between flex p-1 bg-white border-[1px] border-[#4C9BF5] rounded-lg">
                            <Typography className="py-1 pl-1 text-[#2C5079] w-[90%]">
                              {file.name.length > 17
                                ? file.name.substring(0, 17) + "..."
                                : file.name}
                            </Typography>
                            <Trash
                              onClick={() => handleRemoveNewFile(file.name)}
                              size={22}
                              color="#F66262"
                              style={{ marginTop: 5 }}
                              className="cursor-pointer"
                            />
                          </Box>
                        </Grid2>
                      ))}
                    </Grid2>
                    <Box className="w-full flex space-x-3 mb-2">
                      <FormControl>
                        <Button
                          onClick={handleAddFileClick}
                          className="w-[82px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] pr-4"
                        >
                          + Add File
                        </Button>
                        <input
                          type="file"
                          ref={inputRef}
                          hidden
                          onChange={handleFileChange}
                        />
                      </FormControl>
                    </Box>

                    <Box sx={{ width: "100%" }}>
                  <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleTabChange} aria-label="areaTabs">
                        <Tab label="Shift" value="1" />
                        <Tab label="Manpower" value="2" />
                        <Tab label="Patrol Alert List" value="3" />
                        <Tab label="Patrol Round" value="4" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className="w-full text-center items-center">
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}
                        >
                          Total shift: {shiftList.length}
                        </Typography>
                        {shiftList.map((shift, index) => (
                          <div className="mb-2" key={index}>
                            <Box className="flex w-full">
                              <Box
                                key={index}
                                sx={{
                                  bgcolor: "#EBF4F6",
                                  width: "100%",
                                  display: "flex",
                                  p: 2,
                                  borderRadius: "10px 0px 0px 10px",
                                }}
                                className="space-x-2"
                              >
                                <Box
                                  sx={{
                                    width: "50%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}
                                >
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
                                  }}
                                >
                                  <CheckBoxDropDown
                                    itemSource={data.daysOfWeek}
                                    label="Working Days"
                                    unit="วัน"
                                    selectedVal={shift.workdays}
                                    handleChangeVal={
                                      handleFieldShiftListTypeChange
                                    }
                                    id={shift.id}
                                    field={"workdays"}
                                    desc="จำนวน"
                                    maxLength={8}
                                    maxDiaplay={7}
                                  />
                                </Box>
                              </Box>
                              <Box className="h-[72px]">
                                <Button
                                  onClick={() => removeShift(shift.id)}
                                  className="bg-[#F66262] rounded-r-lg rounded-l-none h-full px-2"
                                >
                                  <Trash color="white" />
                                </Button>
                              </Box>
                            </Box>
                          </div>
                        ))}
                        <Box className="flex">
                          <AddButton onAddBtnClick={(e) => addShift()} />
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className="w-full text-center items-center">
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}
                        >
                          Total manpower: {totalManpower}
                        </Typography>
                        {shiftList.length < 1 && (
                          <div className="flex flex-col h-full items-center justify-center">
                            <Image
                              src={"/NoData.png"}
                              alt="No Data"
                              width={80}
                              height={80}
                            />
                            <Typography
                              sx={{
                                color: "#83A2AD",
                                fontSize: "16px",
                                mb: "0.25rem",
                              }}
                            >
                              Please Add Shift
                            </Typography>
                          </div>
                        )}
                        {shiftList.map((shift, index) => (
                          <div className="mb-2" key={index}>
                            <Accordion
                              sx={{ bgcolor: "#EBF4F6", mb: "0.5rem" }}
                            >
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
                                    {shift.desc}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "#F66262",
                                      textDecorationLine: "underline",
                                      fontSize: "16px",
                                      mr: 3,
                                    }}
                                  >
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
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: "100%",
                                        }}
                                        className="space-y-4"
                                      >
                                        <Box
                                          sx={{ display: "flex", mr: 0.5 }}
                                          className="space-x-2"
                                        >
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
                                              itemSource={data.positions}
                                              handleSelectedVal={
                                                handleFieldManpowerTypeChange
                                              }
                                              selectedVal={manpower.positionId}
                                              field={"positionId"}
                                              defaultSelected="select"
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
                                      className="h-[72px]"
                                    >
                                      <Button
                                        onClick={() =>
                                          removeManpower(shift.id, manpower.id)
                                        }
                                        className="bg-[#F66262] rounded-r-lg rounded-l-none h-full px-2"
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
                                  <AddButton
                                    onAddBtnClick={(e) => addManpower(shift.id)}
                                  />
                                  <Typography
                                    sx={{
                                      color: "#4C9BF5",
                                      textDecorationLine: "underline",
                                      fontSize: "16px",
                                      mt: 1,
                                    }}
                                  >
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
                    <TabPanel value="3" sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className="w-full text-center items-center">
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}
                        >
                          Total Alert: {alertToList.length}
                        </Typography>
                        {alertToList.map((alertTo, index) => (
                          <div className="mb-2" key={`${alertTo} - ${index}`}>
                            <Box
                              sx={{
                                bgcolor: "#EBF4F6",
                                p: 2,
                                borderRadius: "10px 0px 0px 10px",
                                width: "100%",
                              }}
                              className="space-y-4"
                            >
                              <Box
                                key={`${alertTo} - ${index}-contentBox`}
                                className="space-x-2 flex"
                              >
                                <Box className="w-11 h-10 bg-[#37B7C3] rounded-lg justify-center text-white pt-2">
                                  {index + 1}
                                </Box>
                                <Box
                                  sx={{
                                    width: "40%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}
                                >
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
                                  }}
                                >
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
                                      selectedVal={alertTo.empId}
                                      field={"empId"}
                                      id={alertTo.id}
                                      handleSelectedVal={
                                        handleFieldPatrolAlertListTypeChange
                                      }
                                    />
                                  )}
                                </Box>
                                <Button
                                  onClick={() => removeAlertToList(alertTo.id)}
                                  className="bg-[#F66262] rounded-lg h-full px-2"
                                >
                                  <Trash color="white" />
                                </Button>
                              </Box>
                              <Box key={index} className="space-x-2 flex">
                                <Box
                                  sx={{
                                    ml: "9%",
                                    width: "40%",
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <LabelTextField2
                                    label={"Email"}
                                    placeholder={"Type here..."}
                                    inputVal={
                                      alertTo.isAsm === 1
                                        ? asmAlertNames.find(
                                            (a) => a.id === alertTo.empId
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
                                  }}
                                >
                                  <CheckBoxDropDown
                                    itemSource={data.roles}
                                    label={"ตำแหน่งอื่นๆ ที่ต้องการรับ Alert"}
                                    unit={"ตำแหน่ง"}
                                    selectedVal={alertTo.otherRoleId}
                                    id={alertTo.id}
                                    field={"otherRoleId"}
                                    handleChangeVal={
                                      handleFieldPatrolAlertListTypeChange
                                    }
                                    desc={"เลือก"}
                                    maxLength={data.roles.length}
                                    maxDiaplay={data.roles.length}
                                  />
                                </Box>
                              </Box>
                              <div className="flex w-full justify-center">
                                <Button
                                  className="flex text-[#1D7A9B] bg-transparent hover:bg-transparent underline w-fit pt-0 justify-center"
                                  onClick={() => handleAlertToDetail(alertTo)}
                                >
                                  ดู Area & Round ที่รับ Alert
                                  <GoArrowUpRight
                                    size={22}
                                    color="#1D7A9B"
                                    style={{ marginTop: 3 }}
                                  />
                                </Button>
                              </div>
                            </Box>
                          </div>
                        ))}
                        <Box className="flex">
                          <AddButton onAddBtnClick={(e) => addAlertToList()} />
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="4" sx={{ padding: 0, py: "0.25rem" }}>
                      <Box className="w-full text-center items-center">
                        <Typography
                          sx={{
                            color: "#4C9BF5",
                            textDecorationLine: "underline",
                            fontSize: "16px",
                            mb: "0.25rem",
                          }}
                        >
                          Total: {areas.length} area
                          {areas.length > 1 ? "s" : ""}
                        </Typography>
                        {areas.length < 1 && (
                          <div className="flex flex-col h-full items-center justify-center">
                            <Image
                              src={"/NoData.png"}
                              alt="No Data"
                              width={80}
                              height={80}
                            />
                            <Typography
                              sx={{
                                color: "#83A2AD",
                                fontSize: "16px",
                                mb: "0.25rem",
                              }}
                            >
                              {customerAdd === ""
                                ? "Please select Customer"
                                : "Please add area"}
                            </Typography>
                          </div>
                        )}
                        {areaList.map((area, index) => (
                          <div className="mb-2" key={index}>
                            <Accordion
                              sx={{ bgcolor: "#EBF4F6", mb: "0.5rem" }}
                            >
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
                                  }}
                                >
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
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: "90%",
                                      }}
                                      className="space-y-4"
                                    >
                                      <Box
                                        sx={{ display: "flex", mr: 0.5 }}
                                        className="space-x-3"
                                      >
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
                                                }}
                                              >
                                                <Clock
                                                  className="w-[24%] mt-2 ml-2"
                                                  size={20}
                                                />
                                                <Input
                                                  value={round.startTimeHr}
                                                  className="p-0 ml-1 w-[26%] border-none text-center text-[14px]"
                                                  type="number"
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
                                                  }}
                                                >
                                                  :
                                                </Typography>
                                                <Input
                                                  value={round.startTimeMin}
                                                  className="p-0 w-[25%] border-none ml-2 text-center mr-1 text-[14px]"
                                                  type="number"
                                                  min={0}
                                                  max={59}
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
                                                }}
                                              >
                                                <Clock
                                                  className="w-[25%] mt-2 ml-2"
                                                  size={20}
                                                />
                                                <Input
                                                  value={round.finishTimeHr}
                                                  className="p-0 w-[25%] border-none text-center text-[14px]"
                                                  type="number"
                                                  min={0}
                                                  max={24}
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
                                                  }}
                                                >
                                                  :
                                                </Typography>
                                                <Input
                                                  value={round.finishTimeMin}
                                                  className="p-0 w-[25%] border-none text-center ml-2 mr-1 text-[14px]"
                                                  type="number"
                                                  min={0}
                                                  max={59}
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
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              color: "#2C5079",
                                              mt: 1,
                                            }}
                                          >
                                            {round.totalTimeMin} minutes
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Box
                                        sx={{ display: "flex", mr: 0.5 }}
                                        className="space-x-3"
                                      >
                                        <Box sx={{ width: "50%" }}>
                                          <LabelSelector3
                                            selectorLabel={"ของวัน"}
                                            itemSource={isSameDayList}
                                            handleSelectedVal={
                                              handleFieldDataInRoundChange
                                            }
                                            selectedVal={round.isSameDay}
                                            field={"isSameDay"}
                                            defaultSelected="เลือก"
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
                                            defaultSelected="เลือก"
                                            id={area.areaId}
                                            id2={round.id}
                                          />
                                        </Box>
                                      </Box>

                                      <Box
                                        sx={{ display: "flex", mr: 0.5 }}
                                        className="space-x-3"
                                      >
                                        <Box
                                          sx={{ width: "50%", display: "flex" }}
                                        >
                                          <Box
                                            sx={{
                                              width: "45%",
                                              display: "flex",
                                              textAlign: "left",
                                            }}
                                          >
                                            <Checkbox
                                              className="w-9 h-9 mt-1"
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
                                            <Typography className="pl-1 pt-2 text-[#2C5079] text-[15px]">
                                              บังคับเดิน
                                            </Typography>
                                          </Box>
                                          <Box
                                            sx={{
                                              width: "55%",
                                              display: "flex",
                                            }}
                                          >
                                            <Checkbox
                                              className="w-9 h-9 mt-1"
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
                                            <Typography className="pl-1 pt-2 text-[#2C5079] text-[15px]">
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
                                      className="bg-[#F66262] rounded-lg w-14 h-full"
                                    >
                                      <Trash color="white" />
                                    </Button>
                                  </Box>
                                ))}

                                <Box
                                  sx={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <AddButton
                                    onAddBtnClick={(e) => addRound(area.areaId)}
                                  />
                                  <Typography
                                    sx={{
                                      color: "#4C9BF5",
                                      textDecorationLine: "underline",
                                      fontSize: "16px",
                                      mt: 1,
                                    }}
                                  >
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
                )}

                {/* Add New Contract */}
                {!isEdit && (
                  <Box>
                    <Box className="flex w-full space-x-5 pt-2">
                      <Box className="w-1/2">
                        <Selector
                          selectorLabel={"Customer"}
                          itemSource={customerList}
                          handleChange={handleSelectChange}
                          selectedVal={customerAdd}
                          name={"addContractCustomer"}
                        />
                      </Box>

                      <Box className="w-1/2">
                        <Textbox
                          header="Contract Number"
                          name="contractNumber"
                          inputType="text"
                          placeHolder="Type here..."
                          value={addContractNo}
                          handleChange={handleChange}
                        />
                      </Box>
                    </Box>

                    <Box className="flex w-full space-x-5 pt-2">
                      <Box className="w-1/2">
                        <Typography
                          textAlign="left"
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}
                        >
                          Start Date
                        </Typography>
                        <DatePicker
                          date={addContractStartDate}
                          setDate={setAddContractStartDate}
                          h={"h-10"}
                        />
                      </Box>

                      <Box className="w-1/2">
                        <Typography
                          textAlign="left"
                          sx={{
                            fontWeight: "700",
                            color: "#2C5079",
                            fontSize: "14px",
                            paddingBottom: "0.25rem",
                          }}
                        >
                          End Date
                        </Typography>
                        <DatePicker
                          h={"h-10"}
                          date={addContractFinishDate}
                          setDate={setAddContractFinishDate}
                        />
                      </Box>
                    </Box>

                    <Typography
                      textAlign="left"
                      sx={{
                        fontWeight: "700",
                        color: "#2C5079",
                        fontSize: "14px",
                        paddingBottom: "0.25rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Attachment
                    </Typography>
                    <Grid2
                      container
                      sx={{ width: "100%", mb: 1.5 }}
                      spacing={2}
                    >
                      {selectNewFile.map((file, index) => (
                        <Grid2 size={4} key={index}>
                          <Box className="justify-between flex p-1 bg-white border-[1px] border-[#4C9BF5] rounded-lg">
                            <Typography className="py-1 pl-1 text-[#2C5079] w-[90%]">
                              {file.name.length > 17
                                ? file.name.substring(0, 17) + "..."
                                : file.name}
                            </Typography>
                            <Trash
                              onClick={() => handleRemoveNewFile(file.name)}
                              size={22}
                              color="#F66262"
                              style={{ marginTop: 5 }}
                              className="cursor-pointer"
                            />
                          </Box>
                        </Grid2>
                      ))}
                    </Grid2>
                    <Box className="w-full flex space-x-3 mb-2">
                      <FormControl>
                        <Button
                          onClick={handleAddFileClick}
                          className="w-[82px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] pr-4"
                        >
                          + Add File
                        </Button>
                        <input
                          type="file"
                          ref={inputRef}
                          hidden
                          onChange={handleFileChange}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                )}
              
              </Box>
            </div>

            {/* Footer */}
            {!isEdit && (
              <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
                <CancelBtn onCancelBtnClick={handleCloseContractForm} />
                <SubmitBtn onSubmitBtnClick={handleSubmit} />
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
          </div>
        </>
      )}

      {showAlertToDeatil && (
        <AlertToDatail
          closeModal={handleDisplayAlertToDetail}
          selectedAlertTo={selectedALertTo}
          areaList={areaList}
          shiftList={shiftList}
          setAreaList={setAreaList}
        />
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
  );
};

export default ContractForm;
