import React, { useState } from 'react';

const Pestcontrol: React.FC = () => {
  const [selectedField, setSelectedField] = useState<number>(1);

  const fields = [
    {
      id: 1,
      name: 'Field 1',
      image: './map/1.png',
      pestAreas: [
        { top: '30%', left: '30%', color: 'red' },
        { top: '40%', left: '60%', color: 'orange' },
        { top: '60%', left: '60%', color: 'brown' },
      ],
      pestLevel: 60,
      status: 'Danger',
    },
    {
      id: 2,
      name: 'Field 2',
      image: './map/2.png',
      pestAreas: [
        { top: '30%', left: '40%', color: 'orange' },
        { top: '50%', left: '70%', color: 'red' },
        { top: '70%', left: '20%', color: 'brown' },
      ],
      pestLevel: 40,
      status: 'Warning',
    },
    {
      id: 3,
      name: 'Field 3',
      image: './map/3.png',
      pestAreas: [
        { top: '30%', left: '20%', color: 'brown' },
        { top: '40%', left: '60%', color: 'red' },
        { top: '60%', left: '40%', color: 'orange' },
      ],
      pestLevel: 20,
      status: 'Okay',
    },
  ];

  const handleSelectField = (fieldId: number) => {
    setSelectedField(fieldId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Danger':
        return 'text-red-600';
      case 'Warning':
        return 'text-yellow-500';
      case 'Okay':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-md">
      <div className="mb-6">
        <label htmlFor="field-select" className="block text-sm font-medium text-gray-300 mb-2">Select a Field</label>

        {/* Horizontally scrollable field buttons on mobile */}
        <div className="flex space-x-4 mb-4 overflow-x-auto pb-2">
          {fields.map(field => (
            <button
              key={field.id}
              onClick={() => handleSelectField(field.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors duration-200 ${selectedField === field.id ? 'bg-green-600' : 'bg-gray-800'} hover:bg-green-700`}
            >
              {field.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stack on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[40%] relative">
          <img
            src={fields.find(field => field.id === selectedField)?.image}
            alt={`Field ${selectedField}`}
            className="rounded-lg shadow-lg w-full"
          />
          {fields.find(field => field.id === selectedField)?.pestAreas.map((area, index) => (
            <div
              key={index}
              className={`absolute rounded-full w-8 h-8`}
              style={{
                top: area.top,
                left: area.left,
                backgroundColor:
                  area.color === 'red'
                    ? 'rgba(255, 0, 0, 0.5)'
                    : area.color === 'orange'
                    ? 'rgba(255, 165, 0, 0.5)'
                    : 'rgba(139, 69, 19, 0.5)',
              }}
            />
          ))}
        </div>

        <div className="flex-1 md:pl-6">
          <h3 className="text-2xl font-semibold mb-4">{fields.find(field => field.id === selectedField)?.name}</h3>
          <p className="text-lg">This is the pest control map with marked areas showing pest levels in different colors.</p>
          <div className="mt-4">
            <p className="text-lg font-semibold">Pest Concentration: {fields.find(field => field.id === selectedField)?.pestLevel}%</p>
            <p className={`text-lg font-semibold ${getStatusColor(fields.find(field => field.id === selectedField)?.status || '')}`}>
              Status: {fields.find(field => field.id === selectedField)?.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pestcontrol;
