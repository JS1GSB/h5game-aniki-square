//author:js1gsb
//email:js1gsb@gmail.com
//just for fun :)

BreakVan = {};
BreakVan.BREAK_W_N = 10;
BreakVan.BREAK_H_N = 18;
BreakVan._create = function(cav){
	var t = BreakVan;
	t.breakX = t.BREAK_W_N;
	t.breakY = t.BREAK_H_N;
	t._cav = new LSprite();
	cav.addChild(t._cav);
	
	t._shilei = new LBitmap(ResBitMap.bkImg["shilei"]);
	t._shilei.x = UI_SHILEI_X;
	t._shilei.y = UI_SHILEI_Y;
	t._cav.addChild(t._shilei);

	
	t._van = new LBitmap(ResBitMap.bkImg["van"]);
	t._van.x = UI_VAN_X;
	t._van.y = UI_VAN_Y;
	t._cav.addChild(t._van);
	
	t._bBreakAll = false;
	}
BreakVan._break = function(){
	var t = BreakVan;
	for(var nextIdx = 0; nextIdx < 10;nextIdx++){
		if(t.breakY > 5||t._bBreakAll){
			t.breakX--;
			}
		else{
			break;
			}
		
		if(t.breakX < 0){
			t.breakX = t.BREAK_W_N;
			t.breakY -= 1;
		}
		if(t.breakY < 0||t.breakX < 0){
			return;
		}
		
		if(nextIdx == 0){
			LTweenLite.to(t.badendSps[t.breakX][t.breakY],2,{x:0,y:50,alpha:0,delay:nextIdx*0.1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
				t._break();
			}});
		}
		else{
			LTweenLite.to(t.badendSps[t.breakX][t.breakY],2,{x:0,y:50,alpha:0,delay:nextIdx*0.1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
			}});
		}
	}
	}
BreakVan.start = function(){
	var t = BreakVan;
	
	t._vanCav = new LSprite();
	t._vanCav.x = UI_VAN_X;
	t._vanCav.y = UI_VAN_Y;
	t._cav.addChild(t._vanCav);
	
	var bmpData = ResBitMap.bkImg["van"];
	t.badendSps = [];
	for(var i = 0; i <= t.BREAK_W_N; i++){
		t.badendSps[i] = [];
		for(var j = 0; j <= t.BREAK_H_N; j++){
			t.badendSps[i][j] = new LShape();
			var g = t.badendSps[i][j].graphics;
			g.clear();
			g.beginPath();
			g.drawRect(0,"#000000",[i*12,j*12,12,12]);
			g.beginBitmapFill(bmpData);
			t._vanCav.addChild(t.badendSps[i][j]);
		}
	}
	t._cav.removeChild(t._van);

	TxtDlg.show(TXT_badEnd_1,function(){
		var txtData = TXT_badEnd_2;
		TxtDlg.show(txtData,function(){
			t._shilei.bitmapData = ResBitMap.bkImg["shilei_sad"];
			TxtDlg.show(TXT_badEnd_3,function(){
				LTweenLite.to(t._shilei,2,{x:UI_VAN_X,y:UI_VAN_Y,alpha:0,delay:0,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
					//game over
				}});
			});
			t._bBreakAll = true;
			if(t.breakY <= 5){
				t.breakY = 5;
				t.breakX = t.BREAK_W_N;
			}
			t._break();
		});
		t._break();
	});
	
}
BreakVan.goodEnd = function(){
	var t = BreakVan;
			TxtDlg.show(TXT_goodEnd_1,function(){
				LTweenLite.to(t._van,2,{x:UI_VAN_X+150,y:UI_VAN_Y,delay:1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
				}});
				LTweenLite.to(t._shilei,2,{x:UI_SHILEI_X-150,y:UI_VAN_Y,delay:1,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
				MultiHeart.start()
			}});
	});
	
	}


//FilterSame.exModel();
//Eff_laser.addLay(100,200,30);
//Game logic
var Game = {};
Game._create = function(_cav){
	var t = Game;
	t._cav = new LSprite();
	_cav.addChild(t._cav);
	
	
	t._bkImg = new LBitmap(ResBitMap.bkImg["ray"]);
	t._cav.addChild(t._bkImg);
	
	
	
	MainCav._create(t._cav);
	RandomCav._create(t._cav);
	
	DarkAndLight._create(t._cav);
	
	ControlCav._create(t._cav);
	ScoreManage._create(t._cav);
	
	t._endImg = new LBitmap();
	t._cav.addChild(t._endImg);
	BreakVan._create(t._cav);
	BadErea._create(t._cav);
	
	t._effectCav = new LSprite();
	t._cav.addChild(t._effectCav);
	DarkScreen._create(t._effectCav);
	Eff_laser._create(t._effectCav);
	FilterSame._create(t._effectCav);
	MultiHeart._create(t._effectCav);
	
	
	OpreatCav._create(t._cav);
	TxtDlg._create(t._cav);
	
	Game.init();
	LGlobal.stage.addEventListener(LKeyboardEvent.KEY_PRESS,OpreatCav._keyF);
	TIMER(50,MAX_VALUE,t._timer); //FIXME
	
	}
Game.init = function(cav){
	var t = Game;
	t._state = Game.RUN;
	MainCav.init();
	RandomCav.init();
	ControlCav.init();
	ScoreManage.init();
	BadErea.destoryAll();
	
	DarkScreen.init();
	DarkAndLight.init();
	FilterSame.init();
	MultiHeart.init();
	
	Game._node = "MOVEDOWN";
	}
Game.normolEnd = function(){
	TxtDlg.show(TXT_normalEnd_1,function(){
		Game.init();
		g_aniLock--;
		});
	}

Game.badEnd = function(){
	OpreatCav.destory();
	BreakVan.start();
	}
Game.goodEnd = function(){
	var t = Game;
	t._endImg.bitmapData = ResBitMap.bkImg["mogeko"];
	OpreatCav.destory();
	BreakVan.goodEnd();
	}
Game.over = function(){
	g_aniLock ++;
	trace("game over!");
	var end = STAGE_INFO[ScoreManage._stage].end;
	switch(end){
		case 0:
		Game.normolEnd();
		break;
		case 1:
		Game.badEnd();
		break;
		case 2:
		Game.goodEnd();
		break;
		}
	return true;
	}
Game._update = function(){
	MainCav._timer();
	RandomCav._timer();
	ScoreManage._timer();
	//BadErea._timer(); not be here!! search special timer 
	BadErea._updateImg();
	ControlCav._timer();
	OpreatCav._timer();
	
	//effect
	DarkScreen._timer();
	DarkAndLight._timer();
	Eff_laser._timer();
	FilterSame._timer();
	MultiHeart._timer();
	
	}
Game._timer = function(){
	Game._update();
	if(g_aniLock < 1){
		Game._executeLogic();
		}
	}
Game.LOGIC = {
	"MOVEDOWN":{f:ControlCav.moveDown,l:"MOVEDOWN",r:"RESET_CONTROL"}
	,"RESET_CONTROL":{f:ControlCav.resetSp,l:"COMPUTE",r:"OVER"}
	,"COMPUTE":{f:ScoreManage.compute,l:"NEWSP",r:"DOWN"}
	,"DOWN":{f:MainCav.downIcon,l:"DOWN",r:"COMPUTE"}
	,"NEWSP":{f:ControlCav.reloadSetUp,l:"MOVEDOWN",r:"MOVEDOWN"}
	,"OVER":{f:Game.over,l:"NEWSP",r:"NEWSP"}
};
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
		g_soundRes.play();
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
		Game._create(g_gameLayer);
		g_backLayer.die();
		trace("game start!");
	});
}
//load res
function main () {
	//LGlobal.setDebug(true);
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