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
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Update a product (PUT)
export async function PUT(req) {
  const { id, name, description, price, stock, imageUrl } = await req.json();

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, description, price, stock, imageUrl },
    { new: true }
  );

  if (!updatedProduct) {
    return NextResponse.json({ error: 'Product not found!' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Product updated successfully!', updatedProduct });
}

// Delete a product (DELETE)
export async function DELETE(req) {
  const { id } = await req.json();

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return NextResponse.json({ error: 'Product not found!' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Product deleted successfully!' });
}
