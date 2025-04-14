import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roverData = [
  { id: 1, name: 'Rover Alpha', battery: 35, status: 'Active' },
  { id: 2, name: 'Rover Beta', battery: 60, status: 'Standby' },
  { id: 3, name: 'Rover Gamma', battery: 80, status: 'Charging' },
  { id: 4, name: 'Rover Delta', battery: 25, status: 'Maintenance' },
  { id: 5, name: 'Rover Epsilon', battery: 45, status: 'Active' },
];

const Rover: React.FC = () => {
  const [selectedRover, setSelectedRover] = useState<number | null>(1); 
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string>('');

  const getBatteryColor = (battery: number) => {
    if (battery >= 70) return 'bg-green-500';
    if (battery >= 40) return 'bg-yellow-500';
    if (battery >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const selectedRoverData = selectedRover ? roverData.find((r) => r.id === selectedRover) : null;

  const showSuccessToast = () => {
    toast.success(`Rover dispatched to ${selectedField} for ${selectedTask}!`, {
      position: 'bottom-right',
      style: {
        backgroundColor: '#22c55e',
        color: '#ffffff',
      },
    });
  };

  const showErrorToast = () => {
    toast.error(`Please select both a field and a task!`, {
      position: 'bottom-right',
      style: {
        backgroundColor: '#ef4444',
        color: '#ffffff',
      },
    });
  };

  const handleDispatch = () => {
    if (!selectedField || !selectedTask) {
      showErrorToast();
      return;
    }

    showSuccessToast();
    setSelectedRover(null);
    setSelectedField('');
    setSelectedTask('');
  };

  return (
    <div className="flex flex-wrap min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-800 p-6 space-y-5">
        <h2 className="text-3xl font-bold mb-4">Rovers</h2>
        {roverData.map((rover) => (
          <div
            key={rover.id}
            onClick={() => setSelectedRover(rover.id)}
            className={`bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-xl p-6 space-y-2 transition-all shadow-lg ${
              selectedRover === rover.id ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <div className="flex justify-between text-lg font-semibold">
              <span>{rover.name}</span>
              <span className="text-sm text-gray-300">{rover.battery}%</span>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs ${
                rover.status === 'Active'
                  ? 'bg-green-600'
                  : rover.status === 'Standby'
                  ? 'bg-yellow-600'
                  : rover.status === 'Charging'
                  ? 'bg-blue-600'
                  : 'bg-red-600'
              }`}
            >
              {rover.status}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-6 space-y-6">
        {selectedRoverData && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-2xl font-bold mb-2">{selectedRoverData.name} Details</h2>

            <div className="space-y-1">
              <h3 className="text-lg font-medium">Battery</h3>
              <div className="flex items-center space-x-4">
                <div className="w-3/4 h-3 bg-gray-700 rounded-full">
                  <div
                    className={`h-3 rounded-full ${getBatteryColor(selectedRoverData.battery)}`}
                    style={{ width: `${selectedRoverData.battery}%` }}
                  />
                </div>
                <span className="text-white text-sm">{selectedRoverData.battery}%</span>
              </div>
            </div>

            {/* Dispatch Form */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Select Field</label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                >
                  <option value="">-- Choose Field --</option>
                  <option value="Field 1">Field 1</option>
                  <option value="Field 2">Field 2</option>
                  <option value="Field 3">Field 3</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Select Task</label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                >
                  <option value="">-- Choose Task --</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Nutrient Management">Nutrient Management</option>
                  <option value="Surveying">Surveying</option>
                </select>
              </div>

              <button
                onClick={handleDispatch}
                className="w-full py-3 bg-green-600 rounded-lg text-white font-bold hover:bg-green-700"
              >
                Dispatch Rover
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Rover;
