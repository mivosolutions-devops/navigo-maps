import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { AiFillCarryOut } from "react-icons/ai";

const JourneyCard = () => {
  return (
    <Card className="w-full bg-white group shadow-2xl shadow-shadow-500 transition-colors cursor-pointer border-none ring-1 ring-slate-200">
      <CardHeader className="w-full flex flex-row items-center justify-start space-y-0 pb-2 gap-3">
        <CardTitle className="text-base font-bold">
          Journey Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col text-xs">
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <div className="w-full flex justify-start items-center gap-2">
            <AiFillCarryOut className="bg-smallcards text-emerald-500 text-2xl p-1" />
            <span className="font-medium">Successful</span>
          </div>
          <div className="w-full h-3 flex gap-2">
            <div className="w-[80%] h-full bg-emerald-500 rounded-sm"></div>
            <div className="w-[20%] h-full bg-smallcards-green rounded-sm"></div>
          </div>
          <span className="self-end text-emerald-500 font-medium">90%</span>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-4">
          <div className="w-full flex justify-start items-center gap-2">
            <AiFillCarryOut className="bg-smallcards text-orange-500 text-2xl p-1" />
            <span className="font-medium">Unsuccessful</span>
          </div>
          <div className="w-full h-3 flex gap-2">
            <div className="w-[20%] h-full bg-orange-500 rounded-sm"></div>
            <div className="w-[80%] h-full bg-smallcards-orange rounded-sm"></div>
          </div>
          <span className="self-end text-orange-500 font-medium">90%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyCard;
