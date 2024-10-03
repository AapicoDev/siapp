"use client";

import * as React from "react";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Input } from "@/components/ui/textboxs/input";
import { Button } from "@/components/ui/buttons/button";

interface ViewButtonProps {
    onViewBtnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Button click handler
    row: any
  }

export function ViewButton({ onViewBtnClick, row }: ViewButtonProps) {

  return (
      <Button
        onClick={(event) => {
            event.stopPropagation();
            onViewBtnClick(row);
          }}
          style={{
            border: "1px solid #37B7C3",
            fontWeight: "bold",
          }}
          className="w-[84px] text-[#37B7C3] bg-white hover:bg-[#37B7C3] hover:text-white"
      >
        View
      </Button>
  );
}
