"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        alert('User registered successfully!');
        router.push('/auth/login');
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
          <label htmlFor="name" className="flex flex-col">
            <h4 className="text-sm font-semibold">Display Name</h4>
            <input
              type="text"
              id="name"
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
              className="p-2 mt-1 border rounded text-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="mt-1 text-xs text-gray-600">
              Password must contain at least eight characters, including at least 1 letter and 1
              number.
            </p>
          </label>
          <button
            type="submit"
            className="py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="py-4 text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="text-blue-600"
          >
            Log In
          </button>
        </p>
      </div>
    </section>
  );
};

export default Signup;
