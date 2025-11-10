import { MdDashboard } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { BsBusFront } from "react-icons/bs";
import { FaMap } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";

export const links = [
  {
    icon: <MdDashboard />,
    label: "Dashboard",
    to: "/",
  },
  {
    icon: <RiTeamFill />,
    label: "My Team",
    to: "/myteam",
  },
  {
    icon: <BsBusFront />,
    label: "Vehicles",
    to: "/vehicles",
  },
  // {
  //   icon: <FaMap />,
  //   label: "Map",
  //   to: "/map",
  // },
  {
    icon: <VscAccount />,
    label: "Account",
    to: "/account",
  },
  {
    icon: <IoSettingsOutline />,
    label: "Settings",
    to: "/settings",
  },
  {
    icon: <BiHelpCircle />,
    label: "Help center",
    to: "/helpcenter",
  },
];
