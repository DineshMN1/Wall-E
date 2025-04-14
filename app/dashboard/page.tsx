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
        // Fetch data for all 5 rovers
        const roverIds = ['Rover-1', 'Rover-2', 'Rover-3', 'Rover-4', 'Rover-5'];
        const roverDataPromises = roverIds.map((roverId) =>
          Promise.all([
            fetch(`/api/rovers?roverId=${roverId}&dataType=status`),
            fetch(`/api/rovers?roverId=${roverId}&dataType=battery`),
            fetch(`/api/rovers?roverId=${roverId}&dataType=coordinates`),
            fetch(`/api/rovers?roverId=${roverId}&dataType=sensors`),
          ])
        );

        // Resolve all promises
        const roverDataResponses = await Promise.all(roverDataPromises);

        // Parse the response data for each rover and add it to the state
        const rovers = await Promise.all(
          roverDataResponses.map(async ([statusRes, batteryRes, coordRes, sensorRes], index) => {
            const status = await statusRes.json();
            const battery = await batteryRes.json();
            const coordinates = await coordRes.json();
            const sensors = await sensorRes.json();
        
            return {
              id: roverIds[index], // Assign the rover's ID
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

    // Fetch data initially
    fetchRoverData();

    // Fetch data every 2 seconds
    const intervalId = setInterval(fetchRoverData, 2000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Mobileview menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Simulation />
      <Analysis roversData={roversData} error={error} />
    </div>
  );
}

export default Dashboard;
