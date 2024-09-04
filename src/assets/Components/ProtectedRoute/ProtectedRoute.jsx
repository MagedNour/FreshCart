import React, { useContext } from 'react'
import { AuthContext } from '../../../Contexts/authContext.jsx'
import { Navigate } from 'react-router-dom';
import Login from '../Login/Login.jsx';

export default function ProtectedRoute({ children }) {

  const { userToken } = useContext(AuthContext);

  return (
    <>
      {userToken? children: <Login/>}
    </>
  )
}
