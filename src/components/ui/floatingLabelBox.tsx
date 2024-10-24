import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface FloatingLabelBoxProps {
    field: React.ReactNode;
    label: any;
    labelAlign?: any;
}

const FloatingLabelBox = ({field, label, labelAlign="center"}: FloatingLabelBoxProps) => {

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "40px",
        //padding: "5px",
        border: "1px solid",
        borderColor: "#1D7A9B", // Focus border color
        borderRadius: "10px",
      }}
    >
      {/* Floating Label */}
      <Typography
        sx={{
          position: "absolute",
          left: `${labelAlign === "center" ? `40%` : '10%'}`,
          marginTop: "16px",
          transform: "translateY(-130%)",
          fontSize: "14px",
          color: "#2C5079",
          fontWeight: "bold",
          backgroundColor: "#FFF",
          paddingX: "0.25rem"
        }}
      >
        {label}
      </Typography>
      <Box className="h-fit pt-[1px] px-1 w-full flex justify-between">
      {field}
      </Box>
    </Box>
  );
};

export default FloatingLabelBox;
