import React from 'react'
import { Link } from 'react-router'

const Login = () => {
  return (
    <div>
        <table>
            <tr>
                <td>Email</td>
                <td><input type="text" name="" id="" /></td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="text" name="" id="" /></td>
            </tr>
            <tr>
                <td><input type="submit" value="Login" /></td>
            </tr>
            <Link to={"/guest/registration"} >Register</Link>
        </table>
    </div>
  )
}

export default Login