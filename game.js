//author:js1gsb
//email:js1gsb@gmail.com
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
	,{name:"num_0",path:"./img/i_0.png"}
	,{name:"num_1",path:"./img/i_1.png"}
	,{name:"num_2",path:"./img/i_2.png"}
	,{name:"num_3",path:"./img/i_3.png"}
	,{name:"num_4",path:"./img/i_4.png"}
	,{name:"num_5",path:"./img/i_5.png"}
	,{name:"num_6",path:"./img/i_6.png"}
	,{name:"num_7",path:"./img/i_7.png"}
	,{name:"num_8",path:"./img/i_8.png"}
	,{name:"num_9",path:"./img/i_9.png"}
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
	var g_needChangeCanvas = true;//dirty data mark for change showType
	var g_backLayer,g_backTipLayer,g_gameLayer,g_loadingLayer;
	var g_soundRes;


	var g_score = 0,g_scoreShow = 0;//游戏分数
	var g_add_score = 1;//单个方块分数
	var g_lineAdd = 1;//方块分数倍数
	var g_spLen = 3;//ui显示下一个下落方块的数量『暂时设为固定的3』
	var g_spRandomMax = 4; //随机方块数量
	var g_endState = 0; //0普通 1 bad end 2 good end
	var g_protectCount = 0;//秘籍？？

	var g_spSpeed,g_spSpeedPre,g_spSpeedLock,g_spSpeedApend; //下落方块速度控制

	var SP_ID_NULL = 0, SP_ID_BLACK = 6, SP_ID_YSM = 7, SP_ID_BAD = 8;
	var SP_W = 30;
	var SP_H = 30;
	var SP_NEW_X = 3;
	var SP_W_N = 6;
	var SP_H_N = 10;
	var GAME_SPEED = 50; //游戏主循环执行的时间间隔
	var SP_DOWN_SPEED_QUICK = 30; //下落最大速度
	var SP_MAX_LEN = 6;//控制下落方块最大数量
	var UI_TIP_LEN = 3; //提示下一个的长度

	var UI_GAME_W = 500;
	var UI_GAME_H = 350;
	var UI_SP_X = 160;
	var UI_SP_Y = 30;
	var UI_SCORE_LEN = 4;
	var UI_SCORE_SPLITE = 35;
	var UI_VAN_X =  20;
	var UI_VAN_Y =  126;
	var UI_SHILEI_X = 360;
	var UI_SHILEI_Y = 126;

	//game setup
	var STAGE_INFO = [
	{stage:0,stageScore:0,speed:2,addScore:1,sp:4,end:0}
	,{stage:1,stageScore:50,speed:3,addScore:2,sp:4,end:0,}
	,{stage:2,stageScore:400,speed:4,addScore:4,sp:5,end:1}
	,{stage:3,stageScore:1000,speed:5,addScore:7,sp:6,end:1}
	,{stage:4,stageScore:2000,speed:5,addScore:11,sp:7,end:2}
	,{stage:5,stageScore:4000,speed:8,addScore:15,sp:7,end:2}
	,{stage:6,stageScore:6000,speed:11,addScore:20,sp:7,end:2}
	];


	var g_raffle_count = 0;
	var GENG = [
	{num:7,text:"阿虚试图阻止你在虚拟中寻找真实",ev:0}//黑屏
	,{num:9,text:"笨蛋⑨对方块施加了魔法助你通关",eve:1}//变长条
	,{num:59,text:"无敌坦克发射炮弹炸开方块"}//超大BUG块
	,{num:74,text:"切嗣papa的悲伤使屏幕都暗淡了下落"}//半黑屏
	,{num:233,text:"吐槽群众助你一臂之力"}//加分
	,{num:384,text:"完美执事清除杂乱方块"}//消除同类方块
	,{num:404,text:"网站错误带来了一个BUG"}//随机BUG块
	,{num:450,text:"刀哥放肆震住现场"}//禁止操作
	,{num:495,text:"二妹加入了异变，制造了混乱"}//操作变换
	,{num:520,text:"握手爱抖向你收取520"}//扣分520
	,{num:614,text:"傲娇萝莉送你一次抽奖机会"}//增加抽奖机会
	,{num:666,text:"觉厉群众给你双击666"}//加分666
	,{num:801,text:"腐坏群众开启了新世界的大门"}//变更为下一阶状态
	,{num:894,text:"迷路蜗牛再次回到了起点"}//变更为上一阶状态
	,{num:993,text:"悲伤面罩男被逼爆发全力"}//游戏下落速度增加
	,{num:998,text:"广告促销送你一次抽奖机会"}//增加抽奖机会
	,{num:1024,text:"福利社区送你一个超大福利"}//全屏清除
	,{num:1096,text:"凉宫学姐赠"}//
	,{num:3000,text:"金发大小姐"}
	];

	var VAN = 1, SHILEI = 2;


	var TXT_begin_1 = [
		{text:"简单说一下...",type:SHILEI}
		,{text:"箭头按键移动变换方块，PC使用wsad操控",type:VAN}
		,{text:"点击上面的钻石抽奖（消耗100积分）",type:VAN}
		,{text:"到达指定分数会触发不同事件和结局",type:SHILEI}
		,{text:"祝你玩得愉快！",type:SHILEI}
		];

	var TXT_normalEnd_1 = [{text:"游戏结束！",type:VAN}
						,{text:"我觉得你有进步的空间",type:SHILEI}
						,{text:"重置游戏...",type:VAN}
						];

	var TXT_badEnd_1 = [{text:"....",type:VAN}
				,{text:"咳...",type:VAN}
				,{text:"van少，你怎么了？",type:SHILEI}
				,{text:"尸雷，你听我说...",type:VAN}
				,{text:"...",type:SHILEI}
				,{text:"看来这情况无法再呆这儿了",type:VAN}
				,{text:"我必须要去那个地方了",type:VAN}
				,{text:"去了那个地方可能...",type:VAN}
				,{text:"就再也回不来了...",type:VAN}
				,{text:"可能这件有些突然...",type:VAN}
				,{text:"走之前...尸雷...",type:VAN}
				,{text:"......",type:SHILEI}
				,{text:"最近看你若有所思的样子",type:SHILEI}
				,{text:"你一直都在想这个事对吧？",type:SHILEI}
				,{text:"你是个说到做到的人",type:SHILEI}
				,{text:"现在我发现我讨厌这样的你",type:SHILEI}
				,{text:"你这样做你真的开心吗？",type:SHILEI}
				,{text:"明明好不容易才有了...",type:SHILEI}
				,{text:"和我在一起哪点不好吗？",type:SHILEI}
				,{text:"van少，你是个无情的人！",type:SHILEI}
				,{text:"你不会获得幸福的！",type:SHILEI}
				];
	var TXT_badEnd_2 = [{text:".........",type:VAN}
					,{text:"van...你...",type:SHILEI}
					,{text:"你的身体！要消失了！",type:SHILEI}
					,{text:"这是怎么了！快回答我！",type:SHILEI}
					,{text:"对不起...",type:VAN}
					,{text:"说你的身体啊!!!",type:SHILEI}
					,{text:"如你所见，我要去那儿了",type:VAN}
					,{text:"那儿是哪儿啊？身体不要消失啊",type:SHILEI}
					,{text:"我有话对你说...",type:VAN}
					,{text:"...我...我...对你...",type:VAN}
					,{text:".......",type:VAN}
					,{text:"你有什么话想说啊？说啊！",type:SHILEI}
					,{text:"...我......",type:VAN}
					];
	var TXT_badEnd_3 = [{text:"van少!!!",type:SHILEI}
					,{text:"你别走！！",type:SHILEI}
					,{text:"van少！你能听见我说话吗？",type:SHILEI}
					,{text:"你把话说完啊！！",type:SHILEI}
					,{text:"你说话啊！！你是装听不到吗？",type:SHILEI}
					,{text:"你这个混蛋！！",type:SHILEI}
					,{text:"为什么不早告诉我！",type:SHILEI}
					,{text:"我有好多话来不及给你说",type:SHILEI}
					,{text:"van...",type:SHILEI}
					,{text:"van......",type:SHILEI}
					,{text:"我来找你了...",type:SHILEI}
					];

	var TXT_goodEnd_1 = [{text:"......",type:VAN}
				,{text:"......",type:SHILEI}
				,{text:"其实...",type:SHILEI}
				,{text:"终于到了这种时刻..",type:VAN}
				,{text:"尸雷！你听我说...",type:VAN}
				,{text:"...",type:SHILEI}
				,{text:"我再也等不下去了...",type:VAN}
				,{text:"第一次见到你时，",type:VAN}
				,{text:"纯真无邪，快乐活泼...",type:VAN}
				,{text:"现在你已经变得如此憔悴",type:VAN}
				,{text:"这个世界太奇怪！",type:VAN}
				,{text:"没有保护认真对待生活的人",type:VAN}
				,{text:"现在你不用再担心什么了",type:VAN}
				,{text:"即使对抗世界",type:VAN}
				,{text:"我也要你幸福!",type:VAN}
				,{text:"尸雷,我们在一起吧!",type:VAN}
				,{text:"...",type:SHILEI}
				,{text:"van少，我答应你的请求！",type:SHILEI}
				,{text:"虽然我没什么大的能力",type:SHILEI}
				,{text:"倘若你遇到了困难",type:SHILEI}
				,{text:"我将全心全意支持你",type:SHILEI}
				,{text:"尸雷！",type:VAN}
				,{text:"van！",type:SHILEI}
				];

}
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
	TxtDlg.LAST_STR_ARY = new Array(" /"," -"," \\"," |");
	TxtDlg._init = function(_cav){
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

//Res  depend on global vals
{
	var ResBitMap = {};
	ResBitMap.ANI_FRAME_COUNT = 4;
	ResBitMap.parseRes = function(_res){
		var t = ResBitMap;
		t.mainicon = [];
	
		t.mainicon = [];
		t.mainicon[0] = new LBitmapData();
		t.mainiconDes = [];
		for(var i = 1; i <= 7; i++){
			t.mainicon[i] = new LBitmapData(_res["i_" + i]);
			t.mainiconDes[i] = [];
			for(var j = 0; j <= t.ANI_FRAME_COUNT; j++){
				t.mainiconDes[i][j] = new LBitmapData(_res["i_end_" + i + "_" + j]);
				}
			}
		
		t.scoreIcon = [];
		t.addNumIcon = [];
		for(var i = 0; i < 10; i++){
			t.scoreIcon[i] = new LBitmapData(_res["n_" + i]);
			t.addNumIcon[i] = new LBitmapData(_res["n_" + i]);
			}
		
		t.bkImg = {};
		t.bkImg["ray"] = new LBitmapData(_res["bk_img_ray"]);
		t.bkImg["mogeko"] = new LBitmapData(_res["bk_img_mogeko"]);
		t.bkImg["van"] = new LBitmapData(_res["p_van"]);
		t.bkImg["shilei"] = new LBitmapData(_res["p_shilei"]);
		t.bkImg["ef_yushenmu"] = new LBitmapData(_res["ef_yushenmu"]);
		t.bkImg["ef_boom"] = new LBitmapData(_res["ef_boom"]);
		
		}
	var ResMusic = {};
	ResMusic.parseRes = function(_res){
		var t = ResMusic;
		}
	
}

//MainCav erea depend on glabal vals and res
{
	var MainCav = {};
	MainCav._creat = function(cav,reFunc){	//arg2:aniOver recall Func
		var t = MainCav;
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
		
		t._ref = reFunc;
		MainCav.init();
	}
	MainCav._timer = function(){
		var t = MainCav;
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				var desTimes = t._dataDestoryAniTimes[i][j]
				if(desTimes > 0){
					t._dataDestoryAniTimes[i][j] = desTimes - 1;
					if(desTimes == 1){
						t._icon.bitmapData = ResBitMap.mainicon[0];
						t._data[i][j] = 0;
						t._ref(); // aniOver recall
					}
					else{
						t._icon.bitmapData = ResBitMap.mainiconDes[desTimes];
					}
				}
				else{
					var cur = t._data[i][j];
					if(cur != t._dataPre[i][j]){
						t._icon.bitmapData = ResBitMap.mainicon[cur];
					}
				}
			}
		}
		t._dataPre = t._data.concat();
		
		}
	MainCav.init = function(){
		var t = MainCav;
		for (var i = 0; i < SP_W_N; i++) {
			for (var j = 0; j < SP_H_N; j++) {
				t._data[i][j] = 0;
				t._dataPre[i][j] = 0;
				t._dataDestoryAniTimes[i][j] = 0;
				t._icon.bitmapData = ResBitMap.mainicon[0];
			}
		}
		}
	
	//this means it return a const reference,do not change it value！！！
	MainCav.GETICONDATA = function(){
		var t = MainCav;
		return t._data;
		}
	MainCav.changeIconNum = function(_x,_y,_num){
		var t = MainCav;
		if(_num == 0){
			t._dataDestoryAniTimes[_x][_y] = ResBitMap.ANI_FRAME_COUNT;
			}
		else{
			t._data[_x][_y] = _num;
			}
		}
	MainCav.clearIcon = function(){
		var t = MainCav;

		}
	
	MainCav.checkMoveDown = function(_x,_y,_sp){
		var t = MainCav;
		if(_y < SP_H_N && t._data[_x][_y+1] == 0){
			return true;
		}
		return false;
		}
	MainCav.checkMoveLeft = function(_x,_y,_sp){
		var t = MainCav;
		if(_y <= 0){
			return false;
		}
		var bMove = true;
		for(var i = 0; i < _sp.length; i ++){
			if(t._data[_x-1][j-i] != 0){
				bMove = false;
				break;
			}
		}
		return bMove;
		}
	MainCav.checkMoveRight = function(_x,_y,_sp){
		var t = MainCav;
		if(_y >= SP_W_N){
			return false;
		}
		var bMove = true;
		for(var i = 0; i < _sp.length; i ++){
			if(t._data[_x+1][j-i] != 0){
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
RandomCav._creat = function(cav,_ref){ //arg2:raffle event recall func
	var t = RandomCav;
	t._cav =  new LSprite();
  cav.addChild(t._cav);
	t._data = [];
	t._dataPre = [];
	t._icon = [];
	for (i = 0; i < SP_MAX_LEN; i++) {
		t._icon[i] = new LBitmap();
		t._icon[i].x = 400;
		t._icon[i].y = 20 + SP_H*i;
		t._cav.addChild(t._icon[i]);
		t._data[i] = 0;
		t._dataPre[i] = RANDOM(1,3);
	}
	
	t._raffleCount = 10;
	t._randomMax = 4;
	}
RandomCav._timer = function(){
	var t = RandomCav;
	for (i = 0; i < SP_MAX_LEN; i++) {
		var cur = t._data[i];
		if(cur != t._dataPre[i]){
			t._icon.bitmapData = ResBitMap.mainicon[i];
		}
	}
	t._dataPre = t._data.concat();
	
	if(t._raffleCount > 0){
		t.newSp();
		t._raffleCount--;
		if(t._raffleCount == 0){
			t._ref();
		}
	}
		
	}
RandomCav.init = function(){
	var t = RandomCav;
	for (i = 0; i < SP_MAX_LEN; i++) {
		t._icon[i] = new LBitmap();
		t._icon[i].x = 400;
		t._icon[i].y = 20 + SP_H*i;
		t._cav.addChild(t._icon[i]);
		t._data[i] = 0;
		t._dataPre[i] = RANDOM(1,3);
	}
	
	t._raffleCount = 10;
	t._randomMax = 4;
	
	}
RandomCav.newSp = function(_max){
	var t = RandomCav;
	t._data = t._dataPre.concat();
	var tempResult = [];
	for(var y = 0; y < SP_MAX_LEN && y < _max;y++){
		tempResult[y]=RANDOM(1,t._randomMax);
	}
	t._dataPre = tempResult;
	}
RandomCav.setRandomMax = function(num){
	t._randomMax = num;
	}
RandomCav.getRandomMax = function(){
	return t._randomMax;
	}
//this means it return a const reference,do not change it value！！！
RandomCav.GETICONDATA = function(){
	return t._data;
	}
RandomCav.raffleSimulation = function(){//
	RandomCav._raffleCount = 10;
	}

}

//ControlCav depend on MainCav and RandomCav
{
	ControlCav = {};
	ControlCav.SP_NEW_X = 3;
	ControlCav.SP_DOWN_SPEED_MAX = 30;
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
  	
  	ControlCav.reloadSetUp();
	}
	ControlCav._timer = function(){
		var t = ControlCav;
		for(var i = 0; i < t._data.length; i++){
			var cur = t._data;
  		if(cur != t._dataPre[i]){
  			t._icon.bitmapData = ResBitMap.mainicon[cur];
			}
  	}
		t._data = t._dataPre.concat();
		}
	ControlCav.init = function(){
		var t = ControlCav;
  	t._cav.x = UI_SP_X;
		t._cav.y = UI_SP_Y;
  	
  	for(var i = 0; i < SP_MAX_LEN; i++){
  		t._data[i] = 0;
  		t._dataPre[i] = 0;
			t._icon[i].x = 0;
			t._icon[i].y = 0 - (i+1) * SP_H; // correct y
  	}
  	ControlCav.reloadSetUp();
		}
	ControlCav.reloadSetUp = function(){
		var t = ControlCav;
		t._spSpeed = STAGE_INFO[0].speed;
		t._spSpeedAppend = 0;
		}
	ControlCav.resetSp = function(){
		var t = ControlCav;
		t._data = RandomCav.GETICONDATA();
		t._spCav.x = t.SP_NEW_X * SP_W;
		t._spCav.y = 0;
		t._spSpeedEx = false;
		}
	ControlCav.addToMainCav = function(){
		var t = ControlCav;
		var x = t._getX();
		var y = t._getY();
		for(var i = 0; i < t._data.length; i++){
			var cur = t._data[i];
			if(cur != 0){
				MainCav.changeIconNum(x,y+i,cur);
				}
			}
		}
	ControlCav._getX = function(){
		var t = ControlCav;
		return Math.floor(t._spCav.y/SP_H);
		}
	ControlCav._getSpeed = function(){
		var t = ControlCav;
		if(t._spSpeedEx){
			return t.SP_DOWN_SPEED_MAX;
		}
		else {
			return t._spSpeed + t._spSpeedAppend;
		}
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
		var t = ControlCav;
		var x = t._getX();
		var y = t._getY();
		if(MainCav.checkMoveDown(x,y,t._data)){
			t._spCav.y += t._getSpeed();
			return true;
		}
		return false;
		}
	ControlCav.moveLeft = function(){
		var t = ControlCav;
		var x = t._getX();
		var y = t._getY();
		if(MainCav.checkMoveLeft(x,y,t._data)){
			t._spCav.y -= SP_W;
			}
		}
	ControlCav.moveRight = function(){
		var t = ControlCav;
		var x = t._getX();
		var y = t._getY();
		if(MainCav.checkMoveRight(x,y,t._data)){
			t._spCav.y += SP_W;
			}
		}
	ControlCav.convert = function(){
		var t = ControlCav;
		var len = t._data.length;
		var last =t._data[len-1];
		for(var i = len; i > 0; i--){
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
	BadErea._creat = function(cav,_ref){ //arg2:aniOver recall function
		var t = BadErea;
		t._ref = _ref;
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
			tempData[i] = [];
			for (var j = 0; j < SP_H_N; j++) {
				if(tempData[i][j] != 0){
					MainCav.changeIconNum(i,j,tempData);
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

		LTweenLite.to(BadErea._boomImg,2,{x:_x+tx,y:_y+ty,scaleX:1,scaleY:1,delay:1,rotate:3600,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
			BadErea._boomImg.visible = false;
			BadErea._boomImg2.visible = true;
			TIMER(500,1,function(){
				BadErea._boomImg2.visible = false;
				BadErea._drawBoomLock = false;
				BadErea._addNewPath();
				BadErea._ref();
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
	t._tipimg = [];
	for(var i = 0; i < t.SCORE_BIT; i++) {
		t._img[i] = new LBitmap();
		t._tipimg[i] = new LBitmap();
	}
	t._tempData = [];
	for (var x = 0; x < SP_W_N; x++) {
		t._tempData[x] = [];
		for(var y=0;y < SP_H_N; y++){
			t._tempData[x][y] = 0;	
		}
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
	
	}
ScoreManage.init = function(){
	var t = ScoreManage;
	for (var x = 0; x < SP_W_N; x++) {
		for(var y=0;y < SP_H_N; y++){
			t._tempData[x][y] = 0;	
		}
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
ScoreManage._reDrawScore = function() {
	
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
		if(g_score >= STAGE_INFO[i].stageScore ){
			stage = i;
		}
	}
	if(stage > g_stage&&g_stageAddLock <= 0){
		t._stage = stage;
	}
	if(stage < g_stage&&g_stageAddLock <= 0){
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
	g_score+=_score;
	if(_score<0){_score=0-_score;tempScore.push(11);}
	else {
		tempScore.push(10);
	}
	bAddStar=false;
	var tnum = 100000;
	for (var i = 0; i < UI_SCORE_LEN; i++) {
		var num = Math.floor(g_score%tnum/(tnum/10));
		if(tnum!=0||bAddStar){
			tempScore.push(tnum);
			bAddStar =true;
		}
		tnum = tnum / 10;
	}
	var tempCav = new LSprite();
	for (var i = 0; i < tempScore.length; i++) {
					var t = new LBitmap(ResBitMap.addNumIcon[tempScore[i]]);
					t.x = i*20;
					t.y = 0;
					tempCav.addChild(t); 
	}
	t._cav.addChild(tempCav);
	LTweenLite.to(BadErea._boomImg,2,{x:_x+tx,y:_y+ty,scaleX:1,scaleY:1,delay:1,rotate:3600,ease:LEasing.Strong.easeInOut,tweenTimeline:LTweenLite.TYPE_TIMER,onComplete:function(e){
			ScoreManage._cav.removeChild(e.target);
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
		scoreCur[i] = num;
		if(scoreCur[i]!=scorePre[i]){
			var bitmapdata = new LBitmapData(g_res["n_"+num]);
			scoreIcon[UI_SCORE_LEN-i-1].bitmapData=bitmapdata;
		}
		scorePre[i] = scoreCur[i];
	}
}

ScoreManage.compute = function() {
	var DATA = MainCav.GETICONDATA().concat;
	var score_time = 10;
	var t = ScoreManage;
	var temp = ScoreManage._tempData;
	for (var x = 0; x < SP_W_N; x++) {
			for(var y=0;y < SP_H_N; y++){
				if(dataCur[x][y]!=0&&dataCur[x][y]!=SP_ID_BAD){
					if(y<SP_H_N-2){
						if(dataCur[x][y]==dataCur[x][y+1]&&dataCur[x][y]==dataCur[x][y+2]){
							temp[x][y]=1;
							temp[x][y+1]=1;
							temp[x][y+2]=1;
							score_time += 4;
						}
					}
					if(x<SP_W_N-2){
						if(dataCur[x][y]==dataCur[x+1][y]&&dataCur[x][y]==dataCur[x+2][y]){
							temp[x][y]=1;
							temp[x+1][y]=1;
							temp[x+2][y]=1;
							score_time += 4;
						}
					}
					if(y<SP_H_N-2&&x<SP_W_N-2){
						if(dataCur[x][y]==dataCur[x+1][y+1]&&dataCur[x][y]==dataCur[x+2][y+2]){
							temp[x][y]=1;
							temp[x+1][y+1]=1;
							temp[x+2][y+2]=1;
							score_time += 4;
						}
					}
					if(x>=2&&y<SP_H_N-2){
						if(dataCur[x][y]==dataCur[x-1][y+1]&&dataCur[x-1][y+1]==dataCur[x-2][y+2]){
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
				num+= t._baseScore;	
				showX=x;
				showY=y;
				}
			}
		}
		num=Math.floor(num*g_lineAdd);
		ScoreManage._changeScore(num,UI_SP_X+showX*SP_W,UI_SHILEI_Y+(SP_H_N-showY-1)*SP_H);
	}
	else{
		t._lineAdd = 1;
		}
	
	}
}

//Game logic
var Game = {};
Game.RUN = 0;
Game.STOP = 1;
Game.OVER = 1;
Game._creat = function(_cav){
	var t = Game;
	t._cav = new LSprite();
	_cav.addChild(t._cav);
	
	MainCav._creat(t._cav,Game._continue);
	RandomCav._creat(t._cav,Game._continue);
	ScoreManage._creat(t._cav);
	BadErea._creat(t._cav,Game._continue);
	ControlCav._creat(t._cav);
	OpreatCav._creat(t._cav);
	
	Game.init();
	
	TIMER(100,1,t._timer); //FIXME
	
	}
Game.init = function(cav){
	var t = Game;
	t._state = Game.RUN;
	MainCav.init();
	RandomCav.init();
	ControlCav.init();
	ScoreManage.init();
	BadErea.destoryAll();
	
	}
Game._continue = function(){
	var t = Game;
	t._state = Game.RUN;
	
	}
Game._timer = function(){
	switch(Game._state){
		case Game.RUN:
			MainCav._timer();
			RandomCav._timer();
			ScoreManage._timer();
			
			BadErea._timer();
			ControlCav._timer();
			OpreatCav._timer();
		break;
		case Game.STOP:
			MainCav._timer();
			RandomCav._timer();
			ScoreManage._timer();
		case Game.OVER:
		}
	}

//game start
function onUp(e){
	g_backLayer.removeAllEventListener();
	g_backTipLayer.die();
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
		ResBitMap.parseRes(result);
		Game._creat(g_gameLayer);
		g_backTipLayer.die();
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
	g_backLayer.addEventListener(LMouseEvent.MOUSE_UP,onUp);
	g_backTipLayer = new LTextField();
	var txt = new LTextField();
	txt.text = "点击加载游戏资源"
	txt.color = "#FF0000";
	txt.x = UI_GAME_W/2-50;
	txt.y = UI_GAME_H/2+50;
	g_backLayer.addChild(txt);

	if(LGlobal.os == OS_PC){
		LGlobal.screen(1);
	}
	else{
		LGlobal.screen(LStage.FULL_SCREEN);
	}
}

//execute lufylegend.js engine
LInit(50,"mylegend",UI_GAME_W,UI_GAME_H,main);