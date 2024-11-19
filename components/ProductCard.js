import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <p className="text-md font-semibold mt-2">₹{product.price}</p>
      <Link
        href={`/products/${product._id}`}
        className="block mt-3 text-center bg-teal-600 text-white px-4 py-2 rounded-lg no-underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
