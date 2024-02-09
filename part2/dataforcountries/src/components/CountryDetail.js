const CountryDetail = ({ country }) => {
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
};
export default CountryDetail;
