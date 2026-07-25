import SignUpView from "@/components/auth/signUpView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up",
};
export default function SignUpPage() {
  return <SignUpView />;
}
