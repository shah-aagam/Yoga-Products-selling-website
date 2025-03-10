import connectMongo from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongo();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Admin not found' },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 400 }
      );
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const adminDetails = {
      id: admin._id,
      email: admin.email,
      name: admin.name, 
    };

    return NextResponse.json(
      {
        success: true,
        token,
        admin: adminDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}


// admin's created are : (1)  "email": "kirtan@gmail.com",
//                             "password": "27676bchdu"

//                       (2)   email:"name@gmail.com"
//                             "password": "name"   