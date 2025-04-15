import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface IrrigationSchedule {
  id: number;
  date: string;
  time: string;
  map: string;
  level: string;
}

const Irrigate: React.FC = () => {
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSchedule, setNewSchedule] = useState({
    date: '',
    time: '',
    map: 'Map 1',
    level: '100%',
  });

  const handleAddSchedule = () => {
    const newId = schedules.length + 1;
    setSchedules([...schedules, { id: newId, ...newSchedule }]);
    setNewSchedule({ date: '', time: '', map: 'Map 1', level: '100%' });
    setShowModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSchedule((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full bg-zinc-950 text-white p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <Calendar
            size={30}
            className="text-gray-400 cursor-pointer hover:text-white transition"
            onClick={() => setShowModal(true)}
          />
          <span className="text-xl font-semibold">Irrigation Schedule</span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full sm:w-auto"
        >
          + Add Schedule
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        {schedules.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No schedules set. <br />
            Create a schedule to automate irrigation.
          </p>
        ) : (
          <div className="w-full space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-zinc-800 p-4 rounded-md shadow text-sm"
              >
                <p><span className="font-medium">Schedule ID:</span> {schedule.id}</p>
                <p><span className="font-medium">Map:</span> {schedule.map}</p>
                <p><span className="font-medium">Date:</span> {schedule.date}</p>
                <p><span className="font-medium">Time:</span> {schedule.time}</p>
                <p><span className="font-medium">Level:</span> {schedule.level}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white text-black p-6 rounded-lg max-w-xs w-full sm:w-96">
            <h3 className="text-xl mb-4">Add Irrigation Schedule</h3>

            <div className="mb-3">
              <label className="block text-sm font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={newSchedule.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold">Time</label>
              <input
                type="time"
                name="time"
                value={newSchedule.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold">Select Map</label>
              <select
                name="map"
                value={newSchedule.map}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option>Map 1</option>
                <option>Map 2</option>
                <option>Map 3</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Irrigation Level</label>
              <select
                name="level"
                value={newSchedule.level}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option>60%</option>
                <option>70%</option>
                <option>100%</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleAddSchedule}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Irrigate;
