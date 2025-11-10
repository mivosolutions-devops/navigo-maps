import { type FC } from "react";
import Image from "next/image";
import { BiMenuAltRight } from "react-icons/bi";
import Member from "../ui/members/member-global";

const TeamMember: FC<TeamMember> = ({ id, imgUrl, name, role }) => {
  return (
    <Member
      header={
        <>
          <BiMenuAltRight className="self-end text-lg" />
          <div className="w-[4.5rem] h-[4.5rem] rounded-full overflow-clip relative border-4 border-gray-300">
            <Image src={imgUrl} alt="team member image" fill />
          </div>
        </>
      }
      content={
        <>
          <span className="text-gray-700 text-base font-normal">{name}</span>
          <span className="text-emerald-500">{role}</span>
        </>
      }
    />
  );
};

export default TeamMember;
