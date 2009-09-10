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
	JsMenu = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsMenu";

		self.className	= "jsmenu";
		self.style.overflow = "hidden";
		self.style.visibility = "hidden";
		self.style.position = "absolute";
		self.style.zIndex = 100000;
		self.style.top = 0;
		self.style.left = 0;

		self.label = new JsMenuItem(self.name + "_label");
		self.label.parent = self;

		self.menu = self;

		document.body.appendChild(self);

		self.addDiv = function()
		{
			self.appendChild(document.createElement("hr"));
			if (isNaN(parseInt(self.style.height)))
			{
				if (browserType=="ie")
					self.style.height = 18;
				else 
					self.style.height = 12;
			}
			else
			{
				if (browserType=="ie")
					self.style.height = parseInt(self.style.height) + 18;
				else 
					self.style.height = parseInt(self.style.height) + 12;
			}
		};

		self.setIcon = function(value)
		{
			self.label.setIcon(value);
		};

		self.setAsMenuBar = function()
		{
			if (self.label.icon.parentNode == self.label)
				self.label.removeChild(self.label.icon);
			self.label.className = "jsmenubaritem";
			self.label.style.padding = "3px 10px 3px 10px";
			self.label.style.whiteSpace = "nowrap";
			if (browserType=="ie")
				self.label.style.styleFloat = "left";
			else 
				self.label.style.cssFloat = "left";

			self.label.setEvent("click",self.showBarMenu);
			self.label.setMenu(self);

			self.label.label.style.position = "relative";
			self.label.label.style.top = "0";
		};

		self.addItem = function(obj)
		{
			obj.contextmenu = self.contextmenu;
			obj.parent = self;
			if (obj.type == "JsMenu")
			{
				obj.label.setEvent("mouseover",self.showSubMenu);
				obj.label.setMenu(obj);
				obj.label.setAsSubMenu();

				self.appendChild(obj.label);
			}
			else
			{
				self.appendChild(obj);
				if (obj.type == "JsMenuItem")
				{
					obj.setEvent("click",obj.setItemMouseOut);
					obj.setEvent("mouseover",self.hideActiveSubMenu);
					obj.setEvent("click",self.hideActiveHidden);
					obj.parent = self;
					obj.label.parent = self;
					if (obj.icon)
						obj.icon.parent = self;
					if (obj.arrow)
						obj.arrow.parent = self;
				}
				else
				{
					obj.setAttribute("donthidemenu","true");
				}
			}

			if (obj.type=="JsMenu")
				var totalwidth = obj.label.label.offsetWidth + 36;
			else 
				var totalwidth = obj.label.offsetWidth + 36;

			if (isNaN(parseInt(self.style.height)))
			{
				self.style.height = 24;
			}
			else
			{
				self.style.height = parseInt(self.style.height) + 24;
			}

			if (isNaN(parseInt(self.style.width)) || totalwidth > parseInt(self.style.width))
			{

				self.style.width = totalwidth;
			}

			for (var js_i in self.childNodes)
			{
				if (self.childNodes[js_i].type == "JsMenu")
					self.childNodes[js_i].label.setWidth(self.style.width);
				else
				{
					if (self.childNodes[js_i].type == "JsMenuItem")
						self.childNodes[js_i].setWidth(self.style.width);
				}
			}
		};


		self.setValue = function(value)
		{
			this.value = value;
			self.label.setValue(value);
		};

		/********************************************
		       General functions for bar menus
		********************************************/

		self.showBarMenu = function(jsEvent)
		{
			menutop = getObjTop(jsTarget) + 20;
			menuleft = getObjLeft(jsTarget);

			if(menuleft + parseInt(jsTarget.menu.style.width) > document.body.clientWidth)
			{
				menuleft = menuleft - parseInt(jsTarget.menu.style.width) + jsTarget.offsetWidth + 20;
			}

			self.showMenu(jsTarget,menutop,menuleft);

			document.onclick = self.hideActiveHidden;
			activehidden = jsTarget.menu;
			showmenus = true;
		};

		/********************************************
		    General functions for context menus
		********************************************/

		self.showContextMenu = function(jsEvent)
		{
			menutop = jsEvent.clientY + document.body.scrollTop;
			menuleft = jsEvent.clientX + document.body.scrollLeft;

			if ((menutop + self.offsetHeight) > parseInt(document.body.clientHeight))
				menutop =  jsEvent.clientY - self.offsetHeight  + document.body.scrollTop;

			if ((menuleft + self.offsetWidth) > parseInt(document.body.clientWidth))
			menuleft = jsEvent.clientX - self.offsetWidth + document.body.scrollLeft;
			self.showMenu(self,menutop,menuleft);
			document.onclick = self.hideActiveHidden;
			activehidden = self;
			showmenus = false;

			if (browserType=="ie")
				jsEvent.returnValue = false;
		};

		/********************************************
		       General functions for sub menus
		********************************************/
		self.showSubMenu = function()
		{
			if (browserType == "ie")
			{
				var menutop = getObjTop(jsTarget);
				var menuleft = getObjLeft(jsTarget) +  jsTarget.offsetWidth - 4;
			}
			else
			{
				var menutop = getObjTop(jsTarget);
				var menuleft = getObjLeft(jsTarget) + jsTarget.offsetWidth - 3;
			};

			if (jsTarget.menu && jsTarget.menu.style.visibility != "visible")
				self.showMenu(jsTarget.parent,menutop,menuleft);

			document.onclick = self.hideActiveHidden;
			activehidden = jsTarget.menu;
			if (activehidden.contextmenu)
				showmenus = false;
			else 
				showmenus = true;
		};

		self.hideActiveSubMenu = function()
		{
			newActive = jsRealTarget.parent;

			if (activehidden && activehidden != newActive)
			{
				activehidden.style.visibility = "hidden";
				activehidden.style.display = "none";
			};

			document.onclick = self.hideActiveHidden;
			activehidden = newActive;
		};

		self.hideParentsMenus = function(obj)
		{
			obj.style.visibility = "hidden";
			obj.style.display = "none";

			if (obj.parent)
				if (obj.parent.type == "JsMenu")
					self.hideParentsMenus(obj.parent);
		};

		/********************************************
		       General functions for all menus
		********************************************/

		self.showMenu = function(obj,menutop,menuleft)
		{
			if (obj.menu)
			{
				document.body.appendChild(self);
				document.body.appendChild(obj.menu);
				if (activehidden && obj.menu != activehidden && obj.menu.parent != activehidden)
				{
					activehidden.style.visibility = "hidden";
					activehidden.style.display = "none";

					if (activehidden.parent && activehidden.parent.type == "JsMenu" && activehidden.parent != obj.menu.parent)
							self.hideParentsMenus(activehidden.parent);
				}

				if (obj.menu)
				{
					obj.menu.style.top = menutop;
					obj.menu.style.left = menuleft;
					obj.menu.style.visibility = "visible";
					obj.menu.style.display = "block";
					obj.menu.style.zIndex = 1000000000;
				}

				if (browserType=="ie")
				{
					selects = document.getElementsByTagName("select");
					for (var js_i=0; js_i<selects.length;js_i++)
					{
						if (!selects[js_i].jslineeditadv)
							selects[js_i].style.visibility = "hidden";
					}
				}
			}
		};

		self.hideActiveHidden = function()
		{
			if (activehidden && !jsRealTarget.donthidemenu)
			{
				if (jsRealTarget.menu != activehidden || (jsRealTarget.menu.contextmenu && jsEventType=="click"))
				{
					activehidden.style.visibility = "hidden";
					activehidden.style.display = "none";

					if (activehidden.parent)
						if (activehidden.parent.type == "JsMenu")
							self.hideParentsMenus(activehidden.parent);

					if (browserType=="ie")
					{
						selects = document.getElementsByTagName("select");
						for (var js_i=0; js_i<selects.length;js_i++)
						{
							if (!selects[js_i].jslineeditadv)
								selects[js_i].style.visibility = "visible";
						}
					}
				}

				document.onclick = self.hideActiveHidden;
				activehidden = jsRealTarget.menu;
				if (!jsRealTarget.menu)
					showmenus = false;
			};
		};

		/********************************************
				  End of External Functions
		********************************************/

		self.setResizable = function()
		{
		};

		self.unsetResizable = function()
		{
		};

		return self;
	};