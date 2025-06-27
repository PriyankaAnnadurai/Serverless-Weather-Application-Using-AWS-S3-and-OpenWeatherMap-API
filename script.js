const apiKey = 'd7a78ef1b0657a69502d669b09ff781b';

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(currentWeatherURL)
    .then(response => response.json())
    .then(data => {
      document.getElementById('cityName').innerText = data.name;
      document.getElementById('description').innerText = data.weather[0].description;
      document.getElementById('temp').innerText = data.main.temp;
      document.getElementById('feelsLike').innerText = data.main.feels_like;
      document.getElementById('humidity').innerText = data.main.humidity;
      document.getElementById('currentWeather').style.display = 'block';

      setBackgroundBasedOnWeather(data.weather[0].main);
    })
    .catch(error => {
      alert("Error fetching current weather: " + error.message);
    });

  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
      const forecastDiv = document.getElementById('forecastCards');
      forecastDiv.innerHTML = '';
      const daily = data.list.filter(f => f.dt_txt.includes("12:00:00"));

      daily.forEach(f => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        const date = new Date(f.dt_txt).toLocaleDateString();
        card.innerHTML = `
          <h3>${date}</h3>
          <p>${f.weather[0].description}</p>
          <p>🌡️ ${f.main.temp}°C</p>
          <p>💧 ${f.main.humidity}%</p>
        `;
        forecastDiv.appendChild(card);
      });

      document.getElementById('forecast').style.display = 'block';
    })
    .catch(error => {
      alert("Error fetching forecast: " + error.message);
    });
}

function setBackgroundBasedOnWeather(condition) {
  const body = document.body;
  let bg = '';

  switch (condition.toLowerCase()) {
    case 'clear':
      bg = "url('https://source.unsplash.com/1600x900/?clear-sky')";
      break;
    case 'clouds':
      bg = "url('https://source.unsplash.com/1600x900/?cloudy')";
      break;
    case 'rain':
      bg = "url('https://source.unsplash.com/1600x900/?rain')";
      break;
    case 'thunderstorm':
      bg = "url('https://source.unsplash.com/1600x900/?thunderstorm')";
      break;
    case 'snow':
      bg = "url('https://source.unsplash.com/1600x900/?snow')";
      break;
    case 'mist':
    case 'fog':
      bg = "url('https://source.unsplash.com/1600x900/?fog')";
      break;
    default:
      bg = "url('https://source.unsplash.com/1600x900/?weather')";
  }

  body.style.backgroundImage = bg;
}
