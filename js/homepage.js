function onPlayClick() {
  var element = document.getElementById("play-button"); 
  element.classList.remove("w3-btn");
  element.classList.add("w3-animate-zoom");
  element.innerHTML = "WIP";
}