"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
// import { Doctors } from "@/constants";
import { getAppointment, getFileUrl } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getDoctorsList } from "@/lib/actions/doctors.actions";

const RequestSuccess = ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const [doctorList, setDoctorList] = useState<any>();
  const [appointment, setAppointment] = useState<any>();
  useEffect(() => {
    const getAppointmentFn = async () => {
      const appointmentId = (searchParams?.appointmentId as string) || "";
      const appointment = await getAppointment(appointmentId);
      console.log(appointment);
      setAppointment(appointment);
    };
    const fetchData = async () => {
      const doctorsList: any = await getDoctorsList();
      console.log(doctorsList, doctorsList.documents);
      if (doctorsList && doctorsList?.documents) {
        const modifiedDoctorsList = await Promise.all(
          doctorsList?.documents.map(async (item: any) => {
            const url = await getFileUrl(item.imageId);
            return { ...item, url };
          })
        );
        console.log(modifiedDoctorsList);
        setDoctorList(modifiedDoctorsList);
      }
    };
    getAppointmentFn();
    fetchData();
  }, [searchParams?.appointmentId]);

  const doctor =
    doctorList &&
    doctorList.find(
      (doctor: any) => doctor.name === appointment.primaryPhysician
    );

  return (
    <div className=" flex h-screen max-h-screen md:px-[5%] ">
      <div className="success-img">
        <Link href="/">
          <div className="flex gap-2 items-center justify-center mb-8 h-10 w-fit">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={40}
              width={40}
              alt="logo"
            />
            <span className="text-2xl">MedSlot</span>
          </div>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            unoptimized
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-blue-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.url}
              alt="doctor"
              width={100}
              height={100}
              className="size-6 rounded-full"
            />
            <p className="whitespace-nowrap"> {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <div className="flex justify-center gap-8 items-center">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/home`}>Go back to Home</Link>
          </Button>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
        </div>

        <p className="copyright">© 2024 MedSlot</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
