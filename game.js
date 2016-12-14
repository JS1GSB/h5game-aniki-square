//just for fun :)

//resource load
{
var DATA_RAW = new Array(
{name:"bk_img_ray",path:"./img/bk_ray.jpg"}
,{name:"bk_img_mogeko",path:"./img/bk_mogeko.jpg"}
,{name:"i_0",path:"./img/i_0.png"}
,{name:"i_1",path:"./img/i_1.png"}
,{name:"i_2",path:"./img/i_2.png"}
,{name:"i_3",path:"./img/i_3.png"}
,{name:"i_4",path:"./img/i_4.png"}
,{name:"i_5",path:"./img/i_5.png"}
,{name:"i_6",path:"./img/i_6.png"}
,{name:"i_7",path:"./img/i_7.png"}
,{name:"i_8",path:"./img/i_8.png"}
,{name:"i_9",path:"./img/i_9.png"}
,{name:"i_black",path:"./img/i_black.png"}
,{name:"i_blue",path:"./img/i_blue.png"}
,{name:"i_green",path:"./img/i_green.png"}
,{name:"i_purple",path:"./img/i_purple.png"}
,{name:"i_red",path:"./img/i_red.png"}
,{name:"i_yellow",path:"./img/i_yellow.png"}
,{name:"i_yushenmu",path:"./img/i_yushenmu.png"}
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

var gLayer; 	//根节点
var loadingLayer;		//登录画面节点
var res = {}; //资源
	
}
//some libs
{
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
SOUND.init = function(sound){
	SOUND.loopSound = sound;
	SOUND.specialSound = sound;
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
		else
		{
			if(SOUND.specialSound.ended||SOUND.specialSound.paused){
					SOUND.loopVolume += 0.1;
					if(SOUND.loopVolume > 1){
						SOUND.loopVolume = 1;
					}
				SOUND.loopSound.volume = SOUND.loopVolume;
			}
		}	
	}
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
	else
	{
		if(SOUND.specialSound){
			SOUND.specialSound.pause();
			}
		SOUND.fadePlay = true;
		SOUND.specialSound = sound;
	}
	SOUND.bInit = true;
	};
}

//game logic
function main () {
	LGlobal.setDebug(true);
	

	backLayer = new LSprite();
	gLayer = new LSprite();
	addChild(backLayer);
	addChild(gLayer);
	loadingLayer = new LoadingSample3();
	backLayer.addChild(loadingLayer);

	gLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	gLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
}

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
		var bitmapdata= new LBitmapData(res["bk"]);
		var bitmap = new LBitmap(bitmapdata);
		gLayer.addChild(bitmap);
		//res["s_van_thatisgood"].play();
		
		SOUND.play(res["s_bgm_dark"],true);
		//SOUND.play(res["s_van_thatisgood"],false);
		 TIMER(1000,1,function(){
		 	//res["s_bgm_dark"].volume = 0.5;
			//SOUND.play(res["s_bgm_dark"],false);
			SOUND.play(res["s_van_thatisgood"],false);
			});
		trace("load over");
	});	
	
}
function onframe()
{
		gLayer.graphics.clear();
		gLayer.graphics.drawRect(2,"#000000",[20,0,440,100]);
}

gameInit = function(){

}


//execute code
LInit(50,"mylegend",500,350,main);