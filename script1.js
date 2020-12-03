// a weather app that allows its users to search a city

// when i click the search button my primary card is populated with the specified city and its current weather data
// underneath the primary card are 5 badges that display the estimated weather data for the next 5 days
// underneath the search field is a vertical unordered list with the last 8 previously searched cities being dynamically appended
// * pulls information from the form and builds the query URL
//  * @returns {string} URL for OWM API based on form inputs
//  */

function getCurrentWeather(city) {
  var apiKey = "b8d00ab246e7b992f89eedfb2df715ff";
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function (response) {
      console.log(response.list);

      var day;
      var lows = [];
      var highs = [];
      var dates = [];
      var dailyHighs = [];
      var dailyLows = [];

      for (var i = 0; i < response.list.length; i++) {
        console.log("i", i);
        console.log("day", response.list[i].dt_txt.split(" ")[0]);

        if (
          day === undefined ||
          day !== response.list[i].dt_txt.split(" ")[0]
        ) {
          console.log("new day");
          day = response.list[i].dt_txt.split(" ")[0];
          dates.push(response.list[i].dt_txt.split(" ")[0]);
          if (dailyLows.length > 0) {
            lows.push(Math.round(Math.min(...dailyLows)));
            dailyLows = [];
          }
          if (dailyHighs.length > 0) {
            highs.push(Math.round(Math.max(...dailyHighs)));
            dailyHighs = [];
          }
        } else {
          console.log("same day");
        }

        dailyHighs.push(response.list[i].main.temp_max);
        dailyLows.push(response.list[i].main.temp_min);

        if (i === response.list.length - 1) {
          console.log("last day");

          highs.push(Math.round(Math.max(...dailyHighs)));
          lows.push(Math.round(Math.min(...dailyLows)));
        }
        // console.log("date", day);
        console.log("lows", lows);
        console.log("highs", highs);
      }
      return {
        dateArray: dates,
        highArray: highs,
        lowArray: lows,
      };
    })
    .then((arr) => {
      console.log("arr", arr);
      for (var i = 0; i < arr.highArray.length; i++) {
        $(".current").append(`
        <div class="city-card">
            <div class="date">${arr.dateArray[i]}</div>
            <div class="highs">High: ${arr.highArray[i]}</div>
            <div class="lows">Low: ${arr.lowArray[i]}</div>
          </div>`);
      }
    });
}
function getForecast(city) {
  var apiKey = "b8d00ab246e7b992f89eedfb2df715ff";
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function (response) {
      console.log(response.list);

      var day;
      var lows = [];
      var highs = [];
      var dates = [];
      var dailyHighs = [];
      var dailyLows = [];

      for (var i = 0; i < response.list.length; i++) {
        console.log("i", i);
        console.log("day", response.list[i].dt_txt.split(" ")[0]);

        if (
          day === undefined ||
          day !== response.list[i].dt_txt.split(" ")[0]
        ) {
          console.log("new day");
          day = response.list[i].dt_txt.split(" ")[0];
          dates.push(response.list[i].dt_txt.split(" ")[0]);
          if (dailyLows.length > 0) {
            lows.push(Math.round(Math.min(...dailyLows)));
            dailyLows = [];
          }
          if (dailyHighs.length > 0) {
            highs.push(Math.round(Math.max(...dailyHighs)));
            dailyHighs = [];
          }
        } else {
          console.log("same day");
        }

        dailyHighs.push(response.list[i].main.temp_max);
        dailyLows.push(response.list[i].main.temp_min);

        if (i === response.list.length - 1) {
          console.log("last day");

          highs.push(Math.round(Math.max(...dailyHighs)));
          lows.push(Math.round(Math.min(...dailyLows)));
        }
        // console.log("date", day);
        console.log("lows", lows);
        console.log("highs", highs);
      }
      return {
        dateArray: dates,
        highArray: highs,
        lowArray: lows,
      };
    })
    .then(
      (arr) => {
        for (var i = 0; i < arr.highArray.length; i++) {
          $(".current").append(`
        <div class="city-card">
            <div class="date">${arr.dateArray[i]}</div>
            <div class="highs">High: ${arr.highArray[i]}</div>
            <div class="lows">Low: ${arr.lowArray[i]}</div>
          </div>`);

          console.log(arr);
          for (var i = 1; i < arr.highArray.length; i++) {
            $(".5day").append(`
        <div class="city-card">
            <div class="date">${arr.dateArray[i]}</div>
            <div class="highs">High: ${arr.highArray[i]}</div>
            <div class="lows">Low: ${arr.lowArray[i]}</div>
          </div>`);
          }
        }
      },
      $("#city-search").submit(function (event) {
        console.log("hello");
        event.preventDefault();
        var queryParams = $("input[id=search]").val().trim();
        getCurrentWeather(queryParams);
        getForecast(queryParams);
      })
    );
}
