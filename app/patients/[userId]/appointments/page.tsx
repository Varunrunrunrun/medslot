"use client";
import { userColumn } from "@/components/table/userColumn";
import { getAppointmentsByUser } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appwrite.types";
import { DataTable } from "@/components/table/UserTable";

const AppointmentList = ({ params: { userId } }: SearchParamProps) => {
  const [appointments, setAppointments] = useState<any>();

  useEffect(() => {
    const getAppointment = async () => {
      const appointments = await getAppointmentsByUser(userId);
      if (appointments) {
        setAppointments(appointments);
      }
    };
    getAppointment();
  }, [userId]);

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex h-screen relative">
        <div
          onClick={handleGoBack}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white absolute top-[34px] right-20 rounded z-10 text-[12px]"
        >
          Go back to Home
        </div>
        <section className="container my-auto h-full">
          <div className="sub-container w-full">
            <div className="flex gap-2 items-center justify-center mb-8 h-10 w-fit">
              <Image
                src="/assets/icons/logo-icon.svg"
                height={40}
                width={40}
                alt="logo"
              />
              <span className="text-2xl">MedSlot</span>
            </div>
            <section className="mb-8 space-y-4">
              <h1 className="header">
                Your <span className="text-blue-500">Appointments</span>
              </h1>
              <p className="text-dark-700">
                Your can view all your appointments below
              </p>
            </section>
            {appointments && (
              <DataTable columns={userColumn} data={appointments} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AppointmentList;
