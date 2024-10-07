import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Stack Overflow 2.0 | Sign In",
  description: "Sign in to your account",
};

export default function Page() {
  return <SignIn />;
}
