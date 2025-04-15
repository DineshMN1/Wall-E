'use client'

import React, { useState, useEffect } from 'react';
import { Navbar } from '../component/Navbar';
import { Mobileview } from '../component/Mobilemenu';
import Simulation from './section/Simulation';
import Analysis from './section/Analysis';

type RoverData = {
  id: string;
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

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roversData, setRoversData] = useState<RoverData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoverData() {
      try {
        const roverIds = ['Rover-1', 'Rover-2', 'Rover-3', 'Rover-4', 'Rover-5'];
        const roverDataPromises = roverIds.map((roverId) =>
          Promise.all([
            fetch(`/api/rovers?roverId=${roverId}&dataType=status`),
            fetch(`/api/rovers?roverId=${roverId}&dataType=battery`),
            fetch(`/api/rovers?roverId=${roverId}&dataType=coordinates`),
            fetch(`/api/rovers?roverId=${roverId}&dataType=sensors`),
          ])
        );

        const roverDataResponses = await Promise.all(roverDataPromises);

        const rovers = await Promise.all(
          roverDataResponses.map(async ([statusRes, batteryRes, coordRes, sensorRes], index) => {
            const status = await statusRes.json();
            const battery = await batteryRes.json();
            const coordinates = await coordRes.json();
            const sensors = await sensorRes.json();

            return {
              id: roverIds[index],
              status: status.status,
              battery: battery.battery_level,
              coordinates: coordinates.coordinates,
              sensor_data: {
                temperature: sensors.temperature,
                soil_moisture: sensors.soil_moisture,
                soil_pH: sensors.soil_pH,
                battery_level: sensors.battery_level,
              },
            };
          })
        );

        setRoversData(rovers);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch rover data');
      }
    }

    fetchRoverData();
    const intervalId = setInterval(fetchRoverData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-16"> {/* Adjusted for fixed Navbar */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Mobileview menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <section id="simulation">
        <Simulation roversData={roversData} />
      </section>
      <section id="analysis">
        <Analysis roversData={roversData} error={error} />
      </section>

    </div>
  );
};

export default Dashboard;
