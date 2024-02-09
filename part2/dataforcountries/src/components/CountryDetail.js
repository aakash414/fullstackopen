import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  console.log("apiKey", apiKey);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.capital}&aqi=no`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      }
    };

    if (country.capital) {
      fetchWeather();
    }
  }, [country.capital]);

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

      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
