import React, { useState, useEffect } from 'react';
import Search from './search/Search';
import Featured from './fetured/Featured';
import RoomList from './rooms/RoomList';
import TourOffer from './trending/TourOffer';

function Hotel() {
  const [searchFilters, setSearchFilters] = useState(() => {
    // Retrieve filters from localStorage on initial load
    const storedFilters = localStorage.getItem("searchFilters");
    return storedFilters ? JSON.parse(storedFilters) : null; // Default to null if no filters are stored
  });

  // Handle search and store filters in state and localStorage
  const handleSearch = (filters) => {
    setSearchFilters(filters); // Update state with the new filters
    localStorage.setItem("searchFilters", JSON.stringify(filters)); // Persist filters in localStorage
  };

  return (
    <>
      <Search onSearch={handleSearch} initialFilters={searchFilters} />

      {/* Conditionally render RoomList or other components based on searchFilters */}
      {searchFilters ? (
        <RoomList filters={searchFilters} /> // Display filtered rooms if filters are present
      ) : (
        <>
          <Featured /> {/* Show featured content if no filters are applied */}
          <TourOffer /> {/* Show trending tour offers if no filters are applied */}
        </>
      )}
    </>
  );
}

export default Hotel;
