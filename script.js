const apiKey = "043d65de14c3e2e8755faa781bbdf122"; // Sustituye con tu API Key
const weatherDisplay = document.getElementById("weatherDisplay");
const locationName = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const refreshBtn = document.getElementById("refreshBtn");

async function getWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("No se pudo obtener el clima.");
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error.message);
    }
}

function displayWeather(data) {
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humedad: ${data.main.humidity}%`;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByLocation(latitude, longitude);
            },
            (error) => console.error("Error al obtener la ubicación:", error)
        );
    } else {
        console.error("La geolocalización no está soportada.");
    }
}

// Botón de actualización
refreshBtn.addEventListener("click", () => {
    locationName.textContent = "Actualizando...";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    humidity.textContent = "";
    getLocation();
});

// Cargar clima automáticamente al iniciar
getLocation();
