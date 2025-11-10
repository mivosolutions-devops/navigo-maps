import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";

const FuelsCard = () => {
  return (
    <Card className="w-full bg-transparent hover:bg-background hover:text-white group shadow-2xl shadow-shadow-500 transition-colors cursor-pointer border-none ring-1 ring-slate-200 flex flex-col justify-start pb-2 gap-10">
      <CardHeader className="w-full flex flex-row items-center justify-start space-y-0 gap-3">
        <CardTitle className="text-base font-medium text-gray-800 flex gap-2 items-center ">
          <BsFillFuelPumpDieselFill />
          Fuel status
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex gap-4 ">
        <SingleFCard price={1600} quantity="1 Litre of Gasoil" />
        <SingleFCard price={2327} quantity="1 Litre of Gasoil" />
        <SingleFCard price={6000} quantity="1 battery fully charged" />
      </CardContent>
    </Card>
  );
};

export default FuelsCard;

const SingleFCard = ({
  price,
  quantity,
}: {
  price: number;
  quantity: string;
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-3 p-3 bg-white rounded-lg text-yyyyyxl text-slate-900 whitespace-nowrap ring-1 ring-slate-200">
      <span>{price} rwf</span>
      <span className="text-sm">{quantity}</span>
    </div>
  );
};
