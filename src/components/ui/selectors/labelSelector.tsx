"use client";

import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

interface LabelSelectorProps {
  selectorLabel: any;
  itemSource: any[];
  selectedVal: any;
  name: any;
  setSelectedVal: (value: any) => void;
}

export function LabelSelector({selectorLabel, itemSource, setSelectedVal, selectedVal, name,}:LabelSelectorProps) {

  const handleSelectionChange = (e :SelectChangeEvent<{value: unknown}>) => {
    console.log("value = ", e.target)
    setSelectedVal(e.target.value);
  }

  return (
    <>
    <FormControl focused className="w-full">
    <InputLabel
      className="font-bold text-[#2C5079]"
      sx={{
        "&.Mui-focused": {
          color: "#2C5079", // Customize label color on focus
          fontWeight: "bold",
        },
      }}>
      {selectorLabel}
    </InputLabel>
    <Select
      name={name}
      label={name}
      size="small"
      displayEmpty
      value={selectedVal || ""}
      onChange={(e) => handleSelectionChange(e)}
      renderValue={(value) =>
        value === ""
          ? "Select"
          : itemSource.find((s) => s.id === selectedVal)?.desc
      }
      className={`${ selectedVal === undefined ? `text-[#83A2AD]` : "" }`}
      inputProps={{ "aria-label": "Without label" }}
      sx={{
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
          color: "#a0a0a0", // Customize arrow icon color
        },
      }}
    >
      {itemSource.map((s, index) => (
        <MenuItem
          key={`${s.id}-${index}`}
          value={s.id}
        >
          {s.desc}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  </>
  );
}
