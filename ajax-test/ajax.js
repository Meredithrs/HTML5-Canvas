function Ajax(){
	this.result	=	"";
	
	this.get	=	function(url, callback){
		var result	=	new XMLHttpRequest();
		result.onreadystatechange	=	function(){
			if (result.readyState==4 && result.status==200) {
				callback(result.responseText);
				this.result	=	result.responseText;
			}
		}
		result.open("GET", url, true);
		result.send();
	}
	
	this.getResult	=	function(){
		return this.result;
	}
}

var a	=	new Ajax();
a.getFile("data.html", alert);
