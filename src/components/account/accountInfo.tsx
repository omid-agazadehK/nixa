import { User } from "@prisma/client";
import { SquarePen } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
type Props = {
  user: User;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};
export default function AccountInfo({ setIsEdit, user }: Props) {
  const { fullName, email, phone, address } = user;
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];
  return (
    <div className="lg:col-span-9 md:col-span-8 col-span-12 bg-card rounded-xl shadow h-fit md:px-7.5 md:py-10 px-4 py-5">
      <div className="flex items-center justify-between mb-10">
        <h1 className="md:text-2xl text-lg font-bold ">Personal Information</h1>
        <Button onClick={() => setIsEdit(true)} className="md:text-base md:px-5 md:h-13">
          <SquarePen className="ml-2" />
          Edit Info
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex md:text-base text-sm items-center justify-between border bg-muted py-3 px-5 rounded-xl">
          <span className="text-muted-foreground shrink-0 mr-2">
            First Name :
          </span>
          <span className="truncate text-left">{firstName || "----"}</span>
        </div>

        <div className="flex md:text-base text-sm items-center justify-between border bg-muted py-3 px-5 rounded-xl">
          <span className="text-muted-foreground shrink-0 mr-2">
            Last Name :
          </span>
          <span className="truncate text-left">{lastName || "----"}</span>
        </div>

        <div className="flex md:text-base text-sm items-center justify-between border bg-muted py-3 px-5 rounded-xl">
          <span className="text-muted-foreground shrink-0 mr-2">Email :</span>
          <span className="truncate text-left">{email || "----"}</span>
        </div>

        <div className="flex md:text-base text-sm items-center justify-between border bg-muted py-3 px-5 rounded-xl">
          <span className="text-muted-foreground shrink-0 mr-2">Phone :</span>
          <span className="truncate text-left">{phone || "----"}</span>
        </div>

        <div className="md:c md:text-baseol text-sm-span-2 flex items-center justify-between border bg-muted py-3 px-5 rounded-xl">
          <span className="text-muted-foreground shrink-0 mr-2">Address :</span>
          <span className="truncate text-left">{address || "----"}</span>
        </div>
      </div>
    </div>
  );
}
