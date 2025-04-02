'use client';
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

type RoverData = {
  id: string;
  battery?: number;
  coordinates?: number[];
  sensor_data?: {
    temperature?: number;
    soil_moisture?: number;
    soil_pH?: number;
    battery_level?: number;
  };
  error?: string;
};

// 🧠 Calculate status
const getRoverStatus = (sensorData: RoverData['sensor_data']): string => {
  if (!sensorData) return 'N/A';

  const { temperature, soil_moisture, soil_pH } = sensorData;

  // You can fine-tune these thresholds
  const isTempOk = temperature !== undefined && temperature >= 10 && temperature <= 40;
  const isMoistureOk = soil_moisture !== undefined && soil_moisture >= 30 && soil_moisture <= 80;
  const isPhOk = soil_pH !== undefined && soil_pH >= 5.5 && soil_pH <= 7.5;

  if (isTempOk && isMoistureOk && isPhOk) return 'Good';
  if (!isTempOk && isMoistureOk && isPhOk) return 'High/Low Temp';
  if (isTempOk && !isMoistureOk && isPhOk) return 'Moisture Issue';
  if (isTempOk && isMoistureOk && !isPhOk) return 'pH Issue';

  return 'Needs Attention';
};

const Analysis = ({
  roversData,
  error
}: { roversData: RoverData[], error: string | null }) => {
  const formattedData = roversData.map((r1, index) => ({
    name: `R${index + 1}`,
    temperature: r1.sensor_data?.temperature ?? null,
    soil_moisture: r1.sensor_data?.soil_moisture ?? 0,
    soil_pH: r1.sensor_data?.soil_pH ?? null,
  }));

  return (
    <section id="analysis" className="min-h-screen py-20">
      <h2 className="text-3xl font-bold text-center mb-8">Data Analysis</h2>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {roversData.length === 0 && !error && <p className="text-gray-600 text-center">Loading...</p>}

      {roversData.length > 0 && (
        <div className="overflow-x-auto max-w-7xl mx-auto px-4">
          <table className="w-full border-collapse border border-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2">Rover</th>
                <th className="border border-gray-600 px-4 py-2">Status</th>
                <th className="border border-gray-600 px-4 py-2">Temperature (°C)</th>
                <th className="border border-gray-600 px-4 py-2">Soil Moisture (%)</th>
                <th className="border border-gray-600 px-4 py-2">Soil pH</th>
              </tr>
            </thead>
            <tbody>
              {roversData.map((r1, index) => (
                <tr key={r1.id || index} className="text-center">
                  <td className="border border-gray-600 px-4 py-2">R{index + 1}</td>
                  <td className="border border-gray-600 px-4 py-2">{getRoverStatus(r1.sensor_data)}</td>
                  <td className="border border-gray-600 px-4 py-2">{r1.sensor_data?.temperature ?? 'N/A'}</td>
                  <td className="border border-gray-600 px-4 py-2">{r1.sensor_data?.soil_moisture ?? 'N/A'}</td>
                  <td className="border border-gray-600 px-4 py-2">{r1.sensor_data?.soil_pH ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-center text-white">Temperature</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={formattedData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={2} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-center text-white">Soil Moisture</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={formattedData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="soil_moisture" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-center text-white">Soil pH</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={formattedData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="soil_pH" stroke="#FF8042" strokeWidth={2} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Analysis;
