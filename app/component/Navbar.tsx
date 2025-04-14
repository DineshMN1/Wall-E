import { useEffect, useRef, useState } from "react";
import { Bell, User, Settings } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dropdown } from "./Dropdown"; // Assuming Dropdown component is in the same directory

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

export const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Image
              src="/fav.ico"
              alt="Wall-E Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <Link href="/" className="font-mono text-xl text-white font-bold">
              Wall-<span className="text-green-500">E</span>
            </Link>
          </div>

          {/* Hamburger menu for mobile */}
          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </div>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-white/10">
            <Link href="/dashboard/#simulation" className="text-gray-200 hover:text-green-500 transition-colors">
              Simulation
            </Link>
            <Link href="/dashboard/#analysis" className="text-gray-200 hover:text-green-500 transition-colors">
              Analysis
            </Link>
            <Link href="/Manage" className="text-gray-200 hover:text-green-500 transition-colors">
              Manage
            </Link>
            <Link href="/ai" className="text-gray-200 hover:text-green-500 transition-colors">
              AI Assist
            </Link>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4 text-white">
            {/* Alerts Dropdown */}
            <Dropdown
              icon={<Bell className="w-5 h-5" />}
              label="Alerts"
              onClick={() => {
                toast.success("Irrigation is finished ✅", {
                  position: "top-right",
                  autoClose: 5000,
                  theme: "dark",
                });
                toast.error("Found new pests 🚨", {
                  position: "top-right",
                  autoClose: 5000,
                  theme: "dark",
                });
              }}
            >
              <p className="px-4 py-2 text-sm text-gray-400">Click to view recent alerts</p>
            </Dropdown>

            {/* Admin Dropdown */}
            <Dropdown icon={<User className="w-5 h-5" />} label="Admin">
              <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-800 w-full text-left">
                Settings
              </Link>
              <button className="block px-4 py-2 text-sm hover:bg-gray-800 w-full text-left">
                Logout
              </button>
            </Dropdown>

            {/* Settings Icon */}
            <Settings className="w-5 h-5 cursor-pointer hover:text-green-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};
