"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/textboxs/input";

interface PatrolStatusProp {
    status: any
}

export function PatrolStatus({
  status,
}: PatrolStatusProp) {

   const [statusDesc, setStatusDesc] = useState("");
   const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (status === "OnTime") {
       setStatusDesc("ตามกำหนด");
       setStatusColor("bg-[#86DC89]")
    }
    else if(status === "Absent"){
       setStatusDesc("ขาดจุด");
       setStatusColor("bg-[#F66262]")
    }
    else if(status === "Cancel"){
        setStatusDesc("ยกเลิก");
        setStatusColor("bg-[#83A2AD]")
     }
     else if(status === "Delay"){
        setStatusDesc("สาย");
        setStatusColor("bg-[#FFB169]")
     }
  });
  

  return (
    <>
      <Box className={`justify-between flex p-1 ${statusColor} w-[120px] rounded-lg`}>
        <Box className="w-full text-center">
          <Typography sx={{py:"0.25rem", px: "0.5rem", color: "white"}}>
            {statusDesc}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
