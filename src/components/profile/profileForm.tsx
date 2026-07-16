"use client";
import { updateUserProfile } from "@/actions/user.actions";
import { UserProfileFormSchema } from "@/lib/schema";
import { UserFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "../shared/FormInput";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Field, FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";
type Props = {
  user: User;
};

export default function ProfileForm({ user }: Props) {
  const { fullName, email, address, phone } = user;
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];
  const defaultValues = {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    email: email ?? "",
    address: address ?? "",
    phone: phone ?? "",
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(UserProfileFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValues) => {
    const result = await updateUserProfile(data);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
  };
  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                control={control}
                name="firstName"
                placeholder=""
                label="FirstName"
                autoComplete="given-name"
              />
              <FormInput
                control={control}
                name="lastName"
                placeholder=""
                label="LastName"
                autoComplete="family-name"
              />
            </div>
            <FormInput
              control={control}
              name="email"
              placeholder="m@example.com"
              label="Email"
              autoComplete="email"
            />
            <FormInput
              control={control}
              name="address"
              placeholder="e.g. 123 Main St, Apt 4B, New York, NY"
              label="Address"
              autoComplete="phone"
            />
            <FormInput
              control={control}
              name="phone"
              placeholder="+1 (555) 000-000"
              label="Phone"
              autoComplete="phone"
            />

            <Field>
              <Button disabled={isSubmitting} className="py-5" type="submit">
                {isSubmitting ? <Spinner /> : "Submit"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </>
  );
}
