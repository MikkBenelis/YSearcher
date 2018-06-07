// Search for string
var lastRequest;
var lastResponse;
var initialSliderWidth = window.innerWidth;
function search(pageToken='') {
	
	// Variables
	const elementWidth = 530;
	let max = Math.round(window.innerWidth / elementWidth);
	let text = document.getElementById("search-field").value;
	if (text == "") text = "cats";
	
	// Prepare request
	var request = gapi.client.youtube.search.list({
		part: 'snippet',
		type: 'video',
		pageToken: pageToken,
		maxResults: max,
		q: text
	});

	// Send request and process response
	request.execute(function(response) {
		
		// Generate list
		let list = "";
		array = response.result.items;
		const youtubeWatch = "https://youtube.com/watch?v=";
		for (i = 0; i < Math.floor(array.length); i++) {
			list += "<li class='element'>";
				list += "<a href='" + youtubeWatch + array[i].id.videoId + "' target='_blank'>" +
						"<img src='" + array[i].snippet.thumbnails.high.url + "'></a>";
				list += "<p class='title'>" + array[i].snippet.title + "</p>";
				list += "<p class='description'>" + array[i].snippet.description + "</p>" + "<hr>";
				list += "<p class='publ'>Дата публикации: <span class='publ-info'>"+
						(new Date(array[i].snippet.publishedAt)).toLocaleDateString()+"</span></p>"
				list += "<p class='author'>Автор: <span class='author-info'>" + array[i].snippet.channelTitle + "</span></p>"
			list += "</li>";
		};
		
		// Add items to list
		slider = document.getElementById("video-slider");
		if (text == lastRequest) {
			slider.innerHTML += list;
			slider.style.width = parseInt(slider.style.width, 10) + initialSliderWidth + "px";
		} else {
			console.log("total results: " + response.pageInfo.totalResults);
			slider.style.display = "flex";
			if (response.pageInfo.totalResults == 0)
				slider.style.display = "none";
			slider.style.left = "0";
			slider.style.width = initialSliderWidth + "px";
			slider.innerHTML = list;
			search(response.nextPageToken);
		}
		
		// Save current info
		lastRequest = text;
		lastResponse = response;
		
	});
  
}