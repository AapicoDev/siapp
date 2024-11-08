"use client";
import {
  Box,
  Typography,
  Button as Button2,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@/components/ui/textboxs/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/buttons/button";
import { Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { VscRefresh } from "react-icons/vsc";
import { Selector } from "../ui/selectors/selector";
import { Textbox } from "../ui/textboxs/textbox";
import { AddButton } from "../ui/buttons/addButton";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import data from "@/app/mockData.json";
import { SearchButton } from "../ui/buttons/searchButton";
import { LabelTextDisplayBox } from "../ui/labelTextDisplayBox";
import { SearchSelector } from "../ui/selectors/searchSelector";
import { addNewArea, addNewCustomer, deleteArea, deleteCustomer, getMasterAreaDataWithCustomerId, updateArea, updateCustomer } from "@/app/lib/api";
import { useConfirmDialog } from "../ui/alertDialog/confirmDialog";

type RowData = {
  id: any;
  department_Id: any;
  areaId: string[];
  segment_Id: any;
  group_Id: any;
  zone_Id: any;
  hr_code: string;
  code: string;
  isActive: boolean;
  customerName: string;
  totalCheckpoint: any;
  contractTotal: any;
};

type AreaData = {
  id: string;
  custId: string;
  name: string;
  status: string;
};

const segments = [
  {
    id: 1,
    desc: "Building",
  },
  {
    id: 2,
    desc: "Education",
  },
  {
    id: 3,
    desc: "Industrial",
  },
  {
    id: 4,
    desc: "Resident",
  },
];

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

const zones = [
  {
    id: 1,
    desc: "BMR",
  },
  {
    id: 2,
    desc: "RO1",
  },
  {
    id: 3,
    desc: "SVN",
  },
  {
    id: 4,
    desc: "RO2",
  },
];

const CustomerForm = ({
  editCustomer,
  closeModal,
  customeraAeas,
  departmantItemSource,
  allSegment,
  allGroup,
  allZone,
  setIsAddOrUpdateSuccess,
}: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [areas, setAreas] = useState<AreaData[]>(
    customeraAeas.map((area: any) => ({
      id: area.id,
      custId: area.custId,
      name: area.name,
      status: editCustomer === undefined ? "new" : "existed",
    }))
  );
  const [formHeader, setFormHeader] = useState("");
  const [formData, setFormData] = useState(
    editCustomer || {
      hr_code: "",
      id: "",
      department_Id: "",
      segment_Id: "",
      group_Id: "",
      zone_Id: "",
      code: "",
      isActive: true,
      customerName: "",
      searchSegment: "",
      searchGroup: "",
      searchZone: "",
    }
  );
  const [areaRemoveList, setAreaRemoveList] = useState<any[]>([]);
  const [departmantItems, setDepartmantItems] = useState<any[]>(departmantItemSource || []);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (editCustomer === undefined) {
      setFormHeader("+ New Customer");
      setIsEdit(false);
    } else {
      setFormHeader("View / Edit Customer");
      setIsEdit(true);
    }
  }, [editCustomer]);

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    console.log("formData", formData);
  };

  const addArea = () => {
    setAreas([
      ...areas,
      { id: `${Date.now()}`, name: "", custId: formData.id, status: "new" },
    ]);
  };

  const removeArea = (id: any, status: any, selectedIndex: number) => {
    console.log("remove id =", id);
    console.log("status =", status);
    if (status === "existed" || status === "edit") {
      setAreaRemoveList(areaRemoveList.concat(id));
    }
    if (areas.length > 0) {
      const filteredAreas = areas.filter(
        (area, index) => index !== selectedIndex
      );
      setAreas(filteredAreas);
    }
  };

  const handleAreaChange = (id: string, value: string) => {
    setAreas(
      areas.map((area) =>
        area.id === id
          ? {
              ...area,
              name: value,
              status:
                formData.id === ""
                  ? area.status
                  : area.status === "new"
                  ? area.status
                  : "edit",
            }
          : area
      )
    );
  };

  const handleAutocompleteChange = (newValue: any) => {
    console.log("newValue =", newValue);
    setFormData((prevData: any) => ({
      ...prevData,
      department_Id: newValue?.id,
      segment_Id: newValue?.segment_Id,
      group_Id: newValue?.group_Id,
      zone_Id: newValue?.zone_Id
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleUndo = () => {
    setFormData(editCustomer);
    setAreas(customeraAeas);
  };

  const getAreasOfCustomer = async (custId : any) => {
    const getAreas = await getMasterAreaDataWithCustomerId(custId);
    const mapArea: AreaData[] = getAreas?.documents.map(doc => {
      return{
        id: doc.$id,
        custId: doc.CustomerId,
        name: doc.name,
        status: "existed"
      }
    }) || []
    setAreas(mapArea);
    console.log("mapArea =", mapArea);
  };

  const handleDelete = async () => {
    console.log("formData =", formData);
    console.log("areas =", areas);
    console.log("areaRemoveList =", areaRemoveList);
    const confirmApprove = await confirmDialog(
      "Delete Customer",
      "Do you want to delete this customer?"
   );
   if (confirmApprove) {

    //TODO Delete Checkpoints Of area?
    //TODO Delete Rounds of area?

    //Delete areas of customer
    let deleteAreaResult;
    console.log("delete areas = ", areas);
    if(areas?.length > 0){
      setIsLoading(true);
      deleteAreaResult = await deleteArea(areas.map((item) => item.id));
      setIsLoading(false);
      console.log("deleteAreaResult", deleteAreaResult);
    }

    if (deleteAreaResult !== null) {
     setIsLoading(true);
     console.log("formData.id =", formData.id);
     const deleteResult = await deleteCustomer([formData.id]);
     setIsLoading(false);
     console.log("deleteResult =", deleteResult);
     if (deleteResult !== null) {
       const confirmApprove = await confirmDialog(
         "Delete Success",
         "delete customer success.", true
      );
      if(confirmApprove){
       setIsAddOrUpdateSuccess(true);
       handleCloseCustomerForm();
      }
     }
     else {
       alert("Error occur to delete.");
     }
    }
    else {
      alert("Error occur to delete areas of customer.");
    }
   }
  };

  const handleSubmit = async () => {
    console.log("formData =", formData);
    console.log("areas =", areas);
    let addNewAreaResult, updateNewAreaOfCustomer;
    //#region -- Add New Customer --
    const customerDataToSubmit = {
      CustomerName: formData.customerName,
      segment_Id: formData.segment_Id,
      group_Id: formData.group_Id,
      zone_Id: formData.zone_Id,
      department_Id: formData.department_Id,
      hr_code: formData.hr_code,
      isActive: formData.isActive,
      code: formData.code,
      area_id: []
    };
    console.log("customerDataToSubmit", customerDataToSubmit);
    const newCustId = await addNewCustomer(customerDataToSubmit);
    console.log("newCustId", newCustId);

    const newAreas = areas.filter((area) => area.status === "new");
    console.log("newAreas =", newAreas);
    if (newAreas.length > 0) {
      const dataToSubmit =
        newAreas?.map((newarea) => {
          return {
            name: newarea.name,
            CustomerId: newCustId?.$id,
            checkPointIDs: [],
            roundIDs: [],
            customerName: formData.customerName,
          };
        }) || [];
      setIsLoading(true);
      console.log("ืnew area dataToSubmit =", dataToSubmit);
      addNewAreaResult = await addNewArea(dataToSubmit);
      setIsLoading(false);
      if (addNewAreaResult !== null) {
        updateNewAreaOfCustomer = areas
          .filter((item) => item.status === "existed" || item.status === "edit")
          .map((item) => item.id);
          updateNewAreaOfCustomer = updateNewAreaOfCustomer.concat(addNewAreaResult);
          console.log("updateNewAreaOfCustomer", updateNewAreaOfCustomer);
      }
    }

    const updateDataToSubmit = {
      area_id: updateNewAreaOfCustomer
    };
    console.log("updateDataToSubmit", updateDataToSubmit);
    const addCustResult = await updateCustomer(updateDataToSubmit, newCustId?.$id);
    if (addCustResult !== null) {
      setIsAddOrUpdateSuccess(true);
      const confirmApprove = await confirmDialog(
        "Add Success",
        "Add New customer data successfully !",
        true
      );
      if (confirmApprove) handleCloseCustomerForm();
    }
    //#endregion -- Add New Customer --
  };

  const handleSave = async () => {
    console.log("formData =", formData);
    console.log("areas =", areas);
    console.log("areaRemoveList =", areaRemoveList);
    let addNewAreaResult, deleteAreaResult, updateAreaResult;
    let updateNewAreaOfCustomer = areas.map((item) => item.id);

    if (formData.id !== "" && formData.id !== undefined) {
      //#region -- save new area --
      const newAreas = areas.filter((area) => area.status === "new");
      console.log("newAreas =", newAreas);
      if (newAreas.length > 0) {
        const dataToSubmit =
          newAreas?.map((newarea) => {
            return {
              name: newarea.name,
              CustomerId: newarea.custId,
              checkPointIDs: [],
              roundIDs: [],
              customerName: formData.customerName,
            };
          }) || [];
        setIsLoading(true);
        addNewAreaResult = await addNewArea(dataToSubmit);
        setIsLoading(false);
        if (addNewAreaResult !== null) {
          updateNewAreaOfCustomer = areas
            .filter((item) => item.status === "existed" || item.status === "edit")
            .map((item) => item.id);
            updateNewAreaOfCustomer = updateNewAreaOfCustomer.concat(addNewAreaResult);
            console.log("updateNewAreaOfCustomer", updateNewAreaOfCustomer);
        }
      }
      //#endregion -- save new area --

      //#region -- delete area --
      console.log("areaRemoveList = ", areaRemoveList);
      if(areaRemoveList?.length > 0){
        setIsLoading(true);
        deleteAreaResult = await deleteArea(areaRemoveList);
        setIsLoading(false);
        console.log("deleteAreaResult", deleteAreaResult);
        if (deleteAreaResult !== null) {
          setAreaRemoveList([]);
          console.log("delete updateAreaOfCustomer", updateNewAreaOfCustomer);
        }
      }
      //#endregion -- delete area --

      //#region -- update area --
      const editAreas = areas.filter((area) => area.status === "edit");
      console.log("editAreas = ", editAreas);
      if (editAreas.length > 0) {
        const dataToSubmit =
        editAreas?.map((area) => {
            return {
              documentId: area.id,
              updateFields: {
                name: area.name,
                CustomerId: area.custId,
                customerName: formData.customerName
              },
            };
          }) || [];
        console.log("dataToSubmit =", dataToSubmit);
        setIsLoading(true);
        updateAreaResult = await updateArea(dataToSubmit);
        setIsLoading(false);
        console.log("updateResult =", updateAreaResult);
      }

      await getAreasOfCustomer(formData.id);
      //#endregion -- update area --

      // -- Update Customer --
      const customerDataToSubmit = {
        CustomerName: formData.customerName,
        segment_Id: formData.segment_Id,
        group_Id: formData.group_Id,
        zone_Id: formData.zone_Id,
        department_Id: formData.department_Id,
        hr_code: formData.hr_code,
        isActive: formData.isActive,
        code: formData.code,
        area_id: updateNewAreaOfCustomer
      };
      console.log("customerDataToSubmit", customerDataToSubmit);
      const updateResult = await updateCustomer(customerDataToSubmit, formData.id);
      if (updateResult !== null) {
        const confirmApprove = await confirmDialog(
          "Updated Success",
          "Update customer data successfully !",
          true
        );
        setIsAddOrUpdateSuccess(true);
        //if (confirmApprove) handleCloseCustomerForm();
      }
    }
  };

  function handleCloseCustomerForm() {
    closeModal(isEdit);
  }

  const handleActiveChange = (checked: boolean) => {
    setFormData((prevData: any) => ({ ...prevData, isActive: checked }));
  };

  const handleSearch = () => {
    console.log("formData =", formData);
    console.log("departmantItemSource =", departmantItemSource);
    const filteredDepartmentItemSource = departmantItemSource.filter((department: any) => {
      const segmentMatch = formData.searchSegment ? department.segment_Id === formData.searchSegment : true;
      const groupMatch = formData.searchGroup ? department.group_Id === formData.searchGroup : true;
      const zoneMatch = formData.searchZone ? department.zone_Id === formData.searchZone : true;
    
      return segmentMatch && groupMatch && zoneMatch;
      }
    )
    console.log("filteredDepartmentItemSource =", filteredDepartmentItemSource);
    setDepartmantItems(filteredDepartmentItemSource);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          width: "800px",
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

      <div className="bg-white rounded-b-lg shadow-lg min-h-[544px] max-h-[654px] w-[800px]">
        {/* Body */}
        <div className="max-h-[578px] overflow-auto">
          <Box
            className="w-full justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            {!isEdit && (
              <>
                <Box className="flex w-full space-x-3 pt-4">
                  {/* Segment */}
                  <Box className="w-[30%]">
                    <Selector
                      selectorLabel={"Segment"}
                      itemSource={allSegment}
                      handleChange={handleSelectChange}
                      selectedVal={formData.searchSegment}
                      name={"searchSegment"}
                    />
                  </Box>

                  {/* Group */}
                  <Box className="w-[30%]">
                    <Selector
                      selectorLabel={"Group"}
                      itemSource={allGroup}
                      handleChange={handleSelectChange}
                      selectedVal={formData.searchGroup}
                      name={"searchGroup"}
                    />
                  </Box>
                  {/* Zone */}
                  <Box className="w-[30%]">
                    <Selector
                      selectorLabel={"Zone"}
                      itemSource={allZone}
                      handleChange={handleSelectChange}
                      selectedVal={formData.searchZone}
                      name={"searchZone"}
                    />
                  </Box>
                  <Box className="w-[10%] mt-6">
                    <SearchButton onSearchBtnClick={handleSearch} />
                  </Box>
                </Box>
                <Box className="flex w-full space-x-3 py-2 justify-center border-b-2">
                  <Typography sx={{ color: "#37B7C3" }}>
                    **For filter department (optional)
                  </Typography>
                </Box>
              </>
            )}

            <>
              <Box className="flex w-full space-x-5 pt-4">
                {/* Department */}
                <Box className="w-1/2">
                  <SearchSelector
                    selectorLabel={"Department"}
                    itemSource={departmantItems}
                    handleChange={handleAutocompleteChange}
                    selectedVal={formData.department_Id}
                    name={"departmentId"}
                  />
                </Box>
                {/* Segment */}
                <Box className="w-1/2">
                  <LabelTextDisplayBox
                    label={"Segment"}
                    text={
                      allSegment.find((s: any) => s.id === formData.segment_Id)
                        ?.desc
                    }
                  />
                </Box>
              </Box>

              <Box className="flex w-full space-x-5 pt-3">
                {/* Group */}
                <Box className="w-1/2">
                  <LabelTextDisplayBox
                    label={"Group"}
                    text={
                      allGroup.find((g: any) => g.id === formData.group_Id)
                        ?.desc
                    }
                  />
                </Box>
                {/* Zone */}
                <Box className="w-1/2">
                  <LabelTextDisplayBox
                    label={"Zone"}
                    text={
                      allZone.find((z: any) => z.id === formData.zone_Id)?.desc
                    }
                  />
                </Box>
              </Box>

              <Box className="flex w-full space-x-5 pt-3">
                {/* Customer */}
                <Box className="w-1/2">
                  <Textbox
                    header="Customer"
                    name="customerName"
                    inputType="text"
                    placeHolder="Type here..."
                    value={formData?.customerName}
                    handleChange={handleChange}
                  />
                </Box>
                {/* HR Code */}
                <Box className="w-1/2">
                  <Textbox
                    header="HR Code"
                    name="hr_code"
                    inputType="text"
                    placeHolder="Type here..."
                    value={formData?.hr_code}
                    handleChange={handleChange}
                  />
                </Box>
              </Box>

              <Box className="flex w-full space-x-5 pt-3">
                <Box className="w-1/2">
                  <Textbox
                    header="Code"
                    name="code"
                    inputType="text"
                    placeHolder="Type here..."
                    value={formData?.code}
                    handleChange={handleChange}
                  />
                </Box>
                <Box className="w-1/2">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      paddingBottom: "0.25rem",
                      color: "#2C5079",
                      fontWeight: "700",
                    }}
                  >
                    Status
                  </Typography>
                  <Box className="flex">
                    <Switch
                      name="isActive"
                      checked={formData.isActive}
                      onCheckedChange={handleActiveChange}
                    />
                    <Typography
                      textAlign="left"
                      sx={{
                        fontSize: "14px",
                        paddingBottom: "0.25rem",
                        color: "#2C5079",
                        fontWeight: "700",
                        paddingLeft: "0.5rem",
                        paddingTop: "0.5rem",
                      }}
                    >
                      {formData.isActive === true ? "Active" : "Inactive"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>

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
              Area
            </Typography>
            {areas.map((area, index) => (
              <Box
                key={area.id + index}
                className="flex w-full bg-[#EBF4F6] rounded-lg justify-items-center align-middle justify-between mb-3"
              >
                <Box className="w-11 h-10 bg-[#37B7C3] rounded-lg justify-center text-white p-2 m-3">
                  {index + 1}
                </Box>
                <Box className="flex w-full justify-center">
                  <Typography
                    textAlign="left"
                    sx={{
                      fontSize: "14px",
                      color: "#2C5079",
                      paddingTop: "1.25rem",
                    }}
                  >
                    Area&apos;s Name :
                  </Typography>
                  <Input
                    value={area.name}
                    onChange={(e) => handleAreaChange(area.id, e.target.value)}
                    type="text"
                    placeholder="Type here..."
                    className="max-w-80 border-solid border-[#1D7A9B] rounded-[10px] bg-white p-4 m-3 placeholder:text-[#83A2AD]"
                  />
                </Box>
                <Box className="flex align-middle ml-2 justify-around">
                  <Button
                    onClick={() => removeArea(area.id, area.status, index)}
                    className="bg-[#F66262] rounded-r-lg rounded-l-none w-14 h-full"
                  >
                    <Trash color="white" />
                  </Button>
                </Box>
              </Box>
            ))}

            <Box className="justify-start flex w-full">
              <AddButton onAddBtnClick={addArea} />
            </Box>

            <Box className="w-full justify-between items-center pt-5">
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4C9BF5",
                  textDecorationLine: "underline",
                }}
              >
                Total: {areas.length} area{areas.length > 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Footer */}
        {!isEdit && (
          <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
            <Button
              className="w-28 h-11 bg-white text-[#83A2AD] border-[1px] border-[#83A2AD] hover:text-white hover:bg-[#83A2AD]"
              onClick={handleCloseCustomerForm}
            >
              Cancel
            </Button>
            <Button
              className="w-28 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                               disabled:bg-[#83A2AD]"
              onClick={handleSubmit}>
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

export default CustomerForm;
