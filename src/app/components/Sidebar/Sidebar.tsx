import React from 'react'
import LogoutButton from '../Logout'
import Link from 'next/link'

// sidebar options:

// taskboard

// eisenhower matrix

// daily to-do

// daily habits

// non-negotiables

// enjoyment


export default function Sidebar() {

    return (
        <div>
            <h1>Sidebar</h1>
            {/* Make collapsible in the future */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>

                <button>Dashboard</button>
                <button>Daily Todo List</button>
                {/* 
                    Fetch tasks on the taskboard
                    and display to add to the to-do list
                */}
                <button>Settings</button>
                <button>Habit Tracker</button>
                <button>Three Priorities</button>
                <button> <Link href="/account/study">Study Session</Link></button>
                <LogoutButton />
            </div>
        </div >
    )
}
