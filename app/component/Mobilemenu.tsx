interface MobileviewProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
  }
  
  export const Mobileview = ({ menuOpen, setMenuOpen }: MobileviewProps) => {
    const handleScroll = (targetId: string) => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      }
    };
  
    return (
      <div
        className={`fixed top-0 left-0 w-full z-40 bg-[rgba(10,10,10,0.95)] backdrop-blur-sm flex flex-col items-center justify-center 
          transition-all duration-300 ease-in-out
          ${menuOpen ? 'h-screen opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'}`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
          aria-label="Close Menu"
        >
          &times;
        </button>
  
        {/* Mobile Nav Links (matching Navbar) */}
        {[
          { name: 'Simulation', id: 'simulation' },
          { name: 'Analysis', id: 'analysis' },
          { name: 'Manage', href: '/Manage' },
          { name: 'AI Assist', href: '/ai' },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => item.id ? handleScroll(item.id) : window.location.assign(item.href!)}
            className="text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ease-in-out"
          >
            {item.name}
          </button>
        ))}
      </div>
    );
  };
  