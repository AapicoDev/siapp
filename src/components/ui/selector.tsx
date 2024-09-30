"use client";

import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";

export function Selector({selectorLabel, itemSource, handleChange, selected, selectorTargetName,}:any) {
  const [label, setLabel] = useState(selectorLabel);
  const [selectedId, setSelectedId] = useState(selected);
  const [sourceList, setSourceList] = useState<any[]>(itemSource);
  const targetName = selectorTargetName;

  function handleSectionChange(e: SelectChangeEvent){
    console.log("e in selector = ", e)
    setSelectedId(e.target.value)
    handleChange(e);
  }

  return (
    <FormControl focused className="w-full">
      <Typography
        textAlign="left"
        className="text-[14px] pb-1 text-[#2C5079] font-bold"
      >
        {label}
      </Typography>
      <InputLabel className="font-bold text-[#2C5079] w-full"></InputLabel>
      <Select
        name={targetName}
        size="small"
        displayEmpty
        value={selectedId || ""}
        onChange={(e) => handleSectionChange(e)}
        renderValue={(value) =>
          value === ""
            ? "Select"
            : sourceList.find((s) => s.id === selectedId)?.desc
        }
        className={`${
            selectedId === undefined
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
