"use client";

import * as React from "react";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/textboxs/input";

export function Textbox({ header,inputType, placeHolder, handleChange, value, name }: any) {

  const [isHeader, setHeader] = useState(true);

  useEffect(() => {
    if (header === undefined) setHeader(false)
  });
  
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange(e);
  }

  return (
    <>
    {isHeader && (
      <Typography
        textAlign="left"
        className="text-[14px] pb-1 text-[#2C5079] font-bold"
      >
        {header}
      </Typography>)}
      
      <Input
        type={inputType}
        placeholder={placeHolder}
        className="border-solid border-[#1D7A9B] rounded-[10px] bg-white p-4 mr-2 placeholder:text-[#83A2AD] text-[#2C5079]"
        value={value}
        onChange={(e) => handleInputChange(e)}
        name={name}
      />
    </>
  );
}
