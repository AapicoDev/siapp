"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

interface LabelTextDisplayBoxProp {
  label?: any;
  text: any;
  textAlign? : string;
}

export function LabelTextDisplayBox({ text, label="", textAlign="center" }: LabelTextDisplayBoxProp) {

  return (
    <>
    {label !== "" &&
      <Typography
        sx={{
          fontSize: "14px",
          paddingBottom: "0.25rem",
          color: "#2C5079",
          fontWeight: "700",
          textAlign: "left",
        }}
      >
        {label}
      </Typography>}
      <Typography
        sx={{
          fontSize: "16px",
          paddingY: "0.4rem",
          bgcolor: "white",
          color: "#2C5079",
          textAlign: {textAlign},
          pl: `${textAlign === "left" ? "1rem" : 0}`,
          border: "1px solid #1D7A9B",
          borderRadius: "10px",
          cursor: "not-allowed"
        }}
      >
        {text === undefined || "" ? "-" : text}
      </Typography>
    </>
  );
}
