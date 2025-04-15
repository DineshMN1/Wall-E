'use client';

import React, { useState } from 'react';
import {
  ArrowBigUp,
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight
} from 'lucide-react';

const Simulation = ({ roversData }: { roversData: any[] }) => {
  const [message, setMessage] = useState('🟢 Ready');
  const [selectedRover, setSelectedRover] = useState('Rover-1');

  const handleControl = async (direction: string) => {
    try {
      const res = await fetch(`/api/flask/move?rover=${selectedRover}&dir=${direction}`);
      const data = await res.json();
      setMessage(data.message);
    } catch (err: any) {
      setMessage(`❌ ERROR: ${err.message}`);
    }
  };

  const handleSimulationAction = async (action: 'start' | 'reset') => {
    try {
      const res = await fetch(`/api/flask/${action}`);
      const data = await res.json();
      setMessage(data.message);
    } catch (err: any) {
      setMessage(`❌ ERROR: ${err.message}`);
    }
  };

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 md:px-12 bg-black text-white" id="simulation">
      <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center">Webots Simulation</h1>

      {/* Start/Reset Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-6 gap-4 mb-8">
        <button
          onClick={() => handleSimulationAction('start')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-48 sm:w-auto"
        >
          Start Simulation
        </button>
        <button
          onClick={() => handleSimulationAction('reset')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded w-48 sm:w-auto"
        >
          Reset Simulation
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Stream */}
        <div className="flex-1 text-center">
          <h2 className="text-lg sm:text-2xl mb-3">Live Simulation</h2>
          <img
            src="/api/flask/stream"
            alt="Live Stream"
            className="mx-auto border border-gray-500 rounded max-w-full"
          />
        </div>

        {/* RIGHT SIDE: Rover Buttons + Controls */}
        <div className="flex-1 flex flex-col items-center md:items-center">
          {/* Rover Selector Buttons - horizontal on desktop */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
            {['Rover-1', 'Rover-2', 'Rover-3', 'Rover-4', 'Rover-5'].map((rover, index) => (
              <button
                key={rover}
                onClick={() => setSelectedRover(rover)}
                className={`px-6 py-3 rounded text-sm font-semibold shadow transition-all duration-200
                  ${selectedRover === rover ? 'bg-green-600 text-white' : 'bg-zinc-800 text-white hover:bg-green-700'}`}
              >
                R{index + 1}
              </button>
            ))}
          </div>

          {/* Joystick Controls with Lucide Icons */}
          <div className="grid grid-cols-3 gap-3 w-fit mx-auto mt-4">
            <div></div>
            <button
              onClick={() => handleControl('forward')}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow"
              title="Forward"
            >
              <ArrowBigUp className="w-6 h-6" />
            </button>
            <div></div>

            <button
              onClick={() => handleControl('left')}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow"
              title="Left"
            >
              <ArrowBigLeft className="w-6 h-6" />
            </button>

            <div className="w-12 h-12 border-2 border-dashed border-gray-600 rounded-full opacity-20 mx-auto" />

            <button
              onClick={() => handleControl('right')}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow"
              title="Right"
            >
              <ArrowBigRight className="w-6 h-6" />
            </button>

            <div></div>
            <button
              onClick={() => handleControl('backward')}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow"
              title="Backward"
            >
              <ArrowBigDown className="w-6 h-6" />
            </button>
            <div></div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <p className="text-lg sm:text-xl font-semibold text-center mt-10">{message}</p>
    </section>
  );
};

export default Simulation;
