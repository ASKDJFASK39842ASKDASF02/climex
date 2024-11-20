const apiKey = "043d65de14c3e2e8755faa781bbdf122"; // Sustituye por tu API Key de OpenWeatherMap
const weatherInfo = document.getElementById("weatherInfo");

// Función para obtener el clima basado en las coordenadas
async function getWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("No se pudo obtener el clima.");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Función para mostrar los datos del clima
function displayWeather(data) {
    weatherInfo.style.display = "block";
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Descripción: ${data.weather[0].description}</p>
    `;
}

// Obtener ubicación del usuario
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByLocation(latitude, longitude);
            },
            (error) => {
                alert("No se pudo acceder a tu ubicación. Por favor, habilita la ubicación y recarga la página.");
                console.error(error);
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Llamar a la función al cargar la página
getLocation();
