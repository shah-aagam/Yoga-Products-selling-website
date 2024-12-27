import Link from "next/link";
import Image from "next/image";
import { toast } from 'react-toastify';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  
  return text + "...";
};

const ProductCard = ({ product }) => {

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
          position: 'top-center',
          style: {
            marginTop: "3rem",
          },
      });
      } else {
        // alert(data.error || "Failed to add product to cart");
        toast.error(data.error || "Failed to add product to cart", {
          theme: "colored",
          autoClose: 2000,
          position: 'top-center',
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


  return (
    <>
      
     

    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center  cursor-pointer">
    <Link
        href={`/products/${product._id}`}
        className="text-black no-underline"
     > 
    <div className="flex flex-col items-center">
      <div className="w-64 h-48 relative overflow-hidden rounded-md">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="object-cover w-full h-full"
      />
      </div>
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1 w-full overflow-hidden whitespace-normal">{truncateText(product.description , 50)}</p>
      <p className="text-md font-semibold mt-2">₹{product.price}</p>
      <button className="block mt-2 text-center bg-teal-600 text-white px-4 py-2 rounded-lg no-underline">
        View Details
      </button>
    </div>
    </Link> 
      
      <button onClick={() => {addToCart(product._id)}} className="mt-2 flex gap-4 items-center bg-[#FF9F00] text-white px-10 py-2 rounded-lg no-underline">
      <img src="/cart.svg" alt="cart" />
        <span>Add to Cart</span>
      </button>
    </div> 
    </>
  );
};

export default ProductCard;
