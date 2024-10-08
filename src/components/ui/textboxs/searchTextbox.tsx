"use client";

import * as React from "react";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Input } from "@/components/ui/textboxs/input";

export function SearchTextbox({
  isDisplay,
  inputType,
  placeHolder,
  handleChange,
  value,
  name,
}: any) {

  const [isDisplaySearhBox, setIsDisplaySearhBox] = useState(isDisplay || true);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange(e);
  }

  return (
    <>
      <Input
        type={inputType}
        placeholder={placeHolder}
        style={{
          display: `${isDisplaySearhBox}`,
          boxShadow: "0px 5px 12px rgba(29, 122, 155, 0.1)",
          borderRadius: "10px",
        }}
        className="border-none bg-white p-4 mr-2 min-w-80 custom-placeholder"
        value={value}
        name={name}
        onChange={(e) => handleInputChange(e)}
      />
    </>
  );
}
