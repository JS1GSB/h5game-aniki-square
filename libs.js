//some libs not depend on any
{
	//random
	RANDOM = function(min,max){
		return min + Math.floor(Math.random()*(max-min));
		}

	//easy timer
	TIMER = function(_split,_Times,_ref){
		var timer = new LTimer(_split,_Times);
		timer.addEventListener(LTimerEvent.TIMER,_ref);
		timer.start();
		return timer;
	}

	//simple button
	SButton = function(_x,_y,_txt,_parent,_f)
	{
		var layer = new LSprite();
		var sp = new LGraphics();
		layer.addChild(sp);
		var txtField = new LTextField();
		txtField.x = _x+5;
		txtField.y = _y+3;
		txtField.text = _txt;
		var len = txtField.getWidth();
		sp.lineStyle = "#000000";
		sp.drawRoundRect(2,"rgba(182,243,230,0)",[_x,_y,len+10,25,5],false);
		layer.addEventListener(LMouseEvent.MOUSE_UP,_f);
		layer.alpha = 0.6;
		txtField.alpha = 2;
		_parent.addChild(layer);
		layer.addChild(txtField);
		return sp;
	}

	XButton = function(_x,_y,_txt,_parent,_f)
	{
		var title;
		title = new LTextField();
		title.text = _txt;
		var len = title.getWidth()+50;
		var upState = new LPanel("#666666",len,70);

		title.color = "#000000";
		title.size = 20;
		title.x = (upState.getWidth() - title.getWidth())*0.5;
		title.y = (upState.getHeight() - title.getHeight())*0.5;
		upState.addChild(title);
		var overState = new LPanel("#999999",len,70);
		title = new LTextField();
		title.text = _txt;
		title.color = "#FF0000";
		title.size = 20;
		title.x = (upState.getWidth() - title.getWidth())*0.5;
		title.y = (upState.getHeight() - title.getHeight())*0.5;
		overState.addChild(title);
		var downState = new LPanel("#CCCCCC",len,70);
		title = new LTextField();
		title.text = _txt;
		title.color = "#FF0000";
		title.size = 20;
		title.x = (upState.getWidth() - title.getWidth())*0.5;
		title.y = (upState.getHeight() - title.getHeight())*0.5;
		downState.addChild(title);
		var button01 = new LButton(upState,overState,downState);
		button01.x = _x;
		button01.y = _y;

		button01.addEventListener(LMouseEvent.MOUSE_UP,_f);
		_parent.addChild(button01);
		return button01;
	}
	
	DrawHeart = function(_x,_y,_w,_fillColor,_parent)
	{
		var _h = Math.round(_w*1.6);
		var _h2 = Math.round(_w*0.6);
		var _offx2 = Math.round(_w*0.7);
		var _offy2 = Math.round(_w*1.5);
		var g = _parent.graphics;
		g.add(function(ctx){
		ctx.beginPath();
		ctx.strokeStyle = "#F6A19A";
		//ctx.fillStyle = "#F6CEB4";
		ctx.fillStyle = _fillColor;
		ctx.moveTo(_x,_y+_h2);
		ctx.bezierCurveTo(_x+_w,_y,_x+_offx2,_y+_offy2,_x,_y+_h);
		ctx.stroke();
		ctx.moveTo(_x,_y+_h2);
		ctx.bezierCurveTo(_x-_w,_y,_x-_offx2,_y+_offy2,_x,_y+_h);
		ctx.stroke();
		ctx.fill();
		});
	}
	
	TxtDlg = {};
	TxtDlg.LAST_STR_ARY = new Array(" /"," -"," \\"," |");
	TxtDlg._create = function(_cav){
		TxtDlg.lastStridx = 0;
		TxtDlg.bShow = false;
		TxtDlg.sp = new LSprite();
		TxtDlg.txt = new LTextField();
		TxtDlg.txt.x = 5;
		TxtDlg.txt.y = 3;
		_cav.addChild(TxtDlg.sp);
		TxtDlg.sp.addChild(TxtDlg.txt);
		TxtDlg.timer = TIMER(150,MAX_VALUE,function(){
			if(!TxtDlg.bShow){
				return;
			}
			if(TxtDlg.curLen < TxtDlg.len){
				TxtDlg.txt.text = TxtDlg.txt.text + TxtDlg.strAry[TxtDlg.curLen];
				TxtDlg.curLen++;
			}
			else
				{
					TxtDlg.txt.text = TxtDlg.endTxt + TxtDlg.LAST_STR_ARY[TxtDlg.lastStridx];
					TxtDlg.lastStridx ++;
					if(TxtDlg.lastStridx > 3){
						TxtDlg.lastStridx = 0;
					}
					TxtDlg.loopTimes ++;
					if(TxtDlg.loopTimes >= 15){
						TxtDlg._showNext();
						}
				}
			});
			TxtDlg.sp.addEventListener(LMouseEvent.MOUSE_UP,TxtDlg._showNext);
		};
		TxtDlg._showNext = function(){
			TxtDlg.txt.text = "";
			TxtDlg.sp.graphics.clear();
			TxtDlg.loopTimes = 0;
			TxtDlg.bShow = false;
			if(TxtDlg.curTxtIdx >= TxtDlg.endTxtIdx){
				TxtDlg.ref();
				return ;
				}
			TxtDlg.bShow = true;
			TxtDlg.curTxtIdx ++;
			var _txt = TxtDlg.data[TxtDlg.curTxtIdx].text;
			var _type = TxtDlg.data[TxtDlg.curTxtIdx].type;
			TxtDlg.endTxt = _txt;
			TxtDlg.strAry = _txt.split("");

			var t = new LTextField();
			t.text = _txt;
			var len = t.getWidth();
			if(_type == VAN){
				TxtDlg.sp.x = UI_VAN_X + 120;
				TxtDlg.sp.y = UI_VAN_Y;
			}
			if(_type == SHILEI){
				TxtDlg.sp.x = UI_SHILEI_X - len;
				TxtDlg.sp.y = UI_SHILEI_Y;
			}

			var g = TxtDlg.sp.graphics;
			g.drawRoundRect(2,"#000000",[0,0,len+20,25,5],true,"#999999");
			g.beginPath();
			if(_type == VAN){
				g.moveTo(1,20);
				g.lineTo(-10,35);
				g.lineTo(10,24);
				g.stroke();
				}
			if(_type == SHILEI){
				g.moveTo(len+20,20);
				g.lineTo(len+31,35);
				g.lineTo(len+9,24);
				g.stroke();
				}
			g.fillStyle("#999999");
			g.fill();

			TxtDlg.curLen = 0;
			TxtDlg.len = _txt.length;

			}
		TxtDlg.show = function(_txtAry,_ref){
			TxtDlg.ref = _ref;
			TxtDlg.data = _txtAry;
			TxtDlg.curTxtIdx = -1;
			TxtDlg.endTxtIdx = _txtAry.length - 1;

			TxtDlg._showNext();
		};

		//over
}


//Effect no depend
var DarkScreen = {};
DarkScreen.ANI_DARK_TIME = 5;
DarkScreen.ALPHA_END = 0.9; 
DarkScreen._create = function(cav){
	var t = DarkScreen;
	t._P = cav;
	t._aniTimes = -1;
	t._isInAni = false;
	
	}
DarkScreen._timer = function(){
	var t = DarkScreen;
	if(!t._isInAni){return;}
	if(t._aniTimes == 0){
		t._P.removeChild(t._cav);
		t._cav.die();
		t._isInAni = false;
		}
	if(t._aniTimes >= 0){
		t._aniTimes --;
		}
	
	}
DarkScreen.start = function(){
	var t = DarkScreen;
	if(t._isInAni||t._aniTimes > 0)return;
	t._aniTimes = t.ANI_DARK_TIME;
	t._cav = new LSprite();
	t._P.addChild(t._cav);
	t._cav.alpha = 0;
	var g = t._cav.graphics;
	g.clear();
	g.drawRect(1,"#000000",[0,0,UI_GAME_W,UI_GAME_H],true,"#000000");
	LTweenLite.to(t._cav,2,{alpha:t.ALPHA_END,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
		DarkScreen._isInAni = true;
	}});
	
	}
DarkScreen.init = function(){
	var t = DarkScreen;
	t._aniTimes = 0;
	}


var DarkAndLight = {};
DarkAndLight.ANI_TIME = 10;
DarkAndLight._create = function(cav){
	var t = DarkAndLight;
	t._P = cav;
	t._aniTimes = -1;
	t._isInAni = false;
	
	}
DarkAndLight._timer = function(){
	var t = DarkAndLight;
	if(!t._isInAni){return;}
	if(t._aniTimes == 0){
		t._P.removeChild(t._cav);
		t._cav.die();
		t._isInAni = false;
		}
	if(t._aniTimes >= 0){
		t._aniTimes --;
		}
	
	}
DarkAndLight.start = function(){
	var t = DarkAndLight;
	if(t._isInAni||t._aniTimes > 0)return;
	t._aniTimes = t.ANI_TIME;
	t._cav = new LSprite();
	t._P.addChild(t._cav);
	t._cav.alpha = 0;
	t._cav.x = UI_SP_X;
	t._cav.y = UI_SP_Y;
	var g = t._cav.graphics;
	g.clear();
	g.drawRoundRect(2,"#000000",[0,0,SP_W*SP_W_N,SP_H*SP_H_N,10],true,"#000000");
	LTweenLite.to(t._cav,2,{alpha:1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
		DarkAndLight._isInAni = true;
	}});
	
	}
DarkAndLight.init = function(){
	var t = DarkAndLight;
	t._aniTimes = 0;
	}


var MultiHeart = {};
MultiHeart.LIVE_MAX = 10;
MultiHeart._create = function(cav){
	var t = MultiHeart;
	t._cav = new LSprite();
	t._cav.y = UI_GAME_H;
	cav.addChild(t._cav);
	t._data = [];
	for(var i = 0; i < t.LIVE_MAX; i++){
		t._data[i] = {}; 
	}
	t._bStart = false;
	}
MultiHeart._timer = function(){
	var t = MultiHeart;
	t._cav.graphics.clear();
	if(!t._bStart){
		return;
	}

	for(var i = 0; i < t.LIVE_MAX; i++){
		var cur = t._data[i];
		cur.x += cur.speedX;
		cur.y -= 1 * cur.speed;
		cur.w += 0.2;
		cur.alpha -= 0.002 * cur.speed;
		cur.color = "rgba(246,0,0,"+ cur.alpha +")";

		var bInit = false;
		if(cur.x > UI_GAME_W||cur.x < -20){bInit=true;}
		if(cur.y < 0-UI_GAME_H){bInit=true;}
		if(cur.w > 200){bInit=true;}
		if(cur.alpha < 0.1){bInit=true;}
		if(bInit){
			t._init(i);
		}
		DrawHeart(cur.x,cur.y,cur.w,cur.color,t._cav);
	}
}
MultiHeart._init = function(i){
	var t = MultiHeart;
	var cur = t._data[i];
	cur.speed =  RANDOM(2,6);
	cur.x = RANDOM(50,UI_GAME_W-50);
	cur.speedX = RANDOM(-2,3);;
	cur.y = 0;
	cur.w = RANDOM(8,24);
	cur.alpha = 1;
	cur.color = "rgba(246,0,0,"+ cur.alpha +")";
	}
MultiHeart.start = function(){
	var t = MultiHeart;
	for(var i = 0; i < t.LIVE_MAX; i++){
		MultiHeart._init(i);
	}
	t._bStart = true;
	}
MultiHeart.init = function(){
	var t = MultiHeart;
	t._bStart = false;
	}



//game canvas
//MainCav erea depend on glabal vals and res
{
	var MainCav = {};
	MainCav._create = function(cav){	//arg2:aniOver recall Func
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
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				var desTimes = t._dataDestoryAniTimes[i][j];
				if(desTimes > 0){
					desTimes--;
					t._dataDestoryAniTimes[i][j] = desTimes;
					if(desTimes == 0){
						t._icon[i][j].bitmapData = ResBitMap.mainicon[0];
						t._data[i][j] = 0;
						if(t._lock){
							t._lock = false;
							g_aniLock--;
						}
					}
					else{
						t._icon[i][j].bitmapData = ResBitMap.mainicon[Math.ceil(desTimes/2)]; //TODO
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
		
		t._lock = false;
		}
	
	//this means it return a const reference,do not change it value！！！
	MainCav.GETICONDATA = function(){
		var t = MainCav;
		return t._data;
		}
	MainCav.getIcon = function(_x,_y){
		var t = MainCav;
		if(t._dataDestoryAniTimes[_x][_y] > 0){
			return 0;
			}
		else{
			return t._data[_x][_y];
			}
		}
	MainCav.changeIconNum = function(_x,_y,_num){
		var t = MainCav;
		if(_x > SP_W_N || _x < 0|| _y < 0 ||_y > SP_H_N){return; }
		if(_num == 0){
			t._dataDestoryAniTimes[_x][_y] = ResBitMap.ANI_FRAME_COUNT * 2;
			if(!t._lock){
				g_aniLock ++;
				t._lock = true;
				}
			}
		else{
			t._data[_x][_y] = _num;
			}
		}
	
	MainCav.downIcon = function(){
		var t = MainCav;
		var data = t._data;
		var down = false;
		for (var x1 = 0; x1 < SP_W_N; x1++) {
			for (var y1 = 0; y1 < SP_H_N-1; y1++) {
				var curIcon = data[x1][y1];
				var preIcon = data[x1][y1+1];
				if(curIcon==0&&preIcon>0&&preIcon<SP_ID_BAD){
					for (var z1 = y1; z1 < SP_H_N-1; z1++) {
						data[x1][z1]=data[x1][z1+1];
						down = true;
					}
					data[x1][SP_H_N-1]=0;
				}
			}
		}
		return down;
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
RandomCav._create = function(cav){ //arg2:raffle event recall func
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
			g_aniLock --;
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
	var t = RandomCav;
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
	g_aniLock ++;
	}
}
//ControlCav depend on MainCav and RandomCav
{
	ControlCav = {};
	ControlCav.SP_NEW_X = 3;
	ControlCav.SP_DOWN_SPEED_MAX = 28;
	ControlCav._create = function(cav){
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
  	t._maskCav2 = new LSprite();
		t._maskCav2.graphics.clear();
		t._maskCav2.graphics.drawRect(2,"#000000",[UI_SP_X,0,SP_W*SP_W_N,UI_SP_Y]);
		t._maskCav2.graphics.beginBitmapFill(ResBitMap.bkImg["ray"]);
		t._maskCav2.x = 0;
		t._maskCav2.y = 0;
		cav.addChild(t._maskCav2);
  	t._dieProtect = 1;
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
  	
  	t._dieProtect = 1;
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
		if(FilterSame.checkExmodel()){
			Eff_laser.clear();
			for(var i = 0; i < t._data.length; i++){
				if(t._data[i] != 0){
					t._data[i] = SP_ID_YSM;
				}
			}
		}
		return true;
	}
	ControlCav.resetSp = function(){
		var t = ControlCav;
		MainCav._timer();//for look well
		if(t._spCav.y <= SP_H && t._spCav.x == t.SP_NEW_X * SP_W ){
			t._dieProtect--;
			}
		else{
			t._dieProtect = 1;
			}
		t._spCav.x = t.SP_NEW_X * SP_W;
		t._spCav.y = 0;
		if(t._dieProtect < 0){
			return false;
			}
		else{
			return true;
			}
		}
	ControlCav._addToMainCav = function(){
		var t = ControlCav;
		var x = t._getX();
		var y = t._getY()+1;
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
		return t._spSpeed;
		}
	ControlCav._getY = function(){
		var t = ControlCav;
		return  SP_H_N - 1 - Math.floor(t._spCav.y/SP_H);
		}
	ControlCav.moveDown = function(){
		var t = ControlCav;
		var x = t._getX();
		t._spCav.y += t._getSpeed();
		var y = t._getY()+1;
		if(MainCav.checkMoveDown(x,y,t._data)){
			return true;
		}
		BadErea._timer(); //special turn timer!!
		ControlCav._addToMainCav();
		t._spCav.y = (SP_H_N- y)*SP_H;
		if(t._data[0] == SP_ID_YSM){
			FilterSame.checkStart(x,y,t._data);
			}
		return false;
		}
	ControlCav.moveLeft = function(){
		if(g_aniLock > 0){return;}
		var t = ControlCav;
		var x = t._getX();
		var posY = t._spCav.y+t._getSpeed();
		var y = SP_H_N - 1 - Math.floor(posY/SP_H);
		if(MainCav.checkMoveLeft(x,y,t._data)){
			t._spCav.x -= SP_W;
			}
		}
	ControlCav.moveRight = function(){
		if(g_aniLock > 0){return;}
		var t = ControlCav;
		var x = t._getX();
		var posY = t._spCav.y+t._getSpeed();
		var y = SP_H_N - 1 - Math.floor(posY/SP_H);
		if(MainCav.checkMoveRight(x,y,t._data)){
			t._spCav.x += SP_W;
			}
		}
	ControlCav.convert = function(){
		if(g_aniLock > 0){return;}
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
	OpreatCav._create = function(cav){
		var t = OpreatCav;
		t._f = [];
		t._f[0] = ControlCav.moveLeft; 
		t._f[1] = ControlCav.moveRight;
		t._f[2] = ControlCav.convert;
		t._f[3] = ControlCav.speedToMax;

		t._cav = new LSprite();
		cav.addChild(t._cav);
		t._cav.alpha = 0.5;
		if(LGlobal.os != OS_PC){
			t.btnL = new XButton(5,230," ← ",t._cav,function(){
			(OpreatCav._f[0])();
			});
			t.btnR = new XButton(90,230," → ",t._cav,function(){
				(OpreatCav._f[1])();
			});
			t.btnUp = new XButton(345,230," ↑ ",t._cav,function(){
				(OpreatCav._f[2])();
			});
			t.btnDown = new XButton(430,230," ↓ ",t._cav,function(){
				(OpreatCav._f[3])();
			});
		}
		
		t._boomBtn = new LSprite();
		t._boomBtn.graphics.drawRect(1,'rgba(0,0,0,0)',[0,130,150,70]);
		t._boomBtn.addEventListener(LMouseEvent.MOUSE_UP,OpreatCav.boom);
		t._cav.addChild(t._boomBtn);
		
		t._revertTime = -1;
	}
	OpreatCav.init = function(){
		t._f[0] = ControlCav.moveLeft;
		t._f[1] = ControlCav.moveRight;
		t._f[2] = ControlCav.convert;
		t._f[3] = ControlCav.speedToMax;
		t._revertTime = -1;
		}
	OpreatCav.destory = function(){
		var t = OpreatCav;
		t._f = [];
		t._f[0] = function(){};
		t._f[1] = function(){};
		t._f[2] = function(){};
		t._f[3] = function(){};
		t._cav.die();
		}
	OpreatCav.boom = function(){
		trace("BOOM");
		var x = RANDOM(100,360);
		var y = RANDOM(140,300);
		var w = RANDOM(40,80);
		var h = RANDOM(40,80);
		BadErea.boom(x,y,w,h);
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
	BadErea.COUNT = 12;
	BadErea._create = function(cav){ //arg2:aniOver recall function
		var t = BadErea;
		t._drawBoomLock = false;
		t._data = [];
		
		
		
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
			cur.showTimes = -1;
			cur.showTimesBuff = -1;
			cur.bDrawed = true;
		}
		
		t._boomImg = new LBitmap(ResBitMap.bkImg["ef_yushenmu"]);
		t._boomImg.visible = false;
		cav.addChild(t._boomImg);
		t._boomImg2 = new LBitmap(ResBitMap.bkImg["ef_boom"]);
		t._boomImg2.visible = false;
		cav.addChild(t._boomImg2);
		
		}
	BadErea._clear = function(){
		for (var x = 0; x < SP_W_N; x++) {
			for(var y = 0; y < SP_H_N; y++){
				if(MainCav.getIcon(x,y) == SP_ID_BAD){
					MainCav.changeIconNum(x,y,SP_ID_YSM);
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
					MainCav.changeIconNum(i,j,SP_ID_BAD);
				}
			}
		}
	}
	BadErea.destoryAll = function(){
		var t = BadErea;
		for(var i = 0; i < t.COUNT; i++){
			t._data[i].showTimes = -1;
			t._data[i].showTimesBuff = -1;
		}
		t._drawPath();
	}
	BadErea._updateImg = function(){
		var t = BadErea;
		var needDraw = false;
		for(var i = 0; i < t.COUNT; i++){
			var cur = t._data[i];
			cur.showTimesBuff = cur.showTimes;
			if(cur.showTimes == 0){
				needDraw = true;
				}
			if(cur.showTimes > cur.showTimesBuff){
				needDraw = true;
				}
		}
		if(needDraw){
			BadErea._reDraw();
		}
		
		}
	BadErea._timer = function(){
		var t = BadErea;
		var needDraw = false;
		for(var i = 0; i < t.COUNT; i++){
			var cur = t._data[i];
			if(cur.showTimes >= 0){
				cur.showTimes -= 1;
			}
		}
	}

	BadErea._reDraw = function(){
		BadErea._clear();
		BadErea._addToMainCav();
		BadErea._drawPath();
	}
	

	BadErea._drawPath = function(){
		var t = BadErea;
		for(var i = 0; i < t.COUNT; i++){
			if(t._data[i].showTimes < 1){
				t._cavs[i].graphics.clear();
			}
			if(t._data[i].showTimes > 0 && !t._data[i].bDrawed){
				t._data[i].bDrawed = true;
				var g = t._cavs[i].graphics;
				g.clear();
				g.drawRect(2,"#000000",[0,0,UI_GAME_W,UI_GAME_H]);

				g.lineStyle = "#000000";
				g.beginBitmapFill(ResBitMap.bkImg["mogeko"]);
				g.beginPath();
				var path = t._data[i].drawPath;
				g.drawVertices(2,"#000000",path);
				//g.stroke();

				trace("BadEreaDrawPath idx:"+i);
			}
			if(t._data[i].showTimes < 0){
				var g = t._cavs[i].graphics;
				g.clear();
				}
		}
	}
	
	BadErea._addNewPath = function(_x,_y,_w,_h){
		var t = BadErea;
		var _x = t._newImgX;
		var _y = t._newImgY;
		var _w = t._newImgW;
		var _h = t._newImgH;
			for(var i = 0; i < t.COUNT; i++){
				var cur = t._data[i];
				if(cur.showTimes == -1){
					cur.x = _x;
					cur.y = _y;
					cur.sizeX = Math.ceil(_w/SP_W);
					cur.sizeY = Math.ceil(_h/SP_H);
					cur.showTimes = RANDOM(2,10);
					cur.bDrawed = false;
					//compute random path
					var t = cur.drawPath;
					var curX = 0;
					var curY = 0;
					var left = _x + 10;
					var right = _x + _w - 20;
					var top = _y + 10;
					var bottom = _y+_h - 20;

					var limit = 0;
					var bOver = false;

					limit = right;
					curX =  left;
					var path = cur.drawPath;
					path.push([_x,_y]);
					while(curX < limit){
						curY = top + RANDOM(-10,10);
						curX += RANDOM(5,10);
						path.push([curX,curY]);
						}
					limit = bottom;
					path.push([left,curY]);
					while(curY < limit){
						curY +=RANDOM(5,10);
						curX = right + RANDOM(-10,10);
						path.push([curX,curY]);
						}
					limit = left;
					path.push([curX,bottom]);
					while(curX > limit){
						curY = bottom + RANDOM(-10,10);
						curX -= RANDOM(5,10);
						path.push([curX,curY]);
						}
					limit = top;
					path.push([right,curY]);
					while(curY>limit){
						curY -= RANDOM(5,10);
						curX = left + RANDOM(-10,10);
						path.push([curX,curY]);
						}
					BadErea._reDraw();
					return;
					}
				}
		};
	
	BadErea.boom = function(_x,_y,_w,_h)
	{
		if(g_aniLock > 0){return;}
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
		
		g_aniLock++;
		
		LTweenLite.to(BadErea._boomImg,2,{x:_x+tx,y:_y+ty,scaleX:1,scaleY:1,delay:1,rotate:3600,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
			BadErea._boomImg.visible = false;
			BadErea._boomImg2.visible = true;
			TIMER(500,1,function(){
				BadErea._boomImg2.visible = false;
				BadErea._drawBoomLock = false;
				BadErea._addNewPath();
				g_aniLock--;
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
ScoreManage._create = function(cav){
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
	t._lineAdd = 0;
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
	t._lineAdd = 0;
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
	var tempSpeed = ControlCav.getBaseSpeed();
	var tempRandom = RandomCav.getRandomMax();
	var tempAdd = t._baseScore;
	var stage = 0;
	for(var i in STAGE_INFO){
		if(t._score >= STAGE_INFO[i].stageScore ){
			stage = i;
		}
	}
	if(stage > t._stage&&t._stageAddLock <= 0){
		t._stage = stage;
	}
	if(stage < t._stage&&t._stageSubLock <= 0){
		t._stage = stage;
	}

	ControlCav.setBaseSpeed(STAGE_INFO[t._stage].speed);
	RandomCav.setRandomMax(STAGE_INFO[t._stage].sp);
	t._end = STAGE_INFO[t._stage].end;
	t._baseScore = STAGE_INFO[t._stage].addScore;


	var txtData =[];
	if(t._baseScore > tempAdd){
		FilterSame.exModel();
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
	ScoreManage._computeStageInfo();
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
				if(DATA[x][y]==SP_ID_YSM){
					temp[x][y]=1;
					score_time += 1;
					}
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
		t._lineAdd = t._lineAdd + (score_time-4)/10;
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
		t._lineAdd = 0;
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


//eff ray
{
var Eff_laser = {};
Eff_laser._create = function(cav){
	var t = Eff_laser;
	t._cav = new LSprite();
	cav.addChild(t._cav);
	t._data = [];
	}
Eff_laser._timer = function(){
	var t = Eff_laser;
	var g = t._cav.graphics;
	g.clear();
	var data = t._data;
	var len = data.length;
	for(var idx = 0; idx < len; idx++){
		var cur = data[idx];
		
		path = [];
		var r = 50;
		var angle =  360 + cur.angle;
		while(angle >= 0){
			var temp = angle;
			if(temp > 360){
				temp -= 360;
				}
			var x1 = Math.sin( temp*Math.PI/180 ) * cur.r;
			var y1 = Math.cos( temp*Math.PI/180) * cur.r;
			path.push([cur.x+x1,cur.y+y1]);
			angle -= 18;
		}
		cur.angle += 7;
		cur.angle = cur.angle%360;
		
		g.beginPath();
		g.moveTo(cur.x,cur.y);
		for(var i = 0;i < path.length-1;i+=2){
			g.lineTo(path[i][0],path[i][1]);
			g.lineTo(path[i+1][0],path[i+1][1]);
			g.lineTo(cur.x,cur.y);
		}
		g.closePath();
		g.fillStyle('rgba(171,239,254,0.5)');
		//g.stroke();
		g.fill();
		g.drawArc(1, 'rgba(171,239,254,0.7)', [cur.x,cur.y, 10, 0, 2*Math.PI], true, 'rgba(171,239,254,0.5)');
//		g.add(function(ctx){
//			ctx.beginPath();
//			var box = ctx.createRadialGradient(cur.x,cur.y,5,cur.x,cur.y,15);
//      box.addColorStop(0, '#52E7EB');
//      box.addColorStop(0.2, '#BBFFFF');
//      box.addColorStop(1, 'rgba(171,239,254,0)');
//			ctx.fillStyle = box;
//			ctx.fillRect(cur.x-15,cur.y-15,cur.x+15,cur.y+15);
//			ctx.save();
//			});
		}
	}
Eff_laser.addLay = function(x,y,r){
	var t = Eff_laser;
	var it = {};
	it.x = x;
	it.y = y;
	it.r = r;
	it.angle = 0;
	t._data.push(it);
	}
Eff_laser.clear = function(){
	var t = Eff_laser;
	t._cav.graphics.clear();
	t._data = [];
	}
	
	

var FilterSame = {};
FilterSame.ANI_TIME = 100;
FilterSame._create = function(){
	var t = FilterSame;
	t._cav = new LSprite();
	t._aniTime = -1;
	t._cur = -1;
	}
FilterSame._timer = function(){
	var t = FilterSame;
	if(t._aniTime == 0){
		Eff_laser.clear();
		g_aniLock --;
		var DATA = MainCav.GETICONDATA();
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				if(DATA[i][j]==t._cur){
					MainCav.changeIconNum(i,j,SP_ID_YSM);
				}
			}
		}
		
		}

	if(t._aniTime >= 0){
		t._aniTime --;
		}
	}
FilterSame.init = function(){
	var t = FilterSame;
	if(t._aniTime > -1){
		t._aniTime = -1;
		Eff_laser.clear();
		g_aniLock --;
		t._cur = -1;
		}
	
	}
FilterSame.exModel = function(){
	var t = FilterSame;
	if(t._exModel||t._aniTime > -1){return;}
	var data = RandomCav._dataNext;
	for(var i = 0; i < data.length; i++){
		RandomCav._dataNext[i] = SP_ID_YSM;
		Eff_laser.addLay(400+15,20+15+SP_H*i,30);
		}
	t._exModel = true;
	}
FilterSame.checkExmodel = function(){
	var t = FilterSame;
	if(t._exModel){
		return true;
		}
	return false;
	}
FilterSame.checkStart = function(_x,_y,_data){
	var t = FilterSame;
	if(t._exModel){
		var DATA = MainCav.GETICONDATA();
		t._exModel = false;
		if(_y <= 0){
			Eff_laser.clear();
			return;
			}
		if(DATA[_x][_y-1] == 0){
			Eff_laser.clear();
			return;
			}
		FilterSame._aniStart(DATA[_x][_y-1]);
		}
	}
FilterSame._aniStart = function(_cur){
	var t = FilterSame;
	var DATA = MainCav.GETICONDATA();
	g_aniLock++;
	for (var i = 0; i < SP_W_N; i++) {
		for (var j = 0; j < SP_H_N; j++) {
			if(DATA[i][j] == _cur){
				Eff_laser.addLay(UI_SP_X+15+SP_W*i,UI_SP_Y+15+SP_H*(SP_H_N-1-j),30);
				t._aniTime = t.ANI_TIME;
				t._cur = _cur;
			}
		}
	}
	
	}	
}


//raffle event
{
	
g_raffle_event = [];
g_raffle_event[0] = function()
	{
		event_darkAndLight();
	}
	g_raffle_event[1] = function()
	{
		g_spLen = RANDOM(4,7);
		longSpTimes = 2;
	}
	g_raffle_event[2] = function()
	{
		var x = RANDOM(140,300);
		var y = RANDOM(160,300);
		var w = RANDOM(40,UI_GAME_W-x);
		var h = RANDOM(40,UI_GAME_H-y);
		BadEreaDrawBoom(x,y,w,h);
	}
	g_raffle_event[3] = function()
	{
		event_fadeDark();
	}
	g_raffle_event[4] = function()
	{
		g_spLen = 1;
		longSpTimes = 10;
	}
	g_raffle_event[5] = function()
	{
		if(g_spSpeedApend <= 9){
			g_spSpeedApend += 3;
		}
	}
	g_raffle_event[6] = function()
	{
		g_protectSp = true;
	}
	g_raffle_event[7] = function()
	{
		var x = RANDOM(100,360);
		var y = RANDOM(140,300);
		var w = RANDOM(40,Math.floor(UI_GAME_W-x/2));
		var h = RANDOM(40,Math.floor(UI_GAME_H-y/2));
		BadEreaDrawBoom(x,y,w,h);
	}
	g_raffle_event[8] = function()
	{
		event_controlDisable();
	}
	g_raffle_event[9] = function()
	{
		event_controlChange();
	}
	g_raffle_event[10] = function()
	{
		if(g_score>520)
		{
			g_score -= 520;
		}
		else
		{
			g_score = 0;
		}
	}
	g_raffle_event[11] = function()
	{
		g_raffle_count++;
	}
	g_raffle_event[12] = function()
	{
		g_score += 666;
	}
	g_raffle_event[13] = function()
	{
		var len = STAGE_INFO.length;
		if(g_stage < len){
			g_stage++;
			}
		g_stageSubLock = 500;
	}
	g_raffle_event[14] = function()
	{
		g_stage = 0;
		g_stageSubLock = 500;
	}
	g_raffle_event[15] = function()
	{
		dataIconFly();
	}
	g_raffle_event[16] = function()
	{
		g_raffle_count++;
	}
	g_raffle_event[17] = function()
	{
		if(g_spSpeedApend > -6){
			g_spSpeedApend -= 3;
			}
	}
	g_raffle_event[18] = function()
	{
		event_raffle();
	}
	g_raffle_event[19] = function()
	{
		g_score += 1000;
	}
}