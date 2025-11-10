import React from "react";
import { ImUserPlus } from "react-icons/im";
import { Card, CardContent } from "../ui/card";
import { DialogTrigger } from "../ui/dialog";

const AddMember = () => {
  return (
    <DialogTrigger asChild>
      <Card className="w-full bg-smallcards shadow-2xl shadow-shadow-500 transition-all duration-300 cursor-pointer border-none ring-1 ring-slate-300 hover:shadow-3xl hover:shadow-shadow-400 hover:ring-slate-400 grid place-items-center">
        <CardContent className="w-full py-0 flex flex-col items-center justify-center gap-3 text-xl text-emerald-600 font-medium">
          <ImUserPlus className="text-5xl" />
          <span className="font-normal">New Member</span>
        </CardContent>
      </Card>
    </DialogTrigger>
  );
};

export default AddMember;
