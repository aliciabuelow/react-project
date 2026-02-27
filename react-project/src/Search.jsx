import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [loaded, setLoaded] = useState(false);
  const [cityQuery, setCityQuery] = useState(null);
  const [weather, setWeather] = useState({});

  function fetchWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.temperature.current),
      wind: Math.round(response.data.wind.speed),
      humidity: response.data.temperature.humidity,
      description: response.data.condition.description,
      icon: response.data.condition.icon_url,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "04dbc8004716437tab5bc0bfo1baf277";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityQuery}&key=${apiKey}`;
    axios.get(apiUrl).then(fetchWeather);
  }

  function updateQuery(event) {
    setCityQuery(event.target.value);
  }

  let form = (
    <form className="search" onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={updateQuery} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {weather.temperature}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}