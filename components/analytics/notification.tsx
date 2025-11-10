import Image from "next/image";
import React, { type FC } from "react";
import { BsFillEvStationFill } from "react-icons/bs";
import { TbBus } from "react-icons/tb";
import { GoAlertFill } from "react-icons/go";
import { AiFillCarryOut } from "react-icons/ai";
import { trimText } from "@/lib/utils";

const Notification: FC<TNotificationProps> = ({
  user,
  message,
  sentAt,
  status,
}) => {
  return (
    <div className="w-full flex items-center justify-start gap-3 px-3 text-xs border-b border-b-gray-200 py-3 cursor-pointer hover:bg-smallcards transition-all duration-500 rounded-md">
      <div className="w-[4rem] h-[2.5rem] rounded-lg overflow-clip relative">
        <Image src={"https://picsum.photos/200"} alt="your image" fill />
      </div>
      <div className="flex w-full font-medium flex-col items-start justify-center whitespace-nowrap">
        <span className="font-normal">{user}</span>
        <div
          className={`${status === "started" ? "text-emerald-500" : status === "stopped" ? "text-yellow-500" : status === "got-issues" ? "text-pink-500" : "text-blue-500"} font-medium flex gap-2 py-1`}
        >
          {status === "started" && <TbBus />}
          {status === "stopped" && <BsFillEvStationFill />}
          {status === "got-issues" && <GoAlertFill />}
          {status === "arrived" && <AiFillCarryOut />}
          <span className="relative">{trimText(message)}</span>
        </div>
      </div>
      <span>{sentAt}</span>
    </div>
  );
};

export default Notification;
