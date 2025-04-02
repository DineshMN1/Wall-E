"use client";

import React, { useEffect, useState } from "react";

const Alert: React.FC = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null; // Prevents hydration mismatch

  // Constant dummy alerts
  const alertMessage = "Rover R1: High Temperature, Low Soil Moisture";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mx-[400px]">
      <div className="bg-red-100 p-6 rounded-lg shadow-md w-3/4">
        <h2 className="text-xl font-semibold text-red-600 mb-4">⚠️ Alert</h2>
        <p className="text-xl text-red-500">{alertMessage}</p>
      </div>
    </div>
  );
};

export default Alert;
