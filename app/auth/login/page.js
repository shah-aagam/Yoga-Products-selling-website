"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

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
        alert('Logged in successfully!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.dispatchEvent(new Event('storage'));

        router.push('/');
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred');
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center min-w-[20%] bg-white shadow-lg rounded-lg px-6 py-8">
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
          <label htmlFor="email" className="flex flex-col">
            <h4 className="text-sm font-semibold">Email</h4>
            <input
              type="email"
              id="email"
              className="p-2 mt-1 border rounded text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Password</h4>
              <p className="text-xs text-blue-600 cursor-pointer">Forgot password?</p>
            </div>
            <input
              type="password"
              id="password"
              className="p-2 mt-1 border rounded text-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="py-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/signup')}
            className="text-blue-600"
          >
            Sign Up
          </button>
        </p>
        <p className=" text-sm text-gray-600">
          Login as 
          <Link href="/admin/login" className='text-blue-600 cursor-pointer'> Admin</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
