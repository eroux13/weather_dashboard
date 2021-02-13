$(document).ready(function () {
    // DOM Variables
    var cityName = $(".cityName");
    var currentTemp = $(".currentTemp");
    var currentHumidity = $(".currentHumidity");
    var currentWindSpeed = $(".currentWindSpeed");
    var currentUV = $(".currentUV");
    var currentDate = moment().format("M/D/YYYY");

    // 5-Day Forecast Variables
    var oneDayDate = $(".oneDayDate");
    var oneDayIconDisplay = $("#oneDayIcon");
    var oneDayTemp = $(".oneDayTemp");
    var oneDayHumidity = $(".oneDayHumidity");

    var twoDayDate = $(".twoDayDate");
    var twoDayIconDisplay = $("#twoDayIcon");
    var twoDayTemp = $(".twoDayTemp");
    var twoDayHumidity = $(".twoDayHumidity");

    var threeDayDate = $(".threeDayDate");
    var threeDayIconDisplay = $("#threeDayIcon");
    var threeDayTemp = $(".threeDayTemp");
    var threeDayHumidity = $(".threeDayHumidity");

    var fourDayDate = $(".fourDayDate");
    var fourDayIconDisplay = $("#fourDayIcon");
    var fourDayTemp = $(".fourDayTemp");
    var fourDayHumidity = $(".fourDayHumidity");

    var fiveDayDate = $(".fiveDayDate");
    var fiveDayIconDisplay = $("#fiveDayIcon");
    var fiveDayTemp = $(".fiveDayTemp");
    var fiveDayHumidity = $(".fiveDayHumidity");

    // Local Storage
    var storedSearch = JSON.parse(localStorage.getItem("city")) || [];

    // API Key
    var apiKey = "0bb7f8c937e11372ee8f87cdc8461899";

    // Currentweather API
    $("#submitBtn").click(function () {
        // Clear previous search results
        cityName.html("");
        $(".city").empty();
        currentTemp.html("");
        currentHumidity.html("");
        currentWindSpeed.html("");
        currentUV.html("");

        oneDayDate.html("");
        oneDayIconDisplay.html("");
        oneDayTemp.html("");
        oneDayHumidity.html("");

        twoDayDate.html("");
        twoDayIconDisplay.html("");
        twoDayTemp.html("");
        twoDayHumidity.html("");

        threeDayDate.html("");
        threeDayIconDisplay.html("");
        threeDayTemp.html("");
        threeDayHumidity.html("");

        fourDayDate.html("");
        fourDayIconDisplay.html("");
        fourDayTemp.html("");
        fourDayHumidity.html("");

        fiveDayDate.html("");
        fiveDayIconDisplay.html("");
        fiveDayTemp.html("");
        fiveDayHumidity.html("");

        // User input
        var citySearchValue = $("#citySearch").val();

        // Sotre input in local storage array
        storedSearch.push(citySearchValue);

        // Display History
        var cityHistory = $("#cityHistory");
        var cityHistoryName = $("<li>");
        cityHistoryName.addClass("cityHistoryName");
        cityHistory.prepend(cityHistoryName);
        cityHistoryName.html(citySearchValue);

        // Conditional if input is blank
        if (citySearchValue) {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&appid=" + apiKey + "&units=imperial")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    var cityNameValue = data.name;
                    var tempValue = data.main.temp;
                    var tempIcon = data.weather[0].icon;
                    var humidityValue = data.main.humidity;
                    var windSpeedValue = data.wind.speed;
                    var cityLatitude = data.coord.lat;
                    var cityLongitude = data.coord.lon;
                    var weatherIcon = $("<img>");
                    weatherIcon.addClass("weatherIcon");
                    weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + tempIcon + ".png");
                    getForecast(cityLatitude, cityLongitude);

                    cityName.html(cityNameValue);
                    $(".currentDate").html("(" + currentDate + ")");
                    $(".city").append(weatherIcon);
                    currentTemp.html(tempValue + "℉");
                    currentHumidity.html(humidityValue + "%");
                    currentWindSpeed.html(windSpeedValue + " mph");

                    localStorage.setItem("city", JSON.stringify(storedSearch));
                    $("#citySearch").val("");
                })
                .catch(error => console.log(error));
        }
        else {
            alert("Please enter a city");
        }
    })

    // One Call API
    function getForecast(lat, lon) {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=" + apiKey + "&units=imperial")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var uvValue = data.current.uvi;
                currentUV.html(uvValue);

                var oneDayIconValue = data.daily[0].weather[0].icon;
                var oneDayTempValue = data.daily[0].temp.day;
                var oneDayHumidityValue = data.daily[0].humidity;

                var twoDayIconValue = data.daily[1].weather[0].icon;
                var twoDayTempValue = data.daily[1].temp.day;
                var twoDayHumidityValue = data.daily[1].humidity;

                var threeDayIconValue = data.daily[2].weather[0].icon;
                var threeDayTempValue = data.daily[2].temp.day;
                var threeDayHumidityValue = data.daily[2].humidity;

                var fourDayIconValue = data.daily[3].weather[0].icon;
                var fourDayTempValue = data.daily[3].temp.day;
                var fourDayHumidityValue = data.daily[3].humidity;

                var fiveDayIconValue = data.daily[4].weather[0].icon;
                var fiveDayTempValue = data.daily[4].temp.day;
                var fiveDayHumidityValue = data.daily[4].humidity;

                // 1-Day Forecast
                var oneDate = moment().add(1, "days").format("M/D/YYYY");
                oneDayDate.html(oneDate);
                var oneDayIcon = $("<img>");
                oneDayIcon.addClass("weatherIcon");
                oneDayIcon.attr("src", "https://openweathermap.org/img/wn/" + oneDayIconValue + ".png");
                oneDayIconDisplay.append(oneDayIcon);
                oneDayTemp.html("Temp: " + oneDayTempValue + "℉");
                oneDayHumidity.html("Humidity " + oneDayHumidityValue + "%");

                // 2-Day Forecast
                var twoDate = moment().add(2, "days").format("M/D/YYYY");
                twoDayDate.html(twoDate);
                var twoDayIcon = $("<img>");
                twoDayIcon.addClass("weatherIcon");
                twoDayIcon.attr("src", "https://openweathermap.org/img/wn/" + twoDayIconValue + ".png");
                twoDayIconDisplay.append(twoDayIcon);
                twoDayTemp.html("Temp: " + twoDayTempValue + "℉");
                twoDayHumidity.html("Humidity " + twoDayHumidityValue + "%");

                // 3-Day Forecast
                var threeDate = moment().add(3, "days").format("M/D/YYYY");
                threeDayDate.html(threeDate);
                var threeDayIcon = $("<img>");
                threeDayIcon.addClass("weatherIcon");
                threeDayIcon.attr("src", "https://openweathermap.org/img/wn/" + threeDayIconValue + ".png");
                threeDayIconDisplay.append(threeDayIcon);
                threeDayTemp.html("Temp: " + threeDayTempValue + "℉");
                threeDayHumidity.html("Humidity " + threeDayHumidityValue + "%");

                // 4-Day Forecast
                var fourDate = moment().add(4, "days").format("M/D/YYYY");
                fourDayDate.html(fourDate);
                var fourDayIcon = $("<img>");
                fourDayIcon.addClass("weatherIcon");
                fourDayIcon.attr("src", "https://openweathermap.org/img/wn/" + fourDayIconValue + ".png");
                fourDayIconDisplay.append(fourDayIcon);
                fourDayTemp.html("Temp: " + fourDayTempValue + "℉");
                fourDayHumidity.html("Humidity " + fourDayHumidityValue + "%");

                // 5-Day Forecast
                var fiveDate = moment().add(5, "days").format("M/D/YYYY");
                fiveDayDate.html(fiveDate);
                var fiveDayIcon = $("<img>");
                fiveDayIcon.addClass("weatherIcon");
                fiveDayIcon.attr("src", "https://openweathermap.org/img/wn/" + fiveDayIconValue + ".png");
                fiveDayIconDisplay.append(fiveDayIcon);
                fiveDayTemp.html("Temp: " + fiveDayTempValue + "℉");
                fiveDayHumidity.html("Humidity " + fiveDayHumidityValue + "%");
            })
            .catch(error => console.log(error))
    }
}); 