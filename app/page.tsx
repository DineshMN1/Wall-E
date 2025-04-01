import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6 md:py-8 relative">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl ">Wall-E Rover</span>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">Dashboard</button>
            </Link>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Autonomous Rover Fleet Management
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Monitor, control, and analyze autonomous rovers in real-time with our intelligent fleet management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-500">
                  Get Started <span>&rarr;</span>
                </button>
              </Link>
              <Link href="#features">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-gray-200 rounded-lg">
  <Image
    src="/image4.jpg" 
    alt="Image description" 
    layout="fill" 
    objectFit="cover" 
  />
</div>
        </div>
      </header>

      {/* Footer Section */}
      <footer className="mt-35 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <span className="font-bold">Wall-E Rover</span>
          <div className="mt-2 text-sm text-gray-500">
            © {new Date().getFullYear()} Wall-E Rover. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}