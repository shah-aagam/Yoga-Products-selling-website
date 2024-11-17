// import connectMongo from '@/lib/mongodb';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//     try {
//         await connectMongo();
//         const { name, email, password } = await req.json();
        
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         const user = new User({ name, email, password: hashedPassword });
//         await user.save();

//         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         return NextResponse.json({ success: true, message: 'User created', user });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         return NextResponse.json({ success: false, message: 'Error creating user', error: error.message }, { status: 500 });
//     }
// }

// export async function GET() {
//     try {
//         await connectMongo();
//         const users = await User.find();
//         return NextResponse.json({ success: true, users });
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         return NextResponse.json({ success: false, message: 'Error fetching users', error: error.message }, { status: 500 });
//     }
// }

import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {

        await connectMongo();

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User with this email already exists.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({
            success: true,
            message: 'User created successfully.',
            user: { name: newUser.name, email: newUser.email, _id: newUser._id },
            token,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ success: false, message: 'Error creating user.', error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {

        await connectMongo();
        const users = await User.find({}, '-password'); 

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ success: false, message: 'Error fetching users.', error: error.message }, { status: 500 });
    }
}
