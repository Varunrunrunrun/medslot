import { AppointmentForm } from "@/components/forms/AppointmentForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const NewAppointment = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  //   const user = await getUser(userId);
  const doctorId = (searchParams?.doctorId as string) || "";
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen relative">
      <div className="cursor-pointer px-4 py-2 bg-blue-500 text-white absolute top-[34px] right-6 rounded z-10 text-[12px]">
        Go to Profile
      </div>
      <section className="remove-scrollbar container h-full">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex gap-2 items-center justify-center mb-8 h-10 w-fit">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={40}
              width={40}
              alt="logo"
            />
            <span className="text-2xl">MedSlot {doctorId}</span>
          </div>
          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
            doctorId={doctorId !== "" ? doctorId : undefined}
          />

          <p className="justify-items-end text-dark-600 cl:text-left py-10">
            © 2024 MedSlot
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="banner"
        className="side-img max-w-[390px] h-full bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
