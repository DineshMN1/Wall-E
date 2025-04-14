import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, User, Settings, Bot } from "lucide-react";
import { useRouter } from "next/router";


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
                        {/* <Bot className="text-green-500 w-6 h-6" /> */}
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
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-black border border-green-500 px-4 py-2 rounded-xl shadow-[0_0_10px_2px_rgba(34,197,94,0.7)]"> */}
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-green-700 px-4 py-2 rounded-xl shadow-lg"> */}
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-gradient-to-r from-green-500 to-emerald-700 px-4 py-2 rounded-xl shadow-lg"> */}
                    {/*Its nice*/}
                    <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-white/10">
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-zinc-900/90 px-4 py-2 rounded-xl shadow-lg ring-1 ring-green-500/50"> */}
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-black/90 px-4 py-2 rounded-xl shadow-md hover:shadow-[0_0_20px_2px_rgba(34,197,94,0.4)] transition-shadow duration-300"> */}
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-green-400 bg-gradient-to-br from-black via-zinc-900 to-gray-800 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(0,255,128,0.3)] border border-green-500/20"> */}
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-black/90 px-4 py-2 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-[0_0_15px_4px_rgba(34,197,94,0.4)]"> */}
                    {/* <div className="hidden md:flex items-center space-x-6 font-bold text-white bg-black/90 px-4 py-2 rounded-xl shadow-inner border-2 border-green-500 animate-pulse-border"> */}


                        <Link href="/dashboard/#simulation" className="text-gray-200 hover:text-green-500 transition-colors">
                            Simulation
                        </Link>
                        <Link href="/dashboard/#analysis" className="text-gray-200 hover:text-green-500 transition-colors">
                            Analysis
                        </Link>
                        {/* <Link href="#irrigation" className="text-gray-300 hover:text-white transition-colors">
                            Irrigation
                        </Link>
                        <Link href="#pest" className="text-gray-300 hover:text-white transition-colors">
                            Pest Control
                        </Link>
                        <Link href="#fleet" className="text-gray-300 hover:text-white transition-colors">
                            Fleet Management
                        </Link> */}
                        <Link href="/Manage" className="text-gray-200 hover:text-green-500 transition-colors">
                            Manage
                        </Link>
                        <Link href="/ai" className="text-gray-200 hover:text-green-500 transition-colors">
                            AI Assist
                        </Link>
                    </div>

                    {/* Right side icons */}
                    <div className="hidden md:flex items-center space-x-4 text-white">
                        <Bell className="w-5 h-5 cursor-pointer hover:text-green-500" />
                        <User className="w-5 h-5 cursor-pointer hover:text-green-500" />
                        <Settings className="w-5 h-5 cursor-pointer hover:text-green-500" />
                    </div>
                </div>
            </div>
        </nav>
    );
};
