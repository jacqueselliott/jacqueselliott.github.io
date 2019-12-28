function drawCharacter() {
  drawCircle((canvas.width / 2) + relativeChar.x, (canvas.height / 2) + relativeChar.y, 30);
}

function drawField() {
  var distanceBetweenPoints = (canvas.width > canvas.height) 
      ? canvas.width / numPointsMax 
      : canvas.height / numPointsMax;
  firstX = - cameraX % distanceBetweenPoints;
  firstY = - cameraY % distanceBetweenPoints;
  for (var i = firstX; i <= canvas.width; i += distanceBetweenPoints) {
    for (var j = firstY; j <= canvas.height; j += distanceBetweenPoints) {
      drawCircle(i, j, 2);
    }
  }
}