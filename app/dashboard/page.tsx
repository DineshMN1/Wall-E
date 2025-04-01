"use client"
import React , { useState } from 'react'
import { Navbar } from '../component/Navbar'
import { Mobileview } from '../component/Mobilemenu';
import Simulation from './section/Simulation';
import Monitoring from './section/Monitoring';
import Analysis from './section/Analysis';
import Alert from './section/Alert';

const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
    <div className="min-h-screen bg-black text-gray-100">
    <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <Mobileview menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <Simulation/>
    <Monitoring/>
    <Analysis/>
    <Alert/>
    </div>
    </>
  )
}


//<span className="w-6 h-6 rounded-4xl animate-breathe"><span className="w-4 h-4 rounded-4xl bg-green-500"></span></span>
export default Dashboard