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
	,{name:"num_0",path:"./img/num_0.png"}
	,{name:"num_1",path:"./img/num_1.png"}
	,{name:"num_2",path:"./img/num_2.png"}
	,{name:"num_3",path:"./img/num_3.png"}
	,{name:"num_4",path:"./img/num_4.png"}
	,{name:"num_5",path:"./img/num_5.png"}
	,{name:"num_6",path:"./img/num_6.png"}
	,{name:"num_7",path:"./img/num_7.png"}
	,{name:"num_8",path:"./img/num_8.png"}
	,{name:"num_9",path:"./img/num_9.png"}
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

//Res  depend on global vals
{
	var ResBitMap = {};
	ResBitMap.ANI_FRAME_COUNT = 7;
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
				//t.mainiconDes[i][j] = new LBitmapData(_res["i_end_" + i + "_" + j]);
				}
			}
		
		t.scoreIcon = [];
		t.addNumIcon = [];
		for(var i = 0; i < 10; i++){
			t.scoreIcon[i] = new LBitmapData(_res["n_" + i]);
			t.addNumIcon[i] = new LBitmapData(_res["num_" + i]);
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