var hasChanged = true;

var cameraX;
var cameraY;
var dx = 6;
var dy = 6;

var numPointsMax = 12;

function startGame() {
  createCanvas();
  initialiseXY();
  initialiseInputListeners();
  setInterval(draw, 1000/60);
}

function readInputs() {
  if (Key.isDown(Key.UP) || Key.isDown(Key.W)) {
    cameraY -= dy;
    hasChanged = true;
  }
  if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) {
    cameraX -= dx;
    hasChanged = true;
  } 
  if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) {
    cameraY += dy;
    hasChanged = true;
  } 
  if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) {
    cameraX += dx;
    hasChanged = true;
  } 
}

function draw() {
  readInputs();
  if (!hasChanged) {
    return;
  }

  clearCanvas();
  drawCharacter();
  drawField();

  hasChanged = false;
}

function drawCharacter() {
  drawCircle(canvas.width / 2, canvas.height / 2, 30);
}

function drawField() {
  var distanceBetweenPoints = (canvas.width > canvas.height) ? canvas.width / numPointsMax : canvas.height / numPointsMax;
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
}
