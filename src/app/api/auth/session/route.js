import { verifyToken } from "@/lib/auth";

export async function GET(req) {
    const token = req.cookies.get("session")?.value || "";
    const user = verifyToken(token);

    if (!user) {
        return Response.json({ user: null }, { status: 401 });
    }

    return Response.json({ user }, { status: 200 });
}