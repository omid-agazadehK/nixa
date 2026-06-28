import { SignUpFormData } from "@/types";
import { Control, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";

export default function FormInput({
  control,
  name,
  placeholder,
  label,
  autoComplete,
}: {
  control: Control<SignUpFormData>;
  name: keyof SignUpFormData;
  placeholder: string;
  label: string;
  autoComplete: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
