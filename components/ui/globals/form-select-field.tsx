import type { FC } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

const FormFieldSelect: FC<{
  control: any;
  name: string;
  label: string;
  placeholder: string;
  inputStyles?: string;
  options: string[];
}> = ({ control, name, label, placeholder, inputStyles, options }) => {
  return (
    <FormField
      control={control as any}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className={inputStyles}>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  "border-0 border-b rounded-none border-b-emerald-500 text-gray-800 focus-visible:ring-white focus:ring-0 transition-all duration-800 focus:duration-0 hover:border-b-2 pl-0 bg-transparent",
                  inputStyles,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, idx) => {
                return (
                  <SelectItem value={option} key={idx}>
                    {option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldSelect;
