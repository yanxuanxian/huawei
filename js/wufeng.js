$(function(){
	// 获取元素
	var lun=$(".lun")[0];
	var box=$(".box")[0];
	var imgs=$("a",box);
	var btnR=$(".btn_R")[0];
	var btnL=$(".btn_L")[0];
	var lis=$("li",box);
	var flag=true;
	var widths=parseInt(getStyle(imgs[0],"width"));
	// 初始化
	lis[0].style.background="#ffffff";
	for(var i=0;i<imgs.length;i++){
		if(i==0){
			continue;
		}
		imgs[i].style.left=widths+"px";
	}
	// 下标
	var index=0;
	var next=0;
	// 时间函数
	var t=setInterval(moveR,5000);
	function moveR(){	
    // 更新next
       	next++;
	// 判读边界
	   	if(next==imgs.length){
		next=0;}
		// 就位
		lis[index].style.background="#868686";
		lis[next].style.background="#ffffff";
		imgs[next].style.left=widths+"px";
		// 动画
		animate(imgs[index],{left:-widths});
		animate(imgs[next],{left:0},function(){
			flag=true;
		});
		index=next;
	}

	function moveL(){
		next--;
		if(next<0){
			next=imgs.length-1;
		}
		lis[index].style.background="#868686";
		lis[next].style.background="#ffffff";
		imgs[next].style.left=-widths+"px";
		animate(imgs[index],{left:widths});
		animate(imgs[next],{left:0},function(){
			flag=true;
		});
		index=next;
	}


	
	// 底部选项卡
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){	
			// 判断下一张是否是当前
			if(this.index==index){
			return;}
			// 就位
			// 如果点右边的 从右往左滑
			if(this.index>index){
				imgs[this.index].style.left=widths+"px";
				lis[index].style.background="#868686";
				lis[this.index].style.background="#ffffff";
				// 动画
				animate(imgs[index],{left:-widths});
				animate(imgs[this.index],{left:0});	
				// 更新下标
				next=this.index;
				index=this.index;
			}else if(this.index<index){
				// 如果点左边的 从左往右滑
				imgs[this.index].style.left=-widths+"px";
				lis[index].style.background="#868686";
				lis[this.index].style.background="#ffffff";
				// 动画
				animate(imgs[index],{left:widths});
				animate(imgs[this.index],{left:0});	
				// 更新下标
				next=this.index;
				index=this.index;
				}
			}			
	}
	
	
	// 鼠标移入移出
	lun.onmouseover=function(){
		clearInterval(t);
	}
	lun.onmouseout=function(){
		t=setInterval(moveR,5000);
	}
		
	// 左右箭头
	btnR.onclick=function(){
		if(flag){
			flag=false;
			moveR();}
	}
	btnL.onclick=function(){
		if(flag){	
			flag=false;
			moveL();}
	}
})