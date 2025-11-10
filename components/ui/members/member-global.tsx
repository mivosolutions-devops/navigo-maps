import { type FC } from "react";
import { Card, CardHeader, CardContent } from "../card";
import { cn } from "@/lib/utils";

const Member: FC<Member> = ({
  header,
  content,
  headerExtraStyle,
  contentExtraStyle,
  wrapperStyles,
  handleClick,
}) => {
  return (
    <Card
      className={cn(
        "w-full bg-white group shadow-2xl shadow-shadow-500 transition-all duration-300 cursor-pointer border-none ring-1 ring-slate-200 hover:shadow-3xl hover:shadow-shadow-400 hover:ring-slate-300",
        wrapperStyles,
      )}
      onClick={handleClick}
    >
      <CardHeader
        className={cn(
          "w-full flex flex-col items-center justify-start space-y-0 gap-3",
          headerExtraStyle,
        )}
      >
        {header}
      </CardHeader>
      <CardContent
        className={cn(
          "flex flex-col items-center justify-center text-sm font-medium",
          contentExtraStyle,
        )}
      >
        {content}
      </CardContent>
    </Card>
  );
};

export default Member;
