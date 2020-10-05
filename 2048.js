var game = {
	data: [], //储存页面所有单元格的所有数据的二维数组
	rn: 4,
	cn: 4, //四行四列不能改变用常亮表示
	score: 0,
	state: 1, //保存游戏状态   1运行中  0游戏结束
	runxz: 1, //运行中
	PLAYING:2,
	gameover: 0, //游戏结束
	getgrid: function() {
		for(var r = 0, arr = []; r < this.rn; r++) {
			for(var c = 0; c < this.cn; c++) {
				arr.push("" + r + c);
			}

		}
		return '<div id="d' + arr.join('"class="grid"></div><div id="d') + '"class="grid"></div>';
	},
	getcell: function() {
		for(var r = 0, arr = []; r < this.rn; r++) {
			for(var c = 0; c < this.cn; c++) {
				arr.push("" + r + c);
			}
		}
		return '<div id="c' + arr.join('"class="cell"></div><div id="c') + '"class="cell"></div>';

	},
	start: function() { //游戏开始
		var obox = document.querySelector("#box");
		obox.innerHTML = this.getgrid() + this.getcell();
		this.data = [];
		for(var i = 0; i < this.rn; i++) { //循环遍历行数
			this.data[i] = []; //在对应的行数位置添加数组
			for(var b = 0; b < this.cn; b++) { //循环遍历列
				this.data[i][b] = 0; //在对应的列位置添加0
			}
		} //在控制台里边输出data数据的数据
		this.score = 0;
		this.state = this.runxz; //重置游戏运行状态为运行中
		var ozhezhao = document.querySelector(".zhezhao");
		ozhezhao.style.display = "none";
		this.randownum();
		this.randownum();
		this.undataview();

	},
	randownum: function() { //如果格子不满一直循环，继续追加值，否则退出循环
		if(!this.isfull()) {
			for(;;) {
				var r = Math.round(Math.random() * (this.rn - 1)); //在0-rn-1之间生成行下表存到r中
				var c = Math.round(Math.random() * (this.cn - 1)); //在0-cn-1之间生成列存到c中
				if(this.data[r][c] == 0) {
					this.data[r][c] = Math.random() > 0.5 ? 4 : 2; //如果data中r行c列等于0//生成一个0-1之间的随机数，如果>0.5在r行c列中放入4，否则放入2
					break; //退出循环
				}

			}
		}
	},
	isfull: function() { //返回true说明游戏结束
		for(var r = 0; r < this.rn; r++) { //遍历data数组中的每一个值
			for(var c = 0; c < this.cn; c++) {
				if(this.data[r][c] == 0) {
					return false; //如果取出的值等于0，则返回false
				}
			}
		}

		return true; //如果遍历结束都没有返回值得话，说明data数据没有0的存在，返回true
	},
	moveleft: function() { //左移所有行内的值
		var _before = this.data.toString(); //保留移动之前数组的值
		for(var r = 0; r < this.rn; r++) {
			this.moveleftinrow(r);
		}
		var _after = this.data.toString(); //保留移动之后数组的数据
		if(_before != _after) { //如果移动前和移动后不一样，则创建新的随机数
			_animation.start();
		}
	},
	moveleftinrow: function(r) { //左移一行，传入行的行号
		for(var c = 0; c < this.cn - 1; c++) {
			var nextc = this.getleftinrow(r, c); //获取第二列的值
			if(nextc == -1) {
				break;
			} else {
				if(this.data[r][c] == 0) {
					this.data[r][c] = this.data[r][nextc];
					this.data[r][nextc] = 0;
					var odiv = document.querySelector("#c" + r + nextc);
					_animation.addtasks(odiv, r, nextc, r, c);
					c--;
				} else if(this.data[r][c] == this.data[r][nextc]) {
					this.data[r][c] *= 2;
					this.data[r][nextc] = 0;
					this.score += this.data[r][c];
					var odiv = document.querySelector("#c" + r + nextc);
					_animation.addtasks(odiv, r, nextc, r, c);
				}
			}
		}
	},
	getleftinrow: function(r, c) { //找r行c列位置之后不为0的下一个位置
		for(var nextc = c + 1; nextc < this.cn; nextc++) {
			if(this.data[r][nextc] != 0) {
				return nextc;
			}
		}
		return -1; //循环停止之前都没有返回的话，说明this.data[r][nextc]取到得知都是0
	},
	movetop: function() { //上移所有行内的值
		var _before = this.data.toString(); //保留移动之前数组的值
		for(var c = 0; c < this.cn; c++) {
			this.movetopinrow(c);
		}
		var _after = this.data.toString(); //保留移动之后数组的数据
		if(_before != _after) { //如果移动前和移动后不一样，则创建新的随机数
			_animation.start();
		}

	},
	movetopinrow: function(c) { //上移一列，传入列的行号
		for(var r = 0; r < this.rn - 1; r++) {
			var nextr = this.gettopinrow(r, c); //获取第二行的值
			if(nextr == -1) {
				break;
			} else {
				if(this.data[r][c] == 0) {
					this.data[r][c] = this.data[nextr][c];
					this.data[nextr][c] = 0;
					var odiv = document.querySelector("#c" + nextr + c);
					_animation.addtasks(odiv, nextr, c, r, c);
					r--;
				} else if(this.data[r][c] == this.data[nextr][c]) {
					this.data[r][c] *= 2;
					this.data[nextr][c] = 0;
					this.score += this.data[r][c];
					var odiv = document.querySelector("#c" + nextr + c);
					_animation.addtasks(odiv, nextr, c, r, c);
				}
			}
		}
	},
	gettopinrow: function(r, c) { //找r行c列位置之后不为0的下一个位置
		for(var nextr = r + 1; nextr < this.rn; nextr++) {
			if(this.data[nextr][c] != 0) {
				return nextr;
			}
		}
		return -1; //循环停止之前都没有返回的话，说明this.data[r][nextc]取到得知都是0
	},
	moveright: function() { //左移所有行内的值
		var _before = this.data.toString(); //保留移动之前数组的值
		for(var r = 0; r <this.rn; r++) {
			this.moverightinrow(r);
		}
		var _after = this.data.toString(); //保留移动之后数组的数据
		if(_before != _after) { //如果移动前和移动后不一样，则创建新的随机数
			_animation.start();
		}
	},
	moverightinrow: function(r) { //左移一行，传入行的行号
		for(var c = this.cn - 1; c > 0; c--) {
			var prec = this.getrightinrow(r, c); //获取第二列的值
			if(prec== -1) {
				break;
			} else {
				if(this.data[r][c] == 0) {
					this.data[r][c] = this.data[r][prec];
					this.data[r][prec] = 0;
					var odiv = document.querySelector("#c" + r + prec);
					_animation.addtasks(odiv, r, prec, r, c);
					c++;
				} else if(this.data[r][c] == this.data[r][prec]) {
					this.data[r][c] *= 2;
					this.data[r][prec] = 0;
					this.score += this.data[r][c];
					var odiv = document.querySelector("#c" + r + prec);
					_animation.addtasks(odiv, r, prec, r, c);
				}
			}
		}
	},
	getrightinrow: function(r, c) { //找r行c列位置之后不为0的下一个位置
		for(var prec = c - 1; prec >= 0; prec--) {
			if(this.data[r][prec] != 0) {
				return prec;
			}
		}
		return -1; //循环停止之前都没有返回的话，说明this.data[r][nextc]取到得知都是0
	},
	movebottom: function() { //上移所有行内的值
		var _before = this.data.toString(); //保留移动之前数组的值
		for(var c = 0; c<this.cn; c++) {
			this.movebottominrow(c);
		}
		var _after = this.data.toString(); //保留移动之后数组的数据
		if(_before != _after) { //如果移动前和移动后不一样，则创建新的随机数
			_animation.start();
		}

	},
	movebottominrow: function(c) { //上移一列，传入列的行号
		for(var r = this.rn - 1; r > 0; r--) {
			var prer = this.getbottominrow(r, c); //获取第二行的值
			if(prer == -1) {
				break;
			} else {
				if(this.data[r][c] == 0) {
					this.data[r][c] = this.data[prer][c];
					this.data[prer][c] = 0;
					var odiv = document.querySelector("#c" + prer + c);
					_animation.addtasks(odiv, prer, c, r, c);
					r++;
				} else if(this.data[r][c] == this.data[prer][c]) {
					this.data[r][c] *= 2;
					this.data[prer][c] = 0;
					this.score += this.data[r][c];
					var odiv = document.querySelector("#c" + prer + c);
					_animation.addtasks(odiv, prer, c, r, c);
				}
			}
		}
	},
	getbottominrow: function(r, c) { //找r行c列位置之后不为0的下一个位置
		for(var prer = r - 1; prer >= 0; prer--) {
			if(this.data[prer][c] != 0) {
				return prer;
			}
		}
		return -1; //循环停止之前都没有返回的话，说明this.data[r][nextc]取到得知都是0
	},
	undataview: function() {
		for(var r = 0; r < this.rn; r++) {
			for(var c = 0; c < this.cn; c++) {
				var odivbox = document.querySelector("#c" + r + c);
				if(this.data[r][c] == "0") {
					odivbox.innerHTML = "";
					odivbox.className = "cell";
				} else {
					odivbox.className = "cell n" + this.data[r][c];
					odivbox.innerHTML = this.data[r][c];
				}
			}
		}
		var ospan = document.querySelector("#score");
		ospan.innerHTML = this.score;
		if(this.isgameover()) {
			this.state = this.gameover;
			var oallspan = document.querySelector("#allscore");
			oallspan.innerHTML = this.score;
			var ozhezhao = document.querySelector(".zhezhao");
			ozhezhao.style.display = "block";
		}
	},
	isgameover: function() {
		for(var r = 0; r < this.rn; r++) {
			for(var c = 0; c < this.cn; c++) {
				if(this.data[r][c] == 0) {
					return false;
				} else if(c < this.cn - 1 && this.data[r][c + 1] ==this.data[r][c] ) {
					return false;
				} else if(r < this.rn - 1 && this.data[r][c] == this.data[r + 1][c]) {
					return false;
				}
			}
		}
		return true;
	}
}

window.onload = function() {
	game.start();
	document.onkeydown = function(ev) { //事件绑定
		var ev = window.event || ev;
		if(game.state == game.runxz) {
			var code = ev.keyCode;
			if(code == 37) {
				game.moveleft();
			} else if(code == 38) {
				game.movetop();
			} else if(code == 39) {
				game.moveright();
			} else if(code == 40) {
				game.movebottom();
			}
		}

	}
}