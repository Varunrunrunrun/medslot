"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export const DoctorsDetailModal = ({
  data,
  userId,
}: {
  data: any;
  userId: any;
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const goToAppointment = () => {
    router.push(`/patients/${userId}/new-appointment?doctorId=${data.$id}`);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-[10px] px-4 py-[2px] text-black">
          Know more
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog md:max-w-3xl border-2 border-blue-500  w-[90%] md:w-[800px] max-h-[85%] overflow-auto">
        <DialogHeader className="mb-2 space-y-3">
          <DialogTitle className="capitalize text-2xl text-left mt-4">
            {data.name}
          </DialogTitle>
          <DialogDescription>
            <div className="bg-slate-400 text-black rounded-2xl px-4 py-2 text-xs w-fit font-semibold">
              {data.speciality}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full relative ">
          <Button className="shad-primary-btn mb-8" onClick={goToAppointment}>
            Book an Appointment
          </Button>
          <div>{data.bio}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
