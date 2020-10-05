var _animation = {
	DURA: 500,
	STEPS: 50, //步数
	moved: 0, //当前移动的步数
	timer: null, //保存当前的定时器
	tasks: [], //放入每次任务需要移动的元素及距离
	addtasks: function(divobj, currr, currc, targetr, targetc) {
		var topdist = (targetr - currr) *110;
		var leftdist = (targetc - currc) * 110;
		var topstep = topdist / this.STEPS; //垂直步长
		var leftstep = leftdist / this.STEPS; //水平步长
		console.log(topstep + ":" + leftstep);
		this.tasks.push(
				{
					obj: divobj,
					top: topstep,
				left: leftstep
				
			}
		);
		console.log(this.tasks);
	},
	move: function() {
		for(var i = 0; i < this.tasks.length; i++) {
			//循环遍历this.tast的每一个对象，取出要移动的元素
			var tast = this.tasks[i]; //获取每一个div对象的数值集合
			var _style = getComputedStyle(tast.obj); //获取每一个准备移动的div元素的样式
			console.log(_style.left);
			tast.obj.style.left = parseFloat(_style.left) + tast.left + "px";
			tast.obj.style.top = parseFloat(_style.top) + tast.top + "px";
		}
			//设定move事件停止的条件
			if(--this.moved == 0) {
				clearInterval(this.timer);
				//先循环遍历每一个对象，并把对象的lefttop属性设置成空
				for(var i = 0; i <this.tasks.length; i++) {
					var task = this.tasks[i];
					task.obj.style.top = "";
					task.obj.style.left = "";
				}
				this.tasks = [];
				game.randownum(); //在移动时间停止之后在生成随机数
				game.state = game.runxz; //把游戏的运行状态该为运行中
				game.undataview(); //把新生成的随机数渲染到页面中
			}
		
	},
	start: function() {
		game.state = game.PLAYING; //动画播放中
		//设置当前移动的步数
		console.log(this);
		var self = this; //留住this
		self.moved = self.STEPS;
		self.timer = setInterval(function() {
			self.move();
		}, self.DURA / self.STEPS);
	}
}