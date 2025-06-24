import React from 'react'
import { Route, Routes } from 'react-router'
import AdminReg from '../admin/pages/adminReg/AdminReg'



const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="adminreg" element={<AdminReg />} />
        </Routes>
        )
}

export default AdminRoutes