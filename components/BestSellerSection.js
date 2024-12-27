// import ProductCard from "./ProductCard";

// const BestSellerSection = ({ products }) => {
//   const bestSellers = products
//     .filter((product) => product.purchased > 0)
//     .sort((a, b) => b.purchased - a.purchased)
//     .slice(0, 3);

//   return (
//     <div className="my-8">
//       <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {bestSellers.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSellerSection;

import ProductCard from "./ProductCard";

const BestSellerSection = ({ products }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellerSection;
