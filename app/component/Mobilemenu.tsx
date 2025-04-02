interface MobileviewProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

export const Mobileview = ({ menuOpen, setMenuOpen }: MobileviewProps) => {
    return (
        <div className={`fixed top-0 left-0 w-full bg-[rgba(10,10,10,0.8)] z-40 flex flex-col items-center justify-center 
                        transistion-all duration-300 ease-in-out  
                        ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}`}>
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
              aria-label="Close Menu"
            >
              &times;
            </button>
            <a
                  href="#simulation" 
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-semiboid text-white my-4 transform transition-transform duration-300 ease-in-out
                  ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
                > 
                Simulation 
                </a>
                <a
                  href="#analysis" 
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-semiboid text-white my-4 transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
                > 
                Analysis 
                </a>
                <a
                  href="#alerts" 
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-semiboid text-white my-4 transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
                > 
                Alerts 
                </a>
            
        </div>
    );
};
