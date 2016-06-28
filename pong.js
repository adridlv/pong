var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame 
|| window.mozRequestAnimationFrame || function (callback){
	window.setTimeout(callback, 1000/60);
}

var canvas = document.createElement("canvas");
var width = 400;
var height = 600;

canvas.width = width;
canvas.height = height;

var context = canvas.getContext('2d');

window.onload = function(){
	document.body.appendChild(canvas);
	animate(step);
	window.addEventListener("keydown", function(event){
	if (e.keyCode == 39) {
     direction_y = ;
    } else if (e.keyCode == 37) {
     direction_x= 'left';
    }  
	
}

var step = function(){
	update();
	render();
	animate(step);
}

var update = function(){
	context.fillStyle = "#a6e5ff";
	context.fillRect(0,0, width, height);
	ball.move();
}

function Paddle(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;
}

Paddle.prototype.render = function (){
	context.fillStyle = "black";
	context.fillRect(this.x,this.y, this.width, this.height);
}

function Player(){
	this.paddle = new Paddle(175,580,50,10);
}

function Computer(){
	this.paddle = new Paddle(175,10,50,10)
}

Player.prototype.render = function(){
	this.paddle.render();
}

Player.prototype.move = function(){

}

Computer.prototype.render = function(){
	this.paddle.render();
}

function Ball(x,y){
	this.x = x;
	this.y = y;
	this.x_speed = 5;
	this.y_speed = 6;
	this.direction_y = 1;
	this.direction_x = 1 ;
	this.radius = 5;
}

Ball.prototype.render = function(){
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2* Math.PI, false);
	context.fillStyle = "blue";
	context.fill();
}

Ball.prototype.move = function(){
	this.x += this.x_speed * this.direction_x;
	this.y += this.y_speed * this.direction_y;
	this.collision();
}

Ball.prototype.collision = function(){
	if(this.y - this.radius < 0) 
		{this.direction_y *= -1} //lo multiplicamos por -1 para que sea indiferente si la direccion va a negativo o positivo. Si es positivo ponmelo a - y viceversa.
	else if (this.y + this.radius > height)
	    {this.direction_y *= -1}
	if(this.x - this.radius < 0)
	   {this.direction_x *= -1}
	else if (this.x + this.radius > width)
	   {this.direction_x *= -1}	
}

var player = new Player();
var computer = new Computer();
var ball = new Ball(width/2, height/2);


var render = function(){
	context.fillStyle = "#a6e5ff";
	context.fillRect(0,0, width, height);
    


	player.render();
	computer.render();
	ball.render();
}