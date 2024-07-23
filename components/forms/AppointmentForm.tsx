"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
// import { Doctors } from "@/constants";
import {
  createAppointment,
  getFileUrl,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { getTomorrow } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { FormFieldType } from "./PatientForm";
import { getDoctorsList } from "@/lib/actions/doctors.actions";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
  doctorId,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  doctorId?: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const [doctorList, setDoctorList] = useState<any>();
  const [doctorName, setDoctorName] = useState("");
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
        console.log(modifiedDoctorsList, doctorId);
        setDoctorList(modifiedDoctorsList);
        if (doctorId && modifiedDoctorsList) {
          console.log(doctorList);
          const entry = modifiedDoctorsList?.find(
            (obj: any) => obj.$id === doctorId
          );
          console.log(entry);
          if (entry) {
            form.setValue("primaryPhysician", String(entry?.name));
            setDoctorName(entry?.name);
          }
        }
      }
    };
    fetchData();
  }, []);

  // const [entryValue, setentryValue] = useState("not");
  // const getAutoFill = (doctorId: any) => {
  //   const entry = doctorList?.find((obj: any) => obj.$id === doctorId);
  //   console.log(entry);
  //   setentryValue(entry?.name);
  //   return entry ? entry.name : null;
  // };

  const form: any = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment ? new Date(appointment?.schedule!) : getTomorrow(),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancel";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">
              New <span className="text-blue-500">Appointment</span>
            </h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            {doctorId ? (
              <p>Appointment with {doctorName}</p>
            ) : (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a doctor"
              >
                {doctorList &&
                  doctorList.map((doctor: any, i: any) => (
                    <SelectItem key={doctor.name + i} value={doctor.name}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image
                          src={doctor.url}
                          width={32}
                          height={32}
                          alt="doctor"
                          className="rounded-full border border-dark-500"
                          priority
                        />
                        <p>{doctor.name}</p>
                      </div>
                    </SelectItem>
                  ))}
              </CustomFormField>
            )}

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              disabled={type === "schedule"}
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
              minDate={true}
              timeLimit={true}
              minTime={new Date(0, 0, 0, 8, 0)}
              maxTime={new Date(0, 0, 0, 20, 0)}
            />

            <div className={`flex flex-col gap-6 md:flex-row`}>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual montly check-up"
                disabled={type === "schedule"}
                className="w-full"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
                className="w-full"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
            className="w-full"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
