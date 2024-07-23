"use client";
import { DoctorsDetailModal } from "@/components/DoctorsDetailModal";
import { Button } from "@/components/ui/button";
import {
  getFile,
  getFileList,
  getFileUrl,
} from "@/lib/actions/appointment.actions";
import { getDoctorsList } from "@/lib/actions/doctors.actions";
import {
  BUCKET_ID,
  ENDPOINT,
  PROJECT_ID,
  storage,
} from "@/lib/appwrite.config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DoctorsPage = ({ params: { userId } }: SearchParamProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  const [doctorList, setDoctorList] = useState<any>();
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
      }
    };
    fetchData();
  }, []);

  // const getFileUrlFn = async (id: any) => {
  //   const url = await getFileUrl(id);
  //   console.log(url);
  //   return url;
  // };
  return (
    <div className="flex min-h-screen relative">
      <div
        onClick={handleGoBack}
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white absolute top-[34px] right-20 rounded z-10 text-[12px]"
      >
        Go back to Home
      </div>
      <section className="container h-full">
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
              Meet the Doctors of{" "}
              <span className="text-blue-500">Med Slot</span>
            </h1>
            <p className="text-dark-700">
              Find the best specialists for your healthcare needs. Browse
              through our list of experienced doctors and choose the one that
              fits your requirements.
            </p>
          </section>
          <section className="my-8 space-y-4 ">
            <h1 className="header text-center text-blue-500">Our Doctors</h1>
          </section>
          <section className="mx-auto md:p-12 p-6 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {doctorList?.map((item: any) => (
              <div
                key={item.$id}
                className="flex flex-col item-center-justify-center gap-2"
              >
                <div className="text-center text-[12px]">{item.name}</div>
                <div className="w-full aspect-square rounded-[12px] border-2 border-blue-500 hover:border-blue-400 relative group">
                  <Image
                    src={item.url}
                    width={1000}
                    height={1000}
                    alt="doctor"
                    priority
                    className="h-full w-full rounded-[10px] hover:opacity-50 group-hover:opacity-50 duration-300"
                  />
                  <div className="w-fit absolute bottom-2 left-1/2  -translate-x-1/2 transition-none md:transition-transform duration-300 z-0 transform md:translate-y-[10px] md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-10">
                    {/* <Button className="bg-blue-500 text-[10px] px-4 py-[2px] text-black">
                    View Details
                  </Button> */}
                    <DoctorsDetailModal data={item} userId={userId} />
                  </div>
                </div>
                <div className="text-center text-[12px]">{item.speciality}</div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
