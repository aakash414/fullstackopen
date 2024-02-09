import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then((response) => {
          setCountries(response.data);
          setSelectedCountry(null); // Reset selected country when fetching new search results
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setCountries([]);
          setSelectedCountry(null);
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowDetail = (country) => {
    setSelectedCountry(country);
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

      {countries.length === 1 && <CountryDetail country={countries[0]} />}

      {countries.length > 10 && (
        <p>Too many matches, please specify your search.</p>
      )}

      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleShowDetail(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  );
};

export default App;
