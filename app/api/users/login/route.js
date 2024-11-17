import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectMongo();

        const { email, password } = await req.json();
        
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid password' }), { status: 400 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({
            success: true,
            user: { name: user.name, email: user.email, _id: user._id },
            token,
        });
    } catch (error) {
        console.error('Error during user login:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server error', error: error.message }), { status: 500 });
    }
}
