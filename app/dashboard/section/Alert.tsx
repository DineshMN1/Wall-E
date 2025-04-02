"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Rover {
  id: string;
  sensor_data?: {
    temperature?: number;
    soil_moisture?: number;
    soil_pH?: number;
  };
}

interface AlertProps {
  roversData?: Rover[];
}

const Alert: React.FC<AlertProps> = ({ roversData = [] }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null; // Prevents hydration mismatch

  const alerts = roversData
    .map((rover) => {
      const { id, sensor_data } = rover;
      const { temperature, soil_moisture, soil_pH } = sensor_data || {};
      const issues: string[] = [];

      if (temperature !== undefined && temperature > 40) issues.push("High Temperature");
      if (soil_moisture !== undefined && soil_moisture < 20) issues.push("Low Soil Moisture");
      if (soil_pH !== undefined && (soil_pH < 5.5 || soil_pH > 7.5)) issues.push("Soil pH Out of Range");

      return issues.length > 0 ? { roverId: id, issues } : null;
    })
    .filter(Boolean) as { roverId: string; issues: string[] }[];

  // Chart Data
  const chartData = alerts.map((alert) => ({
    name: alert.roverId,
    issues: alert.issues.length,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {alerts.length > 0 ? (
        <div className="bg-red-100 p-6 rounded-lg shadow-md w-3/4">
          <h2 className="text-xl font-semibold text-red-600 mb-4">⚠️ Alert: Issues Detected</h2>
          <ul className="list-disc pl-5 text-red-500">
            {alerts.map((alert, index) => (
              <li key={index}>
                <strong>Rover {alert.roverId}:</strong> {alert.issues.join(", ")}
              </li>
            ))}
          </ul>

          <div className="mt-6 w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#ff4d4f" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="issues" fill="#ff4d4f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-3/4">
          <h2 className="text-xl font-semibold text-green-600 mb-4">✅ All Systems Normal</h2>
          <p className="text-green-700">No alerts detected. All rovers are functioning within safe limits.</p>
        </div>
      )}
    </div>
  );
};

export default Alert;