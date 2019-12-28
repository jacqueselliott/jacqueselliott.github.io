var Key = {
  pressed: {},
  focused: true,

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  
  isDown: function(keyCode) {
    return this.focused && this.pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  },

  onMouseLeave: function(event) {
    this.pressed = {};
    this.focused = false;
  },

  onMouseEnter: function(event) {
    this.focused = true;
  }
};

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var Touch = {
  touching: false,
  coordinates: new Coordinates(0, 0),
  
  isTouching: function() {
    return this.touching;
  },

  getCoordinates: function() {
    return this.coordinates;
  },

  onTouch: function(event) {
    this.touching = true;
    this.coordinates = new Coordinates(event.touches[0].clientX, event.touches[0].clientY);
  },

  onTouchEnd: function(event) {
    this.touching = false;
  }
};

function initialiseInputListeners() {
  document.addEventListener("keyup", function(event) { 
    Key.onKeyup(event); 
  }, false);
  document.addEventListener("keydown", function(event) {
    Key.onKeydown(event); 
  }, false);
  canvas.addEventListener("touchstart", function(event) {
    Touch.onTouch(event);
  }, false);
  canvas.addEventListener("touchmove", function(event) {
    Touch.onTouch(event);
  }, false);
  canvas.addEventListener("touchend", function(event) {
    Touch.onTouchEnd(event);
  }, false);
  canvas.addEventListener("mouseout", function(event) {
    Key.onMouseLeave(event);
  }, false);
  canvas.addEventListener("mouseenter", function(event) {
    Key.onMouseEnter(event);
  }, false);
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

function handleTouch() {
  var touchCoordinates = Touch.getCoordinates();
  centredCoordinates = new Coordinates(touchCoordinates.x - (canvas.width / 2), touchCoordinates.y - (canvas.height / 2));
  magnitude = Math.sqrt(Math.pow(centredCoordinates.x, 2) + Math.pow(centredCoordinates.y, 2));
  deltaX = (centredCoordinates.x / magnitude) * dx;
  deltaY = (centredCoordinates.y / magnitude) * dy;
  relativeCharX += deltaX;
  relativeCharY += deltaY;
}