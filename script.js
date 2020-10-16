// a weather app that allows its users to search a city
// when i click the search button my primary card is populated with the specified city and its current weather data
// underneath the primary card are 5 badges that display the estimated weather data for the next 5 days
// underneath the search field is a vertical unordered list with the last 8 previously searched cities being dynamically appended

// * pulls information from the form and builds the query URL
//  * @returns {string} URL for OWM API based on form inputs
//  */

function getForecast(city) {
  // queryURL is the url we'll use to query the API
  var queryURL = "api.openweathermap.org/data/2.5/forecast?q=";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var apiKey = "b8d00ab246e7b992f89eedfb2df715ff";

  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.list);
    var day;
    var averageLows = [];
    var averageHighs = [];
    var dailyHighs = [];
    var dailyLows = [];
    for (var i = 0; i < response.list.length; i++) {
      console.log("i", i);
      console.log("day", response.list[i].dt_txt.split(" ")[0]);
      // console.log(day);
      // console.log(response.list[i]);
      // console.log(response.list[i].dt_txt.split(" ")[0]);
      if (
        day === undefined ||
        day !== response.list[i].dt_txt.split(" ")[0] ||
        i === response.list.length - 1
      ) {
        console.log("new day");
        console.log(dailyLows);
        if (dailyLows.length > 0) {
          averageLows.push(
            Math.min(...dailyLows)
            // Math.round(dailyLows.reduce((a, b) => a + b, 0) / dailyLows.length)
          );
          dailyLows = [];
          console.log("lows", averageLows);
        }
        if (dailyHighs.length > 0) {
          averageHighs.push(
            Math.round(
              Math.max(...dailyHighs)
              // dailyHighs.reduce((a, b) => a + b, 0) / dailyHighs.length
            )
          );
          dailyHighs = [];
          console.log("highs", averageHighs);
        }
        day = response.list[i].dt_txt.split(" ")[0];
      } else {
        console.log("same day");
        dailyHighs.push(response.list[i].main.temp_max);
        dailyLows.push(response.list[i].main.temp_min);
      }
    }

    // $("#city-card").text(JSON.stringify(response));
  });
}
// This .on("click") function will trigger the AJAX Call
$("#city-search").on("submit", function (event) {
  event.preventDefault();
  var queryParams = $("input[id=search]").val().trim();
  getForecast(queryParams);
});

// $("input[id=name]")
