"use client";

import { logIn } from "@/actions/auth.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { loginSchema } from "@/lib/schema";
import { LoginForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, UseFormProps } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "../shared/FormInput";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
const formOptions: UseFormProps<LoginForm> = {
  resolver: zodResolver(loginSchema),
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
  },
};
export default function LoginView() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginForm>(formOptions);

  const onSubmit = async (formData: LoginForm) => {
    try {
      
    } catch (error) {
      
    }
    const res = await logIn(formData);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success("Login successful. Welcome back!");
  };
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl font-fraunces">Welcome back</CardTitle>
        <CardDescription>
          Enter your email & password to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
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
              autoComplete="current-password"
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
          New to Nixa sho?{" "}
          <Link href="/signup" className="underline text-primary/80">
            Create an account{" "}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
