import React, { useState, useRef, useEffect } from "react";
import "./search.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

function Search({ onSearch, initialFilters }) {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(initialFilters?.startDate
    ? {
        startDate: new Date(initialFilters.startDate),
        endDate: new Date(initialFilters.endDate),
        key: "selection",
      }
    : {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      });

  const [location, setLocation] = useState(initialFilters?.location || "");
  const [persons, setPersons] = useState(initialFilters?.persons || "");

  const dateRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dateRef.current && !dateRef.current.contains(event.target)) {
      setOpenDate(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setOpenDate(false);
    }
  };

  useEffect(() => {
    if (openDate) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDate]);

  const handleSearchClick = () => {
    if (!location || !persons) {
      alert("Please fill in all fields.");
      return;
    }

    // Ensure persons is a number
    if (isNaN(persons) || persons <= 0) {
      alert("Please enter a valid number of persons.");
      return;
    }

    // Save search filters to localStorage
    const searchFilters = {
      location,
      startDate: date.startDate,
      endDate: date.endDate,
      persons,
    };

    localStorage.setItem("searchFilters", JSON.stringify(searchFilters));
    onSearch(searchFilters); // Pass filters to parent (RoomList)
  };

  return (
    <>
      <div className="header">
        <h1>Search Stays</h1>
        <p>Find the cheapest and best hotels rooms and stays</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <span className="search-box" onClick={() => setOpenDate((prev) => !prev)}>
          {`${format(date.startDate, "MMM-dd-yyyy")} to ${format(date.endDate, "MMM-dd-yyyy")}`}
        </span>

        {openDate && (
          <div ref={dateRef} className="calendar-container">
            <DateRangePicker
              ranges={[date]}
              onChange={(ranges) => setDate(ranges.selection)}
              minDate={new Date()}
              rangeColors={["rgb(255, 0, 0)"]}
            />
          </div>
        )}

        <input
          type="number"
          className="search-box"
          placeholder="Persons"
          value={persons}
          onChange={(e) => setPersons(e.target.value)}
        />

        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </>
  );
}

export default Search;
