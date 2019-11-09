function onPlayClick(playButtonElement) {
  modifyPlayButton(playButtonElement);
  fadeHomePage();
}

function modifyPlayButton(element) {
  element.classList.remove("w3-btn");
  element.classList.add("w3-animate-zoom");
  element.innerHTML = "(this is WIP)";
}

function fadeHomePage() {
  fadeChildrenOf(document.getElementById("middle"));
  fadeChildrenOf(document.getElementById("top-right"));
}
