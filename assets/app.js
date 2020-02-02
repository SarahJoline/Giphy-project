$(document).ready(function() {
  var topics = ["Happy", "Sad", "Excited", "Whatever"];

  let api_key = "8M5WZp8vzT8HJsd77ntgkf5KP16OdPuc";

  makingButtons();

  function makingButtons() {
    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var makeBtn = $("<button>");
      makeBtn.addClass("gif-btn");
      makeBtn.attr("data-name", topics[i]);
      makeBtn.text(topics[i]);
      $(".buttons").append(makeBtn);
    }
  }

  $("#search").on("click", function(event) {
    event.preventDefault();

    var topic = $("#gifSearch").val();
    if ($("#gifSearch").val() != "") {
      $("#gifSearch").val("");
      topics.push(topic);
      makingButtons();
      displayGifs(topic);
    } else {
      return;
    }
  });

  $(".gif-btn").on("click", function() {
    var searchText = $(this).attr("data-name");
    displayGifs(searchText);
  });

  $(".gifContainer").on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  function displayGifs(apple) {
    $(".gifContainer").empty();

    const queryUrl =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      api_key +
      "&q=" +
      apple +
      "&limit=10&offset=0&rating=G&lang=en";
    console.log(queryUrl);
    $.ajax({
      method: "GET",
      url: queryUrl
    }).then(response => {
      const results = response.data;
      console.log(response.data);
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var imgStill = results[i].images.fixed_height_still.url;
        var imgAnimate = results[i].images.fixed_height.url;
        var p = $("<p>").text("Rating: " + results[i].rating);
        var gifImage = $("<img>");
        gifImage.addClass("gif");
        gifImage.attr("data-still", imgStill);
        gifImage.attr("data-animate", imgAnimate);
        gifImage.attr("src", imgStill);
        gifImage.attr("data-state", "still");
        gifDiv.append(p);
        gifDiv.append(gifImage);
        $(".gifContainer").prepend(gifDiv);
      }
    });
  }
});
