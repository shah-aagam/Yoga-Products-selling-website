import connectMongo from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectMongo();
        const { name, email, password } = await req.json();
        

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();

        return NextResponse.json({ success: true, message: 'Admin created', admin });
    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({ success: false, message: 'Error creating admin', error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongo();
        const admins = await Admin.find();
        return NextResponse.json({ success: true, admins });
    } catch (error) {
        console.error('Error fetching admins:', error);
        return NextResponse.json({ success: false, message: 'Error fetching admins', error: error.message }, { status: 500 });
    }
}
