import connectMongo from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';


export async function GET(req, res) {
  try {
    await connectMongo();
    const bestSellers = await Product.find()
      .sort({ purchased: -1 }) // Sort by the 'purchased' field
      .limit(4); // Limit to 4 products

      console.log("Best Sellers:", bestSellers); // Log the data

    if (bestSellers.length === 0) {
      return res.status(200).json([]); // Return an empty array if no data
    }

     return NextResponse.json(bestSellers);
  } catch (error) {
    return NextResponse({ message: "Error fetching best sellers", error });
  }
}