var transitionTime = 2000;
var animationFps = 60;

function fadeChildrenOf(element) {
  var children = element.children;
  for (var i = 0; i < children.length; i++) {
    fadeAway(children[i]);
  }
}

function fadeAway(element) {
  element.style.opacity = 1;

  var timeBetweenDecrements = transitionTime / animationFps;
  var opacityDecrements = 1 / timeBetweenDecrements;

  var fade = setInterval(function() {
    if (element.style.opacity > 0) {
      element.style.opacity -= 0.025;
    } else {
      clearInterval(fade);
      element.remove();
    }
  }, timeBetweenDecrements);
}

export {fadeChildrenOf};
