import { forwardRef, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { cn } from "@/lib/utils";

const FormFile = forwardRef<HTMLInputElement, CustomFormFieldProps>(
  ({ control, name, label, placeholder, inputStyles, wrapperStyles }, ref) => {
    const [value, setValue] = useState("");

    return (
      <FormField
        control={control as any}
        name={name}
        render={({ field }) => (
          <FormItem className={cn(`w-full space-y-0 hidden`, wrapperStyles)}>
            <FormLabel className={inputStyles}>{label}</FormLabel>
            <FormControl>
              <Input
                accept=".jpg, .jpeg, .png"
                {...field}
                type="file"
                placeholder={placeholder}
                className={inputStyles}
                ref={ref}
                multiple={false}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  field.onChange(e.target.files && e.target.files[0]);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
);

FormFile.displayName = "FormFile";

export default FormFile;
