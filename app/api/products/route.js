import connectMongo from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectMongo();

  const { name, description, price, stock , imageUrl } = await req.json();

  const product = new Product({ name, description, price, stock , imageUrl });
  await product.save();

  return NextResponse.json({ message: 'Product created', product });
}

export async function GET() {
  try{
    await connectMongo();
  const products = await Product.find();
  return NextResponse.json(products);
  }catch(error){
    console.log(error)
  }
}
