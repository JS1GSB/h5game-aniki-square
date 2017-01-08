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
	,{name:"i_8",path:"./img/i_chijiang.png"}
	,{name:"p_shilei",path:"./img/p_shilei.png"}
	,{name:"p_shilei_sad",path:"./img/p_shilei_sad.png"}
	,{name:"p_van",path:"./img/p_van.png"}
	,{name:"ef_boom",path:"./img/ef_boom.png"}
	,{name:"ef_yushenmu",path:"./img/ef_yushenmu.png"}
	);
}
//global values set
{
	var MAX_VALUE = 210000000;

	var g_showType = "full";
	var g_needChangeCanvas = true;
	var loader;
	var loadingLayer;
	var res = {};
	var soundRes;
	var tempButtom;

	var SP_W = 30;
	var SP_H = 30;
	var SP_NEW_X = 3;
	var SP_W_N = 6;
	var SP_H_N = 10;
	var GAME_SPEED = 100; //游戏主循环执行的时间间隔
	var SP_DOWN_SPEED_LOW = 5;
	var SP_DOWN_SPEED_QUICK = 30;
	var ADD_SCORE_VAL = 1;
	
	var SP_MAX_LEN = 6;//控制下落方块最大数量
	var g_spLen = 3;//ui显示下一个下落方块的数量『暂时设为固定的3』
	var g_spRandomMax = 4; //随机方块数量
	var g_endState = 0; //0普通 1 bad end 2 good end
	var g_bWTF =false;//秘籍？？
	
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
	
	
	var GENG = [
	{num:7,text:"真理阿虚送你一次抽奖机会"}
	,{num:9,text:"笨蛋⑨送你一次抽奖机会"}
	,{num:59,text:"无敌坦克送你一次抽奖机会"}
	,{num:74,text:"切嗣papa送你一次抽奖机会"}
	,{num:233,text:"吐槽群众送你一次抽奖机会"}
	,{num:384,text:"完美执事送你一次抽奖机会"}
	,{num:404,text:"故障网站送你一次抽奖机会"}
	,{num:450,text:"霸道刀哥送你一次抽奖机会"}
	,{num:495,text:"抱头二妹送你一次抽奖机会"}
	,{num:520,text:"握手爱抖送你一次抽奖机会"}
	,{num:614,text:"傲娇萝莉送你一次抽奖机会"}
	,{num:666,text:"觉厉群众送你一次抽奖机会"}
	,{num:801,text:"腐坏群众送你一次抽奖机会"}
	,{num:894,text:"迷路蜗牛送你一次抽奖机会"}
	,{num:993,text:"悲伤面罩男送你一次抽奖机会"}
	,{num:998,text:"广告促销送你一次抽奖机会"}
	,{num:1024,text:"福利社区送你一次抽奖机会"}
	,{num:1096,text:"凉宫学姐送你一次抽奖机会"}
	,{num:3000,text:"金发大小姐送你一次抽奖机会"}
	];
	
	
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

	XButton = function(_x,_y,_txt,_parent,_f)
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
		button01.x = _x;
		button01.y = _y;
		
		button01.addEventListener(LMouseEvent.MOUSE_UP,_f);
		_parent.addChild(button01);
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
					TxtDlg.txt.text = TxtDlg.endTxt + TxtDlg.lastStrAry[TxtDlg.lastStridx];
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
			TxtDlg._bInit = true;
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
			if(_type == "left"){
				TxtDlg.sp.x = UI_VAN_X + 120;
				TxtDlg.sp.y = UI_VAN_Y;
			}
			if(_type == "right"){
				TxtDlg.sp.x = UI_SHILEI_X - len;
				TxtDlg.sp.y = UI_SHILEI_Y;
			}
			
			var g = TxtDlg.sp.graphics;
			g.drawRoundRect(2,"#000000",[0,0,len+20,25,5],true,"#999999");
			g.beginPath();
			if(_type == "left"){
				g.moveTo(1,20);
				g.lineTo(-10,35);
				g.lineTo(10,24);
				g.stroke();
				}
			if(_type == "right"){
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
			if(!TxtDlg._bInit){
				TxtDlg._init();
			}
			TxtDlg.ref = _ref;
			TxtDlg.data = _txtAry;
			TxtDlg.curTxtIdx = -1;
			TxtDlg.endTxtIdx = _txtAry.length - 1;
			
			TxtDlg._showNext();
		};

		//over

}




	var game={};
	buff="waite";
	bCreate = false;
	create = function(){
		par=gameLayer;
		lineAdd=0;
		mainCanvas=new LSprite();
		par.addChild(mainCanvas);

		
		bkCanvas = new LSprite();
		mainCanvas.addChild(bkCanvas);
		mogekoData =  new LBitmapData(res["bk_img_mogeko"]);
		bkBmpData = new LBitmapData(res["bk_img_ray"]);
		var bmp = new LBitmap(bkBmpData);
		bkCanvas.addChild(bmp);
		
		spBkCanvas = new LSprite();
		spBkCanvas.x = UI_SP_X;
		spBkCanvas.y = UI_SP_Y;d
		mainCanvas.addChild(spBkCanvas);
		var x=15,y=20;
		var g = spBkCanvas.graphics;
		g.drawRoundRect(2,"#000000",[0,0,180,300,10],true,"#F6A19A");
		while(y < 280 ){
			drawHeart(x,y,14,"#F6CEB4",spBkCanvas);
			x += 25;
			if(x > 180){
				x = 15;
				y += 40;
				}
			}
		x = 26 , y = 5
		while(y < 290 ){
			drawHeart(x,y,8,"#F6CEB4",spBkCanvas);
			x += 25;
			if(x > 160){
				x = 26;
				y += 40;
				}
			} 
		spBkCanvas.cacheAsBitmap(true);
		
		spCanvas = new LSprite();
		mainCanvas.addChild(spCanvas);
		
		

		spCanvas = new LSprite();
		mainCanvas.addChild(spCanvas);
		spCanvas.x = UI_SP_X;
		spCanvas.y = UI_SP_Y;
		dataIcon=[];
		for (var i = 0; i < SP_W_N; i++) {
			dataIcon[i]=[];
			for (var j = 0; j < SP_H_N; j++) {
				dataIcon[i][j] = new LBitmap();
				dataIcon[i][j].x = SP_W*i;
				dataIcon[i][j].y = SP_H*(SP_H_N-j-1);
				spCanvas.addChild(dataIcon[i][j]);
			}
		}
		dataCur=[];
		dataPre=[];	//double buffing for draw
		dataTemp=[]; //compute buff
		for (var i = 0; i < SP_W_N; i++) {
			dataCur[i]=[];
			dataPre[i]=[];
			dataTemp[i]=[];
		}
		
		
		
		spCtrlCanvas = new LSprite();
		spCanvas.addChild(spCtrlCanvas);
		spCur = [];
		spPre = [];
		spIcon = [];
		for (i = 0; i < SP_MAX_LEN; i++) {
			spCur[i] = 0;
			spPre[i] = 0;
			spIcon[i] = new LBitmap();
			spIcon[i].x = 0;
			spIcon[i].y = 0 - (i+1) * SP_H;
			spCtrlCanvas.addChild(spIcon[i]);
		}
		spX = 0;
		spY = 0;
		spIconX = 0;
		spIconY = 0;
		
		stencilCanvas = new LSprite();
		var tx = UI_SP_X+SP_W*SP_W_N;
		stencilCanvas.graphics.clear();
		stencilCanvas.graphics.drawRect(2,"#000000",[UI_SP_X,0,SP_W*SP_W_N,UI_SP_Y]);
		stencilCanvas.graphics.beginBitmapFill(bkBmpData);
		
		stencilCanvas.x = 0 - UI_SP_X;
		stencilCanvas.y = 0 - UI_SP_Y;
		spCanvas.addChild(stencilCanvas);
		
		
		mogekoCanvas = new LSprite();
		mainCanvas.addChild(mogekoCanvas);
		badEreaCount = 10;
		badEreaCanvas = [];
		for(var i = 0; i<badEreaCount; i++){
			badEreaCanvas[i] = new LSprite();
			mogekoCanvas.addChild(badEreaCanvas[i]);
		}
		
		
		uiCanvas = new LSprite();
		mainCanvas.addChild(uiCanvas);
		scoreCur = [];
		scorePre = [];
		scoreIcon = [];
		for (var i = 0; i < UI_SCORE_LEN; i++) {
			scoreIcon[i] = new LBitmap();
			var bitmapdata = new LBitmapData(res["n_"+0]);
			scoreIcon[i].bitmapData=bitmapdata;
			scoreIcon[i].x = 10+ UI_SCORE_SPLITE * i;
			scoreIcon[i].y = 0;
			uiCanvas.addChild(scoreIcon[i]);
		}
		
		tipCur = [];
		tipPre = [];
		tipIcon = [];
		for (i = 0; i < SP_MAX_LEN; i++) {
			tipIcon[i] = new LBitmap();
			tipIcon[i].x = 400;
			tipIcon[i].y = 20 + SP_H*i;
			uiCanvas.addChild(tipIcon[i]);
		}
		
		
		endBkCanvas = new LSprite();
		mainCanvas.addChild(endBkCanvas);
		
		personCanvas = new LSprite();
		mainCanvas.addChild(personCanvas);
		var tdata = new LBitmapData(res["p_van"]);
		bkVan = new LBitmap(tdata);
		bkVan.x = UI_VAN_X;
		bkVan.y = UI_VAN_Y;
		personCanvas.addChild(bkVan);
		tdata = new LBitmapData(res["p_shilei"]);
		bkShilei = new LBitmap(tdata);
		bkShilei.x = UI_SHILEI_X;
		bkShilei.y = UI_SHILEI_Y;
		personCanvas.addChild(bkShilei);
		
//		VanOpaiBtn = new SButton(50,110,"good end",uiCanvas,function(){
//			event_good_end();
//			//event_bad_end();
//			
//			});
		
		//slOpaiBtn = new SButton(100,200,"tesddt",uiCanvas,function(){});

		controlCanvas = new LSprite();
		mainCanvas.addChild(controlCanvas);
		controlCanvas.alpha = 0.5;
		opreatBtnL = new XButton(10,230," ← ",controlCanvas,function(){
			(controlF[0])();
			});
		opreatBtnR = new XButton(100,230," → ",controlCanvas,function(){
			(controlF[1])();
			});
		opreatBtnUp = new XButton(350,230," ↑ ",controlCanvas,function(){
			(controlF[2])();
			});
		opreatBtnDown = new XButton(440,230," ↓ ",controlCanvas,function(){
			(controlF[3])();
			});
		
		
		effectCanvas = new LSprite();
		mainCanvas.addChild(effectCanvas);
		
		var boomData = new LBitmapData(res["ef_yushenmu"]);
		badEreaBoomImg = new LBitmap(boomData);
		badEreaBoomImg.visible = false;
		effectCanvas.addChild(badEreaBoomImg);
		boomData = new LBitmapData(res["ef_boom"]);
		badEreaBoomImg2 = new LBitmap(boomData);
		badEreaBoomImg2.visible = false;
		
		
		
		effectCanvas.addChild(badEreaBoomImg2);
		
		//listenner
		LGlobal.stage.addEventListener(LKeyboardEvent.KEY_PRESS,
		function(e){
			keyTriF(e.keyCode)
			}
		);
		
		//game loop
		timer=TIMER(GAME_SPEED,MAX_VALUE,function(){
			//trace("timer: "buff);
				//BadEreaCompute();
				reDrawCtrSp();
				reDrawScore();
				checkFrame();
				if(buff=="compute"){compute();}
				switch (buff) {
					case "laser":
					laser();
					break;
					case "gameStar":
					break;
					case "showYSM":
					clearYSM();
					break;
					case "down":
					down();
					reDraw();
					break;
					case "spNew":
					spNew();
					BadEreaTimesSub();
					spDown();
					reDrawTip();
					break;
					case "spDown":
					spDown();
					reDraw();
					break;
					case "gameOver":
					over();
					break;
					default:
					break;
				}
			});
	};
	init=function(){
		if(!bCreate){
			create();
			bCreate = true;
		}
		g_spLen = UI_TIP_LEN;
		
		for (var n = 0; n < SP_W_N; n++) {
			for (var m = 0; m < SP_H_N; m++) {
				dataCur[n][m]=0;
				dataPre[n][m]=0;
				dataTemp[n][m]=0;
				var bitmapdata= new LBitmapData();
				dataIcon[n][m].bitmapData = bitmapdata;
			}
		}
		for (var i = 0; i < SP_MAX_LEN; i++) {
			if(i<g_spLen){
				tipCur[i] = RANDOM(1,g_spRandomMax);
				tipPre[i] = 0;
				}
			else{
				tipCur[i] = 0;
				tipPre[i] = 0;
				}
			var bitmapdata= new LBitmapData();
			tipIcon[i].bitmapData = bitmapdata;
		}
		
		for (var i = 0; i < UI_SCORE_LEN; i++) {
			scoreCur[i] = 0;
			scorePre[i] = 0;
			var bitmapdata= new LBitmapData(res["n_0"]);
			scoreIcon[i].bitmapData = bitmapdata;
		}
		
		for (var i = 0; i < SP_MAX_LEN; i++) {
			if(i<g_spLen){
				spCur[i] = RANDOM(1,g_spRandomMax);
				spPre[i] = 0;
				}
			else{
				spCur[i] = 0;
				spPre[i] = 0;
				}
			var bitmapdata= new LBitmapData();
			spIcon[i].bitmapData = bitmapdata;
		}
		spCurLen = 3;
		spShowX = SP_W_N * SP_NEW_X;
		spShowY = 0;
		score = 0;
		scoreShow = 0;
		lineAdd=0;//combo 
		spSwapIdx = 0; //swap square idx swap idx square and idx+1 square
		spSpeed = 5;
		spSpeedPre = 5;
		spSpeedLock = false; //速度更改锁
		
		//初始化炸毁区域
		badErea = [];
		for(var i = 0; i<badEreaCount; i++){
			badErea[i]={};
			var t = badErea[i];
			t.x = 0;
			t.y = 0;
			t.sizeX = 0;
			t.sizeY = 0;
			t.drawPath = [];
			t.showTimes = 0;
			t.bDrawed = true;
			}
		
		//初始化操作函数
		controlF = [];
		controlF[0] = spLeft;
		controlF[1] = spRight;
		controlF[2] = spChang;
		controlF[3] = spOver;
		

		
		//初始化特殊长度回合
		longSpTimes = 1;
		//给予一次保护方块机会
		g_bWTF = true;
		
		if(LGlobal.os == OS_PC){
					g_showType = "native";
					g_needChangeCanvas = true;
					}
					else{
						g_showType = "full";
						g_needChangeCanvas = true;
						}
		
		buff="waite";
		var txtData = [
		{text:"简单说一下...",type:"right"}
		,{text:"努力玩到高分可以有好结局...",type:"left"}
		,{text:"电脑可以用wsad操控，q键切换全屏",type:"left"}
		,{text:"祝你玩得愉快...",type:"left"}
		];
		TxtDlg.show(txtData,function(){
			buff="spNew";
			});
		
	};
	
	checkFrame = function(){
		if(g_showType == "full"){
			LGlobal.screen(LStage.FULL_SCREEN);
			if(g_needChangeCanvas){
				mainCanvas.addChild(controlCanvas);
				g_needChangeCanvas = false;
				}
			}
			else{
				LGlobal.screen(1);
				}
				if(g_needChangeCanvas){
				mainCanvas.removeChild(controlCanvas);
				g_needChangeCanvas = false;
				}
		}
	
	over=function(){
		buff="waite";
	};

	compute=function(){
		buff="spNew";
		for (var x = 0; x < SP_W_N; x++) {
			for(var y=0;y < SP_H_N;y++){
				if(dataCur[x][y]!=0&&dataCur[x][y]!=8){
					if(y<SP_H_N-2){
						if(dataCur[x][y]==dataCur[x][y+1]&&dataCur[x][y]==dataCur[x][y+2]){
							dataTemp[x][y]=9;
							dataTemp[x][y+1]=9;
							dataTemp[x][y+2]=9;
							buff="showYSM";
						}
					}
					if(y>=2){
						if(dataCur[x][y]==dataCur[x][y-1]&&dataCur[x][y]==dataCur[x][y-2]){
							dataTemp[x][y]=9;
							dataTemp[x][y-1]=9;
							dataTemp[x][y-2]=9;
							buff="showYSM";
						}
					}
					if(x<SP_W_N-2){
						if(dataCur[x][y]==dataCur[x+1][y]&&dataCur[x][y]==dataCur[x+2][y]){
							dataTemp[x][y]=9;
							dataTemp[x+1][y]=9;
							dataTemp[x+2][y]=9;
							buff="showYSM";
						}
					}
					if(y<SP_H_N-2&&x<SP_W_N-2){
						if(dataCur[x][y]==dataCur[x+1][y+1]&&dataCur[x][y]==dataCur[x+2][y+2]){
							dataTemp[x][y]=9;
							dataTemp[x+1][y+1]=9;
							dataTemp[x+2][y+2]=9;
							buff="showYSM";
						}
					}
					if(x>=2&&y<SP_H_N-2){
						if(dataCur[x][y]==dataCur[x-1][y+1]&&dataCur[x-1][y+1]==dataCur[x-2][y+2]){
							dataTemp[x][y]=9;
							dataTemp[x-1][y+1]=9;
							dataTemp[x-2][y+2]=9;
							buff="showYSM";
						}
					}
					if(x>=2&&y>=2){
						if(dataCur[x][y]==dataCur[x-1][y-1]&&dataCur[x-1][y-1]==dataCur[x-2][y-2]){
							dataTemp[x][y]=9;
							dataTemp[x-1][y-1]=9;
							dataTemp[x-2][y-2]=9;
							buff="showYSM";
						}
					}
					if(x<SP_W_N-2&&y>=2){
						if(dataCur[x][y]==dataCur[x+1][y-1]&&dataCur[x+1][y-1]==dataCur[x+2][y-2]){
							dataTemp[x][y]=9;
							dataTemp[x+1][y-1]=9;
							dataTemp[x+2][y-2]=9;
							buff="showYSM";
						}
					}
				}

			}
		}
		
		if(buff =="showYSM"){
			buff = "waite";
			addYSM();
			reDraw();
			}
		
	};
	addYSM=function(){
		var num=0;
		var showX=0;
		var showY=0;
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				if(dataTemp[x][y]==9){
					dataCur[x][y]=7;
					num+=ADD_SCORE_VAL;
					showX=x;
					showY=y;
				}
			}
		}
		lineAdd+=1;
		num=num*lineAdd;
		changeScore(num,240+showX*40,50+(9-showY)*40);
		for(var i in GENG){
			if(GENG[i].num == score){
				buff="waite";
				var txtData = [{text:GENG[i].text,type:"left"}];
				TxtDlg.show(txtData,function(){
					event_raffle();
					});
				return;
				}
			}
		TIMER(500,1,function(){
				buff ="showYSM";
				});
	};
	clearYSM=function(){
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				dataTemp[x][y]=0;
				if(dataCur[x][y]==7){
					dataCur[x][y]=0;
				}
			}
		}
		buff="down";
	};

	down=function(){
		buff="compute";
		var data = dataCur;
		for (var x1 = 0; x1 < SP_W_N; x1++) {
			for (var y1 = 0; y1 < SP_H_N-1; y1++) {
				var curIcon = data[x1][y1];
				var preIcon = data[x1][y1+1];
				if(curIcon==0&&preIcon>0&&preIcon<8){																					 
					for (var z1 = y1; z1 < SP_H_N-1; z1++) {
						data[x1][z1]=data[x1][z1+1];
						buff="down";	
					}
					data[x1][SP_H_N-1]=0;	
				}
			}
		}
	};
	spNew=function(){
		spCur=tipCur.concat();
		for(var y = 0; y < SP_MAX_LEN;y++){
			if(y<g_spLen){
				tipCur[y]=RANDOM(1,g_spRandomMax);
				}
			else{
				tipCur[y] = 0;
				}
			}
		spX=SP_NEW_X;
		spY=SP_H_N;
		spIconX=SP_NEW_X * SP_W;
		spIconX=0;
		lineAdd=0;
		spCtrlCanvas.visible = true;
		spCtrlCanvas.x = SP_NEW_X * SP_W;
		spCtrlCanvas.y = 0;
		
		if(dataCur[SP_NEW_X][SP_H_N-g_spLen-1]!=0&&g_bWTF){ //特殊事件_保护秘籍
			g_bWTF = false; //只能用一次
			for(var i=0; i<g_spLen;i++){
				spCur[i]=7;
				}
		}
		//计算特殊长度回合
		if(longSpTimes>1){
			longSpTimes --;
		}
		else{
			g_spLen=UI_TIP_LEN	;
		}
		
	};
	spAdd=function(){
		for (var i = 0; i < SP_H_N-spY&&i<SP_MAX_LEN; i++) {
 			var x=spX;
			var y=spY;
	 		dataCur[x][y+i]=spCur[i];
		}
		spCtrlCanvas.visible = false;
	};
	
	spDown=function(){
		buff="spDown";
		spCtrlCanvas.y += spSpeed;
		var curY = SP_H_N - Math.floor(spCtrlCanvas.y/SP_H);
		if(curY == spY&&curY!=SP_H_N){	
			return ;
			}
			else
				{
					spY = curY;
				}
		if(spY>0&&dataCur[spX][spY-1]==0){		
		}
		else {
			spAdd();
			buff="compute";
			
			
			spSpeedLock = false; //恢复加速功能
			if(spSpeed >= SP_DOWN_SPEED_QUICK){
				 spSpeed = spSpeedPre;	
				}
			
			if(dataCur[spX][spY]==7){
				square = dataCur[spX][spY-1];
				buff = "laser";
				if(square == 8){ //如果碰到了损坏区域，完全清除！
					BadEreaDestory();
					}
				}
			if(spY==SP_H_N){
				if(g_endState == 0){
						buff="gameOver";
						var txtData = [{text:"这就死了？渣渣...",type:"left"},
						{text:"我觉得你有进步的空间",type:"right"},
						{text:"那你加油咯！",type:"left"}
						];
						TxtDlg.show(txtData,function(){
						init();
						});
					}
				if(g_endState == 1){
					event_bad_end();
					}
				if(g_endState == 2){
					event_good_end();
					}
				
				
				//dataIconFly();		
				}
		}
	};
	spLeft=function(){
		if(spX>0&&buff=="spDown"){
			var bMove = true;
			for(var i = 0; i < g_spLen; i++){
				var x = spX-1;
				var y = SP_H_N - Math.ceil((spCtrlCanvas.y+1)/SP_H) +i
				if(y<SP_H_N&&dataCur[x][y]!=0){
					bMove = false;
					}
				}
			if(bMove){ //待修改 新增置空方块
				spX--;
				spCtrlCanvas.x -= SP_W;
			}
		}
	};
	
	spRight=function(){
		if(spX < SP_W_N-1&& buff == "spDown"){
			var bMove = true;
			for(var i = 0; i < g_spLen; i++){
				var x = spX+1;
				var y = SP_H_N - Math.ceil((spCtrlCanvas.y+1)/SP_H) +i
				if(y<SP_H_N&&dataCur[x][y]!=0){
					bMove = false;
					}
				}
			if(bMove){ //待修改 新增置空方块
				spX++;
				spCtrlCanvas.x += SP_W;
			}
		}
	};
	spOver=function(){
		if(buff!="spDown"||spSpeedLock){return 0;}
		spSpeedLock = true;
		spSpeedPre = spSpeed;	
		spSpeed = SP_DOWN_SPEED_QUICK;
		TIMER(500,1,function(){
			if(spSpeedLock){
					spSpeed = spSpeedPre;	;
					spSpeedLock = false;
				}
			});
	};
	
	spChang=function(){
		if(buff!="spDown"){return 0;}
		var idx = spSwapIdx;
		var swapIdx = spSwapIdx+1;
		
		var num = spCur[idx];
		spCur[idx] = spCur[swapIdx];
		spCur[swapIdx] = num;
		
		spSwapIdx ++;
		if(spSwapIdx >= spCurLen - 1){
			spSwapIdx = 0;
			} 
	};

	computeSpeed = function(){
		var tempSpeed = spSpeed;
		var tempRandom = g_spRandomMax;
		var tempAdd = ADD_SCORE_VAL;
		if(score<100){
			spSpeed=5;
			g_spRandomMax = 4;
			g_endState = 0;
			ADD_SCORE_VAL = 1;
			}
		if(score>=100){
			spSpeed=10;
			g_spRandomMax = 5;
			ADD_SCORE_VAL = 3;
			}
		if(score>500){
				spSpeed=10;
				g_spRandomMax = 6;
				g_endState = 1;
				ADD_SCORE_VAL = 5;
			}
		if(score>1000){
			spSpeed= 10;
			g_spRandomMax = 7;
			ADD_SCORE_VAL = 7;
			g_endState = 2;
			}
		if(score>2000){
			spSpeed=15;
			g_spRandomMax = 7;
			g_endState = 2;
			ADD_SCORE_VAL = 11;
			}
		if(score>4500){
			spSpeed=20;
			g_spRandomMax = 7;
			g_endState = 2;
			ADD_SCORE_VAL = 17;
			}
		if(score>6000){
			spSpeed=25;
			g_spRandomMax = 7;
			g_endState = 2;
			ADD_SCORE_VAL = 27;
			}
		var txtData =[];
		if(spSpeed > tempSpeed&&spSpeed!=SP_DOWN_SPEED_QUICK){
			txtData.push({text:"速度增加！游得很快！",type:"left"});
			}
		if(g_spRandomMax > tempRandom){
			txtData.push({text:"方块种类增加！非气加重！",type:"left"});
			}
		if(ADD_SCORE_VAL > tempAdd){
			txtData.push({text:"分数速率增加！",type:"left"});
			}
			
		if(txtData.length > 0){
			TxtDlg.show(txtData,function(){});
			}
		
		}
	changeScore=function(_score,_x,_y){
		computeSpeed();
		tempScore=[];
		score+=_score;
		var txtData = "加"+_score+"分";
		TxtDlg.show([{text:txtData,type:"left"}],function(){});
		if(_score<0){_score=0-_score;tempScore.push(11);}
		else {
			tempScore.push(10);
		}
		bAddStar=false;
		var tnum = 100000;
		for (var i = 0; i < UI_SCORE_LEN; i++) {
		 var num = Math.floor(score%tnum/(tnum/10));
		 if(tnum!=0||bAddStar){
		 	tempScore.push(tnum);
		 	bAddStar =true;
		 	}
		 tnum = tnum / 10;
		}
		for (var i = 0; i < tempScore.length; i++) {
//			t=Sys.newBitmap({lifeTime:3,motion:{x:{fromValue:_x+i*20},y:{fromValue: _y, toValue: _y-50, lifeTime: 2, startDelay:500, easing:"None"}}});
//			t.x=_x+i*20;
//			t.y=_y;
//			mainCanvas.addChild(t); //待修改 加分动画
		}

	};
	
	reDrawTip = function(){
		var bmpData;
		for(var i = 0; i < SP_MAX_LEN; i++){
			var curid = tipCur[i];
			if( i < g_spLen){
				if(curid!=tipPre[i]){
					if(curid > 0&&curid < 9){
						bmpData = new LBitmapData(res["i_"+curid]);
						tipIcon[g_spLen-1-i].bitmapData = bmpData;
					}
					else
					{
						bmpData = new LBitmapData();
						tipIcon[g_spLen-1-i].bitmapData = bmpData;
					}
					}
				}
				else
				{

				}
			}
			tipPre = tipCur.concat();
		};
	reDrawScore=function(){
		var tnum = 10;
		var i;
		var base = 1;
		var times = 1;
		while(score-scoreShow >= base){
			scoreShow += times;
			times = times * 10;
			base += times;
			}

		for (i = 0; i < UI_SCORE_LEN ; i++) {
			var num = Math.floor(scoreShow%tnum/(tnum/10));
			tnum = 10* tnum;
			scoreCur[i] = num;
			if(scoreCur[i]!=scorePre[i]){
				var bitmapdata = new LBitmapData(res["n_"+num]);
				scoreIcon[UI_SCORE_LEN-i-1].bitmapData=bitmapdata;
			}
			scorePre[i] = scoreCur[i];
		}
	};
	
	reDrawCtrSp = function(){
		for(var y = 0; y < SP_MAX_LEN; y++){
			var curid = spCur[y];
			if(curid != spPre[y]){
				if(curid == 0|| curid > 8){ //draw invisible square
						var bitmapdata= new LBitmapData();
						spIcon[y].bitmapData = bitmapdata;
						}
					else
						{
							var bitmapdata= new LBitmapData(res[("i_"+curid)]);
							spIcon[y].bitmapData = bitmapdata;
						} 
				}
			}
			spPre = spCur.concat();
		}
	
	reDraw=function(){
		//draw icons
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				var curid = dataCur[x][y]
				if(curid!=dataPre[x][y]){ //double buffering draw icon
					if(curid < 1|| curid > 7){ //draw invisible square
						var bitmapdata= new LBitmapData();
						dataIcon[x][y].bitmapData = bitmapdata;
						}
					else
						{
							var txt = res[("i_"+curid)];
							var bitmapdata= new LBitmapData(txt);
							dataIcon[x][y].bitmapData = bitmapdata;
						} 
				}
				dataPre[x][y]=dataCur[x][y]; //update draw buff data
			}
		}
	};
	
	dataIconFly=function(){
		var tTimer=0;
		buff="waite";
		TIMER(100,20,function(){
			for (var i = 0; i < SP_W_N; i++) {
				for (var j = 0; j < 6; j++) {
					dataIcon[i][j].y+=RANDOM(1,10);
					dataIcon[i][j].rotate+=RANDOM(2,30);
					dataIcon[i][j].alpha-=0.049;
					if(i<3){dataIcon[i][j].x-=RANDOM(5,15);}
					else{dataIcon[i][j].x+=RANDOM(5,15);;}
					}
				}
			});
		TIMER(3000,1,function(){
			for (var i = 0; i < SP_W_N; i++) {
				for (var j = 0; j < 6; j++) {
					dataIcon[i][j].x = SP_W*i;
					dataIcon[i][j].y = SP_H*(SP_H_N-j-1);
					dataCur[i][j] = 0;
					dataIcon[i][j].rotate=0;
					dataIcon[i][j].alpha=1;
				}
			}
			reDraw();
			buff = "down";
			});
		};

		
		BadEreaClear = function(){
			for (var x = 0; x < SP_W_N; x++) {
				for(var y=0;y < SP_H_N;y++){
					if(dataCur[x][y]==8){
						dataCur[x][y]=0;
						}
				}
			}
			}
		BadEreaAdd = function(){
			for(var i = 0; i < badEreaCount; i++){
				if(badErea[i].showTimes > 0){
					var x = Math.round((badErea[i].x - UI_SP_X)/SP_W);
					var y = SP_H_N - 1 - Math.round((badErea[i].y - UI_SP_Y)/SP_H);
					for (var n = 0; n < badErea[i].sizeX; n++) {
						for(var m = 0;m < badErea[i].sizeY; m++){
						if(x+n>=0&&x+n<SP_W_N&&y-m>=0&&y-m<SP_H_N){
							dataCur[x+n][y-m] = 8;
							}
						}
					}
					}
				}
			}
		BadEreaDestory = function(){
			for(var i = 0; i < badEreaCount; i++){
			badErea[i].showTimes = 0;
			}
			BadEreaDrawPath();
		}
		BadEreaTimesSub = function(){
			for(var i = 0; i < badEreaCount; i++){
				if(badErea[i].showTimes > 0){
					badErea[i].showTimes -= 1;
					}
				}
				BadEreaCompute();
			}
		
		BadEreaCompute = function(){
			BadEreaClear();
			BadEreaAdd();
			BadEreaDrawPath();
			}
		BadEreaDrawBoom = function(_x,_y,_w,_h)
		{
			if(typeof(BadEreaDrawBoomLock) == "undefined"){
				BadEreaDrawBoomLock = false;
				}
			if(BadEreaDrawBoomLock){return;}
			buff = "waite";
			BadEreaDrawBoomLock = true;
			badEreaBoomImg.visible = true;
			badEreaBoomImg.x = 55;
			badEreaBoomImg.y = 300;
			badEreaBoomImg.scaleX = 0.4;
			badEreaBoomImg.scaleY = 0.4;
			badEreaBoomImg.rotate = 0;
			badEreaBoomImg2.visible = false;
			
			var tx =Math.round(_w - 100)/2;
			if(tx<0){tx=0;}
			badEreaBoomImg2.x = _x+tx-10;
			var ty =Math.round(_h - 150)/2;
			if(ty<0){ty=0;}
			badEreaBoomImg2.y = _y+ty-10;
			badEreaBoom_x = _x;
			badEreaBoom_y = _y;
			badEreaBoom_w = _w;
			badEreaBoom_h = _h;
			
			LTweenLite.to(badEreaBoomImg,2,{x:_x+tx,y:_y+ty,scaleX:1,scaleY:1,delay:1,rotate:3600,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
				badEreaBoomImg.visible = false;
				badEreaBoomImg2.visible = true;
				TIMER(500,1,function(){
					badEreaBoomImg2.visible = false;
					BadEreaDrawBoomLock = false;
					boom(badEreaBoom_x,badEreaBoom_y,badEreaBoom_w,badEreaBoom_h);
					buff = "spDown";
					}
				);
				
				}})
			
			
		}
		
		BadEreaDrawPath = function(){
				for(var i = 0; i < badEreaCount; i++){
					if(badErea[i].showTimes<1){
							badEreaCanvas[i].graphics.clear();
							}
					if(badErea[i].showTimes>0&&!badErea[i].bDrawed){
						badErea[i].bDrawed = true;
						badEreaPathCur = badErea[i].drawPath
						var g = badEreaCanvas[i].graphics;
						g.clear();
						g.drawRect(2,"#000000",[0,0,UI_GAME_PIX_W,UI_GAME_PIX_H]);

						g.lineStyle = "#000000";
						g.beginBitmapFill(mogekoData);
						g.beginPath();
						var path = badErea[i].drawPath;

						g.drawVertices(2,"#000000",path);
						//g.stroke();
						
						trace("BadEreaDrawPath");
						}
						
				}
			}
		boom=function(_x,_y,_w,_h){
			for(var i = 0; i < badEreaCount; i++){
				if(badErea[i].showTimes == 0){
					badErea[i].x = _x;
					badErea[i].y = _y;
					badErea[i].sizeX = Math.ceil(_w/SP_W);
					badErea[i].sizeY = Math.ceil(_h/SP_H);
					badErea[i].showTimes = RANDOM(2,10);
					badErea[i].bDrawed = false;
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
					while(curX<limit){
						curY = top + RANDOM(-10,10);
						curX += RANDOM(1,10);
						badErea[i].drawPath.push([curX,curY]);
						}
					limit = bottom;
					while(curY<limit){
						curY +=RANDOM(1,10);
						curX = right + RANDOM(-10,10);
						badErea[i].drawPath.push([curX,curY]);
						}
					limit = left;
					while(curX>limit){
						curY = bottom + RANDOM(-10,10);
						curX -=RANDOM(1,10);
						badErea[i].drawPath.push([curX,curY]);
						}
					limit = top+10;
					while(curY>limit){
						curY -=RANDOM(1,10);
						curX = left + RANDOM(1,10);
						badErea[i].drawPath.push([curX,curY]);
						}
					
					BadEreaCompute();
					return;
					}
				}
		};
		
		laser=function(){
			//trace("lasering:"+square);
			buff = "showYSM";
			var num = square;
			for (var x = 0; x < SP_W_N; x++) {
				for(var y=0;y < SP_H_N;y++){
				if(dataCur[x][y]==num){
					dataCur[x][y]=7;
					buff = "waite";
					var endx = UI_SP_X + x*SP_W+SP_W/2;
					var endy = UI_SP_Y + (SP_H_N-1-y)*SP_H+SP_H/2;
					reDraw();
					event_laser(380,280,endx,endy);
					TIMER(1300,1,function(){
						buff = "laser";
						});
					return;
					}
				}
			}
			}
		
		getRaffleSameIconCountMax = function(){
			var countAry = [];
			for(var i = 0; i < UI_TIP_LEN;i++){
				var cur = tipCur[i];
				var curCount = 0;
				for(var j = i; j < UI_TIP_LEN;j++){
					if(cur == tipCur[j]){
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
		
		getRaffleSpecialIconCount = function(_icon){
			var count = 0;
				for(var i = 0; i < UI_TIP_LEN;i++){
					if(tipCur[i]==_icon){
						count++;
						}
					}
			return count;
			}
		raffleCompute = function(){
			//计算御神木数量
			var info = getRaffleSameIconCountMax();
				var bNext = true;
				var ysmCount = getRaffleSpecialIconCount(7);
				var childCount = getRaffleSpecialIconCount(8);
				var blackCount = getRaffleSpecialIconCount(1);
					if(ysmCount==3){
						dataIconFly();
						TxtDlg.show([{text:"that's power!",type:"right"}],function(){});
						trace("启用超级炸弹");
						bNext = false;
					}
					if(ysmCount==2){
						g_bWTF=true;
						trace("启用保护方块");
						TxtDlg.show([{text:"奥义启用！",type:"right"}],function(){});
						buff = "showYSM";
						bNext = false;
					}
					if(ysmCount==1){			
						if(blackCount >=1&&bNext){
							if(score>500){
								score -= 500;
								}
								else
									{
									score = 0;
									}
							TxtDlg.show([{text:"扣500分！",type:"right"}],function(){});
							trace("扣500");
							buff = "showYSM";
							bNext = false;
							}
						}
				//计算赤酱方块数量
				if(childCount >=3&&bNext){
					g_spLen = RANDOM(1,3);
					trace("下落方块长度改变1-2");
					TxtDlg.show([{text:"吼～！",type:"left"}],function(){});
					longSpTimes = 10;
					buff = "showYSM";
					bNext = false;
					
					}
				if(childCount ==2&&bNext){
					spSpeed += 5;
					trace("下落速度增加");
					TxtDlg.show([{text:"下落速度增加！",type:"left"}],function(){});
					buff = "showYSM";
					bNext = false;
					}
				if(childCount ==1&&bNext){
					g_spLen = RANDOM(4,7);
					trace("下落方块长度改变4，6");
					TxtDlg.show([{text:"啊！！！",type:"left"}],function(){});
					longSpTimes = 1;
					buff = "showYSM";
					bNext = false;
					}
					
				//计算黑色方块数量
				if(blackCount>=3&&bNext){
					var x = RANDOM(0,350);
					var y = RANDOM(0,230);
					var w = RANDOM(80,250);
					var h = RANDOM(80,200);
					BadEreaDrawBoom(x,y,w,h);
					bNext = false;
					trace("炸毁区域");
					TxtDlg.show([{text:"fuck you!",type:"left"}],function(){});
				}
				if(blackCount==2&&bNext){
					event_fadeDark();
					trace("黑屏");
					buff = "showYSM";
					TxtDlg.show([{text:"the deep dark fantasy♂",type:"left"}],function(){});
					bNext = false;
					}
				if(blackCount==1&&info.count<2&&bNext){
					event_darkAndLight();
					trace("半黑屏");
					TxtDlg.show([{text:"状态异常!",type:"left"}],function(){});
					bNext = false;
					buff = "showYSM";
					}
				if(blackCount==1&&info.count>1&&bNext){
					event_controlChange();
					trace("操作反转");
					bNext = false;
					TxtDlg.show([{text:"boy next door♂",type:"left"}],function(){});
					buff = "showYSM";
					}
				
				//计算普通数量
				if(blackCount==0&&info.count==3&&bNext){
					score += 1000;
					bNext = false;
					trace("加1000");
					TxtDlg.show([{text:"加1000分！吼～",type:"left"}],function(){});
					buff = "showYSM";
				}
				if(blackCount==0&&info.count==2&&bNext){
					score += 100;
					trace("加100");
					TxtDlg.show([{text:"加100分，恭喜！",type:"left"}],function(){});
					bNext = false;
					buff = "showYSM";
				}
				if(bNext){
				trace("谢谢惠顾");
				TxtDlg.show([{text:"感恩之心",type:"left"}],function(){});
				bNext = false;
				buff = "showYSM";
				}
				for(var i = 0; i < g_spLen; i++){
					tipCur[i] = RANDOM(1,g_spRandomMax);
				}
				raffleLock = false;	
			}
		
		event_raffle = function(){
			if(typeof(raffleLock)== "undefined"){
				raffleLock = false;
				}
			if(raffleLock){return;}
			TxtDlg.show([{text:"是时候来鉴定一波血统了！",type:"left"}],function(){});
			raffleLock = true;
			buff = "raffle";
			TIMER(100,20,function(){
				for(var i = 0; i < UI_TIP_LEN; i++){
					tipCur[i] = RANDOM(1,9);
					}
					reDrawTip();
				});
			TIMER(3000,1,raffleCompute);
		}
		
		keyTriF=function(key){
			trace("key press:"+key);
			switch (key) {
				case 119:
				(controlF[2])();
				break;
				case 97:
				(controlF[0])();
				break;
				case 100:
				(controlF[1])();
				break;
				case 115:
				(controlF[3])();
				break;
				case 113:
				if(g_showType != "full"){
					g_showType = "full"
					g_needChangeCanvas = true;
					}
					else{
						g_showType = "native"
						g_needChangeCanvas = true;
						}
				break;
				default:
				break;
			}
		};
	
	event_laser_draw = function(){
		
		
			l.path=[];
			var r = 50;
			var num = l.angle
			while(num < 360+l.angle){
				var tnum = num;
				if(tnum > 360){
					tnum -=360;
					}
				var a = Math.sin( tnum*Math.PI/180 ) * r;
				var b = Math.cos( tnum*Math.PI/180) * r;
				l.path.push([l.EX+a,l.EY+b]);
				num += 18;
				}
			var g = laserCanvas.graphics;
			g.clear();
			//g.fillStyle = "rgba(182,243,230,0)";
			
			g.beginPath();
			
			g.moveTo(l.EX,l.EY);	
			for(var i = 0;i < l.path.length-1;i+=2){
				g.lineTo(l.path[i][0],l.path[i][1]);
				g.lineTo(l.path[i+1][0],l.path[i+1][1]);
				g.lineTo(l.EX,l.EY);
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
			ctx.moveTo(l.SX+l.r,l.SY+l.r);
			ctx.lineTo(l.EX-10+l.r2,l.EY-10+l.r2);
			ctx.stroke();
			
			
				
			var radgrad1 = ctx.createRadialGradient(l.SX+l.r,l.SY+l.r,5,l.SX+l.r,l.SY+l.r,l.r+10);
      radgrad1.addColorStop(0, '#52E7EB');
      radgrad1.addColorStop(l.coreScal, '#BBFFFF');
      radgrad1.addColorStop(1, 'rgba(171,239,254,0)');
			ctx.fillStyle = radgrad1;
			ctx.fillRect(l.SX-l.r,l.SY-l.r,l.SX+l.r,l.SY+l.r);
			
			var radgrad2 = ctx.createRadialGradient(l.EX-10+l.r2,l.EY-10+l.r2,5,l.EX-10+l.r2,l.EY-10+l.r2,15);
      radgrad2.addColorStop(0, '#52E7EB');
      radgrad2.addColorStop(l.coreSca2, '#BBFFFF');
      radgrad2.addColorStop(1, 'rgba(171,239,254,0)');
			ctx.fillStyle = radgrad2;
			ctx.fillRect(l.EX-10-l.r2,l.EY-10-l.r2,l.EX-10+l.r2,l.EY-10+l.r2);
			
			});
		
		}
	
	event_bad_end = function(){
		buff = "waite"
		mainCanvas.removeChild(controlCanvas);
		badendSps = [];
		endBkCanvas.x = UI_VAN_X;
		endBkCanvas.y = UI_VAN_Y;
		
		breakX = 9;
		breakY = 17;
		b_breakAll = false;

		var w = 10;
		var h = 18;
		for(var cx = 0; cx<w; cx++){
			badendSps[cx]=[];
			for(var cy = 0; cy<h; cy++){
				var bmpData = new LBitmapData(res["p_van"]);
				badendSps[cx][cy] = new LShape();
				var g = badendSps[cx][cy].graphics;
				g.clear();
				g.beginPath();
				g.drawRect(0,"#000000",[cx*12,cy*12,12,12]);
				g.beginBitmapFill(bmpData);
				endBkCanvas.addChild(badendSps[cx][cy]);
				}
			}
			personCanvas.removeChild(bkVan);
			
			
			var txtData = [{text:"....",type:"left"}
				,{text:"咳...",type:"left"}
				,{text:"van少，你怎么了？",type:"right"}
				,{text:"尸雷，你听我说...",type:"left"}
				,{text:"...",type:"right"}
				,{text:"看来这情况无法再呆这儿了",type:"left"}
				,{text:"我必须要去那个地方了",type:"left"}
				,{text:"去了那个地方可能...",type:"left"}
				,{text:"就再也回不来了...",type:"left"}
				,{text:"可能这件有些突然...",type:"left"}
				,{text:"走之前...尸雷...",type:"left"}
				,{text:"......",type:"right"}
				,{text:"最近看你若有所思的样子",type:"right"}
				,{text:"你一直都在想这个事对吧？",type:"right"}
				,{text:"你是个说到做到的人",type:"right"}
				,{text:"现在我发现我讨厌这样的你",type:"right"}
				,{text:"你这样做你真的开心吗？",type:"right"}
				,{text:"明明好不容易才有了...",type:"right"}
				,{text:"和我在一起哪点不好吗？",type:"right"}
				,{text:"van少，你是个无情的人！",type:"right"}
				,{text:"你不会获得幸福的！",type:"right"}
				];
				TxtDlg.show(txtData,function(){
					var txtData = [{text:".........",type:"left"}
					,{text:"van...你...",type:"right"}
					,{text:"你的身体！要消失了！",type:"right"}
					,{text:"这是怎么了！快回答我！",type:"right"}
					,{text:"对不起...",type:"left"}
					,{text:"说你的身体啊!!!",type:"right"}
					,{text:"如你所见，我要去那儿了",type:"left"}
					,{text:"那儿是哪儿啊？身体不要消失啊",type:"right"}
					,{text:"我有话对你说...",type:"left"}
					,{text:"...我...我...对你...",type:"left"}
					,{text:".......",type:"left"}
					,{text:"你有什么话想说啊？说啊！",type:"right"}
					,{text:"...我......",type:"left"}
					];
					TxtDlg.show(txtData,function(){
					var bmpData = new LBitmapData(res["p_shilei_sad"]);
					bkShilei.bitmapData = bmpData;
					
					var txtData = [{text:"van少!!!",type:"right"}
					,{text:"你别走！！",type:"right"}
					,{text:"van少！你能听见我说话吗？",type:"right"}
					,{text:"你把话说完啊！！",type:"right"}
					,{text:"你说话啊！！你是装听不到吗？",type:"right"}
					,{text:"你这个混蛋！！",type:"right"}
					,{text:"为什么不早告诉我！",type:"right"}
					,{text:"我有好多话来不及给你说",type:"right"}
					,{text:"van...",type:"right"}
					,{text:"van......",type:"right"}
					,{text:"我来找你了...",type:"right"}
					];
					TxtDlg.show(txtData,function(){
						
						LTweenLite.to(bkShilei,2,{x:UI_VAN_X,y:UI_VAN_Y,alpha:0,delay:0,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
								//game over
								}});
						
						});
					b_breakAll = true;
					if(breakY<=5){
						breakY = 5;
						}
					breakVan();
					});
				breakVan();
				});
			
			breakVan = function(){
				for(var nextIdx = 0; nextIdx < 10;nextIdx++){
					breakX--;
					if(breakX<0){
							breakX = 9;
							breakY -= 1;
							}
					if(breakY < 0||breakX<0){
						return;
						}
					if(breakY > 5||b_breakAll){
						if(nextIdx == 0){
							LTweenLite.to(badendSps[breakX][breakY],2,{x:0,y:50,alpha:0,delay:nextIdx*0.1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
								breakVan();
								}});
							}
						else{
							LTweenLite.to(badendSps[breakX][breakY],2,{x:0,y:50,alpha:0,delay:nextIdx*0.1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
							
							}});
							}
						}
					else{
	
						}
					}
				

			
			}
		breakLast = function(){
			if(breakY >= 0){
					breakX = breakX-1;
					if(breakX < 0){
						breakX = 9;
						breakY-= 1;
						}
						LTweenLite.to(badendSps[breakX][breakY],2,{x:0,y:50,alpha:0,delay:0,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
						breakLast();
						}});
				}
			
			}
		
		showNextTalk = function(){
			
			
			}
			
			
			
		}
	
	event_good_end = function(){
		buff = "waite"
		mainCanvas.removeChild(controlCanvas);
		var bmpData = new LBitmapData(res["bk_img_mogeko"]);
		var bmp = new LBitmap(bmpData);
		endBkCanvas.addChild(bmp);
		var txtData = [{text:"......",type:"left"}
				,{text:"......",type:"right"}
				,{text:"其实...",type:"right"}
				,{text:"终于到了这种时刻..",type:"left"}
				,{text:"尸雷！你听我说...",type:"left"}
				,{text:"...",type:"right"}
				,{text:"我再也等不下去了...",type:"left"}
				,{text:"第一次见到你时，",type:"left"}
				,{text:"纯真无邪，快乐活泼...",type:"left"}
				,{text:"现在你已经变得如此憔悴",type:"left"}
				,{text:"这个世界太奇怪！",type:"left"}
				,{text:"没有保护认真对待生活的人",type:"left"}
				,{text:"现在你不用再担心什么了",type:"left"}
				,{text:"即使对抗世界",type:"left"}
				,{text:"我也要你幸福!",type:"left"}
				,{text:"尸雷,我们在一起吧!",type:"left"}
				,{text:"...",type:"right"}
				,{text:"van少，我答应你的请求！",type:"right"}
				,{text:"虽然我没什么大的能力",type:"right"}
				,{text:"倘若你遇到了困难",type:"right"}
				,{text:"我将全心全意支持你",type:"right"}
				,{text:"尸雷！",type:"left"}
				,{text:"van！",type:"right"}
				];
				TxtDlg.show(txtData,function(){
					LTweenLite.to(bkVan,2,{x:UI_VAN_X+150,y:UI_VAN_Y,delay:1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
					

				
					}});
					
					LTweenLite.to(bkShilei,2,{x:UI_SHILEI_X-150,y:UI_VAN_Y,delay:1,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
					
					effect_mutiHeart_On(0,350,personCanvas)
				
				
				}});
			});
		
		
		
		}
	
	
	
	event_laser = function(_x,_y,_endx,_endy) //need 1500
	{
		if(typeof(b_laser) == "undefined"){
			b_laser = true;
			}
		if(!b_laser){return;}
		TxtDlg.show([{text:"oh~my萧儿♂",type:"right"}],function(){});
		b_laser = false;
		l = {};
		l.SX = _x;
		l.SY= _y;
		l.EX = _endx;
		l.EY = _endy;
		l.r = 40;
		l.r2 = 10;
		l.coreScal = 0.6;
		l.coreSca2 = 0.1;
		l.linW = 6;
		l.linAlpha = 0.6;
		l.angle = 0;
		l.path = [];
		laserCanvas = new LSprite();
		effectCanvas.addChild(laserCanvas);
		var g = laserCanvas.graphics;
		g.clear();
		event_laser_draw();
		
		
		
		TIMER(100,12,function(){
			l.coreScal -=0.025;
			l.coreSca2 += 0.05;
			l.angle += 17;
			if(l.linW > 2){
				l.linW -=1
				l.linAlpha +=0.1;
				} 
			event_laser_draw();
			});
		
		TIMER(1300,1,function(){
			var g = laserCanvas.graphics;
			g.clear();
			effectCanvas.removeChild(laserCanvas);
			b_laser = true;
			});
	}
	
	
	
	drawHeart = function(_x,_y,_w,_fillColor,_parent)
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
	
	_effect_mutiHeart_Init_ = function(i){
		mutiData[i].speed =  RANDOM(2,6);
		mutiData[i].x = RANDOM(50,450);
		mutiData[i].speedX = RANDOM(-2,3);;
		mutiData[i].y = 0;
		mutiData[i].w = 12;
		mutiData[i].alpha = 1;
		mutiData[i].color = "rgba(246,0,0,"+ mutiData[i].alpha +")";
		}
	effect_mutiHeart_On = function(_x,_y,_parent){
		if(typeof(b_mutiHeart) == "undefined"){
			b_mutiHeart = false;
			mutiSp = new LSprite();
			TIMER(50,MAX_VALUE,function(){
				if(!b_mutiHeart){return;}
				mutiSp.graphics.clear();
				for(var i = 0; i<mutiCount; i++){
					mutiData[i].x += mutiData[i].speedX;
					mutiData[i].y -= 1 * mutiData[i].speed;
					mutiData[i].w += 0.2;
					mutiData[i].alpha -= 0.002 * mutiData[i].speed;
					mutiData[i].color = "rgba(246,0,0,"+ mutiData[i].alpha +")";
					
					var bInit=false;
					if(mutiData[i].x>500||mutiData[i].x<0){bInit=true;}
					if(mutiData[i].y<-350){bInit=true;}
					if(mutiData[i].w>200){bInit=true;}
					if(mutiData[i].alpha<0.1){bInit=true;}
					if(bInit){
						_effect_mutiHeart_Init_(i);
						}
					drawHeart(mutiData[i].x,mutiData[i].y,mutiData[i].w,mutiData[i].color,mutiSp);
					}
				});
			}
		mutiSp.x = _x;
		mutiSp.y = _y;
		_parent.addChild(mutiSp);
		mutiHeartCanvas = new LSprite();
		mutiHeartCanvas.x = _x;
		mutiHeartCanvas.y = _y;
		_parent.addChild(mutiHeartCanvas);
		mutiCount = 20;
		mutiData = [];
		for(var i = 0; i<mutiCount; i++){
			mutiData[i] = {};
			_effect_mutiHeart_Init_(i);
			}
		b_mutiHeart = true;
		}
	effect_mutiHeart_Off = function(){
		if(typeof(b_mutiHeart) == "undefined"){
			return;
			}
		b_mutiHeart = false;
		}
	
	
	
	event_fadeDark = function(){	
		if(typeof(b_fadeDark) == "undefined"){
			b_fadeDark = true;
			}
		if(!b_fadeDark){return;}
		fadeDarkCanvas = new LSprite();
		effectCanvas.addChild(fadeDarkCanvas);
		fadeDarkCanvas.alpha = 0.05;
		var g = fadeDarkCanvas.graphics;
		g.clear();
		g.drawRect(1,"#000000",[0,0,UI_GAME_PIX_W,UI_GAME_PIX_H],true,"#000000");
		b_fadeDark = false;
		TIMER(100,10,function(){
			fadeDarkCanvas.alpha += 0.1;
			});
		TIMER(5000,1,function(){
			effectCanvas.removeChild(fadeDarkCanvas);
			b_fadeDark = true;
			});
		trace("event_fadeDark");
		};
	
	event_darkAndLight = function(){
		if(typeof(b_darkAndLight) == "undefined"){
			b_darkAndLight = true;
			}
		if(!b_darkAndLight){return;}
		darkAndLightCanvas = new LSprite();
		effectCanvas.addChild(darkAndLightCanvas);	
		tempSpCanvas = new LSprite();
		tempSpCanvas.x = UI_SP_X;
		tempSpCanvas.y = UI_SP_Y;
		darkAndLightCanvas.addChild(tempSpCanvas);
		tempSpCanvas.addChild(spCtrlCanvas);
		var g = darkAndLightCanvas.graphics;
		g.clear();
		g.drawRect(1,"#000000",[0,0,UI_GAME_PIX_W,UI_GAME_PIX_H],true,"#000000");
		
		b_darkAndLight = false;
		TIMER(5000,1,function(){
			spCanvas.addChild(spCtrlCanvas);
			spCanvas.addChild(stencilCanvas);
			darkAndLightCanvas.removeChild(tempSpCanvas);
			effectCanvas.removeChild(darkAndLightCanvas);
			b_darkAndLight = true;
			});
		}
	event_controlChange = function(){
		if(typeof(b_controlChange) == "undefined"){
			b_controlChange = true;
			}
		if(!b_controlChange){return;}
		b_controlChange = false;
		controlF[0] = spRight ;
		controlF[1] = spLeft;
		controlF[2] = spOver;
		controlF[3] = spChang;
		
		TIMER(10000,1,function(){
			controlF[0] = spLeft;
			controlF[1] = spRight;
			controlF[2] = spChang;
			controlF[3] = spOver;
			b_controlChange = true;
			});
		
			
		}
	loadOver = function(){
		soundRes.play();
		trace("soundRes load over");
		}
	
	//game logic
	function onup(e){
		backLayer.graphics.clear();
		backLayer.removeAllEventListener(); 
		var url = "./s_bgm_up.";
   	soundRes.load(url+"mp3,"+url+"ogg,"+url+"wav");
    soundRes.addEventListener(LEvent.COMPLETE,loadOver);
		
		LLoadManage.load(
		DATA_RAW,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result)
		{
			res = result;

			init();
			backLayer.removeChild(loadingLayer);
			loadingLayer = null;
			

			trace("load over");
		});
	}
			//start func
			function main () {
				//LGlobal.setDebug(true);
				LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    		//LGlobal.screen(LStage.FULL_SCREEN);
				
				backLayer = new LSprite();
				uiLayer = new LSprite();
				gameLayer = new LSprite();
				addChild(backLayer);
				addChild(gameLayer);
				addChild(uiLayer);
				soundRes = new LSound();
				loadingLayer = new LoadingSample3();
				backLayer.addChild(loadingLayer);
				backLayer.graphics.drawRect(1,"#000000",[0,0,UI_GAME_PIX_W,UI_GAME_PIX_H],true,"#000000");
				backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
				var txt = new LTextField();
				txt.text = "点击加载游戏资源"
				txt.color = "#FF0000";
				txt.x = UI_GAME_PIX_W/2 -50;
				txt.y = UI_GAME_PIX_H/2+50;
				backLayer.addChild(txt);

		}
		//execute code
		LInit(50,"mylegend",UI_GAME_PIX_W,UI_GAME_PIX_H,main);

	
