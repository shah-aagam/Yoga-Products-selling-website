"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Head from 'next/head';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      router.push('/admin/dashboard'); 
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
        <>
          <Head>
            <title>Admin Login</title>
          </Head>
          <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
    
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
    
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Log In
                </button>
              </form>
    
            </div>
          </div>
        </>
  );
};

export default AdminLogin;
