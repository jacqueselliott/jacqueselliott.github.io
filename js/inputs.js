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

function initialiseInputListeners() {
  document.addEventListener("keyup", function(event) { 
    Key.onKeyup(event); 
  }, false);
  document.addEventListener("keydown", function(event) {
    Key.onKeydown(event); 
  }, false);
  canvas.addEventListener("mouseout", function(event) {
    Key.onMouseLeave(event);
  }, false);
  canvas.addEventListener("mouseenter", function(event) {
    Key.onMouseEnter(event);
  }, false);
}