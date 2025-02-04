"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import MainSidebar from "./mainsidebar";

const Sidebar = () => {
  const { user } = useUser();
  return (
    <div className="h-full bg-[#242527] w-60 flex flex-col">
      <div>
        <MainSidebar />
      </div>
      <div className="bg-[#3A3B3D] mt-auto flex items-center justify-around h-16 p-2">
        <UserButton />
        {user && (
          <span className="text-sm font-medium text-white">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
