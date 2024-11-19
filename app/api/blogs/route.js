import connectMongo from "@/lib/mongodb"
import Blog from "@/models/Blog";
import { NextResponse } from "next/server"

export async function POST(req){
   try{
    await connectMongo();

    const { title , description , imageurl } = await req.json()

    const blog = new Blog({ title , description , imageurl })
    await blog.save()

    return NextResponse.json({ message: 'Blog created', blog });
   }
   catch(error){
    console.log(error)
    return NextResponse.json({ message: 'Error creating user', error: error.message })
   }
}

export async function GET(){
    try{
        await connectMongo()
    const blogs = await  Blog.find()
    return NextResponse.json(blogs)
    }catch(error){
        console.log(error)
    }
}

export async function DELETE(req){

   try {
      await connectMongo();
      const { id } = await req.json();

      const deletedBlog = await Blog.findByIdAndDelete(id)

      if (!deletedBlog) {
        return NextResponse.json({ error: 'Blog not found!' }, { status: 404 });
      }
    
      return NextResponse.json({ message: 'Blog deleted successfully!' });

   } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message })
   }

}