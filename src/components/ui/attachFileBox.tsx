"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { GoArrowUpRight } from "react-icons/go";

interface AttachFileBoxProp {
  fileName: any;
}

export function AttachFileBox({ fileName }: AttachFileBoxProp) {

  return (
    <>
      <Box className="justify-between flex p-1 bg-white max-w-[220px] border-[1px] border-[#4C9BF5] cursor-pointer rounded-lg">
        <Box className="w-[90%] text-left">
          <Typography className="py-1 px-2 text-[#2C5079]">
            {fileName}
          </Typography>
        </Box>
        <GoArrowUpRight size={24} color="#4C9BF5" style={{ marginTop: 5 }} />
      </Box>
    </>
  );
}
