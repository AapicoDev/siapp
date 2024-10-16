"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/textboxs/input";

interface ActiveStatusBoxProp {
    status: any
}

export function ActiveStatusBox({
  status,
}: ActiveStatusBoxProp) {

   const [statusDesc, setStatusDesc] = useState("");
   const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (status === 1) {
       setStatusDesc("Active");
       setStatusColor("bg-[#86DC89]")
    }
    else if(status === 0){
       setStatusDesc("Inactive");
       setStatusColor("bg-[#83A2AD]")
    }
  });
  

  return (
    <>
      <Box className={`justify-between flex p-1 ${statusColor} w-[120px] rounded-lg`}>
        <Box className="w-full text-center">
          <Typography className="py-1 px-2 text-white">
            {statusDesc}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
