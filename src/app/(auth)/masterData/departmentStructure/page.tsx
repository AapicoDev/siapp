"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material/";
import Navbar from "@/components/Navbar";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/textboxs/input";
import { AddButton } from "@/components/ui/buttons/addButton";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import styles from "../../../styles.module.css";
import { EditButton } from "@/components/ui/buttons/editButton";
import { SaveButton } from "@/components/ui/buttons/saveButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3";
import { Textbox } from "@/components/ui/textboxs/textbox";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import data from "@/app/mockData.json";
import { LabelSelector2 } from "@/components/ui/selectors/labelSelector2";
import { getAllAssignedManpowerData } from "@/app/lib/api";
import { LabelSelector3 } from "@/components/ui/selectors/labelSelector3";
import MultipleSelector, { Option } from "@/components/ui/multipleSelector";
import { GradientButton } from "@/components/ui/buttons/gradientButton";

type MockData = {
  id: number;
  no: any;
  zoneId: any;
  reponsiblePersonId: any[];
  customerId: any[];
};
type RowData = {
  id: number;
  no: any;
  zoneId: any;
  reponsiblePersonId: Option[];
  customerId: any[];
};
type selectedDelete = {
  isSelected: boolean;
  id: any;
};

const mockData: MockData[] = [
  {
    id: 1,
    no: 1,
    zoneId: 1,
    reponsiblePersonId: ["67235484cc0bb2d80794"],
    customerId: [1, 2],
  },
  {
    id: 2,
    no: 2,
    zoneId: 2,
    reponsiblePersonId: ["67235484cc0bb2d80794", "67235a74dcb3a863e555","67235a74dcb3a863e9b6"],
    customerId: [1, 2, 3],
  },
  {
    id: 3,
    no: 3,
    zoneId: 3,
    reponsiblePersonId: ["67235484cc0bb2d80794", "67235a74dcb3a863e555", ],
    customerId: [2],
  },
  {
    id: 4,
    no: 4,
    zoneId: 4,
    reponsiblePersonId: ["67235a74dcb3a863e9b6"],
    customerId: [4],
  },
];

const mockAssignedManpower = [
  {
    employee_Id: "12345678",
    employeeName: "สมมติ1 สมมติ1",
    shift_Id: "67109995000a7df9b6f7",
    checkpoint_IDs: ["670f47fe0002f337606e", "671758b1000a66a9cd95"],
    manpowerRole_Id: "6721d87d0023e3ac0af9",
    $id: "67235484cc0bb2d80794",
  },
  {
    employee_Id: "000090890",
    employeeName: "นายทดสอบ ระบบ",
    shift_Id: "67109995000a7df9b6f7",
    checkpoint_IDs: ["670f47fe0002f337606e", "6721f3711c3a85232ed4"],
    manpowerRole_Id: "6721d87d0023e3ac0af9",
    $id: "67235a74dcb3a863e9b6",
  },
  {
    employee_Id: "000090890",
    employeeName: "นายคนที่สาม สาม",
    shift_Id: "67109995000a7df9b6f7",
    checkpoint_IDs: ["670f47fe0002f337606e", "6721f3711c3a85232ed4"],
    manpowerRole_Id: "6721d87d0023e3ac0af9",
    $id: "67235a74dcb3a863e555",
  },
];

export default function DepartmentStructure() {

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [addCheckList, setAddCheckList] = useState("");
  const [searchZone, setSearchZone] = useState("");
  const [searchResponsiblePerson, setSearchResponsiblePerson] = useState("");
  const [photoAmt, setPhotoAmt] = useState<number>();
  const [manpowerItemSource, setManpowerItemSource] = useState<Option[]>([]);
  const totalItems = rowData.length;
  const [editMode, setEditMode] = useState(Array(rowData.length).fill(false));
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );

  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    setSelected(rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    })));
  }, [rowData]);

  const initialData = async () => {
    //const getAssignedManpower = await getAllAssignedManpowerData();
    //console.log("getAssignedManpower =", getAssignedManpower);
    const mappedManpower: Option[] =
      mockAssignedManpower.map((m) => {
        return {
          label: m.employeeName,
          value: m.$id,
        };
      }) || [];
    console.log("mappedManpower =", mappedManpower);
    setManpowerItemSource(mappedManpower);
    tableData(mappedManpower);
  };

  const tableData = (manpowerItemSource : any[]) => {
    const mapToRowData: RowData[] = mockData.map(data => {
      return{
        id: data.id,
        no: data.no,
        zoneId: data.zoneId,
        reponsiblePersonId: getResponsiblePersonOption(data.reponsiblePersonId, manpowerItemSource),
        customerId: data.customerId
      };
    })
    console.log("mapToRowData =", mapToRowData);
    setRowData(mapToRowData);
  };

  function getResponsiblePersonOption(id: any[], manpowerItemSource: any[]){
    const idOptions: Option[] = id.map(i => {
      console.log("manpowerItemSource =", manpowerItemSource)
      const findlabel = manpowerItemSource.find((m) => m.value === i)?.label;
      if (!findlabel) {
        console.warn(`No label found for id: ${i}`);
      }
      return{
        label: findlabel || "",
        value: i
      }
    });
    return idOptions;
  }

  // Handle Edit button click
  const handleEdit = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = true; // Enable edit mode for the clicked row
    setEditMode(newEditMode);
  };

  // Handle Save button click
  const handleSave = (index: any) => {
    const newEditMode = [...editMode];
    newEditMode[index] = false; // Disable edit mode after saving
    setEditMode(newEditMode);
    // Optionally save changes to the server or state
  };

  const handleAdd = () => {};

  const handleSearch = () => {};

  const handleDelete = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //setRowData((prevData) => ({ ...prevData, [name]: value }));
    setPhotoAmt(value as unknown as number);
  };

  const handleRowDataChange = (
    id: any,
    value: any,
    field: keyof RowData
  ) => {
    const updatedData = rowData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setRowData(updatedData);
    console.log("updatedSegmentData =", updatedData);
  };

  const handleSelected = (index: number) => {
    const newSelected = [...selected];
    newSelected[index].isSelected = !selected[index].isSelected;
    setSelected(newSelected);
    const isCheckAll = !selected.some((item) => item.isSelected === false);
    if (isCheckAll) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  };

  const handleCheckAll = (checked: boolean) => {
    console.log("checked =", checked);
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.map((s) => (s.isSelected = checked));
    console.log("selectedAll =", selectedAll);
    setSelected(selectedAll);
  };

  return (
    <div>
      <Navbar menu={"Master Data"} submenu={"Department Structure"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box flex={1} px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className="w-full flex justify-center">
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
              }}
              justifyContent="space-between"
              className="space-x-4 p-4 flex w-[80%]"
            >
              <div className="w-[30%]">
                <DatePickerWithRange
                  className={undefined}
                  dateRange={undefined}
                  setDateRange={function (value: any): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>

              <div className="w-[25%]">
                <LabelSelector
                  selectorLabel={"Zone"}
                  itemSource={data.zones}
                  setSelectedVal={setSearchZone}
                  selectedVal={searchZone}
                  name={"zone"}
                />
              </div>
              <div className="w-[30%]">
                <LabelSelector
                  selectorLabel={"Responsible Person"}
                  itemSource={data.zones}
                  setSelectedVal={setSearchResponsiblePerson}
                  selectedVal={searchResponsiblePerson}
                  name={"responsiblePerson"}
                />
              </div>
              <Box className="space-x-4 w-[15%] flex">
                <SearchButton onSearchBtnClick={handleSearch} />
              </Box>
            </Box>
          </Box>

          <TableContainer
            className="h-screen bg-white"
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "15px 15px 0px 0px",
              boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                  <TableCell align="left" className="w-[5%]">
                    <Checkbox2
                      className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    No.
                  </TableCell>
                  <TableCell align="center" className="w-[24%]">
                    Zone
                  </TableCell>
                  <TableCell align="center" className="w-[24%]">
                    Responsible Person
                  </TableCell>
                  <TableCell align="center" className="w-[19%]">
                    Customer
                  </TableCell>
                  <TableCell align="center" className="w-[14%]"></TableCell>
                </TableRow>
              </TableHead>

              {/* Allow the TableBody to grow and fill vertical space */}
              <TableBody sx={{ flexGrow: 1 }}>
                {rowData.map((row, index) => (
                  <TableRow
                    key={index}
                    className={
                      editMode[index]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
                  >
                    <TableCell align="left">
                      <Checkbox2
                        checked={selected[index]?.isSelected}
                        onCheckedChange={() => {
                          handleSelected(index);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" className="max-w-48">
                      {editMode[index] ? (
                        <Input
                          type="text"
                          className={`${styles.textBoxCell}`}
                          value={row.no}
                          onChange={(e) =>
                            handleRowDataChange(row.id, e.target.value, "no")
                          }
                        />
                      ) : (
                        `${row.no}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        <LabelSelector2
                          itemSource={data.zones}
                          selectedVal={row.zoneId}
                          id={row.id}
                          handleSelectedVal={handleRowDataChange}
                          field={"zoneId"}
                        />
                      ) : (
                        `${
                          row.zoneId === null
                            ? "-"
                            : data.zones.find((s) => s.id === row.zoneId)
                                ?.desc
                        }`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editMode[index] ? (
                        // <MultipleSelectChip options={manpowerItemSource}/>
                        <MultipleSelector
                          className="border-[1px] border-[#4C9BF5] rounded-lg bg-white"
                          badgeClassName="bg-[#2C5079] text-[14px] font-normal"
                          defaultOptions={manpowerItemSource}
                          value={row.reponsiblePersonId}
                          emptyIndicator={
                            <p className="text-center text-sm leading-4 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                          onChange={(selectedValues) => handleRowDataChange(row.id, selectedValues, "reponsiblePersonId")}
                        />
                      ) : (
                        row.reponsiblePersonId.map((p, index) =>
                          <p key={index}>{p.label}</p>
                        )
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.customerId.length}
                    </TableCell>
                    <TableCell align="center" sx={{ justifyItems: "center" }}>
                      {editMode[index] ? (
                        <div className="w-[48px] mr-8">
                          <SaveButton
                            onSaveBtnClick={handleSave}
                            index={index}
                          />
                        </div>
                      ) : (
                        <EditButton disable={editMode.some(e=>e === true)} onEditBtnClick={handleEdit} index={index} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* TableFooter*/}
          <TableContainer
            className="bg-white border-t"
            sx={{
              borderRadius: "0px 0px 15px 15px",
              boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
            }}
          >
            <Table>
              <TableFooter className="w-full">
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography>Total: {totalItems} items</Typography>
                      <div className="flex space-x-3">
                      <DeleteButton
                        onDeleteBtnClick={handleDelete}
                        disable={!selected.some(s => s.isSelected === true)}
                      />
                      <GradientButton onBtnClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
                        throw new Error("Function not implemented.");
                      } } content={"+New Structure"} />
                      </div>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}
