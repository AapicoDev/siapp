"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";

interface DeleteBtnFooterProps {
  onDeleteBtnFooterClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void; // Button click handler
  disable: boolean;
}

export function DeleteBtnFooter({
  onDeleteBtnFooterClick,
  disable
}: DeleteBtnFooterProps) {
  return (
    <Button
      onClick={(event) => {
        //event.stopPropagation(); // Prevent event propagation
        onDeleteBtnFooterClick(event); // Call the click handler passed as prop
      }}
      style={{ marginLeft: "auto", fontWeight: "bold" }}
      className="w-32 h-11 bg-white text-[#F66262] border-[1px] border-[#F66262] hover:text-white hover:bg-[#F66262]"
      disabled={disable}
    >
      Delete
    </Button>
  );
}
