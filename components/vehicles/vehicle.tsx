import { type FC } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import Member from "../ui/members/member-global";
import { CircleEllipsis } from "lucide-react";
import Image from "next/image";
import { BsFillEvStationFill } from "react-icons/bs";
import { TbBus } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdArrowDropup } from "react-icons/io";

const Vehicle: FC<Vehicle> = ({
  plateNumber,
  type,
  currentLocation,
  destination,
  source,
}) => {
  return (
    <Member
      header={
        <>
          <BiMenuAltRight className="self-end text-lg" />
          <span className="text-gray-700 text-xl font-normal uppercase">
            {plateNumber}
          </span>
          <span className="text-emerald-500 uppercase">{type}</span>
        </>
      }
      content={
        <>
          <div className="w-full grid grid-cols-4 items-center gap-x-4 gap-y-1">
            <div className="flex flex-col items-center justify-center gap-2 text-xs">
              <span className="text-cyan-400">{source}</span>
              <div className="w-3 h-3 rounded-full overflow-clip relative">
                <Image src="/vcle_source.svg" alt="team member image" fill />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-xs text-yellow-400 ">
              <span>Gas</span>
              <BsFillEvStationFill className="text-sm" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-xs relative text-slate-950">
              <span>{currentLocation}</span>
              <TbBus className="text-sm" />
              <IoMdArrowDropup className="text-lg absolute -bottom-5" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-xs text-emerald-600">
              <span className="">{destination}</span>
              <FaLocationDot className=" text-sm" />
            </div>
            <div className="w-[85%] border-b border-gray-800 border-dashed border-spacing-80 col-span-4 justify-self-center"></div>
          </div>
        </>
      }
    />
  );
};

export default Vehicle;
