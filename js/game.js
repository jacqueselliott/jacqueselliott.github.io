var hasChanged = true;

var cameraX;
var cameraY;
var relativeCharX;
var relativeCharY;
var dx = 6;
var dy = 6;

var numPointsMax = 12;
var gameFps = 60;

function startGame() {
  createCanvas();
  initialiseXY();
  initialiseInputListeners();
  setInterval(draw, 1000/gameFps);
}

function draw() {
  handleInputs();
  if (!hasChanged && !cameraNeedsReconciling()) {
    return;
  }

  clearCanvas();
  drawCharacter();
  drawField();  
  reconcileCamera();

  hasChanged = false;
}

function drawCharacter() {
  drawCircle((canvas.width / 2) + relativeCharX, (canvas.height / 2) + relativeCharY, 30);
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

function initialiseXY() {
  cameraX = canvas.width / 2;
  cameraY = canvas.height / 2;
  relativeCharX = 0;
  relativeCharY = 0;
}
