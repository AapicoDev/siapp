"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface CheckListStatusProps {
    status: any
}

export function CheckListStatus({
  status,
}: CheckListStatusProps) {

   const [statusDesc, setStatusDesc] = useState("");
   const [statusColor, setStatusColor] = useState("transparent");

   const abnormal = ["ไม่เพียงพอ", "พบ"];
   const normal = ["เพียงพอ", "ไม่พบ"];

  useEffect(() => {
    if (normal.includes(status)) {
       setStatusDesc(status);
       setStatusColor("bg-[#86DC89]")
    }
    else if(abnormal.includes(status)){
       setStatusDesc(status);
       setStatusColor("bg-[#F66262]")
    }
  });
  

  return (
    <>
      <Box className={`justify-between flex p-1 ${statusColor} w-fit rounded-lg`}>
        <Box className="w-full text-center">
          <Typography className="py-1 px-2 text-white text-[12px]">
            {statusDesc}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
