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

function handleInputs() {
  if (Key.isDown(Key.UP) || Key.isDown(Key.W)) {
    relativeCharY -= dy;
    hasChanged = true;
  }
  if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) {
    relativeCharX -= dx;
    hasChanged = true;
  } 
  if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) {
    relativeCharY += dy;
    hasChanged = true;
  } 
  if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) {
    relativeCharX += dx;
    hasChanged = true;
  }
  if (Touch.isTouching()) {
    handleTouch();
    hasChanged = true;
  } 
}

function cameraNeedsReconciling() {
  if (relativeCharX != 0 || relativeCharY != 0) {
    return true;
  }
  return false;
}

function handleTouch() {
  var touchCoordinates = Touch.getCoordinates();
  centredCoordinates = new Coordinates(touchCoordinates.x - (canvas.width / 2), touchCoordinates.y - (canvas.height / 2));
  magnitude = Math.sqrt(Math.pow(centredCoordinates.x, 2) + Math.pow(centredCoordinates.y, 2));
  deltaX = (centredCoordinates.x / magnitude) * dx;
  deltaY = (centredCoordinates.y / magnitude) * dy;
  relativeCharX += deltaX;
  relativeCharY += deltaY;
}

function drawCharacter() {
  drawCircle((canvas.width / 2) + relativeCharX, (canvas.height / 2) + relativeCharY, 30);
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

function reconcileCamera() {
  var recX = reconcileDirection(relativeCharX, dx);
  var recY = reconcileDirection(relativeCharY, dy);
  cameraX += recX;
  cameraY += recY;
  relativeCharX -= recX;
  relativeCharY -= recY;
}

function reconcileDirection(relativeDistance, increment) {
  if (relativeDistance != 0) {
    var reconciliation;
    if (Math.abs(relativeDistance) >= 5 * increment) {
      reconciliation = increment;
    } else if (Math.abs(relativeDistance) >= 0.5 * increment) {
      reconciliation = 0.5 * increment;
    } else {
      reconciliation = Math.abs(relativeDistance);
    }
    console.log(relativeDistance, reconciliation);
    if (relativeDistance > 0) {
      return reconciliation;
    } else {
      return -reconciliation;
    }
  }
  return 0;
}

function initialiseXY() {
  cameraX = canvas.width / 2;
  cameraY = canvas.height / 2;
  relativeCharX = 0;
  relativeCharY = 0;
}
