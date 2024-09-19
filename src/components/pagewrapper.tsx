"use-client";

import { ReactNode } from "react";

export default function PageWrapper({children} : {children: ReactNode}) {
    return <div className="bg-[#EBF4F6] w-full">{children}</div>;
}