"use client";

import { TextField } from "@mui/material";

export default function LabelTextField({ label, placeholder }: any) {
  return (
    <>
      <TextField
        label={label}
        size="small"
        className="min-w-64"
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
            fontWeight: 'bold'
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#83A2AD", // Customize placeholder text color
            opacity: 1, // Ensure full opacity for the placeholder
          },
          fontFamily:"Kanit"
        }}
        placeholder={placeholder}
      />
    </>
  );
}
