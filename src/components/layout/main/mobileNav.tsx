import { auth } from "@/auth";
import { mobileNavRoutes } from "@/lib/constants";
import MobileNavLink from "./mobileNavLink";
import MoreSheet from "./moreSheet";
import ProfileSheet from "./profileSheet";

export default async function MobileNav() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-background border-border fixed bottom-0 z-50 w-full border-t sm:hidden">
      <div className="grid w-full grid-cols-5 place-items-center p-0.5 gap-x-1 text-xs font-light">
        {mobileNavRoutes.map((item) => {
          return <MobileNavLink key={item.href} item={item} />;
        })}
        <MoreSheet />
        {user && <ProfileSheet user={user} />}
      </div>
    </div>
  );
}
