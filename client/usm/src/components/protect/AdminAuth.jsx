import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdiminAuth = ({children}) => {
    const info =  useSelector(state=>state.admin.admin)
    if(info){
        return <Navigate to = {"/dashboard"}/>
    }
    return children
}

export default AdiminAuth
