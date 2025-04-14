import { useEffect, useRef, useState } from "react";
import { Bell, User, Settings } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  onClick?: () => void; // Option to trigger an external function when clicked
}

export const Dropdown = ({ icon, label, children, onClick }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    setOpen(!open);
    onClick?.(); // Trigger any external onClick logic (like showing toast)
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="cursor-pointer hover:text-green-500 relative group"
        onClick={handleClick}
      >
        {icon}
        <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {label}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-xl border border-zinc-700 z-50 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
