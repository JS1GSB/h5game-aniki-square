//author:js1gsb
//email:js1gsb@gmail.com
//just for fun :)


//MainCav erea depend on glabal vals and res
{
	var MainCav = {};
	MainCav._creat = function(cav){	//arg2:aniOver recall Func
	var t = MainCav;

	t._maskCav = new LSprite();
	cav.addChild(t._maskCav);
	var tx = UI_SP_X+SP_W*SP_W_N;
	t._maskCav.x = UI_SP_X;
	t._maskCav.y = UI_SP_Y;
	var x=15,y=20;
	var g = t._maskCav.graphics;
	g.drawRoundRect(2,"#000000",[0,0,180,300,10],true,"#F6A19A");
	while(y < 280 ){
		DrawHeart(x,y,14,"#F6CEB4",t._maskCav);
		x += 25;
		if(x > 180){
			x = 15;
			y += 40;
		}
	}
	x = 26 , y = 5
	while(y < 290 ){
		DrawHeart(x,y,8,"#F6CEB4",t._maskCav);
		x += 25;
		if(x > 160){
			x = 26;
			y += 40;
		}
	}
	t._maskCav.cacheAsBitmap(true);
	
	
	t._cav = new LSprite();
	cav.addChild(t._cav);
	t._cav.x = UI_SP_X;
	t._cav.y = UI_SP_Y;
	t._icon = [];
	for (var i = 0; i < SP_W_N; i++) {
		t._icon[i] = [];
		for (var j = 0; j < SP_H_N; j++) {
			t._icon[i][j] = new LBitmap();
			t._icon[i][j].x = SP_W * i;
			t._icon[i][j].y = SP_H * (SP_H_N - j - 1);
			t._cav.addChild(t._icon[i][j]);
		}
	}
	
	
	t._data = [];
	t._dataPre = [];
	t._dataDestoryAniTimes = [];
	for (var i = 0; i < SP_W_N; i++) {
		t._data[i] = [];
		t._dataPre[i] = [];
		t._dataDestoryAniTimes[i] = [];
		for (var j = 0; j < SP_H_N; j++) {
			t._data[i][j] = 0;
			t._dataPre[i][j] = 0;
			t._dataDestoryAniTimes[i][j] = 0;
		}
	}

	MainCav.init();
}
	MainCav._timer = function(){
		var t = MainCav;
		if(t._bDownIcon){
			t.downIcon();
			}
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				var desTimes = Math.ceil(t._dataDestoryAniTimes[i][j]/2)
				if(desTimes > 0){
					t._dataDestoryAniTimes[i][j] --;
					if(t._dataDestoryAniTimes[i][j] == 0){
						t._icon[i][j].bitmapData = ResBitMap.mainicon[0];
						t._data[i][j] = 0;
						t._bDownIcon = true;
					}
					else{
						t._icon[i][j].bitmapData = ResBitMap.mainicon[desTimes]; //TODO
					}
				}
				else{
					var cur = t._data[i][j];
					if(cur != t._dataPre[i][j]){
						t._icon[i][j].bitmapData = ResBitMap.mainicon[cur];
					}
				}
			}
		}
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				t._dataPre[i][j] = t._data[i][j];
			}
		}
		
		
		}
	MainCav.init = function(){
		var t = MainCav;
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				t._data[i][j] = 0;
				t._dataPre[i][j] = 0;
				t._dataDestoryAniTimes[i][j] = 0;
				t._icon[i][j].bitmapData = ResBitMap.mainicon[0];
			}
		}
		MainCav._bDownIcon = false;
		}
	
	//this means it return a const reference,do not change it value！！！
	MainCav.GETICONDATA = function(){
		var t = MainCav;
		return t._data;
		}
	MainCav.changeIconNum = function(_x,_y,_num){
		var t = MainCav;
		if(_x > SP_W_N || _x < 0|| _y < 0 ||_y > SP_H_N){return; }
		if(_num == 0){
			t._dataDestoryAniTimes[_x][_y] = ResBitMap.ANI_FRAME_COUNT * 2;
			g_isInAni = true;
			}
		else{
			t._data[_x][_y] = _num;
			}
		}
	MainCav.downIcon = function(){
		var t = MainCav;
		var data = t._data;
		t._bDownIcon = false;
		g_isInAni = false;
		for (var x1 = 0; x1 < SP_W_N; x1++) {
			for (var y1 = 0; y1 < SP_H_N-1; y1++) {
				var curIcon = data[x1][y1];
				var preIcon = data[x1][y1+1];
				if(curIcon==0&&preIcon>0&&preIcon<8){
					for (var z1 = y1; z1 < SP_H_N-1; z1++) {
						data[x1][z1]=data[x1][z1+1];
						MainCav._bDownIcon = true;
						g_isInAni = true;
					}
					data[x1][SP_H_N-1]=0;
				}
			}
		}
		
		}
	
	MainCav.checkMoveDown = function(_x,_y,_sp){
		var t = MainCav;
		if(_y > 0 && t._data[_x][_y-1] == 0){
			return true;
		}
		return false;
		}
	MainCav.checkMoveLeft = function(_x,_y,_sp){
		var t = MainCav;
		if(_x <= 0){
			return false;
		}
		var bMove = true;
		for(var i = 0; i < _sp.length; i++){
			if(_y+i < SP_H_N && t._data[_x-1][_y+i] != 0){
				bMove = false;
				break;
			}
		}
		return bMove;
		}
	MainCav.checkMoveRight = function(_x,_y,_sp){
		var t = MainCav;
		if(_x >= SP_W_N - 1){
			return false;
		}
		var bMove = true;
		for(var i = 0; i < _sp.length; i ++){
			if(_y+i < SP_H_N && t._data[_x+1][_y+i] != 0){
				bMove = false;
				break;
			}
		}
		return bMove;
		}
}
//RandomCav depend on glabal vals and res
{
var RandomCav = {};
RandomCav._creat = function(cav){ //arg2:raffle event recall func
	var t = RandomCav;
	t._cav =  new LSprite();
  cav.addChild(t._cav);
	
	t._raffleCount = -1;
	t._randomMax = 4;
	t._randomLen = 3;
	t._data = [];
	t._dataPre = [];
	t._dataNext = [];
	t._icon = [];
	for (i = 0; i < SP_MAX_LEN; i++) {
		t._icon[i] = new LBitmap();
		t._icon[i].x = 400;
		t._icon[i].y = 20 + SP_H*i;
		t._cav.addChild(t._icon[i]);
		t._data[i] = 0;
		t._dataPre[i] = 0;
	}
	
	RandomCav.init();
	}
RandomCav._timer = function(){
	var t = RandomCav;
	for (i = 0; i < SP_MAX_LEN; i++) {
		var cur = t._dataNext[i];
		if(cur != t._dataPre[i]){
			t._icon[i].bitmapData = ResBitMap.mainicon[cur];
		}
	}
	t._dataPre = t._dataNext.concat();
	
	if(t._raffleCount > 0){
		t.newSp();
		t._raffleCount--;
		if(t._raffleCount == 0){
			g_isInAni = false;
		}
	}
		
	}
RandomCav.init = function(){
	var t = RandomCav;
	t._raffleCount = -1;
	t._randomMax = 4;
	t._randomLen = 3;
	
	t._data = [];
	t._dataPre = [];
	t._dataNext = [];
	for (i = 0; i < t._randomLen; i++) {
		t._data[i] = RANDOM(1,t._randomMax);
		t._dataPre[i] = 0;
		t._dataNext[i] = RANDOM(1,t._randomMax);
	}

	}
RandomCav.newSp = function(){
	var t = RandomCav;
	var tempResult = [];
	for(var y = 0; y < t._randomLen;y++){
		tempResult[y] = RANDOM(1,t._randomMax);
	}
	t._data = t._dataNext;
	t._dataNext = tempResult;
	}
RandomCav.setRandomMax = function(num){
	t._randomMax = num;
	}
RandomCav.getRandomMax = function(){
	var t = RandomCav;
	return t._randomMax;
	}
//this means it return a const reference,do not change it value！！！
RandomCav.GETICONDATA = function(){
	var t = RandomCav;
	return t._data;
	}
RandomCav.raffleSimulation = function(){//
	RandomCav._raffleCount = 10;
	g_isInAni = true;
	}
}

//ControlCav depend on MainCav and RandomCav
{
	ControlCav = {};
	ControlCav.SP_NEW_X = 3;
	ControlCav.SP_DOWN_SPEED_MAX = 28;
	ControlCav._creat = function(cav){
  	var t = ControlCav;
  	t._cav = new LSprite();
  	t._cav.x = UI_SP_X;
		t._cav.y = UI_SP_Y;
  	cav.addChild(t._cav);
  	t._spCav = new LSprite();
  	t._cav.addChild(t._spCav);
  	
  	t._data = [];
  	t._dataPre = [];
  	t._icon = [];
  	for(var i = 0; i < SP_MAX_LEN; i++){
  		t._data[i] = 0;
  		t._dataPre[i] = 0;
  		t._icon[i] = new LBitmap();
			t._icon[i].x = 0;
			t._icon[i].y = 0 - (i+1) * SP_H; // correct y
  		t._spCav.addChild(t._icon[i]);
  	}
//  	t._maskCav2 = new LSprite();
//		t._maskCav2.graphics.clear();
//		t._maskCav2.graphics.drawRect(2,"#000000",[UI_SP_X,0,SP_W*SP_W_N,UI_SP_Y]);
//		t._maskCav2.graphics.beginBitmapFill(ResBitMap.bkImg["ray"]);
//		t._maskCav2.x = 0;
//		t._maskCav2.y = 0;
//		cav.addChild(t._maskCav2);
  	
  	ControlCav.reloadSetUp();
	}
	ControlCav._timer = function(){
		var t = ControlCav;
		var len = t._data.length;
		var curIdx = 0;
		for(var i = len-1; i >= 0; i--){
			var cur = t._data[i];
  		if(cur != t._dataPre[i]){
  			t._icon[curIdx].bitmapData = ResBitMap.mainicon[cur];
			}
			if(cur != 0){
				curIdx++;
				}
  	}
		t._dataPre = t._data.concat();
		}
	ControlCav.init = function(){
		var t = ControlCav;
  	t._cav.x = UI_SP_X;
		t._cav.y = UI_SP_Y;
  	t._spCav.x = t.SP_NEW_X * SP_W;
		t._spCav.y = 0;
  	
  	for(var i = 0; i < SP_MAX_LEN; i++){
  		t._data[i] = 0;
  		t._dataPre[i] = 0;
			t._icon[i].x = 0;
			t._icon[i].y = 0 - (i+1) * SP_H; // correct y
  	}
  	
  	t._spSpeed = STAGE_INFO[0].speed;
  	ControlCav.reloadSetUp();
  	ControlCav.resetSp();
		}
	ControlCav.reloadSetUp = function(){
		var t = ControlCav;
		RandomCav.newSp();
		t._spSpeedAppend = 0;
		t._data = RandomCav.GETICONDATA().concat();
		t._spSpeedEx = false; 
		return true;
		}
	ControlCav.resetSp = function(){
		var t = ControlCav;
		MainCav._timer();//for look well
		t._spCav.x = t.SP_NEW_X * SP_W;
		t._spCav.y = 0;
		return true;
		}
	ControlCav._addToMainCav = function(){
		var t = ControlCav;
		var x = t._getX();
		var y = t._getY();
		var len = t._data.length;
		var curIdx = 0;
		for(var i = len-1; i >= 0; i--){
			var cur = t._data[i];
			if(cur != 0){
				MainCav.changeIconNum(x,y+curIdx,cur);
				curIdx++;
			}
  	}
	
		}
	ControlCav._getX = function(){
		var t = ControlCav;
		return Math.floor(t._spCav.x/SP_W);
		}
	ControlCav._getSpeed = function(){
		var t = ControlCav;
		var speed = 0;
		if(t._spSpeedEx){
			speed = t.SP_DOWN_SPEED_MAX;
		}
		else {
		 speed = t._spSpeed + t._spSpeedAppend;
		}
		if(speed > t.SP_DOWN_SPEED_MAX){
				speed = t.SP_DOWN_SPEED_MAX;
		}
		return speed;
		}
	ControlCav.setBaseSpeed = function(speed){
		var t = ControlCav;
		t._spSpeed = speed;
		}
	ControlCav.getBaseSpeed = function(){
		var t = ControlCav;
		t._spSpeed = speed;
		}
	ControlCav._getY = function(){
		var t = ControlCav;
		return  SP_H_N - Math.floor(t._spCav.y/SP_H);
		}
	ControlCav.moveDown = function(){
		if(g_isInAni){return;}
		var t = ControlCav;
		t._spCav.y += t._getSpeed();
		var x = t._getX();
		var y = t._getY();
		if(MainCav.checkMoveDown(x,y,t._data)){
			return true;
		}
		ControlCav._addToMainCav();
		t._spCav.y = (SP_H_N-y)*SP_H;
		return false;
		}
	ControlCav.moveLeft = function(){
		if(g_isInAni){return;}
		var t = ControlCav;
		var x = t._getX();
		var posY = t._spCav.y+t._getSpeed();
		var y = SP_H_N - Math.floor(posY/SP_H);
		if(MainCav.checkMoveLeft(x,y,t._data)){
			t._spCav.x -= SP_W;
			}
		}
	ControlCav.moveRight = function(){
		if(g_isInAni){return;}
		var t = ControlCav;
		var x = t._getX();
		var posY = t._spCav.y+t._getSpeed();
		var y = SP_H_N - Math.floor(posY/SP_H);
		if(MainCav.checkMoveRight(x,y,t._data)){
			t._spCav.x += SP_W;
			}
		}
	ControlCav.convert = function(){
		if(g_isInAni){return;}
		var t = ControlCav;
		var len = t._data.length;
		var last =t._data[len-1];
		for(var i = len - 1; i > 0; i--){
			t._data[i] = t._data[i-1];
		}
		t._data[0] = last;
		}
	ControlCav.speedToMax = function(){
		var t = ControlCav;
		t._spSpeedEx = true;
		}
	ControlCav.changeBaseSpeed = function(_num){
		t._spSpeed = _num;
		}
	ControlCav.appendSpeed = function(_num){
		t._spSpeedAppend += _num;
		if(t._spSpeedAppend < -2){
			t._spSpeedAppend = -2;
			}
		if(t._spSpeedAppend > 9){
			t._spSpeedAppend = 9;
			}
		}
}

//OpreatCav depend on ControlCav
{
	var OpreatCav = {};
	OpreatCav._creat = function(cav){
		var t = OpreatCav;
		t._f = [];
		t._f[0] = ControlCav.moveLeft;
		t._f[1] = ControlCav.moveRight;
		t._f[2] = ControlCav.convert;
		t._f[3] = ControlCav.speedToMax;

		t._cav = new LSprite();
		cav.addChild(t._cav);
		t._cav.alpha = 0.5;
		opreatBtnL = new XButton(10,230," ← ",t._cav,function(){
			(OpreatCav._f[0])();
		});
		opreatBtnR = new XButton(100,230," → ",t._cav,function(){
			(OpreatCav._f[1])();
		});
		opreatBtnUp = new XButton(350,230," ↑ ",t._cav,function(){
			(OpreatCav._f[2])();
		});
		opreatBtnDown = new XButton(440,230," ↓ ",t._cav,function(){
			(OpreatCav._f[3])();
		});

		t._revertTime = -1;
	}
	OpreatCav.init = function(){
		t._f[0] = ControlCav.moveLeft;
		t._f[1] = ControlCav.moveRight;
		t._f[2] = ControlCav.convert;
		t._f[3] = ControlCav.speedToMax;
		t._revertTime = -1;
		}
	OpreatCav._timer = function(){
		var t = OpreatCav;
		if(t._revertTime > -1){
			t._revertTime --;
		}
		if(t._revertTime == 0){
			t._f[0] = ControlCav.moveLeft;
			t._f[1] = ControlCav.moveRight;
			t._f[2] = ControlCav.convert;
			t._f[3] = ControlCav.speedToMax;
		}
	}
	OpreatCav._keyF = function(e){
		var t = OpreatCav;
			switch (e.keyCode) {
				case 119:
				(t._f[2])();
				break;
				case 97:
				(t._f[0])();
				break;
				case 100:
				(t._f[1])();
				break;
				case 115:
				(t._f[3])();
		}
	}
	OpreatCav.reverseAction = function(){
		var t = OpreatCav;
		t._f[1] = ControlCav.moveLeft;
		t._f[0] = ControlCav.moveRight;
		t._f[3] = ControlCav.convert;
		t._f[2] = ControlCav.speedToMax;
		t._revertTime = 10;
	}
}


//bad erea depend on MainCav and ResBitMap
{
	BadErea = {};
	BadErea.COUNT = 5;
	BadErea._creat = function(cav){ //arg2:aniOver recall function
		var t = BadErea;
		t._drawBoomLock = false;
		t._data = [];
		
		t._boomImg = new LBitmap(ResBitMap["ef_yushenmu"]);
		t._boomImg.visible = false;
		cav.addChild(t._boomImg);
		t._boomImg2 = new LBitmap(ResBitMap["ef_boom"]);
		t._boomImg2.visible = false;
		cav.addChild(t._boomImg2);
		
		t._cavs = [];
		for(var i = 0; i< t.COUNT; i++){
			t._cavs[i] = new LSprite();
			cav.addChild(t._cavs[i]);
			t._data[i]={};
			var cur = t._data[i];
			cur.x = 0;
			cur.y = 0;
			cur.sizeX = 0;
			cur.sizeY = 0;
			cur.drawPath = [];
			cur.showTimes = 0;
			cur.bDrawed = true;
		}
		
		}
	BadErea._clear = function(){
		var DATA = MainCav.GETICONDATA();
		for (var x = 0; x < SP_W_N; x++) {
			for(var y = 0; y < SP_H_N; y++){
				if(DATA[x][y] == SP_ID_BAD){
					MainCav.changeIconNum(x.y,0);
				}
			}
		}
	}
	BadErea._addToMainCav = function(){
		var t = BadErea;
		var tempData = [];
		for (var i = 0; i < SP_W_N; i++) {
			tempData[i] = [];
			for (var j = 0; j < SP_H_N; j++) {
				tempData[i][j] = 0;
			}
		}

		for(var i = 0; i < t.COUNT; i++){
			var cur = t._data[i];
			if(cur.showTimes > 0){
				var x = Math.round((cur.x - UI_SP_X)/SP_W);
				var y = SP_H_N - 1 - Math.round((cur.y - UI_SP_Y)/SP_H);
				for (var n = 0; n < cur.sizeX; n++) {
					for(var m = 0; m < cur.sizeY; m++){
						if(x+n >= 0 && x+n < SP_W_N && y-m >= 0 && y-m < SP_H_N){
							tempData[x+n][y-m] = SP_ID_BAD;
						}
					}
				}
			}
		}
		
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				if(tempData[i][j] != 0){
					MainCav.changeIconNum(i,j,tempData[i][j]);
				}
			}
		}
	}
	BadErea.destoryAll = function(){
		var t = BadErea;
		for(var i = 0; i < t.COUNT; i++){
			t._data[i].showTimes = 0;
		}
		t._drawPath();
	}
	BadErea._timer = function(){
		var t = BadErea;
		for(var i = 0; i < t.COUNT; i++){
			if(t._data[i].showTimes > 0){
				t._data[i].showTimes -= 1;
			}
		}
		BadErea._reDraw();
	}

	BadErea._reDraw = function(){
		BadErea._clear();
		BadErea._addToMainCav();
		BadErea._drawPath();
	}
	

	BadErea._drawPath = function(){
		var t = BadErea;
		for(var i = 0; i < t.COUNT; i++){
			if(t._data[i].showTimes<1){
				t._cavs[i].graphics.clear();
			}
			if(t._data[i].showTimes > 0 && !t._data[i].bDrawed){
				t._data[i].bDrawed = true;
				var g = t._cavs[i].graphics;
				g.clear();
				g.drawRect(2,"#000000",[0,0,UI_GAME_W,UI_GAME_H]);

				g.lineStyle = "#000000";
				g.beginBitmapFill(mogekoData);
				g.beginPath();
				var path = t._data[i].drawPath;
				g.drawVertices(2,"#000000",path);
				//g.stroke();

				trace("BadEreaDrawPath idx:"+i);
			}
		}
	}
	
	BadErea._addNewPath = function(_x,_y,_w,_h){
		var t = badErea;
		var _x = t._newImgX;
		var _y = t._newImgY;
		var _w = t._newImgW;
		var _h = t._newImgH;
			for(var i = 0; i < t.COUNT; i++){
				var cur = t._data[i];
				if(cur.showTimes == 0){
					cur.x = _x;
					cur.y = _y;
					cur.sizeX = Math.ceil(_w/SP_W);
					cur.sizeY = Math.ceil(_h/SP_H);
					cur.showTimes = RANDOM(2,10);
					cur.bDrawed = false;
					//compute random path
					var t = badErea[i].drawPath;
					var curX = 0;
					var curY = 0;
					var left = _x +10;
					var right = _x + _w - 20;
					var top = _y + 10;
					var bottom = _y+_h - 20;

					var limit = 0;
					var bOver = false;

					limit = right;
					curX =  left;
					var path = cur.drawPath;
					badErea[i].drawPath.push([_x,_y]);
					while(curX<limit){
						curY = top + RANDOM(-10,10);
						curX += RANDOM(1,10);
						path.push([curX,curY]);
						}
					limit = bottom;
					while(curY<limit){
						curY +=RANDOM(1,10);
						curX = right + RANDOM(-10,10);
						path.push([curX,curY]);
						}
					limit = left;
					while(curX>limit){
						curY = bottom + RANDOM(-10,10);
						curX -=RANDOM(1,10);
						path.push([curX,curY]);
						}
					limit = top;
					while(curY>limit){
						curY -=RANDOM(1,10);
						curX = left + RANDOM(1,10);
						path.push([curX,curY]);
						}
					path.push([_x,_y]);
					BadErea._reDraw();
					return;
					}
				}
		};
	
	BadErea.boom = function(_x,_y,_w,_h)
	{
		var t = BadErea;
		if(t._drawBoomLock){return;}
		t._drawBoomLock = true;
		t._boomImg.visible = true;
		t._boomImg.x = 55;
		t._boomImg.y = 300;
		t._boomImg.scaleX = 0.4;
		t._boomImg.scaleY = 0.4;
		t._boomImg.rotate = 0;
		t._boomImg2.visible = false;

		var tx =Math.round(_w-100)/2;
		var ty = Math.round(_h-150)/2;
		if(ty<0){ty=0;}
		if(tx<0){tx=0;}
		t._boomImg2.x = _x+tx-10;
		t._boomImg2.y = _y+ty-10;
		
		t._newImgX = _x;
		t._newImgY = _y;
		t._newImgW = _w;
		t._newImgH = _h;
		
		g_isInAni = true;
		
		LTweenLite.to(BadErea._boomImg,2,{x:_x+tx,y:_y+ty,scaleX:1,scaleY:1,delay:1,rotate:3600,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
			BadErea._boomImg.visible = false;
			BadErea._boomImg2.visible = true;
			TIMER(500,1,function(){
				BadErea._boomImg2.visible = false;
				BadErea._drawBoomLock = false;
				BadErea._addNewPath();
				g_isInAni = false;
			}
			);
		}})
	}
}

//ScoreManage depend on MainCav ControlCav
{
	var Score
var ScoreManage = {};
ScoreManage.SCORE_BIT = 4;
ScoreManage.TIP_COUNT = 10;
ScoreManage._creat = function(cav){
	var t = ScoreManage;
	t._cav = new LSprite();
	cav.addChild(t._cav);
	t._img = [];
	for(var i = 0; i < t.SCORE_BIT; i++) {
		t._img[i] = new LBitmap();
		t._img[i].x = 10+ UI_SCORE_SPLITE * i;
		t._img[i].y = 0;
		t._cav.addChild(t._img[i]);
	}


	
	
	t._score = 0;
	t._scoreShow = 0;
	t._lineAdd = 1;
	t._baseScore = STAGE_INFO[0].stageScore;
	
	t._stage = 0;
	t._stageAddLock = 0;
	t._stageSubLock = 0;
	t._end = 0;
	}
ScoreManage._timer = function() {
	ScoreManage._reDrawScore();
	}
ScoreManage.init = function(){
	var t = ScoreManage;
	
	t._score = 0;
	t._scoreShow = 0;
	t._lineAdd = 1;
	t._baseScore = STAGE_INFO[0].addScore;
	
	t._stage = 0;
	t._stageAddLock = 0;
	t._stageSubLock = 0;
	t._end = 0;
	
	}
ScoreManage._redrawTip = function() {
	
	}
ScoreManage._computeStageInfo = function() {
	var t = ScoreManage;
	var tempSpeed = ControlCav.getBaseSpeed;
	var tempRandom = RandomCav.getRandomMax();
	var tempAdd = t._baseScore;
	var stage = 0;
	for(var i in STAGE_INFO){
		if(t._score >= STAGE_INFO[i].stageScore ){
			stage = i;
		}
	}
	if(stage > g_stage&&t._stageAddLock <= 0){
		t._stage = stage;
	}
	if(stage < g_stage&&t._stageSubLock <= 0){
		t._stage = stage;
	}

	ControlCav.setBaseSpeed(STAGE_INFO[t._stage].speed);
	RandomCav.setRandomMax(STAGE_INFO[t._stage].sp);
	t._end = STAGE_INFO[t._stage].end;
	t._baseScore = STAGE_INFO[t._stage].addScore;


	var txtData =[];
	if(t._baseScore > tempAdd){
		txtData.push({text:"分数速率增加！",type:VAN});
	}
	if( ControlCav.getBaseSpeed() > tempSpeed){
		txtData.push({text:"速度增加！游得很快！",type:VAN});
	}
	if(RandomCav.getRandomMax() > tempRandom){
		txtData.push({text:"方块种类增加！非气加重！",type:VAN});
	}

	if(txtData.length > 0){
		TxtDlg.show(txtData,function(){});
	}
}
ScoreManage._changeScore = function(_score,_x,_y){
	var t = ScoreManage;
	t._score += _score;

	tempScore=[];
	bAddStar=false;
	var tnum = 1;
	for (var i = 0; i < UI_SCORE_LEN; i++) {
		tnum = tnum * 10;
	}
	for (var i = 0; i < UI_SCORE_LEN; i++) {
		var num = Math.floor(_score%tnum/(Math.floor(tnum/10)));
		if(num!=0||bAddStar){
			tempScore.push(num);
			bAddStar =true;
		}
		tnum = tnum / 10;
	}
	var effCav = new LSprite();
	effCav.x = _x;
	effCav.y = _y;
	t._cav.addChild(effCav);
	var addIcon = new LBitmap(ResBitMap.addIcon);
	effCav.addChild(addIcon);
	for (var i = 0; i < tempScore.length; i++) {
					var temp = new LBitmap(ResBitMap.addNumIcon[tempScore[i]]);
					temp.x = (i+1)*20;
					temp.y = 0;
					effCav.addChild(temp);
	}
	LTweenLite.to(effCav,1,{x:_x,y:_y-100,alpha:0,scaleX:1,scaleY:1,delay:1,rotate:0,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
			e.target.die();
		}})

}
ScoreManage._reDrawScore = function(){
	var t = ScoreManage;
	var tnum = 10;
	var i;
	var base = 1;
	var times = 1;
	if(t._score < t._scoreShow){
		t._scoreShow = t._score;
	}
	while(t._score - t._scoreShow >= base){
		t._scoreShow += times;
		times = times * 10;
		base += times;
	}
	for (i = 0; i < UI_SCORE_LEN ; i++) {
		var num = Math.floor(t._scoreShow%tnum/(tnum/10));
		tnum = 10* tnum;
		t._img[UI_SCORE_LEN-i-1].bitmapData=ResBitMap.scoreIcon[num];
	}
}
ScoreManage.compute = function() {
	var DATA = MainCav.GETICONDATA();
	var score_time = 10;
	var t = ScoreManage;
	var temp = [];
	for (var x = 0; x < SP_W_N; x++) {
		temp[x] = [];
		for(var y=0;y < SP_H_N; y++){
			temp[x][y] = 0;	
		}
	}
	for (var x = 0; x < SP_W_N; x++) {
			for(var y=0;y < SP_H_N; y++){
				if(DATA[x][y]!=0&&DATA[x][y]!=SP_ID_BAD){
					if(y<SP_H_N-2){
						if(DATA[x][y]==DATA[x][y+1]&&DATA[x][y]==DATA[x][y+2]){
							temp[x][y]=1;
							temp[x][y+1]=1;
							temp[x][y+2]=1;
							score_time += 4;
						}
					}
					if(x<SP_W_N-2){
						if(DATA[x][y]==DATA[x+1][y]&&DATA[x][y]==DATA[x+2][y]){
							temp[x][y]=1;
							temp[x+1][y]=1;
							temp[x+2][y]=1;
							score_time += 4;
						}
					}
					if(y<SP_H_N-2&&x<SP_W_N-2){
						if(DATA[x][y]==DATA[x+1][y+1]&&DATA[x][y]==DATA[x+2][y+2]){
							temp[x][y]=1;
							temp[x+1][y+1]=1;
							temp[x+2][y+2]=1;
							score_time += 4;
						}
					}
					if(x>=2&&y<SP_H_N-2){
						if(DATA[x][y]==DATA[x-1][y+1]&&DATA[x-1][y+1]==DATA[x-2][y+2]){
							temp[x][y]=1;
							temp[x-1][y+1]=1;
							temp[x-2][y+2]=1;
							score_time += 4;
						}
					}
				}
			}
		}
	var num = 0;
	var showX = 0;
	var showY = 0;
	if(score_time > 10){
		t._lineAdd = t._lineAdd * (score_time-4)/10;
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				if(temp[x][y] == 1){
				num += t._baseScore;	
				showX = x;
				showY = y;
				MainCav.changeIconNum(x,y,0);
				}
			}
		}
		num = Math.floor(num*t._lineAdd);
		ScoreManage._changeScore(num,UI_SP_X+showX*SP_W,(SP_H_N-showY-1)*SP_H);
	}
	else{
		t._lineAdd = 1;
		}
	if(score_time > 10)
	{
		return false;
	}
	else
	{
		return true;
	}
}

}
//Effect no depend



//Game logic
var Game = {};
Game.LOGIC = {
	"MOVEDOWN":{f:ControlCav.moveDown,l:"MOVEDOWN",r:"RESET_CONTROL"}
	,"RESET_CONTROL":{f:ControlCav.resetSp,l:"COMPUTE",r:""}
	,"COMPUTE":{f:ScoreManage.compute,l:"NEWSP",r:"COMPUTE"}
	,"NEWSP":{f:ControlCav.reloadSetUp,l:"MOVEDOWN",r:"MOVEDOWN"}
};

Game._creat = function(_cav){
	var t = Game;
	t._cav = new LSprite();
	_cav.addChild(t._cav);
	
	t._bkImg1 = new LBitmap(ResBitMap.bkImg["mogeko"]);
	t._cav.addChild(t._bkImg1);
	
	t._bkImg2 = new LBitmap(ResBitMap.bkImg["ray"]);
	t._cav.addChild(t._bkImg2);
	
	MainCav._creat(t._cav);
	RandomCav._creat(t._cav);
	ScoreManage._creat(t._cav);
	BadErea._creat(t._cav);
	ControlCav._creat(t._cav);
	OpreatCav._creat(t._cav);
	
	Game.init();
	LGlobal.stage.addEventListener(LKeyboardEvent.KEY_PRESS,OpreatCav._keyF);
	TIMER(50,20000,t._timer); //FIXME
	
	}
Game.init = function(cav){
	var t = Game;
	t._state = Game.RUN;
	MainCav.init();
	RandomCav.init();
	ControlCav.init();
	ScoreManage.init();
	BadErea.destoryAll();
	
	Game._node = "MOVEDOWN";
	}
Game._update = function(){
	MainCav._timer();
	RandomCav._timer();
	ScoreManage._timer();
	BadErea._timer();
	ControlCav._timer();
	OpreatCav._timer();
	
	}
Game._timer = function(){
	Game._update();
	if(!g_isInAni){
		Game._executeLogic();
		}
	}

Game._executeLogic = function(){
	var t = Game;
	var node = t._node;
	if((Game.LOGIC[node]).f()){
 		t._node = Game.LOGIC[node].l;
 	}
 	else{
	 	t._node = Game.LOGIC[node].r;
	}
	
	}



//game start
function OnLoadGame(e){
	g_backTipTxt.text = "";
	g_backLayer.removeAllEventListener();
	var url = "./s_bgm_up.";
	g_soundRes.load(url+"mp3,"+url+"ogg,"+url+"wav");
	g_soundRes.addEventListener(LEvent.COMPLETE, function(){
		//g_soundRes.play();
		trace("g_soundRes load over");
		});
	LLoadManage.load(
	DATA_RAW,
	function(progress){
		g_loadingLayer.setProgress(progress);
	},
	function(result)
	{
		g_res = result;
		ResBitMap.parseRes(result);
		Game._creat(g_gameLayer);
		g_backLayer.die();
		trace("game start!");
	});
}
//load res
function main () {
	LGlobal.setDebug(true);
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	//LGlobal.screen(LStage.FULL_SCREEN);

	g_backLayer = new LSprite();
	g_gameLayer = new LSprite();
	addChild(g_backLayer);
	addChild(g_gameLayer);
	g_soundRes = new LSound();
	g_loadingLayer = new LoadingSample3();
	g_backLayer.addChild(g_loadingLayer);
	g_backLayer.graphics.drawRect(1,"#000000",[0,0,UI_GAME_W,UI_GAME_H],true,"#000000");
	g_backLayer.addEventListener(LMouseEvent.MOUSE_UP,OnLoadGame);
	g_backTipTxt = new LTextField();
	g_backTipTxt.text = "点击加载游戏资源"
	g_backTipTxt.color = "#FF0000";
	g_backTipTxt.x = UI_GAME_W/2-50;
	g_backTipTxt.y = UI_GAME_H/2+50;
	g_backLayer.addChild(g_backTipTxt);

	if(LGlobal.os == OS_PC){
		LGlobal.screen(1);
	}
	else{
		LGlobal.screen(LStage.FULL_SCREEN);
	}
}

//execute lufylegend.js engine
LInit(50,"mylegend",UI_GAME_W,UI_GAME_H,main);