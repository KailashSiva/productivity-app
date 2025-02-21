"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login"); // Redirect to login
    }

    return <button onClick={handleLogout}>Logout</button>;
}
