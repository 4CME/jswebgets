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
	JsLabel = function ()
	{
		//sets itself as a div
		var self = new JsWidget();

		self.type = "JsLabel";

		self.className = "jslabel";
		self.style.whiteSpace = "nowrap";
		self.style.overflow = "hidden";

		self.is_editable = false;
		self.is_numeric = false;
		self.is_float = false;

		self.label = document.createElement("label");
		self.label.style.whiteSpace = "nowrap";
		self.label.style.position = "relative";
		self.label.style.width = "100%";
		self.label.js_parent = self.js_parent;

		self.label.onselectstart = new Function ("return false");
		self.label.onmousedown = new Function ("return false");

		self.icon = null;

		self.appendChild(self.label);

		self.setHeight = function(value)
		{
			if (browserType=="ie")
				var halffontsize = 6;
			else 
				var halffontsize = 7;
			self.style.height = value;
			if (self.style.fontSize)
				halffontsize = (parseInt(self.style.fontSize)/3) * 2;
			self.label.style.top = ((value)/2) - halffontsize;
		};

		self.setAttribute = function(name, value)
		{
			eval("self." + name + " = \"" + value + "\"");
			eval("self.label." + name + " = \"" + value + "\"");
			if (self.icon)
				eval("self.icon." + name + " = \"" + value + "\"");
		};

		self.setIcon = function (iconsrc,align)
		{
			if (!self.icon)
				self.icon = document.createElement("img");

			self.icon.js_parent = self.js_parent;

			self.icon.style.position = "relative";

			if (iconsrc.indexOf('.png') != -1 && browserType=="ie")
			{
				self.icon.src = jsimages_path +"blank.gif";
				self.icon.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+iconsrc+"')";
			}
			else 
			{
				self.icon.src = iconsrc;
			}

			if (!align || align=="left")
			{
				align = "left";
				self.label.innerHTML = "&nbsp;" + self.value;
				self.insertBefore(self.icon,self.label);
			}
			else 
			{
				self.appendChild(self.icon);
			}

			self.icon.posalign = align;
			self.icon.style.verticalAlign = "middle";

			self.icon.onselectstart = new Function ("if (jsMoved){return false}");
			self.icon.onmousedown = new Function ("if (jsMoved){return false}");
		};

		self.setEditable = function (jsEvent)
		{
			self.is_editable = true;
			self.setEvent("dblclick", self.editable);
		};

		self.setNumeric = function ()
		{
			self.is_numeric = true;
		};

		self.setFloat = function ()
		{
			self.is_float = true;
		};

		self.editable = function ()
		{
			tempObj = new JsLineEdit();
			tempObj.setValue(self.getValue());
			if (self.lstitemparent)
				tempObj.setAttribute("lstitemparent",self.lstitemparent);

			tempObj.setEvent("blur",self.endeditDblClick);
			tempObj.setEvent("keypress",self.endeditDblClick);
			tempObj.setEvent("keydown",new Function("return"));
			tempObj.setEvent("mousemove",new Function("return"));
			tempObj.setEvent("mouseover",new Function("return"));
			tempObj.setEvent("mousedown",new Function("return"));
			tempObj.setEvent("mouseup",new Function("return"));
			tempObj.setEvent("click",new Function("return"));
			tempObj.parentWidget = self;
			tempObj.parentWidget = self;

			tempObj.setWidth("");

			if (self.icon)
				self.removeChild(self.icon);
			self.removeChild(self.label);
			self.appendChild(tempObj);

			if (self.is_numeric)
				tempObj.setNumeric();

			if (self.is_float)
				tempObj.setFloat();

			tempObj.input.focus();
			tempObj.input.select();
		};

		self.endeditDblClick = function(jsEvent)
		{
			if ((jsEvent.keyCode == 27 || jsEvent.keyCode == 13 || jsEvent.keyCode == 9) || jsEventType=="blur")
			{
				jsTarget.unsetEvent("blur",self.endeditDblClick);
				jsTarget.unsetEvent("keypress",self.endeditDblClick);

				if (jsTarget.parentNode == self)
					self.removeChild(jsTarget);

				if (self.icon && self.icon.posalign != "right")
					self.appendChild(self.icon);

				self.appendChild(self.label);

				if (self.icon && self.icon.posalign == "right")
					self.appendChild(self.icon);

				if (jsEvent.keyCode == 27)
					return false;

				//runs onchange events
				if (self.getValue() != jsTarget.getValue() && self.events['change'])
				{
					for (var js_i=0; js_i<self.events['change'].length;js_i++)
					{
						if (self.events['change'][js_i]()===false) return false;
					};
				};

				self.setValue(jsTarget.getValue());

				//check if it should go to the next cell
				var js_next = false;
				//check if we have a next cell that is editable
				var js_gotit = false;

				//tab to the next editable label on jslistviewitem
				if (jsEvent.keyCode == 9 || jsEvent.keyCode == 13)
				{
					//check if parent is a listviewitem
					if (self.parentNode.js_parent.type=="JsListViewItem")
					{
						if (jsShiftKey)
						{
							//loops for all cells, looking for itself
							for (var js_i = (self.parentNode.js_parent.cells.length - 1); js_i >=0 ;js_i--)
							{
								//if go to next is true, check if the next is editable
								if (js_next)
								{
									if (self.parentNode.js_parent.cells[js_i].is_editable)
									{
										self.parentNode.js_parent.cells[js_i].editable();
										//we got an editable
										js_gotit = true;
										//got out of the loop
										break;
									}

								}

								if (self.parentNode.js_parent.cells[js_i]==self)
								{
									js_next = true;
								}
							}

							//if we don't have an editable cell on this listviewitem
							//we gotta check the next listviewitem so we tab to it's
							//editable cell
							if (!js_gotit)
							{
								var lvlength = self.parentNode.js_parent.listview.childList.length;

								for (var js_i = (self.parentNode.js_parent.listview.childList.length - 1); js_i >=0 ;js_i--)
								{
									if (js_i < (lvlength-1) && self.parentNode.js_parent.listview.childList[js_i]==self.parentNode.js_parent)
									{
										self.parentNode.js_parent.listview.childList[parseInt(js_i)-1].setSelected();

										for (var js_j = (self.parentNode.js_parent.listview.childList[parseInt(js_i)-1].cells.length - 1); js_j >=0 ;js_j--)
										{
											if (self.parentNode.js_parent.listview.childList[parseInt(js_i)-1].cells[js_j].is_editable)
											{
												self.parentNode.js_parent.listview.childList[parseInt(js_i)-1].cells[js_j].editable();
												//we got an editable
												js_gotit = true;
												//got out of the loop
												break;
											}
										}

										break;
									}
								}
							}
						}
						else
						{
							//loops for all cells, looking for itself
							for (var js_i in self.parentNode.js_parent.cells)
							{
								//if go to next is true, check if the next is editable
								if (js_next)
								{
									if (self.parentNode.js_parent.cells[js_i].is_editable)
									{
										self.parentNode.js_parent.cells[js_i].editable();
										//we got an editable
										js_gotit = true;
										//got out of the loop
										break;
									}

								}

								if (self.parentNode.js_parent.cells[js_i]==self)
								{
									js_next = true;
								}
							}

							//if we don't have an editable cell on this listviewitem
							//we gotta check the next listviewitem so we tab to it's
							//editable cell
							if (!js_gotit)
							{
								var lvlength = self.parentNode.js_parent.listview.childList.length;

								for (var js_i in self.parentNode.js_parent.listview.childList)
								{
									if (js_i < (lvlength-1) && self.parentNode.js_parent.listview.childList[js_i]==self.parentNode.js_parent)
									{
										self.parentNode.js_parent.listview.childList[parseInt(js_i)+1].setSelected();

										for (var js_j in self.parentNode.js_parent.listview.childList[parseInt(js_i)+1].cells)
										{
											if (self.parentNode.js_parent.listview.childList[parseInt(js_i)+1].cells[js_j].is_editable)
											{
												self.parentNode.js_parent.listview.childList[parseInt(js_i)+1].cells[js_j].editable();
												//we got an editable
												js_gotit = true;
												//got out of the loop
												break;
											}
										}

										break;
									}
								}
							}
						}
					}
				}
			}
		};

		self.setValue = function (value)
		{
			self.value = value;
			if (self.icon)
				self.label.innerHTML = "&nbsp;" + value;
			else 
				self.label.innerHTML = value;
		};

		self.getValue = function ()
		{
			return self.value;
		};

		self.setMenu = function(obj)
		{
			self.menu = obj;
			self.label.menu = obj;
			if (self.icon)
				self.icon.menu = obj;
			self.setEvent("contextmenu",obj.showContextMenu);
		};

		self.setCursor = function(value)
		{
			self.style.cursor = value;
			self.label.style.cursor = value;
		};

		return self;
	};
