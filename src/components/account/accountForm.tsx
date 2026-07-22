"use client";
import { updateUserAccountInfo } from "@/actions/user.actions";
import { UserAccountFormSchema } from "@/lib/schema";
import { UserFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "../shared/FormInput";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";
type Props = {
  user: User;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export default function AccountForm({ user, setIsEdit }: Props) {
  const router = useRouter();
  const { update, data } = useSession();
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
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(UserAccountFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValues) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const result = await updateUserAccountInfo(data);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    try {
      await update({
        fullName,
        email: data.email,
      });

      setIsEdit(false);
      router.refresh();

      toast.success(result.message);
    } catch {
      toast.error("Profile updated, but session refresh failed");
    }
  };

  const cancelHandler = () => {
    reset();
    setIsEdit(false);
  };
  console.log(data);
  return (
    <Card className="lg:col-span-9 md:col-span-8 col-span-12 bg-card rounded-xl shadow h-fit md:px-7.5 md:py-10 border-none ring-0   ">
      <CardHeader>
        <CardTitle className="md:text-3xl text-xl ">
          Personal Information
        </CardTitle>
        <CardDescription>Update your account detials</CardDescription>
      </CardHeader>
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
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                control={control}
                name="email"
                placeholder="m@example.com"
                label="Email"
                autoComplete="email"
              />
              <FormInput
                control={control}
                name="phone"
                placeholder="+1 (555) 000-000"
                label="Phone"
                autoComplete="phone"
              />
            </div>
            <FormInput
              control={control}
              name="address"
              placeholder="e.g. 123 Main St, Apt 4B, New York, NY"
              label="Address"
              autoComplete="phone"
            />

            <Field>
              <Button disabled={isSubmitting} className="py-5" type="submit">
                {isSubmitting ? <Spinner /> : "Submit"}
              </Button>
            </Field>
            <Field>
              <Button
                variant="destructive"
                onClick={() => cancelHandler()}
                className="py-5"
                type="button"
              >
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
