"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const getFromLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
      return null;
    }
  };

  useEffect(() => {
    setUser(getFromLocalStorage("user"));
    setAdmin(getFromLocalStorage("admin"));

    const handleStorageChange = () => {
      setUser(getFromLocalStorage("user"));
      setAdmin(getFromLocalStorage("admin"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = (type) => {
    if (type === "user") {
      localStorage.removeItem("user");
      setUser(null);
    } else if (type === "admin") {
      localStorage.removeItem("admin");
      setAdmin(null);
    }
    router.push("/");
  };

  return (
    <>
      <div className="flex gap-4 h-16 bg-[#A9D2CC] items-center font-roboto">
        <div className="flex gap-4 justify-between items-center w-full">
          <div className="ml-10 flex items-center gap-2">
            <Link href="/">
             <Image  src="/logo.svg" width={50} height={50} alt="logo" className="cursor-pointer rounded-full"/>
            </Link>
            <Link href="/" className="text-xl font-bold no-underline text-black">
              SmartAsana
            </Link>
          </div>

          <div className="w-2/5">
          <form className="flex items-center justify-start gap-2 bg-white px-3 py-2 rounded-lg">
              <input
                type="text"
                placeholder="Search..."
                className="h-7 px-3 py-2 border rounded-lg w-full focus:outline-none"
              />
              <Image src="/search.svg" width={20} height={20} alt="search" className="cursor-pointer justify-start" />
            </form>
          </div>

          {  admin && (
              <div>
                <Link href="/admin/dashboard" className="text-sm hover:underline no-underline text-black">
                Dashboard
              </Link>
              </div>
          )
          }

          <div className="flex items-center gap-4 justify-end ">
            <div className="flex gap-8 items-center">
              <Link href="/products" className="text-sm hover:underline no-underline text-black">
                Products
              </Link>
              <Link href="/blogs" className="text-sm hover:underline no-underline text-black">
                Blogs
              </Link>
              { user &&
                <Link
                href="/cart"
                className="w-10 h-10 flex items-center justify-center no-underline text-black"
                >
                <Image
                  src="/NavCart.svg"
                  className=""
                  width={20}
                  height={20}
                  alt="cart"
                />
              </Link>}
            </div>

            <div className="mr-5">
              {!user && !admin ? (
                <Link
                  href="/auth/login"
                  className="text-sm float-right rounded-md hover:bg-white px-2 py-1 mr-10 no-underline text-black"
                >
                  Log In
                </Link>
              ) : (
                <>
                  {user && (
                    <div className="flex">
                      <Avatar>
                        <Link
                          href={`/users/${user?._id}`}
                          className="text-sm no-underline text-black"
                        >
                          {user?.name?.split(" ")[0]}
                        </Link>
                      </Avatar>
                      <button
                        onClick={() => handleLogout("user")}
                        className="text-sm float-right rounded-md hover:!bg-white px-2 py-1 mr-10 no-underline text-black"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                  {admin && (
                    <div className="flex">
                      <Avatar>
                        <Link
                          href={`/admin/${admin?._id}`}
                          className="text-sm no-underline text-black"
                        >
                          {admin?.name?.split(" ")[0]}
                        </Link>
                      </Avatar>
                      <button
                        onClick={() => handleLogout("admin")}
                        className="text-sm float-right rounded-md hover:!bg-white px-2 py-1 ml-2 mr-10 no-underline text-black"
                      > 
                        Log out
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

