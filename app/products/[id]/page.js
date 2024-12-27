// import Skeleton from "react-loading-skeleton";

// export default async function ProductDetail({ params }) {
//   const { id } = params;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
//     cache: "no-store",
//   });
//   const product = await res.json();

//   if (!product) {
//     return <p>Product not found.</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 m-20 overflow-x-hidden">   
//     { product ? (
//       <div className="flex flex-col md:flex-row gap-16">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="w-full md:w-[30%] rounded-lg"
//         />
//         <div className="overflow-hideen">
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-lg mb-4 !break-words">{product.description}</p>
//           <p className="text-xl font-semibold mb-6">₹{product.price}</p>
//           <div className="flex gap-8">
//             <button className="mt-2 flex gap-4 items-center text-lg bg-[#FF9F00] text-white px-10 py-2 rounded-lg no-underline">
//               <img src="/cart.svg" alt="cart" />
//               <span>Add to Cart</span>
//             </button>
//             <button className="px-16 bg-teal-700 text-lg mt-2 hover:bg-teal-800 text-white rounded-lg font-roboto">           
//               <span> Buy Now  </span>
//             </button>
//           <div/>
//         </div>
//       </div>
//     </div>

//     ) : (
//       Array.from({ length : 1 }).map((_,index) => (
//       <div className="flex flex-col md:flex-row gap-16">

//         <Skeleton width={400} height={400} className="rounded-lg" />
//         <div className="overflow-hideen">

//           <Skeleton width={100} height={30}/>

//           <Skeleton width={400} height={20} />

//           <Skeleton width={100} height={25} />
//           <div className="flex gap-8">
//             <button className="mt-2 flex gap-4 items-center text-lg bg-[#FF9F00] text-white px-10 py-2 rounded-lg no-underline">

//               <Skeleton width={100} height={20} />
//             </button>
//             <button className="px-16 bg-teal-700 text-lg mt-2 hover:bg-teal-800 text-white rounded-lg font-roboto">           
//               <Skeleton width={75} height={20} />
//             </button>
//           <div/>
//         </div>
//       </div>
//     </div>

//       ))
//     )
//     }
//         </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const ProductDetail = ({ params: paramsPromise }) => {
  const [params, setParams] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    }

    resolveParams();
  }, [paramsPromise]);

  useEffect(() => {
    async function fetchProduct() {
      if (!params?.id) return;

      try {
        const res = await fetch('https://yoga-products-selling-website-h396.vercel.app//api/products/${params.id}', {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Product not found.");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params]);

  const user = typeof window !== "undefined" && localStorage.getItem("user");

  const addToCart = async (productId) => {
    if (!user) {
      alert("Please login as a user to add product to cart");
      return;
    }

    try {
      const userData = JSON.parse(user); 
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData._id,  
          productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // alert("Product added to cart successfully");
        toast.success('Item added to cart successfully!', {
          theme: "colored",
          autoClose: 2000,
          position: 'top-right',
          style: {
            marginTop: "3rem",
          },
      });
      } else {
        // alert(data.error || "Failed to add product to cart");
        toast.error(data.error || "Failed to add product to cart", {
          theme: "colored",
          autoClose: 2000,
          position: 'top-right',
          style: {
            marginTop: "3rem",
          },
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleBuyNow = async (productId) => {
    if (!user) {
      alert("Please login as a user to add product to cart");
      return;
    }

    try {
      const userData = JSON.parse(user); 
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData._id,  
          productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again.");
    }

    router.push("/cart");
  };

  if (!params) {
    return <p>Loading product details...</p>;
  }

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-16 m-20">
        <Skeleton width={400} height={400} className="rounded-lg" />
        <div className="overflow-hidden">
          <Skeleton width={100} height={30} />
          <Skeleton width={400} height={20} />
          <Skeleton width={100} height={25} />
          <Skeleton width={200} height={40} />
        </div>
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 m-20 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-[30%] rounded-lg"
        />

        {/* Product Details */}
        <div className="overflow-hidden">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4 !break-words">{product.description}</p>
          <p className="text-xl font-semibold mb-6">₹{product.price}</p>

          {/* Action Buttons */}
          <div className="flex gap-8">
            <button
              className="mt-2 flex gap-4 items-center text-lg bg-[#FF9F00] text-white px-10 py-2 rounded-lg no-underline"
              onClick={() => {addToCart(product._id)}}
            >
              <img src="/cart.svg" alt="cart" />
              <span>Add to Cart</span>
            </button>
            <button
              className="px-16 bg-teal-700 text-lg mt-2 hover:bg-teal-800 text-white rounded-lg font-roboto"
              onClick={() => {handleBuyNow(product._id)}}
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail ;
