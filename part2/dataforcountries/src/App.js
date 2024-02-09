import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const displayCountries = () => {
    if (countries.length === 0) {
      return <p>No countries found.</p>;
    } else if (countries.length > 10) {
      return <p>Too many matches, please specify your search.</p>;
    } else if (countries.length === 1) {
      const country = countries[0];
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <p>Languages: {Object.values(country.languages).join(", ")}</p>
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            style={{ maxWidth: "200px" }}
          />
        </div>
      );
    } else {
      return (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <h1>Country Information</h1>
      <label htmlFor="search">Search country:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {displayCountries()}
    </div>
  );
};

export default App;
