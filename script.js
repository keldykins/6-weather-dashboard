// This .on("click") function will trigger the AJAX Call
$("#find-city").on("click", function (event) {
  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();

  // Here we grab the text from the input box
  var movie = $("#movie-input").val();

  // Here we construct our URL
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    movie +
    "&appid=b8d00ab246e7b992f89eedfb2df715ff";

  // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
  // and display it in the div with an id of movie-view

  // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var tempHigh = (response.main.temp_max - 273.15) * 1.8 + 32;
    var tempLow = (response.main.temp_min - 273.15) * 1.8 + 32;
    var tempCurrent = (response.main.temp - 273.15) * 1.8 + 32;
    var date = new Date();
    console.log("high", tempHigh);
    console.log("low", tempLow);
    console.log("current", tempCurrent);
    // Log the queryURL
    console.log(queryURL);
    $(".weather-details").append(`<div class="card">
<div class="card-body">
  <div id="movie-view"></div>
  <h2>Weather Details</h2>
  <div class="city"></div>
  <div class="date"></div>
  <div class="temp"></div>
  <div class="tempHigh"></div>
  <div class="tempLow"></div>
  <div class="humidity"></div>
</div>`);
    $(".city").html("<h1>" + response.name + "</h1>");
    $(".date").html("<h6>" + date + "</h6>");
    $(".temp").text("Current: " + Math.floor(tempCurrent) + "°F");
    $(".tempHigh").text("High: " + Math.floor(tempHigh) + "°F");
    $(".tempLow").text("Low: " + Math.floor(tempLow) + "°F");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    // Log the resulting object
    console.log(response);
    // $("#movie-view").text(JSON.stringify(response));
  });

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var tempHigh = (response.main.temp_max - 273.15) * 1.8 + 32;
    var tempLow = (response.main.temp_min - 273.15) * 1.8 + 32;
    var tempCurrent = (response.main.temp - 273.15) * 1.8 + 32;
    var date = new Date();
    console.log("high", tempHigh);
    console.log("low", tempLow);
    console.log("current", tempCurrent);
    // Log the queryURL
    console.log(queryURL);
    $(".5day").append(`<div class="card">
    <div class="card-body">
      <h3>5 Day Forecast</h3>`);
    $(".city").html("<h1>" + response.name + "</h1>");
    $(".date").html("<h6>" + date + "</h6>");
    $(".temp").text("Current: " + Math.floor(tempCurrent) + "°F");
    $(".tempHigh").text("High: " + Math.floor(tempHigh) + "°F");
    $(".tempLow").text("Low: " + Math.floor(tempLow) + "°F");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    // Log the resulting object
    console.log(response);
    // $("#movie-view").text(JSON.stringify(response));
  });
});
