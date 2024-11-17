import connectMongo from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        await connectMongo();

        const { email, password } = await req.json();
        
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return new Response(JSON.stringify({ success: false, message: 'Admin not found' }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid password' }), { status: 400 });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return new Response(JSON.stringify({ success: true, token }), { status: 200 });
    } catch (error) {
        console.error('Error during admin login:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server error', error: error.message }), { status: 500 });
    }
}

// admin's created are : (1)  "email": "kirtan@gmail.com",
//                             "password": "27676bchdu"

//                       (2)   email:"name@gmail.com"
//                             "password": "name"   