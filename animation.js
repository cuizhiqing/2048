function fun() {
	var times = 3000;
	var step = 50; //时间相同，步数相同
	var yellow = document.querySelector(".yellow");
	console.log(yellow);
	var green = document.querySelector(".green");
	var red = document.querySelector(".red");
	var blue = document.querySelector(".blue");
	//获取一个元素的所有样式   针对于在style标签上书写样式
	var yellowl = getComputedStyle(yellow).left;
	var greenl = getComputedStyle(green).left;
	var distance = parseFloat(greenl) - parseFloat(yellowl);
	console.log(distance);
	var temp = distance / step; //一步走的距离
	var inter = times / step; //一步需要多长时间
	function move() {
		yellow.style.left = parseFloat(getComputedStyle(yellow).left) +temp + "px";
		if(--step==0){
			clearInterval(timer);
			step=50;
		}
//		if(parseFloat(getComputedStyle(yellow).left) == parseFloat(getComputedStyle(green).left)) {
//				clearInterval(timer);
//		}
	}
	var timer = setInterval(move, inter);
}
window.onload = function() {
	fun();
}