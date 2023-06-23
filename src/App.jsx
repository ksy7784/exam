import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dark, setDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          throw new Error('API 요청이 실패했습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handleSearch = () => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      <div className={dark ? 'App darkmode' : 'App'}>
        <header>
          <h1>Where in the world?</h1>
          <button
            className={!dark ? 'dark-btn' : 'light-btn'}
            onClick={() => {
              setDark(!dark);
            }}
          >
            Dark Mode
          </button>
        </header>
        <hr />
        <main>
          {!selectedCountry ? (
            <div>
              <div className='inputAndbtn'>
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className={!dark ? 'light-search' : 'dark-search'}
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                />
                <button
                  className={!dark ? 'light-search-btn' : 'dark-search-btn'}
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <div className="country-list">
                {filteredCountries.map(country => (
                  <div
                    key={country.name.common}
                    className="country-card"
                    onClick={() => handleCountryClick(country)}
                  >
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="country-flag"
                    />
                    <h2 className="country-name">{country.name.common}</h2>
                    <p className="country-info">
                      <div><strong>Population : </strong> {country.population.toLocaleString('ko-KR')}</div>
                      <div><strong>Region : </strong> {country.region}</div>
                      <div><strong>Capital : </strong> {country.capital}</div>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="country-details">
              <div className='btn-place'><button onClick={handleBack}>Back</button></div>
              <div className='img-place'>
              <img
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
                className="country-flag"
              />
              </div>
                <div className='info-place'>
                  <h2>{selectedCountry.name.common}</h2>
                  <p>
                    <strong>Population:</strong> {selectedCountry.population.toLocaleString('ko-KR')}
                  </p>
                  <p>
                    <strong>Region:</strong> {selectedCountry.region}
                  </p>
                  <p>
                    <strong>Capital:</strong> {selectedCountry.capital}
                  </p>
                  <p>
                    <strong>Subregion:</strong> {selectedCountry.subregion}
                  </p>
                  <p>
                    <strong>Top Level Domain:</strong> {selectedCountry.tld}
                  </p>
                  <p>
                    <strong>Languages:</strong> {Object.values(selectedCountry.languages).join(', ')}
                  </p>
              </div>
              
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;