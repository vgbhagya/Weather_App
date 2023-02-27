import React, { useState } from "react";
import axios from "axios";

function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [lastCities, setLastCities] = useState([]);

    const API_KEY = "450a9d622a56bff861d328ffbea10a4b";

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setLastCities((prevCities) => {
                const newCities = [city, ...prevCities.slice(0, 2)];
                return newCities;
            });
            setCity("");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div id="main">
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Weather App</h1>
                    <input id="search"
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                {weatherData && (
                    <div className="fields">
                        {/* <h2>{weatherData.name}</h2> */}
                        <p>Weather Details of City:{weatherData.name}</p>
                        <p>Current Temperature: {weatherData.main.temp} &#8451;</p>
                        <p>Temperature Range: {weatherData.main.temp_max}to{weatherData.main.temp_min} &#8451;</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Humidity:{weatherData.main.humidity}</p>
                        <p>Sea Level:{weatherData.visibility}</p>
                        <p>Ground Level:{weatherData.wind.deg}</p>
                    </div>
                )}
                <div className="list">
                <h2>Last 3 city entries:</h2>
                <ul>
                    {lastCities.map((city, index) => (
                        <ul key={index}>{city}</ul>
                    ))}
                </ul>
                </div>
                
            </div>
        </div>

    );
}

export default App;
