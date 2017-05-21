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
	
	DrawHeart = function(_x,_y,_w,_fillColor,_parent)
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