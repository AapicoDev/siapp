"use client";

import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Selector2Props {
  selectorLabel?: any;
  itemSource: any[];
  selectedVal: any;
  name: any;
  defaultSelected: any;
  setSelectedVal: (value: any) => void;
}

export function Selector2({selectorLabel, itemSource, setSelectedVal, selectedVal, name, defaultSelected="Select"}:Selector2Props) {

const [isHeader, setHeader] = useState(true);

    useEffect(() => {
      if (selectorLabel === undefined) setHeader(false)
    });

  const handleSelectionChange = (e :SelectChangeEvent<{value: unknown}>) => {
    console.log("value = ", e.target)
    setSelectedVal(e.target.value);
  }

  return (
    <FormControl focused className="w-full">
    {isHeader && (
      <Typography
        textAlign="left"
        className="text-[14px] pb-1 text-[#2C5079] font-bold"
      >
        {selectorLabel}
      </Typography>)}
      <InputLabel className="font-bold text-[#2C5079] w-full"></InputLabel>
      <Select
        name={name}
        size="small"
        displayEmpty
        value={selectedVal || ""}
        onChange={(e) => handleSelectionChange(e)}
        renderValue={(value) =>
          value === ""
            ? `${defaultSelected}`
            : itemSource.find((s) => s.id === selectedVal)?.desc
        }
        className={`${
          selectedVal === `${defaultSelected}`
            ? `text-[#83A2AD]`
            : "text-[#2C5079]"
        }`}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          height: "34px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#D9F0EC",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #D9F0EC", // Customize border color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #D9F0EC", // Customize border color on focus
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #D9F0EC", // Hover border color
          },
          "& .MuiSelect-icon": {
            color: "#83A2AD", // Customize arrow icon color
          },
        }}
      >
        {itemSource.map((s) => (
          <MenuItem
            key={s.id}
            value={s.id}
            className="text-sm text-[#2C5079]"
          >
            {s.desc}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
