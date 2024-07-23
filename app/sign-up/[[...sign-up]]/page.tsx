import Logo from "@/components/reusable/Logo";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container h-screen p-4 flex flex-col justify-center items-center gap-4">
      <Logo />
      <SignUp />
    </div>
  );
}
