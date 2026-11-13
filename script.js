function getWeather() {

    let city = document.getElementById("city").value;

    if (city == "") {
        alert("Please enter a city name");
        return;
    }

    // Get city location

    fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1")

    .then(response => response.json())

    .then(data => {

        if (!data.results) {
            alert("City not found!");
            return;
        }

        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;
        let cityName = data.results[0].name;

        // Get weather information

        fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code")

        .then(response => response.json())

        .then(weather => {

            document.getElementById("cityName").innerHTML = cityName;

            document.getElementById("temperature").innerHTML =
                weather.current.temperature_2m + " °C";

            document.getElementById("humidity").innerHTML =
                "Humidity: " + weather.current.relative_humidity_2m + "%";

            document.getElementById("wind").innerHTML =
                "Wind Speed: " + weather.current.wind_speed_10m + " km/h";

            let code = weather.current.weather_code;

            let condition = "Unknown";

            if (code == 0) {
                condition = "Clear Sky";
            }
            else if (code <= 3) {
                condition = "Cloudy";
            }
            else if (code <= 48) {
                condition = "Foggy";
            }
            else if (code <= 67) {
                condition = "Rainy";
            }
            else if (code <= 77) {
                condition = "Snowy";
            }
            else if (code <= 82) {
                condition = "Rain Showers";
            }
            else if (code <= 99) {
                condition = "Thunderstorm";
            }

            document.getElementById("condition").innerHTML = condition;

        });

    });

}
