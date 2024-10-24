"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";

interface SaveBtnFooterProps {
  disableBtn?:boolean;
  onSaveBtnFooterClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void; // Button click handler
}

export function SaveBtnFooter({
  onSaveBtnFooterClick,disableBtn=false
}: SaveBtnFooterProps) {

  return (
    <Button
      onClick={(event) => {
        //event.stopPropagation(); // Prevent event propagation
        onSaveBtnFooterClick(event); // Call the click handler passed as prop
      }}
      className="w-32 h-11 enabled:bg-gradient-to-r from-[#00336C] to-[#37B7C3] hover:from-[#2BA441] hover:to-[#A7E5A6]
                disabled:bg-[#83A2AD]"
                disabled={disableBtn}
    >
      Save
    </Button>
  );
}
