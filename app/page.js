"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react'

export default function Home() {
  const [isOpen, setIsOpen] = useState(null);
  const [products , setProducts] = useState([])

  const handleToggle = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [])

  const cards = [
    {
      id: 1,
      title: "Track Your Progress",
      description: "Measure flexibility, balance, and strength improvements over time."
    },
    {
      id: 2,
      title: "Personalized Recommendations",
      description: "Get tailored tips and guidance based on your performance."
    },
    {
      id: 3,
      title: "Real-Time Feedback",
      description: "Instant feedback and suggestions to improve your practice.   "
    },
    {
      id: 4,
      title: "Sustainable & Eco-Friendly",
      description: "Our products are designed with sustainability in mind.   "
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('/yoga-banner.jpg')" }}>
        <div className="bg-teal-700 bg-opacity-60 p-10 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Transform Your Yoga Journey with Smart Products</h1>
          <p className="text-xl mb-8">Revolutionize your practice with advanced technology that helps you improve and track your yoga routine.</p>
          <Link href="/products" className="px-8 py-3 bg-teal-800 rounded-lg text-xl font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out no-underline text-white">Shop Now</Link>
        </div>
      </section>

      {/* Benefits Section */}

      <section className="py-16 px-6 text-center">

        <h2 className="text-3xl font-bold mb-16">Why Choose Smart Yoga Products?</h2>
        <div className="flex">

          <div className="flex flex-col w-[50%]">
            {cards.map((card) => (
              <div key={card.id}
                className="w-96 mx-auto mt-10 min-h-16 p-4 border rounded-lg shadow-lg bg-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  <button
                    onClick={() => handleToggle(card.id)}
                    className="text-xl font-bold text-blue-500"
                  >
                    {isOpen === card.id ? "-" : "+"}
                  </button>
                </div >
                <div className={`transition-all duration-300 ${isOpen === card.id ? "max-h-[450px] mt-3 text-gray-700" : "max-h-0"
                  } overflow-hidden`}>
                  {isOpen === card.id && (
                    <p className="mt-3 text-gray-700">
                      {card.description}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>

          <div className="relative flex flex-col top-8 items-center">
            <div className="flex gap-[98px]">
              <div className=" h-60 w-60 rotate-45 overflow-hidden">
              <Image src="/pose3.jpg" alt="Image" width={600} height={400} className="w-full h-full mb-4 rounded-md hover:opacity-85 -rotate-45 " />
              </div>
              <div className=" h-60 w-60 rotate-45 overflow-hidden">
              <Image src="/pose2.jpg" alt="Image" width={600} height={400} className="h-full w-full mb-4 rounded-md hover:opacity-85 -rotate-45 " />
              </div>
            </div>

            <div className=" h-60 w-60 rotate-45 absolute top-[170px] overflow-hidden">
              <Image src="/pose1.jpg" alt="Image" width={700} height={700} className="h-full w-full mb-4 rounded-md hover:opacity-85 -rotate-45 " />
            </div>
            {/* <Image src="/home-img.jpg" alt="Image" width={600} height={400} className=" mb-4 rounded-md hover:opacity-85" /> */}
          </div>
        </div>

        
      </section>


      {/* Featured Products Section */}
      <section className="py-16 px-6 mt-10 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10">

          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div>
                <Image src={product.imageUrl} alt="Smart Yoga Mat" width={280} height={180} className=" mb-4 rounded-md hover:opacity-85" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="mb-4">{product.description}</p>
              <Link href={`/products/${product._id}`} className="px-4 py-2 bg-teal-700 rounded-lg text-white no-underline">Shop Now</Link>
            </div>
          ))}          
        </div>
        <Link href="/products" className="text-teal-700 mt-10 inline-block">View All Products</Link>
      </section>


      <section className="py-16 px-6 text-center bg-teal-500 text-white">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="flex justify-center gap-8">
          <div className="w-80">
            <p>"The SmartAsana mat helped me improve my posture in just a few weeks!"</p>
            <p className="font-semibold mt-2">- John Doe</p>
          </div>
          <div className="w-80">
            <p>"I love the personalized feedback. It makes my yoga sessions so much better."</p>
            <p className="font-semibold mt-2">- Jane Smith</p>
          </div>
        </div>
      </section>
    </>
  );
}