"use client";
import { StatusBadge } from "@/components/StatusBadge";
// import { Doctors } from "@/constants";
import {
  getAppointmentsByUser,
  getFile,
  getFileUrl,
} from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import More from "@/components/reusable/More";
import { getDoctorsList } from "@/lib/actions/doctors.actions";

const PatientHome = ({ params: { userId } }: SearchParamProps) => {
  const [doctorList, setDoctorList] = useState<any>();
  const [appointments, setAppointments] = useState<any>();
  const [loaderState, setLoaderState] = useState(true);

  useEffect(() => {
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
        setLoaderState(false);
      }
    };
    const getAppointmnet = async () => {
      const appointments = await getAppointmentsByUser(userId);
      setAppointments(appointments);
    };
    getAppointmnet();
    fetchData();
  }, [userId]);
  // const appointments = await getAppointmentsByUser(userId);
  // console.log("apps++++++++++++++++++++++++", appointments);
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
        <div className="flex h-screen relative">
          <section className="container my-auto h-full pb-8">
            <div className="sub-container w-full relative">
              <div className="absolute top-[34px] right-2">
                <More userId={userId} />
              </div>
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
                  Welcome to <span className="text-blue-500">Med Slot</span>
                </h1>
                <p className="text-dark-700">
                  Your ultimate solution for scheduling doctor appointments
                  seamlessly and efficiently.
                </p>
              </section>
              <section className="my-8 w-full flex sm:flex-row flex-col gap-8">
                <div className="w-full">
                  <h1 className="sub-header mb-4">Upcoming Appointments</h1>
                  <ul className="text-dark-700 list-disc pl-5">
                    <li className="my-[6px]">
                      Easily view your upcoming appointments.
                    </li>
                    <li className="my-[6px]">
                      Get reminders and notifications for your scheduled visits.
                    </li>
                    <li className="my-[6px]">
                      Manage or reschedule your appointments with a single
                      click.
                    </li>
                  </ul>
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-end">
                    <Link
                      className="text-blue-500 p-2 text-sm underline"
                      href={`/patients/${userId}/appointments`}
                    >
                      View All
                    </Link>
                  </div>
                  <div className="flex md:flex-row flex-col  w-full gap-4">
                    {appointments &&
                      appointments.slice(0, 2).map((item: any) => (
                        <div
                          className="flex flex-col w-full h-fit rounded-md bg-dark-500 py-2 px-4 gap-4"
                          key={item}
                        >
                          <div className="w-full flex gap-[4px] justify-between items-center">
                            <span className="text-[12px]">
                              {" "}
                              {formatDateTime(item.schedule).dateNum}
                            </span>
                            <StatusBadge status={item.status} />
                          </div>
                          <div className="w-full max-w-[200px] text-[20px] text-ellipsis overflow-hidden whitespace-nowrap">
                            {item.primaryPhysician}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </section>

              {/* doctos section */}
              <section className="my-8 w-full flex md:flex-row-reverse flex-col gap-8">
                <div className="w-full">
                  <h1 className="sub-header mb-4">Doctors</h1>
                  <ul className="text-dark-700 list-disc pl-5">
                    <li className="my-[6px]">
                      Browse through our extensive list of specialists.
                    </li>
                    <li className="my-[6px]">
                      View detailed profiles including expertise, availability,
                      and patient reviews.
                    </li>
                    <li className="my-[6px]">
                      Book an appointment directly from the doctor’s profile.
                    </li>
                  </ul>
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-end">
                    <Link
                      className="text-blue-500 p-2 text-sm underline"
                      href={`/patients/${userId}/doctors`}
                    >
                      View All
                    </Link>
                  </div>
                  <div className="flex flex-row  rounded-md w-full flex-wrap h-auto p-[12px] gap-4 bg-dark-500">
                    {doctorList &&
                      doctorList.slice(0, 6).map((item: any) => (
                        <div
                          key={item}
                          className="w-fit h-[30px] rounded-3xl flex justify-start p-[4px] gap-[8px] items-center bg-slate-100"
                        >
                          <Image
                            src={item.url}
                            width={1000}
                            height={1000}
                            className="h-full w-auto border-slate-700 border-2 rounded-full"
                            alt="doctor"
                          />
                          <span className="text-black text-left text-[12px]">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    <span className="font-semibold text-white">
                      and many more...
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PatientHome;
