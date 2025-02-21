import User from "../../models/Users";
import Task from '../../models/Task'
import { verifyToken } from "../../../lib/auth"
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb"


export async function GET(req) {
    try {
        await connectDB()
        const token = req.cookies.get("session")?.value || null;
        console.log(token, 'token')
        if (!token) {
            console.log('not signed in')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const session = await verifyToken(token);
        console.log('session', session)

        if (!session) {
            return Response.json({ error: 'invalid session' }, { status: 401 });
        }
        // find tasks associated with that user

        const user = await User.findOne({ email: session.email }).populate('tasks')
        console.log('user', user)

        return NextResponse.json({ tasks: user.tasks }, { status: 200 })

    } catch (e) {
        console.log('error fetching tasks', e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}