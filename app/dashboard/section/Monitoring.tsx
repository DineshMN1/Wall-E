'use client';
import React, { useEffect, useState } from 'react';

type RoverData = {
  status?: string;
  battery?: number;
  coordinates?: number[];
  sensor_data?: {
    temperature: number;
    soil_moisture: number;
    soil_pH: number;
    battery_level: number;
  };
  error?: string;
};

const Monitoring = () => {
  const [roverData, setRoverData] = useState<RoverData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoverData() {
      try {
        const [statusRes, batteryRes, coordRes, sensorRes] = await Promise.all([
          fetch('/api/rovers/Rover-1/status'),
          fetch('/api/rovers/Rover-1/battery'),
          fetch('/api/rovers/Rover-1/coordinates'),
          fetch('/api/rovers/Rover-1/sensors'), // if you used `/sensor-data`, rename here
        ]);

        const status = await statusRes.json();
        const battery = await batteryRes.json();
        const coordinates = await coordRes.json();
        const sensors = await sensorRes.json();

        setRoverData({
          status: status.status,
          battery: battery.battery_level,
          coordinates: coordinates.coordinates,
          sensor_data: {
            temperature: sensors.temperature,
            soil_moisture: sensors.soil_moisture,
            soil_pH: sensors.soil_pH,
            battery_level: sensors.battery_level,
          },
        });
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch rover data');
      }
    }

    fetchRoverData();
  }, []);

  return (
    <section id="monitoring" className="min-h-screen flex flex-col items-center justify-center py-20 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🌱 Rover-1 Monitoring Dashboard</h1>

      {error && <p className="text-red-600">{error}</p>}
      {!roverData && !error && <p className="text-gray-600">Loading...</p>}

      {roverData && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <p><strong>Status:</strong> {roverData.status}</p>
          <p><strong>Battery:</strong> 🔋 {roverData.battery}%</p>
          <p><strong>Coordinates:</strong> 📍 {roverData.coordinates?.join(', ')}</p>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold">🌡️ Sensor Data:</h2>
            <ul className="list-disc ml-6">
              <li>Temperature: {roverData.sensor_data?.temperature} °C</li>
              <li>Soil Moisture: {roverData.sensor_data?.soil_moisture}%</li>
              <li>Soil pH: {roverData.sensor_data?.soil_pH}</li>
              <li>Battery Level: {roverData.sensor_data?.battery_level}%</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Monitoring;
