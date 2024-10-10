import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminiLoginAuth = ({children}) => {
    const info =  useSelector(state=>state.admin.admin)
    if(!info){
        return <Navigate to = {"/admin"}/>
    }
    return children
}

export default AdminiLoginAuth
