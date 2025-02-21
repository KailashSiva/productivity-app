'use client'

import { useEffect, useState } from 'react'

export default function useSession() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        async function fetchSession() {
            const res = await fetch('/api/auth/session')
            if (res.ok) {
                const data = await res.json()
                setSession(data)
            }
        }
        fetchSession()
    }, [])

    return session
}