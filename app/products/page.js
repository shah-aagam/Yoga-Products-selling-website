"use client"
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import BestSellerSection from "@/components/BestSellerSection";
import Image from "next/image";

const ProductListing = () => {

  const [ products , setProducts] = useState([])

  const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  const data = await res.json();
  setProducts(data)
  } 

  useEffect(() => {
    // Bootstrap JavaScript initialization
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    fetchProducts()
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
    
    <div className="container mx-auto px-4">
      {/* Best Sellers Section */}
      <BestSellerSection products={products} />

      {/* All Products Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductListing