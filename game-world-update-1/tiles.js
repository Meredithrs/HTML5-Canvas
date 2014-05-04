function Canvas(id){
	this.handle		=	document.getElementById(id);
	this.context	=	this.handle.getContext("2d");
	this.width		=	this.handle.width;
	this.height		=	this.handle.height;
}

Canvas.prototype.onclick	=	function(e){
	alert("You forgot to redefine onclick");
}
Canvas.prototype.onhover	=	function(e){
	alert("You forgot to redefine onclick");
}

Game.prototype	=	new Canvas("game");
function Game(id){
	this.handle		=	this.__proto__.handle;
	this.context	=	this.__proto__.context;
	this.width		=	this.__proto__.width;
	this.height		=	this.__proto__.height;
	var loopcount	=	0;
	this.drawTile	=	function(x, y, color, size){
		if(x*size+2*size > this.width || y*size+2*size > this.height){
			return;
		}
		this.context.fillStyle	=	color;
		this.context.fillRect(x * size, y * size, size, size);
	}
	this.loop	=	function(){
		loopcount++;
	}
	this.getLoopCount	=	function(){
		return loopcount;
	}
}

Game.prototype.onclick	=	function(e, canvas, player, map){
	if(!player.isMoving()){
		player.move();
		var speed	=	2;
		var time	=	600;
		var x	=	Math.floor((e.clientX - canvas.offsetLeft)/25) - Math.floor(canvas.width/50);
		var y	=	Math.floor((e.clientY - canvas.offsetTop)/25) - Math.floor(canvas.height/50);
		
		var callCountx = 0;
		if(x != 0){
			var repeaterx = setInterval(function () {
				if (callCountx < Math.abs(x)){
					player.move();
					player.setPosition(x/Math.abs(x), 0);
					callCountx += 1;
				}else{
					clearInterval(repeaterx);
					player.stop();
				}
			}, time/speed);
		}
		if(y != 0){
			var callCounty = 0;
			var repeatery = setInterval(function () {
				if (callCounty < Math.abs(y)){
					player.move();
					player.setPosition(0, y/Math.abs(y));
					callCounty += 1;
				}else{
					clearInterval(repeatery);
					player.stop();
				}
			}, time/speed);
		}
	}
}
Game.prototype.onhover	=	function(e){
	//alert("Hovered over game window.");
}


function Map(){
	var river	=	new River();
	var ocean	=	new Ocean();
	var stonewall	=	new StoneWall();
	var stonepath	=	new StonePath();
	var grass		=	new Grass();
	var woodpath	=	new WoodPath();
	var woodfloor	=	new WoodFloor();
	var empty		=	new Empty();
	
	//{
	var data	=	"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,2,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4,4,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,4,4,0,0,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4,2,2,2,4,2,2,2,4,2,2,2,2,4,2,2,2,4,2,2,2,4,0,0,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,4,2,2,4,0,0,0,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,4,2,4,2,2,2,4,2,2,2,2,4,2,2,2,4,2,4,0,0,0,0,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,4,2,4,2,2,2,4,2,2,2,2,4,2,2,2,2,2,4,0,0,0,0,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,4,2,4,2,2,2,4,2,2,2,2,4,2,2,2,4,2,4,0,0,0,0,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,4,2,4,4,2,4,4,4,2,2,4,4,4,4,4,4,2,4,0,0,0,0,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,4,0,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,4,0,0,4,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,4,0,0,4,0,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,4,0,0,4,0,0,0,0,0,4,4,4,4,4,4,2,2,4,4,4,4,4,4,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,2,4,4,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,4,0,0,0,4,4,4,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,4,4,4,2,4,0,0,0,1,1,0,0,0,4,2,4,4,4,0,4,0,0,4,2,2,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,4,2,2,4,0,0,1,1,0,0,4,2,2,4,0,0,0,0,4,4,4,2,2,4,4,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,4,2,2,4,4,4,1,1,4,4,4,2,2,4,0,4,4,4,4,2,2,2,2,2,2,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,4,4,0,0,0,1,1,0,0,0,4,4,0,0,4,2,2,4,2,2,2,2,2,2,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,4,2,2,4,2,2,2,2,2,2,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,4,2,2,4,2,2,2,2,2,2,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,4,2,2,4,2,2,2,2,2,2,4,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,4,4,2,4,4,4,4,2,4,4,4,0,4,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,2,2,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,4,4,4,2,2,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,4,2,2,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,2,4,4,4,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,4,2,4,0,0,0,1,0,0,0,4,2,2,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,4,4,4,4,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,4,4,4,4,4,2,4,4,4,0,1,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,4,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,4,1,1,0,4,2,2,2,2,2,2,2,4,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,2,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,4,1,1,1,2,2,2,2,2,2,2,2,4,4,1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,4,2,2,2,2,4,0,0,0,0,0,0,0,4,0,1,1,2,2,2,2,2,2,2,2,4,0,1,1,1,1,1,1,1,1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,4,0,0,0,0,0,0,0,0,4,0,0,4,2,2,2,2,2,2,2,4,0,1,0,0,1,0,0,4,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,4,0,0,0,0,0,0,0,0,0,4,0,0,4,4,4,4,4,4,4,4,4,0,1,1,1,1,0,0,4,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,4,2,2,4,0,0,5,5,5,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,4,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,5,5,5,5,5,5,5,5,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5";//}
	
	this.map	=	[];
	var k		=	0;
	var tile;
	data		=	data.split(",");
	for(var i = 0; i < 64; i++){
		this.map[i] = [];
		for(var j = 0; j < 64; j++){
			switch(data[k]){
				case '0':
					this.map[i][j]	=	grass;
					break;
				case '1':
					this.map[i][j]	=	stonepath;
					break;
				case '2':
					this.map[i][j]	=	woodpath;
					break;
				case '4':
					this.map[i][j]	=	stonewall;
					break;
				case '5':
					this.map[i][j]	=	new River();
					break;
				default:
					this.map[i][j]	=	empty;
					break;
			}
			k++;
		}
	}
	
	this.drawViewport	=	function(player, game){
		var canvas	=	game.handle;
		var domain	=	Math.floor(canvas.width / 25);
		var range	=	Math.floor(canvas.height / 25);
		for(i = -Math.floor(domain/2); i <= Math.floor(domain/2); i++){
			for(j = Math.floor(range/2); j >= -Math.floor(range/2); j--){
				x	=	Math.floor(player.position.x) + i;
				y	=	Math.floor(player.position.y) + j;
				if(this.map[x] === undefined || this.map[x][y] === undefined){
					game.drawTile(i + Math.floor(domain/2), j + Math.floor(range/2), empty.getColor(), 25);
				}else{
					if(this.map[x][y].isAnimated()){
						if(game.getLoopCount()%40 === 0){
							game.drawTile(i + Math.floor(domain/2), j + Math.floor(range/2), this.map[x][y].getColor(), 25);
						}else{
							game.drawTile(i + Math.floor(domain/2), j + Math.floor(range/2), this.map[x][y].getPreviousColor(), 25);
						}
					}else{
						game.drawTile(i + Math.floor(domain/2), j + Math.floor(range/2), this.map[x][y].getColor(), 25);
					}
				}
			}
		}
		game.drawTile(Math.floor(domain/2), Math.floor(range/2), "white", 25);
	}
	
	this.getTileAt		=	function(x, y){
		x	=	Math.floor(x);
		y	=	Math.floor(y);
		if(this.map[x][y] != undefined){
			return this.map[x][y];
		}else{
			return empty;
		}
	}
}

function Quadtree(node, one, two, three, four){
	var one	=	one;
	var two	=	two;
	var three	=	three;
	var four	=	four;
}

function Tile(){
	this.getName	=	function(){
		throw "Virtual method not overridden";
	}
	
	this.getColor	=	function(){
		throw "Virtual method not overridden";
	}
	
	this.isAnimated	=	function(){
		throw "Virtual method not overridden";
	}
	
	this.isWalkable	=	function(){
		throw "Virtual method not overridden";
	}
	
	this.canBlur	=	function(){
		throw "Virtual method not overridden";
	}
}


River.prototype	=	new Tile();
function River(){
	var color	=	"hsl(203.4, 65.1%, " + randomIntFromInterval(55, 70) + "%)";
	this.getName	=	function(){
		return "River";
	}
	
	this.getColor	=	function(){
		color	=	"hsl(203.4, 65.1%, " + randomIntFromInterval(55, 70) + "%)";
		return color;
	}
	
	this.getPreviousColor	=	function(){
		return color;
	}
	
	this.isAnimated	=	function(){
		return true;
	}
	
	this.isWalkable	=	function(){
		return false;
	}
	
	this.canBlur	=	function(){
		return true;
	}
}

Ocean.prototype	=	new Tile();
function Ocean(){
	this.getName	=	function(){
		return "Ocean";
	}
	
	this.getColor	=	function(){
		return "hsl(203.4, 65.1%, " + randomIntFromInterval(45, 60) + "%)";
	}
	
	this.isAnimated	=	function(){
		return true;
	}
	
	this.isWalkable	=	function(){
		return false;
	}
	
	this.canBlur	=	function(){
		return true;
	}
}

StoneWall.prototype	=	new Tile();
function StoneWall(){
	this.getName	=	function(){
		return "Stone wall";
	}
	
	this.getColor	=	function(){
		return "#a0a0a0";
	}
	
	this.isAnimated	=	function(){
		return false;
	}
	
	this.isWalkable	=	function(){
		return false;
	}
	
	this.canBlur	=	function(){
		return false;
	}
}

StonePath.prototype	=	new Tile();
function StonePath(){
	this.getName	=	function(){
		return "Stone path";
	}
	
	this.getColor	=	function(){
		return "#d1d1d1";
	}
	
	this.isAnimated	=	function(){
		return false;
	}
	
	this.isWalkable	=	function(){
		return true;
	}
	
	this.canBlur	=	function(){
		return true;
	}
}

Grass.prototype	=	new Tile();
function Grass(){
	this.getName	=	function(){
		return "Grass";
	}
	
	this.getColor	=	function(){
		return "#73be51";
	}
	
	this.isAnimated	=	function(){
		return false;
	}
	
	this.isWalkable	=	function(){
		return true;
	}
	
	this.canBlur	=	function(){
		return true;
	}
}

WoodPath.prototype	=	new Tile();
function WoodPath(){
	this.getName	=	function(){
		return "Wood path";
	}
	
	this.getColor	=	function(){
		return "#bea06b";
	}
	
	this.isAnimated	=	function(){
		return false;
	}
	
	this.isWalkable	=	function(){
		return true;
	}
	
	this.canBlur	=	function(){
		return true;
	}
}

WoodFloor.prototype	=	new Tile();
function WoodFloor(){
	this.getName	=	function(){
		return "Wood floor";
	}
	
	this.getColor	=	function(){
		return "#bea06b";
	}
	
	this.isAnimated	=	function(){
		return false;
	}
	
	this.isWalkable	=	function(){
		return true;
	}
	
	this.canBlur	=	function(){
		return false;
	}
}

Empty.prototype	=	new Tile();
function Empty(){
	this.getName	=	function(){
		return "Empty";
	}
	
	this.getColor	=	function(){
		return "black";
	}
	
	this.isAnimated	=	function(){
		return false;
	}
	
	this.isWalkable	=	function(){
		return false;
	}
	
	this.canBlur	=	function(){
		return false;
	}
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Player(username, x, y){
	this.position	=	new Position(x, y);
	this.previous_position	=	new Position(x, y);
	this.username	=	username;
	this.hitpoints	=	{current:45, max: 99};
	this.prayer		=	{current:99, max: 99};
	this.run		=	{current:50, max: 100};
	var moving	=	false;
	
	this.setPosition		=	function(x, y){
		x	=	this.position.x + x;
		y	=	this.position.y + y;
		var tile	=	map.getTileAt(x, y);
		if(tile.isWalkable()){
			this.previous_position.x	=	this.position.x;
			this.previous_position.y	=	this.position.y;
			this.position.x				=	x;
			this.position.y				=	y;
			draw();
		}
	}
	
	this.isMoving			=	function(){
		return moving;
	}
	
	this.move				=	function(){
		moving	=	true;
	}
	
	this.stop				=	function(){
		moving	=	false;
	}
}

function Position(x, y){
	this.x	=	x;
	this.y	=	y;
}

function draw(){
	game.loop();
	map.drawViewport(player, game);
}

function gameloop(){
	setInterval(draw, 20);
}

var player	=	new Player("Meredith", 32, 32);

var game	=	new Game();
game.handle.addEventListener('click', function(e){game.onclick(e, game.handle, player, map)}, false);
game.handle.addEventListener('mousemove', function(e){game.onhover(e)}, false);
var map	=	new Map();

gameloop();


