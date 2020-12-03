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
    console.log(tempHigh);
    console.log(tempLow);
    console.log(tempCurrent);
    // Log the queryURL
    console.log(queryURL);
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".temp").text("Current temperature: " + tempCurrent);
    $(".tempHigh").text("High: " + tempCurrent);
    $(".tempLow").text("Low: " + tempCurrent);
    $(".humidity").text("Humidity: " + response.main.humidity);

    // Log the resulting object
    console.log(response);
    // $("#movie-view").text(JSON.stringify(response));
  });

  // -----------------------------------------------------------------------
});
