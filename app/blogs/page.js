"use client"
import React , {useState , useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

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
      { blogs.length > 0 ?
        blogs.slice(0,2).map( blog => (
          <div key={blog._id} className='bg-white m-10 px-8 pt-8 pb-7 border shadow-md rounded-md flex gap-20 relative'>
            {/* image */}
            <div>
              <Image src={blog.imageurl} alt="Image" width={1000} height={700} className='!w-full mb-3 hover:opacity-85 rounded-md'></Image>
              <p>Date: <span className='italic'>{blog.formattedDate}</span> </p>
            </div>

            {/* content */}
            <div>
              <h3 className="text-3xl font-semibold mb-4">{blog.title}</h3>
              <p className='text-lg mb-6 indent-4'>{blog.description}</p>
              <Link href={`/blogs/${blog._id}`} className="px-4 py-2 bg-teal-500 rounded-lg text-white no-underline ">Read More</Link>
            </div>
          </div>
        )) : (
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='bg-white m-10 px-8 pt-8 pb-7 border shadow-md rounded-md flex gap-20 relative'>
            {/* image */}
            <div>
              <Skeleton width={350} height={200} className='mb-3 rounded-md' />
              <Skeleton width={150} height={20} />
            </div>

            {/* content */}
            <div>
              <Skeleton width={200} height={25} className="text-3xl font-semibold mb-4" />
              <Skeleton count={4} height={15} width={900} className='text-lg mb-6 indent-4' />
              <Skeleton width={150} height={30} className="px-4 py-2 bg-teal-500 rounded-lg text-white no-underline " />
            </div>
          </div>
          ))
        )
      }


        <div className='grid grid-cols-1 lg:grid-cols-3 !gap-10 mx-5 mb-7'>
          { blogs.length > 0 ? blogs.slice(2).map((blog) => (
            <Link href={`/blogs/${blog._id}`}  key={blog._id} className='no-underline text-black' >
            <div className='w-full'>
              <Image 
                src={blog.imageurl} 
                alt="Image" 
                width={450} 
                height={700} 
                className='h-60 mb-3 hover:opacity-85 rounded-md'
              />
              <p className='font-semibold'>{blog.title}</p>
            </div>
           </Link>
          )):(
            Array.from({length : 4}).map((_,index) => (
              <div key={index}>
                <Skeleton width={450}  height={250} className='px-10 rounded-3xl' />
                {/* <p className='font-semibold'>{blog.title}</p> */}
                <Skeleton  width={300} height={25} />
              </div>
            ))
          )}
        </div>
    </>
  );
};

export default blogs