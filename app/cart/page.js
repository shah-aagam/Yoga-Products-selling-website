// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { toast } from "react-toastify";

// const CartPage = () => {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         alert("Please log in to view your cart.");
//         return;
//       }

//       const response = await fetch(`/api/cart?userId=${user._id}`);
//       const data = await response.json();

//       if (response.ok) {
//         setCart(data.cart);
//       } else {
//         alert(data.error || "Failed to fetch cart.");
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantityMinus = async (productId, quantity) => {
//     if (quantity < 1) return;

//     if( quantity === 1 ){
//       toast.error("Quantity cannot be less than 1", {
//         theme: "colored",
//         autoClose: 2000,
//         position: 'top-center',
//         style: {
//           marginTop: "3rem",
//         },
//       });
//     }else{
//      quantity = quantity - 1 ;
//     const updatedCart = {
//       ...cart,
//       items: cart.items.map((item) =>
//         item.productId._id === productId
//           ? { ...item, quantity }
//           : item
//       ),
//     };
//     setCart(updatedCart);
    
//     }
//   };

//   const updateQuantityPlus = (productId, quantity) => {
//     if (quantity < 1) return;

//     const updatedCart = {
//       ...cart,
//       items: cart.items.map((item) =>
//         item.productId._id === productId
//           ? { ...item, quantity }
//           : item
//       ),
//     };
//     setCart(updatedCart);

//   }  

//   const removeItem = (productId) => {
//     const updatedCart = {
//       ...cart,
//       items: cart.items.filter((item) => item.productId._id !== productId),
//     };
//     setCart(updatedCart);
//     toast.error("Item removed from cart", {
//       theme: "colored",
//       autoClose: 2000,
//       position: 'top-center',
//       style: {
//         marginTop: "3rem",
//       },
//     });
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const calculateTotal = () =>
//     cart?.items.reduce((acc, item) => acc + item.quantity * item.price, 0) || 0;

//   return (
//     <div className="bg-gray-100 min-h-screen py-8 px-4">
//       <div className="container mx-auto flex flex-col lg:flex-row gap-6">
//         {/* Cart Items */}
//         <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//           <h2 className="text-xl font-semibold mb-4 border-b-2 pb-4">Your Cart Items</h2>
//           {loading ? (
//             Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
//               >
//                 <Skeleton className="w-20 h-20 rounded-lg" />
//                 <Skeleton width={150} height={20} />
//                 <Skeleton width={100} height={20} />
//               </div>
//             ))
//           ) : cart?.items.length ? (
//             <div className="w-full min-w-full">
//               {cart.items.map((item) => (
//                 <div  key={item.productId._id}
//                   className="flex items-center justify-between gap-2 bg-white rounded-lg shadow-md p-4 mb-4"
//                 >
//                   <Link href={`/products/${item.productId._id}`} className=" no-underline text-black">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={item.productId.imageUrl}
//                       alt={item.productId.name}
//                       className="w-40 h-30 rounded-lg object-cover"
//                     />
//                     <div>
//                       <h3 className="font-semibold max-w-72 text-lg">{item.productId.name}</h3>
//                       <p className="text-gray-600">Price: ₹{item.price*item.quantity}</p>
//                     </div>
//                   </div>
//                   </Link>
//                   <div className="flex flex-col items-center mr-4 gap-4">
//                     <div className="flex items-center  border-2 px-2 rounded-lg">
//                         <p className="text-center text-gray-500 text-xl px-2 my-2">Quantity :</p>
//                         <button
//                           onClick={() => updateQuantityMinus(item.productId._id, item.quantity)}
//                           className="bg-gray-300 hover:bg-gray-400 items-center px-2 h-6 rounded-lg"
//                         >
//                           -
//                         </button>
//                         <span className="w-8 text-center">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantityPlus(item.productId._id, item.quantity + 1)}
//                           className="bg-gray-300 hover:bg-gray-400 px-2 h-6 rounded-lg"
//                         >
//                           +
//                         </button>
//                     </div>
//                     <div>
//                         <button
//                           onClick={() => removeItem(item.productId._id)}
//                           className="text-red-500 font-semibold ml-4 p-2 hover:rounded-lg hover:text-white hover:bg-red-500"
//                         >
//                           Remove item from cart
//                         </button>
//                     </div>
//                   </div>
//                 </div>
                
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">Your cart is empty.</p>
//           )}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-8 h-fit">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <p className="text-gray-600">Subtotal</p>
//             <p>₹{calculateTotal()}</p>
//           </div>
//           <div className="flex justify-between mb-2">
//             <p className="text-gray-600">Tax (18%)</p>
//             <p>₹{(calculateTotal() * 0.18).toFixed(2)}</p>
//           </div>
//           <hr className="my-2" />
//           <div className="flex justify-between font-semibold text-lg">
//             <p>Total</p>
//             <p>₹{(calculateTotal() * 1.18).toFixed(2)}</p>
//           </div>
//           <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { toast } from "react-toastify";

// const CartPage = () => {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         alert("Please log in to view your cart.");
//         return;
//       }

//       const response = await fetch(`/api/cart?userId=${user._id}`);
//       const data = await response.json();

//       if (response.ok) {
//         setCart(data.cart);
//       } else {
//         alert(data.error || "Failed to fetch cart.");
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantityMinus = async (productId, quantity) => {
//     if (quantity <= 1) {
//       toast.error("Quantity cannot be less than 1", {
//         theme: "colored",
//         autoClose: 2000,
//         position: "top-center",
//         style: { marginTop: "3rem" },
//       });
//       return;
//     }
  
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const response = await fetch("/api/cart", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id, productId, action: "decrement" }),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         setCart(data.cart);
//       } else {
//         toast.error(data.error || "Failed to update cart", {
//           theme: "colored",
//           autoClose: 2000,
//           position: "top-center",
//           style: { marginTop: "3rem" },
//         });
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };
  
//   const updateQuantityPlus = async (productId, quantity) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const response = await fetch("/api/cart", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id, productId, action: "increment" }),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         setCart(data.cart);
//       } else {
//         toast.error(data.error || "Failed to update cart", {
//           theme: "colored",
//           autoClose: 2000,
//           position: "top-center",
//           style: { marginTop: "3rem" },
//         });
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };
  

//   const removeItem = async (productId) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const response = await fetch("/api/cart", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: user._id,
//           productId,
//         }),
//       });

//       if (response.ok) {
//         const updatedCart = {
//           ...cart,
//           items: cart.items.filter((item) => item.productId._id !== productId),
//         };
//         setCart(updatedCart);
//         toast.error("Item removed from cart", {
//           theme: "colored",
//           autoClose: 2000,
//           position: "top-center",
//           style: { marginTop: "3rem" },
//         });
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error || "Failed to remove item.");
//       }
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const calculateTotal = () =>
//     cart?.items?.reduce((acc, item) => acc + item.quantity * item.price, 0) || 0;

//   return (
//     <div className="bg-gray-100 min-h-screen py-8 px-4">
//       <div className="container mx-auto flex flex-col lg:flex-row gap-6">
//         {/* Cart Items */}
//         <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//           <h2 className="text-xl font-semibold mb-4 border-b-2 pb-4">Your Cart Items</h2>
//           {loading ? (
//             Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
//               >
//                 <Skeleton className="w-20 h-20 rounded-lg" />
//                 <Skeleton width={150} height={20} />
//                 <Skeleton width={100} height={20} />
//               </div>
//             ))
//           ) : cart?.items?.length ? (
//             cart.items.map((item,index) => (
//                 <div key={item.productId._id || index} className="w-full min-w-full">
//                 <div
//                   className="flex items-center justify-between gap-2 bg-white rounded-lg shadow-md p-4 mb-4"
//                 >
//                   <Link
//                     href={`/products/${item.productId._id}`}
//                     className="no-underline text-black"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={item.productId.imageUrl}
//                         alt={item.productId.name}
//                         className="w-40 h-30 rounded-lg object-cover"
//                       />
//                       <div>
//                         <h3 className="font-semibold max-w-72 text-lg">
//                           {item.productId.name}
//                         </h3>
//                         <p className="text-gray-600">
//                           Price: ₹{item.price * item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                   <div className="flex flex-col items-center mr-4 gap-4">
//                     <div className="flex items-center border-2 px-2 rounded-lg">
//                       <p className="text-center text-gray-500 text-xl px-2 my-2">
//                         Quantity :
//                       </p>
//                       <button
//                         onClick={() =>
//                           updateQuantityMinus(item.productId._id, item.quantity)
//                         }
//                         className="bg-gray-300 hover:bg-gray-400 items-center px-2 h-6 rounded-lg"
//                       >
//                         -
//                       </button>
//                       <span className="w-8 text-center">{item.quantity}</span>
//                       <button
//                         onClick={() =>
//                           updateQuantityPlus(item.productId._id, item.quantity)
//                         }
//                         className="bg-gray-300 hover:bg-gray-400 px-2 h-6 rounded-lg"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <div>
//                       <button
//                         onClick={() => removeItem(item.productId._id)}
//                         className="text-red-500 font-semibold ml-4 p-2 hover:rounded-lg hover:text-white hover:bg-red-500"
//                       >
//                         Remove item from cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//               ))
//           ) : (
//             <p className="text-gray-600">Your cart is empty.</p>
//           )}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-8 h-fit">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <p className="text-gray-600">Subtotal</p>
//             <p>₹{calculateTotal()}</p>
//           </div>
//           <div className="flex justify-between mb-2">
//             <p className="text-gray-600">Tax (18%)</p>
//             <p>₹{(calculateTotal() * 0.18).toFixed(2)}</p>
//           </div>
//           <hr className="my-2" />
//           <div className="flex justify-between font-semibold text-lg">
//             <p>Total</p>
//             <p>₹{(calculateTotal() * 1.18).toFixed(2)}</p>
//           </div>
//           <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please log in to view your cart.");
        return;
      }

      const response = await fetch(`/api/cart?userId=${user._id}`);
      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
      } else {
        toast.error(data.error || "Failed to fetch cart.", {
          theme: "colored",
          autoClose: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity (increment or decrement)
  const updateQuantity = async (productId, action) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, productId, action }),
      });

      const data = await response.json();
      if (response.ok) {
        fetchCart(); // Refetch cart to ensure data consistency
      } else {
        toast.error(data.error || "Failed to update cart.", {
          theme: "colored",
          autoClose: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

// Remove an item from the cart
const removeItem = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, productId }), // Send both userId and productId
    });

    if (response.ok) {
      fetchCart(); // Refetch cart after removal
      toast.error("Item removed from cart.", {
        theme: "colored",
        autoClose: 2000,
        position: "top-center",
      });
    } else {
      const errorData = await response.json();
      toast.error(errorData.error || "Failed to remove item.", {
        theme: "colored",
        autoClose: 2000,
        position: "top-center",
      });
    }
  } catch (error) {
    console.error("Error removing item:", error);
  }
};


  // Calculate total price
  const calculateTotal = () =>
    cart?.items?.reduce((acc, item) => acc + item.quantity * item.price, 0) || 0;

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 border-b-2 pb-4">Your Cart Items</h2>
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <Skeleton className="w-20 h-20 rounded-lg" />
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={20} />
              </div>
            ))
          ) : cart?.items?.length ? (
            cart.items.map((item) => (
              <div key={item.productId._id} className="w-full min-w-full">
                <div className="flex items-center justify-between gap-2 bg-white rounded-lg shadow-md p-4 mb-4">
                  <Link
                    href={`/products/${item.productId._id}`}
                    className="no-underline text-black"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productId.imageUrl}
                        alt={item.productId.name}
                        className="w-40 h-30 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold max-w-72 text-lg">
                          {item.productId.name}
                        </h3>
                        <p className="text-gray-600">
                          Price: ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col items-center mr-4 gap-4">
                    <div className="flex items-center border-2 px-2 rounded-lg">
                      <p className="text-center text-gray-500 text-xl px-2 my-2">
                        Quantity:
                      </p>
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.productId._id, "decrement")
                            : toast.error("Quantity cannot be less than 1.", {
                                theme: "colored",
                                autoClose: 2000,
                                position: "top-center",
                              })
                        }
                        className="bg-gray-300 hover:bg-gray-400 items-center px-2 h-6 rounded-lg"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId._id, "increment")
                        }
                        className="bg-gray-300 hover:bg-gray-400 px-2 h-6 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-red-500 font-semibold ml-4 p-2 hover:rounded-lg hover:text-white hover:bg-red-500"
                      >
                        Remove item from cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-8 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p>₹{calculateTotal()}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Tax (18%)</p>
            <p>₹{(calculateTotal() * 0.18).toFixed(2)}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>₹{(calculateTotal() * 1.18).toFixed(2)}</p>
          </div>
          <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
