import React, { useState, useRef, useEffect } from "react";
import "./searchbus.css";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Search({ onSearch, initialFilters }) {
  const [openDate, setOpenDate] = useState(false);
  const [journeyDate, setJourneyDate] = useState(
    initialFilters?.journeyDate ? new Date(initialFilters.journeyDate) : new Date()
  );
  const [from, setFrom] = useState(initialFilters?.from || "");
  const [to, setTo] = useState(initialFilters?.to || "");
  const [passengers, setPassengers] = useState(initialFilters?.passengers || "");

  const dateRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dateRef.current && !dateRef.current.contains(event.target)) {
      setOpenDate(false);
    }
  };

  useEffect(() => {
    if (openDate) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDate]);

  const handleSearchClick = () => {
    if (!from || !to || !passengers) {
      alert("Please fill in all fields.");
      return;
    }

    if (isNaN(passengers) || passengers <= 0) {
      alert("Please enter a valid number of passengers.");
      return;
    }

    const searchFilters = {
      from,
      to,
      journeyDate,
      passengers,
    };

    localStorage.setItem("busSearchFilters", JSON.stringify(searchFilters));
    onSearch(searchFilters);
  };

  return (
    <>
      <div className="header">
        <h1>Search Buses</h1>
        <p>Find affordable and fast bus tickets</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="text"
          className="search-box"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <span className="search-box" onClick={() => setOpenDate((prev) => !prev)}>
          {format(journeyDate, "MMM-dd-yyyy")}
        </span>

        {openDate && (
          <div ref={dateRef} className="calendar-container">
            <DateRangePicker
              ranges={[
                {
                  startDate: journeyDate,
                  endDate: journeyDate,
                  key: "selection",
                },
              ]}
              onChange={(ranges) => setJourneyDate(ranges.selection.startDate)}
              minDate={new Date()}
              rangeColors={["#ff0000"]}
            />
          </div>
        )}

        <input
          type="number"
          className="search-box"
          placeholder="Passengers"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />

        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </>
  );
}

export default Search;
