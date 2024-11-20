const apiKey = "043d65de14c3e2e8755faa781bbdf122";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Por favor, ingresa una ciudad.");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("Ciudad no encontrada");
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
});

function displayWeather(data) {
    weatherInfo.style.display = "block";
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Descripción: ${data.weather[0].description}</p>
    `;
}
