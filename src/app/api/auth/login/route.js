import { NextResponse } from 'next/server'

import { generateToken } from '../../../../lib/auth';
import { serialize } from 'cookie';

import connectDB from '../../../../lib/mongodb'
const bcrypt = require('bcrypt');
const User = require('../../../models/Users')

// pages/api/register.js
export async function POST(req) {
    try {
        await connectDB()
        const { email, password } = await req.json()


        // confirm that a user with email has not already
        // been registered
        const existingUser = await User.findOne({ email: email })
        console.log(existingUser)

        if (!existingUser) {
            return NextResponse.json({
                error: 'Invalid email or password'
            }, { status: 401 })
        }

        const correctPassword = bcrypt.compare(password, existingUser.password)
        if (!correctPassword) {
            return NextResponse.json({
                error: 'Invalid email or password'
            }, { status: 401 })
        }
        console.log('creating token')
        const token = await generateToken({ email })
        const cookie = serialize("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });
        console.log(token, 'token')
        console.log(cookie, 'cookie')

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Set-Cookie": cookie },
        });

    } catch (e) {
        console.log('server error when registering', e)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}



