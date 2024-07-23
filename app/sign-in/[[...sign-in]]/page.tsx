import Logo from "@/components/reusable/Logo";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container h-screen flex flex-col justify-center items-center p-4 gap-4">
      <Logo />
      <SignIn />
    </div>
  );
}
