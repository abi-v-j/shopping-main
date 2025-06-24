import React from 'react'
import { Route, Routes } from 'react-router'
import AdminReg from '../admin/pages/adminReg/AdminReg'
import Category from '../admin/pages/adminReg/Category'
import SubCategory from '../admin/pages/adminReg/SubCategory'





const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="adminreg" element={<AdminReg />} />
             <Route path="addcategory" element={<Category />} />
            <Route path="addsubcategory" element={<SubCategory />} />
        </Routes>
        )
}

export default AdminRoutes