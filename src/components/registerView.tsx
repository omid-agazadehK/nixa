"use client";

import { signUp } from "@/actions/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const schema = z.object({
  email: z.string(),
  password: z.string("aloo number"),
  name: z.string(),
  lastName: z.string(),
});
type Schema = z.infer<typeof schema>;

export default function RegisterView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    const res = await signUp(data);
    console.log(res);
  };
  return (
    <section className="grid grid-cols-2 h-screen">
      <div className="relative">
        <Image
          src="/AuthBg.avif"
          height={1000}
          width={1000}
          alt="ss"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 img-overlay"></div>
        <div className="absolute text-primary-foreground bottom-15 left-14 max-w-md">
          <h2 className="font-medium leading-tight text-4xl font-fraunces">
            Furniture that feels like home.
          </h2>
          <p className="text-sm mt-3">
            Handcrafted sofas, tables & chairs designed to make every room
            warmer.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center  gap-x-4">
          <div>
            <label>FirstName</label>
            <Input {...register("name")} />
          </div>
          <div>
            <label>LastName</label>
            <Input {...register("lastName")} />
          </div>
        </div>
        <div>
          <label>Email</label>
          <Input {...register("email")} />
        </div>
        <div>
          <label>password </label>
          <Input {...register("password")} />
        </div>
        {errors.email && <span>This field is required</span>}
        {errors.password && <span>{errors.password?.message}</span>}

        <Button type="submit">sdsdsd</Button>
      </form>
    </section>
  );
}
