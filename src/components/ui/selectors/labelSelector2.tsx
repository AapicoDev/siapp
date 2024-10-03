"use client";

import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface LabelSelector2Props {
  itemSource: any[];
  selectedVal: any;
  id: any;
  handleSelectedVal: (id: any, value: any) => void;
}

export function LabelSelector2({
  itemSource,
  handleSelectedVal,
  selectedVal,
  id,
}: LabelSelector2Props) {


  return (
    <>
      <FormControl focused className="w-full">
        <InputLabel className="font-bold text-[#2C5079] w-full"></InputLabel>
        <Select
          labelId={`select-segment-label-${id}`}
          size="small"
          value={selectedVal || ""}
          onChange={(e) =>
            handleSelectedVal(id, e.target.value)
          }
          className={`${
            id === null ? `text-[#83A2AD]` : ""
          } bg-white text-sm text-[#2C5079]`}
          displayEmpty
          renderValue={(value) =>
            value === ""
              ? "Select"
              : itemSource.find((s) => s.id === value)?.desc
          }
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            height: "40px",
            width: "100%",
            borderRadius: "10px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #4C9BF5", // Customize border color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #4C9BF5", // Customize border color on focus
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #4C9BF5", // Hover border color
            },
            "& .MuiSelect-icon": {
              color: "#a0a0a0", // Customize arrow icon color
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
    </>
  );
}
