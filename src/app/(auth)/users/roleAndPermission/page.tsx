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
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox2";
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
import { SaveButton } from "@/components/ui/buttons/saveButton";

type RowData = {
  id: any;
  desc: string;
  permissions: any[];
};

type AreaData = {
  id: number;
  custId: any;
  name: string;
};

type selectedDelete = {
  isSelected: boolean;
  id: any;
};

const initialArea: AreaData[] = [
  {
    id: 1,
    custId: null,
    name: "",
  },
];

export default function UsersPage() {
  const [rowData, setRowData] = useState(data.roles);
  const [editMode, setEditMode] = useState(Array(rowData.length).fill(false));
  const [roles, setRoles] = useState(data.roles);
  const [status, setStatus] = useState(data.activeStatus);
  const [permissions, setPermissions] = useState(data.permissions);
  const [areas, setAreas] = useState<AreaData[]>([
    { id: 1, custId: null, name: "" },
  ]);
  const [custAreas, setCustAreas] = useState<AreaData[]>();
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isPermissionSelectedAll, setIsPermissionSelectedAll] = useState(false);
  const [openAddCustModal, setShowAddCustModal] = useState(false);
  const [openEditCustModal, setOpenEditCustModal] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openViewQR, setOpenViewQR] = useState<boolean>(false);
  const [openAddContract, setOpenAddContract] = useState<boolean>(false);
  const [openEditContract, setOpenEditContract] = useState<boolean>(false);
  const [selectedSearchRole, setSelectedSearchRole] = useState("");
  const [selectedSearchStatus, setSelectedSearchStatus] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [selected, setSelected] = useState<selectedDelete[]>(
    rowData.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const [permissionSelected, setPermissionSelected] = useState<
    selectedDelete[]
  >(
    permissions.map((row) => ({
      isSelected: false,
      id: row.id,
    }))
  );
  const totalItems = rowData.length;

  useEffect(() => {}, []);

  const handleAddNewCust = () => {
    setShowAddCustModal(true);
  };

  const handleDeleteCust = () => {};

  const setToggleFilter = () => {
    console.log("openFilterModal =", openFilterModal);
    setOpenFilterModal(!openFilterModal);
  };

  const handleRowClick = (index: any, row: RowData) => {
    if (!editMode.some((item) => item === true)) {
      const newEditMode = [...editMode];
      newEditMode[index] = true;
      setEditMode(newEditMode);

      const filteredPermissions = data.permissions.filter((permission) =>
        row.permissions.includes(permission.id)
      );
      setPermissions(filteredPermissions);
    }
  };

  const handleSave = () => {
    const newEditMode = editMode.map((element) =>
      element === true ? false : element
    );
    console.log("neweditMode =", newEditMode);
    setEditMode(newEditMode);
    setPermissions(data.permissions);
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

  const handleEditContract = (selecectedRow: any) => {
    console.log("row =", selecectedRow);
    setSelectedRow(selecectedRow);
    setOpenEditContract(true);
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

  const handlePermissionSelected = (index: number) => {
    const newSelected = [...permissionSelected];
    newSelected[index].isSelected = !permissionSelected[index].isSelected;
    setPermissionSelected(newSelected);
    const isCheckAll = !permissionSelected.some(
      (item) => item.isSelected === false
    );
    if (isCheckAll) {
      setIsPermissionSelectedAll(true);
    } else {
      setIsPermissionSelectedAll(false);
    }
    console.log("permissionSelected", permissionSelected);
  };

  const handlePermissionSelectAll = (checked: boolean) => {
    setIsPermissionSelectedAll(checked);
    const selectedAll = [...permissionSelected];
    selectedAll.forEach((element) => {
      element.isSelected = checked;
    });
    setPermissionSelected(selectedAll);
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

  const handleInputChange = <T extends keyof RowData>(
    index: number,
    field: T,
    value: RowData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
  };

  return (
    <div>
      <Navbar menu={"Users"} submenu={"Roles & Permissions"} />
      <Box className='px-2'>
        {/* Main Content */}
        <Box px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className='w-full flex justify-center'>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
              }}
              justifyContent='space-between'
              className='space-x-4 p-4 flex w-[80%]'>
              <Box className='flex w-full space-x-4'>
                <Box className='w-40 bg-[#D9F0EC] rounded-lg flex text-[#37B7C3] py-2 px-4'>
                  <Filter
                    size={16}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                  />{" "}
                  Filter
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

                {/* Selector Search Permissions */}
                <LabelSelector
                  selectorLabel={"Permission"}
                  itemSource={status}
                  setSelectedVal={setSelectedSearchStatus}
                  selectedVal={selectedSearchStatus}
                  name={"permission"}
                  defaultSelected={"All"}
                />

                <Textbox
                  placeHolder={"Search..."}
                  inputType={"text"}
                  handleChange={handleChange}
                  value={searchVal}
                  name={"search"}
                />
              </Box>
            </Box>
          </Box>

          {/* Tables */}
          <Box className='w-full flex'>
            {/* Role Table */}
            <Box className='w-[50%] pr-4'>
              <TableContainer
                className='h-screen bg-white'
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "15px 15px 0px 0px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                      <TableCell align='left' className='w-[10%]'>
                        <Checkbox2
                          className='mt-1 mb-2 border-[#C7D4D7]'
                          checked={isSelectedAll}
                          onCheckedChange={handleCheckAll}
                        />
                      </TableCell>
                      <TableCell align='center' className='w-[60%]'>
                        Role
                      </TableCell>
                      <TableCell align='center' className='w-[30%]'>
                        Permissions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody sx={{ flexGrow: 1 }}>
                    {rowData.map((row, index) => (
                      <TableRow
                        onClick={() => handleRowClick(index, row)}
                        key={index}
                        className={
                          editMode[index]
                            ? `bg-[#D8EAFF]`
                            : `${
                                index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                              }`
                        }
                        sx={{
                          cursor: "pointer",
                          "& .MuiTableCell-root": {
                            padding: "10px 20px 10px 20px", // Customize border color
                          },
                          "&:hover": {
                            backgroundColor: "#DCE9EB", // Optional: Change background color on hover
                          },
                        }}>
                        <TableCell align='left'>
                          <Checkbox2
                            checked={selected[index].isSelected}
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click
                              handleSelected(index);
                            }}
                            className='mb-2 border-[#C7D4D7]'
                          />
                        </TableCell>
                        <TableCell align='center' className='max-w-48'>
                          {editMode[index] ? (
                            <Input
                              type='text'
                              className={`${styles.textBoxCell}`}
                              value={row.desc}
                              onChange={(e) =>
                                handleInputChange(index, "desc", e.target.value)
                              }
                            />
                          ) : (
                            `${row.desc}`
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          {row.permissions.length}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* TableFooter*/}
              <TableContainer
                className='bg-white border-t'
                sx={{
                  borderRadius: "0px 0px 15px 15px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableFooter className='w-full'>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}>
                          <Typography>Total: {totalItems} items</Typography>
                          <Box className='flex w-[80%]'>
                            <DeleteButton
                              onDeleteBtnClick={handleDeleteCust}
                              disable={
                                !selected.some((item) => item.isSelected)
                              }
                            />
                            {editMode.some((item) => item === true) ? (
                              <Box className='flex w-[30%]'>
                                <SaveButton onSaveBtnClick={handleSave} />
                              </Box>
                            ) : (
                              <Box className='flex w-[30%]'>
                                <GradientButton
                                  content={"+ New"}
                                  onBtnClick={handleAddNewCust}
                                />
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>

            {/* Permissions Table */}
            <Box className='w-[50%]'>
              <TableContainer
                className='h-screen bg-white'
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "15px 15px 0px 0px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ borderBottom: "1px solid #C7D4D7" }}>
                      <TableCell align='left' className='w-[15%]'>
                        <Checkbox2
                          className='mt-1 mb-2 border-[#C7D4D7]'
                          checked={isPermissionSelectedAll}
                          onCheckedChange={handlePermissionSelectAll}
                        />
                      </TableCell>
                      <TableCell align='center' className='w-[85%]'>
                        Permission
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Allow the TableBody to grow and fill vertical space */}
                  <TableBody sx={{ flexGrow: 1 }}>
                    {permissions.map((row, index) => (
                      <TableRow
                        key={index}
                        className={
                          permissionSelected[index].isSelected
                            ? `bg-[#D8EAFF]`
                            : `${
                                index % 2 === 1 ? `bg-inherit` : `bg-[#EBF4F6]`
                              }`
                        }>
                        <TableCell align='left'>
                          <Checkbox2
                            checked={permissionSelected[index].isSelected}
                            onClick={(event) => {
                              event.stopPropagation();
                              handlePermissionSelected(index);
                            }}
                            className='mb-2 border-[#C7D4D7]'
                          />
                        </TableCell>
                        <TableCell align='center'>{row.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* TableFooter*/}
              <TableContainer
                className='bg-white border-t'
                sx={{
                  borderRadius: "0px 0px 15px 15px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}>
                <Table>
                  <TableFooter className='w-full'>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}>
                          <Typography>Total: {totalItems} items</Typography>
                          <Box>
                            <DeleteButton
                              onDeleteBtnClick={handleDeleteCust}
                              disable={
                                !permissionSelected.some(
                                  (item) => item.isSelected
                                )
                              }
                            />
                            <Button
                              style={{ marginLeft: "auto", fontWeight: "bold" }}
                              className='w-48 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#4C9BF5] hover:to-[#D8EAFF] 
                                 hover:text-[#00336C] disabled:bg-[#83A2AD]'
                              onClick={() => handleAddNewCust()}>
                              + New
                            </Button>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Box>
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
          customeraAreas={areas}
        />
      )}

      {openEditContract && (
        <ContractForm
          closeModal={handleCloseContractForm}
          customeraAreas={areas}
          selectedCustomer={selectedRow}
        />
      )}
    </div>
  );
}
