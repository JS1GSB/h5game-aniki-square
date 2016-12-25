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
	var SP_SPEED = 6;
	var GAME_SPEED = 100; //游戏主循环执行的时间间隔
	var SP_DOWN_SPEED_LOW = 5;
	var SP_DOWN_SPEED_QUICK = 30;
	var ADD_SCORE_VAL = 7;
	
	var SP_MAX_LEN = 6;//随机控制下落方块最大数量
	var SP_MIN_LEN = 1;//随机控制下落方块最小数量
	var SP_LEN = 3;//ui显示下一个下落方块的数量『暂时设为固定的3』
	
	var UI_SP_X = 140;
	var UI_SP_Y = 10;
	var UI_SCORE_LEN = 5;
	var UI_SCORE_SPLITE = 40;
	
	var g_bWTF =false;//秘籍？？
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
		var sp = new LSprite();
		var txtField = new LTextField();
		txtField.x = _x+5;
		txtField.y = _y+3;
		txtField.text = _txt;
		var len = txtField.getWidth();
		sp.graphics.drawRoundRect(2,"#000000",[_x,_y,len+10,25,5],true,"#666666");
		sp.addEventListener(LMouseEvent.MOUSE_UP,_f);
		sp.alpha = 0.6;
		txtField.alpha = 2;
		_parent.addChild(sp);
		sp.addChild(txtField);
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
		TxtDlg.show =function(_x,_y,_txt,_ref){
			if(!TxtDlg._bInit){
				TxtDlg._init();
			}
			TxtDlg.sp.x = _x;
			TxtDlg.sp.y = _y;
			TxtDlg.ref = _ref;
			var t = new LTextField();
			t.text = _txt;
			var len = t.getWidth();
			var g = TxtDlg.sp.graphics;
			g.clear();
			g.drawRoundRect(2,"#000000",[0,0,len+20,25,5],true,"#999999");
			g.beginPath();
			g.moveTo(1,20);
			g.lineTo(-10,35);
			g.lineTo(10,24);
			//	g.add(function(ctx){
			//    ctx.beginPath();
			//    ctx.strokeStyle = "#FF0000";
			//    ctx.lineWidth = 2;
			//    ctx.moveTo(10,10);
			//    ctx.bezierCurveTo(130,30,100,10,50,0);
			//    ctx.stroke();
			//	});
			g.stroke();
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
	game.create = function(_x,_y,_parent){
		game.x=_x;
		game.y=_y;
		game.par=_parent;
		game.lineAdd=0;
		game.mainCanvas=new LSprite();
		game.par.addChild(game.mainCanvas);

		game.mogekoCanvas = new LSprite();
		game.mainCanvas.addChild(game.mogekoCanvas);
		game.bkCanvas = new LSprite();
		game.mainCanvas.addChild(game.bkCanvas);

		game.spCanvas = new LSprite();
		game.mainCanvas.addChild(game.spCanvas);

		game.spCanvas = new LSprite();
		game.mainCanvas.addChild(game.spCanvas);
		game.spCanvas.x = game.x;
		game.spCanvas.y = game.y;
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
		
		game.uiCanvas = new LSprite();
		game.mainCanvas.addChild(game.uiCanvas);
		game.scoreCur = [];
		game.scorePre = [];
		game.scoreIcon = [];
		for (var i = 0; i < UI_SCORE_LEN; i++) {
			game.scoreIcon[i] = new LBitmap();
			var bitmapdata = new LBitmapData(res["n_"+0]);
			game.scoreIcon[i].bitmapData=bitmapdata;
			game.scoreIcon[i].x = UI_SCORE_SPLITE * i;
			game.scoreIcon[i].y = 0;
			game.uiCanvas.addChild(game.scoreIcon[i]);
		}
		
		game.tipCur = [];
		game.tipPre = [];
		game.tipIcon = [];
		for (i = 0; i < SP_LEN; i++) {
			game.tipIcon[i] = new LBitmap();
			game.tipIcon[i].x = 400;
			game.tipIcon[i].y = 20 + SP_H*(SP_LEN-1-i);
			game.uiCanvas.addChild(game.tipIcon[i]);
		}
		//game.VanOpaiBtn = new SButton(120,320,"test",game.uiCanvas,function(){});
//		game.VanJJBtn = new SButton(120,320,"",game.uiCanvas,function(){});
//		game.slOpaiBtn = new SButton(120,320,"",game.uiCanvas,function(){});
//		game.slJJBtn = new SButton(120,320,"",game.uiCanvas,function(){});
		game.effectCanvas = new LSprite();
		game.mainCanvas.addChild(game.effectCanvas);
		
		//listenner
		LGlobal.stage.addEventListener(LKeyboardEvent.KEY_PRESS,
		function(e){
			game.keyTriF(e.keyCode)
			}
		);
		
		//game loop
		game.timer=TIMER(GAME_SPEED,MAX_VALUE,function(){
			//trace("game.timer");
				game.reDrawCtrSp();
				game.reDrawScore();
				game.reDrawTip();
				if(game.buff=="compute"){game.compute();}
				switch (game.buff) {
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
					game.spDown();
					game.reDraw();
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
			game.create(UI_SP_X,UI_SP_Y,gameLayer);
			game.create = true;
		}

		for (var n = 0; n < SP_W_N; n++) {
			for (var m = 0; m < SP_H_N; m++) {
				game.dataCur[n][m]=0;
				game.dataPre[n][m]=0;
				game.dataTemp[n][m]=0;
			}
		}
		for (var i = 0; i < SP_LEN; i++) {
			game.tipCur[i] = RANDOM(1,7);
			game.tipPre[i] = RANDOM(1,7);
			game.scoreCur[i] = 0;
			game.scorePre[i] = 0;
		}
		for (var i = 0; i < SP_MAX_LEN; i++) {
			game.spCur[i] = game.tipCur[i];
			game.spPre[i] = 0;
		}
		game.spCurLen = 3;
		game.spShowX = SP_W_N * SP_NEW_X;
		game.spShowY = 0;
		game.score=0;
		game.lineAdd=0;//combo 
		game.spSwapIdx = 0; //swap square idx swap idx square and idx+1 square
		game.spSpeed = SP_DOWN_SPEED_LOW;
		game.spSpeedLock = false; //速度更改锁
		game.buff="spNew";
	};
	game.over=function(){
		SOUND.play(res["s_billy_thankyou"]);
		game.buff="waite";
	};

	game.compute=function(){
		game.buff="spNew";
		tnum=game.dataCur[game.spX][game.spY-1];
		if(game.spCur[0]==7&&game.spY>0&&tnum!=0){//special square compute
			for (x = 0; x < SP_W_N; x++) {
				for(y=0;y < SP_H_N;y++){
					if(game.dataCur[x][y]==tnum){
						game.dataCur[x][y]=7;
						game.buff="showYSM";
						}
				}
			}
		}
		for (x = 0; x < SP_W_N; x++) {
			for(y=0;y < SP_H_N;y++){
				if(game.dataCur[x][y]!=0){
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
		for (var x1 = 0; x1 < SP_W_N; x1++) {
			for (var y1 = 0; y1 < SP_H_N-1; y1++) {
				if(game.dataCur[x1][y1]==0&&game.dataCur[x1][y1+1]!=0){
					game.dataCur[x1][SP_H_N]=0;
					for (var z1 = 0; z1 < SP_H_N-y1; z1++) {
						game.dataCur[x1][y1+z1]=game.dataCur[x1][y1+z1+1];
					}
					game.buff="down";
				};
			}
		}

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
		
		if(game.dataCur[SP_NEW_X][SP_H_N - SP_LEN]!=0&&g_bWTF){ //特殊事件_保护秘籍
			game.spCur[0]=7;
			game.spCur[1]=7;
			game.spCur[2]=7;
		}
		if(game.dataCur[SP_NEW_X][SP_H_N - SP_LEN]!=0){ //提醒死亡事件

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
			game.spSpeedLock = false;
			game.spSpeed = SP_DOWN_SPEED_LOW;
			if(game.spY==SP_H_N){
				//game.buff="gameOver";
				game.dataIconFly();		
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
		for(var i = 0; i < 3; i++){
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
			})
		};

		game.boom=function(){
	
		};
		game.keyTriF=function(key){
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
			var bitmapdata= new LBitmapData(res["bk_img_ray"]);
			var bitmap = new LBitmap(bitmapdata);
			gameLayer.addChild(bitmap);
			
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

//				TxtDlg.show(100,100,"这是一个测试",function(){
//				trace("test");
//			});


			//var btnB = new SButton(220,180,"B",gLayer,function(){});

			//gLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
			//gLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
		}
		//execute code
		LInit(50,"mylegend",500,350,main);

	
