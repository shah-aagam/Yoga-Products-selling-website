import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
    await connectMongo();

  const { id } = params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
