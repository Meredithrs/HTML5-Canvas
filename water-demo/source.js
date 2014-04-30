/*
	I know this uses divs instead of a canvas. You can yell at me if you want.
	But it's easier to demonstrate the principle with divs because I don't have to load a map.
*/

window.loopcount = 39;
function draw(){
    window.loopcount++;
    
    if(window.loopcount % 40 === 0){
        var waters = document.getElementsByClassName("water");
        var blue;
        for(var i in waters){
            blue =    randomIntFromInterval(45, 60);
            waters[i].style.backgroundColor =
                "hsl(203.4, 65.1%, " + blue + "%)";
        }
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

setInterval(draw, 20);
