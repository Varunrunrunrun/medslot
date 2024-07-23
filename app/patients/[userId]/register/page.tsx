import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);
  console.log(patient);

  if (patient) redirect(`/patients/${userId}/home`);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container h-full">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="flex gap-2 items-center justify-center mb-8 h-10 w-fit">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={40}
              width={40}
              alt="logo"
            />
            <span className="text-2xl">MedSlot</span>
          </div>
          <RegisterForm user={user} />

          <p className="justify-items-end text-dark-600 cl:text-left py-10">
            © 2024 MedSlot
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="banner"
        className="side-img max-w-[390px] h-full"
      />
    </div>
  );
};

export default Register;
