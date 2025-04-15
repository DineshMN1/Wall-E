import React, { useState } from 'react';

interface Field {
  id: number;
  name: string;
  image: string;
  section: string;
  crop: string;
  harvestTime: string;
  currentCrop: string;
  daysToHarvest: number;
}

const FarmMap: React.FC = () => {
  const [selectedField, setSelectedField] = useState<number>(1);

  const fields: Field[] = [
    {
      id: 1,
      name: 'Field 1',
      image: './map/1.png',
      section: 'Field Map 1 Details',
      crop: 'Rice',
      harvestTime: '4 months',
      currentCrop: 'Rice',
      daysToHarvest: 39,
    },
    {
      id: 2,
      name: 'Field 2',
      image: './map/2.png',
      section: 'Field Map 2 Details',
      crop: 'Wheat',
      harvestTime: '3 months',
      currentCrop: 'Wheat',
      daysToHarvest: 17,
    },
    {
      id: 3,
      name: 'Field 3',
      image: './map/3.png',
      section: 'Field Map 3 Details',
      crop: 'Sugarcane',
      harvestTime: '12 months',
      currentCrop: 'Sugarcane',
      daysToHarvest: 91,
    },
  ];

  const handleSelectField = (fieldId: number) => {
    setSelectedField(fieldId);
  };

  const renderSection = (fieldId: number) => {
    const field = fields.find(f => f.id === fieldId);
    return field ? (
      <div className="mt-4 text-base sm:text-lg">
        <h3 className="text-xl font-semibold mb-4">{field.name}</h3>
        <p className="mb-2"><strong>Current Crop:</strong> {field.currentCrop}</p>
        <p className="mb-2"><strong>Details:</strong> This field is currently planted with {field.currentCrop}.</p>
        <p className="mb-2"><strong>Harvest Time:</strong> {field.harvestTime}</p>
        <p className="mb-2"><strong>Days Left to Harvest:</strong> {field.daysToHarvest} days</p>
      </div>
    ) : null;
  };

  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-md">
      <div className="mb-6">
        <label htmlFor="field-select" className="block text-sm font-medium text-gray-300 mb-2">Select a Field</label>

        {/* Horizontal Scroll on Mobile */}
        <div className="flex space-x-4 overflow-x-auto pb-1">
          {fields.map(field => (
            <button
              key={field.id}
              onClick={() => handleSelectField(field.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedField === field.id ? 'bg-green-600' : 'bg-gray-800'
              } hover:bg-green-700`}
            >
              {field.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[40%]">
          <img
            src={fields.find(field => field.id === selectedField)?.image}
            alt={`Field ${selectedField}`}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="flex-1 md:pl-6">
          {renderSection(selectedField)}
        </div>
      </div>
    </div>
  );
};

export default FarmMap;
