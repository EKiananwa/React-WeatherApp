import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const apiKey = 'd8331c92d578125b714ce8c1915e714d'; // API-sleutel

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const location = document.getElementById('inputLocation').value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`;

      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          console.log(error.response.data); // Log de specifieke foutmelding van de server
        });

      setLocation(''); // Reset de locatie na het zoeken
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          id="inputLocation" // ID toegevoegd aan het inputveld
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location..."
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p> {/* Dynamisch weergeven van locatie */}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}K</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{/* Dynamische gevoelstemperatuur weergeven */}</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{/* Dynamische luchtvochtigheid weergeven */}</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{/* Dynamische windsnelheid weergeven */}</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
