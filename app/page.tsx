"use client";
import { PasskeyModal } from "@/components/PasskeyModal";
import Logo from "@/components/reusable/Logo";
import MoreLanding from "@/components/reusable/More.landing";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(user);
  const router = useRouter();
  const [loaderState, setLoaderState] = useState(true);
  useEffect(() => {
    const isLoggedInFn = async () => {
      if (user) {
        router.push(`/create-profile`);
      } else {
        setLoaderState(false);
      }
    };
    isLoggedInFn();
  }, [router, user]);

  const mainBannerRef = useRef<HTMLDivElement | null>(null);
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);
  const step3Ref = useRef<HTMLDivElement | null>(null);

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
        <div className="h-full w-full min-h-screen flex flex-col">
          {isAdmin && <PasskeyModal />}

          <header className="bg-black text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
              {/* Logo */}
              <Logo />
              {/* Navigation Buttons */}
              <div className="flex md:hidden">
                <MoreLanding />
              </div>
              <div className="space-x-4 hidden md:flex">
                {/* <a
                  href="/sign-in"
                  className="text-blue-500 hover:text-blue-400"
                >
                  Sign In
                </a>
                <a
                  href="/sign-up"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
                >
                  Sign Up
                </a> */}
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="bg-blue-500 text-white">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
                <Button className="bg-gold border-silver border-2 text-black">
                  <Link href="/?admin=true">Admin</Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-col items-center justify-center flex-grow text-center p-6">
            <h1 className="text-4xl font-bold text-slate-100 text-left mb-6">
              Welcome to Med Slot
            </h1>
            <p className="text-lg text-slate-100 mb-6">
              The easiest way to schedule your medical appointments with top
              doctors in your area.
            </p>
            <Image
              src="/assets/images/landing-banner-med.jpg"
              alt="Medical Appointments"
              width={10000}
              height={10000}
              className="w-full max-w-lg mb-6 rounded-lg shadow-lg "
              priority
            />
            <p className="text-md text-slate-100">
              Our platform allows you to book appointments with ease and manage
              your schedule effortlessly. Sign up now to get started!
            </p>
            {/* Step-by-Step Guide */}
            <div className="container mx-auto px-4 my-12">
              <h2 className="text-3xl font-bold text-white text-left mb-8">
                How It Works
              </h2>
              <div className="">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-12">
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-4xl font-semibold text-slate-100 text-left mb-4">
                      <span className="text-blue-500"> Step 1:</span> Provide
                      Your Personal Details
                    </h3>
                    <p className="text-slate-100 text-left mb-4">
                      Start by creating your MedSlot account. You’ll need to
                      provide some basic personal information such as your full
                      name, contact details (including your phone number and
                      email address). This information helps us create a profile
                      for you and ensures we can communicate effectively. It
                      also allows us to tailor our services to your specific
                      needs and location.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <Image
                      width={1000}
                      height={1000}
                      src="/assets/landing-page/landing-page-step-1.png"
                      alt="Personal Details Form"
                      className="w-full rounded-lg shadow-lg border-2 border-blue-500"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start md:gap-8 mb-16">
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-4xl font-semibold text-slate-100 text-left mb-4">
                      <span className="text-blue-500"> Step 2:</span> Enter
                      Medical Information
                    </h3>
                    <p className="text-slate-100 text-left mb-4">
                      Once your basic profile is set up, the next step is to
                      provide relevant medical information. This includes
                      details about your medical history, current health
                      conditions, allergies, and any medications you are
                      currently taking. Additionally, you will need to enter
                      more personal details like your insurance information if
                      applicable. This step is crucial for ensuring that our
                      system can offer you the best healthcare providers based
                      on your needs.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 pl-4">
                    <Carousel>
                      <CarouselContent>
                        <CarouselItem>
                          <div className="h-full rounded-lg border-2 border-blue-500">
                            <Image
                              width={1000}
                              height={1000}
                              src="/assets/landing-page/landing-page-step-2-part-1.png"
                              alt="Medical Information Form"
                              className="w-full rounded-lg shadow-lg"
                            />
                          </div>
                        </CarouselItem>
                        <CarouselItem>
                          <div className="h-full rounded-lg border-2 border-blue-500">
                            <Image
                              width={1000}
                              height={1000}
                              src="/assets/landing-page/landing-page-step-2-part-2.png"
                              alt="Medical Information Form"
                              className="w-full rounded-lg shadow-lg"
                            />
                          </div>
                        </CarouselItem>
                        <CarouselItem>
                          <div className="h-full rounded-lg border-2 border-blue-500">
                            <Image
                              width={1000}
                              height={1000}
                              src="/assets/landing-page/landing-page-step-2-part-3.png"
                              alt="Medical Information Form"
                              className="w-full rounded-lg shadow-lg"
                            />
                          </div>
                        </CarouselItem>
                      </CarouselContent>
                      <div className="absolute bottom-[-25px] left-[50px]">
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </Carousel>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="mt-6 flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-12">
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-4xl font-semibold text-slate-100 text-left mb-4">
                      <span className="text-blue-500"> Step 3:</span> Schedule
                      Your First Appointment
                    </h3>
                    <p className="text-slate-100 text-left mb-4">
                      With your profile and medical information complete, you
                      are now ready to schedule your first appointment. You can
                      browse through a list of available doctors and
                      specialists, select the one that best fits your needs, and
                      choose a convenient time for your visit. Our platform
                      allows you to view doctor’s availability in real-time and
                      book an appointment directly through the system. Once
                      scheduled, you’ll receive confirmation and reminders to
                      ensure you don’t miss your appointment.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <Image
                      width={1000}
                      height={1000}
                      src="/assets/landing-page/landing-page-step-3.png"
                      alt="Appointment Scheduling"
                      className="w-full rounded-lg shadow-lg border-2 border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-black text-white py-4 border-t border-slate-300 text-center">
            <p className="text-slate-400 text-sm">
              © 2024 MedSlot. All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  );
};

export default Home;
