// Loader function
window.onload = function() {
	
	// Hide loading image
	img = document.getElementById("preloader")
	img.style.opacity = 1;
	(function fade() {
		if ((img.style.opacity -= 0.1) < 0)
			img.style.display = "none";
		else
			requestAnimationFrame(fade);
	})();
	
	// Start google API and load youtube module
	gapi.client.setApiKey("AIzaSyB-TE34jcfVvIUn0Y8JYToYAD7n8u4Shzs");
	gapi.client.load('youtube', 'v3', function() {
		document.getElementById("search-button").disabled = false;
		setTimeout(function () { search(); }, 1000);
	});
	
};

// Disable selection and dragging
document.onselectstart = function () { return false; }
document.ondragstart = function () { return false; }

// Search button handler
document.getElementById("search-button").onclick = function() { search(); }

// Globals
var lastSliderPosition;
var lastMousePosition;
var isSwiping = false;

// Keyboard handler
document.onkeydown = function(e) {
	
	// Find
	if (e.keyCode == 13)
		search();
	
	// Find next
	if (e.keyCode == 107)
		search(lastResponse.nextPageToken);
	
}

// Mouse down handler
var currentScreen = 1;
document.getElementById("video-slider").onmousedown = function(e) {
	
	// Start dragging slider
	isSwiping = true;
	slider = document.getElementById("video-slider");
	if (slider.style.left == "") slider.style.left = "0";
	lastSliderPosition = slider.style.left;
	lastMousePosition = e.pageX;

	// Mouse move handler
	document.onmousemove = function(e) {
		if (isSwiping) {
			
			// Dragging slider
			slider = document.getElementById("video-slider");
			let delta = (e.pageX - lastMousePosition);
			slider.style.left = parseInt(lastSliderPosition, 10) + delta + "px";
			
		}
	}
	
	// Mouse up handler
	document.onmouseup = function(e) {
		isSwiping = false;
			
		// Limit sliding from left side
		if (parseInt(slider.style.left, 10) > 0) {
			slider.style.left = "0";
			return;
		}
		
		// Add one more element if needed
		if (slider.lastChild.getBoundingClientRect().left < window.innerWidth)
			search(lastResponse.nextPageToken);
		
	}
	
}
