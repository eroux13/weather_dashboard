$(document).ready(function () {
    // DOM Variables
    var cityName = $(".cityName");
    var currentTemp = $(".currentTemp");
    var currentHumidity = $(".currentHumidity");
    var currentWindSpeed = $(".currentWindSpeed");
    var currentUV = $(".currentUV");
    var currentDate = moment().format("M/D/YYYY");

    // API Key
    var apiKey = "0bb7f8c937e11372ee8f87cdc8461899";

    // Currentweather API
    $("#submitBtn").click(function () {
        // User input
        var citySearchValue = $("#citySearch").val();

        // Conditional if input is blank
        if (citySearchValue) {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&appid=" + apiKey + "&units=imperial")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    var cityNameValue = data.name;
                    console.log(cityNameValue);
                    var tempValue = data.main.temp;
                    var tempIcon = data.weather[0].icon;
                    var humidityValue = data.main.humidity;
                    var windSpeedValue = data.wind.speed;
                    var cityLatitude = data.coord.lat;
                    var cityLongitude = data.coord.lon;
                    var weatherIcon = $("<img>");
                    weatherIcon.addClass("weatherIcon");
                    weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + tempIcon + ".png");

                    cityName.html(cityNameValue);
                    $(".currentDate").html("(" + currentDate + ")");
                    $(".city").append(weatherIcon);
                    currentTemp.html(tempValue + "℉");
                    currentHumidity.html(humidityValue + "%");
                    currentWindSpeed.html(windSpeedValue + " mph");

                })
                .catch(error => console.log(error));
            // Need to find UV Index
        }
        else {
            alert("Please enter a city");
        }
    })

}); 