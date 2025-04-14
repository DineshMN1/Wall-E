import React, { useState } from 'react';

// Define the type for each map
interface Map {
  id: number;
  name: string;
  image: string;
  section: string;
}

const Farmap: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<number | null>(null);

  // Define the maps data
  const maps: Map[] = [
    { id: 1, name: 'Map 1', image: './map/1.png', section: 'Map 1 Details' },
    { id: 2, name: 'Map 2', image: './map/2.png', section: 'Map 2 Details' },
    { id: 3, name: 'Map 3', image: './map/3.png', section: 'Map 3 Details' },
  ];

  // Handle the map selection
  const handleSelectMap = (mapId: number) => {
    setSelectedMap(mapId);
  };

  // Render the section based on the selected map
  const renderSection = (mapId: number) => {
    const map = maps.find(m => m.id === mapId);
    return map ? <div>{map.section}</div> : null;
  };

  return (
    <div>
      <select
        onChange={(e) => handleSelectMap(parseInt(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>Select a Map</option>
        {maps.map(map => (
          <option key={map.id} value={map.id}>{map.name}</option>
        ))}
      </select>

      {selectedMap !== null && (
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div style={{ flex: 1 }}>
            <img
              src={maps.find(map => map.id === selectedMap)?.image}
              alt={`Map ${selectedMap}`}
              style={{ width: '60%' }}
            />
          </div>
          <div style={{ flex: 1, paddingLeft: '20px' }}>
            {renderSection(selectedMap)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Farmap;
