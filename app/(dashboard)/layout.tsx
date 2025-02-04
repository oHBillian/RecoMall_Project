import Sidebar from "@/components/sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  if(!store){
    redirect("/");
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="px-8 py-4 mt-2 w-full max-h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
