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

function initialiseXY() {
  cameraX = canvas.width / 2;
  cameraY = canvas.height / 2;
  relativeChar = new Vector(0, 0);
}
