var canvas;
var ctx;

function createCanvas() {
  var element = document.createElement("canvas");
  element.width = document.body.clientWidth;
  element.height = document.body.clientHeight;
  canvas = element;
  ctx = canvas.getContext("2d");
  var container = document.getElementById("middle");
  container.appendChild(canvas);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#080808";
  if (Touch.isTouching()) {
    ctx.fillStyle = "#0000ff";
  }
  ctx.fill();
  ctx.closePath();
}