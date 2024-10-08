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
        sx={{fontSize: "14px", paddingBottom: "0.25rem", color: "#2C5079", fontWeight: "700"}}
      >
        {selectorLabel}
      </Typography>
      <InputLabel sx={{fontWeight: "700", color: "#2C5079"}} className="w-full"></InputLabel>
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
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          color: `${
            selectedVal === "" ? `#83A2AD` : "#2C5079"
          }`,
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
            sx={{fontSize: "0.875rem", lineHeight: "1.25rem", color: "#2C5079"}}
          >
            {s.desc}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
