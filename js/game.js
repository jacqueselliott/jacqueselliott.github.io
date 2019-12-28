var hasChanged = true;

var cameraX;
var cameraY;
var relativeChar;
var dxy = 5;

var numPointsMax = 12;
var gameFps = 60;

function startGame() {
  createCanvas();
  initialiseXY();
  initialiseInputListeners();
  console.log("Game started, beginning draw loop");
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

function initialiseXY() {
  cameraX = canvas.width / 2;
  cameraY = canvas.height / 2;
  relativeChar = new Vector(0, 0);
}
