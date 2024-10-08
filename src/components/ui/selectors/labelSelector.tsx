"use client";

import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

interface LabelSelectorProps {
  selectorLabel: any;
  itemSource: any[];
  selectedVal: any;
  name: any;
  defaultSelected?: string
  setSelectedVal: (value: any) => void;
}

export function LabelSelector({selectorLabel, itemSource, setSelectedVal, selectedVal, name, defaultSelected="Select"}:LabelSelectorProps) {

  const handleSelectionChange = (e :SelectChangeEvent<{value: unknown}>) => {
    console.log("value = ", e.target)
    setSelectedVal(e.target.value);
  }

  return (
    <>
    <FormControl focused className="w-full">
    <InputLabel
      sx={{
        fontWeight: "600",
        color: "#2C5079",
        "&.Mui-focused": {
          color: "#2C5079", 
          fontWeight: "600",
          fontSize: "18px"
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
          ? `${defaultSelected}`
          : itemSource.find((s) => s.id === selectedVal)?.desc
      }
      inputProps={{ "aria-label": "Without label" }}
      sx={{
        color: `${ selectedVal === `${defaultSelected}` ? `#83A2AD` : "" }`,
        borderRadius: "10px",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #1D7A9B", // Customize border color
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #1D7A9B", // Customize border color on focus
          fontSize: "18px"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #1D7A9B", // Hover border color
        },
        "& .MuiSelect-icon": {
          color: "#83A2AD", // Customize arrow icon color
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
