"use client";
import React , { useState , useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Avatar from '@/components/Avatar'
import {useRouter} from 'next/navigation';

const Navbar = () => {
  const router = useRouter()

  const [user, setUser] = useState(null);

  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  useEffect(() => {

    setUser(getUserFromLocalStorage());

    const handleStorageChange = () => {
      setUser(getUserFromLocalStorage());
    };

    window.addEventListener("storage", handleStorageChange);


    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/")
  };

  const handleSlideIn = () => {
    
  };

  return (
    <>
      <div className="flex gap-4 h-16 bg-[#A9D2CC]  items-center font-roboto">

        <div className="flex gap-4 justify-between items-center w-full ">  
          <div className='ml-4'>
            <Link href="/" className="text-xl font-bold">SmartAsana</Link>
          </div>

          <div className=''>
          <form className="flex items-center gap-2 bg-white p-2 rounded-lg">
            <input 
              type="text" 
              placeholder="Search..." 
              className="h-5 px-3 border rounded-lg focus:outline-none"
            />
            <Image src="/search.svg" width={20} height={20} alt="search" className="cursor-pointer" />
          </form>
          </div>

          <div className='flex items-center gap-4 justify-end '>
          
          <div className='flex gap-8 items-center'>
          <Link href="/products" className="text-sm hover:underline">Products</Link>
          <Link href="/blogs" className="text-sm hover:underline">Blogs</Link>
          <Link href="/cart" className="w-10 h-10 flex items-center justify-center">
            <Image src="/cart.svg" className='' width={20} height={20} alt="cart" />
          </Link>
          </div>

          <div className='mr-5'>
          {
            !user ? (
              <Link href="/auth/login" className="text-sm float-right hover:border  rounded-md hover:bg-white px-2 py-1 mr-10">Log In</Link>
            ) : (
              <>
              <div className='flex'>
                <Avatar>
                  <Link href={`/users/${user?._id}`} className="text-sm">
                    {user?.name?.split(' ')[0]}
                  </Link>
                </Avatar>
                <button onClick={handleLogout} className="text-sm ml-4 px-3 py-1">Log out</button>
              </div>
              </>
            )
          }
        </div>
        </div>

        </div>

      </div>
    </>
  );
}

export default Navbar;
