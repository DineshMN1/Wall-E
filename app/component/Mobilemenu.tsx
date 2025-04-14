interface MobileviewProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const Mobileview = ({ menuOpen, setMenuOpen }: MobileviewProps) => {
  return (
      <div
          className={`fixed top-0 left-0 w-full z-40 bg-[rgba(10,10,10,0.95)] backdrop-blur-sm flex flex-col items-center justify-center 
          transition-all duration-300 ease-in-out
          ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}`}
      >
          {/* Close button */}
          <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
              aria-label="Close Menu"
          >
              &times;
          </button>

          {/* Navigation links */}
          {["simulation", "analysis", "irrigation", "pest", "fleet", "ai"].map((section) => (
              <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 ease-in-out
                      ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
              >
                  {section
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
              </a>
          ))}
      </div>
  );
};
