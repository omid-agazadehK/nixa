"use client";
import { order } from "@/actions/order.actios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { checkoutSchema } from "@/lib/schema";
import { CheckOutForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "../shared/FormInput";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function CheckoutForm() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
    },
  });
  const submitHandler = async (formData: CheckOutForm) => {
    const res = await order(formData);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  };
  return (
    <Card className="md:col-span-6 order-2 md:order-1 col-span-12 w-full ">
      <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
        <CardHeader>
          <CardTitle className="text-3xl font-fraunces">Checkout</CardTitle>
          <CardDescription>Contact Information</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <FormInput
              control={control}
              name="fullName"
              placeholder="omid agazdeh"
              label="name"
              autoComplete="name"
            />
            <FormInput
              control={control}
              name="address"
              placeholder="Street address, Apartment number, city, Zip code"
              label="address"
              autoComplete="street-address"
              type="text"
            />
            <FormInput
              control={control}
              name="phone"
              placeholder="+98 *** *** ****"
              label="mobile"
              autoComplete="tel"
              type="tel"
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isSubmitting}
            className="py-5 w-full text-base"
            size="lg"
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Spinner /> checking
              </>
            ) : (
              "checkout"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
