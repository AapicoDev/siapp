"use client";

import { TextField } from "@mui/material";

interface LabelTextFieldProps {
  label: any;
  placeholder: any;
  inputVal: any;
  field: any;
  id: any;
  id2?: any
  handleChangeVal: (id: any, field: any, value: any,) => void;
}

export default function LabelTextField3({ label, placeholder, inputVal, field, id, handleChangeVal }: LabelTextFieldProps) {
  return (
    <>
      <TextField
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
              fontSize: "18px"
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2C5079", // Label color when focused
            fontWeight: 'bold',
            fontSize: "18px"
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#83A2AD", // Customize placeholder text color
            opacity: 1, // Ensure full opacity for the placeholder
            fontSize: "14px"
          },
          fontFamily:"Kanit"
        }}
        placeholder={placeholder}
        onChange={(e) => handleChangeVal(id, field, e.target.value)}
        value={inputVal}
      />
    </>
  );
}
