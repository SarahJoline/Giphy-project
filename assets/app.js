//an array called topics:
var topics = ["cats", "dogs", "chickens", "cows"];

let api_key = "8M5WZp8vzT8HJsd77ntgkf5KP16OdPuc";

//buttons should be made from my topics array dynamically.

makingButtons();

function makingButtons() {
  $(".button-town").empty();

  for (var i = 0; i < topics.length; i++) {
    var makeBtn = $("<button>");
    makeBtn.addClass("gif-btn");
    makeBtn.attr("data-name", topics[i]);
    makeBtn.text(topics[i]);
    $(".button-town").append(makeBtn);
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
  console.log(topics);
  makingButtons();
});

//the already made buttons should search for gifs.
//when I do a search, it gets added to my array and a button is made.
//10 gifs are displayed per search
//the gif rating should be displayed too.
//each gif should be static when loaded to the page
//when clicked it plays, and it pauses again when clicked again.
