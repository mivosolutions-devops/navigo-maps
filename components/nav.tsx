"use client";

import React, { Suspense, useEffect } from "react";
import ModeToggle from "./ui/mode-toggle";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { IoNotificationsSharp } from "react-icons/io5";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Skeleton } from "./ui/skeleton";
import { FaCircleUser } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Nav = () => {
  const { fetchUserProfile, user } = useCurrentUser();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <nav className="w-full flex items-center justify-between p-[1.12rem] border-b border-gray-200 ">
      <ModeToggle />
      <div className="w-[40%] relative flex  ">
        <CiSearch className="absolute self-center ml-4 text-gray-800" />
        <Input
          type="text"
          className="px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1"
          placeholder="search"
        />
      </div>
      <div className="w-fit flex items-center justify-center gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="w-fit flex items-center justify-center gap-2 bg-light-grayish px-4 rounded-full">
              <div className="w-5 h-10 relative">
                <Image src={"/flag.svg"} alt="logo image" fill />
              </div>
              <span className="text-xs uppercase font-medium">en</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-3xl px-0 mx-0">
            <DropdownMenuLabel className="text-gray-600 text-xs">
              select language
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-white w-full">
              <div className="w-full flex items-center justify-center gap-2 hover:bg-light-grayish">
                <div className="w-5 h-10 relative">
                  <Image src={"/flag.svg"} alt="logo image" fill />
                </div>
                <span className="text-xs uppercase font-medium">en</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-4 rounded-full p-3 bg-light-grayish relative before:absolute before:w-3 before:h-3 before:bg-emerald-500 before:right-1 before:top-0 before:rounded-full before:text-xs">
          <IoNotificationsSharp className="text-gray-600 text-base" />
        </div>
        <div className="w-full flex items-center justify-start gap-3">
          <Suspense
            fallback={
              <>
                <Skeleton className="w-[4rem] h-[2.5rem] rounded-full overflow-clip relative" />
                <div className="flex w-full font-medium flex-col items-start justify-center text-xs whitespace-nowrap">
                  <Skeleton className="w-8" />
                  <Skeleton className="w-8" />
                </div>
              </>
            }
          >
            <Avatar className="w-[3rem] h-[3rem]">
              <AvatarImage src={user.profilePicture} alt="your profile image" />
              <AvatarFallback>
                <FaCircleUser className="w-full h-full text-gray-300" />
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full font-medium flex-col items-start justify-center text-xs whitespace-nowrap">
              <span className="font-normal">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-emerald-500">Impala Express</span>
            </div>
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
