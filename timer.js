(function() {
	"use strict";

	window.onload = function(){
		var addBtn = document.querySelectorAll(".add");
		for(var i = 0; i < addBtn.length; i++){
			addBtn[i].onclick = addTime;
		}

		var decreaseBtn = document.querySelectorAll(".decrease");
		for(var i = 0; i < decreaseBtn.length; i++){
			decreaseBtn[i].onclick = decreaseTime;
		}
	};

	function addTime(){
		var update = parseInt(this.parentElement.getElementsByTagName("SPAN")[0].innerHTML) + 1;
		var digits = this.parentElement.parentElement.querySelectorAll(".digit");
		if(Array.from(digits).indexOf(this.parentElement) % 2){
			carryOn(this, update, digits);
		}else{
			convertTime(this, update, digits);
		}
	}

	function carryOn(element, update, digits){
		if(update < 10){
				element.parentElement.getElementsByTagName("SPAN")[0].innerHTML = update;
			}else{
				element.parentElement.getElementsByTagName("SPAN")[0].innerHTML = 0;
				digits[Array.from(digits).indexOf(element.parentElement) - 1].getElementsByTagName("SPAN")[0].innerHTML =
					parseInt(digits[Array.from(digits).indexOf(element.parentElement) - 1].getElementsByTagName("SPAN")[0].innerHTML) + 1;
			}
	}

	function convertTime(element, update, digits){
		if(update < 6){
			element.parentElement.getElementsByTagName("SPAN")[0].innerHTML = update;
		}else{
			element.parentElement.getElementsByTagName("SPAN")[0].innerHTML = 0;
				digits[Array.from(digits).indexOf(element.parentElement) - 1].getElementsByTagName("SPAN")[0].innerHTML =
					parseInt(digits[Array.from(digits).indexOf(element.parentElement) - 1].getElementsByTagName("SPAN")[0].innerHTML) + 1;
		}
	}

	function decreaseTime(){
		var update = parseInt(this.parentElement.getElementsByTagName("SPAN")[0].innerHTML) - 1;
		var digits = this.parentElement.parentElement.querySelectorAll(".digit");
		if(Array.from(digits).indexOf(this.parentElement) % 2){
			//if it is the tenth
		}else{
			//if the ones
		}
	}
})();