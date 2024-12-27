"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // alert('User registered successfully!');
        router.push('/auth/login');
        toast.success('User registered successfully!', {
          theme: "colored",
          autoClose: 2000,
          position: 'top-center',
          style: {
            marginTop: "3rem",
          },
        });
      } else {
        // alert(data.message || 'An error occurred');
        toast.error(data.message || 'An error occurred', {
          theme: "colored",
          autoClose: 2000,
          position: 'top-center',
          style: {
            marginTop: "3rem",
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred');
    }
  };

  return (
    <section className="flex flex-col min-h-screen items-center justify-center bg-gray-100 gap-4">
      <div className='flex justify-center items-center gap-2'>
          <img src="/logo.svg" alt="SmartAsana" className=' w-16 border border-black rounded-full' />
          <p className='text-3xl font-bold pt-2'>SmartAsana</p>
      </div>
      <div className="flex flex-col items-center min-w-[20%] bg-white shadow-lg rounded-lg px-6 pt-8">
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
          <label htmlFor="name" className="flex flex-col">
            <h4 className="text-sm font-semibold">Display Name</h4>
            <input
              type="text"
              id="name"
              placeholder='Enter your name'
              className="p-2 mt-1 border rounded text-sm"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email" className="flex flex-col">
            <h4 className="text-sm font-semibold">Email</h4>
            <input
              type="email"
              id="email"
              placeholder='Enter your email id'
              className="p-2 mt-1 border rounded text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            <h4 className="text-sm font-semibold">Password</h4>
            <input
              type="password"
              id="password"
              placeholder='Enter your password'
              className="p-2 mt-1 border rounded text-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="mt-4 text-sm text-gray-600">
              Password must contain at least eight characters, including at least 1 letter and 1
              number.
            </p>
          </label>
          <button
            type="submit"
            className="py-2 mt-2 text-white bg-[#54b4a5] rounded hover:bg-[#22897a] transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="pt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="text-[#22897a]"
          >
            Log In
          </button>
        </p>
        <p className="text-sm pb-2 text-gray-600">
          Login as 
          <Link href="/admin/login" className='text-[#22897a] cursor-pointer no-underline '> Admin</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
