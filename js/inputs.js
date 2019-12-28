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
  if (Touch.isTouching()) {
    handleTouch();
    hasChanged = true;
    return;
  } 
  handleKeyboard();
}

function handleKeyboard() {
  var x = 0;
  var y = 0;
  if (Key.isDown(Key.UP) || Key.isDown(Key.W)) {
    y -= 1;
    hasChanged = true;
  }
  if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) {
    x -= 1;
    hasChanged = true;
  } 
  if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) {
    y += 1;
    hasChanged = true;
  } 
  if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) {
    x += 1;
    hasChanged = true;
  }
  var vec = new Vector(x, y);
  relativeChar.add(Vector.times(vec.direction(), dxy));
}

function handleTouch() {
  var touchCoordinates = Touch.getCoordinates();
  var touchVec = new Vector(
    touchCoordinates.x - (canvas.width / 2), touchCoordinates.y - (canvas.height / 2));
  relativeChar.add(Vector.times(touchVec.direction(), dxy));
}