function onPlayClick(playButtonElement) {
  modifyPlayButton(playButtonElement);
  fadeHomePage();
  setTimeout(startGame, transitionTime);
}

function modifyPlayButton(element) {
  element.classList.remove("w3-btn");
  element.classList.add("w3-animate-zoom");
}

function fadeHomePage() {
  fadeChildrenOf(document.getElementById("middle"));
  fadeChildrenOf(document.getElementById("top-right"));
}
