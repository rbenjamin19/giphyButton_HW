var topics = ["Donkey", "Duck", "Chicken"];
//runs all functions
  function start(){
    createButtons();
    buttonClicked();
  };

  start();
//when submit button is clicked add input value to array, create button and load
//to be submitted
  $(".btn-primary").on("click",function(){
    array = $("#usr").val().trim();
    topics = [];
    topics.push(array);
    createButtons();
    buttonClicked();
  })
//function to create buttons out of the strings in the array
  function createButtons(){
  for(var i =0; i<topics.length; i++){
    $("#animalButtons").append("<button type='button' class='btn-default' data-person='" + topics[i] +
      "'>"+ topics[i] + "</button>");
   };
 }
//function to pull in 10 gifs after calling the string name to the API
function buttonClicked(){
$(".btn-default").on("click", function() {
      $("#animalGif").empty();
      // In this case, the "this" keyword refers to the button that was clicked
      var animal = $(this).attr("data-person");

      // Constructing a URL to search Giphy for value of the string of the button that was clicked
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
 $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);
              

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#animalGif").prepend(gifDiv);
            
          }
        }); 
    });
}