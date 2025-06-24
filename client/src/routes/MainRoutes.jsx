import React from 'react'
import { Route, Routes } from 'react-router'
import GuestRoutes from './GuestRoutes'
import AdminRoutes from './AdminRoutes'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<GuestRoutes />} />
            <Route path="admin/*" element={<AdminRoutes />} />
        </Routes>
    )
}

export default MainRoutes