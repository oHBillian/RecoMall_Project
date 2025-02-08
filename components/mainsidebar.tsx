import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainSidebar =  () => {
  const params = useParams();
  const pathname = usePathname();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "MainCategory",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/subcategories`,
      label: "SubCategory",
      active: pathname === `/${params.storeId}/subcategories`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Product",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/Setting`,
      label: "Setting",
      active: pathname === `/${params.storeId}/Setting`,
    },
  ];

  return (
    <div className="p-5 h-full">
      <span className="text-whit text-2xl font-bold text-white">Admin_Setting</span>
      <hr className="mt-3 text-white mb-3"></hr>
      <div className="flex flex-col">
        {routes.map((route, index) => (
          <div key={index} className={`h-12 pl-3 text-gray-200 bg-[#242527] hover:bg-[#3A3B3D] mt-4 flex items-center ${route.active ? "bg-[#3A3B3D]" : "bg-[#242527]"}`}>
            {" "}
            <Link href={route.href}>{route.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSidebar;
