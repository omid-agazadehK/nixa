import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "./profileForm";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default async function ProfileView() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <Card className="lg:col-span-9 md:col-span-8 col-span-12 bg-card rounded-xl shadow h-fit md:px-7.5 md:py-10 border-none ring-0   ">
      <CardHeader>
        <CardTitle className="md:text-3xl text-xl ">Personal Information</CardTitle>
        <CardDescription >Update your profile detials</CardDescription>
      </CardHeader>
      <ProfileForm user={user} />
    </Card>
  );
}
