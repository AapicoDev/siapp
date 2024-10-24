"use client";

import * as React from "react";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Input } from "@/components/ui/textboxs/input";
import { Button } from "@/components/ui/buttons/button";

interface AddButtonProps {
    content?: any;
    onAddBtnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Button click handler
  }

export function AddButton({ onAddBtnClick, content="+ Add" }: AddButtonProps) {

  return (
      <Button
        // onClick={()=>handleOnClick()}
        onClick={(event) => {
            event.stopPropagation(); // Prevent event propagation
            onAddBtnClick(event); // Call the click handler passed as prop
          }}
        className="w-[84px] bg-[#1D7A9B] hover:bg-[#D9F0EC] hover:text-[#1D7A9B] px-6"
      >
        {content}
      </Button>
  );
}
