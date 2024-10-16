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
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
  Button as Button2,
  IconButton,
  Switch as SwitchMUI,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
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
import { GoArrowUpRight } from "react-icons/go";
import { TableContract } from "@/components/materData/TableContract";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import data from "@/app/mockData.json";
import { Textbox } from "@/components/ui/textboxs/textbox";
import { ActiveStatusBox } from "@/components/ui/activeStatusBox";
import { GradientButton } from "@/components/ui/buttons/gradientButton";

type RowData = {
  id: any;
  employeeId: string;
  roleId: any;
  userName: any;
  email: any;
  status: any;
};

type AreaData = {
  id: number;
  custId: any;
  name: string;
};

type selectedDelete = {
  isSelected: boolean;
  userId: string;
};

const rows: RowData[] = [
  {
    id: 1,
    employeeId: "12345678",
    roleId: 1,
    userName: "userName1",
    email: "email@email.com",
    status: 1,
  },
  {
    id: 2,
    employeeId: "12345679",
    roleId: 2,
    userName: "userName2",
    email: "email@email.com",
    status: 1,
  },
  {
    id: 3,
    employeeId: "12345680",
    roleId: 3,
    userName: "userName3",
    email: "email@email.com",
    status: 1,
  },
  {
    id: 4,
    employeeId: "12345681",
    roleId: 4,
    userName: "userName4",
    email: "email@email.com",
    status: 0,
  },
];

const mockArea: AreaData[] = [
  {
    id: 1,
    custId: 1,
    name: "อาคาร1",
  },
  {
    id: 2,
    custId: 1,
    name: "อาคารใหญ่",
  },
  {
    id: 3,
    custId: 2,
    name: "อาคาร2",
  },
];

const totalItems = rows.length;

const initialArea: AreaData[] = [
  {
    id: 1,
    custId: null,
    name: "",
  },
];

export default function UsersPage() {
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data
  const [roles, setRoles] = useState(data.roles);
  const [status, setStatus] = useState(data.activeStatus);
  const [employees, setEmployees] = useState(data.employees);
  const [areas, setAreas] = useState<AreaData[]>([
    { id: 1, custId: null, name: "" },
  ]);
  const [custAreas, setCustAreas] = useState<AreaData[]>();
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false);
  const [openViewQR, setOpenViewQR] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);
  const [selectedSearchRole, setSelectedSearchRole] = useState("");
  const [selectedSearchStatus, setSelectedSearchStatus] = useState("");
  const [searchEmpIdVal, setSearchEmpIdVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [selected, setSelected] = useState<selectedDelete[]>(
    rows.map((row) => ({
      isSelected: false, // Default value for `selected`
      userId: row.id, // Convert customerId to string for custId
    }))
  );

  useEffect(() => {}, []);

  const handleAddNewCust = () => {
    setShowAddCustModal(true);
  };

  const handleDeleteCust = () => {};

  const handleRowClick = (row: RowData) => {
    setSelectedRow(row);
    setOpenEditCustModal(true);

    const custArea = mockArea.filter((a) => a.custId === row.id);
    setAreas(initialArea);
    if (custArea.length != 0) {
      setAreas(
        custArea.map((area, index) => ({
          ...area,
          id: index + 1, // use index of array+1 to set new id.
        }))
      );
    }
  };

  function handleCloseCustomerForm(isEdit: boolean) {
    if (!isEdit) {
      setShowAddCustModal(false);
    } else {
      setOpenEditCustModal(false);
    }
    setRowData(rows);
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

  const handleEditContract = (selecectedRow: any) => {
    console.log("row =", selecectedRow);
    setSelectedRow(selecectedRow);
    setOpenEditContract(true);
  };

  const handleOpenViewQr = (selecectedRow: any) => {
    setSelectedRow(selecectedRow);
    const custArea = mockArea.filter(
      (a) => a.custId === selecectedRow.customerId
    );
    setCustAreas(custArea);
    setOpenViewQR(true);
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
      <Navbar menu={"Users"} submenu={"Users"} />
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
              className="space-x-4 p-4 flex w-[80%]"
            >
              <Box className="flex w-full space-x-4">
                <Box className="w-40 bg-[#D9F0EC] rounded-lg flex text-[#37B7C3] py-2 px-4">
                  <Filter
                    size={16}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
                </Box>

                <Box className="w-[70%]">
                  <LabelTextField
                    label={"EmployeeId"}
                    placeholder={"Type here..."}
                    inputVal={searchEmpIdVal}
                    setInputVal={setSearchEmpIdVal}
                  />
                </Box>

                {/* Selector search Role */}
                <LabelSelector
                  selectorLabel={"Role"}
                  itemSource={roles}
                  setSelectedVal={setSelectedSearchRole}
                  selectedVal={selectedSearchRole}
                  name={"role"}
                  defaultSelected={"All"}
                />

                <Box className="w-[50%]">
                  {/* Selector Search Status */}
                  <LabelSelector
                    selectorLabel={"Status"}
                    itemSource={status}
                    setSelectedVal={setSelectedSearchStatus}
                    selectedVal={selectedSearchStatus}
                    name={"status"}
                    defaultSelected={"All"}
                  />
                </Box>

                <Textbox
                  placeHolder={"Search name/log in username..."}
                  inputType={"text"}
                  handleChange={handleChange}
                  value={searchVal}
                  name={"search"}
                />
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
                  <TableCell align="left" className="w-[4%]">
                    <Checkbox
                      className="mt-1 mb-2"
                      checked={isSelectedAll}
                      onCheckedChange={handleCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Employee ID
                  </TableCell>
                  <TableCell align="center" className="w-[20%]">
                    Name-Surname
                  </TableCell>
                  <TableCell align="center" className="w-[20%]">
                    Role
                  </TableCell>
                  <TableCell align="center" className="w-[16%]">
                    Log In Username
                  </TableCell>
                  <TableCell align="center" className="w-[14%]">
                    Email
                  </TableCell>
                  <TableCell align="center" className="w-[12%]">
                    Status
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
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">{row.employeeId}</TableCell>

                    <TableCell align="center">
                      {employees.find((e) => e.empId === row.employeeId)
                        ?.fname +
                        " " +
                        employees.find((e) => e.empId === row.employeeId)
                          ?.lname}
                    </TableCell>

                    <TableCell align="center">
                      {roles.find((r) => r.id === row.roleId)?.desc}
                    </TableCell>

                    <TableCell align="center">{row.userName}</TableCell>

                    <TableCell align="center">{row.email}</TableCell>

                    <TableCell align="center">
                      <ActiveStatusBox status={row.status} />
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

      {/* Add customer */}
      {openAddCustModal && (
        <CustomerForm
          closeModal={handleCloseCustomerForm}
          customeraAeas={initialArea}
        />
      )}

      {/* Edit/Delete Customer */}
      {openEditCustModal && (
        <CustomerForm
          closeModal={handleCloseCustomerForm}
          editCustomer={selectedRow}
          customeraAeas={areas}
        />
      )}

      {openViewQR && (
        <ViewQrCode
          closeModal={handleCloseViewQr}
          customeraAeas={custAreas}
          selectedCustomer={selectedRow}
        />
      )}

      {openAddContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customeraAeas={areas}
        />
      )}

      {openEditContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customeraAeas={areas}
          selectedCustomer={selectedRow}
        />
      )}
    </div>
  );
}
