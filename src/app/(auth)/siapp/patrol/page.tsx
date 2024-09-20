"use client";

import Navbar from "@/components/Navbar";

export default function Patrol() {
  return (
    <div>
      <div>
        <Navbar menu={"SIAPP"} submenu={"Patrol"} />
      </div>
      <div className="flex h-screen items-center justify-center">Patrol</div>
    </div>
  );
}
