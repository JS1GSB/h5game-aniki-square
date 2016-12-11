var loader;
var gLayer;
var loadingLayer;

var imgList = {};
var imgData = new Array(
{name:"bk",path:"./img/bk_ray.jpg"}
);

var soundList = {};
var soundData = new Array(
{name:"s_bgm_init",path:"./img/s_bgm_init.jpg"}

);
function LoadSound()
{
	
}; 

function main () {
	LGlobal.setDebug(true);
	

	
	backLayer = new LSprite();
	gLayer = new LSprite();
	addChild(backLayer);
	addChild(gLayer);
	loadingLayer = new LoadingSample3();
	backLayer.addChild(loadingLayer);

	sound = new LSound();
	sound2 = new LSound();
	gLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	gLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
	LLoadManage.load(
	imgData,
	function(progress){
		loadingLayer.setProgress(progress/2);
	},
	function(result)
	{
		imgList = result;
		backLayer.removeChild(loadingLayer);
		loadingLayer = null;
		trace("load over");
		var bitmapdata = new LBitmapData(imgList["bk"]);
		var bitmap = new LBitmap(bitmapdata);
		gLayer.addChild(bitmap);
	}

	);
}

function onup(e){
	var ur1 = "./sound/s_bgm_init.";
	var ur2 = "./sound/s_bgm_dark.";
	sound.load(ur1+"mp3,"+ur1+"ogg,"+ur1+"wav");
	sound.addEventListener(LEvent.COMPLETE,loadOver);
	sound2.load(ur2+"mp3,"+ur2+"ogg,"+ur2+"wav");
	sound2.addEventListener(LEvent.COMPLETE,loadOver);
}
function loadOver(){
	sound.play();
}

function onframe()
{
		//gLayer.graphics.clear();
		//gLayer.graphics.drawRect(2,"#000000",[20,0,440,100]);
}

gameInit = function(){

}



event_crash = function(){

}



//execute code
LInit(50,"mylegend",500,350,main);