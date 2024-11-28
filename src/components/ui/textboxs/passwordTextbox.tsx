"use client";

import * as React from "react";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/textboxs/input";
import { memo } from 'react';
import { Eye, EyeSlash } from "iconsax-react";

interface TextboxProps {
  header?: any;
  placeHolder: any;
  handleChange: any;
  value: any;
  name: any;
  disable?: boolean;
}

export function PasswordTextbox({ header, placeHolder, handleChange, value, name, disable=false }: TextboxProps) {

  const [isHeader, setHeader] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (header === undefined) setHeader(false)
  });
  
  function handleInputChange(e: any) {
    handleChange(e);
  }

  return (
    <>
    {isHeader && (
      <Typography
        textAlign="left"
        sx={{fontSize: "14px", paddingBottom: "0.25rem", color: "#2C5079", fontWeight: "700"}}
      >
        {header}
      </Typography>)}
      <div className="relative w-full flex">
      <Input
        disabled={disable}
        type={showPassword ? "text" : "password"}
        placeholder={placeHolder}
        className="border-solid border-[#1D7A9B] rounded-[10px] bg-white p-4 mr-0 placeholder:text-[#83A2AD] text-[#2C5079]"
        value={value}
        onChange={(e) => handleInputChange(e)}
        name={name}
      />
      <Button
        type="button"
        onClick={togglePasswordVisibility}
        aria-label="Toggle password visibility"
        sx={{top: 0, bottom: 0, right: 0, position: "absolute", alignItems: "center", paddingX: "0.75rem", color: "#1D7A9B"}}
      >
        {showPassword ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeSlash className="w-5 h-5" />
        )}
      </Button>
      </div>
    </>
  );
}
