//global values set
{
	var MAX_VALUE = 210000000;

	var g_backLayer,g_backTipTxt,g_gameLayer,g_loadingLayer;
	var g_soundRes;



	var g_isInAni = false;
	var SP_ID_NULL = 0, SP_ID_BLACK = 6, SP_ID_YSM = 7, SP_ID_BAD = 8;
	
	var SP_W = 30;
	var SP_H = 30;
	var SP_NEW_X = 3;
	var SP_W_N = 6;
	var SP_H_N = 10;
	var GAME_SPEED = 50; //��Ϸ��ѭ��ִ�е�ʱ����
	var SP_DOWN_SPEED_QUICK = 30; //��������ٶ�
	var SP_MAX_LEN = 6;//�������䷽���������
	var UI_TIP_LEN = 3; //��ʾ��һ���ĳ���

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

 
	var GENG = [
	{num:7,text:"������ͼ��ֹ����������Ѱ����ʵ"}//�����
	,{num:9,text:"������Է���ʩ����ħ������ͨ��"}//�䳤��
	,{num:59,text:"�޵�̹�˷����ڵ�ը������"}//����BUG��
	,{num:74,text:"����papa�ı���ʹ��Ļ��������"}//����
	,{num:213,text:"2B���Ϸ����ӽ������Ѷ�"}//�����Ϊ1��
	,{num:233,text:"�²�Ⱥ��Ҫ��������Ϸ������"}//��Ϸ�ٶ�����
	,{num:384,text:"����ִ��������ҷ���"}//����ͬ�෽��
	,{num:404,text:"��վ���������һ��BUG"}//���BUG��
	,{num:450,text:"����һ��������ס�ֳ�"}//��ֹ����
	,{num:495,text:"���ü�������䣬�����˻���"}//�����任
	,{num:520,text:"���ְ���������ȡ520"}//�۷�520
	,{num:614,text:"������������һ�γ齱����"}//���ӳ齱����
	,{num:666,text:"����Ⱥ�ڸ���˫��666"}//�ӷ�666
	,{num:801,text:"����Ⱥ�ڿ�����������Ĵ���"}//���Ϊ��һ��״̬
	,{num:894,text:"��·��ţ�ٴλص������"}//���Ϊԭ��״̬
	,{num:993,text:"���������б��Ʊ���ȫ��"}//ȫ�����
	,{num:998,text:"����������һ�γ齱����"}//���ӳ齱����
	,{num:1024,text:"�����������š����١�����"}//��Ϸ�ٶȼ���
	,{num:1096,text:"����ѧ������һ������̽��"}//�����齱
	,{num:3000,text:"�𷢴�С���ؽ�Ƹ�������ܼ�"}//�ӷ�1000
	];

	var VAN = 1, SHILEI = 2;
	var TXT_begin_1 = [
		{text:"��˵һ��...",type:SHILEI}
		,{text:"��ͷ�����ƶ��任���飬PCʹ��wsad�ٿ�",type:VAN}
		,{text:"����������ʯ�齱������100���֣�",type:VAN}
		,{text:"����ָ�������ᴥ����ͬ�¼��ͽ��",type:SHILEI}
		,{text:"ף�������죡",type:SHILEI}
		];

	var TXT_normalEnd_1 = [{text:"��Ϸ������",type:VAN}
						,{text:"�Ҿ������н����Ŀռ�",type:SHILEI}
						,{text:"������Ϸ...",type:VAN}
						];

	var TXT_badEnd_1 = [{text:"....",type:VAN}
				,{text:"��...",type:VAN}
				,{text:"van�٣�����ô�ˣ�",type:SHILEI}
				,{text:"ʬ�ף�������˵...",type:VAN}
				,{text:"...",type:SHILEI}
				,{text:"����������޷��ٴ������",type:VAN}
				,{text:"�ұ���Ҫȥ�Ǹ��ط���",type:VAN}
				,{text:"ȥ���Ǹ��ط�����...",type:VAN}
				,{text:"����Ҳ�ز�����...",type:VAN}
				,{text:"���������ЩͻȻ...",type:VAN}
				,{text:"��֮ǰ...ʬ��...",type:VAN}
				,{text:"......",type:SHILEI}
				,{text:"�������������˼������",type:SHILEI}
				,{text:"��һֱ����������¶԰ɣ�",type:SHILEI}
				,{text:"���Ǹ�˵����������",type:SHILEI}
				,{text:"�����ҷ�����������������",type:SHILEI}
				,{text:"������������Ŀ�����",type:SHILEI}
				,{text:"�����ò����ײ�����...",type:SHILEI}
				,{text:"������һ���ĵ㲻����",type:SHILEI}
				,{text:"van�٣����Ǹ�������ˣ�",type:SHILEI}
				,{text:"�㲻�����Ҹ��ģ�",type:SHILEI}
				];
	var TXT_badEnd_2 = [{text:".........",type:VAN}
					,{text:"van...��...",type:SHILEI}
					,{text:"������壡Ҫ��ʧ�ˣ�",type:SHILEI}
					,{text:"������ô�ˣ���ش��ң�",type:SHILEI}
					,{text:"�Բ���...",type:VAN}
					,{text:"˵������尡!!!",type:SHILEI}
					,{text:"������������Ҫȥ�Ƕ���",type:VAN}
					,{text:"�Ƕ����Ķ��������岻Ҫ��ʧ��",type:SHILEI}
					,{text:"���л�����˵...",type:VAN}
					,{text:"...��...��...����...",type:VAN}
					,{text:".......",type:VAN}
					,{text:"����ʲô����˵����˵����",type:SHILEI}
					,{text:"...��......",type:VAN}
					];
	var TXT_badEnd_3 = [{text:"van��!!!",type:SHILEI}
					,{text:"����ߣ���",type:SHILEI}
					,{text:"van�٣�����������˵����",type:SHILEI}
					,{text:"��ѻ�˵�갡����",type:SHILEI}
					,{text:"��˵������������װ��������",type:SHILEI}
					,{text:"������쵰����",type:SHILEI}
					,{text:"Ϊʲô��������ң�",type:SHILEI}
					,{text:"���кö໰����������˵",type:SHILEI}
					,{text:"van...",type:SHILEI}
					,{text:"van......",type:SHILEI}
					,{text:"����������...",type:SHILEI}
					];

	var TXT_goodEnd_1 = [{text:"......",type:VAN}
				,{text:"......",type:SHILEI}
				,{text:"��ʵ...",type:SHILEI}
				,{text:"���ڵ�������ʱ��..",type:VAN}
				,{text:"ʬ�ף�������˵...",type:VAN}
				,{text:"...",type:SHILEI}
				,{text:"����Ҳ�Ȳ���ȥ��...",type:VAN}
				,{text:"��һ�μ�����ʱ��",type:VAN}
				,{text:"������а�����ֻ���...",type:VAN}
				,{text:"�������Ѿ���������",type:VAN}
				,{text:"�������̫��֣�",type:VAN}
				,{text:"û�б�������Դ��������",type:VAN}
				,{text:"�����㲻���ٵ���ʲô��",type:VAN}
				,{text:"��ʹ�Կ�����",type:VAN}
				,{text:"��ҲҪ���Ҹ�!",type:VAN}
				,{text:"ʬ��,������һ���!",type:VAN}
				,{text:"...",type:SHILEI}
				,{text:"van�٣��Ҵ�Ӧ�������",type:SHILEI}
				,{text:"��Ȼ��ûʲô�������",type:SHILEI}
				,{text:"����������������",type:SHILEI}
				,{text:"�ҽ�ȫ��ȫ��֧����",type:SHILEI}
				,{text:"ʬ�ף�",type:VAN}
				,{text:"van��",type:SHILEI}
				];

}