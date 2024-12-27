import connectMongo from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

// Add an item to the cart (POST)
export async function POST(req) {
  try {
    await connectMongo();

    const { userId, productId, quantity } = await req.json();
    const product = await Product.findById(productId);

    if (!product || product.stock < quantity) {
      return NextResponse.json({ error: 'Product not available or insufficient stock' }, { status: 400 });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
    return NextResponse.json({ message: 'Item added to cart', cart });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: 'Cart is empty', cart: [] });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    await connectMongo();

    const { userId, productId, action } = await req.json();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const item = cart.items.find(item => item.productId.equals(productId));

    if (!item) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }

    if (action === "decrement") {
      if (item.quantity <= 1) {
        return NextResponse.json({ error: 'Quantity cannot be less than 1' }, { status: 400 });
      }
      item.quantity -= 1;
    } else if (action === "increment") {
      item.quantity += 1;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await cart.save();

    return NextResponse.json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();

    const { userId, productId } = await req.json();  // Accept productId as well
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);  // Removes 1 item from the index

    await cart.save();

    return NextResponse.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}

