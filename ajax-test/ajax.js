function Ajax(){
	this.getFile	=	function(url){
		var result	=	new XMLHttpRequest();
		result.onreadystatechange	=	function(){
			if (result.readyState==4 && result.status==200) {
				return result.responseText;
			}
		}
		result.open("GET", url, true);
		result.send();
	}
}
