"use client";
import { convertPathToTitle } from "@/utils/strings";
import { Dot } from "lucide-react";

import { usePathname } from "next/navigation";

export function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="bg-[#F1F5F9] shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[100px]">
          <div className="flex items-center">
            <h1 className="flex items-center gap-2 text-lg font-semibold text-[#194A7A]">
              <span className=" mr-2.5">
                <Dot className="text-[#F3C948] scale-150" />
              </span>
              {convertPathToTitle(pathName)}
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
