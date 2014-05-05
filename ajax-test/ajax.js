function Ajax(){
	this.result	=	"";
	
	this.getFile	=	function(url){
		var result	=	new XMLHttpRequest();
		result.onreadystatechange	=	function(){
			if (result.readyState==4 && result.status==200) {
				alert(result.responseText);
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
