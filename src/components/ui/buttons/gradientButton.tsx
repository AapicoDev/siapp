"use client";

import * as React from "react";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Input } from "@/components/ui/textboxs/input";
import { Button } from "@/components/ui/buttons/button";

interface GradientButtonProps {
  onBtnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Button click handler
  content: any;
}

export function GradientButton({ onBtnClick,content }: GradientButtonProps) {
  return (
    <Button
      onClick={(event) => {
        event.stopPropagation(); // Prevent event propagation
        onBtnClick(event);
      }}
      style={{ marginLeft: "auto", fontWeight: "bold" }}
      className="w-48 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#4C9BF5] hover:to-[#D8EAFF] 
                 hover:text-[#00336C] disabled:bg-[#83A2AD]"
    >
      {content}
    </Button>
  );
}
