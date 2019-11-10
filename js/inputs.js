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

var Touch = {
  touching: false,
  x: 0,
  y: 0,
  
  isTouching: function() {
    return this.touching;
  },

  coordinates: function() {
    return this.x, this.y;
  },

  onTouch: function(event) {
    this.touching = true;
    this.x = event.touches[0].clientX;
    this.y = event.touches[0].clientY;
  },

  onTouchEnd: function(event) {
    this.touching = false;
  }
}

function initialiseInputListeners() {
  document.addEventListener("keyup", function(event) { 
    Key.onKeyup(event); 
  }, false);
  document.addEventListener("keydown", function(event) {
    Key.onKeydown(event); 
  }, false);
  canvas.addEventListener("ontouchenter", function(event) {
    Touch.onTouch(event);
  }, false);
  canvas.addEventListener("ontouchmove", function(event) {
    Touch.onTouch(event);
  }, false);
  canvas.addEventListener("ontouchend", function(event) {
    Touch.onTouchEnd(event);
  }, false);
  canvas.addEventListener("mouseout", function(event) {
    Key.onMouseLeave(event);
  }, false);
  canvas.addEventListener("mouseenter", function(event) {
    Key.onMouseEnter(event);
  }, false);
}