import React, { type FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AnalyticCard: FC<TAnalyticCardProps> = ({
  title,
  icon,
  description,
  amount,
  size,
  extra,
  extraStyles,
  textStyles,
}) => {
  return (
    <Card
      className={cn(
        "w-full bg-white hover:bg-emerald-500 hover:text-white group shadow-2xl shadow-shadow-500 transition-colors cursor-pointer border-none ring-1 ring-slate-200",
        extraStyles,
      )}
    >
      <CardHeader className="w-full flex flex-row items-center justify-start space-y-0 pb-2 gap-3 whitespace-nowrap">
        {icon}
        <CardTitle
          className={`text-sm font-medium ${size && "text-lg text-emerald-600"}`}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={size && " flex flex-col gap-6"}>
        <div
          className={`text-2xl font-bold ${size && "text-3xl text-emerald-600"}`}
        >
          {amount}
        </div>
        <p
          className={cn(
            "text-xs text-muted-foreground group-hover:text-white",
            textStyles,
          )}
        >
          {description}
        </p>
        {size && <div className="self-end text-gray-800 text-xs">{extra}</div>}
      </CardContent>
    </Card>
  );
};

export default AnalyticCard;
