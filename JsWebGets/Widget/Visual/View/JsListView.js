	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago Sanchez

	This library is free software; you can redistribute it and/or
	modify it under the terms of the GNU Lesser General Public
	License as published by the Free Software Foundation; either
	version 2.1 of the License, or (at your option) any later version.

	This library is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public
	License along with this library; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	******************************************************************/

	//
	JsListView = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		jsViews[jsViews.length] = self;

		self.name = name;
		self.id = name;

		self.listview = self;

		self.type = "JsListView";

		self.istreeview = false;
		self.ismultiple = false;
		self.isorderable = true;
		self.js_resized = false;

		self.js_itensIcon = null;

		//could not get rid of it! I can't order directly the childNodes array
		self.childList = new Array();

		//content container container
		self.lvcontainer = new JsWidget();
		//listview header container
		self.lvheaderdiv = document.createElement("div");
		//listview body
		self.lvbodydiv = document.createElement("div");

		self.lvcontainer.type = "JsListViewContainer";

		self.className = "jslv";
		self.lvcontainer.style.position = "relative";
		self.lvcontainer.style.overflow = "auto";
		self.lvcontainer.style.width = "100%";
		self.lvcontainer.style.height = "100%";
		self.lvcontainer.js_parent = self.js_parent;
		self.lvheaderdiv.className = "jslvheaderdiv";

		self.lvheaderdiv.style.position = "relative";
		self.lvheaderdiv.style.height = 24;
		self.lvheaderdiv.style.top = 0;
		self.lvheaderdiv.style.whiteSpace = "nowrap";
		self.lvheaderdiv.style.padding = 0;

		self.selectedItem = null;
		self.selectedItens = new Array();
		self.lastInsertedItem = null;
		self.lastSelectedItem = null;

		self.appendChild(self.lvheaderdiv);
		self.appendChild(self.lvcontainer);
		self.lvcontainer.appendChild(self.lvbodydiv);

		self.lvheaderdiv.js_parent = self.js_parent;
		self.lvbodydiv.js_parent = self.js_parent;

		self.addItem = function(obj, selected)
		{
			self.lastInsertedItem = obj;
			obj.parent = self;
			obj.listview = self;
			self.lvbodydiv.appendChild(obj);
			self.childList[self.childList.length] = obj;

			self.lastInsertedItem = obj;

			obj.style.width = self.lvheaderdiv.style.width;
			obj.lvitensdiv.style.width = self.lvheaderdiv.style.width;

			if (obj.lvitensdiv.childNodes.length > 0)
			{
				for (var js_i=0; js_i<self.lvheaderdiv.childNodes.length; js_i++)
				{
					obj.lvitensdiv.childNodes[js_i].style.width = self.lvheaderdiv.childNodes[js_i].style.width;
				};
			}

			if (self.js_itensIcon)
			{
				obj.setEvent("mousedown",self.startDrag);
				if (browserType=="ie")
					obj.setEvent("mouseup",self.endDrag);
				else 
					obj.setEvent("click",self.endDrag);
			}

			if (selected)
				obj.setSelected();
		};

		self.delItem = function(obj)
		{
			var obj;
			if (self.selectedItens.length)
			{
				for (var js_j in self.selectedItens)
 				{
					if (self.selectedItens[js_j] == obj)
						self.selectedItens.splice(js_j,1);
 				}
			}

			if (self.childList.length)
			{
				for (var js_j in self.childList)
				{
					if (self.childList[js_j] == obj)
					{
						self.childList.splice(js_j,1);
						obj.parentNode.removeChild(obj);
						delete obj;
					}
				}
			}

			if (self.selectedItem == obj)
				self.selectedItem = null;
			if (self.lastSelectedItem == obj)
				self.lastSelectedItem = null;
		};

		self.getValue = function()
		{
			var values = new Array();
			for (var js_i =0;js_i<self.lvbodydiv.childNodes.length; js_i++)
				values[js_i] = self.lvbodydiv.childNodes[js_i].getValue();

			return values;
		};

		self.addColumn = function(headerStr, headerWidth, headerIcon, jsCallback)
		{
			if (browserType=="ie")
			{
				var correction_factor = 0;
			}
			else
			{
				var correction_factor = 7;
			}
			if (!isNaN(parseInt(self.lvheaderdiv.style.width)))
				self.lvheaderdiv.style.width = parseInt(self.lvheaderdiv.style.width) + headerWidth + correction_factor;
			else 
				self.lvheaderdiv.style.width = headerWidth + correction_factor;

			self.lvbodydiv.style.width = self.lvheaderdiv.style.width;

			var header = new JsLabel();
			header.setValue(headerStr);
			header.setWidth(headerWidth);

			var arrow = document.createElement("img");
			arrow.src = jsimages_path + "blank.gif";
			arrow.style.position = "absolute";
			arrow.style.top = "8";
			arrow.style.right = "10";
			arrow.style.width = "7";
			arrow.style.height = "7";
			arrow.objparent = self;
			arrow.col = self.lvheaderdiv.childNodes.length;

			arrow.js_parent = self.js_parent;

			header.arrow = arrow;

			header.appendChild(arrow);

			header.js_parent = self.js_parent;

			var handler_img = document.createElement("img");
			handler_img.style.position = "absolute";
			handler_img.style.top = "0";
			handler_img.style.right = "0";
			handler_img.style.width = "10";
			handler_img.style.height = "20";
			handler_img.style.cursor = "w-resize";
			handler_img.src = jsimages_path + "blank.gif";
			handler_img.objparent = self;
			handler_img.col = self.lvheaderdiv.childNodes.length;
			handler_img.onmousedown = self.beginResize;

			handler_img.js_parent = self.js_parent;

			header.handler = handler_img;

			header.appendChild(handler_img);

			header.objparent = self;
			header.label.objparent = self;
			header.col = self.lvheaderdiv.childNodes.length;
			header.label.col = self.lvheaderdiv.childNodes.length;

			if (self.isorderable && (!jsCallback || typeof(jsCallback) != 'function'))
			{
				header.setEvent("click", self.jslvSort);
			}
			else
			{
				header.setEvent("click", jsCallback);
			}

			header.className = "jslvheadercell";
			header.style.cursor = "pointer";
			header.style.padding = "0px 0px 0px 5px";
			header.style.top = 0;
			header.style.whiteSpace = "nowrap";
			header.style.height = "100%";
			header.style.overflow = "hidden";

			if (browserType=="ie")
				header.style.styleFloat = "left";
			else 
				header.style.cssFloat = "left";

			if (headerIcon)
			{
				header.setIcon(headerIcon);
				header.icon.objparent = self;
				header.icon.col = self.lvheaderdiv.childNodes.length;
			}

			if (browserType=="ie")
			{
				header.label.style.top = 5;

				if (headerIcon)
				{
					header.icon.style.top = 3;
					header.label.style.top = 3;
				}
			}
			else
			{
				if (headerIcon)
					header.icon.style.top = 3;
				header.label.style.top = 5;
			}
			if (headerIcon)
				header.icon.js_parent = self.js_parent;
			header.label.js_parent = self.js_parent;

			self.lvheaderdiv.appendChild(header);
		};

		self.delColumn = function(colIndex)
		{
			if (browserType=="ie")
			{
				var correction_factor = 0;
			}
			else
			{
				var correction_factor = 7;
			}

			var width = parseInt(self.lvheaderdiv.childNodes[colIndex].style.width);
			var old_width = parseInt(self.lvheaderdiv.style.width);

			self.lvheaderdiv.style.width = old_width - width - correction_factor;

			self.lvheaderdiv.removeChild(self.lvheaderdiv.childNodes[colIndex]);

			for (var js_i=colIndex; js_i< self.lvheaderdiv.childNodes.length; js_i++)
			{
				var header = self.lvheaderdiv.childNodes[js_i];
				if (header.icon)
					header.icon.col = js_i;
				header.col = js_i;
				header.label.col = js_i;
				header.handler.col = js_i;
			}
		};

		self.setTreeView = function()
		{
			self.istreeview	= true;
		};

		self.setMultiple = function()
		{
			self.ismultiple	= true;
		};

		self.clearData = function()
		{
			if (self.selectedItem)
				self.selectedItem.setUnselected();
			self.selectedItem = null;
			self.selectedItens = new Array();

			if (browserType=="ie")
			{
				for (var js_i=0;js_i<self.childList.length;js_i++)
				{
					var obj = self.childList[js_i];
					obj.parentNode.removeChild(obj);
				}
			}
			else 
				self.lvbodydiv.innerHTML = "";
			self.childList = new Array();
		};

		self.startDrag = function ()
		{
			jsDraggedItens = self.listview;

			if (browserType=="ie")
				jsEvent.returnValue = false;
			else 
				jsEvent.stopPropagation();

			return false;
		};

		self.endDrag = function ()
		{
			jsDraggedItens = null;
			return false;
		};

		self.setDraggableItens = function()
		{
			self.js_itensIcon = new JsImage();
			self.js_itensIcon.setSource(jsimages_path + "draggeditens.png");
			self.js_itensIcon.style.position = "absolute";
			self.js_itensIcon.setWidth(32);
			self.js_itensIcon.setHeight(32);

			if (browserType=="ie")
				self.js_itensIcon.style.filter = "alpha(opacity=25)";
			else
			{
				self.js_itensIcon.style.opacity = "0.25";
				self.js_itensIcon.style.mozOpacity = "0.25";
			}
		};

		self.uplsvsort = function(a,b)
		{
			var value_a = strtoascii(a.lvitensdiv.childNodes[js_scol].getValue());
			var value_b = strtoascii(b.lvitensdiv.childNodes[js_scol].getValue());

			if (value_a.indexOf("/")!=-1)
			{
				arr = value_a.split("/");
				if (arr[2].indexOf(" ")!=-1)
				{
					var time_arr = arr[2].split(" ");
					arr[2] = time_arr[0];
					arr[0] += time_arr[1];
				}
				value_a = arr[2] + "" + arr[1] + "" + arr[0];

				arr = value_b.split("/");
				if (arr[2].indexOf(" ")!=-1)
				{
					var time_arr = arr[2].split(" ");
					arr[2] = time_arr[0];
					arr[0] += time_arr[1];
				}
				value_b = arr[2] + "" + arr[1] + "" + arr[0];
			}

			if (value_a > value_b)
				return 1;
			else 
				return -1;

			return 0;
		};

		self.downlsvsort = function(a,b)
		{
			var value_a = strtoascii(a.lvitensdiv.childNodes[js_scol].getValue());
			var value_b = strtoascii(b.lvitensdiv.childNodes[js_scol].getValue());

			if (value_a.indexOf("/")!=-1)
			{
				arr = value_a.split("/");
				if (arr[2].indexOf(":")!=-1)
				{
					var time_arr = arr[2].split(" ");
					arr[2] = time_arr[0];
					arr[0] += time_arr[1];
				}
				value_a = arr[2] + "" + arr[1] + "" + arr[0];

				arr = value_b.split("/");
				if (arr[2].indexOf(":")!=-1)
				{
					var time_arr = arr[2].split(" ");
					arr[2] = time_arr[0];
					arr[0] += time_arr[1];
				}
				value_b = arr[2] + "" + arr[1] + "" + arr[0];
			}

			if (value_a < value_b)
				return 1;
			else 
				return -1;

			return 0;
		};

		self.jslvSort = function ()
		{
			if (!self.js_resized && self.isorderable)
			{
				if (jsRealTarget.nodeType == 3)
				{
					js_scol = jsRealTarget.parentNode.col;
				}
				else
				{
					js_scol = jsRealTarget.col;
				}

				for (var js_i=0;js_i<self.lvheaderdiv.childNodes.length;js_i++)
					self.lvheaderdiv.childNodes[js_i].arrow.src=jsimages_path + "blank.gif";

				mark = self.lvheaderdiv.childNodes[js_scol].arrow;

				self.jslvOrder(self,js_scol);
			}

			self.js_resized = false;

		};

		self.jslvOrder = function(obj,col)
		{
			var col;

			if (obj==self)
			{
				self.sortcol = col;

				if (self.sortorder == "updown")
				{
					func = self.uplsvsort;
					self.sortorder = "downup";
					mark.src = jsimages_path + "down_arrow.gif";
				}
				else
				{
					func = self.downlsvsort;
					self.sortorder = "updown";
					mark.src = jsimages_path + "up_arrow.gif";
				}
			}

			obj.childList.sort(func);

			for (var js_i in obj.childList)
			{
				obj.lvbodydiv.appendChild(obj.childList[js_i]);

				if (obj.childList[js_i].childList.length > 0)
					self.jslvOrder(obj.childList[js_i],col);
			}
		};

		self.beginResize = function(e)
		{
			if (!e) var e = window.event;
			if (e.clientX)
				beginXpos = (e.clientX + document.body.scrollLeft);
			else 
				beginXpos = (e.pageX + document.body.scrollLeft);

			if (e.target)
			{
				lstView = e.target.objparent;
				colIndex = e.target.col;
			}
			else
			{
				lstView = e.srcElement.objparent;
				colIndex = e.srcElement.col;
			}

			e.cancelBubble = true;

			document.onmousemove = self.resizeMove;
			document.onmouseup   = self.endResize;

			self.js_resized = true;

			return false;
		};

		self.resizeMove = function(jsEvent)
		{
			if (!jsEvent) var jsEvent = window.event;

			if (lstView)
			{
				if (jsEvent.clientX)
					endXpos = (jsEvent.clientX + document.body.scrollLeft);
				else 
					endXpos = (jsEvent.pageX + document.body.scrollLeft);

				size = parseInt(endXpos) - parseInt(beginXpos);

				col_width = parseInt(lstView.lvheaderdiv.childNodes[colIndex].style.width);
				list_width = parseInt(lstView.lvheaderdiv.style.width);

				if ((col_width + size)>10)
				{
					lstView.lvheaderdiv.childNodes[colIndex].style.width = (col_width + size);
					lstView.lvheaderdiv.style.width = (list_width + size);
				}

				beginXpos = endXpos;
				return false;
			}
		};

		self.setAllColSizes = function(obj)
		{
			var obj;

			for (var js_i in obj.lvbodydiv.childNodes)
			{
				if (obj.lvbodydiv.childNodes[js_i].lvitensdiv)
				{
					tmpobj = obj.lvbodydiv.childNodes[js_i].lvitensdiv.childNodes[colIndex];
					tmpobj.style.width = parseInt(obj.lvbodydiv.childNodes[js_i].listview.lvheaderdiv.childNodes[colIndex].style.width);

					tmpobj.parentNode.style.width = parseInt(obj.lvbodydiv.childNodes[js_i].listview.lvheaderdiv.style.width);
					tmpobj.parentNode.parentNode.style.width = parseInt(obj.lvbodydiv.childNodes[js_i].listview.lvheaderdiv.style.width);

					if (obj.lvbodydiv.childNodes[js_i].lvbodydiv.childNodes.length > 0)
							self.setAllColSizes(obj.lvbodydiv.childNodes[js_i]);
				}
			}
		};

		self.endResize = function(jsEvent)
		{
			self.setAllColSizes(lstView);
			colIndex = null;
			lstView = null;
			document.onmousemove = dragJsWebGet;
			document.onmouseup   = endDragJsWebGet;
			disableSelection();

			return false;
		};

		self.adjustlvheader = function(jsEvent)
		{
			self.lvheaderdiv.style.left = (self.lvcontainer.scrollLeft) * -1;

			var correctfactor = 28;
			if (browserType=="ie")
				correctfactor = 26;

			if(self.offsetHeight > correctfactor)
				self.lvcontainer.style.height = parseInt(self.offsetHeight) - correctfactor;
		};

		self.setOrdered = function(value)
		{
			self.isorderable = value;
		};

		//scroll with fixed header
		self.lvcontainer.setEvent("scroll",self.adjustlvheader);

		return self;
	};


	//Variaveis globais acessiveis pelas funcoes de resize das colunas
	var beginXpos;
	var endXpos;
	var colIndex = null;
	var lstView = null;