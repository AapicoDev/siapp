"use client";

import {
  Box,
  Typography,
  Button as Button2,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export function SelectorLabelInline({selectorLabel, itemSource, handleChange}:any) {
    const [label, setLabel] = useState(selectorLabel);
    const [sourcesList, setSourceList] = useState<any[]>(itemSource);
    const [selected, setSelected] = useState<any>("");

    function handleSectionChange(e: SelectChangeEvent){
      console.log("e in selector = ", e)
      handleChange(e, selectorLabel);
    }

  return (
    <FormControl focused className="w-full">
      <InputLabel
        className="text-[#2C5079"
        sx={{
          "&.Mui-focused": {
            color: "#2C5079",
            fontSize: "18px",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        label={label}
        size="small"
        displayEmpty
        value={selected || ""}
        onChange={(e)=>handleSectionChange(e)}
        renderValue={(selected) => {
          if (selected === "") {
            return `Select ${label}`;
          }
          return selected;
        }}
        // className={`${ selectedAddSegment === undefined ? `text-[#83A2AD]` : "" }`}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          borderRadius: "10px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #1D7A9B", // Customize border color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #1D7A9B", // Customize border color on focus
            fontSize: "18px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #1D7A9B", // Hover border color
          },
          "& .MuiSelect-icon": {
            color: "#83A2AD", // Customize arrow icon color
          },
        }}
      >
        {sourcesList?.map((source, index) => (
          <MenuItem key={`${source.id}-${index}`} value={source.desc}>
            {source.desc}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
