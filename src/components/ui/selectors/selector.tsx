"use client";

import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";

interface SelectorProps {
  selectorLabel: any;
  itemSource: any[];
  selectedVal: any;
  name: any;
  handleChange: any;
}

export function Selector({selectorLabel, itemSource, selectedVal, handleChange, name,}: SelectorProps) {
  const [sourceList, setSourceList] = useState<any[]>(itemSource);

  function handleSelectionChange(e: SelectChangeEvent){
    handleChange(e);
  }

  return (
    <FormControl focused className="w-full">
      <Typography
        textAlign="left"
        className="text-[14px] pb-1 text-[#2C5079] font-bold"
      >
        {selectorLabel}
      </Typography>
      <InputLabel className="font-bold text-[#2C5079] w-full"></InputLabel>
      <Select
        name={name}
        size="small"
        displayEmpty
        value={selectedVal || ""}
        onChange={(e) => handleSelectionChange(e)}
        renderValue={(value) =>
          value === ""
            ? "Select"
            : sourceList.find((s) => s.id === selectedVal)?.desc
        }
        className={`${
          selectedVal === undefined
            ? `text-[#83A2AD]`
            : "text-[#2C5079]"
        }`}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          height: "40px",
          width: "100%",
          borderRadius: "10px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #1D7A9B", // Customize border color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #1D7A9B", // Customize border color on focus
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #1D7A9B", // Hover border color
          },
          "& .MuiSelect-icon": {
            color: "#83A2AD", // Customize arrow icon color
          },
        }}
      >
        {sourceList.map((s) => (
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
