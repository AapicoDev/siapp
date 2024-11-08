"use client";

import * as React from "react";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface SearchSelectorProps {
  selectorLabel: any;
  itemSource: any[];
  selectedVal: any;
  name: any;
  handleChange: any;
  disable?: boolean;
}

export function SearchSelector({
  selectorLabel,
  itemSource,
  selectedVal,
  handleChange,
  name,
  disable = false,
}: SearchSelectorProps) {
  function handleSelectionChange(e: any, newValue: any) {
    if (newValue && newValue.id !== selectedVal) {
        handleChange(newValue);
      } else if (!newValue && selectedVal) {
        handleChange(null);
      }
  }

  return (
    <FormControl focused className="w-full">
      <Typography
        textAlign="left"
        sx={{
          fontSize: "14px",
          paddingBottom: "0.25rem",
          color: "#2C5079",
          fontWeight: "700",
        }}
      >
        {selectorLabel}
      </Typography>
      <Autocomplete
      aria-placeholder="Select"
        disablePortal
        options={itemSource}
        value={itemSource.find((item) => item.id === selectedVal) || ""}
        onChange={handleSelectionChange}
        sx={{
          bgcolor: "white",
          color: `${selectedVal === "" ? `#83A2AD` : "#2C5079"}`,
          width: "100%",
          height: "38px",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            padding: "0px 10px",
            height: "38px",
            borderRadius: "10px",
            "& .MuiAutocomplete-input": {
              fontSize: "14px",
              padding: "10px 0px",
              color: selectedVal === "" ? "#83A2AD" : "#2C5079",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #1D7A9B", // Set border color always
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1D7A9B", // Optional: same color on hover for consistency
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1D7A9B", // Optional: same color on focus for consistency
            },
          },
          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
            color: "#83A2AD",
            fontSize: "32px",
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "#83A2AD",
            "& .MuiSvgIcon-root": {
              fontSize: "18px", // Adjust cross icon size only
            },
          },
          "&.Mui-disabled": {
            "& .MuiAutocomplete-inputRoot": {
              color: "#2C5079",
            },
          },
        }}
        renderInput={(params) => 
        <TextField {...params} sx={{
            "& .MuiInputBase-input": {
              textAlign: "center",  // Center the text
              ml: 6
            },
          }}
        placeholder="Select"/>}
      />
    </FormControl>
  );
}
