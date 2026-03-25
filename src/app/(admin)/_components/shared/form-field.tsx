import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select-native";
import { cn } from "../../_lib/cn";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children?: React.ReactNode; // For select options
  rows?: number;
  hint?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  error,
  className,
  children,
  rows,
  hint,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          rows={rows}
        />
      ) : type === "select" ? (
        <Select
          id={name}
          name={name}
          defaultValue={String(defaultValue ?? "")}
          required={required}
        >
          {children}
        </Select>
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
        />
      )}
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
