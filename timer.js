(function() {
	"use strict";

	var lastTime = [];
	var timer = null;

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
		correctTime();
	}

	function decreaseTime(){
		var update = parseInt(this.parentElement.getElementsByTagName("SPAN")[0].innerHTML) - 1;
		this.parentElement.getElementsByTagName("SPAN")[0].innerHTML = Math.max(0, update);
		correctTime();
	}

	function startTimer(){
		if(correctTime()){
			var digits = document.querySelectorAll(".digit");
			document.getElementById("Start").disabled = true;
			document.getElementById("Pause").disabled = false;
			document.getElementById("Restart").disabled = false;

			lastTime = [];
			for(var i = 0; i < digits.length; i++){
				lastTime.push(digits[i].getElementsByTagName("SPAN")[0].innerHTML);
			}

			timer = setInterval(countDown, 1000);
		}
	}

	function correctTime(){
		console.log("activated");
		var digits = document.querySelectorAll(".digit");
		var secTotal = 0;
		var round = 0;
		var totalStart = 0;
		for(var i = digits.length - 1; i > -1; i--){
			secTotal += digits[i].getElementsByTagName("SPAN")[0].innerHTML * Math.pow(10, (i + 1) % 2) * Math.pow(60, round);
			if(i % 2 != 1){round++;}
		}

		totalStart = secTotal;

		for(var i = 0; i < digits.length; i++){
			if(i % 2 != 1){round--;}
			digits[i].getElementsByTagName("SPAN")[0].innerHTML = 
				Math.min(9, Math.floor(secTotal/Math.pow(60, round)/Math.pow(10, (i + 1) % 2)));
				secTotal = secTotal % (Math.pow(60, round) * Math.pow(10, (i + 1) % 2));
		}

		return totalStart;
	}

	function countDown(){
		document.querySelectorAll(".digit")[5].getElementsByTagName("SPAN")[0].innerHTML--;
		console.log(correctTime());
		if(correctTime() == 0){
			pauseTimer();
		}
	}

	function pauseTimer(){
		clearInterval(timer);
		timer = null;

		document.getElementById("Start").disabled = false;
		document.getElementById("Pause").disabled = true;
		document.getElementById("Restart").disabled = true;
	}

	function restartTimer(){}

})();