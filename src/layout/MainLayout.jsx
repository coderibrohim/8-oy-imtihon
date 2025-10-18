import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function MainLayout() {
  return (
    <div>
      <header><Navbar/></header>
      <Outlet/>
    </div>
  )
}

export default MainLayout
