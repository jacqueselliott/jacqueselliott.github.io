var canvas;
var ctx;

var x;
var y;
var dx = 6;
var dy = 6;

var Key = {
  pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  
  isDown: function(keyCode) {
    return this.pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  }
};

function startGame() {
  createCanvas();
  setInterval(drawCharacter, 1000/60);
  initialiseControls();
}

function createCanvas() {
  var element = document.createElement("canvas");
  element.width = document.body.clientWidth;
  element.height = document.body.clientHeight;
  canvas = element;
  ctx = canvas.getContext("2d");
  x = canvas.width / 2;
  y = canvas.height / 2;
  var container = document.getElementById("middle");
  container.appendChild(canvas);
}

function drawCharacter() {
  readInputs();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#080808";
  ctx.fill();
  ctx.closePath();
}

function readInputs() {
  if (Key.isDown(Key.UP) || Key.isDown(Key.W)) y -= dy;
  if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) x -= dx;
  if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) y += dy;
  if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) x += dx;
}

function initialiseControls() {
  document.addEventListener("keyup", function(event) { 
    Key.onKeyup(event); 
  }, false);
  document.addEventListener("keydown", function(event) {
    Key.onKeydown(event); 
  }, false);
}
