(function() {
	"use strict";

	var lastTime;

	window.onload = function(){
		var addBtn = document.querySelectorAll(".add");
		for(var i = 0; i < addBtn.length; i++){
			addBtn[i].onclick = addTime;
		}

		var decreaseBtn = document.querySelectorAll(".decrease");
		for(var i = 0; i < decreaseBtn.length; i++){
			decreaseBtn[i].onclick = decreaseTime;
		}

		document.getElementById("Start").onclick = startTimer;
		document.getElementById("Pause").onclick = pauseTimer;
		document.getElementById("Restart").onclick = restartTimer;
	};

	function addTime(){
		var update = parseInt(this.parentElement.getElementsByTagName("SPAN")[0].innerHTML) + 1;
		var digits = this.parentElement.parentElement.querySelectorAll(".digit");
		this.parentElement.getElementsByTagName("SPAN")[0].innerHTML = Math.min(9, update);
	}

	function decreaseTime(){
		var update = parseInt(this.parentElement.getElementsByTagName("SPAN")[0].innerHTML) - 1;
		this.parentElement.getElementsByTagName("SPAN")[0].innerHTML = Math.max(0, update);
	}

	function startTimer(){
		lastTime = correctTime();
		//update the timer on the panel
		document.getElementById("Start").disabled = true;
		document.getElementById("Pause").disabled = false;
		document.getElementById("Restart").disabled = false;
	}

	function correctTime(){}

	function pauseTimer(){}

	function restartTimer(){}

})();