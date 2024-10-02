"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function DailyReport() {
  return (
    <div>
      <div>
        <Navbar menu={"Report"} submenu={"Daily Report"} />
      </div>
      <div className="flex h-screen items-center justify-center">
        <Image src={"/NoData.png"} alt="No Data" width={200} height={200} />
      </div>
    </div>
  );
}
