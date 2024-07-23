import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
const More = ({ userId }: any) => {
  return (
    <div className="flex gap-6 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="p-2 rounded-md border-2 flex justify-center items-center">
            <MoreVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-[125px] px-4 py-2 bg-black">
          <DropdownMenuLabel className="text-blue-500">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/patients/${userId}/home`}>Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/patients/${userId}/appointments`}>Appointments</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/patients/${userId}/doctors`}>Doctors</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserButton />
    </div>
  );
};

export default More;
