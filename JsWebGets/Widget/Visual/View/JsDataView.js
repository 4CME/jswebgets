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

	//USE THIS ONLY IF YOU ARE GOING TO SHOW DATA THAT IS NOT DYNAMIC!
	JsDataView = function ()
	{
		//sets itself as a div
		var self = new JsWidget();

		jsViews[jsViews.length] = self;

		self.type = "JsDataView";

		self.data = new Array();

		self.istreeview = false;
		self.ismultiple = false;
		self.js_resized = false;

		self.selectedItem = null;

		//content container container
		self.dtcontainer = new JsWidget();
		//listview header container
		self.dtheaderdiv = document.createElement("div");
		//listview body
		self.dtbodydiv = document.createElement("div");

		self.className = "jslv";
		self.dtcontainer.style.position = "relative";
		self.dtcontainer.style.overflow = "auto";
		self.dtcontainer.style.width = "100%";
		self.dtcontainer.style.height = "100%";
		self.dtcontainer.js_parent = self.js_parent;
		self.dtheaderdiv.className = "jslvheaderdiv";

		self.dtheaderdiv.style.position = "relative";
		self.dtheaderdiv.style.height = 24;
		self.dtheaderdiv.style.top = 0;
		self.dtheaderdiv.style.whiteSpace = "nowrap";
		self.dtheaderdiv.style.padding = 0;

		self.appendChild(self.dtheaderdiv);
		self.appendChild(self.dtcontainer);
		self.dtcontainer.appendChild(self.dtbodydiv);

		self.dtheaderdiv.js_parent = self.js_parent;
		self.dtbodydiv.js_parent = self.js_parent;

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
			if (!isNaN(parseInt(self.dtheaderdiv.style.width)))
				self.dtheaderdiv.style.width = parseInt(self.dtheaderdiv.style.width) + headerWidth + correction_factor;
			else
				self.dtheaderdiv.style.width = headerWidth + correction_factor;

			self.dtbodydiv.style.width = self.dtheaderdiv.style.width;

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
			arrow.col = self.dtheaderdiv.childNodes.length;

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
			handler_img.col = self.dtheaderdiv.childNodes.length;
			handler_img.onmousedown = self.beginResize;

			handler_img.js_parent = self.js_parent;

			header.handler = handler_img;

			header.appendChild(handler_img);

			header.objparent = self;
			header.label.objparent = self;
			header.col = self.dtheaderdiv.childNodes.length;
			header.label.col = self.dtheaderdiv.childNodes.length;


			if (!jsCallback || typeof(jsCallback) != 'function')
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
				header.icon.col = self.dtheaderdiv.childNodes.length;
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

			self.dtheaderdiv.appendChild(header);
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

			var width = parseInt(self.dtheaderdiv.childNodes[colIndex].style.width);
			var old_width = parseInt(self.dtheaderdiv.style.width);

			self.dtheaderdiv.style.width = old_width - width - correction_factor;

			self.dtheaderdiv.removeChild(self.dtheaderdiv.childNodes[colIndex]);

			for (var js_i=colIndex; js_i< self.dtheaderdiv.childNodes.length; js_i++)
			{
				var header = self.dtheaderdiv.childNodes[js_i];
				if (header.icon)
					header.icon.col = js_i;
				header.col = js_i;
				header.label.col = js_i;
				header.handler.col = js_i;
			}
		};

		self.uplsvsort = function(a,b)
		{
			var value_a = strtoascii(a[js_scol]);
			var value_b = strtoascii(b[js_scol]);

			if (value_a.indexOf("/") != -1 && value_a.indexOf("/") <= 4)
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
			var value_a = strtoascii(a[js_scol]);
			var value_b = strtoascii(b[js_scol]);

			if (value_a.indexOf("/") != -1 && value_a.indexOf("/") <= 4)
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
			if (!self.js_resized)
			{
				if (jsRealTarget.nodeType == 3)
				{
					js_scol = jsRealTarget.parentNode.col;
				}
				else
				{
					js_scol = jsRealTarget.col;
				}

				for (var js_i=0;js_i<self.dtheaderdiv.childNodes.length;js_i++)
					self.dtheaderdiv.childNodes[js_i].arrow.src=jsimages_path + "blank.gif";

				mark = self.dtheaderdiv.childNodes[js_scol].arrow;

				self.jslvOrder(js_scol);
			}

			self.js_resized = false;

		};

		self.jslvOrder = function(col)
		{
			var col;

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

			var tmp_data = self.data;

			if (tmp_data.length)
			{
				for(var js_columns in tmp_data)
				{
					var js_i_start = js_columns;
					var indx = tmp_data[js_columns].length;
					break;
				}

				for (var js_i = js_i_start, js_cn = 0; js_i < tmp_data.length; js_i++, js_cn++)
				{
					if(self.dtbodydiv.childNodes[js_cn] != undefined)
						tmp_data[js_i][indx] = self.dtbodydiv.childNodes[js_cn];
				}

				tmp_data.sort(func);
				self.data.sort(func);

				for (var js_i in tmp_data)
					self.dtbodydiv.appendChild(tmp_data[js_i][indx]);
			}

			//self.loadData();
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

		self.resizeMove = function(e)
		{
			if (!e) var e = window.event;

			if (lstView)
			{
				if (e.clientX)
					endXpos = (e.clientX + document.body.scrollLeft);
				else
					endXpos = (e.pageX + document.body.scrollLeft);

				size = parseInt(endXpos) - parseInt(beginXpos);

				col_width = parseInt(lstView.dtheaderdiv.childNodes[colIndex].style.width);
				list_width = parseInt(lstView.dtheaderdiv.style.width);

				if ((col_width + size)>10)
				{
					lstView.dtheaderdiv.childNodes[colIndex].style.width = (col_width + size);
					lstView.dtheaderdiv.style.width = (list_width + size);
				}

				beginXpos = endXpos;
				return false;
			}
		};

		self.setAllColSizes = function(obj)
		{
			var obj;

			for (var js_i =0; js_i<obj.dtbodydiv.childNodes.length;js_i++)
			{
				if (obj.dtbodydiv.childNodes[js_i])
				{
					tmpobj = obj.dtbodydiv.childNodes[js_i].childNodes[colIndex];
					tmpobj.style.width = parseInt(self.dtheaderdiv.childNodes[colIndex].style.width);

					tmpobj.parentNode.style.width = parseInt(self.dtheaderdiv.style.width);
					tmpobj.parentNode.parentNode.style.width = parseInt(self.dtheaderdiv.style.width);
				}
			}
		};

		self.endResize = function()
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
			self.dtheaderdiv.style.left = (self.dtcontainer.scrollLeft) * -1;
			if(self.offsetHeight > 24)
				self.dtcontainer.style.height = parseInt(self.offsetHeight) - 24;
		};

		//scroll with fixed header
		self.dtcontainer.setEvent("scroll",self.adjustlvheader);

		//loads a bi-dimensional array
		self.loadData = function (tabular_data)
		{
			if (tabular_data)
				self.data = tabular_data;
			//believe-me: this is the fastest way to create data that is not dynamic
			var data = new Array();

			//for (var js_i=0; js_i< self.data.length; js_i++)
			for (var js_i in self.data)
			{
				data.push("<div class=jslvitensdiv onmousedown='setDataViewSelectedItem(this)'>");

				//for (var js_j=0; js_j< self.data[js_i].length; js_j++)
				for (var js_j in self.data[js_i])
				{
					data.push("<div class=jslvitemcelldiv style='width:"+self.dtheaderdiv.childNodes[js_j].style.width+"; white-space:nowrap; position:relative; height:24; padding:5px 0px 0px 5px; overflow:hidden; float:left;'>" + self.data[js_i][js_j] + "</div>");
				}

				data.push("</div>");
			}

			newdata = data.join("");

			self.dtbodydiv.innerHTML = newdata;
		};

		self.clearData = function()
		{
			self.data = new Array();
			self.dtbodydiv.innerHTML = "";
			self.selectedItem = null;
		};

		return self;
	};

	//external function, since this object is not full OO
	function setDataViewSelectedItem(obj)
	{
		if (obj.parentNode.parentNode.parentNode.selectedItem)
			setClassForDataViewDeselectedItem(obj.parentNode.parentNode.parentNode.selectedItem);

		obj.parentNode.parentNode.parentNode.selectedItem = obj;

			setClassForDataViewSelectedItem(obj);
	}

	function setClassForDataViewSelectedItem(obj)
	{
		for (var js_i in obj.childNodes)
		{
			obj.childNodes[js_i].className = "jslvitemcelldivselected";
			if (obj.childNodes[js_i].childNodes && obj.childNodes[js_i].childNodes.length > 0 && obj.childNodes[js_i].childNodes[0].nodeName == "A")
				obj.childNodes[js_i].childNodes[0].className = "jslvitemcelldivselected";
		}
	}

	function setClassForDataViewDeselectedItem(obj)
	{
		for (var js_i in obj.childNodes)
		{
			obj.childNodes[js_i].className = "jslvitemcelldiv";
			if (obj.childNodes[js_i].childNodes && obj.childNodes[js_i].childNodes.length > 0 && obj.childNodes[js_i].childNodes[0].nodeName == "A")
				obj.childNodes[js_i].childNodes[0].className = "jslvitemcelldiv";
		}
	}

	//Variaveis globais acessiveis pelas funcoes de resize das colunas
	var beginXpos;
	var endXpos;
	var colIndex = null;
	var lstView = null;