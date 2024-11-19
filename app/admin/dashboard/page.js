'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', description: '', price: '', stock: '', imageUrl: '' });
  const [blogForm, setBlogForm] = useState({ title: '', description: '', imageUrl: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [blogSearchTerm, setBlogSearchTerm] = useState('');

  // Fetch all products
  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchBlogs();
  }, []);

  // Handle product form input change
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle blog form input change
  const handleBlogInputChange = (e) => {
    const { name, value } = e.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update product
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = '/api/products';
    
    const payload = {
      id: form.id,
      name: form.name,
      description: form.description,
      price: form.price,
      stock: form.stock,
      imageUrl: form.imageUrl
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchProducts();
      setForm({ id: '', name: '', description: '', price: '', stock: '', imageUrl: '' });
      setIsEdit(false);
      setShowProductModal(false);
    }
  };

    // Edit a product
    const handleEdit = (product) => {
      setForm({
        id: product._id, // Ensure `_id` is mapped to `id` for the backend
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
      });
      setIsEdit(true);
      setShowProductModal(true);
    };

  // Add or update blog
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const method = 'POST';
    const url = '/api/blogs';
    
    const payload = {
      title: blogForm.title,
      description: blogForm.description,
      imageurl: blogForm.imageUrl
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchBlogs();
      setBlogForm({ title: '', description: '', imageUrl: '' });
      setShowBlogModal(false);
    }
  };

  // Delete product
  const handleProductDelete = async (id) => {
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  // Delete blog
  const handleBlogDelete = async (id) => {
    await fetch('/api/blogs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBlogs();
  };

  const sectionToDisplay = (sectionId) => {
    const section = document.getElementById(sectionId)
    if(section){
      section.scrollIntoView({ behavior: "smooth" })
    }
  }


  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between items-center mt-4 border-b'>
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className='flex gap-8'>
        <p onClick={() => {sectionToDisplay('products')}} className='cursor-pointer'>Products</p>
        <p onClick={() => {sectionToDisplay('blogs')}} className='cursor-pointer'>Blogs</p>
      </div>
      </div>

      {/* Products Section */}
      <div id="products" className="mb-8 mt-4">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>

        {/* Product Navbar */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-1/2"
          />
          <button
            onClick={() => setShowProductModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add New Product
          </button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow-md flex flex-col min-h-64"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                <p className="text-sm text-gray-500 flex-grow">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-teal-600 font-semibold">
                    ₹{product.price}
                  </span>
                  <span className="text-gray-600">Stock: {product.stock}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleProductDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Blog Section */}
      <div id="blogs">
        <h2 className="text-2xl font-semibold mb-4">Blogs</h2>

        {/* Blog Navbar */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search blogs by title"
            value={blogSearchTerm}
            onChange={(e) => setBlogSearchTerm(e.target.value)}
            className="border p-2 w-1/2"
          />
          <button
            onClick={() => setShowBlogModal(true)}
            className="bg-teal-500 text-white px-4 py-2 rounded-md"
          >
            Add New Blog
          </button>
        </div>

        {/* Blog List */}
        <ul className="space-y-6 mt-6">
          {blogs
            .filter((blog) =>
              blog.title.toLowerCase().includes(blogSearchTerm.toLowerCase())
            )
            .map((blog) => (
              <li
                key={blog._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row gap-6 p-6"
              >
                {/* Image Section */}
                <div className="md:w-1/3">
                  <img
                    src={blog.imageurl}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-md transition-opacity duration-300 hover:opacity-80"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Date: <span className="italic">16/11/2024</span>
                  </p>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 flex flex-col">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 mb-4 flex-grow">
                    {blog.description}
                  </p>
                  {/* Delete Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleBlogDelete(blog._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                    >
                      Delete Blog
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleProductSubmit} className="space-y-2">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleProductInputChange}
                className="border p-2 w-full"
                required
              />
              <textarea
                name="description"
                placeholder="Product Description"
                value={form.description}
                onChange={handleProductInputChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleProductInputChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleProductInputChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleProductInputChange}
                className="border p-2 w-full"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-md"
                >
                  {isEdit ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
            <form onSubmit={handleBlogSubmit} className="space-y-2">
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={blogForm.title}
                onChange={handleBlogInputChange}
                className="border p-2 w-full"
                required
              />
              <textarea
                name="description"
                placeholder="Blog Description"
                value={blogForm.description}
                onChange={handleBlogInputChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={blogForm.imageUrl}
                onChange={handleBlogInputChange}
                className="border p-2 w-full"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-md"
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
