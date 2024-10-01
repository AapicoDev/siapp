"use client";

import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface LabelTextFieldProps {
  label: any;
  placeholder: any;
  inputVal: any;
  setInputVal: (value: any) => void;
}

export default function LabelTextField({ label, placeholder, inputVal, setInputVal }: LabelTextFieldProps) {

  const handleChange = (e :ChangeEvent<{value: unknown}>) => {
    setInputVal(e.target.value);
  }

  return (
    <>
      <TextField
        label={label}
        size="small"
        className="w-full"
        focused
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              border: "1px solid #1D7A9B", // Focus border color
              borderRadius: "10px",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2C5079", // Label color when focused
            fontWeight: 'bold',
            fontSize: "16px"
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#83A2AD", // Customize placeholder text color
            opacity: 1, // Ensure full opacity for the placeholder
          },
          fontFamily:"Kanit"
        }}
        placeholder={placeholder}
        onChange={handleChange}
        value={inputVal}
      />
    </>
  );
}
