"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";

interface SubmitBtnProps {
    onSubmitBtnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Button click handler
  }

export function SubmitBtn({ onSubmitBtnClick }: SubmitBtnProps) {

  return (
      <Button
        onClick={(event) => {
            event.stopPropagation(); // Prevent event propagation
            onSubmitBtnClick(event); // Call the click handler passed as prop
          }}
        className="w-28 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6] 
                 disabled:bg-[#83A2AD]"
      >
        Submit
      </Button>
  );
}
