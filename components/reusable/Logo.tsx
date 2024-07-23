import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <div className="flex gap-2 items-center justify-center  h-10 w-fit">
        <Image
          src="/assets/icons/logo-icon.svg"
          height={40}
          width={40}
          alt="logo"
        />
        <span className="text-2xl">MedSlot</span>
      </div>
    </div>
  );
};

export default Logo;
