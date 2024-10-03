"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/buttons/button";

interface SearchButtonProps {
    onSearchBtnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Button click handler
  }

export function SearchButton({ onSearchBtnClick }: SearchButtonProps) {

  return (
      <Button
        onClick={(event) => {
            event.stopPropagation(); // Prevent event propagation
            onSearchBtnClick(event); // Call the click handler passed as prop
          }}
        className="w-24 bg-[#37B7C3] hover:bg-[#D9F0EC] hover:text-[#1D7A9B]"
      >
        Search
      </Button>
  );
}
