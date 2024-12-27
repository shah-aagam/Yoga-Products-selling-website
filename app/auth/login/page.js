"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // alert('Logged in successfully!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.dispatchEvent(new Event('storage'));

        router.push('/');
        toast.success('Logged in successfully!', {
          theme: "colored",
          autoClose: 2000,
          position: 'top-center',
          style: {
            marginTop: "3rem", // Move it slightly down from the top-center
          },
        });
      } else {
        // alert(data.message || 'An error occurred');
        toast.error(data.message || 'An error occurred', {
          theme: "colored",
          autoClose: 2000,
          position: 'bottom-center',
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
      <div className="flex flex-col items-center min-w-[25%] bg-white shadow-lg rounded-lg px-6 py-8">
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
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
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Password</h4>
            </div>
            <input
              type="password"
              placeholder='Enter your password'
              id="password"
              className="p-2 mt-1 border rounded text-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <p className="text-xs text-end text-[#156256] cursor-pointer">Forgot password?</p>
          <button
            type="submit"
            className="py-2 mt-4 mx-10 text-white bg-[#54b4a5] rounded hover:bg-[#22897a] transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="pt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/signup')}
            className="text-[#22897a]"
          >
            Sign Up
          </button>
        </p>
        <p className="text-sm text-gray-600">
          Login as 
          <Link href="/admin/login" className='text-[#22897a] cursor-pointer no-underline '> Admin</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
