import User from "../../../models/Users";
import Task from '../../../models/Task'
import { verifyToken } from "../../../../lib/auth"
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb"


export async function POST(req) {
    try {
        await connectDB()
        const token = req.cookies.get("session")?.value || null;
        console.log(token, 'token')
        const session = await verifyToken(token);
        console.log('session', session)

        const user = await User.findOne({ email: session.email })
        console.log('user', user)

        const { description, dateInput, priority } = await req.json();
        console.log('req info', description, dateInput, priority)
        // create new Task 
        const newTask = new Task({
            task: description,
            priority: priority.toLowerCase(),
            dueDate: dateInput,
        })

        await newTask.save()
        user.tasks.push(newTask._id);
        await user.save();


        // and append to user list



        return NextResponse.json({ message: 'Successfully created new task', _id: newTask._id }, { status: 200 })

    } catch (e) {
        console.log('error creating new task', e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}