var canvas;
var ctx;
var rectCount = 0;
var colCount = 0;
var p1y = 25;
var p1v = 3;
var p1color = "FF0000";
var p2y = 475;
var p2v = -3;
var p2color = "0000FF";
var ballx = 10;
var bally = p1y;
var ballvx = 3;
var ballvy = 3;

var doodle = function(e) {
    rectCount++;
    colCount++;
    r = colCount % 255;
    g = 255 / (colCount + 1);
    b = (colCount * 3) % 255
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    ctx.strokeStyle = "rgb(" + r * 0.8 + ", " + g*0.8 + ", " + b*0.8 + ")";
    rect = canvas.getBoundingClientRect();
    ctx.fillRect(e.clientX - rect.left - (rectCount * 5), e.clientY - rect.top - (rectCount * 5), rectCount * 10,rectCount * 10);
    ctx.strokeRect(e.clientX - rect.left - (rectCount * 5), e.clientY - rect.top - (rectCount * 5), rectCount * 10,rectCount * 10);
};

var update = function(){
    if (rectCount == 0 ){
	ctx.clearRect(ballx, bally, 10, 10);
	ballx+=ballvx;
	bally+=ballvy;
	if (ballx < 10 || ballx > canvas.width-20) {
	    ballvx = -ballvx;
	}
	if (bally < 0 || bally > 480) {
	    ballvy = -ballvy;
	}
    }
    rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, p1y-25, 10, 50);
    ctx.clearRect(canvas.width-rect.left-10, p2y-25, 10, 50);
    if (p1y - 25 < 0 || p1y + 25 > 500) {
	p1v = -p1v;
    }
    if (p2y - 25 < 0 || p2y + 25 > 500) {
	p2v = -p2v;
    }
    p1y+=p1v;
    p2y+=p2v;
    if (rectCount == 0) {
	if (ballvx > 0) {
	    p2y = bally;
	} else {
	    p1y = bally;
	}
    }
};

var draw = function(){
    rect = canvas.getBoundingClientRect();
    if (rectCount == 0 ){
	if (ballvx > 0){
	    ctx.fillRect(ballx, bally, 10, 10);
	} else {
	    ctx.fillRect(ballx, bally, 10, 10);
	}
    }
    ctx.fillStyle = p1color;
    ctx.fillRect(0, p1y-25, 10, 50);
    //ctx.fillRect(0-rect.left, p1y-25-rect.top, 10, 50);
    ctx.fillStyle = p2color;
    ctx.fillRect(canvas.width-rect.left-10, p2y-25, 10, 50);
};

var setup = function() {
    canvas = document.getElementById('doodle');
    canvas.width = document.documentElement.clientWidth * 0.9;
    ctx = canvas.getContext('2d');
    var FPS = 30;
    setInterval(function() {
	update();
	draw();
    }, 1000/FPS);
    canvas.addEventListener("mousedown", doodle);
};

var clearAll = function() {
    canvas.width = document.documentElement.clientWidth * 0.9;
    rectCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
    
window.onload = setup;
