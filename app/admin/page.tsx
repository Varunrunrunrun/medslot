"use client";
import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const [appointments, setappointments] = useState<any>();
  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getRecentAppointmentList();
      console.log(appointments);
      if (appointments) {
        setappointments(appointments);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer flex items-center">
          <div className="flex gap-2 items-center justify-center  w-fit">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={40}
              width={40}
              alt="logo"
            />
            <span className="text-2xl">MedSlot</span>
          </div>
        </Link>

        <div className="flex gap-4 items-center">
          <p className="text-16-semibold">Admin Dashboard</p>
          <Button
            className="bg-gold text-black border-silver border-2"
            onClick={() => {
              localStorage.removeItem("accessKey");
              router.push("/");
            }}
          >
            Logout from Admin
          </Button>
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">
            Welcome <span className="text-blue-500">Admin</span>
          </h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount || 0}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount || 0}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount || 0}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        {appointments && (
          <DataTable columns={columns} data={appointments.documents} />
        )}
      </main>
    </div>
  );
};

export default AdminPage;
