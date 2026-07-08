"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import FormInput from "./ui/FormInput";

export default function CheckoutpView() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onBlur",
  });
  return (
    <section>
      <Card className="w-full sm:max-w-md">
          <form>
        <CardHeader>
          <CardTitle className="text-3xl font-fraunces">Checkout</CardTitle>
          <CardDescription>Contact Information</CardDescription>
        </CardHeader>
        <CardContent>
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
                <Button className="py-5" type="submit">
                  سییس
                </Button>
              </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter></CardFooter>
          </form>
      </Card>
    </section>
  );
}
