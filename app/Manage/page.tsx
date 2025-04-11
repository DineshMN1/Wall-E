"use client"
import React from 'react'
import { Navbar } from '../component/Navbar'
import { Mobileview } from '../component/Mobilemenu'
import { useState } from 'react'


const Controls = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (<>
    <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <Mobileview menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  )
}

export default Controls