"use client";
import { User } from "@prisma/client";
import { useState } from "react";
import AccountForm from "./accountForm";
import AccountInfo from "./accountInfo";

export default function AccountView({ user }: { user: User }) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {!isEdit && <AccountInfo setIsEdit={setIsEdit} user={user} />}
      {isEdit && <AccountForm user={user} setIsEdit={setIsEdit} />}
    </>
  );
}
