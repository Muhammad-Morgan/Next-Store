import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};
const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  placeholder,
}: FormInputProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder || name}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default FormInput;
