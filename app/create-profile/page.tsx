"use client";
import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import { getUser, getUserByEmail } from "@/lib/actions/patient.actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(user);
  const router = useRouter();
  const [loaderState, setLoaderState] = useState(true);
  useEffect(() => {
    const getUserFn = async () => {
      if (user) {
        const email = user?.primaryEmailAddress?.emailAddress || "";
        const userByEmail: any = await getUserByEmail(email);
        console.log(userByEmail);
        if (userByEmail.length > 0) {
          router.push(`/patients/${userByEmail[0]?.$id}/register`);
        } else {
          setLoaderState(false);
        }
      } else {
        router.push(`/`);
      }
    };
    getUserFn();
  }, [user]);

  return (
    <>
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
        <div className="flex h-screen max-h-screen">
          {isAdmin && <PasskeyModal />}

          <section className="remove-scrollbar container my-auto h-full">
            <div className="sub-container max-w-[496px]">
              <div className="flex gap-2 items-center justify-center mb-8 h-10 w-fit">
                <Image
                  src="/assets/icons/logo-icon.svg"
                  height={40}
                  width={40}
                  alt="logo"
                />
                <span className="text-2xl">MedSlot</span>
              </div>
              <PatientForm />

              <div className="text-14-regular mt-10 pb-10 flex justify-between">
                <p className="justify-items-end text-dark-600 cl:text-left">
                  © 2024 MedSlot
                </p>
                <Link className="text-blue-500" href="/?admin=true">
                  Admin
                </Link>
              </div>
            </div>
          </section>
          <Image
            src="/assets/images/onboarding-img.png"
            height={1000}
            width={1000}
            alt="banner"
            className="side-img max-w-[50%] h-full"
          />
        </div>
      )}
    </>
  );
};

export default Home;
