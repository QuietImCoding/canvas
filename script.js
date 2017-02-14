var canvas;
var ctx;
var rectCount = 0;
var colCount = 0;
var p1y = 25;
var p1v = 3;
var p2y = 475;
var p2v = -3;
var ballx = 10;
var bally = p1y;
var ballvx = 3;
var ballvy = 3;
var startx = 0;
var starty = 0;
var lastx = 0;
var lasty = 0;
var thingSize;


var doodle = function(e) {
    rectCount++;
    colCount++;
    r = colCount % 255;
    g = Math.ceil(255 / (colCount + 1));
    b = (colCount * 3) % 255
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    ctx.strokeStyle = "rgb(" + Math.floor(r * 0.8) + ", " + Math.floor(g*0.8) + ", " + Math.floor(b*0.8) + ")";
    rect = canvas.getBoundingClientRect();
    ctx.fillRect(e.clientX - rect.left - (rectCount * 5), e.clientY - rect.top - (rectCount * 5), rectCount * thingSize,rectCount * thingSize);
    ctx.strokeRect(e.clientX - rect.left - (rectCount * 5), e.clientY - rect.top - (rectCount * 5), rectCount * thingSize,rectCount * thingSize);
};

var dotClick = function(e) {
    var rect = canvas.getBoundingClientRect();
    var startdist = dist(e.clientX-rect.left, e.clientY-rect.top, startx, starty);
    if (rectCount == 0) {
	var xpos = e.clientX - rect.left;
	var ypos = e.clientY - rect.top;
	ctx.moveTo(xpos, ypos);//e.clientX - rect.left, e.clientY - rect.top);
	startx = xpos;//e.clientX - rect.left;
	starty = ypos;//e.clientY - rect.top;
    } else {
	ctx.moveTo(lastx, lasty);
	if (startdist > thingSize) {
	    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
	} else {
	    ctx.lineTo(startx, starty);
	}
    }
    
    ctx.stroke()
    if (startdist > thingSize) {
	rectCount++;
	ctx.beginPath();
	ctx.arc(e.clientX - rect.left, e.clientY - rect.top, thingSize, 0, 2 * Math.PI);
	ctx.fillStyle = "#FF0000";
	ctx.fill()
	ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
	lastx = e.clientX - rect.left;
	lasty = e.clientY - rect.top;
    } else {
	rectCount = 0;
	ctx.beginPath();
	ctx.arc(startx, starty, thingSize, 0, 2 * Math.PI);
	ctx.fillStyle = "#FF0000";
	ctx.fill()

    }
};

var update = function(){
    if (startx == 0 && starty == 0 ){
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
    var rect = canvas.getBoundingClientRect();
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
    if (startx == 0 && starty == 0) {
	if (ballvx > 0) {
	    p2y = bally;
	} else {
	    p1y = bally;
	}
    }
};

var draw = function(){
    ctx.fillStyle = "#000000";
    var rect = canvas.getBoundingClientRect();
    if (startx == 0 && starty == 0){
	ctx.fillRect(ballx, bally, 10, 10);
    }
    ctx.fillRect(0, p1y-25, 10, 50);

    ctx.fillRect(canvas.width-rect.left-10, p2y-25, 10, 50);
};

var setup = function() {
    canvas = document.getElementById('doodle');
    canvas.width = document.documentElement.clientWidth * 0.9;
    ctx = canvas.getContext('2d');
    thingSize = canvas.width / 100;
    var FPS = 30;
    setInterval(function() {
	update();
	draw();
    }, 1000/FPS);
    canvas.addEventListener("mousedown", dotClick);//doodle);
    canvas.addEventListener("mousemove", checkPosition);
};

var dist = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

var checkPosition = function(e) {
    if (rectCount > 0) {
	var rect = canvas.getBoundingClientRect();
	ctx.beginPath();
	var startdist = dist(e.clientX-rect.left, e.clientY-rect.top, startx, starty);
	console.log(startdist);
	if (startdist<thingSize) {
	    ctx.fillStyle = "#2F9F1E";
	} else {
	    ctx.fillStyle = "#FF0000";
	}
	ctx.arc(startx, starty, thingSize, 0, 2 * Math.PI);
	ctx.fill()
    }
};

var clearAll = function() {
    canvas.width = document.documentElement.clientWidth * 0.9;
    rectCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startx = 0;
    starty = 0;
    lastx = 0;
    lasty = 0;
};
    
window.onload = setup;
