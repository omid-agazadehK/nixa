import ProfileNavItem from "@/components/layout/main/profileNavItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className="grid grid-cols-12 gap-5 ">
        <div className="lg:col-span-3 md:col-span-4 col-span-12 relative overflow-hidden bg-card h-fit rounded-xl shadow  py-4 px-2">
          <div className="bg-linear-to-tr from-violet-400  to-purple-700 absolute  inset-0 top-0 w-full h-30"></div>

          <div className="flex flex-col gap-1 items-center justify-center mt-14">
            <Avatar className="size-25 bg-white p-1">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Omid&glassesProbability=100"
                alt="Profile image"
              />
              <AvatarFallback>Profile image</AvatarFallback>
            </Avatar>
            <h5 className="text-xl font-semibold">Omid Agazadeh</h5>
            <span className="text-muted-foreground text-sm">
              dimo.steamre@gmail.com
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 mt-10 justify-center w-full *:w-full *:h-11">
            <ProfileNavItem />

            <Separator />
            <Button
              variant="destructive"
              className="cursor-pointer px-4 text-base font-medium justify-start gap-2"
              size={"icon"}
            >
              <LogOut />
              LogOut
            </Button>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
