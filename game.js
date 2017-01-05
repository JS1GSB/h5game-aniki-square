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
	,{num:74,text:"切嗣papa送你一次抽奖机会"}
	,{num:233,text:"吐槽群众送你一次抽奖机会"}
	,{num:404,text:"故障网站送你一次抽奖机会"}
	,{num:450,text:"霸道刀哥送你一次抽奖机会"}
	,{num:495,text:"抱头二妹送你一次抽奖机会"}
	,{num:614,text:"傲娇萝莉送你一次抽奖机会"}
	,{num:666,text:"觉厉群众送你一次抽奖机会"}
	,{num:801,text:"腐坏群众送你一次抽奖机会"}
	,{num:894,text:"迷路蜗牛送你一次抽奖机会"}
	,{num:993,text:"悲伤面罩男送你一次抽奖机会"}
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
		game.stencilCanvas.graphics.drawRect(2,"#000000",[UI_SP_X,0,SP_W*SP_W_N,UI_SP_Y]);
		game.stencilCanvas.graphics.beginBitmapFill(game.bkBmpData);
		
		game.stencilCanvas.x = 0 - UI_SP_X;
		game.stencilCanvas.y = 0 - UI_SP_Y;
		game.spCanvas.addChild(game.stencilCanvas);
		
		
		game.mogekoCanvas = new LSprite();
		game.mainCanvas.addChild(game.mogekoCanvas);
		game.badEreaCount = 10;
		game.badEreaCanvas = [];
		for(var i = 0; i<game.badEreaCount; i++){
			game.badEreaCanvas[i] = new LSprite();
			game.mogekoCanvas.addChild(game.badEreaCanvas[i]);
		}
		
		
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
		for (i = 0; i < SP_MAX_LEN; i++) {
			game.tipIcon[i] = new LBitmap();
			game.tipIcon[i].x = 400;
			game.tipIcon[i].y = 20 + SP_H*i;
			game.uiCanvas.addChild(game.tipIcon[i]);
		}
		
		
		game.endBkCanvas = new LSprite();
		game.mainCanvas.addChild(game.endBkCanvas);
		
		game.personCanvas = new LSprite();
		game.mainCanvas.addChild(game.personCanvas);
		var tdata = new LBitmapData(res["p_van"]);
		game.bkVan = new LBitmap(tdata);
		game.bkVan.x = UI_VAN_X;
		game.bkVan.y = UI_VAN_Y;
		game.personCanvas.addChild(game.bkVan);
		tdata = new LBitmapData(res["p_shilei"]);
		game.bkShilei = new LBitmap(tdata);
		game.bkShilei.x = UI_SHILEI_X;
		game.bkShilei.y = UI_SHILEI_Y;
		game.personCanvas.addChild(game.bkShilei);
		
//		game.VanOpaiBtn = new SButton(50,110,"good end",game.uiCanvas,function(){
//			game.event_good_end();
//			//game.event_bad_end();
//			
//			});
		
		//game.slOpaiBtn = new SButton(100,200,"tesddt",game.uiCanvas,function(){});

		game.controlCanvas = new LSprite();
		game.mainCanvas.addChild(game.controlCanvas);
		game.controlCanvas.alpha = 0.5;
		game.opreatBtnL = new XButton(10,250," ← ",game.controlCanvas,function(){
			(game.controlF[0])();
			});
		game.opreatBtnR = new XButton(100,250," → ",game.controlCanvas,function(){
			(game.controlF[1])();
			});
		game.opreatBtnUp = new XButton(350,250," ↑ ",game.controlCanvas,function(){
			(game.controlF[2])();
			});
		game.opreatBtnDown = new XButton(440,250," ↓ ",game.controlCanvas,function(){
			(game.controlF[3])();
			});
		
		
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
					game.reDrawTip();
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
		g_spLen = UI_TIP_LEN;
		
		for (var n = 0; n < SP_W_N; n++) {
			for (var m = 0; m < SP_H_N; m++) {
				game.dataCur[n][m]=0;
				game.dataPre[n][m]=0;
				game.dataTemp[n][m]=0;
				var bitmapdata= new LBitmapData();
				game.dataIcon[n][m].bitmapData = bitmapdata;
			}
		}
		for (var i = 0; i < SP_MAX_LEN; i++) {
			if(i<g_spLen){
				game.tipCur[i] = RANDOM(1,g_spRandomMax);
				game.tipPre[i] = 0;
				}
			else{
				game.tipCur[i] = 0;
				game.tipPre[i] = 0;
				}
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
			if(i<g_spLen){
				game.spCur[i] = RANDOM(1,g_spRandomMax);
				game.spPre[i] = 0;
				}
			else{
				game.spCur[i] = 0;
				game.spPre[i] = 0;
				}
			var bitmapdata= new LBitmapData();
			game.spIcon[i].bitmapData = bitmapdata;
		}
		game.spCurLen = 3;
		game.spShowX = SP_W_N * SP_NEW_X;
		game.spShowY = 0;
		game.score = 0;
		game.scoreShow = 0;
		game.lineAdd=0;//combo 
		game.spSwapIdx = 0; //swap square idx swap idx square and idx+1 square
		game.spSpeed = 5;
		game.spSpeedPre = 5;
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
		
		//初始化操作函数
		game.controlF = [];
		game.controlF[0] = game.spLeft;
		game.controlF[1] = game.spRight;
		game.controlF[2] = game.spChang;
		game.controlF[3] = game.spOver;
		

		
		//初始化特殊长度回合
		game.longSpTimes = 1;
		//给予一次保护方块机会
		g_bWTF = true;
		
		game.buff="spNew";
	};
	game.over=function(){
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
			}
		
	};
	game.addYSM=function(){
		var num=0;
		var showX=0;
		var showY=0;
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				if(game.dataTemp[x][y]==9){
					game.dataCur[x][y]=7;
					num+=ADD_SCORE_VAL;
					showX=x;
					showY=y;
				}
			}
		}
		game.lineAdd+=1;
		num=num*game.lineAdd;
		game.changeScore(num,240+showX*40,50+(9-showY)*40);
		for(var i in GENG){
			if(GENG[i].num == game.score){
				game.buff="waite";
				var txtData = [{text:GENG[i].text,type:"left"}];
				TxtDlg.show(txtData,function(){
					game.event_raffle();
					});
				return;
				}
			}
		TIMER(500,1,function(){
				game.buff ="showYSM";
				});
	};
	game.clearYSM=function(){
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				game.dataTemp[x][y]=0;
				if(game.dataCur[x][y]==7){
					game.dataCur[x][y]=0;
				}
			}
		}
		game.buff="down";
	};

	game.down=function(){
		game.buff="compute";
		var data = game.dataCur;
		for (var x1 = 0; x1 < SP_W_N; x1++) {
			for (var y1 = 0; y1 < SP_H_N-1; y1++) {
				var curIcon = data[x1][y1];
				var preIcon = data[x1][y1+1];
				if(curIcon==0&&preIcon>0&&preIcon<8){																					 
					for (var z1 = y1; z1 < SP_H_N-1; z1++) {
						data[x1][z1]=data[x1][z1+1];
						game.buff="down";	
					}
					data[x1][SP_H_N-1]=0;	
				}
			}
		}
	};
	game.spNew=function(){
		game.spCur=game.tipCur.concat();
		for(var y = 0; y < SP_MAX_LEN;y++){
			if(y<g_spLen){
				game.tipCur[y]=RANDOM(1,g_spRandomMax);
				}
			else{
				game.tipCur[y] = 0;
				}
			}
		game.spX=SP_NEW_X;
		game.spY=SP_H_N;
		game.spIconX=SP_NEW_X * SP_W;
		game.spIconX=0;
		game.lineAdd=0;
		game.spCtrlCanvas.visible = true;
		game.spCtrlCanvas.x = SP_NEW_X * SP_W;
		game.spCtrlCanvas.y = 0;
		
		if(game.dataCur[SP_NEW_X][SP_H_N-g_spLen-1]!=0&&g_bWTF){ //特殊事件_保护秘籍
			g_bWTF = false; //只能用一次
			for(var i=0; i<g_spLen;i++){
				game.spCur[i]=7;
				}
		}
		//计算特殊长度回合
		if(game.longSpTimes>1){
			game.longSpTimes --;
		}
		else{
			g_spLen=UI_TIP_LEN	;
		}
		
	};
	game.spAdd=function(){
		for (var i = 0; i < SP_H_N-game.spY&&i<SP_MAX_LEN; i++) {
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
			if(game.spSpeed >= SP_DOWN_SPEED_QUICK){
				 game.spSpeed = game.spSpeedPre;	
				}
			
			if(game.dataCur[game.spX][game.spY]==7){
				game.square = game.dataCur[game.spX][game.spY-1];
				game.buff = "laser";
				if(game.square == 8){ //如果碰到了损坏区域，完全清除！
					game.BadEreaDestory();
					}
				}
			if(game.spY==SP_H_N){
				if(g_endState == 0){
						game.buff="gameOver";
						var txtData = [{text:"这就死了？渣渣...",type:"left"},
						{text:"我觉得你有进步的空间",type:"right"},
						{text:"那你加油咯！",type:"left"}
						];
						TxtDlg.show(txtData,function(){
						game.init();
						});
					}
				if(g_endState == 1){
					game.event_bad_end();
					}
				if(g_endState == 2){
					game.event_good_end();
					}
				
				
				//game.dataIconFly();		
				}
		}
	};
	game.spLeft=function(){
		if(game.spX>0&&game.buff=="spDown"){
			var bMove = true;
			for(var i = 0; i < g_spLen; i++){
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
			for(var i = 0; i < g_spLen; i++){
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
		game.spSpeedPre = game.spSpeed;	
		game.spSpeed = SP_DOWN_SPEED_QUICK;
		TIMER(500,1,function(){
			if(game.spSpeedLock){
					game.spSpeed = game.spSpeedPre;	;
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

	game.computeSpeed = function(){
		var tempSpeed = game.spSpeed;
		var tempRandom = g_spRandomMax;
		var tempAdd = ADD_SCORE_VAL;
		if(game.score<100){
			game.spSpeed=5;
			g_spRandomMax = 4;
			g_endState = 0;
			ADD_SCORE_VAL = 1;
			}
		if(game.score>=100){
			game.spSpeed=10;
			g_spRandomMax = 5;
			ADD_SCORE_VAL = 3;
			}
		if(game.score>500){
				game.spSpeed=10;
				g_spRandomMax = 6;
				g_endState = 1;
				ADD_SCORE_VAL = 5;
			}
		if(game.score>1000){
			game.spSpeed= 10;
			g_spRandomMax = 7;
			ADD_SCORE_VAL = 7;
			}
		if(game.score>2000){
			game.spSpeed=15;
			g_spRandomMax = 7;
			g_endState = 2;
			ADD_SCORE_VAL = 11;
			}
		if(game.score>4500){
			game.spSpeed=20;
			g_spRandomMax = 7;
			g_endState = 2;
			ADD_SCORE_VAL = 17;
			}
		if(game.score>6000){
			game.spSpeed=25;
			g_spRandomMax = 7;
			g_endState = 2;
			ADD_SCORE_VAL = 27;
			}
		var txtData =[];
		if(game.spSpeed > tempSpeed&&game.spSpeed!=SP_DOWN_SPEED_QUICK){
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
	game.changeScore=function(_score,_x,_y){
		game.computeSpeed();
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
		var bmpData;
		for(var i = 0; i < SP_MAX_LEN; i++){
			var curid = game.tipCur[i];
			if( i < g_spLen){
				if(curid!=game.tipPre[i]){
					if(curid > 0&&curid < 9){
						bmpData = new LBitmapData(res["i_"+curid]);
						game.tipIcon[g_spLen-1-i].bitmapData = bmpData;
					}
					else
					{
						bmpData = new LBitmapData();
						game.tipIcon[g_spLen-1-i].bitmapData = bmpData;
					}
					}
				}
				else
				{

				}
			}
			game.tipPre = game.tipCur.concat();
		};
	game.reDrawScore=function(){
		var tnum = 10;
		var i;
		var base = 1;
		var times = 1;
		while(game.score-game.scoreShow >= base){
			game.scoreShow += times;
			times = times * 10;
			base += times;
			}

		for (i = 0; i < UI_SCORE_LEN ; i++) {
			var num = Math.floor(game.scoreShow%tnum/(tnum/10));
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
		for(var y = 0; y < SP_MAX_LEN; y++){
			var curid = game.spCur[y];
			if(curid != game.spPre[y]){
				if(curid == 0|| curid > 8){ //draw invisible square
						var bitmapdata= new LBitmapData();
						game.spIcon[y].bitmapData = bitmapdata;
						}
					else
						{
							var bitmapdata= new LBitmapData(res[("i_"+curid)]);
							game.spIcon[y].bitmapData = bitmapdata;
						} 
				}
			}
			game.spPre = game.spCur.concat();
		}
	
	game.reDraw=function(){
		//draw icons
		for (var x = 0; x < SP_W_N; x++) {
			for (var y = 0; y < SP_H_N; y++) {
				var curid = game.dataCur[x][y]
				if(curid!=game.dataPre[x][y]){ //double buffering draw icon
					if(curid < 1|| curid > 7){ //draw invisible square
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
			
			var tx =Math.round(_w - 100)/2;
			if(tx<0){tx=0;}
			game.badEreaBoomImg2.x = _x+tx-10;
			var ty =Math.round(_h - 150)/2;
			if(ty<0){ty=0;}
			game.badEreaBoomImg2.y = _y+ty-10;
			game.badEreaBoom_x = _x;
			game.badEreaBoom_y = _y;
			game.badEreaBoom_w = _w;
			game.badEreaBoom_h = _h;
			
			LTweenLite.to(game.badEreaBoomImg,2,{x:_x+tx,y:_y+ty,scaleX:1,scaleY:1,delay:1,rotate:3600,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
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
					game.badErea[i].showTimes = RANDOM(2,10);
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
					TIMER(1300,1,function(){
						game.buff = "laser";
						});
					return;
					}
				}
			}
			}
		
		game.getRaffleSameIconCountMax = function(){
			var countAry = [];
			for(var i = 0; i < UI_TIP_LEN;i++){
				var cur = game.tipCur[i];
				var curCount = 0;
				for(var j = i; j < UI_TIP_LEN;j++){
					if(cur == game.tipCur[j]){
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
				for(var i = 0; i < UI_TIP_LEN;i++){
					if(game.tipCur[i]==_icon){
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
				var childCount = game.getRaffleSpecialIconCount(8);
				var blackCount = game.getRaffleSpecialIconCount(1);
					if(ysmCount==3){
						game.dataIconFly();
						TxtDlg.show([{text:"that's power!",type:"right"}],function(){});
						trace("启用超级炸弹");
						bNext = false;
					}
					if(ysmCount==2){
						g_bWTF=true;
						trace("启用保护方块");
						TxtDlg.show([{text:"奥义启用！",type:"right"}],function(){});
						game.buff = "showYSM";
						bNext = false;
					}
					if(ysmCount==1){			
						if(blackCount >=1&&bNext){
							if(game.score>500){
								game.score -= 500;
								}
								else
									{
									game.score = 0;
									}
							TxtDlg.show([{text:"扣500分！",type:"right"}],function(){});
							trace("扣500");
							game.buff = "showYSM";
							bNext = false;
							}
						}
				//计算赤酱方块数量
				if(childCount >=3&&bNext){
					g_spLen = RANDOM(1,3);
					trace("下落方块长度改变1-2");
					TxtDlg.show([{text:"吼～！",type:"left"}],function(){});
					game.longSpTimes = 10;
					game.buff = "showYSM";
					bNext = false;
					
					}
				if(childCount ==2&&bNext){
					game.spSpeed += 5;
					trace("下落速度增加");
					TxtDlg.show([{text:"下落速度增加！",type:"left"}],function(){});
					game.buff = "showYSM";
					bNext = false;
					}
				if(childCount ==1&&bNext){
					g_spLen = RANDOM(4,7);
					trace("下落方块长度改变4，6");
					TxtDlg.show([{text:"啊！！！",type:"left"}],function(){});
					game.longSpTimes = 1;
					game.buff = "showYSM";
					bNext = false;
					}
					
				//计算黑色方块数量
				if(blackCount>=3&&bNext){
					var x = RANDOM(0,350);
					var y = RANDOM(0,230);
					var w = RANDOM(80,250);
					var h = RANDOM(80,200);
					game.BadEreaDrawBoom(x,y,w,h);
					bNext = false;
					trace("炸毁区域");
					TxtDlg.show([{text:"fuck you!",type:"left"}],function(){});
				}
				if(blackCount==2&&bNext){
					game.event_fadeDark();
					trace("黑屏");
					game.buff = "showYSM";
					TxtDlg.show([{text:"the deep dark fantasy♂",type:"left"}],function(){});
					bNext = false;
					}
				if(blackCount==1&&info.count<2&&bNext){
					game.event_darkAndLight();
					trace("半黑屏");
					TxtDlg.show([{text:"状态异常!",type:"left"}],function(){});
					bNext = false;
					game.buff = "showYSM";
					}
				if(blackCount==1&&info.count>1&&bNext){
					game.event_controlChange();
					trace("操作反转");
					bNext = false;
					TxtDlg.show([{text:"boy next door♂",type:"left"}],function(){});
					game.buff = "showYSM";
					}
				
				//计算普通数量
				if(blackCount==0&&info.count==3&&bNext){
					game.score += 1000;
					bNext = false;
					trace("加1000");
					TxtDlg.show([{text:"加1000分！吼～",type:"left"}],function(){});
					game.buff = "showYSM";
				}
				if(blackCount==0&&info.count==2&&bNext){
					game.score += 100;
					trace("加100");
					TxtDlg.show([{text:"加100分，恭喜！",type:"left"}],function(){});
					bNext = false;
					game.buff = "showYSM";
				}
				if(bNext){
				trace("谢谢惠顾");
				TxtDlg.show([{text:"感恩之心",type:"left"}],function(){});
				bNext = false;
				game.buff = "showYSM";
				}
				for(var i = 0; i < g_spLen; i++){
					game.tipCur[i] = RANDOM(1,g_spRandomMax);
				}
				game.raffleLock = false;	
			}
		
		game.event_raffle = function(){
			if(typeof(game.raffleLock)== "undefined"){
				game.raffleLock = false;
				}
			if(game.raffleLock){return;}
			TxtDlg.show([{text:"是时候来鉴定一波血统了！",type:"left"}],function(){});
			game.raffleLock = true;
			game.buff = "raffle";
			TIMER(100,20,function(){
				for(var i = 0; i < UI_TIP_LEN; i++){
					game.tipCur[i] = RANDOM(1,9);
					}
					game.reDrawTip();
				});
			TIMER(3000,1,game.raffleCompute);
		}
		
		game.keyTriF=function(key){
			//trace("key press:"+key);
			switch (key) {
				case 119:
				(game.controlF[2])();
				break;
				case 97:
				(game.controlF[0])();
				break;
				case 100:
				(game.controlF[1])();
				break;
				case 115:
				(game.controlF[3])();
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
	
	game.event_bad_end = function(){
		game.buff = "waite"
		game.mainCanvas.removeChild(game.controlCanvas);
		game.badendSps = [];
		game.endBkCanvas.x = UI_VAN_X;
		game.endBkCanvas.y = UI_VAN_Y;
		
		game.breakX = 9;
		game.breakY = 17;
		game.b_breakAll = false;

		var w = 10;
		var h = 18;
		for(var cx = 0; cx<w; cx++){
			game.badendSps[cx]=[];
			for(var cy = 0; cy<h; cy++){
				var bmpData = new LBitmapData(res["p_van"]);
				game.badendSps[cx][cy] = new LShape();
				var g = game.badendSps[cx][cy].graphics;
				g.clear();
				g.beginPath();
				g.drawRect(0,"#000000",[cx*12,cy*12,12,12]);
				g.beginBitmapFill(bmpData);
				game.endBkCanvas.addChild(game.badendSps[cx][cy]);
				}
			}
			game.personCanvas.removeChild(game.bkVan);
			
			
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
					,{text:"...我...我...惜...",type:"left"}
					,{text:".......",type:"left"}
					,{text:"你有什么话想说啊？说啊！",type:"right"}
					,{text:"...我......",type:"left"}
					];
					TxtDlg.show(txtData,function(){
					var bmpData = new LBitmapData(res["p_shilei_sad"]);
					game.bkShilei.bitmapData = bmpData;
					
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
						
						LTweenLite.to(game.bkShilei,2,{x:UI_VAN_X,y:UI_VAN_Y,alpha:0,delay:0,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
								//game over
								}});
						
						});
					game.b_breakAll = true;
					if(game.breakY<=5){
						game.breakY = 5;
						}
					game.breakVan();
					});
				game.breakVan();
				});
			
			game.breakVan = function(){
				for(var nextIdx = 0; nextIdx < 10;nextIdx++){
					game.breakX--;
					if(game.breakX<0){
							game.breakX = 9;
							game.breakY -= 1;
							}
					if(game.breakY < 0||game.breakX<0){
						return;
						}
					if(game.breakY > 5||game.b_breakAll){
						if(nextIdx == 0){
							LTweenLite.to(game.badendSps[game.breakX][game.breakY],2,{x:0,y:50,alpha:0,delay:nextIdx*0.1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
								game.breakVan();
								}});
							}
						else{
							LTweenLite.to(game.badendSps[game.breakX][game.breakY],2,{x:0,y:50,alpha:0,delay:nextIdx*0.1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
							
							}});
							}
						}
					else{
	
						}
					}
				

			
			}
		game.breakLast = function(){
			if(game.breakY >= 0){
					game.breakX = game.breakX-1;
					if(game.breakX < 0){
						game.breakX = 9;
						game.breakY-= 1;
						}
						LTweenLite.to(game.badendSps[game.breakX][game.breakY],2,{x:0,y:50,alpha:0,delay:0,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
						game.breakLast();
						}});
				}
			
			}
		
		game.showNextTalk = function(){
			
			
			}
			
			
			
		}
	
	game.event_good_end = function(){
		game.buff = "waite"
		game.mainCanvas.removeChild(game.controlCanvas);
		var bmpData = new LBitmapData(res["bk_img_mogeko"]);
		var bmp = new LBitmap(bmpData);
		game.endBkCanvas.addChild(bmp);
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
					LTweenLite.to(game.bkVan,2,{x:UI_VAN_X+150,y:UI_VAN_Y,delay:1,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
					

				
					}});
					
					LTweenLite.to(game.bkShilei,2,{x:UI_SHILEI_X-150,y:UI_VAN_Y,delay:1,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
					
					game.effect_mutiHeart_On(0,350,game.personCanvas)
				
				
				}});
			});
		
		
		
		}
	
	
	
	game.event_laser = function(_x,_y,_endx,_endy) //need 1500
	{
		if(typeof(game.b_laser) == "undefined"){
			game.b_laser = true;
			}
		if(!game.b_laser){return;}
		TxtDlg.show([{text:"oh~my萧儿♂",type:"right"}],function(){});
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
		
		
		
		TIMER(100,12,function(){
			game.l.coreScal -=0.025;
			game.l.coreSca2 += 0.05;
			game.l.angle += 17;
			if(game.l.linW > 2){
				game.l.linW -=1
				game.l.linAlpha +=0.1;
				} 
			game.event_laser_draw();
			});
		
		TIMER(1300,1,function(){
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
		game.mutiData[i].speed =  RANDOM(2,6);
		game.mutiData[i].x = RANDOM(50,450);
		game.mutiData[i].speedX = RANDOM(-2,3);;
		game.mutiData[i].y = 0;
		game.mutiData[i].w = 12;
		game.mutiData[i].alpha = 1;
		game.mutiData[i].color = "rgba(246,0,0,"+ game.mutiData[i].alpha +")";
		}
	game.effect_mutiHeart_On = function(_x,_y,_parent){
		if(typeof(game.b_mutiHeart) == "undefined"){
			game.b_mutiHeart = false;
			game.mutiSp = new LSprite();
			TIMER(50,MAX_VALUE,function(){
				if(!game.b_mutiHeart){return;}
				game.mutiSp.graphics.clear();
				for(var i = 0; i<game.mutiCount; i++){
					game.mutiData[i].x += game.mutiData[i].speedX;
					game.mutiData[i].y -= 1 * game.mutiData[i].speed;
					game.mutiData[i].w += 0.2;
					game.mutiData[i].alpha -= 0.002 * game.mutiData[i].speed;
					game.mutiData[i].color = "rgba(246,0,0,"+ game.mutiData[i].alpha +")";
					
					var bInit=false;
					if(game.mutiData[i].x>500||game.mutiData[i].x<0){bInit=true;}
					if(game.mutiData[i].y<-350){bInit=true;}
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
		game.mutiCount = 20;
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
		TIMER(5000,1,function(){
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
		TIMER(5000,1,function(){
			game.spCanvas.addChild(game.spCtrlCanvas);
			game.spCanvas.addChild(game.stencilCanvas);
			game.darkAndLightCanvas.removeChild(game.tempSpCanvas);
			game.effectCanvas.removeChild(game.darkAndLightCanvas);
			game.b_darkAndLight = true;
			});
		}
	game.event_controlChange = function(){
		if(typeof(game.b_controlChange) == "undefined"){
			game.b_controlChange = true;
			}
		if(!game.b_controlChange){return;}
		game.b_controlChange = false;
		game.controlF[0] = game.spRight ;
		game.controlF[1] = game.spLeft;
		game.controlF[2] = game.spOver;
		game.controlF[3] = game.spChang;
		
		TIMER(10000,1,function(){
			game.controlF[0] = game.spLeft;
			game.controlF[1] = game.spRight;
			game.controlF[2] = game.spChang;
			game.controlF[3] = game.spOver;
			game.b_controlChange = true;
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
		soundRes.play();
		
		LLoadManage.load(
		DATA_RAW,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result)
		{
			res = result;

			game.init();
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

	
