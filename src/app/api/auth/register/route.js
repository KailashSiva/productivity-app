import { NextResponse } from 'next/server'
import validateRegister from './validRegister'
import connectDB from '../../../../lib/mongodb'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../../../models/Users')

// pages/api/register.js
export async function POST(req) {
    try {
        await connectDB()
        const { firstName, lastName, email, password } = await req.json()
        const valid = validateRegister(firstName, lastName, email, password)

        if (valid.error) {
            return NextResponse.json({ error: valid.error }, { status: 400 })
        }

        // confirm that a user with email has not already
        // been registered
        const existingUser = await User.findOne({ email: email })
        console.log(existingUser)

        if (existingUser) {
            return NextResponse.json({
                error: 'User already registered with email'
            }, { status: 409 })
        }

        // create and save new user
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateCreated: Date.now(),
            tasks: []
        })

        await user.save()
        return NextResponse.json({
            success: 'Successful registration and login',
        }, { status: 201 });

    } catch (e) {
        console.log('server error when registering', e)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}



