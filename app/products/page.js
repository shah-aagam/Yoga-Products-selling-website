"use client"
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductListing = () => {

  const [ products , setProducts] = useState([])
  const [ bestSellers , setBestSellers] = useState([])


  const fetchProducts = async () => {
  const res = await fetch('https://yoga-products-selling-website-h396.vercel.app//api/products', {
    cache: "no-store",
  });
  const data = await res.json();
  setProducts(data)
  } 

   const fetchBestSellers = async () => {
    const res = await fetch(
      'https://yoga-products-selling-website-h396.vercel.app//api/products/bestsellers',
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await res.text();
    console.log(text);

    try {
      const data = JSON.parse(text); 
      setBestSellers(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    fetchProducts()
    fetchBestSellers()
  }, []);

  return (
     <>
    <div id="carouselExampleAutoplaying" className="carousel slide m-5" data-bs-ride="carousel">
        <div className="carousel-inner h-[410px]">
          <div className="carousel-item active">
            <Image src="/sale1.webp" width={800} height={350} className="cursor-pointer w-full h-full object-contain" alt="sale1"/>
          </div>
          <div className="carousel-item ">
            <Image src="/sale2.webp" width={800} height={350} className="cursor-pointer w-full h-full object-cover" alt="sale2"/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    
    <div className="container mx-auto px-4 ">
      {/* Best Sellers Section */}
      <h2 className="text-4xl font-bold mb-4 pb-4 text-center border-b-2">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
      {bestSellers.length > 0 ? (
            bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ):(
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md flex flex-col justify-center items-center overflow-hidden">
              <div className="relative overflow-hidden rounded-lg px-4 pt-4">
                <Skeleton height={180} width={280} className="w-full mb-3 h-[180px]"/>
              </div>
              <div className="gap-2 flex flex-col mb-3 justify-center items-center">
                <Skeleton width={150} height={20} />
                <Skeleton count={3} width={250} height={15}/>
                <Skeleton width={120} height={30} />
                <Skeleton width={150} height={30} />
              </div>
            </div>
          ))
        )
      }    
      </div>


      {/* All Products Section */}
      <div className="my-8">
        <h2 className="text-4xl font-bold mb-4 mt-20 pb-4 text-center border-b-2">All Products</h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
      {
        products.length > 0 ? (
          
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))

        ):(
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md flex flex-col justify-center items-center overflow-hidden">
              <div className="relative overflow-hidden rounded-lg px-4 pt-4">
                <Skeleton height={180} width={280} className="w-full mb-3 h-[180px]"/>
              </div>
              <div className="gap-2 flex flex-col mb-3 justify-center items-center">
                <Skeleton width={150} height={20} />
                <Skeleton count={3} width={250} height={15}/>
                <Skeleton width={120} height={30} />
                <Skeleton width={150} height={30} />
              </div>
            </div>
          ))
        )
      }    
      </div>
      </div>
    </div>
    </>
  );
}

export default ProductListing