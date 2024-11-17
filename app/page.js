import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* Hero Section */}
    <section className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('/yoga-banner.jpg')" }}>
  <div className="bg-teal-700 bg-opacity-60 p-6 rounded-lg">
    <h1 className="text-4xl font-bold mb-2">Transform Your Yoga Journey with Smart Products</h1>
    <p className="text-xl mb-4">Revolutionize your practice with advanced technology that helps you improve and track your yoga routine.</p>
    <Link href="/products" className="px-8 py-3 bg-teal-800 rounded-lg text-xl font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out">Shop Now</Link>
  </div>
</section>

  {/* Benefits Section */}
  <section className="py-16 px-6 text-center">
    <h2 className="text-3xl font-bold mb-8">Why Choose Smart Yoga Products?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div className="flex flex-col items-center">
        <Image src="/track-icon.svg" alt="Track Progress" width={60} height={60} />
        <h3 className="text-xl font-semibold mt-4">Track Your Progress</h3>
        <p>Measure flexibility, balance, and strength improvements over time.</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/personalize-icon.svg" alt="Personalized Recommendations" width={60} height={60} />
        <h3 className="text-xl font-semibold mt-4">Personalized Recommendations</h3>
        <p>Get tailored tips and guidance based on your performance.</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/feedback-icon.svg" alt="Real-Time Feedback" width={60} height={60} />
        <h3 className="text-xl font-semibold mt-4">Real-Time Feedback</h3>
        <p>Instant feedback and suggestions to improve your practice.</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/eco-icon.svg" alt="Sustainable & Eco-Friendly" width={60} height={60} />
        <h3 className="text-xl font-semibold mt-4">Sustainable & Eco-Friendly</h3>
        <p>Our products are designed with sustainability in mind.</p>
      </div>
    </div>
  </section>
  

  {/* Featured Products Section */}
  <section className="py-16 px-6 bg-gray-50 text-center">
    <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Example Product */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Image src="/product1.jpg" alt="Smart Yoga Mat" width={300} height={200} className="mb-4" />
        <h3 className="text-xl font-semibold">Smart Yoga Mat</h3>
        <p className="mb-4">Track your poses and alignment in real time.</p>
        <Link href="/products/1" className="px-4 py-2 bg-teal-700 rounded-lg text-white">Shop Now</Link>
      </div>
      {/* Add more products here */}
    </div>
    <Link href="/products" className="text-teal-700 mt-6 inline-block">View All Products</Link>
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
