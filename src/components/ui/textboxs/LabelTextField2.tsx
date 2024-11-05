"use client";

import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface LabelTextFieldProps {
  label: any;
  placeholder: any;
  inputVal: any;
  field: any;
  id: any;
  id2?: any;
  handleChangeVal: (id: any, field: any, value: any, id2?: any) => void;
  type?: any;
  disable?: boolean;
}

export default function LabelTextField2({
  label,
  placeholder,
  inputVal,
  field,
  id,
  id2 = undefined,
  handleChangeVal,
  type = "text",
  disable = false,
}: LabelTextFieldProps) {
  return (
    <>
      <TextField
        type={type}
        fullWidth
        label={label}
        size="small"
        className="w-full"
        focused
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              border: "1px solid #1D7A9B", // Focus border color
              borderRadius: "10px",
              fontSize: "18px",
            },
            "&.Mui-disabled": {
              backgroundColor: "transparent", // Background color when disabled
              color: "#2C5079 !important", // Text color when disabled
              opacity: 1, // Ensure the color is not dimmed by default disabled opacity
              WebkitTextFillColor: "#2C5079 !important",
              "& fieldset": {
                borderColor: "#2C5079", // Border color when disabled
                borderRadius: "10px",
              },
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-disabled": {
              color: "#2C5079", // Label color when disabled
              fontWeight: 700
            },
            "&.Mui-focused": {
              color: "#2C5079", // Label color when focused
              fontWeight: "bold",
              fontSize: "18px",
            },
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#83A2AD", // Customize placeholder text color
            opacity: 1, // Ensure full opacity for the placeholder
            fontSize: "14px",
          },
          fontFamily: "Kanit",
        }}
        placeholder={placeholder}
        onChange={(e) => handleChangeVal(id, id2, field, e.target.value)}
        value={inputVal}
        disabled={disable}
      />
    </>
  );
}
