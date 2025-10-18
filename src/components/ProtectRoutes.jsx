import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectRoutes({children, user}) {
    if(user){
        return children
    }else{
      return  <Navigate to="/login"/>
    }
 
}

export default ProtectRoutes
