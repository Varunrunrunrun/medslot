"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const userColumn: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  //   {
  //     accessorKey: "patient",
  //     header: "Patient",
  //     cell: ({ row }) => {
  //       const appointment = row.original;
  //       return <p className="text-14-medium ">{appointment.patient.name}</p>;
  //     },
  //   },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap w-[120px] overflow-hidden text-ellipsis">
            {appointment?.primaryPhysician}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-14-medium w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">
                {appointment.reason}
              </p>
            </TooltipTrigger>
            <TooltipContent className="border-none w-auto max-w-[300px] h-auto p-2 bg-slate-100 text-black">
              <p>{appointment.reason}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer" asChild>
              <p className="text-14-medium cursor-pointer w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">
                {appointment.note}
              </p>
            </TooltipTrigger>
            <TooltipContent className="border-none w-auto max-w-[300px] min-w-[50px] text-left h-auto p-2 bg-slate-100 text-black">
              <p>{appointment.note}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  //   {
  //     id: "actions",
  //     header: () => <div className="pl-4">Actions</div>,
  //     cell: ({ row }) => {
  //       const appointment = row.original;

  //       return (
  //         <div className="flex gap-1">
  //           <AppointmentModal
  //             patientId={appointment.patient.$id}
  //             userId={appointment.userId}
  //             appointment={appointment}
  //             type="schedule"
  //             title="Schedule Appointment"
  //             description="Please confirm the following details to schedule."
  //           />
  //           <AppointmentModal
  //             patientId={appointment.patient.$id}
  //             userId={appointment.userId}
  //             appointment={appointment}
  //             type="cancel"
  //             title="Cancel Appointment"
  //             description="Are you sure you want to cancel your appointment?"
  //           />
  //         </div>
  //       );
  //     },
  //   },
];
