"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/textboxs/input";

interface WorkStatusProp {
    status: any
}

export function WorkStatus({
  status,
}: WorkStatusProp) {

   const [statusDesc, setStatusDesc] = useState("");
   const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (status === 1) {
       setStatusDesc("มาทำงาน");
       setStatusColor("bg-[#86DC89]")
    }
    else if(status === 2){
       setStatusDesc("ขาดงาน");
       setStatusColor("bg-[#F66262]")
    }
    else if(status === 3){
        setStatusDesc("โอที");
        setStatusColor("bg-[#83A2AD]")
     }
     else if(status === 4){
        setStatusDesc("สาย");
        setStatusColor("bg-[#FFB169]")
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