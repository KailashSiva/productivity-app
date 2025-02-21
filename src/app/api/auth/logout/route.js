import { serialize } from "cookie";

export async function POST() {
    // Clear cookie
    const cookie = serialize("session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1, // Expire immediately
        path: "/",
    });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Set-Cookie": cookie },
    });
}
