import React from 'react'
import Login from '../guest/pages/login/Login'
import { Route, Routes } from 'react-router'
import Registration from '../guest/pages/registration/Registration'


const GuestRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Login />} />
            <Route path="registration" element={<Registration/>} />
        </Routes>
        )
}

export default GuestRoutes