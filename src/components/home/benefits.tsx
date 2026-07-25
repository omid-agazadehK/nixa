import { Car, Lock, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Quality Furniture",
    description: "Crafted with premium materials built to last for years.",
  },
  {
    icon: Car,
    title: "Fast Delivery",
    description: "Reliable delivery service right to your doorstep.",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    description: "Safe and secure checkout experience.",
  },
];
export default function Benefits() {
  return (
    <section className="mt-20 grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
      {benefits.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title}>
            <CardContent className="flex items-start  p-6 gap-4  text-sm">
              <div className="p-2.5 bg-muted text-muted-foreground rounded-lg">
                <Icon size={20} />
              </div>
              <div className="flex flex-col gap-2 ">
                <h4 className="font-semibold text-black ">{item.title}</h4>
                <p className="text-muted-foreground font-light">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
