"use client";
import { getUserByEmail } from "@/lib/actions/patient.actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PateintsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(user);
  const router = useRouter();
  const [loaderState, setLoaderState] = useState(true);
  useEffect(() => {
    const getUserFn = async () => {
      if (!user) {
        // toast.warning("Session expired, please sign in again.");
        router.push(`/`);
      }
      setLoaderState(false);
    };
    getUserFn();
  }, [user]);
  return (
    <div>
      {loaderState ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="flex flex-col gap-2 items-center justify-center mb-8 h-10 w-fit">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={40}
              width={40}
              alt="logo"
            />
            <span className="text-2xl">Loading</span>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default PateintsLayout;
