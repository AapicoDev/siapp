"use client";

import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <div>
        <Navbar menu={"ASM"} submenu={"Dashboard"} />
      </div>
      <div className="flex h-screen items-center justify-center">Dashboard</div>
    </div>
  );
}
