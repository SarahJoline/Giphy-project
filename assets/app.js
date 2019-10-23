//an array called topics:
var topics = ["cats", "dogs", "chickens", "cows"];

let api_key = "8M5WZp8vzT8HJsd77ntgkf5KP16OdPuc";

//buttons should be made from my topics array dynamically.
makingButtons();

$(".gif-btn").on("click", function() {
  var searchText = $(this).attr("data-name");
  displayGifs(searchText);
});

function makingButtons() {
  $(".buttons").empty();

  for (var i = 0; i < topics.length; i++) {
    var makeBtn = $("<button>");
    makeBtn.addClass("gif-btn");
    makeBtn.attr("data-name", topics[i]);
    makeBtn.text(topics[i]);
    $(".buttons").append(makeBtn);
  }
  //   $(".button-town").append(`<button>${topics[i]}</button>`);
}

//take input of form and push it to my topics array
$("#search").on("click", function(event) {
  event.preventDefault();

  var topic = $("#gifSearch").val();
  console.log(topic);
  $("#gifSearch").val("");
  topics.push(topic);
  makingButtons();
});

//take the name of the button and use it to search for gifs by that name

function displayGifs(apple) {
  //this returns undefined. Why?
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
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var gifImage = $("<img>");
      gifImage.attr("src", results[i].images.fixed_height.url);
      gifDiv.append(p);
      gifDiv.append(gifImage);
      $(".gifContainer").prepend(gifDiv);
    }
  });
}

//the already made buttons should search for gifs.
//when I do a search, it gets added to my array and a button is made.
//each gif should be static when loaded to the page
//when clicked it plays, and it pauses again when clicked again.
