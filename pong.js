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
		if (event.keyCode == 39) {
			player.paddle.moveRight = true;
		}
		if (event.keyCode == 37) {
			player.paddle.moveLeft = true;
		}  
	});

	window.addEventListener("keyup", function(event){
		if (event.keyCode == 39) {
			player.paddle.moveRight = false;
		}
		if (event.keyCode == 37) {
			player.paddle.moveLeft = false;
		}  
	});	
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
	player.move();
	computer.move(ball);
}

function Paddle(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 6;
	this.y_speed = 4;
	this.moveRight = false;
	this.moveLeft = false;
}

Paddle.prototype.render = function (){
	context.fillStyle = "black";
	context.fillRect(this.x,this.y, this.width, this.height);
}

function Player(){
	this.paddle = new Paddle(175,550,50,10);
}

Player.prototype.render = function(){
	this.paddle.render();
}

Player.prototype.move = function(){
	if(this.paddle.moveLeft){
		if(this.paddle.x - this.paddle.x_speed > 0)
			this.paddle.x -= this.paddle.x_speed;
	}
	if(this.paddle.moveRight){
		if(this.paddle.x + this.paddle.width + this.paddle.x_speed < width)
			this.paddle.x += this.paddle.x_speed;
	}
}

function Computer(){
	this.paddle = new Paddle(175,30,50,10);
}

Computer.prototype.move = function(ball){
	var diff = -((this.paddle.x + (this.paddle.width / 2)) - ball.x);

	if(diff < -4) { // max speed left
		diff = -5;
  } else if(diff > 4) { // max speed right
  	diff = 5;
  }

  if(this.paddle.x + diff > 0 && this.paddle.x + this.paddle.width + diff < width)
  	this.paddle.x += diff;
}

Computer.prototype.render = function(){
	this.paddle.render();
}

function Ball(x,y){
	this.x = x;
	this.y = y;
	this.x_speed = 3;
	this.y_speed = 3;
	this.direction_y = 1;
	this.direction_x = 1 ;
	this.radius = 5;
	this.bounce = true;
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
	this.collision(player, computer);
}

Ball.prototype.collision = function(player, computer){
	//aqui hay que controlar el reseteo del juego con sus puntuaciones
	if(this.y - this.radius < 0) 
		resetGame(); //lo multiplicamos por -1 para que sea indiferente si la direccion va a negativo o positivo. Si es positivo ponmelo a - y viceversa.
	else if (this.y + this.radius > height)
		resetGame();

	if(this.x - this.radius < 0)
		this.direction_x = 1;
	else if (this.x + this.radius > width)
		this.direction_x = -1;	

	if(this.y - this.radius < player.paddle.y + player.paddle.height 
		&& this.y + this.radius > player.paddle.y 
		&& this.x - this.radius > player.paddle.x 
		&& this.x + this.radius < player.paddle.x + player.paddle.width){
		this.direction_y = -1;
	this.x_speed += player.paddle.x_speed / 3;
}

if(this.y - this.radius < computer.paddle.y + computer.paddle.height 
	&& this.y + this.radius > computer.paddle.y 
	&& this.x - this.radius > computer.paddle.x 
	&& this.x + this.radius < computer.paddle.x + computer.paddle.width){
	this.direction_y = 1;
this.x_speed += computer.paddle.x_speed / 3;
}
}

function resetGame(){

	ball.x_speed = 4;
	ball.y_speed = 4;
	ball.x = width/2;
	ball.y = height/2;
	player.paddle.x = width/2 - player.paddle.width/2;
	computer.paddle.x = width/2 - player.paddle.width/2;

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