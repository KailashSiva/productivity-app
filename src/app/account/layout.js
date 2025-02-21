import React from 'react'
import LogoutButton from '../components/Logout'
import Sidebar from '../components/Sidebar/Sidebar'

export default function AccountLayout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Sidebar />
            <div>
                {children}
            </div>

        </div>
    )
}
