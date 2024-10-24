"use client";

import {
  Box,
  Typography,
  Button as Button2,
  FormControl,
  TextareaAutosize,
  Grid2,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/buttons/button";
import { Trash } from "iconsax-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { VscRefresh } from "react-icons/vsc";
import { Selector } from "../ui/selectors/selector";
import { Textbox } from "../ui/textboxs/textbox";
import { AddButton } from "../ui/buttons/addButton";
import { DeleteBtnFooter } from "../ui/buttons/deleteBtnFooter";
import { SaveBtnFooter } from "../ui/buttons/saveBtnFooter";
import { IoClose } from "react-icons/io5";
import LabelTextField3 from "../ui/textboxs/labelTextField3";
import { GoArrowUpRight } from "react-icons/go";
import {
    addNewIncidentType, updateIncidentType
} from "../../app/lib/api";
import { useConfirmDialog } from "../../components/ui/alertDialog/confirmDialog";

type IncidentType = {
  id: any;
  rowNo: number;
  incidentTypeTH: string;
  incidentTypeEN: string;
  correctiveAction: string;
  contacts: string[];
  attchments: string[];
};

type contactType = {
  id: any;
  nameSurname: string;
  tel: string;
  email: string;
};

interface IncidentFormProps {
  selectedIncidentType: IncidentType;
  customeraAeas: any;
  closeModal: () => void;
  setIsAddOrUpdateSuccess: (value: any) => void;
}

const IncidentForm = ({
  selectedIncidentType,
  closeModal,
  setIsAddOrUpdateSuccess,
}: IncidentFormProps) => {

  const [isEdit, setIsEdit] = useState(false);
  const [contacts, setContacts] = useState<contactType[]>([
    // {
    //   id: 0,
    //   nameSurname: "",
    //   tel: "",
    //   email: "",
    // },
  ]);
  const [formHeader, setFormHeader] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [formData, setFormData] = useState<IncidentType>(
    selectedIncidentType || {
      id: "",
      rowNo: 0,
      incidentTypeTH: "",
      incidentTypeEN: "",
      correctiveAction: "",
      contacts: [],
      attchments: [],
    }
  );
  const [mappedContacts, setMappedContacts] = useState<contactType[]>([
    // {
    //   id: 0,
    //   nameSurname: "",
    //   tel: "",
    //   email: "",
    // },
  ]);
  const [mappedFileName, setMappedFileName] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectNewFile, setSelectNewFile] = useState<any[]>([]);
  const { confirmDialog, ConfirmAlertDialog } = useConfirmDialog();

  useEffect(() => {
    if (selectedIncidentType === undefined) {
      setFormHeader("+ New Incident Type");
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setFormHeader("View / Edit Incident Type");
      const mapContacts =
        selectedIncidentType.contacts?.map((contact, index) => {
          const splitVal = contact.split(";;");
          console.log("splitVal = ", splitVal);
          return {
            id: index,
            nameSurname: splitVal[0],
            tel: splitVal[1],
            email: splitVal[2],
          };
        }) || contacts;
      console.log("mappedContacts =", mapContacts);
      setContacts(mapContacts);
      setMappedContacts(mapContacts);
      const filesName = selectedIncidentType.attchments.map((file) => {
        const split = file.split(";;");
        return {
          fileName: split[0],
          fileUrl: split[1],
        };
      });
      console.log("filesName =", filesName);
      setMappedFileName(filesName);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes
    if (!files) {console.log("!files"); return;};
    const file = files[0];
    if (!allowedTypes.includes(file.type)) {
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

  const handleRemoveNewFile = (fileName: any) => {
    const remainFile = selectNewFile.filter(f => f.name != fileName);
    setSelectNewFile(remainFile);
  };

  function handleAddFileClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("inputRef =", inputRef);
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  }

  const addContact = () => {
    console.log("contacts =", contacts);
    setContacts([
      ...contacts,
      { id: contacts.length, nameSurname: "", tel: "", email: "" },
    ]);
  };

  const removeContact = (id: number) => {
    if (contacts.length > 0) {
      const filteredContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(filteredContacts);
    }
  };

  const handleContactChange = (
    id: number,
    field: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, [name]: value } : contact
      )
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleUndo = () => {
    console.log(
      `selectedIncidentType = ${selectedIncidentType}\n mappedContacts = ${mappedContacts}`
    );
    setFormData(selectedIncidentType);
    setContacts(mappedContacts);
    setSelectNewFile([]);
  };

  const handleDelete = () => {};

  const handleSave = async () => {
    console.log("selectedFile = ", selectNewFile);
    console.log("contacts = ", contacts);
    console.log("formData = ", formData);
    const result = await updateIncidentType(formData, contacts, selectNewFile);
    if(result != null){
      const confirmApprove = await confirmDialog(
        "Update Success",
        "Update incident type successfully !",
        true
      );
      setIsAddOrUpdateSuccess(true);
      if(confirmApprove) handleCloseForm();
    }
  };

  const handleSubmit = async () => {
    console.log("selectedFile = ", selectNewFile);
    console.log("contacts = ", contacts);
    console.log("formData = ", formData);
    const result = await addNewIncidentType(formData, contacts, selectNewFile);
    console.log("result = ", result);
    if(result != null){
      const confirmApprove = await confirmDialog(
        "Add Success",
        "Add incident type successfully !",
        true
      );
      setIsAddOrUpdateSuccess(true);
      if(confirmApprove) handleCloseForm();
    }
  };

  function handleCloseForm() {
    closeModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-indextop">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          width: "760px",
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

      <div className="bg-white justify-between rounded-b-lg shadow-lg min-h-[628px] max-h-[734px] w-[760px]">
        {/* Body */}
        <div className="max-h-[600px] overflow-auto">
          <Box
            className="w-full h-[600px] justify-center px-6 py-2 rounded-t-lg pb-6"
            textAlign="center"
          >
            <Box className="w-full flex space-x-4">
              <Box className="w-1/2">
                <Textbox
                  header="Incident Type (EN)"
                  name="incidentTypeEN"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.incidentTypeEN}
                  handleChange={handleChange}
                />
              </Box>
              <Box className="w-1/2">
                <Textbox
                  header="Incident Type (TH)"
                  name="incidentTypeTH"
                  inputType="text"
                  placeHolder="Type here..."
                  value={formData?.incidentTypeTH}
                  handleChange={handleChange}
                />
              </Box>
            </Box>

            <Box className="w-full">
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
                Corrective Action
              </Typography>
              <Box
                sx={{
                  border: `1px solid ${isFocused ? "#1D7A9B" : "#1D7A9B"}`,
                  borderRadius: "8px",
                  padding: "4px",
                }}
              >
                <TextareaAutosize
                  name="correctiveAction"
                  minRows={5}
                  maxRows={8}
                  placeholder="Type here..."
                  value={formData.correctiveAction}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{
                    color: "#2C5079",
                    width: "100%",
                    outline: "none",
                    border: "none",
                    fontSize: "14px",
                    padding: "0.25rem",
                  }}
                  onChange={(e) => handleChange(e)}
                />
              </Box>
            </Box>
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
              Contact
            </Typography>
            {contacts?.map((contact, index) => (
              <Box
                key={index}
                className="flex w-full bg-[#F1F4F4] rounded-lg justify-items-center align-middle justify-between mb-3"
              >
                <Grid2 container sx={{ width: "100%", p: 2 }} spacing={2}>
                  <Grid2 size={6} sx={{ bgcolor: "white" ,borderRadius: "10px"}}>
                    <LabelTextField3
                      label={"Name-Surname"}
                      placeholder={"Type here..."}
                      inputVal={contact.nameSurname}
                      field={"nameSurname"}
                      id={index}
                      handleChangeVal={handleContactChange}
                    />
                  </Grid2>
                  <Grid2
                    size={6}
                    sx={{ bgcolor: "white", borderRadius: "10px" }}
                  >
                    <LabelTextField3
                      label={"Tel"}
                      placeholder={"Type here..."}
                      inputVal={contact.tel}
                      field={"tel"}
                      id={index}
                      handleChangeVal={handleContactChange}
                    />
                  </Grid2>
                  <Grid2 size={6} sx={{ bgcolor: "white" , borderRadius: "10px"}}>
                    <LabelTextField3
                      label={"Email"}
                      placeholder={"Type here..."}
                      inputVal={contact.email}
                      field={"email"}
                      id={index}
                      handleChangeVal={handleContactChange}
                    />
                  </Grid2>
                </Grid2>
                <Box className="flex align-middle ml-2 justify-around">
                  <Button
                    onClick={() => removeContact(contact.id)}
                    className="bg-[#F66262] rounded-r-lg rounded-l-none w-14 h-full"
                  >
                    <Trash color="white" />
                  </Button>
                </Box>
              </Box>
            ))}

            <Box className="justify-start flex w-full">
              <AddButton onAddBtnClick={addContact} />
            </Box>

            <Box className="w-full justify-center" textAlign="center">
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#2C5079",
                  fontWeight: "700",
                  paddingTop: "0.75rem",
                  pb: "0.125rem",
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
                {mappedFileName.map((file, index) => (
                  <Grid2 size={4} key={index}>
                    <Box className="justify-between flex p-1 bg-white border-[1px] border-[#4C9BF5] rounded-lg">
                    <a target="_blank" href={file.fileUrl} className="flex justify-between">
                      <Typography className="py-1 px-2 text-[#2C5079]">
                        {file.fileName.length > 20 ? file.fileName.substring(0, 20)+"..." : file.fileName}
                      </Typography>
                      </a>
                      <GoArrowUpRight
                        size={24}
                        color="#4C9BF5"
                        style={{ marginTop: 5 }}
                      />
                      
                      {/* <Trash
                        size={24}
                        color="#F66262"
                        style={{ marginTop: 5 }}
                        className="cursor-pointer"
                      /> */}
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "14px",
                  color: "#F66262",
                  pb: "0.25rem",
                }}
              >
                *File type : PDF, JPG, PNG and GIF (each file must not exceed 2
                MB)
              </Typography>
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
              <Grid2 container sx={{ width: "100%" }} spacing={2}>
                {selectNewFile.map((file, index) => (
                  <Grid2 size={4} key={index}>
                    <Box className="justify-between flex p-1 bg-white border-[1px] border-[#4C9BF5] rounded-lg">
                      <Typography className="py-1 px-2 text-[#2C5079]">
                        {file.name.length > 20 ? file.name.substring(0, 20)+"..." : file.name}
                      </Typography>
                      <Trash
                        onClick={() => handleRemoveNewFile(file.name)}
                        size={24}
                        color="#F66262"
                        style={{ marginTop: 5 }}
                        className="cursor-pointer"
                      />
                    </Box>
                  </Grid2>
                ))}
              </Grid2>

              <Box className="justify-start flex w-full pt-3 pb-4">
                <FormControl>
                  <AddButton content={"+ Add File"} onAddBtnClick={handleAddFileClick} />
                  <input
                    type="file"
                    ref={inputRef}
                    hidden
                    onChange={handleFileChange}
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
        </div>

        {/* Footer */}
        {!isEdit && (
          <Box className="flex w-full justify-center px-6 space-x-4 border-t-2 pt-4 pb-4">
            <Button
              className="w-28 h-11 bg-white text-[#83A2AD] border-[1px] border-[#83A2AD] hover:text-white hover:bg-[#83A2AD]"
              onClick={handleCloseForm}
            >
              Cancel
            </Button>
            <Button
            onClick={handleSubmit}
              className="w-28 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                               disabled:bg-[#83A2AD]"
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
              {/* <DeleteBtnFooter
                onDeleteBtnFooterClick={handleDelete}
                disable={false}
              /> */}
              <SaveBtnFooter onSaveBtnFooterClick={handleSave} />
            </Box>
          </Box>
        )}
      </div>
      {/* Confirm dialog */}
      {ConfirmAlertDialog}
    </div>
  );
};

export default IncidentForm;
