import { useEffect } from "react";
import Link from "next/link";

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
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="font-mono text-xl text-white font-bold">
                        Wall-<span className="text-green-500">E</span>
                    </Link>
                    <div
                        className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        &#9776; {/* Hamburger icon */}
                    </div>

                    <div className={`hidden md:flex items-center space-x-8 ${menuOpen ? "block" : "hidden"}`}>
                        <Link href="#simulation" className="text-gray-300 hover:text-white transition-colors">
                            Simulation
                        </Link>
                        <Link href="#analysis" className="text-gray-300 hover:text-white transition-colors">
                            Analysis
                        </Link>
                        <Link href="#alerts" className="text-gray-300 hover:text-white transition-colors">
                            Alerts
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
