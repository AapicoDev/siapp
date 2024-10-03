"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/buttons/button";

interface DeleteButtonProps {
    onDeleteBtnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Button click handler
    disable: boolean;
  }

export function DeleteButton({ onDeleteBtnClick, disable }: DeleteButtonProps) {

  return (
      <Button
        onClick={(event) => {
            //event.stopPropagation();
            onDeleteBtnClick(event); // Call the click handler passed as prop
          }}
        style={{ marginLeft: "auto", fontWeight: "bold" }}
        className="mr-3 w-48 bg-[#F66262] hover:text-[#00336C] hover:bg-[#FFD0D0] disabled:bg-[#83A2AD]"
        disabled={disable}
      >Delete
      </Button>
  );
}
