import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ShoppingBag, Users } from "lucide-react";

const values = [
  {
    icon: ShoppingBag,
    title: "Quality Products",
    description:
      "We carefully select products to provide a reliable shopping experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Your shopping experience is protected with modern and secure solutions.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "We always aim to create a simple and enjoyable experience.",
  },
];
export default function AboutView() {
  return (
    <div className="container mx-auto space-y-20 px-4 py-16">
      <section className="mx-auto max-w-3xl space-y-6 text-center">
        <Badge variant="secondary">About NIXA</Badge>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight md:text-6xl">
          Modern shopping experience
          <span className="text-primary"> made simple</span>
        </h1>

        <p className="text-muted-foreground md:text-lg">
          NIXA is a modern e-commerce platform designed to provide a smooth and
          enjoyable shopping experience with quality products and reliable
          service.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Who We Are</h2>

            <p className="text-muted-foreground leading-7">
              NIXA connects customers with carefully selected products through a
              clean and user-friendly platform. From browsing products to
              completing orders, we focus on making every step simple.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Our Mission</h2>

            <p className="text-muted-foreground leading-7">
              Our mission is to combine modern technology and thoughtful design
              to create a better online shopping experience.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Why Choose NIXA?</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title}>
                <CardContent className="space-y-4 p-6">
                  <Icon className="size-8 text-primary" />

                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          ["10K+", "Products"],
          ["5K+", "Customers"],
          ["99%", "Satisfaction"],
        ].map(([number, label]) => (
          <Card key={label}>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold">{number}</p>

              <p className="text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
