//just for fun :)

//resource data
{
	var DATA_RAW = new Array(
	{name:"bk_img_ray",path:"./img/bk_ray.jpg"}
	,{name:"bk_img_mogeko",path:"./img/bk_mogeko.jpg"}
	,{name:"n_0",path:"./img/i_0.png"}
	,{name:"n_1",path:"./img/i_1.png"}
	,{name:"n_2",path:"./img/i_2.png"}
	,{name:"n_3",path:"./img/i_3.png"}
	,{name:"n_4",path:"./img/i_4.png"}
	,{name:"n_5",path:"./img/i_5.png"}
	,{name:"n_6",path:"./img/i_6.png"}
	,{name:"n_7",path:"./img/i_7.png"}
	,{name:"n_8",path:"./img/i_8.png"}
	,{name:"n_9",path:"./img/i_9.png"}
	,{name:"i_1",path:"./img/i_black.png"}
	,{name:"i_2",path:"./img/i_blue.png"}
	,{name:"i_3",path:"./img/i_green.png"}
	,{name:"i_4",path:"./img/i_purple.png"}
	,{name:"i_5",path:"./img/i_red.png"}
	,{name:"i_6",path:"./img/i_yellow.png"}
	,{name:"i_7",path:"./img/i_yushenmu.png"}
	,{name:"p_shilei",path:"./img/p_shilei.png"}
	,{name:"p_van",path:"./img/p_van.png"}
	,{name:"ef_boom",path:"./img/ef_boom.png"}
	,{name:"ef_yushenmu",path:"./img/ef_yushenmu.png"}
	,{name:"s_bgm_back",path:"./sound/s_bgm_back.mp3"}
	,{name:"s_bgm_dark",path:"./sound/s_bgm_dark.mp3"}
	,{name:"s_bgm_init",path:"./sound/s_bgm_init.mp3"}
	,{name:"s_bgm_up",path:"./sound/s_bgm_up.mp3"}
	,{name:"s_billy_aaaaa",path:"./sound/s_billy_aaaaa.mp3"}
	,{name:"s_billy_aoyi",path:"./sound/s_billy_aoyi.mp3"}
	,{name:"s_billy_asswecan",path:"./sound/s_billy_asswecan.mp3"}
	,{name:"s_billy_haiyaoshang",path:"./sound/s_billy_haiyaoshang.mp3"}
	,{name:"s_billy_hou",path:"./sound/s_billy_hou.mp3"}
	,{name:"s_billy_letusgo",path:"./sound/s_billy_letusgo.mp3"}
	,{name:"s_billy_maixiaoer",path:"./sound/s_billy_maixiaoer.mp3"}
	,{name:"s_billy_paqiuligo",path:"./sound/s_billy_paqiuligo.mp3"}
	,{name:"s_billy_puff",path:"./sound/s_billy_puff.mp3"}
	,{name:"s_billy_thankyou",path:"./sound/s_billy_thankyou.mp3"}
	,{name:"s_billy_thatispower",path:"./sound/s_billy_thatispower.mp3"}
	,{name:"s_billy_zhanhao",path:"./sound/s_billy_zhanhao.mp3"}
	,{name:"s_van_boynextdoor",path:"./sound/s_van_boynextdoor.mp3"}
	,{name:"s_van_ddf",path:"./sound/s_van_ddf.mp3"}
	,{name:"s_van_en",path:"./sound/s_van_en.mp3"}
	,{name:"s_van_fuckyou",path:"./sound/s_van_fuckyou.mp3"}
	,{name:"s_van_iamcoming",path:"./sound/s_van_iamcoming.mp3"}
	,{name:"s_van_ohshit",path:"./sound/s_van_ohshit.mp3"}
	,{name:"s_van_sm",path:"./sound/s_van_sm.mp3"}
	,{name:"s_van_thatisgood",path:"./sound/s_van_thatisgood.mp3"}
	);
}
//global values set
{
	var MAX_VALUE = 210000000;

	var loader;
	var loadingLayer;
	var res = {};

	var SP_W = 30;
	var SP_H = 30;
	var SP_NEW_X = 3;
	var SP_W_N = 6;
	var SP_H_N = 10;
	var GAME_SPEED = 100; //游戏主循环执行的时间间隔
	var SP_DOWN_SPEED_LOW = 5;
	var SP_DOWN_SPEED_QUICK = 30;
	var ADD_SCORE_VAL = 7;
	
	var SP_MAX_LEN = 6;//控制下落方块最大数量
	var SP_LEN = 3;//ui显示下一个下落方块的数量『暂时设为固定的3』
	
	var UI_TIP_LEN = 3; //提示下一个的长度
	
	var UI_GAME_PIX_W = 500;
	var UI_GAME_PIX_H = 350;
	var UI_SP_X = 160;
	var UI_SP_Y = 30;
	var UI_SCORE_LEN = 4;
	var UI_SCORE_SPLITE = 35;
	var UI_VAN_X =  20;
	var UI_VAN_Y =  126;
	var UI_SHILEI_X = 360;
	var UI_SHILEI_Y = 126;
	
	var g_bWTF =true;//秘籍？？
}
//some libs
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

	//fade sound
	SOUND = {};
	SOUND.loopVolume = 1;
	SOUND.bInit = false;
	SOUND.timer = {};
	SOUND.fadePlay = false;
	SOUND.TimerF = function(){
		if(SOUND.loopSound.paused || SOUND.loopSound.ended){
			SOUND.loopSound.play();
		}
		if(SOUND.fadePlay)
		{
			if(SOUND.loopVolume <= 0.1){
				SOUND.specialSound.play();
				SOUND.fadePlay 	= false;
			}
			SOUND.loopVolume -= 0.2;
			if(SOUND.loopVolume < 0.1){
				SOUND.loopVolume = 0.1
			}
			SOUND.loopSound.volume = SOUND.loopVolume;
		}
		if(!SOUND.fadePlay)
		{
			if(SOUND.specialSound.ended||SOUND.specialSound.paused){
				SOUND.loopVolume += 0.1;
				if(SOUND.loopVolume > 1){
					SOUND.loopVolume = 1;
				}
				SOUND.loopSound.volume = SOUND.loopVolume;
			}
		}
	};
	SOUND.init = function(sound){
		SOUND.loopSound = sound;
		SOUND.specialSound = sound;

		SOUND.timer = TIMER(100,MAX_VALUE,SOUND.TimerF);
	};
	SOUND.play = function(sound,bLoop){
		if (!SOUND.bInit&&bLoop)
		{
			SOUND.init(sound);
		}
		if(bLoop){
			SOUND.loopSound = sound;
		}
		if(!bLoop)
		{
			if(SOUND.specialSound){
				SOUND.specialSound.pause();
			}
			SOUND.fadePlay = true;
			SOUND.specialSound = sound;
		}
		SOUND.bInit = true;
	};
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
		sp.drawRoundRect(2,"#000000",[_x,_y,len+10,25,5],true,"#666666");
		layer.addEventListener(LMouseEvent.MOUSE_UP,_f);
		layer.alpha = 0.6;
		txtField.alpha = 2;
		_parent.addChild(layer);
		layer.addChild(txtField);
		return sp;
	}

	XButton = function(_x,_y,_txt)
	{
		var title;
		title = new LTextField();
		title.text = _txt;
		var len = title.getWidth()+40;
		var upState = new LPanel("#666666",len,50);

		title.color = "#000000";
		title.size = 20;
		title.x = (upState.getWidth() - title.getWidth())*0.5;
		title.y = (upState.getHeight() - title.getHeight())*0.5;
		upState.addChild(title);
		var overState = new LPanel("#999999",len,50);
		title = new LTextField();
		title.text = _txt;
		title.color = "#FF0000";
		title.size = 20;
		title.x = (upState.getWidth() - title.getWidth())*0.5;
		title.y = (upState.getHeight() - title.getHeight())*0.5;
		overState.addChild(title);
		var downState = new LPanel("#CCCCCC",len,50);
		title = new LTextField();
		title.text = _txt;
		title.color = "#FF0000";
		title.size = 20;
		title.x = (upState.getWidth() - title.getWidth())*0.5;
		title.y = (upState.getHeight() - title.getHeight())*0.5;
		downState.addChild(title);
		var button01 = new LButton(upState,overState,downState);
		button01.x = 50;
		button01.y = 50;
		return button01;
	}

	TxtDlg = {};
	TxtDlg._bInit = false;
	TxtDlg.lastStrAry = new Array(" /"," -"," \\"," |");
	TxtDlg._init = function(){
		TxtDlg.lastStridx = 0;
		TxtDlg.bShow = false;
		TxtDlg.sp = new LSprite();
		TxtDlg.txt = new LTextField();
		TxtDlg.txt.x = 5;
		TxtDlg.txt.y = 3;
		uiLayer.addChild(TxtDlg.sp);
		TxtDlg.sp.addChild(TxtDlg.txt);
		TxtDlg.onClick = function(){
			TxtDlg.sp.graphics.clear();
			TxtDlg.txt.text = "";
			TxtDlg.curLen = 0;
			TxtDlg.ref();
			TxtDlg.bShow = false;
		};
		TxtDlg.timer = TIMER(200,MAX_VALUE,function(){
			if(!TxtDlg.bShow){
				return;
			}
			if(TxtDlg.curLen < TxtDlg.len){
				TxtDlg.txt.text = TxtDlg.txt.text + TxtDlg.strAry[TxtDlg.curLen];
				TxtDlg.curLen++;
			}
			else
				{
					TxtDlg.txt.text = TxtDlg.endTxt + TxtDlg.lastStrAry[TxtDlg.lastStridx];
					TxtDlg.lastStridx ++;
					if(TxtDlg.lastStridx > 3){
						TxtDlg.lastStridx = 0;
					}
				}
			});
			TxtDlg.sp.addEventListener(LMouseEvent.MOUSE_UP,TxtDlg.onClick);
			TxtDlg._bInit = true;
		};
		TxtDlg.show =function(_type,_txt,_ref){
			if(!TxtDlg._bInit){
				TxtDlg._init();
			}
			
			TxtDlg.ref = _ref;
			var t = new LTextField();
			t.text = _txt;
			var len = t.getWidth();
			if(_type == "left"){
				TxtDlg.sp.x = UI_VAN_X + 120;
				TxtDlg.sp.y = UI_VAN_Y;
			}
			if(_type == "right"){
				TxtDlg.sp.x = UI_SHILEI_X - len;
				TxtDlg.sp.y = UI_SHILEI_Y;
			}
			
			var g = TxtDlg.sp.graphics;
			g.clear();
			g.drawRoundRect(2,"#000000",[0,0,len+20,25,5],true,"#999999");
			g.beginPath();
			if(_type == "left"){
				g.moveTo(1,20);
				g.lineTo(-10,35);
				g.lineTo(10,24);
				g.stroke();
				}
			if(_type == "right"){
				g.moveTo(len+21,20);
				g.lineTo(len+31,35);
				g.lineTo(len+10,24);
				g.stroke();
				}
			g.fillStyle("#999999");
			g.fill();
			TxtDlg.len = _txt.length;
			TxtDlg.curLen = 0;
			TxtDlg.txt.text = "";
			TxtDlg.strAry = _txt.split("");
			TxtDlg.endTxt = _txt;
			TxtDlg.bShow = true;
		};

		//over

}







	var game={};
	game.buff="waite";
	game.bCreate = false;
	game.create = function(){
		game.par=gameLayer;
		game.lineAdd=0;
		game.mainCanvas=new LSprite();
		game.par.addChild(game.mainCanvas);

		
		game.bkCanvas = new LSprite();
		game.mainCanvas.addChild(game.bkCanvas);
		game.mogekoData =  new LBitmapData(res["bk_img_mogeko"]);
		game.bkBmpData = new LBitmapData(res["bk_img_ray"]);
		var bmp = new LBitmap(game.bkBmpData);
		game.bkCanvas.addChild(bmp);
		
		
		
		game.spBkCanvas = new LSprite();
		game.spBkCanvas.x = UI_SP_X;
		game.spBkCanvas.y = UI_SP_Y;d
		game.mainCanvas.addChild(game.spBkCanvas);
		var x=15,y=20;
		var g = game.spBkCanvas.graphics;
		g.drawRoundRect(2,"#000000",[0,0,180,300,10],true,"#F6A19A");
		while(y < 280 ){
			game.drawHeart(x,y,14,"#F6CEB4",game.spBkCanvas);
			x += 25;
			if(x > 180){
				x = 15;
				y += 40;
				}
			}
		x = 26 , y = 5
		while(y < 290 ){
			game.drawHeart(x,y,8,"#F6CEB4",game.spBkCanvas);
			x += 25;
			if(x > 160){
				x = 26;
				y += 40;
				}
			} 
		game.spBkCanvas.cacheAsBitmap(true);
		
		game.spCanvas = new LSprite();
		game.mainCanvas.addChild(game.spCanvas);
		
		

		game.spCanvas = new LSprite();
		game.mainCanvas.addChild(game.spCanvas);
		game.spCanvas.x = UI_SP_X;
		game.spCanvas.y = UI_SP_Y;
		game.dataIcon=[];
		for (var i = 0; i < SP_W_N; i++) {
			game.dataIcon[i]=[];
			for (var j = 0; j < SP_H_N; j++) {
				game.dataIcon[i][j] = new LBitmap();
				game.dataIcon[i][j].x = SP_W*i;
				game.dataIcon[i][j].y = SP_H*(SP_H_N-j-1);
				game.spCanvas.addChild(game.dataIcon[i][j]);
			}
		}
		game.dataCur=[];
		game.dataPre=[];	//double buffing for draw
		game.dataTemp=[]; //compute buff
		for (var i = 0; i < SP_W_N; i++) {
			game.dataCur[i]=[];
			game.dataPre[i]=[];
			game.dataTemp[i]=[];
		}
		
		
		
		game.spCtrlCanvas = new LSprite();
		game.spCanvas.addChild(game.spCtrlCanvas);
		game.spCur = [];
		game.spPre = [];
		game.spIcon = [];
		for (i = 0; i < SP_MAX_LEN; i++) {
			game.spCur[i] = 0;
			game.spPre[i] = 0;
			game.spIcon[i] = new LBitmap();
			game.spIcon[i].x = 0;
			game.spIcon[i].y = 0 - (i+1) * SP_H;
			game.spCtrlCanvas.addChild(game.spIcon[i]);
		}
		game.spX = 0;
		game.spY = 0;
		game.spIconX = 0;
		game.spIconY = 0;
		
		game.stencilCanvas = new LSprite();
		var tx = UI_SP_X+SP_W*SP_W_N;
		game.stencilCanvas.graphics.clear();
		game.stencilCanvas.graphics.drawRect(2,"#000000",[UI_SP_X,0,SP_W*SP_W_N,UI_SP_Y],true,"#000000");
		game.stencilCanvas.graphics.beginBitmapFill(game.bkBmpData);
		
		game.stencilCanvas.x = 0 - UI_SP_X;
		game.stencilCanvas.y = 0 - UI_SP_Y;
		game.spCanvas.addChild(game.stencilCanvas);
		
		
		game.mogekoCanvas = new LSprite();
		game.mainCanvas.addChild(game.mogekoCanvas);
		
		
		game.uiCanvas = new LSprite();
		game.mainCanvas.addChild(game.uiCanvas);
		game.scoreCur = [];
		game.scorePre = [];
		game.scoreIcon = [];
		for (var i = 0; i < UI_SCORE_LEN; i++) {
			game.scoreIcon[i] = new LBitmap();
			var bitmapdata = new LBitmapData(res["n_"+0]);
			game.scoreIcon[i].bitmapData=bitmapdata;
			game.scoreIcon[i].x = 10+ UI_SCORE_SPLITE * i;
			game.scoreIcon[i].y = 0;
			game.uiCanvas.addChild(game.scoreIcon[i]);
		}
		
		game.tipCur = [];
		game.tipPre = [];
		game.tipIcon = [];
		for (i = 0; i < UI_TIP_LEN; i++) {
			game.tipIcon[i] = new LBitmap();
			game.tipIcon[i].x = 400;
			game.tipIcon[i].y = 20 + SP_H*(UI_TIP_LEN-1-i);
			game.uiCanvas.addChild(game.tipIcon[i]);
		}
		
		game.badEreaCount = 5;
		game.badEreaCanvas = [];
		for(var i = 0; i<game.badEreaCount; i++){
			game.badEreaCanvas[i] = new LSprite();
			game.uiCanvas.addChild(game.badEreaCanvas[i]);
		}
		
		
		
		var tdata = new LBitmapData(res["p_van"]);
		game.bkVan = new LBitmap(tdata);
		game.bkVan.x = UI_VAN_X;
		game.bkVan.y = UI_VAN_Y;
		game.uiCanvas.addChild(game.bkVan);
		tdata = new LBitmapData(res["p_shilei"]);
		game.bkShilei = new LBitmap(tdata);
		game.bkShilei.x = UI_SHILEI_X;
		game.bkShilei.y = UI_SHILEI_Y;
		game.uiCanvas.addChild(game.bkShilei);
		
		game.testCanvas = new LSprite();
		game.mainCanvas.addChild(game.testCanvas);
		game.VanOpaiBtn = new SButton(80,200,"test",game.uiCanvas,function(){
//			//game.drawHeart(120,50,20,"#F6CEB4",game.uiCanvas);
//			//game.event_laser(80,230,300,100);
			game.effect_mutiHeart_On(50,300,game.testCanvas)
			var x = RANDOM(200,300);
			var y = RANDOM(200,300);
			game.BadEreaDrawBoom(UI_SP_X,UI_SP_Y+30*7,90,90);
			});
//		game.VanJJBtn = new SButton(120,320,"",game.uiCanvas,function(){});
//		game.slOpaiBtn = new SButton(120,320,"",game.uiCanvas,function(){});
//		game.slJJBtn = new SButton(120,320,"",game.uiCanvas,function(){});
		game.effectCanvas = new LSprite();
		game.mainCanvas.addChild(game.effectCanvas);
		
		var boomData = new LBitmapData(res["ef_yushenmu"]);
		game.badEreaBoomImg = new LBitmap(boomData);
		game.badEreaBoomImg.visible = false;
		game.effectCanvas.addChild(game.badEreaBoomImg);
		boomData = new LBitmapData(res["ef_boom"]);
		game.badEreaBoomImg2 = new LBitmap(boomData);
		game.badEreaBoomImg2.visible = false;
		game.effectCanvas.addChild(game.badEreaBoomImg2);
		
		//listenner
		LGlobal.stage.addEventListener(LKeyboardEvent.KEY_PRESS,
		function(e){
			game.keyTriF(e.keyCode)
			}
		);
		
		//game loop
		game.timer=TIMER(GAME_SPEED,MAX_VALUE,function(){
			//trace("timer: "game.buff);
				//game.BadEreaCompute();
				game.reDrawCtrSp();
				game.reDrawScore();
				game.reDrawTip();
				if(game.buff=="compute"){game.compute();}
				switch (game.buff) {
					case "laser":
					game.laser();
					break;
					case "gameStar":
					break;
					case "showYSM":
					game.clearYSM();
					break;
					case "down":
					game.down();
					game.reDraw();
					break;
					case "spNew":
					game.spNew();
					game.BadEreaTimesSub();
					game.spDown();
					//game.reDraw();
					break;
					case "spDown":
					game.spDown();
					game.reDraw();
					break;
					case "gameOver":
					game.over();
					break;
					default:
					break;
				}
			});
	};
	game.init=function(){
		if(!game.bCreate){
			game.create();
			game.bCreate = true;
		}

		for (var n = 0; n < SP_W_N; n++) {
			for (var m = 0; m < SP_H_N; m++) {
				game.dataCur[n][m]=0;
				game.dataPre[n][m]=0;
				game.dataTemp[n][m]=0;
				var bitmapdata= new LBitmapData();
				game.dataIcon[n][m].bitmapData = bitmapdata;
			}
		}
		for (var i = 0; i < UI_TIP_LEN; i++) {
			game.tipCur[i] = RANDOM(1,7);
			game.tipPre[i] = RANDOM(1,7);
			var bitmapdata= new LBitmapData();
			game.tipIcon[i].bitmapData = bitmapdata;
		}
		for (var i = 0; i < UI_SCORE_LEN; i++) {
			game.scoreCur[i] = 0;
			game.scorePre[i] = 0;
			var bitmapdata= new LBitmapData(res["n_0"]);
			game.scoreIcon[i].bitmapData = bitmapdata;
		}
		
		for (var i = 0; i < SP_MAX_LEN; i++) {
			game.spCur[i] = game.tipCur[i];
			game.spPre[i] = 0;
			var bitmapdata= new LBitmapData();
			game.spIcon[i].bitmapData = bitmapdata;
		}
		game.spCurLen = 3;
		game.spShowX = SP_W_N * SP_NEW_X;
		game.spShowY = 0;
		game.score=0;
		game.lineAdd=0;//combo 
		game.spSwapIdx = 0; //swap square idx swap idx square and idx+1 square
		game.spSpeed = SP_DOWN_SPEED_LOW;
		game.spSpeedLock = false; //速度更改锁
		
		//初始化炸毁区域
		game.badErea = [];
		for(var i = 0; i<game.badEreaCount; i++){
			game.badErea[i]={};
			var t = game.badErea[i];
			t.x = 0;
			t.y = 0;
			t.sizeX = 0;
			t.sizeY = 0;
			t.drawPath = [];
			t.showTimes = 0;
			t.bDrawed = true;
			}
		
		
		
		game.buff="spNew";
	};
	game.over=function(){
		SOUND.play(res["s_billy_thankyou"]);
		game.buff="waite";
	};

	game.compute=function(){
		game.buff="spNew";
		for (var x = 0; x < SP_W_N; x++) {
			for(var y=0;y < SP_H_N;y++){
				if(game.dataCur[x][y]!=0&&game.dataCur[x][y]!=8){
					if(y<SP_H_N-2){
						if(game.dataCur[x][y]==game.dataCur[x][y+1]&&game.dataCur[x][y]==game.dataCur[x][y+2]){
							game.dataTemp[x][y]=9;
							game.dataTemp[x][y+1]=9;
							game.dataTemp[x][y+2]=9;
							game.buff="showYSM";
						}
					}
					if(y>=2){
						if(game.dataCur[x][y]==game.dataCur[x][y-1]&&game.dataCur[x][y]==game.dataCur[x][y-2]){
							game.dataTemp[x][y]=9;
							game.dataTemp[x][y-1]=9;
							game.dataTemp[x][y-2]=9;
							game.buff="showYSM";
						}
					}
					if(x<SP_W_N-2){
						if(game.dataCur[x][y]==game.dataCur[x+1][y]&&game.dataCur[x][y]==game.dataCur[x+2][y]){
							game.dataTemp[x][y]=9;
							game.dataTemp[x+1][y]=9;
							game.dataTemp[x+2][y]=9;
							game.buff="showYSM";
						}
					}
					if(y<SP_H_N-2&&x<SP_W_N-2){
						if(game.dataCur[x][y]==game.dataCur[x+1][y+1]&&game.dataCur[x][y]==game.dataCur[x+2][y+2]){
							game.dataTemp[x][y]=9;
							game.dataTemp[x+1][y+1]=9;
							game.dataTemp[x+2][y+2]=9;
							game.buff="showYSM";
						}
					}
					if(x>=2&&y<SP_H_N-2){
						if(game.dataCur[x][y]==game.dataCur[x-1][y+1]&&game.dataCur[x-1][y+1]==game.dataCur[x-2][y+2]){
							game.dataTemp[x][y]=9;
							game.dataTemp[x-1][y+1]=9;
							game.dataTemp[x-2][y+2]=9;
							game.buff="showYSM";
						}
					}
					if(x>=2&&y>=2){
						if(game.dataCur[x][y]==game.dataCur[x-1][y-1]&&game.dataCur[x-1][y-1]==game.dataCur[x-2][y-2]){
							game.dataTemp[x][y]=9;
							game.dataTemp[x-1][y-1]=9;
							game.dataTemp[x-2][y-2]=9;
							game.buff="showYSM";
						}
					}
					if(x<SP_W_N-2&&y>=2){
						if(game.dataCur[x][y]==game.dataCur[x+1][y-1]&&game.dataCur[x+1][y-1]==game.dataCur[x+2][y-2]){
							game.dataTemp[x][y]=9;
							game.dataTemp[x+1][y-1]=9;
							game.dataTemp[x+2][y-2]=9;
							game.buff="showYSM";
						}
					}
				}

			}
		}
		
		if(game.buff =="showYSM"){
			game.buff = "waite";
			game.addYSM();
			game.reDraw();
			TIMER(500,1,function(){
				game.buff ="showYSM";
				});
			}
		
	};
	game.addYSM=function(){
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				if(game.dataTemp[x][y]==9){
					game.dataCur[x][y]=7;
				}
			}
		}
	};
	game.clearYSM=function(){
		var num=0;
		var showX=0;
		var showY=0;
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				game.dataTemp[x][y]=0;
				if(game.dataCur[x][y]==7){
					game.dataCur[x][y]=0;
					showX=x;
					showY=y;
					num+=ADD_SCORE_VAL;
				}
			}
		}
		game.lineAdd+=1;
		num=num*game.lineAdd;
		game.changeScore(num,240+showX*40,50+(9-showY)*40);
		game.buff="down";; 
	};

	game.down=function(){
		game.buff="compute";
		var data = game.dataCur;
		for (var x1 = 0; x1 < SP_W_N; x1++) {
			for (var y1 = 0; y1 < SP_H_N-1; y1++) {
				var curIcon = data[x1][y1];
				var preIcon = data[x1][y1+1];
				if(curIcon==0&&preIcon!=0&&preIcon!=8){																							 
					data[x1][SP_H_N]=0;
					for (var z1 = y1; z1 < SP_H_N-1; z1++) {
						if(data[x1][z1]!=8&&data[x1][z1+1]!=8){//禁止移动损坏区域
							trace("cur:"+data[x1][z1]+" previous:"+data[x1][z1+1]);
							data[x1][z1]=data[x1][z1+1];
							game.buff="down";	
						}
					}
				}
			}
		}
		trace("game.down buff:"+game.buff);
	};
	game.spNew=function(){
		game.spCur=game.tipCur.concat();
		for(var y = 0; y < SP_LEN;y++){
			game.tipCur[y]=RANDOM(0,6)+1;
			}
		
		game.spX=SP_NEW_X;
		game.spY=SP_H_N;
		game.spIconX=SP_NEW_X * SP_W;
		game.spIconX=0;
		game.lineAdd=0;
		game.spCtrlCanvas.visible = true;
		game.spCtrlCanvas.x = SP_NEW_X * SP_W;
		game.spCtrlCanvas.y = 0;
		
		if(game.dataCur[SP_NEW_X][SP_H_N-SP_LEN-1]!=0&&g_bWTF){ //特殊事件_保护秘籍
			for(var i=0; i<SP_LEN;i++){
				game.spCur[i]=7;
				}
		}
	};
	game.spAdd=function(){
		for (var i = 0; i < SP_H_N-game.spY&&i<SP_LEN; i++) {
 			var x=game.spX;
			var y=game.spY;
	 		game.dataCur[x][y+i]=game.spCur[i];
		}
		game.spCtrlCanvas.visible = false;
	};
	
	game.spDown=function(){
		game.buff="spDown";
		game.spCtrlCanvas.y += game.spSpeed;
		var curY = SP_H_N - Math.floor(game.spCtrlCanvas.y/SP_H);
		if(curY == game.spY&&curY!=SP_H_N){	
			return ;
			}
			else
				{
					game.spY = curY;
				}
		
		if(game.spY>0&&game.dataCur[game.spX][game.spY-1]==0){		
		}
		else {
			game.spAdd();
			game.buff="compute";

			game.spSpeedLock = false; //恢复加速功能
			game.spSpeed = SP_DOWN_SPEED_LOW; //恢复下落速度
			
			if(game.dataCur[game.spX][game.spY]==7){
				game.square = game.dataCur[game.spX][game.spY-1];
				game.buff = "laser";
				if(game.square == 8){ //如果碰到了损坏区域，完全清除！
					game.BadEreaDestory();
					}
				}
			
			if(game.spY==SP_H_N){
				game.buff="gameOver";
				TxtDlg.show("left","死啦！",function(){
					game.init();
			});
				
				
				//game.dataIconFly();		
				}
		}
	};
	game.spLeft=function(){
		if(game.spX>0&&game.buff=="spDown"){
			var bMove = true;
			for(var i = 0; i < SP_LEN; i++){
				var x = game.spX-1;
				var y = SP_H_N - Math.ceil((game.spCtrlCanvas.y+1)/SP_H) +i
				if(y<SP_H_N&&game.dataCur[x][y]!=0){
					bMove = false;
					}
				}
			if(bMove){ //待修改 新增置空方块
				game.spX--;
				game.spCtrlCanvas.x -= SP_W;
			}
		}
	};
	
	game.spRight=function(){
		if(game.spX < SP_W_N-1&& game.buff == "spDown"){
			var bMove = true;
			for(var i = 0; i < SP_LEN; i++){
				var x = game.spX+1;
				var y = SP_H_N - Math.ceil((game.spCtrlCanvas.y+1)/SP_H) +i
				if(y<SP_H_N&&game.dataCur[x][y]!=0){
					bMove = false;
					}
				}
			if(bMove){ //待修改 新增置空方块
				game.spX++;
				game.spCtrlCanvas.x += SP_W;
			}
		}
	};
	game.spOver=function(){
		if(game.buff!="spDown"||game.spSpeedLock){return 0;}
		game.spSpeedLock = true;
		game.spSpeed = SP_DOWN_SPEED_QUICK;
		TIMER(500,1,function(){
			if(game.spSpeedLock){
					game.spSpeed = SP_DOWN_SPEED_LOW;
					game.spSpeedLock = false;
				}
			});
	};
	
	game.spChang=function(){
		if(game.buff!="spDown"){return 0;}
		var idx = game.spSwapIdx;
		var swapIdx = game.spSwapIdx+1;
		
		var num = game.spCur[idx];
		game.spCur[idx] = game.spCur[swapIdx];
		game.spCur[swapIdx] = num;
		
		game.spSwapIdx ++;
		if(game.spSwapIdx >= game.spCurLen - 1){
			game.spSwapIdx = 0;
			} 
	};

	game.changeScore=function(_score,_x,_y){
		game.tempScore=[];
		game.score+=_score;
		if(_score<0){_score=0-_score;game.tempScore.push(11);}
		else {
			game.tempScore.push(10);
		}
		bAddStar=false;
		var tnum = 100000;
		for (var i = 0; i < UI_SCORE_LEN; i++) {
		 var num = Math.floor(game.score%tnum/(tnum/10));
		 if(tnum!=0||bAddStar){
		 	game.tempScore.push(tnum);
		 	bAddStar =true;
		 	}
		 tnum = tnum / 10;
		}
		for (var i = 0; i < game.tempScore.length; i++) {
//			t=Sys.newBitmap({lifeTime:3,motion:{x:{fromValue:_x+i*20},y:{fromValue: _y, toValue: _y-50, lifeTime: 2, startDelay:500, easing:"None"}}});
//			t.x=_x+i*20;
//			t.y=_y;
//			game.mainCanvas.addChild(t); //待修改 加分动画
		}

	};
	
	game.reDrawTip = function(){
		for(var i = 0; i < UI_TIP_LEN; i++){
				if(game.tipCur[i]!=game.tipPre[i]){
					var bitmapdata = new LBitmapData(res["i_"+game.tipCur[i]]);
					game.tipIcon[i].bitmapData =bitmapdata;
					}
				game.tipPre[i] = game.tipCur[i];
			}
		};
	game.reDrawScore=function(){
		var tnum = 10;
		var i;
		for (i = 0; i < UI_SCORE_LEN ; i++) {
			var num = Math.floor(game.score%tnum/(tnum/10));
			tnum = 10* tnum;
			game.scoreCur[i] = num;
			if(game.scoreCur[i]!=game.scorePre[i]){
				var bitmapdata = new LBitmapData(res["n_"+num]);
				game.scoreIcon[UI_SCORE_LEN-i-1].bitmapData=bitmapdata;
			}
			game.scorePre[i] = game.scoreCur[i];
		}
	};
	
	game.reDrawCtrSp = function(){
		for(var y = 0; y < SP_LEN; y++){
			var curid = game.spCur[y];
			if(curid != game.spPre[y]){
				if(curid == 0|| curid == 8){ //draw invisible square
						var bitmapdata= new LBitmapData();
						game.spIcon[i].bitmapData = bitmapdata;
						}
					else
						{
							var bitmapdata= new LBitmapData(res[("i_"+curid)]);
							game.spIcon[y].bitmapData = bitmapdata;
						} 
				}
			game.spPre[y] = game.spCur[y];
			}
		}
	
	game.reDraw=function(){
		//draw control icons ??
		
		
		//draw icons
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				var curid = game.dataCur[x][y]
				if(curid!=game.dataPre[x][y]){ //double buffering draw icon
					if(curid == 0|| curid == 8){ //draw invisible square
						var bitmapdata= new LBitmapData();
						game.dataIcon[x][y].bitmapData = bitmapdata;
						}
					else
						{
							var txt = res[("i_"+curid)];
							var bitmapdata= new LBitmapData(txt);
							game.dataIcon[x][y].bitmapData = bitmapdata;
						} 
				}
				game.dataPre[x][y]=game.dataCur[x][y]; //update draw buff data
			}
		}
	};
	
	game.dataIconFly=function(){
		var tTimer=0;
		game.buff="waite";
		TIMER(100,20,function(){
			for (var i = 0; i < SP_W_N; i++) {
				for (var j = 0; j < 6; j++) {
					game.dataIcon[i][j].y+=RANDOM(1,10);
					game.dataIcon[i][j].rotate+=RANDOM(2,30);
					game.dataIcon[i][j].alpha-=0.049;
					if(i<3){game.dataIcon[i][j].x-=RANDOM(5,15);}
					else{game.dataIcon[i][j].x+=RANDOM(5,15);;}
					}
				}
			});
		TIMER(3000,1,function(){
			for (var i = 0; i < SP_W_N; i++) {
				for (var j = 0; j < 6; j++) {
					game.dataIcon[i][j].x = SP_W*i;
					game.dataIcon[i][j].y = SP_H*(SP_H_N-j-1);
					game.dataCur[i][j] = 0;
					game.dataIcon[i][j].rotate=0;
					game.dataIcon[i][j].alpha=1;
				}
			}
			game.reDraw();
			game.buff = "down";
			});
		};

		
		game.BadEreaClear = function(){
			for (var x = 0; x < SP_W_N; x++) {
				for(var y=0;y < SP_H_N;y++){
					if(game.dataCur[x][y]==8){
						game.dataCur[x][y]=0;
						}
				}
			}
			}
		game.BadEreaAdd = function(){
			for(var i = 0; i < game.badEreaCount; i++){
				if(game.badErea[i].showTimes > 0){
					var x = Math.round((game.badErea[i].x - UI_SP_X)/SP_W);
					var y = SP_H_N - 1 - Math.round((game.badErea[i].y - UI_SP_Y)/SP_H);
					trace("badErea x:"+x+" y"+y);
					for (var n = 0; n < game.badErea[i].sizeX; n++) {
						for(var m = 0;m < game.badErea[i].sizeY; m++){
						if(x+n>=0&&x+n<SP_W_N&&y-m>=0&&y-m<SP_H_N){
							game.dataCur[x+n][y-m] = 8;
							}
						}
					}
					}
				}
			}
		game.BadEreaDestory = function(){
			for(var i = 0; i < game.badEreaCount; i++){
			game.badErea[i].showTimes = 0;
			}
			game.BadEreaDrawPath();
		}
		game.BadEreaTimesSub = function(){
			for(var i = 0; i < game.badEreaCount; i++){
				if(game.badErea[i].showTimes > 0){
					game.badErea[i].showTimes -= 1;
					}
				}
				game.BadEreaCompute();
			}
		
		game.BadEreaCompute = function(){
			game.BadEreaClear();
			game.BadEreaAdd();
			game.BadEreaDrawPath();
			}
		game.BadEreaDrawBoom = function(_x,_y,_w,_h)
		{
			if(typeof(game.BadEreaDrawBoomLock) == "undefined"){
				game.BadEreaDrawBoomLock = false;
				}
			if(game.BadEreaDrawBoomLock){return;}
			game.buff = "waite";
			game.BadEreaDrawBoomLock = true;
			game.badEreaBoomImg.visible = true;
			game.badEreaBoomImg.x = 55;
			game.badEreaBoomImg.y = 300;
			game.badEreaBoomImg.scaleX = 0.4;
			game.badEreaBoomImg.scaleY = 0.4;
			game.badEreaBoomImg.rotate = 0;
			game.badEreaBoomImg2.visible = false;
			
			var t =Math.round(_w - 100)/2;
			if(t<0){t=0;}
			game.badEreaBoomImg2.x = _x+t-10;
			var t =Math.round(_h - 150)/2;
			if(t<0){t=0;}
			game.badEreaBoomImg2.y = _y+t-10;
			game.badEreaBoom_x = _x;
			game.badEreaBoom_y = _y;
			game.badEreaBoom_w = _w;
			game.badEreaBoom_h = _h;
			
			LTweenLite.to(game.badEreaBoomImg,2,{x:_x,y:_y,scaleX:1,scaleY:1,delay:1,rotate:3600,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
				game.badEreaBoomImg.visible = false;
				game.badEreaBoomImg2.visible = true;
				TIMER(500,1,function(){
					game.badEreaBoomImg2.visible = false;
					game.BadEreaDrawBoomLock = false;
					game.boom(game.badEreaBoom_x,game.badEreaBoom_y,game.badEreaBoom_w,game.badEreaBoom_h);
					game.buff = "spDown";
					}
				);
				
				}})
			
			
		}
		
		game.BadEreaDrawPath = function(){
				for(var i = 0; i < game.badEreaCount; i++){
					if(game.badErea[i].showTimes<1){
							game.badEreaCanvas[i].graphics.clear();
							}
					if(game.badErea[i].showTimes>0&&!game.badErea[i].bDrawed){
						game.badErea[i].bDrawed = true;
						game.badEreaPathCur = game.badErea[i].drawPath
						var g = game.badEreaCanvas[i].graphics;
						g.clear();
						g.drawRect(2,"#000000",[0,0,UI_GAME_PIX_W,UI_GAME_PIX_H]);

						g.lineStyle = "#000000";
						g.beginBitmapFill(game.mogekoData);
						g.beginPath();
						var path = game.badErea[i].drawPath;

						g.drawVertices(2,"#000000",path);
						//g.stroke();
						
						trace("game.BadEreaDrawPath");
						}
						
				}
			}
		game.boom=function(_x,_y,_w,_h){
			for(var i = 0; i < game.badEreaCount; i++){
				if(game.badErea[i].showTimes == 0){
					game.badErea[i].x = _x;
					game.badErea[i].y = _y;
					game.badErea[i].sizeX = Math.ceil(_w/SP_W);
					game.badErea[i].sizeY = Math.ceil(_h/SP_H);
					game.badErea[i].showTimes = RANDOM(10,50);
					game.badErea[i].bDrawed = false;
					//compute random path
					var t = game.badErea[i].drawPath;
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
					while(curX<limit){
						curY = top + RANDOM(-10,10);
						curX += RANDOM(1,10);
						game.badErea[i].drawPath.push([curX,curY]);
						}
					limit = bottom;
					while(curY<limit){
						curY +=RANDOM(1,10);
						curX = right + RANDOM(-10,10);
						game.badErea[i].drawPath.push([curX,curY]);
						}
					limit = left;
					while(curX>limit){
						curY = bottom + RANDOM(-10,10);
						curX -=RANDOM(1,10);
						game.badErea[i].drawPath.push([curX,curY]);
						}
					limit = top+10;
					while(curY>limit){
						curY -=RANDOM(1,10);
						curX = left + RANDOM(1,10);
						game.badErea[i].drawPath.push([curX,curY]);
						}
					
					game.BadEreaCompute();
					return;
					}
				}
		};
		
		game.laser=function(){
			//trace("lasering:"+game.square);
			game.buff = "showYSM";
			var num = game.square;
			for (var x = 0; x < SP_W_N; x++) {
				for(var y=0;y < SP_H_N;y++){
				if(game.dataCur[x][y]==num){
					game.dataCur[x][y]=7;
					game.buff = "waite";
					var endx = UI_SP_X + x*SP_W+SP_W/2;
					var endy = UI_SP_Y + (SP_H_N-1-y)*SP_H+SP_H/2;
					game.reDraw();
					game.event_laser(380,280,endx,endy);
					TIMER(1100,1,function(){
						game.buff = "laser";
						});
					return;
					}
				}
			}
			}
		
		game.getRaffleSameIconCountMax = function(){
			var countAry = [];
			for(var i = 0; i < game.spPre.length;i++){
				var cur = game.spPre[i];
				var curCount = 0;
				for(var j = i; j < game.spPre.length;j++){
					if(cur == game.spPre[j]){
						curCount ++;
						}
					}
				countAry.push(curCount);
				}
			 var largeNum = 0;
			 var largeIdx = 0;
			for(var i = 0; i < countAry.length;i++){
				if(countAry[i]>largeNum){
					largeNum = countAry[i];
					largeIdx = i;
					}
			}
			return {count:largeNum,idx:largeIdx};
			}
		
		game.getRaffleSpecialIconCount = function(_icon){
			var count = 0;
				for(var i in game.spPre){
					if(game.spPre[i]==_icon){
						count++;
						}
					}
			return count;
			}
		game.raffleCompute = function(){
			//计算御神木数量
			var info = game.getRaffleSameIconCountMax();
				var bNext = true;
				var ysmCount = game.getRaffleSpecialIconCount(7);
				var blackCount = game.getRaffleSpecialIconCount(1);
					if(ysmCount==3){
						//game.game.dataIconFly();
						trace("启用超级炸弹");
						bNext = false;
					}
					if(ysmCount==2){
						//g_bWTF=true;
						trace("启用保护方块");
						bNext = false;
					}
					if(ysmCount==1){
						
						if(blackCount = 2&&bNext){
							//game.SP_LEN = 6;
							trace("下落方块长度改变");
							bNext = false;
							}
						if(blackCount = 1&&bNext){
							//game.SP_LEN = 5;
							trace("下落方块长度改变5");
							bNext = false;
							}
						if(info.count>=2&&bNext){
							//game.SP_LEN = 1;
							trace("下落方块长度改变1");
							bNext = false;
							}
						if(info.count<2&&bNext){
							//game.SP_LEN = RANDOM(2,5);
							trace("下落方块长度改变2，5");
							bNext = false;
							}
						}
						
				//计算黑色方块数量
				if(blackCount>=3&&bNext){
					game.BadEreaDrawBoom
					//game.BadEreaDrawBoom(UI_SP_X,UI_SP_Y+30*7,90,90);
					bNext = false;
					trace("炸毁区域");
				}
				if(blackCount==2&&bNext){
					//game.spSpeed += 5;
					trace("下落速度增加");
					bNext = false;
					}
				if(blackCount==1&&info.count<2&&bNext){
					if(game.score>500){
					//	game.score -= 500;
						}
					trace("扣500");
					bNext = false;
					}

				//计算普通数量
				if(blackCount==0&&info.count==3&&bNext){
					game.score += 2000;
					bNext = false;
					trace("加2000");
				}
				if(blackCount==0&&info.count==2&&bNext){
					//game.score += 500;
					trace("加500");
					bNext = false;
				}
				if(blackCount==0&&info.count==1&&bNext){
				trace("谢谢惠顾");
				bNext = false;
				}
				

				if(bNext){
					game.buff = "spNew";
					}
				game.raffleLock = false;
				
			
			}
		
		game.raffle = function(){
			if(typeof(game.raffleLock)== "undefined"){
				game.raffleLock = false;
				}
			if(game.raffleLock||game.buff!="spDown"){return;}
			game.raffleLock = true;
			game.buff = "raffle";
			TIMER(100,10,function(){
				for(var i in game.spPre){
					game.spPre[i] = RANDOM(1,9);
					}
				});
			TIMER(1200,1,game.raffleCompute);
		}
		
		game.keyTriF=function(key){
			//trace("key press:"+key);
			switch (key) {
				case 119:
				game.spChang();
				break;
				case 97:
				game.spLeft();
				break;
				case 100:
				game.spRight();
				break;
				case 115:
				game.spOver();
				break;
				default:
				break;
			}
		};
	
	game.event_laser_draw = function(){
		
		
			game.l.path=[];
			var r = 50;
			var num = game.l.angle
			while(num < 360+game.l.angle){
				var tnum = num;
				if(tnum > 360){
					tnum -=360;
					}
				var a = Math.sin( tnum*Math.PI/180 ) * r;
				var b = Math.cos( tnum*Math.PI/180) * r;
				game.l.path.push([game.l.EX+a,game.l.EY+b]);
				num += 18;
				}
			var g = game.laserCanvas.graphics;
			g.clear();
			//g.fillStyle = "rgba(182,243,230,0)";
			
			g.beginPath();
			
			g.moveTo(game.l.EX,game.l.EY);	
			for(var i = 0;i < game.l.path.length-1;i+=2){
				g.lineTo(game.l.path[i][0],game.l.path[i][1]);
				g.lineTo(game.l.path[i+1][0],game.l.path[i+1][1]);
				g.lineTo(game.l.EX,game.l.EY);
				}
			g.closePath();
			g.fillStyle('rgba(171,239,254,0.5)');
			//g.stroke();
			g.fill();
			
			g.add(function(ctx){
			ctx.beginPath();
			
			//171,239,254
			//82,231,235
			ctx.strokeStyle="rgb(171,239,254)";
			ctx.lineWidth=4;
			ctx.moveTo(game.l.SX+game.l.r,game.l.SY+game.l.r);
			ctx.lineTo(game.l.EX-10+game.l.r2,game.l.EY-10+game.l.r2);
			ctx.stroke();
			
			
				
			var radgrad1 = ctx.createRadialGradient(game.l.SX+game.l.r,game.l.SY+game.l.r,5,game.l.SX+game.l.r,game.l.SY+game.l.r,game.l.r+10);
      radgrad1.addColorStop(0, '#52E7EB');
      radgrad1.addColorStop(game.l.coreScal, '#BBFFFF');
      radgrad1.addColorStop(1, 'rgba(171,239,254,0)');
			ctx.fillStyle = radgrad1;
			ctx.fillRect(game.l.SX-game.l.r,game.l.SY-game.l.r,game.l.SX+game.l.r,game.l.SY+game.l.r);
			
			var radgrad2 = ctx.createRadialGradient(game.l.EX-10+game.l.r2,game.l.EY-10+game.l.r2,5,game.l.EX-10+game.l.r2,game.l.EY-10+game.l.r2,15);
      radgrad2.addColorStop(0, '#52E7EB');
      radgrad2.addColorStop(game.l.coreSca2, '#BBFFFF');
      radgrad2.addColorStop(1, 'rgba(171,239,254,0)');
			ctx.fillStyle = radgrad2;
			ctx.fillRect(game.l.EX-10-game.l.r2,game.l.EY-10-game.l.r2,game.l.EX-10+game.l.r2,game.l.EY-10+game.l.r2);
			
			});
		
		}
	
	
	
	game.event_laser = function(_x,_y,_endx,_endy) //need 1500
	{
		if(typeof(game.b_laser) == "undefined"){
			game.b_laser = true;
			}
		if(!game.b_laser){return;}
		game.b_laser = false;
		game.l = {};
		game.l.SX = _x;
		game.l.SY= _y;
		game.l.EX = _endx;
		game.l.EY = _endy;
		game.l.r = 40;
		game.l.r2 = 10;
		game.l.coreScal = 0.6;
		game.l.coreSca2 = 0.1;
		game.l.linW = 6;
		game.l.linAlpha = 0.6;
		game.l.angle = 0;
		game.l.path = [];
		game.laserCanvas = new LSprite();
		game.effectCanvas.addChild(game.laserCanvas);
		var g = game.laserCanvas.graphics;
		g.clear();
		game.event_laser_draw();
		
		
		
		TIMER(100,10,function(){
			game.l.coreScal -=0.025;
			game.l.coreSca2 += 0.05;
			game.l.angle += 17;
			if(game.l.linW > 2){
				game.l.linW -=1
				game.l.linAlpha +=0.1;
				} 
			game.event_laser_draw();
			});
		
		TIMER(1100,1,function(){
			var g = game.laserCanvas.graphics;
			g.clear();
			game.effectCanvas.removeChild(game.laserCanvas);
			game.b_laser = true;
			});
	}
	
	
	
	game.drawHeart = function(_x,_y,_w,_fillColor,_parent)
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
	
	game._effect_mutiHeart_Init_ = function(i){
		game.mutiData[i].speed =  RANDOM(2,5);
		game.mutiData[i].x = RANDOM(-10,11);
		game.mutiData[i].speedX = RANDOM(-5,6);;
		game.mutiData[i].y = 0;
		game.mutiData[i].w = 6;
		game.mutiData[i].alpha = 1;
		game.mutiData[i].color = "rgba(246,0,0,"+ game.mutiData[i].alpha +")";
		}
	game.effect_mutiHeart_On = function(_x,_y,_parent){
		if(typeof(game.b_mutiHeart) == "undefined"){
			game.b_mutiHeart = false;
			game.mutiSp = new LSprite();
			TIMER(150,MAX_VALUE,function(){
				if(!game.b_mutiHeart){return;}
				game.mutiSp.graphics.clear();
				for(var i = 0; i<game.mutiCount; i++){
					game.mutiData[i].speedX += RANDOM(-2,3);;
					game.mutiData[i].x += game.mutiData[i].speedX;
					game.mutiData[i].y -= 3 * game.mutiData[i].speed;
					game.mutiData[i].w += 2;
					game.mutiData[i].alpha -= 0.02 * game.mutiData[i].speed;
					game.mutiData[i].color = "rgba(246,0,0,"+ game.mutiData[i].alpha +")";
					
					var bInit=false;
					if(game.mutiData[i].x>400||game.mutiData[i].x<-400){bInit=true;}
					if(game.mutiData[i].y<-600){bInit=true;}
					if(game.mutiData[i].w>200){bInit=true;}
					if(game.mutiData[i].alpha<0.1){bInit=true;}
					if(bInit){
						game._effect_mutiHeart_Init_(i);
						}
					game.drawHeart(game.mutiData[i].x,game.mutiData[i].y,game.mutiData[i].w,game.mutiData[i].color,game.mutiSp);
					}
				});
			}
		game.mutiSp.x = _x;
		game.mutiSp.y = _y;
		_parent.addChild(game.mutiSp);
		game.mutiHeartCanvas = new LSprite();
		game.mutiHeartCanvas.x = _x;
		game.mutiHeartCanvas.y = _y;
		_parent.addChild(game.mutiHeartCanvas);
		game.mutiCount = 10;
		game.mutiData = [];
		for(var i = 0; i<game.mutiCount; i++){
			game.mutiData[i] = {};
			game._effect_mutiHeart_Init_(i);
			}
		game.b_mutiHeart = true;
		}
	game.effect_mutiHeart_Off = function(){
		if(typeof(game.b_mutiHeart) == "undefined"){
			return;
			}
		game.b_mutiHeart = false;
		}
	
	
	game.event_raffle = function(_x,_y,_parent,_width,_borderColor,_fillColor)
	{
		var _height=Math.floor(_width/6*5);
		
	}
	
	game.event_fadeDark = function(){	
		if(typeof(game.b_fadeDark) == "undefined"){
			game.b_fadeDark = true;
			}
		if(!game.b_fadeDark){return;}
		game.fadeDarkCanvas = new LSprite();
		game.effectCanvas.addChild(game.fadeDarkCanvas);
		game.fadeDarkCanvas.alpha = 0.05;
		var g = game.fadeDarkCanvas.graphics;
		g.clear();
		g.drawRect(1,"#000000",[0,0,UI_GAME_PIX_W,UI_GAME_PIX_H],true,"#000000");
		game.b_fadeDark = false;
		TIMER(100,10,function(){
			game.fadeDarkCanvas.alpha += 0.1;
			});
		TIMER(2000,1,function(){
			game.effectCanvas.removeChild(game.fadeDarkCanvas);
			game.b_fadeDark = true;
			});
		trace("event_fadeDark");
		};
	
	game.event_darkAndLight = function(){
		if(typeof(game.b_darkAndLight) == "undefined"){
			game.b_darkAndLight = true;
			}
		if(!game.b_darkAndLight){return;}
		game.darkAndLightCanvas = new LSprite();
		game.effectCanvas.addChild(game.darkAndLightCanvas);	
		game.tempSpCanvas = new LSprite();
		game.tempSpCanvas.x = UI_SP_X;
		game.tempSpCanvas.y = UI_SP_Y;
		game.darkAndLightCanvas.addChild(game.tempSpCanvas);
		game.tempSpCanvas.addChild(game.spCtrlCanvas);
		var g = game.darkAndLightCanvas.graphics;
		g.clear();
		g.drawRect(1,"#000000",[0,0,UI_GAME_PIX_W,UI_GAME_PIX_H],true,"#000000");
		
		game.b_darkAndLight = false;
		TIMER(4000,1,function(){
			game.spCanvas.addChild(game.spCtrlCanvas);
			game.spCanvas.addChild(game.stencilCanvas);
			game.darkAndLightCanvas.removeChild(game.tempSpCanvas);
			game.effectCanvas.removeChild(game.darkAndLightCanvas);
			game.b_darkAndLight = true;
			});
		}
	

	//game logic
	function onup(e){
		LLoadManage.load(
		DATA_RAW,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result)
		{
			res = result;
			backLayer.removeChild(loadingLayer);
			loadingLayer = null;
			
			game.init();

			trace("load over");
		});
	}
			//start func
			function main () {
				LGlobal.setDebug(true);
				backLayer = new LSprite();
				uiLayer = new LSprite();
				gameLayer = new LSprite();
				addChild(backLayer);
				addChild(gameLayer);
				addChild(uiLayer);
				loadingLayer = new LoadingSample3();
				backLayer.addChild(loadingLayer);
				onup();


			//gLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
			//gLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
		}
		//execute code
		LInit(50,"mylegend",UI_GAME_PIX_W,UI_GAME_PIX_H,main);

	
