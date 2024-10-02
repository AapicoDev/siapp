"use client";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material/";
import SegmentTable from "@/components/materData/SegmentTable";
import Navbar from "@/components/Navbar";
import LabelTextField from "@/components/ui/textboxs/LabelTextField";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/textboxs/input";
import { AddButton } from "@/components/ui/buttons/addButton";
import { SearchButton } from "@/components/ui/buttons/searchButton";
import styles from "../../../styles.module.css"
import { EditButton } from "@/components/ui/buttons/editButton";
import { SaveButton } from "@/components/ui/buttons/saveButton";
import { DeleteButton } from "@/components/ui/buttons/deleteButton";
import { Checkbox as Checkbox3 } from "@/components/ui/checkbox3"
import { LabelSelector } from "@/components/ui/selectors/labelSelector";
import data from "@/app/mockData.json";
import { DatePicker } from "@/components/ui/datePicker";
import { GradientButton } from "@/components/ui/buttons/gradientButton";
import { Textbox } from "@/components/ui/textboxs/textbox";
import Image from "next/image";

type RowData = {
  id: number;
  segment: string;
  description: string;
  department: number;
  customer: number;
};

type selectorType = {
    id: number;
    desc: string;
};


export default function MonitoringReport() {

  const rows: RowData[] = [
    {
      id: 1,
      segment: "Building",
      description: "กลุ่มอาคาร",
      department: 6,
      customer: 5,
    },
    {
      id: 2,
      segment: "Energy",
      description: "กลุ่มพลังงาน",
      department: 1,
      customer: 1,
    },
    {
      id: 3,
      segment: "Education",
      description: "กลุ่มการศึกษา",
      department: 4,
      customer: 3,
    },
    {
      id: 4,
      segment: "Hospitality",
      description: "กลุ่มการแพทย์",
      department: 1,
      customer: 1,
    },
  ];

  const mockAddedBy = [
    {
        id: 1,
        desc:"ชื่อ นามสกุล (Admin)"
    },
    {
        id: 2,
        desc:"ชื่อ นามสกุล (User)"
    },
  ]

  const mockQrErrorReason = [
    {
        code: "1",
        reason:"QR Code ชำรุด เลือน ไม่ชัดเจน",
        addedByid: 1
    },
    {
        code: "2",
        reason:"ระบบ Error ทำให้สแกน QR Code ไม่ได้",
        addedByid: 2
    },
    {
        code: "3",
        reason:"สถานที่สแกนมีแสงสว่างมากเกินไป",
        addedByid: 2
    },
  ]

  const totalItems = rows.length;

  const [custSelector, setCustSelector] = useState<selectorType[]>([]);
  const [customers, setCustomers] = useState(data.customers);
  const [editMode, setEditMode] = useState(Array(rows.length).fill(false)); // Array to track edit state for each row
  const [rowData, setRowData] = useState(rows); // Local state for row data
  const [addCode, setAddCode] = useState("");
  const [addQRErrorReason, setAddQRErrorReason] = useState("");
  const [selecteCustomer, setSelecteCustomer] = useState<number>();
  
  useEffect(() => {
    const selector = Array.from({ length: customers.length }, () => ({
        id: 0,
        desc: "",
      }));
    for( let i=0; i<length; i++){
        selector[i].id = customers[i].id;
        selector[i].desc = customers[i].customerName;
    };
    setCustSelector(selector);
    console.log(selector)

  }, []);

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

  const handleAdd = () => {
  };

  const handleSearch = () => {

  };

  const handleDelete = () => {
    
  };

  // Handle input changes in edit mode
  const handleInputChange = <T extends keyof RowData>(
    index: number,
    field: T,
    value: RowData[T]
  ) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Navbar menu={'SIAPP'} submenu={'Monitoring Report'} />
      <Box className="px-2">
        {/* Main Content */}
        <Box flex={1} px={2} pb={2}>
          {/* Sub Header */}
          <Box mb={2} className="w-full flex justify-center">
            <Box justifyContent="center">
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 1px 12px rgba(29, 122, 155, 0.1)",
                }}
                justifyContent="space-between"
                className="space-x-4 p-4 flex"
              >
                
                <Box className="justify-center flex p-1 bg-white rounded-lg border-[1px] border-[#2C5079]">
                <DatePicker/>
                  <Typography className="text-[#2C5079] text-sm px-4 pt-1" >to</Typography>
                  <DatePicker/>
                </Box>
                <Box className="w-full h-full flex space-x-2">
                <Checkbox3 className="w-9 h-9 mt-1"/>
                <Typography className="mt-3 text-[#2C5079] text-[15px] w-[70px]">Summary</Typography>
                </Box>
                <Box className="w-full h-full flex space-x-2">
                <Checkbox3 className="w-9 h-9 mt-1"/>
                <Typography className="mt-3 text-[#2C5079] text-[15px] w-[70px]">Detail</Typography>
                </Box>
                <Box className="w-fit">
                    <SearchButton onSearchBtnClick={handleSearch}/>
                </Box>
                <Box className="w-fit">
                    <GradientButton content={"Generate Report"} onBtnClick={handleSearch}/>
                </Box>
              </Box>
            </Box>
          </Box>

          <div className="flex h-screen items-center justify-center">
            <Image src={"/NoData.png"} alt="No Data" width={200} height={200} />
          </div>

        </Box>
      </Box>
    </div>
  );
}