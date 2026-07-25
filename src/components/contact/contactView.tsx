import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@nixa.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Market Street, New York",
  },
];
export default function ContactView() {
  return (
    <div className="container mx-auto space-y-16 px-4 py-16">
      <section className="mx-auto max-w-2xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact NIXA
        </h1>

        <p className="text-muted-foreground text-lg">
          Have questions about our products or services? We would love to hear
          from you.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Icon className="size-6" />
                </div>

                <h2 className="font-semibold">{item.title}</h2>

                <p className="text-muted-foreground">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold">Send us a message</h2>

            <div className="grid gap-4">
              <Input placeholder="Your name" className="bg-background " />

              <Input placeholder="Email address" className="bg-background " />

              <Textarea
                placeholder="Your message"
                rows={5}
                className="bg-background "
              />

              <Button className="h-11">Send Message</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
