const apiKey = "043d65de14c3e2e8755faa781bbdf122"; // Sustituye con tu API Key
const weatherDisplay = document.getElementById("weatherDisplay");
const locationName = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const refreshBtn = document.getElementById("refreshBtn");
let map, heatLayer;

function initMap(lat, lon) {
    if (!map) {
        map = L.map("map").setView([lat, lon], 10);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap",
        }).addTo(map);
    } else {
        map.setView([lat, lon], 10);
    }

    if (heatLayer) map.removeLayer(heatLayer);

    heatLayer = L.heatLayer([[lat, lon, Math.random() * 10]], {
        radius: 25,
        blur: 15,
    }).addTo(map);
}

async function getWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
        );
        const data = await response.json();
        displayWeather(data);
        initMap(lat, lon);
    } catch (error) {
        console.error("Error al obtener el clima:", error);
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

refreshBtn.addEventListener("click", () => {
    locationName.textContent = "Actualizando...";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    humidity.textContent = "";
    getLocation();
});

getLocation();
