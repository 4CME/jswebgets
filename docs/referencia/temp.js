AW.Scroll.Bars=AW.System.Template.subclass();
AW.Scroll.Bars.create=function()
{
	var obj=this.prototype;
	obj.setClass("scroll","bars");
	obj.setClass("scrollbars",function(){return this.getScrollProperty("bars")});
	var span=AW.HTML.SPAN;
	var box=new span;
	var spacer=new span;
	var content=new span;
	box.setClass("bars","box");
	spacer.setClass("bars","spacer");
	content.setClass("bars","content");
	spacer.setStyle("width",function(){return this.getScrollProperty("width")+"px"});
	spacer.setStyle("height",function(){return this.getScrollProperty("height")+"px"});
	obj.setContent("box",box);
	obj.setContent("box/spacer",spacer);
	obj.setContent("content",content);
	obj.setContent("content/html",function(){return this.getContentTemplate()});
	obj.setEvent("onresize",function(){this.raiseEvent("adjustScrollBars")});
	
	box.setEvent("onscroll",function(){var e=this.getContent("box").element();
	var left=this.getScrollProperty("left");var top=this.getScrollProperty("top");
	if(e.scrollLeft !=left)
	{
		this.setScrollProperty("left",e.scrollLeft)
	}
	if(e.scrollTop !=top)
	{
		this.setScrollProperty("top",e.scrollTop)}e=null});
		
	obj.setEvent("onmousewheel",function(event){var top=this.getScrollProperty("top");	
	top -=event.wheelDelta/2;
	var e=this.element();
	if(e)
	{
		var max=this.getScrollProperty("height")- e.offsetHeight;
		var bars=this.getScrollProperty("bars");
		max+=(bars=="horizontal" || bars=="both")?16:0;
		top=top > max?max:top}top=top < 0?0:top;
		this.setScrollProperty("top",top);
		AW.setReturnValue(event,false)
	})
};

AW.Grid.Controllers.Overflow=
{
	onScrollLeftChanged:function(x)
	{
		var e=this.getScrollTemplate().element();
		if(e)
		{
			e.firstChild.scrollLeft=x
		}
	},onScrollTopChanged:function(y)
	{
		var e=this.getScrollTemplate().element();
		if(e)
		{
			e.firstChild.scrollTop=y
		}
	},onScrollWidthChanged:function(w)
	{
		var e=this.getScrollTemplate().element();
		if(e)
		{
			e.firstChild.firstChild.style.width=w+"px"
		}
	},onScrollHeightChanged:function(h)
	{
		var e=this.getScrollTemplate().element();
		if(e)
		{
			e.firstChild.firstChild.style.height=h+"px"
		}
	},onScrollBarsChanged:function(x)
	{
		this.getScrollTemplate().refreshClasses()
	},adjustScrollBars:function()
	{
		var e=this.getScrollTemplate().element();
		if(!e){return}var s,x,y;
		var l=this.getScrollLeft();
		var t=this.getScrollTop();
		var w=this.getScrollWidth();
		var h=this.getScrollHeight();
		var ww=e.offsetWidth;
		var hh=e.offsetHeight;i
		if(w < ww && h < hh)
		{
			s="none";
			x=0; y=0
		}
		else if(w < ww - 16)
		{
			s="vertical";
			x=20;
			y=0
		}
		else if(h < hh - 16)
		{
			s="horizontal";
			x=0;
			y=20
		}
		else
		{
			s="both";
			x=20;
			y=20
		}
		if(this.getScrollBars()!=s)
		{
			this.setScrollBars(s)
		}
		if(w - l < ww - x)
		{
			var ll=Math.max(0,w - ww+x);
			if(ll !=l)
			{
				this.setScrollLeft(ll)
			}
		}
		if(h - t < hh - y)
		{
			var tt=Math.max(0,h - hh+y);
			if(tt !=t)
			{
				this.setScrollTop(tt)
			}
		}
		this.setContentHeight(hh - y - this.getContentHeight(0)- this.getContentHeight(2),1);
		this.setContentWidth(ww - x - this.getContentWidth(0)- this.getContentWidth(2),1)
	},onColumnWidthChanged:function()
	{
		var i,a=this.getColumnIndices();
		var lw=0,lc=this.$extended?this.getFixedLeft():0;
		var mw=0,c=this.getColumnCount();
		var rw=0,rc=this.$extended?this.getFixedRight():0;
		lw=this.getSelectorVisible()?this.getSelectorWidth():lw;
		if(!this.$extended)
		{
			mw=lw;
			lw=0
		}
		for(i=0;i<lc;i++)
		{
			lw+=this.getColumnWidth(a?a[i]:i)
		}
		for(i=c-rc;i<c;i++)
		{
			rw+=this.getColumnWidth(a?a[i]:i)
		}
		this.setContentWidth(lw,0);
		this.setContentWidth(rw,2)
	},paint:function()
	{
		var x=this.getScrollLeft();
		var y=this.getScrollTop();
		this.raiseEvent("adjustScrollWidth");
		this.raiseEvent("adjustScrollHeight");
		if(x)
		{
			this.raiseEvent("onScrollLeftChanged",x)
		}
		if(y)
		{
			this.raiseEvent("onScrollTopChanged",y)
		}
		this.raiseEvent("adjustScrollBars");
		if(x)
		{
			this.setTimeout(function(){this.raiseEvent("onScrollLeftChanged",x)})
		}
		if(y)
		{
			this.setTimeout(function(){this.raiseEvent("onScrollTopChanged",y)})
		}
	}
};

AW.Grid.Controllers.Scroll={onScrollLeftChanged:function(x){var e1=this.getRowsTemplate().element();var e2=this.getHeadersTemplate().element();var e3=this.getFootersTemplate().element();if(AW.gecko){AW.ignoreMouse=true}if(e1){e1.parentNode.scrollLeft=x}if(e2){e2.parentNode.scrollLeft=x}if(e3){e3.parentNode.scrollLeft=x}if(AW.gecko){this.setTimeout(function(){AW.ignoreMouse=false})}},onScrollTopChanged:function(y){var e=this.getRowsTemplate().element();if(AW.gecko){AW.ignoreMouse=true}if(e){e.parentNode.scrollTop=y}if(AW.gecko){this.setTimeout(function(){AW.ignoreMouse=false})}},adjustScrollWidth:function(){var a=this.getColumnIndices();var c=this.getColumnCount();var w=this.getSelectorVisible()?this.getSelectorWidth():0;for(var i=0;i<c;i++){w+=this.getColumnWidth(a?a[i]:i)}this.setScrollWidth(w+3)},adjustScrollHeight:function(){var h=this.getRowCount()* this.getRowHeight();h+=this.getContentHeight(0);h+=this.getContentHeight(2);this.setScrollHeight(h+3)}};

getScrollProperty
getScrollLeft
getScrollTop