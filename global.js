//global values set
{
	var MAX_VALUE = 210000000;

	var g_backLayer,g_backTipTxt,g_gameLayer,g_loadingLayer;
	var g_soundRes;



	var g_aniLock = 0;
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

 //not used
	var GENG = [
	{num:7,text:"阿虚试图阻止你在虚拟中寻找真实"}//半黑屏
	,{num:9,text:"笨蛋⑨对方块施加了魔法助你通关"}//变长条
	,{num:59,text:"无敌坦克发射炮弹炸开方块"}//超大BUG块
	,{num:74,text:"切嗣papa的悲伤使屏幕都暗淡了"}//黑屏
	,{num:213,text:"2B智障风漫延降低了难度"}//方块变为1格
	,{num:233,text:"吐槽群众要求增加游戏观赏性"}//游戏速度增加
	,{num:384,text:"完美执事清除杂乱方块"}//消除同类方块
	,{num:404,text:"网站错误带来了一个BUG"}//随机BUG块
	,{num:450,text:"刀哥一声放肆震住现场"}//禁止操作
	,{num:495,text:"二妹加入了异变，制造了混乱"}//操作变换
	,{num:520,text:"握手爱抖向你收取520"}//扣分520
	,{num:614,text:"傲娇萝莉送你一次抽奖机会"}//增加抽奖机会
	,{num:666,text:"觉厉群众给你双击666"}//加分666
	,{num:801,text:"腐坏群众开启了新世界的大门"}//变更为下一阶状态
	,{num:894,text:"迷路蜗牛再次回到了起点"}//变更为原点状态
	,{num:993,text:"悲伤面罩男被逼爆发全力"}//全屏清除
	,{num:998,text:"广告促销送你一次抽奖机会"}//增加抽奖机会
	,{num:1024,text:"福利社区发放‘降速’福利"}//游戏速度减少
	,{num:1096,text:"凉宫学姐与你一起宇宙探险"}//立即抽奖
	,{num:3000,text:"金发大小姐重金聘请你做管家"}//加分1000
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