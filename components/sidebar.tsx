/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { links } from "@/lib/ui-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
  const pathname = usePathname()
  const { logout } = useAuth();

  return (
    <aside className="w-[15%] h-screen flex flex-col items-center justify-between shadow-3xl">
      <div className="w-[90%] h-fit flex justify-between items-center border-b border-b-emerald-100 py-4 mr-2 self-end">
        <div className="w-28 h-[3rem] relative">
          <Image src={"/logo.svg"} alt="logo image" fill priority />
        </div>
        <ChevronLeft
          className="text-emerald-500 bg-smallcards rounded-md p-1 cursor-pointer"
          size={23}
        />
      </div>
      <div className="w-full flex flex-col gap-2 py-6">
        {links.slice(0, 4).map((link, idx) => {
          const isActive = link.to === pathname;
          return (
            <Link
              href={link.to}
              className={`flex items-center justify-start gap-4 p-3 px-4 text-sm transition-colors cursor-pointer hover:bg-smallcards relative hover:text-emerald-700 ${
                isActive
                  ? "text-emerald-500 hover:text-emerald-500 after:h-full after:w-[0.1rem] after:right-0 after:absolute after:bg-emerald-500 bg-smallcards"
                  : "text-gray-700"
              }`}
              key={idx}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="">{link.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="w-full h-full flex flex-col justify-end gap-2 py-6">
        {links.slice(4).map((link, idx) => {
          const isActive = link.to === pathname;
          return (
            <Link
              href={link.to}
              key={idx + 1}
              className={`flex items-center justify-start gap-4 p-3 px-4 text-sm transition-colors cursor-pointer hover:bg-smallcards relative hover:text-emerald-700 ${
                isActive
                  ? "text-emerald-500 hover:text-emerald-500 after:h-full after:w-[0.1rem] after:right-0 after:absolute after:bg-emerald-500 bg-smallcards"
                  : "text-gray-700"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="">{link.label}</span>
            </Link>
          );
        })}
        <button
          className={`flex items-center justify-start gap-4 p-3 px-4 text-sm transition-colors cursor-pointer border hover:border-emerald-500 relative hover:text-emerald-500 rounded-full text-gray-700 border-white`}
          onClick={() => logout()}
        >
          <span className="text-lg">
            <MdLogout />
          </span>
          <span className="">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
