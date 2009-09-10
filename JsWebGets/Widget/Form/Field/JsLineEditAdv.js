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
	JsLineEditAdv = function (name)
	{
		//sets itself as a div
		var self = new JsLineEdit(name);
		self.dc = new JsHTTPRequest();
		self.ws = new JsWebServiceConnector();
		self.listbox = new JsListBox();
		self.listbox.setAttribute("jslineeditadv","true");

		self.type = "JsLineEditAdv";

		//sets if DC or WS should be used
		self.usedc = false;
		self.usews = false;
		self.ws_control = null;
		self.ws_method = null;
		self.wsCallback = function(){};

		//minimum length to perform a search (to increase performance)
		self.minsearchlength	= 3;

		//Some proporties for the objects
		self.input.obj_parent = name;

		//listbox
		self.listbox.parent = name;
		self.listbox.style.position = "absolute";
		self.listbox.style.visibility = "hidden";
		self.listbox.style.display = "block";
		self.listbox.style.width = "100%";
		self.listbox.style.top = "0";
		self.listbox.style.left = "0";
		self.listbox.input.style.width = "100%";
		self.listbox.input.multiple = true;

		//overwrite addEvent
		self.addEvent = function(eventStr)
		{
			if (eventStr != "change")
			{
				if (browserType == "ie")
				{
					self.attachEvent("on" + eventStr, self.execEvent);
				}
				else
				{
					self.addEventListener(eventStr, self.execEvent, false);
				}
			}
		};

		//busca os dados no Servidor
		self.setEvent("keyup",function(jsEvent)
		{
			if (jsEvent.keyCode==37 || jsEvent.keyCode==38 || jsEvent.keyCode==39 || jsEvent.keyCode==40 || jsEvent.keyCode==13)
			{
				return false;
			}

			self.value = null;

			if (self.input.value.length >= self.minsearchlength)
			{
				//sets's the name of the line edit advanced object instance so the handler knows
				//which object on the parent level should receive the list itens
				if (self.usedc)
				{
					if (!self.dc || self.dc.readyState==1 || self.dc.readyState==2 || self.dc.readyState==3)
						self.listbox.clearData();
					self.dc.setFieldValue("leadv_name",self.name);
					self.dc.setFieldValue("searchkey",self.input.value);
					self.dc.postData();
				}
				else if (self.usews)
				{
					if (self.ws.httprequest.readyState==1 || self.ws.httprequest.readyState==2 || self.ws.httprequest.readyState==3)
						self.listbox.clearData();
					var data = "<method>" + self.ws_method + "</method>";
					data += "<searchkey>" + self.input.value + "</searchkey>";

					self.ws.getData(self.ws_control, data, self.wsCallback);
				}
				curr_top = getObjTop(self);

				if (curr_top - document.body.scrollTop + 122 > document.body.clientHeight)
				{
					self.listbox.style.top = curr_top - 100;
				}
				else
				{
					self.listbox.style.top = curr_top + 22;
				}

				self.listbox.style.left = getObjLeft(self);
				self.listbox.style.height = 100;
				self.listbox.style.width = self.offsetWidth;

				if (browserType == "ie")
				{
					self.listbox.input.style.height = 115;
				}
				else
				{
					self.listbox.input.style.height = 100;
				}

				self.style.zIndex = 100000;
				self.listbox.style.zIndex = 100000;

				if (activehidden)// && self.listbox != activehidden)
				{
					if (activehidden.type == "JsMenu")
						hideParentsMenus(activehidden);
					else
					{
						activehidden.style.visibility = "hidden";
						activehidden.style.display = "none";
					}
				}

				if (self.listbox.input.options.length > 0)
				{
					self.listbox.style.visibility = "visible";
					self.listbox.style.display = "block";
				}
				else
				{
					self.listbox.style.visibility = "hidden";
					self.listbox.style.display = "none";
				}

				//activehidden = self.listbox;

				showmenus = false;
			}
			else
			{
				if (!self.dc || self.dc.readyState==1 || self.dc.readyState==2 || self.dc.readyState==3)
					self.listbox.clearData();
				self.listbox.style.visibility = "hidden";
				self.listbox.style.display = "none";
			}
		});

		//Hide item list on blur
		self.setEvent("blur",function(jsEvent)
		{
			self.listbox.style.visibility = "hidden";
			self.listbox.style.display = "none";
		});

		//Seleciona itens no menu
		self.setEvent("keyup",function(jsEvent)
		{
			if (jsEvent.keyCode==13)
			{
				selectedItem = self.listbox.getValue();
				self.setValue(selectedItem[0][0],selectedItem[0][1]);
				self.listbox.style.visibility="hidden";
				self.listbox.resetSelecteds();

				if (self.events["change"])
				{
					for (var js_i=0;js_i<self.events["change"].length;js_i++)
					{
						//if the programmer shows an alert, then we lose it all and
						//need to stop to avoid any error on IE (of course it would be in IE, any doubts?)
						self.events["change"][js_i](jsEvent);
						if (!self.events["change"])
						{
							if (browserType=="ie")
								jsEvent.returnValue = false;
							else
								jsEvent.preventDefault();
							break;
						};
					};
				}

			}
			if (jsEvent.keyCode==40 || jsEvent.keyCode==38)
			{
				selIndex = self.listbox.input.options.selectedIndex;

				if (jsEvent.keyCode==40)
				{
					selIndex = parseInt(selIndex) + 1;
				}
				else
				{
					selIndex = parseInt(selIndex) -1;
				}

				if (selIndex < self.listbox.input.options.length && selIndex > -1)
				{
					self.listbox.input.options.selectedIndex = selIndex;
				}
			}
		});

		//when you choose with your mouse
		self.listbox.setEvent("change",function(jsEvent)
		{
			selectedItem = self.listbox.getValue();
			self.setValue(selectedItem[0][0],selectedItem[0][1]);
			self.listbox.style.visibility="hidden";
			self.listbox.resetSelecteds();
			self.input.focus();
		});

		//WS result handling
		self.setCallback = function(value)
		{
			self.wsCallback = value;
		};

		//value methods
		self.getValue = function()
		{
			js_arr = new Array();
			js_arr[0] = self.value;
			js_arr[1] = self.input.value;
			return js_arr;
		};

		self.setValue = function(value,label)
		{
			self.value = value;
			self.input.value = label;
		};

		self.clearData = function()
		{
			self.listbox.clearData();
		};

		//config methods
		self.setMinSearchLength = function(value)
		{
			self.minsearchlength = value;
		};

		self.setHandler = function(value)
		{
			self.usedc = true;
			self.usews = false;
			self.dc.setHandler(value);
		};

		self.bind = function(value)
		{
			self.usedc = false;
			self.usews = true;
			self.ws.bind(value);
		};

		self.setWSMethod = function (value)
		{
			self.ws_method = value;
		};

		self.setWSControl = function (value)
		{
			self.ws_control = value;
		};

		//Add an item to the listbox.
		self.addItem = function(value, label, icon, selected)
		{
			index = this.listbox.addItem(value, label, icon, selected);
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject = function()
		{
			self.appendChild(self.input);
			document.body.appendChild(self.listbox);
		};

		self.buildObject();

		return self;
	};