var x ;
var y ;
var dx ;
var dy ;
var c;
var width;
var height;
var paddlex,paddleh = 10,paddlew = 75;
var rightDown = false,leftDown = false;
var canvasMinX, canvasMaxX;
var intervalId;
var bricks;
var rows = 5;
var columns = 5;
var brickwidth;
var brickheight = 15;
var padding = 1;
var ballr = 10;
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var paddlecolor = "#FFFFFF";
var ballcolor = "#FFFFFF";
var backcolor = "#000000";
var score=0;

function init() {
  $("#start").attr('disabled','disabled');
  c = $('#canvas')[0].getContext("2d");
  width = $("#canvas").width();
  height = $("#canvas").height();
  paddlex = width / 2;
  brickwidth = (width/columns) - 1;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + width;
  x = 25;
  y = 250;
  dx = 1.5;
  dy = -4;
  paddleh = 10;
  paddlew = 75;
  rightDown = false;
  leftDown = false;
  rows = 5;
  columns = 5;
  brickwidth;
  brickheight = 15;
  padding = 1;
  ballr = 10;
  rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
  paddlecolor = "#FFFFFF";
  ballcolor = "#FFFFFF";
  backcolor = "#000000";
  initbricks();
  intervalId = setInterval(draw, 10);
  
}

function circle(x,y,r) {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI*2, true);
  c.closePath();
  c.fill();
}

function rect(x,y,w,h) {
  c.beginPath();
  c.rect(x,y,w,h);
  c.closePath();
  c.fill();
}

function clear() {
  c.clearRect(0, 0, width, height);
  rect(0,0,width,height);
}

function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}



function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = Math.max(evt.pageX - canvasMinX - (paddlew/2), 0);
    paddlex = Math.min(width - paddlew, paddlex);
  }
}

function initbricks() {
    bricks = new Array(rows);
    for (i=0; i < rows; i++) {
        bricks[i] = new Array(columns);
        for (j=0; j < columns; j++) {
            bricks[i][j] = 1;
        }
    }
}

function drawbricks() {
  for (i=0; i < rows; i++) {
    c.fillStyle = rowcolors[i];
    for (j=0; j < columns; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (brickwidth + padding)) + padding, 
             (i * (brickheight + padding)) + padding,
             brickwidth, brickheight);
      }
    }
  }
}


function draw() {
  c.fillStyle = backcolor;
  clear();
  c.fillStyle = ballcolor;
  circle(x, y, ballr);

  if (rightDown) paddlex += paddlex<width-75?5:0;
  else if (leftDown) paddlex -= paddlex>0?5:0;
  c.fillStyle = paddlecolor;
  rect(paddlex, height-paddleh, paddlew, paddleh);

  drawbricks();

  rowheight = brickheight + padding;
  colwidth = brickwidth + padding;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  if (y < rows * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
    score++;
    if(score==rows*columns){
      clearInterval(intervalId);
      c.fillStyle="#000";
      clear();
      c.fillStyle="#fff";
      c.font="bold 26px 'Century Gothic', Arial";

      c.fillText("You Won!",75,150);
      c.font="bold 14px 'Century Gothic', Arial";

      c.fillText("You scored: "+score+"!",80,180);
      score=0;
      //start button disabled when the game is running
      $("#start").removeAttr("disabled");


    }

  }
 
  if (x + dx + ballr > width || x + dx - ballr < 0)
    dx = -dx;

  if (y + dy - ballr < 0)
    dy = -dy;
  else if (y + dy + ballr > height - paddleh) {
    if (x > paddlex && x < paddlex + paddlew) {
      dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
      dy = -dy;
    }
    else if (y + dy + ballr > height){
      clearInterval(intervalId);
      c.fillStyle="#000";
      clear();
      c.fillStyle="#fff";
      c.font="bold 26px 'Century Gothic', Arial";

      c.fillText("GAME OVER",75,150);
      c.font="bold 14px 'Century Gothic', Arial";

      c.fillText("Your score: "+score,110,180);
      score=0;
      //start button disabled when the game is running
      $("#start").removeAttr("disabled");
      

    }
  }
 
  x += dx;
  y += dy;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);
$("#start").click(init);
