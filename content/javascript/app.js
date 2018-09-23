$( document ).ready(function() {
	//first, create my original array that will (hopefully) be updated with the users choices.

	var subj = ["Smash Bros 64", "Smash Bros Melee", "Smash Bros Brawl", "Smash Bros 3DS", "Smash Bros Wii U", "Smash Bros Ultimate (Coming Soon)", "Mario", "Kirby"];

	//Now, create a function that will display the gif buttons...loop throught the array

	function disButtons(){
		$("#buttonsView").empty();
		for(var i=0; i<subj.length; i++){
			var gifButton = $("<button>");
			gifButton.addClass("fav");
			gifButton.addClass("btn btn-primary");
			gifButton.attr("data-name", subj[i]);
			gifButton.text(subj[i]);
			$("#buttonsView").append(gifButton);
		}
	}

	// Next, create a function that will display the gif buttons

	function newButton(){
		$("#addGif").on("click", function(){
			var char = $("#subjInput").val().trim();
			if (char == ""){
				return false; //This will stop blank buttons from being created	
			}

			subj.push(char);

			disButtons();
			return false;
		});
		$('subjInput').val('');
	}

	//Now, create a function to remove the last button.
	function removeButton(){
		$("removeGif").on("click", function() {
			subj.pop(char);
			disButtons();
			return false;
		});
	
	}
	// This will show the results of the gifs

	function displayGifs() {
		var starwars = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + smashbros + "&api_key=QFIiD3HZspx02x93i3uxFzMlF0dTiA8N&limit=10";
		console.log(queryURL); // displays the constructed url

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(res){
			console.log(res); // console test to make sure something returns
			$("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
			var results = res.data; //shows results of gifs
			if (results == ""){
				alert("Aww, I don't have a Giphy for that one, try again!!");

			}
			for (var i = 0; i<results.length; i++){
				//This will put the gifs in the specified div
				var gifDiv = $("<div>");
				//This is going to add the rating of the gif
				gifDiv.addClass("gifDiv");
				var gifRating = $("<p>").text("Rating " + results[i].rating);
				gifDiv.append(gifRating);

		//This will now pull the Gif from the site.

				var gifImg = $("<img>");
				gifImg.attr("src", results[i].images.fixed_height_small_still.url);
				//This is for paused imgs 
				gifImg.attr("data-still", results[i].images.fixed_height_small_still.url);
				//This is for animated imgs
				gifImg.attr("data-animate", results[i].images.fixed_height_small.url);
				//When imgs are already paused
				gifImg.attr("data-state", "still");
				gifImg.addClass("image");
				gifDiv.append(gifImg);
				//Next, I will add a new div to the existing divs
				$("#gifsView").prepend(gifDiv);

			}

		});
	} 

		//Here is the list of the Characters already provided

		disButtons();
		newButton();
		removeButton();

		//Here are the event listeners
		$(document).on("click", ".fav", displayGifs);
		$(document).on("click", ".image", function(){
			var state = $(this).attr("data-state");
			if (state == "still"){
				$(this).attr("src", $(this).data("animate"));
				$(this).attr("data-source", "animate");

			}else{
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");

			}

		});

	});


