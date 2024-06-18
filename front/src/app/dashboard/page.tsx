"use client"

import { logout } from '@/libs'
import React from 'react'
import Cookies from 'js-cookie';

const page = () => {

  const handleLogout = () => {
    if(Cookies.get("session")){
      logout();
    }
  }

  return (
    <div onClick={handleLogout}>page</div>
  )
}

export default page