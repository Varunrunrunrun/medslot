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
import { Button } from "../ui/button";
const MoreLanding = ({ userId }: any) => {
  return (
    <div className="items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="p-2 rounded-md border-2 flex justify-center items-center">
            <MoreVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:mr-[35px] mr-[20px] p-2  bg-black md:max-w-[300px] max-w-[200px]">
          <DropdownMenuItem>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 w-full"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button className="bg-blue-500 text-white w-full">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button className="bg-gold border-silver border-2 text-black w-full">
              <Link href="/?admin=true">Admin</Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MoreLanding;
