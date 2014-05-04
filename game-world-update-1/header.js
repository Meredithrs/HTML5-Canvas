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
		if(x*size-2*size > this.width || y*size-2*size > this.height){
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
		map.highlight(x, y);
		
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
					map.unhighlight();
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
	var hightlight	=	new Position("", "");
	
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
		var range	=	Math.floor(canvas.height / 25)-1;
		for(i = -Math.floor(domain/2); i <= Math.floor(domain/2); i++){
			for(j = Math.floor(range/2); j >= -Math.floor(range/2)-5; j--){
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
					if(x == highlight.position.x && y == highlight.position.y){
						this.drawHighlight(game.handle);
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
	
	this.highlight		=	function(x, y){
		this.highlight.position.x	=	x;
		this.highlight.position.y	=	y;
	}
	
	this.unhighlight	=	function(){
		this.highlight.position.x	=	"";
		this.highlight.position.y	=	"";
	}
	
	this.drawHighlight	=	function(context){
		context.beginPath(); 
		context.lineWidth="3";
		context.strokeStyle="red";
		context.moveTo(25*highlight.position.x+6,25*highlight.position.y+6);
		context.lineTo(25*(highlight.position.x+1)-6,25*(highlight.position.y+1)-6);
		context.moveTo(25*(highlight.position.x+1)-6,25*highlight.position.y+6);
		context.lineTo(25*highlight.position.x+6,25*(highlight.position.y+1)-6);
		context.stroke();
	}
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

LowerInterface.prototype	=	new Canvas("lower-interface");
function LowerInterface(id){
	this.handle		=	this.__proto__.handle;
	this.context	=	this.__proto__.context;
	this.width		=	this.__proto__.width;
	this.height		=	this.__proto__.height;
	
	this.messages	=	new Array();
	this.previous_message	=	"";
	
	this.push		=	function(message, color){
		if(this.previous_message != message){
			if(color == undefined){
				color	=	"black";
			}
			this.messages.push({message: message, color: color});
			this.previous_message	=	message;
		}
	}
	this.get		=	function(){
		return this.messages.slice(-9);
	}
	this.drawChat	=	function(){
		var temp	=	this.get();
		var current;
		var pos		=	0;
		for(var i = 0; i = temp.length; i++){
			current				=	temp.pop();
			this.context.font	=	'16px "runescape_chat_07regular"';
			this.context.fillStyle	=	current.color;
			this.context.fillText(current.message, 5, this.height - 16 - 16*pos);
			pos++;
		}
			this.context.fillStyle	=	"black";
		this.context.fillText(player.username + ": ", 5, this.height);
	}
	this.animateChat	=	function(){
		this.clear();
		this.drawChat();
	}
	this.clear			=	function(){
		this.context.clearRect (0, 0, this.width, this.height);
		this.context.fillStyle	=	"#807660";
		this.context.fillRect(1, this.height-15, this.width-2, 1);
	}
}

LowerInterface.prototype.onclick	=	function(e){
	alert("Clicked on the chat window.");
}

LowerInterface.prototype.onhover	=	function(e){
	alert("Hovered over the chat window.");
}

Minimap.prototype	=	new Canvas("minimap");
function Minimap(id){
	this.handle		=	this.__proto__.handle;
	this.context	=	this.__proto__.context;
	this.width		=	this.__proto__.width;
	this.height		=	this.__proto__.height;
	this.background	=	new Image();
	this.background.src		=	"assets/minimap.png";
	
	this.hitpoints	=	0;
	this.prayer		=	0;
	this.run		=	0;
	
	this.drawBackground	=	function(){
		this.context.drawImage(this.background, 0, 0);
	}
	
	this.drawHitpoints	=	function(player){
		var changed		=	this.hitpoints	!=	player.hitpoints.current;
		var percentage	=	Math.round(player.hitpoints.current * 100/player.hitpoints.max)/100;
		var height		=	26 * percentage;
		this.context.fillStyle	=	"#b50905";
		this.context.fillRect(25, 45 + 26 - height, 26, height);
		this.hitpoints	=	player.hitpoints.current;
		return changed;
	}
	
	this.drawPrayer	=	function(player){
		var changed		=	this.prayer	!=	player.prayer.current;
		var percentage	=	Math.round(player.prayer.current * 100/player.prayer.max)/100;
		var height		=	26 * percentage;
		this.context.fillStyle	=	"#47346a";
		this.context.fillRect(26, 90 + 26 - height, 26, height);
		this.prayer	=	player.prayer.current;
		return changed;
	}
	
this.drawRun	=	function(player){
		var changed		=	this.run	!=	player.run.current;
		var percentage	=	Math.round(player.run.current * 100/player.run.max)/100;
		var height		=	26 * percentage;
		this.context.fillStyle	=	"#cea801";
		this.context.fillRect(50, 126 + 26 - height, 26, height);
		this.run	=	player.run.current;
		return changed;
	}
	
	this.clear		=	function(){
		this.context.clearRect(0, 0, this.width, this.height);
	}
	
	this.animate	=	function(player){
		var hitpoints	=	this.hitpoints	!=	player.hitpoints.current;
		var prayer		=	this.prayer	!=	player.prayer.current;
		var run			=	this.run	!=	player.run.current;
		
		if(hitpoints || prayer || run){
			this.clear();
			this.drawHitpoints(player);
			this.drawPrayer(player);
			this.drawRun(player);
			this.drawBackground();
		}
	}
	
	
}
Minimap.prototype.onclick	=	function(e){
	alert("Clicked on the minimap.");
}

Minimap.prototype.onhover	=	function(e){
	alert("Hovered over the minimap.");
}


MainInterface.prototype	=	new Canvas("main-interface");
function MainInterface(id){
	this.handle		=	this.__proto__.handle;
	this.context	=	this.__proto__.context;
	this.width		=	this.__proto__.width;
	this.height		=	this.__proto__.height;
	this.active_tab	=	{x: 3, y: 0, prevx: 0, prevy: 0}
	
	this.tab		=	new Image();
	this.tab.src	=	"assets/tab.png";
	
	this.activetab		=	new Image();
	this.activetab.src	=	"assets/activetab.png";
	
	this.topleft		=	new Image();
	this.topleft.src	=	"assets/toplefttab.png";
	
	this.topright		=	new Image();
	this.topright.src	=	"assets/toprighttab.png";
	
	this.bottomleft		=	new Image();
	this.bottomleft.src	=	"assets/bottomlefttab.png";
	
	this.bottomright		=	new Image();
	this.bottomright.src	=	"assets/bottomrighttab.png";
	
	this.topleftactive		=	new Image();
	this.topleftactive.src	=	"assets/toplefttabactive.png";
	
	this.toprightactive		=	new Image();
	this.toprightactive.src	=	"assets/toprighttabactive.png";
	
	this.bottomleftactive		=	new Image();
	this.bottomleftactive.src	=	"assets/bottomleftactive.png";
	
	this.bottomrightactive		=	new Image();
	this.bottomrightactive.src	=	"assets/bottomrighttabactive.png";
	
	this.column		=	new Image();
	this.column.src	=	"assets/column.png";
	
	this.background		=	new Image();
	this.background.src	=	"assets/maininterfacebackground.png";
	
	this.tabicons		=	new Image();
	this.tabicons.src	=	"assets/tabicons.png";
	
	this.drawTab	=	function(row, column){
		this.context.drawImage(this.tab, 33 * row + 41, 297 * column);
	}
	this.drawActiveTab	=	function(row, column){
		this.context.drawImage(this.activetab, 33 * row + 41, 297 * column);
	}
	
	this.drawTopLeft	=	function(){
		this.context.drawImage(this.topleft, 3, 0);
	}
	
	this.drawTopRight	=	function(){
		this.context.drawImage(this.topright, 206, 0);
	}
	
	this.drawBottomRight	=	function(){
		this.context.drawImage(this.bottomright, 206, 297);
	}
	
	this.drawBottomLeft	=	function(){
		this.context.drawImage(this.bottomleft, 3, 297);
	}
	
	this.drawTopLeftActive	=	function(){
		this.context.drawImage(this.topleftactive, 3, 0);
	}
	
	this.drawTopRightActive	=	function(){
		this.context.drawImage(this.toprightactive, 206, 0);
	}
	
	this.drawBottomRightActive	=	function(){
		this.context.drawImage(this.bottomrightactive, 206, 297);
	}
	
	this.drawBottomLeftActive	=	function(){
		this.context.drawImage(this.bottomleftactive, 3, 297);
	}
	
	this.drawColumn	=	function(){
		this.context.drawImage(this.column, 6, 36);
		this.context.drawImage(this.column, 215, 36);
	}
	this.drawBackground	=	function(){
		this.context.drawImage(this.background, 0, 0);
	}
	this.drawTabIcons	=	function(){
		this.context.drawImage(this.tabicons, 0, 0);
	}
	
	this.drawTabs	=	function(){
		for(var i = 1; i < 6; i++){
			for(var j = 0; j < 2; j++){
				if(this.active_tab.x == i && this.active_tab.y == j){
					this.drawActiveTab(i-1, j);
					this.active_tab.prevx	=	i;
					this.active_tab.prevy	=	j;
				}else{
					this.drawTab(i-1, j);
				}
			}
		}
	}
	
	this.animateTabs	=	function(){
		for(var i = 1; i < 6; i++){
			for(var j = 0; j < 2; j++){
				if(this.active_tab.x == i && this.active_tab.y == j){
					if(this.active_tab.prevx != i && this.active_tab.prevy != j){
						this.drawActiveTab(i-1, j);
						this.active_tab.prevx	=	i;
						this.active_tab.prevy	=	j;
					}
				}else{
					if(this.active_tab.prevx != i && this.active_tab.prevy != j){
						this.drawTab(i-1, j);
						this.active_tab.prevx	=	i;
						this.active_tab.prevy	=	j;
					}
				}
			}
		}
	}
	
	this.drawAllTabs	=	function(){
		this.animateTabs();
		if(this.active_tab.x == 6 && this.active_tab.prevx != 6 && this.active_tab.y == 0 && this.active_tab.prevy != 0){
			this.drawTopRightActive();
		}else if(this.active_tab.prevx != 6  && this.active_tab.prevy != 0){
			this.drawTopRight();
		}
		if(this.active_tab.x == 6 && this.active_tab.prevx != 6 && this.active_tab.y == 1 && this.active_tab.prevy != 1){
			this.drawBottomRightActive();
		}else if(this.active_tab.prevx != 6  && this.active_tab.prevy != 1){
			this.drawBottomRight();
		}
		if(this.active_tab.x == 0 && this.active_tab.prevx != 0 && this.active_tab.y == 1 && this.active_tab.prevy != 1){
			this.drawBottomLeftActive();
		}else if(this.active_tab.prevx != 0  && this.active_tab.prevy != 1){
			this.drawBottomLeft();
		}
		if(this.active_tab.x == 0 && this.active_tab.prevx != 0 && this.active_tab.y == 0 && this.active_tab.prevy != 0){
			this.drawTopLeftActive();
		}else if(this.active_tab.prevx != 0  && this.active_tab.prevy != 0){
			this.drawTopLeft();
		}
		this.drawTabIcons();
	}
}

MainInterface.prototype.onclick	=	function(e, canvas){
	var x	=	e.clientX - canvas.offsetLeft;
	var y	=	e.clientY - canvas.offsetTop;
	
	if(x > 3 && x < 41 && (y < 37 || y > 298)){
		this.active_tab.x	=	0;
		if(y < 37){
			this.active_tab.y	=	0;
		}
		if(y > 298){
			this.active_tab.y	=	1;
		}
	}
	if(x > 40 && (y < 37 || y > 298)){
		this.active_tab.x	=	Math.floor((x-8)/33);
		if(y < 37){
			this.active_tab.y	=	0;
		}
		if(y > 298){
			this.active_tab.y	=	1;
		}
	}
	if(x > 206 && x < this.width && (y < 37 || y > 298)){
		this.active_tab.x	=	6;
		if(y < 37){
			this.active_tab.y	=	0;
		}
		if(y > 298){
			this.active_tab.y	=	1;
		}
	}
	alert("Clicked on the main interface.");
}

MainInterface.prototype.onhover	=	function(e){
	alert("Hovered over the main interface.", "#FF0000");
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

/*
	Initialize this stuff
*/

player	=	new Player("Meredith", 36, 27);

var map	=	new Map();

game	=	new Game();
game.handle.addEventListener('click', function(e){event.preventDefault(); game.onclick(e, game.handle, player, map)}, false);
game.handle.addEventListener('mousemove', function(e){game.onhover(e)}, false);

lower	=	new LowerInterface();
lower.handle.addEventListener('click', function(e){lower.onclick(e)}, false);
lower.handle.addEventListener('mousemove', function(e){lower.onhover(e)}, false);

alert("Welcome to RuneScape.");

minimap	=	new Minimap();

minimap.handle.addEventListener('click', function(e){minimap.onclick(e)}, false);
minimap.handle.addEventListener('mousemove', function(e){minimap.onhover(e)}, false);

minimap.background.onload	=	function(){
	minimap.drawBackground();
}

main	=	new MainInterface();

main.handle.addEventListener('click', function(e){main.onclick(e, main.handle)}, false);
main.handle.addEventListener('mousemove', function(e){main.onhover(e)}, false);

main.tab.onload	=	function(){
	main.drawTabs();
}
main.topleft.onload	=	function(){
	main.drawTopLeft();
}
main.topright.onload	=	function(){
	main.drawTopRight();
}
main.bottomleft.onload	=	function(){
	main.drawBottomLeft();
}
main.bottomright.onload	=	function(){
	main.drawBottomRight();
}
main.column.onload	=	function(){
	main.drawColumn();
}
main.background.onload	=	function(){
	main.drawBackground();
}
main.tabicons.onload	=	function(){
	main.drawTabIcons();
}

gameloop();

function alert(message, color){
	lower.push(message, color);
}

function draw(){
	minimap.animate(player);
	lower.animateChat();
	main.drawBackground();
	main.drawAllTabs();
	game.loop();
	map.drawViewport(player, game);
}

function gameloop(){
	main.drawColumn();
	setInterval(draw, 20);
}
