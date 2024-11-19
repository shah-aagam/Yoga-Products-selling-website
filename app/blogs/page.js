"use client"
import React , {useState , useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment'

const blogs = () => {

   const [ blogs , setBlogs ] = useState([])

   const formatDate = (dateString) => {
    return moment(dateString).format('DD/MM/YY'); // Format to DD/MM/YY
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error("Failed to fetch blogs");
  
      const data = await res.json();
  
      // Sort the blogs in descending order of date
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // Format date for each blog
      const formattedBlogs = sortedData.map(blog => ({
        ...blog,
        formattedDate: formatDate(blog.date),
      }));
  
      setBlogs(formattedBlogs);
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
     fetchBlogs()
   }, [])
   


  return (
    <>

      <div className='text-2xl font-bold flex justify-center items-center mx-60 p-4 border-b'>Latest Blogs</div>
      {
        blogs.slice(0,2).map( blog => (
          <div key={blog._id} className='bg-white m-10 px-8 pt-8 pb-7 border shadow-md rounded-md flex gap-10 relative'>
            {/* <button className='bg-red-500 absolute right-4 top-5 px-5 py-2 text-white rotate-45'>Latest</button> */}
            {/* image */}
            <div>
              <Image src={blog.imageurl} alt="Image" width={350} height={200} className='mb-3 hover:opacity-85 rounded-md'></Image>
              <p>Date: <span className='italic'>{blog.formattedDate}</span> </p>
            </div>

            {/* content */}
            <div>
              <h3 className="text-3xl font-semibold mb-4">{blog.title}</h3>
              <p className='text-lg mb-6 indent-4'>{blog.description}</p>
              <Link href={`/blogs/${blog._id}`} className="px-4 py-2 bg-teal-500 rounded-lg text-white no-underline ">Read More</Link>
            </div>
          </div>
        ))
      }


      {/* <div className='flex mx-5'>
        <div className='m-10'>
          <Image src="/home-img.jpg" alt="Image" width={300} height={600} className='h-52 w-96 mb-3 hover:opacity-85 rounded-md'></Image>
          <p className=' font-semibold'>Yoga a Necessity</p>
        </div>
        <div className='m-10'>
          <Image src="/smart-mat.jpg" alt="Image" width={500} height={400} className='h-52 mb-3 hover:opacity-85 rounded-md'></Image>
          <p className=' font-semibold'>Yoga Equipments you should have</p>        
        </div>
        <div className='m-10'>
          <Image src="/yoga.jpg" alt="Image" width={500} height={400} className='h-52 mb-3 hover:opacity-85 rounded-md'></Image>
          <p className=' font-semibold'>Advantages of different yoga poses</p>
        </div>
      </div> */}

      
      {/* <div className='flex mx-5 mb-7'>
        {
         blogs.slice(2,).map( (blog) => (
          <div key={blog._id} className='mx-10'>
            <Image src="/smart-mat1.png" alt="Image" width={500} height={600} className='h-60 mb-3 hover:opacity-85 rounded-md'></Image>
            <p className=' font-semibold'>{blog.title}</p>
          </div>
         ))
        }
        </div> */}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mx-5 mb-7'>
          {blogs.slice(2).map((blog) => (
            <div key={blog._id} className='w-full'>
              <Image 
                src="/smart-mat1.png" 
                alt="Image" 
                width={500} 
                height={600} 
                className='h-60 mb-3 hover:opacity-85 rounded-md'
              />
              <p className='font-semibold'>{blog.title}</p>
            </div>
          ))}
        </div>

        {/* <div className='mx-10'>
          <Image src="/smart-wear.png" alt="Image" width={300} height={400} className='h-60 mb-3 hover:opacity-85 rounded-md'></Image>
          <p className=' font-semibold'>New technologies evolving in field of yoga!</p>
        </div>
        <div className='mx-10 mb-5'>
          <Image src="/home-img.jpg" alt="Image" width={400} height={400} className='h-60 mb-3 hover:opacity-85 rounded-md'></Image>
          <p className=' font-semibold'>4 days a week help you be stress free.</p>
        </div>
      </div> */}

    </>
  )
}

export default blogs