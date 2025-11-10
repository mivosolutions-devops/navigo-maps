import type { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { cn } from "@/lib/utils";

const ActionModal: FC<ActionModalProps> = ({
  actionContent,
  description,
  title,
  trigger,
  wrapperStyles,
  open,
  setOpen,
  container,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPortal container={container}>
        <DialogContent className={cn("sm:max-w-md gap-5 p-12", wrapperStyles)}>
          <DialogHeader className="w-full gap-2">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="w-full text-center font-medium">
              {description}
            </DialogDescription>
          </DialogHeader>
          {actionContent}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ActionModal;
