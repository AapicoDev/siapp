"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";

interface CancelBtnProps {
    onCancelBtnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Button click handler
  }

export function CancelBtn({ onCancelBtnClick }: CancelBtnProps) {

  return (
      <Button
        onClick={(event) => {
            event.stopPropagation(); // Prevent event propagation
            onCancelBtnClick(event); // Call the click handler passed as prop
          }}
        className="w-28 h-11 bg-white text-[#83A2AD] border-[1px] border-[#83A2AD] hover:text-white hover:bg-[#83A2AD]"
      >
        Cancel
      </Button>
  );
}
