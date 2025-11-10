import MonthlyJourneys from "@/components/analytics/MonthlyJourneys";
import AnalyticCard from "@/components/analytics/card";
import FuelsCard from "@/components/analytics/fuel-card";
import JourneyCard from "@/components/analytics/journey-card";
import Notification from "@/components/analytics/notification";
import { notifications } from "@/lib/placeholder-data";
import { BsBusFront } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";

const page = () => {
  return (
    <main className="w-full grid grid-cols-[65%_30%] gap-8 bg-cardBg p-4 py-8">
      <div className="w-full bg-transparent flex flex-col gap-6">
        <div className="w-full flex justify-center items-center gap-6">
          <AnalyticCard
            title={"Vehicles in navigation"}
            description={"All found in 7 districts"}
            icon={
              <BsBusFront
                className="text-emerald-500 bg-smallcards rounded-md p-1 cursor-pointer group-hover:text-white group-hover:bg-slate-10"
                size={23}
              />
            }
            amount={24}
          />
          <AnalyticCard
            title={"Total Drivers"}
            description={"All found in 7 districts"}
            icon={
              <BsBusFront
                className="text-emerald-500 bg-smallcards rounded-md p-1 cursor-pointer group-hover:text-white group-hover:bg-slate-10"
                size={23}
              />
            }
            amount={39}
          />
          <AnalyticCard
            title={"Total vehicles"}
            description={"All found in 7 districts"}
            icon={
              <BsBusFront
                className="text-emerald-500 bg-smallcards rounded-md p-1 cursor-pointer group-hover:text-white group-hover:bg-slate-10"
                size={23}
              />
            }
            amount={12}
          />
        </div>
        <MonthlyJourneys />
      </div>
      <div className="w-full bg-white flex flex-col items-start justify-center gap-8 rounded-md p-3">
        <div className="w-full flex justify-between items-center px-2">
          <div className="flex gap-4 items-center justify-center">
            <div className="flex gap-4 rounded-md p-3 bg-light-grayish relative">
              <IoNotificationsSharp className="text-gray-600 text-base" />
            </div>
            <span className="font-bold">Activities</span>
          </div>
          <span className="text-gray-800 text-sm">Recent notifications</span>
        </div>
        <div className="w-full flex flex-col gap-4 max-h-[27rem] overflow-y-scroll withscrollbar">
          {notifications.map((notification, idx) => {
            return <Notification {...notification} key={idx} />;
          })}
        </div>
      </div>
      <div className="w-full bg-transparent col-span-2 grid grid-cols-[28%_22%_47%] gap-4">
        <JourneyCard />
        <AnalyticCard
          size="big"
          title={"Scheduled journeys"}
          description={"All found in 7 districts"}
          icon={
            <BsBusFront
              className="text-emerald-500 bg-smallcards rounded-md p-1 cursor-pointer"
              size={30}
            />
          }
          amount={39}
          extraStyles="w-full hover:bg-white hover:text-black text-lg flex flex-col gap-2 bg-smallcards"
          textStyles="group-hover:text-muted-foreground text-sm"
          extra="12th oct 2023"
        />
        <FuelsCard />
      </div>
    </main>
  );
};

export default page;
