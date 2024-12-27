"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
      console.log(error);
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
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        // style={{ backgroundImage: "url('/yoga-banner.jpg')" }}
      >
        <div className="bg-teal-700 bg-opacity-60 p-10 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">
            Transform Your Yoga Journey with Smart Products
          </h1>
          <p className="text-xl mb-8">
            Revolutionize your practice with advanced technology that helps you
            improve and track your yoga routine.
          </p>
          <Link
            href="/products"
            className="px-8 py-3 bg-teal-800 rounded-lg text-xl font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out no-underline text-white"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Benefits Section */}

      <section className="px-6 text-center">
        <h2 className="text-3xl font-bold mb-16">
          Why Choose Smart Yoga Products?
        </h2>
        <div className="flex">
          <div className="flex flex-col w-[50%]">
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-96 mx-auto mt-10 min-h-16 p-4 border rounded-lg shadow-lg bg-white"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  <button
                    onClick={() => handleToggle(card.id)}
                    className="text-xl font-bold text-blue-500"
                  >
                    {isOpen === card.id ? "-" : "+"}
                  </button>
                </div>
                <div
                  className={`transition-all duration-300 ${
                    isOpen === card.id
                      ? "max-h-[450px] mt-3 text-gray-700"
                      : "max-h-0"
                  } overflow-hidden`}
                >
                  {isOpen === card.id && (
                    <p className="mt-3 text-gray-700">{card.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col top-8 items-center py-10">
            <div className="flex gap-[98px]">
              <div className=" h-60 w-60 rotate-45 overflow-hidden">
                <Image
                  src="/pose3.jpg"
                  alt="Image"
                  width={600}
                  height={400}
                  className="w-full h-full mb-4 rounded-md hover:opacity-85 -rotate-45"
                />
              </div>
              <div className=" h-60 w-60 rotate-45 overflow-hidden">
                <Image
                  src="/pose2.jpg"
                  alt="Image"
                  width={600}
                  height={400}
                  className="h-full w-full mb-4 rounded-md hover:opacity-85 -rotate-45 "
                />
              </div>
            </div>

            <div className=" h-60 w-60 rotate-45 absolute top-[170px] overflow-hidden">
              <Image
                src="/pose1.jpg"
                alt="Image"
                width={700}
                height={700}
                className="h-full w-full mb-4 rounded-md hover:opacity-85 -rotate-45 "
              />
            </div>
            {/* <Image src="/home-img.jpg" alt="Image" width={600} height={400} className=" mb-4 rounded-md hover:opacity-85" /> */}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6 mt-10 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {products.length > 0
            ? products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <Link href={`/products/${product._id}`} className="no-underline">
                  {/* Image Section */}
                  <div className="relative overflow-hidden rounded-t-lg px-4 pt-4">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={280}
                        height={180}
                        className="object-cover w-full h-[200px] hover:scale-105 transition-transform duration-300 rounded-md"
                      />
                    ) : (
                      <div className="p-4 rounded-md">
                        <Skeleton
                          height={180}
                          width={280}
                          className="w-full h-[180px]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex-grow line-clamp-3 h-[4rem]">
                      {product.description || "\u00A0" }
                    </p>
                    <p className="text-lg font-roboto font-bold text-black">₹{product.price}</p>
                    <button
                      className="mt-2 inline-block text-center px-4 py-2 bg-teal-700 text-white no-underline rounded-lg hover:bg-teal-800 transition-colors"
                    >
                      Shop Now
                    </button>
                  </div>
                  </Link>
                </div>
              ))
            : // Skeletons while loading
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
                  <div className="relative overflow-hidden rounded-lg px-4 pt-4">
                    <Skeleton height={180} width={280} className="w-full h-[180px]"/>
                  </div>
                  <div className="p-4 flex flex-col">
                    <Skeleton width={150} height={20} className="mb-2" />
                    <Skeleton count={3} className="mb-4" />
                    <Skeleton width={120} height={40} />
                  </div>
                </div>
              ))}
        </div>

        <Link href="/products" className="text-teal-700 mt-10 inline-block">
          View All Products
        </Link>
      </section>

      <section className="py-16 px-6 text-center bg-teal-500 text-white">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="flex justify-center gap-8">
          <div className="w-80">
            <p>
              "The SmartAsana mat helped me improve my posture in just a few
              weeks!"
            </p>
            <p className="font-semibold mt-2">- Rahul Kumar</p>
          </div>
          <div className="w-80">
            <p>
              "I love the personalized feedback. It makes my yoga sessions so
              much better."
            </p>
            <p className="font-semibold mt-2">- Khushi </p>
          </div>
        </div>
      </section>
    </>
  );
}