"use client";
import { adminProductSchema } from "@/lib/schema";
import { AdminProductFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Product } from "@prisma/client";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import FormInput from "./ui/FormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";

type Props = {
  categories: Category[];
  product?: Product;
  onSubmit: (
    data: AdminProductFormType,
  ) => Promise<{ success: boolean; message: string }>;
  onSuccess?: () => void;
};


export default function AdminProductForm({
  categories,
  product,
  onSubmit,
}: Props) {
  const isEdit = !!product;

  console.log(product);
  const {
    formState: { isSubmitting },
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(adminProductSchema),
    mode: "onBlur",
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? "",
      stock: product?.stock ?? "",
      categoryId: product?.categoryId ?? "",
      image: product?.images[0] ?? "https://picsum.photos/seed/chair1/600/600",
      description: product?.description ?? "",
    },
  });

  const handleFormSubmit = async (data: AdminProductFormType) => {
    const result = await onSubmit(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    reset();
  };
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="md:text-3xl text-xl font-fraunces">
          {isEdit ? "Edit Product" : "Create New Product"}
        </CardTitle>
        <CardDescription className="sm:text-base text-xs">
          {isEdit
            ? "Update the product details below."
            : "Fill in the details to add a new product."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup className="grid grid-cols-12">
            <div className="col-span-12 flex flex-col gap-2 items-start">
              <FormInput
                control={control}
                className="*:text-xs *:md:text-base *:sm:text-sm"
                name="name"
                placeholder="Product"
                label="Product Name"
                autoComplete="off"
              />
            </div>
            <div className="col-span-12 flex  gap-5 items-start">
              <FormInput
                control={control}
                className="*:text-xs *:md:text-base *:sm:text-sm"
                name="price"
                placeholder="price"
                label="Price"
                autoComplete="off"
                type="number"
              />
              <FormInput
                control={control}
                className="*:text-xs *:md:text-base *:sm:text-sm"
                name="stock"
                placeholder="stock"
                label="stock"
                autoComplete="off"
                type="number"
              />
            </div>
            <Controller
              name="categoryId"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-6 flex flex-col w-full gap-2 items-start *:text-xs *:md:text-base *:sm:text-sm"
                >
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <div className="col-span-12 flex flex-col gap-2 items-start">
              <FormInput
                control={control}
                className="*:text-xs *:md:text-base *:sm:text-sm"
                name="image"
                placeholder="image"
                label="image"
                autoComplete="off"
                type="url"
              />
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="col-span-12 flex flex-col gap-2 items-start *:text-xs *:md:text-base *:sm:text-sm">
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  ></Textarea>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field className="col-span-12">
              <Button type="submit" disabled={isSubmitting} className="py-5">
                {isSubmitting ? (
                  <Spinner />
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Create Product"
                )}
              </Button>
              {isEdit && (
                <Button type="button" variant="outline" className="py-5" asChild>
                  <Link href="/admin/products">Cancel</Link>
                </Button>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
