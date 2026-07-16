"use client";

import { signUp } from "@/actions/auth.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { signUpSchema } from "@/lib/schema";
import { SignUpFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm, UseFormProps } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "../ui/FormInput";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const formOptions: UseFormProps<SignUpFormData> = {
  resolver: zodResolver(signUpSchema),
  mode: "onBlur",
  defaultValues: {
    name: "",
    lastName: "",
    email: "",
    password: "",
  },
};
export default function SignUpView() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>(formOptions);

  const onSubmit = async (formData: SignUpFormData) => {
    try {
      const res = await signUp(formData);
      if (res.status === "success") {
        toast.success("Registration was successful.");
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirectTo: "/",
        });
        return;
      }
      toast.error(res.message);
    } catch (error) {
      console.error("SIGNUP_FORM", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl font-fraunces">Join us</CardTitle>
        <CardDescription>
          Enter your details to create an account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                control={control}
                name="name"
                placeholder="First name"
                label="First name"
                autoComplete="given-name"
              />
              <FormInput
                control={control}
                name="lastName"
                placeholder="Last name"
                label="Last name"
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
              name="password"
              placeholder="password"
              label="Password"
              autoComplete="new-password"
              type="password"
            />

            <Field>
              <Button disabled={isSubmitting} className="py-5" type="submit">
                {isSubmitting ? <Spinner /> : "Submit"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <span>
          Already have an account?{" "}
          <Link href="/login" className="underline text-primary/80">
            Log in
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
