(function() {
	"use strict";

	var lastTime = [];
	var timer = null;
	var alarm = new Audio("alarm.mp3");
	var totalTime;
	var progressColor = ["#2ec521", "#2ec521", "#ef3714", "#8b2deb", "#1b2c33",
						 "#27d4f4", "#cc86ed", "#f72a74", "#2d498e", "#3816f1",
						 "#4f1d16", "#37904c", "#fca749", "#bb672e", "#eab4ac",
						 "#e35510", "#dad212", "#d128b3", "#24e589", "#720111"];

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
		document.getElementsByTagName("BODY")[0].onmousedown = stopAlarm;

		document.getElementById("timer").style.backgroundColor = 
			progressColor[Math.floor(Math.random() * progressColor.length)];
	};

	function addTime(){
		var update = parseInt(this.parentElement.getElementsByTagName("SPAN")[0].innerHTML) + 1;
		var digits = this.parentElement.parentElement.querySelectorAll(".digit");
		this.parentElement.getElementsByTagName("SPAN")[0].innerHTML = Math.min(9, update);
		totalTime = correctTime();
	}

	function decreaseTime(){
		var update = parseInt(this.parentElement.getElementsByTagName("SPAN")[0].innerHTML) - 1;
		this.parentElement.getElementsByTagName("SPAN")[0].innerHTML = Math.max(0, update);
		totalTime = correctTime();
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
			document.getElementById("timer").style.height = "0px";
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
		document.getElementById("timer").style.height = ((totalTime - correctTime()) / totalTime * 100) + "%";
		console.log(correctTime());
		if(correctTime() == 0){
			alarm.play();
			pauseTimer();
			document.getElementById("alert").style.display = "";
			document.getElementsByTagName("BODY")[0].style.backgroundColor = 
				document.getElementById("timer").style.backgroundColor;

			document.getElementById("timer").style.height = "0px";

			document.getElementById("timer").style.backgroundColor = 
			progressColor[Math.floor(Math.random() * progressColor.length)];
		}
	}

	function pauseTimer(){
		clearInterval(timer);
		timer = null;

		document.getElementById("Start").disabled = false;
		document.getElementById("Pause").disabled = true;
		document.getElementById("Restart").disabled = false;
	}

	function restartTimer(){
		var digits = document.querySelectorAll(".digit");
		for(var i = 0 ; i < lastTime.length; i++){
			digits[i].getElementsByTagName("SPAN")[0].innerHTML = lastTime[i];
		}
	}

	function stopAlarm(){
		alarm.pause();
		alarm.load();
		document.getElementById("alert").style.display = "none";
	}

})();