const apiKey = '540ece194016ce7b95184756f4d21ec6';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loader = document.getElementById('loader');
const weatherData = document.getElementById('weatherData');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const error = document.getElementById('error');

async function getWeather(city) {
    loader.classList.remove('hidden');
    weatherData.classList.add('hidden');
    error.textContent = '';

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`

        );

        if (!res.ok) throw new Error('Город не найден');

        const data = await res.json();

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Влажность: ${data.main.humidity}%`;
        wind.textContent = `Ветер: ${data.wind.speed} м/с`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weatherIcon').src = iconUrl;

        document.body.className = '';
        const weatherMain = data.weather[0].main.toLowerCase();
        switch (weatherMain) {
            case 'clear': document.body.classList.add('clear'); break;
            case 'clouds': document.body.classList.add('clouds'); break;
            case 'rain': document.body.classList.add('rain'); break;
            case 'snow': document.body.classList.add('snow'); break;
            case 'thunderstorm': document.body.classList.add('thunderstorm'); break;
            case 'drizzle': document.body.classList.add('drizzle'); break;
            case 'mist': document.body.classList.add('mist'); break;
            default: document.body.style.background = '#eef2f3';
        }

        weatherData.classList.remove('hidden');
    } catch (err) {
        if (err.message === 'Failed to fetch') {
            error.textContent = 'Ошибка сети. Проверьте соединение.';
        } else {
            error.textContent = err.message;
        }
    } finally {
        loader.classList.add('hidden');
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
