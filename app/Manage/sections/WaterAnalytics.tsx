import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WaterAnalytics: React.FC = () => {
  const dataForMaps = {
    field1: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [1500, 2500, 2000, 3000, 1200, 2200, 2800]
    },
    field2: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [1700, 2300, 1800, 2900, 1400, 2100, 2600]
    },
    field3: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [1600, 2400, 1900, 3100, 1300, 2300, 2700]
    }
  };

  const [selectedField, setSelectedField] = useState<'field1' | 'field2' | 'field3'>('field1');
  const selectedData = dataForMaps[selectedField];
  const totalUsage = selectedData.data.reduce((acc, value) => acc + value, 0);

  const cropTypes = {
    field1: 'Rice',
    field2: 'Wheat',
    field3: 'Sugarcane'
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 w-full">
      {/* Left section: Water analytics chart */}
      <div className="w-full md:w-[60%] p-4 bg-black text-white rounded-lg shadow">
        <h2 className="text-2xl font-bold">Water Usage Analytics for Crop Field</h2>

        {/* Field selection buttons - horizontally scrollable on mobile */}
        <div className="my-4 overflow-x-auto flex space-x-2 pb-1">
          {(['field1', 'field2', 'field3'] as const).map((fieldKey) => (
            <button
              key={fieldKey}
              onClick={() => setSelectedField(fieldKey)}
              className={`px-4 py-2 rounded min-w-[100px] flex-shrink-0 transition ${
                selectedField === fieldKey ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {fieldKey.replace('field', 'Field ')}
            </button>
          ))}
        </div>

        <p className="text-lg mb-4">
          Total water usage for the last 7 days: <strong>{totalUsage}</strong> Liters
        </p>

        {/* Bar chart */}
        <div style={{ height: '400px', width: '100%' }}>
          <Bar
            data={{
              labels: selectedData.labels,
              datasets: [
                {
                  label: 'Water Usage (in Liters)',
                  data: selectedData.data,
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }
              ]
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      {/* Right section: Farm details and Irrigation Insights */}
      <div className="w-full md:w-[40%] p-4 bg-gray-800 text-white rounded-lg shadow">
        <h3 className="text-xl mb-4">Farm Details</h3>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Farm Location:</h4>
          <p>
            {selectedField === 'field1'
              ? 'Farm 1, Region A'
              : selectedField === 'field2'
              ? 'Farm 2, Region B'
              : 'Farm 3, Region C'}
          </p>

          <h4 className="text-lg font-semibold mt-4">Crop Type:</h4>
          <p>Crop: {cropTypes[selectedField]}</p>

          <h4 className="text-lg font-semibold mt-4">Irrigation System:</h4>
          <p>Type: Drip Irrigation</p>
        </div>

        <div className="mt-8 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Irrigation Insights</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>Smart Irrigation Efficiency:</strong> Improved water usage efficiency by 25% compared to last season.</li>
            <li><strong>Total Water Saved:</strong> 12,450 liters</li>
            <li><strong>Precision Watering:</strong> 92% accuracy</li>
            <li><strong>Crop Yield Improvement:</strong> +18%</li>
            <li><strong>Energy Consumption:</strong> -15%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaterAnalytics;
