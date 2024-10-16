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
  Typography,
  Button as Button2,
  Switch as SwitchMUI,
} from "@mui/material/";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/textboxs/input";
import styles from "../../../styles.module.css";
import { Filter } from "iconsax-react";
import { usePathname } from "next/navigation";
import CustomerForm from "@/components/materData/CustomerForm";
import { Switch } from "@/components/ui/switch";
import ViewQrCode from "@/components/materData/ViewQrCode";
import ContractForm from "@/components/materData/ContractForm";
import { AddButton } from "@/components/ui/buttons/addButton";
import { ViewButton } from "@/components/ui/buttons/viewButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import { Selector2 } from "@/components/ui/selectors/selector2";
import data from "@/app/mockData.json";
import { Textbox } from "@/components/ui/textboxs/textbox";
import { ActiveStatusBox } from "@/components/ui/activeStatusBox";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import { DatePicker } from "@/components/ui/datePicker";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import { AttachFileBox } from "@/components/ui/attachFileBox";

type RowData = {
  id: any;
  reportNo: any;
  month: any;
  year: any;
  topic: any;
  departmentId: any;
  attachment : any;
};

type selectedDelete = {
  isSelected: boolean;
  id: any;
};

type itemSourceType = {
  id: any;
  desc: any;
};

export default function MonthlyReport() {
  const [rowData, setRowData] = useState(data.monthlyReports);
  const [editMode, setEditMode] = useState(Array(rowData.length).fill(false));
  const [monthName, setMonthName] = useState(data.months);
  const [departments, setDepartments] = useState(data.departments);
  const [months, setMonths] = useState<any[]>([{id: 1, desc: ""}]);
  const [years, setYears] = useState<any[]>([{id: 1, desc: ""}]);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false);
  const [openViewQR, setOpenViewQR] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);
  const [selectedSearchYearStart, setSelectedSearchYearStart] = useState("");
  const [selectedSearchYearEnd, setSelectedSearchYearEnd] = useState("");
  const [selectedSearchMonthStart, setSelectedSearchMonthStart] = useState("");
  const [selectedSearchMonthEnd, setSelectedSearchMonthEnd] = useState("");
  const [selectedSearchDepartment, setSelectedSearchDepartment] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );

  const totalItems = rowData.length;

  useEffect(() => {
    monthlyList();
    yearlyList();
  }, []);

  const monthlyList = () => {
    const monthSummary = rowData.filter(
      (data, index, self) =>
        index === self.findIndex(r => r.month === data.month)
    ).map(data => ({
      id: data.id,
      desc: monthName.find((m) => m.id === data.month)?.desc
    }));
    setMonths(monthSummary);
  }

  const yearlyList = () => {
    const yearSummary = rowData.filter(
      (row, index, self) =>
        index === self.findIndex(r => r.year === row.year)
    ).map(row => ({
      id: row.id,
      desc: row.year
    }));
    setYears(yearSummary);
  }

  const handleAddNewCust = () => {
    setShowAddCustModal(true);
  };

  const handleSearch = () => {
  };

  const handleDeleteCust = () => {};

  const handleRowClick = (row: RowData) => {
    setSelectedRow(row);
    setOpenEditCustModal(true);
  };

  function handleCloseCustomerForm(isEdit: boolean) {
    if (!isEdit) {
      setShowAddCustModal(false);
    } else {
      setOpenEditCustModal(false);
    }
    setRowData(rowData);
  }

  function handleCloseViewQr() {
    setOpenViewQR(false);
  }

  function handleCloseContractForm(isEdit: boolean) {
    if (!isEdit) {
      setOpenAddContract(false);
    } else {
      setOpenEditContract(false);
    }
  }

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
    console.log("isCheckAll", isCheckAll);
  };

  const handleCheckAll = (checked: boolean) => {
    setIsSelectedAll(checked);
    const selectedAll = [...selected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setSelected(selectedAll);
  };

  const handleAddBtnOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpenAddContract(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchVal(value);
    }
  };

  return (
    <div>
      <Navbar menu={"Report"} submenu={"Monthly Report"} />
      <Box className="px-2">
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className="w-full flex justify-center">
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
              }}
              justifyContent="space-between"
              className="space-x-4 p-4 flex w-full"
            >
              <Box className="flex w-full space-x-4">
                <Box className="w-[6%] h-10 bg-[#D9F0EC] rounded-lg flex text-[#37B7C3] py-2 px-4">
                  <Filter
                    size={16}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
                </Box>

                <Box className="w-[46%]">
                  <Box className="space-x-1 justify-center flex p-[2px] bg-white rounded-xl border-[#1D7A9B] border-[1px]">
                  <Selector2
                    itemSource={months}
                    setSelectedVal={setSelectedSearchMonthStart}
                    selectedVal={selectedSearchMonthStart}
                    name={"monthStart"}
                    defaultSelected={"Select month"}
                  />
                    <Selector2
                    itemSource={years}
                    setSelectedVal={setSelectedSearchYearStart}
                    selectedVal={selectedSearchYearStart}
                    name={"yearStart"}
                    defaultSelected={"Select year"}
                  />
                    <Typography className="text-[#2C5079] text-sm px-4 pt-2">to</Typography>
                    <Selector2
                    itemSource={months}
                    setSelectedVal={setSelectedSearchMonthEnd}
                    selectedVal={selectedSearchMonthEnd}
                    name={"monthEnd"}
                    defaultSelected={"Select month"}
                  />
                    <Selector2
                    itemSource={years}
                    setSelectedVal={setSelectedSearchYearEnd}
                    selectedVal={selectedSearchYearEnd}
                    name={"yearEnd"}
                    defaultSelected={"Select year"}
                  />
                  </Box>
                </Box>

                <Box className="w-[20%]">
                  <LabelSelector
                    selectorLabel={"Department"}
                    itemSource={departments}
                    setSelectedVal={setSelectedSearchDepartment}
                    selectedVal={selectedSearchDepartment}
                    name={"department"}
                    defaultSelected={"All"}
                  />
                </Box>

                <Box className="w-[20%]">
                <Textbox
                  placeHolder={"Search..."}
                  inputType={"text"}
                  handleChange={handleChange}
                  value={searchVal}
                  name={"search"}
                />
              </Box>
              <Box className="w-[8%]">
              <SearchButton onSearchBtnClick={handleSearch}/>
              </Box>
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
                <TableRow
                  sx={{ borderBottom: "1px solid #C7D4D7" }}
                  className={`${styles.table}`}
                >
                  <TableCell align="left" className="w-[8%]">
                    <Checkbox
                      className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center" className="w-[10%]">
                    Report No.
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                    Month
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                  Year
                  </TableCell>
                  <TableCell align="center" className="w-[24%]">
                  Topic
                  </TableCell>
                  <TableCell align="center" className="w-[22%]">
                  Department
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                  Attachment
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ flexGrow: 1 }}>
                {rowData.map((row, index) => (
                  <TableRow
                    onClick={() => handleRowClick(row)} // Row click handler
                    key={index}
                    className={
                      editMode[index]
                        ? `bg-[#D8EAFF]`
                        : `${index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`}`
                    }
                    sx={{
                      cursor: "pointer",
                      "& .MuiTableCell-root": {
                        padding: "10px 20px 10px 20px",
                      },
                      "&:hover": {
                        backgroundColor: "#DCE9EB",
                      },
                    }}
                  >
                    <TableCell align="left">
                      <Checkbox
                        checked={selected[index].isSelected}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click
                          handleSelected(index);
                        }} className="mb-2"
                      />
                    </TableCell>

                    <TableCell align="center">{row.reportNo}</TableCell>

                    <TableCell align="center">
                      {monthName.find((m) => m.id === row.month)?.fullDesc}
                    </TableCell>

                    <TableCell align="center">{row.year}</TableCell>

                    <TableCell align="center">{row.topic}</TableCell>

                    <TableCell align="center">
                        {departments.find((d) => d.id === row.departmentId)?.desc}
                    </TableCell>

                    <TableCell align="center">
                      <AttachFileBox fileName={row.attachment} />
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
                      <Box>
                        <DeleteButton
                          onDeleteBtnClick={handleDeleteCust}
                          disable={!selected.some((item) => item.isSelected)}
                        />
                        <GradientButton
                          content={"+ New"}
                          onBtnClick={handleAddNewCust}
                        />
                      </Box>
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
