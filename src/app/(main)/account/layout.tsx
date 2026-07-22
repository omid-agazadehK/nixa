import { auth } from "@/auth";
import LogOutButton from "@/components/account/logOutButton";
import AccountNavItem from "@/components/layout/main/accountNavItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  return (
    <section>
      <div className="grid grid-cols-12 gap-5 mt-10">
        <div className="lg:col-span-3 md:col-span-4 col-span-12 relative overflow-hidden bg-card h-fit rounded-xl shadow  py-4 px-2">
          <div className="bg-linear-to-tr from-violet-400  to-purple-700 absolute  inset-0 top-0 w-full h-30"></div>

          <div className="flex flex-col gap-1 items-center justify-center mt-14">
            <Avatar className="size-25 bg-white p-1">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Omid&glassesProbability=100"
                alt="Account image"
              />
              <AvatarFallback>Account image</AvatarFallback>
            </Avatar>
            <h5 className="text-xl font-semibold">{user?.fullName}</h5>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <div className="flex flex-col items-center gap-2 mt-10 justify-center w-full *:w-full *:h-11">
            <AccountNavItem />

            <Separator />
            <LogOutButton />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
