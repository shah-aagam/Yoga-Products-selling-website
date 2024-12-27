"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Head from "next/head";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
  
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
  
        window.dispatchEvent(new Event('storage'));

        router.push("/admin/dashboard");
        toast.success('Admin logged in successfully!', {
          theme: "colored",
          autoClose: 2000,
          position: 'top-center',
          style: {
            marginTop: "3rem",
          },
        });
      } else {
        // setError(data.message || "Login failed");
        toast.error(data.message || 'An error occurred', {
          theme: "colored",
          autoClose: 2000,
          position: 'top-center',
          style: {
            marginTop: "3rem",
          },
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    }
  };
  

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className="min-h-screen flex justify-center items-center flex-col bg-gray-100 gap-4">
      <div className='flex justify-center items-center gap-2 '>
          <img src="/logo.svg" alt="SmartAsana" className=' w-16 border border-black rounded-full' />
          <p className='text-3xl font-bold pt-2'>SmartAsana</p>
      </div>
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>

          {error && <p className="text-red-500 font-medium text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email id"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your pasword"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#54b4a5] text-white font-bold rounded-md hover:bg-[#22897a] focus:outline-none focus:ring-2 focus:ring-blue-500"
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

