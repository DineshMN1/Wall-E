import React, { useState } from 'react';
import { Calendar } from 'lucide-react'; // Import Calendar icon from Lucide

// Define the type for the irrigation schedule
interface IrrigationSchedule {
  id: number;
  date: string;
  time: string;
}

const Irrigate: React.FC = () => {
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSchedule, setNewSchedule] = useState<{ date: string; time: string }>({
    date: '',
    time: '',
  });

  // Handle adding a new schedule
  const handleAddSchedule = () => {
    const newId = schedules.length + 1;
    setSchedules([
      ...schedules,
      { id: newId, date: newSchedule.date, time: newSchedule.time },
    ]);
    setNewSchedule({ date: '', time: '' }); // Reset new schedule fields
    setShowModal(false); // Close modal after adding
  };

  // Handle schedule input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSchedule((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="relative flex flex-col items-center w-2/3 mx-auto">
      {/* Left Side: Calendar Logo */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Calendar size={30} className="text-gray-500 cursor-pointer" onClick={() => setShowModal(true)} />
        <span className="text-lg font-semibold">Irrigation Schedule</span>
      </div>

      {/* Center: No schedules message or schedules list */}
      <div className="flex-1 flex flex-col items-center justify-center mt-16">
        {schedules.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No schedules set. <br />
            Create a schedule to automate irrigation
          </p>
        ) : (
          schedules.map((schedule) => (
            <div key={schedule.id} className="mb-2">
              <p className="text-lg">
                {`Schedule ID: ${schedule.id}, Date: ${schedule.date}, Time: ${schedule.time}`}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Right Side: Add Schedule Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          + Add Schedule
        </button>
      </div>

      {/* Modal for Adding Schedule */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-xl mb-4">Add Irrigation Schedule</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={newSchedule.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Time</label>
              <input
                type="time"
                name="time"
                value={newSchedule.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleAddSchedule}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
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
