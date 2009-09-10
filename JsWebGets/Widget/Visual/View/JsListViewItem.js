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
	JsListViewItem = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsListViewItem";
		self.name = name;

		//could not get rid of it! I can't order directly the childNodes array
		self.childList = new Array();
		self.cells = new Array();

		self.lvitensdiv = document.createElement("div");
		self.lvbodydiv = document.createElement("div");

		self.lvbodydiv.type = "JsListViewItemBody";

		self.className = "jslvitemdiv";
		self.style.position = "relative";
		self.style.whiteSpace = "nowrap";
		self.lvitensdiv.className = "jslvitensdiv";
		self.lvitensdiv.style.clear = "both";
		self.lvbodydiv.className = "jslvbodydiv";
		self.lvbodydiv.style.clear = "both";

		self.lvitensdiv.js_parent = self.js_parent;
		self.lvbodydiv.js_parent = self.js_parent;

		self.appendChild(self.lvitensdiv);
		self.appendChild(self.lvbodydiv);

		//this is changed later, when itens are added (needed for Firefox Drag'n'drop
		self.lvitensdiv.style.height = 0;

		self.arrow_img = document.createElement("img");
		self.arrow_img.style.position = "relative";
		self.arrow_img.style.top = 4;
		self.arrow_img.style.width = 16;
		self.arrow_img.style.height = 16;
		self.arrow_img.src = jsimages_path + "blank.gif";

		self.level = 0;

		//Add an item to a listviewitem. If item is of type listviewitem, its added as a child;
		//otherwise it's a cell of the listviewitem row
		//If you wish to add a listviewitem for the construction of a treeview, use the method as bellow
		self.addItem = function(js_listviewitem_obj,selected){};
		//If you wish to add another object into a listviewitem cell, use the method as bellow
		self.addItem = function(any_js_Obj){};
		//If you wish to add plain text, use the method as bellow
		self.addItem = function(your_string,your_icon,is_editable,is_numeric, is_float){};

		self.addItem = function()
		{
			if (arguments[0].type == "JsListViewItem")
			{
				var obj = arguments[0];
				self.childList[self.childList.length] = obj;

				var obj = arguments[0];
				obj.parent = self;
				obj.parentIndex = self.childList.length;
				obj.listview = self.listview;
				obj.level = self.level + 1;

				self.listview.istreeview = true;
				self.lvbodydiv.style.visibility="visible";
				self.lvbodydiv.style.display="block";
				self.setopen = true;
				//sets if childs are visible or not when listview is a treeview
				self.arrow_img.src = jsimages_path + "trv_minus.gif";

				self.listview.lastInsertedItem = arguments[0];

				self.lvitensdiv.childNodes[0].label.style.top = 0;
				if (self.lvitensdiv.childNodes[0].icon)
					self.lvitensdiv.childNodes[0].icon.style.top = -1;
				if (self.lvitensdiv.childNodes[0].icon)
					self.lvitensdiv.childNodes[0].insertBefore(self.arrow_img,self.lvitensdiv.childNodes[0].icon);
				else 
					self.lvitensdiv.childNodes[0].insertBefore(self.arrow_img,self.lvitensdiv.childNodes[0].label);

				self.lvbodydiv.appendChild(obj);

				if (arguments[1])
					obj.setSelected();
			}
			else if (arguments[0].type)
			{
				var obj = arguments[0];

				var index = self.lvitensdiv.childNodes.length;

				obj.style.width = self.listview.lvheaderdiv.childNodes[index].style.width;
				obj.className = "jslvitemcelldiv";
				obj.style.whiteSpace = "nowrap";
				obj.style.position = "relative";
				//obj.style.height = 24;
				obj.style.padding =  "0px 0px 0px 5px";
				obj.style.overflow = "hidden";

				if (browserType=="ie")
					obj.style.styleFloat = "left";
				else 
					obj.style.cssFloat = "left";

				self.lvitensdiv.appendChild(obj);

				self.cells[index] = obj;

				obj.lstitemparent = self;

				for (var js_i=0; js_i<self.lvitensdiv.childNodes.length;js_i++)
				{
					if (parseInt(obj.style.height) >= parseInt(self.lvitensdiv.childNodes[js_i].style.height))
						self.lvitensdiv.childNodes[js_i].style.height = obj.style.height;
					else 
						obj.style.height = self.lvitensdiv.childNodes[js_i].style.height;
				}

				if (self.listview.selectedItem == self)
					self.setSelected();
			}
			else
			{
				var jslvitem = new JsLabel();
				jslvitem.setValue(arguments[0]);

				jslvitem.setHeight(24);

				jslvitem.label.style.top = 5;

				jslvitem.setClass("jslvitemcelldiv");

				jslvitem.style.whiteSpace = "nowrap";
				jslvitem.style.position = "relative";
				jslvitem.style.height = 24;
				jslvitem.style.padding =  "0px 0px 0px 5px";
				jslvitem.style.overflow = "hidden";

				if (browserType=="ie")
					jslvitem.style.styleFloat = "left";
				else 
					jslvitem.style.cssFloat = "left";

				if (arguments[1]) jslvitem.setIcon(arguments[1]);
				if (arguments[2]) jslvitem.setEditable();
				if (arguments[3]) jslvitem.setNumeric();
				if (arguments[4]) jslvitem.setFloat();

				if (browserType=="ie")
				{
					jslvitem.label.style.top = 5;
					if (arguments[1])
					{
						jslvitem.icon.style.top = 3;
						jslvitem.label.style.top = 3;
					}
				}
				else 
				{
					if (arguments[1])
						jslvitem.icon.style.top = 3;
					jslvitem.label.style.top = 5;
				}

				var index = self.lvitensdiv.childNodes.length;

				self.lvitensdiv.appendChild(jslvitem);
				self.cells[index] = jslvitem;

				if (self.listview)
				{
					self.lvitensdiv.childNodes[index].style.width = self.listview.lvheaderdiv.childNodes[index].style.width;
					self.lvitensdiv.style.width = self.listview.lvheaderdiv.style.width;

					if (self.listview.istreeview && index == 0)
					{
						jslvitem.label.style.top = 0;
						if (arguments[1])
							jslvitem.icon.style.top = -1;
						if (jslvitem.icon)
							jslvitem.insertBefore(self.arrow_img,jslvitem.icon);
						else 
							jslvitem.insertBefore(self.arrow_img,jslvitem.label);

						for (var js_i=0;js_i<self.level;js_i++)
						{
							var blank_img = document.createElement("img");
							blank_img.src = jsimages_path + "blank.gif";
							blank_img.lstitemparent = self;
							if (arguments[2])
								blank_img.parentObj = jslvitem;

							blank_img.style.position = "relative";
							blank_img.style.width = 16;
							blank_img.style.height = 16;
							jslvitem.insertBefore(blank_img,self.arrow_img);
							self.arrow_img.src = jsimages_path + "blank.gif";
						}
					}
				}

				for (var js_i=0; js_i<self.lvitensdiv.childNodes.length;js_i++)
				{
					if (parseInt(jslvitem.style.height) < parseInt(self.lvitensdiv.childNodes[js_i].style.height))
						jslvitem.style.height = self.lvitensdiv.childNodes[js_i].style.height;
				}

				jslvitem.lstitemparent = self;
				jslvitem.js_parent = self.js_parent;
				jslvitem.label.lstitemparent = self;
				jslvitem.label.js_parent = self.js_parent;
				if (arguments[1])
				{
					jslvitem.icon.lstitemparent = self;
					jslvitem.icon.js_parent = self.js_parent;
				}

				if (self.listview.selectedItem == self)
					self.setSelected();
			}

			for (var js_i=0; js_i<self.lvitensdiv.childNodes.length;js_i++)
			{
				if (parseInt(self.lvitensdiv.style.height) < parseInt(self.lvitensdiv.childNodes[js_i].style.height))
				{
					self.lvitensdiv.style.height = self.lvitensdiv.childNodes[js_i].style.height;
				}
			}
		};

		self.delItem = function()
		{
			if (arguments[0].type == "JsListViewItem")
			{
				self.lvbodydiv.removeChild(arguments[0]);

				for (var js_i in self.childList)
				{
					if (self.childList[js_i] == arguments[0])
					{
						self.childList.splice(js_i,1);
						break;
					}
				}
			}
		};

		self.getValue = function()
		{
			var values = new Array();
			for (var js_i=0;js_i<self.lvitensdiv.childNodes.length; js_i++)
				values[js_i] = self.lvitensdiv.childNodes[js_i].getValue();

			if (self.listview.istreeview)
			{
				js_i = values.length;
				values[js_i] = new Array();
				for (var js_j=0;js_j<self.childList.length; js_j++)
					values[js_i][js_j] =  self.childList[js_j].getValue();
			}

			return values;
		};

		self.expandTreeNode = function(e)
		{
			if (self.childList.length > 0)
			{
				if (self.setopen)
				{
					self.lvbodydiv.style.visibility = "hidden";
					self.lvbodydiv.style.display = "none";
					self.setopen = false;
					self.arrow_img.src = jsimages_path + "trv_plus.gif";
				}
				else
				{
					self.lvbodydiv.style.visibility = "visible";
					self.lvbodydiv.style.display = "block";
					self.setopen = true;
					self.arrow_img.src= jsimages_path + "trv_minus.gif";
				}
			}
		};

		self.setMarked = function()
		{
			for (var js_i in self.lvitensdiv.childNodes)
				self.lvitensdiv.childNodes[js_i].className = "jslvitemcelldivmarked";

			var js_exists = false;
			for (var js_j=0;js_j<self.listview.selectedItens.length;js_j++)
			{
				if (self.listview.selectedItens[js_j] == self)
					js_exists = true;

			}
			if (!js_exists)
				self.listview.selectedItens[self.listview.selectedItens.length] = self;
		};

		self.setUnMarked = function()
		{
			for (var js_i in self.lvitensdiv.childNodes)
				self.lvitensdiv.childNodes[js_i].className = "jslvitemcelldiv";
		};

		self.setSelected = function()
		{
			currentItem = self.listview.selectedItem;
			self.listview.lastSelectedItem = self.listview.selectedItem;

			if (jsCtrlKey && self.listview.ismultiple)// && !self.listview.istreeview)
			{
				if (self == currentItem)
				{
					currentItem.setMarked();
					self.setUnMarked();
					self.listview.selectedItem = null;

					for (var js_j=0;js_j<self.listview.selectedItens.length;js_j++)
					{
						if (self.listview.selectedItens[js_j] == self)
						{
							self.listview.selectedItens.splice(js_j,1);
							break;
						}
					}

				}
				else
				{
					self.listview.selectedItem = self;
					self.listview.selectedItens[self.listview.selectedItens.length] = self;
					if (currentItem)
						currentItem.setMarked();
					for (var js_i in self.lvitensdiv.childNodes)
						self.lvitensdiv.childNodes[js_i].className = "jslvitemcelldivselected";
				}
			}
			else if (jsShiftKey && currentItem && self.listview.ismultiple)// && !self.listview.istreeview)
			{
				//need to make t work 100% with treeviews! This will be tought...
				currentItem.setMarked();

				for (var js_i in currentItem.childList)
				{
					if (currentItem.childList[js_i] != self)
					{
						currentItem.childList[js_i].setMarked();
					}
					else 
						break;
				}

				if (self.parentIndex > currentItem.parentIndex)
				{
					var from = currentItem.parentIndex;
					var to = self.parentIndex;
				}
				else
				{
					var from = self.parentIndex;
					var to = currentItem.parentIndex;
				}

				for (js_i = from; js_i < to; js_i++)
				{
					currentItem.parent.childList[js_i].setMarked();
				}

				for (var js_i in self.lvitensdiv.childNodes)
					self.lvitensdiv.childNodes[js_i].className = "jslvitemcelldivselected";

				self.listview.selectedItem = self;

				self.listview.selectedItens[self.listview.selectedItens.length] = self;
			}
			else
			{
				for (var js_j=0;js_j<self.listview.selectedItens.length;js_j++)
				{
					currentItem = self.listview.selectedItens[js_j];
					currentItem.setUnMarked();
				}
				self.listview.selectedItens = new Array();

				for (var js_i=0;js_i<self.lvitensdiv.childNodes.length;js_i++)
					self.lvitensdiv.childNodes[js_i].className = "jslvitemcelldivselected";

				self.listview.selectedItem = self;

				self.listview.selectedItens[self.listview.selectedItens.length] = self;
			}
		};

		self.setUnselected = function()
		{
			currentItem = self.listview.selectedItem;

			if (currentItem)
			{
				for (var js_i in currentItem.lvitensdiv.childNodes)
					currentItem.lvitensdiv.childNodes[js_i].className = "jslvitemcelldiv";
			}

			self.listview.selectedItem = null;
		};

		self.listviewitemSelect = function(jsEvent)
		{
			if (browserType == "ie" && jsEventType == "contextmenu")
				jsEvent.returnValue = false;

			if ((self.listview.selectedItens.length > 1  || (jsCtrlKey || jsShiftKey)) && jsEventType == "mousedown")
				return;

			if (activehidden && activehidden.hideActiveHidden)
				activehidden.hideActiveHidden(jsEvent);

			self.setSelected();

			return false;
		};

		self.setDropTarget = function(jscallback)
		{
			var index = jsDropTargets.length;
			jsDropTargets[index] = Array();
			jsDropTargets[index][0] = self;
			jsDropTargets[index][1] = jscallback;

			self.setEvent("mouseover",
			function()
			{
				if (jsDraggedItens)
				{
					for (var js_i in self.lvitensdiv.childNodes)
					{
						self.lvitensdiv.childNodes[js_i].oldclassName = self.lvitensdiv.childNodes[js_i].className;
						self.lvitensdiv.childNodes[js_i].className = "jslvitemcelldivgragover";
					}
				}
			}
			);

			self.setEvent("mouseout",
			function()
			{
				for (var js_i in self.lvitensdiv.childNodes)
				{
					if (self.lvitensdiv.childNodes[js_i].oldclassName)
						self.lvitensdiv.childNodes[js_i].className = self.lvitensdiv.childNodes[js_i].oldclassName;
					self.lvitensdiv.childNodes[js_i].oldclassName = null;
				}
			}
			);
		};

		self.setEvent("mousedown",self.listviewitemSelect);
		self.setEvent("click",self.listviewitemSelect);
		self.setEvent("contextmenu",self.listviewitemSelect);

		self.setMenu = function(obj)
		{
			for (var js_i=0;js_i<self.cells.length;js_i++)
			{
				self.cells[js_i].setMenu(obj);
			}
			self.setEvent("contextmenu", obj.showContextMenu);
		};

		if (browserType == "ie")
		{
			self.arrow_img.attachEvent("onclick", self.expandTreeNode);
		}
		else
		{
			self.arrow_img.addEventListener("click", self.expandTreeNode, false);
		}

		return self;
	};