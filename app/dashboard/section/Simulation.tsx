'use client';
import React, { useState } from 'react';

const Simulation = () => {
  const [message, setMessage] = useState('🟢 Ready');

  const handleControl = async (action: 'start' | 'reset') => {
    try {
      const res = await fetch(`/api/flask/${action}`);  // 🔁 proxy URL
      const data = await res.json();
      setMessage(data.message);
    } catch (err: any) {
      setMessage(`❌ ERROR: ${err.message}`);
    }
  };

  return (
    <section className="min-h-screen py-20 bg-black text-white text-center">
      <h1 className="text-3xl font-bold mb-4">🌐 Webots Simulation Controller</h1>

      <div className="mb-4">
        <button
          onClick={() => handleControl('start')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mx-2 rounded"
        >
          Start Simulation
        </button>
        <button
          onClick={() => handleControl('reset')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mx-2 rounded"
        >
          Reset Simulation
        </button>
      </div>

      <p className="text-xl font-semibold mb-6">{message}</p>

      <h2 className="text-2xl mb-2">👾 Live Simulation Feed</h2>
      <img
        src="/api/flask/stream"  // 🔁 Proxy path
        alt="Live Stream"
        width={800}
        className="mx-auto border border-gray-400"
      />

      <h2 className="text-xl mt-10 mb-2">Simulation Preview</h2>
      <img
        src="/simulation-preview.jpg"
        alt="Simulation Preview"
        width={800}
        className="mx-auto border border-gray-400"
      />
    </section>
  );
};

export default Simulation;
