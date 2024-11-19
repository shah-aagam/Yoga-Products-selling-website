export default async function ProductDetail({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  const product = await res.json();

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 m-20">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-6">₹{product.price}</p>
          <button
            className="bg-teal-600 text-white px-6 py-2 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
