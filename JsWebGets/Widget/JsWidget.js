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

	//Base for JsWidgets. All should have at least those attributes and methods
	JsWidget = function (name)
	{
		//sets itself as a div
		var self = document.createElement('div');

		//supose we need to move it acoording to a grid?
		//this is the attribute to set
		self.jsGridStep = jsGridStep;

		//sets the type of the Widget
		self.type = "JsWidget";

		//sets the CSS class used
		self.className = "jswidget";

		//sets that this object is a jswebgets object
		self.origin = "jswebgets";

		//tooltip cannot be title
		self.jstooltip = null;

		//unique name
		if (!name)
			name = randomizer();
		self.name = name;

		//js_parent of the object is set as itself
		self.js_parent = self;
		self.js_parent_container = self;

		//used for disable and readonly
		self.input = null;

		//used to get the correct position of a object that is movable
		self.correctX = 0;
		self.correctY = 0;

		self.menu = null;

		//this is used to fix an odd behaviour when dragging and dropping objects
		self.onselectstart = new Function ("if (jsMoved){return false}");
		self.onmousedown = new Function ("if (jsMoved){return false}");

		//the array of events the object receives
		self.events = new Array();

		//this is default to all objects, and don't depend on theme stylesheet
		self.style.overflow = "hidden";

		//the obj used to resize
		self.widgetcorner = document.createElement('div');
		self.widgetcorner.style.width = "10";
		self.widgetcorner.style.height = "10";
		self.widgetcorner.style.border = "1px solid #000000";
		self.widgetcorner.style.bottom = "0px";
		self.widgetcorner.style.right = "0px";
		self.widgetcorner.style.position = "absolute";
		self.widgetcorner.style.backgroundColor = "#00FF00";
		self.widgetcorner.style.zIndex = "10000000";
		self.widgetcorner.style.cursor = "se-resize";

		//still not used...
		self.tabIndex;
		self.accessKey;

		//inherit common things from JsObject
		inherit(self, JsObject);

		//add another object inside of this
		self.addItem = function(obj)
		{
			self.appendChild(obj);
			obj.js_parent_container = self;
		};

		//remove another object from inside of this
		self.delItem = function(obj)
		{
			self.removeChild(obj);
			delete obj;
		};

		//sets an attribute to the object
		self.setAttribute = function(name, value)
		{
			eval("self." + name + " = \"" + value + "\"");
		};

		//sets the Tooltip for the object - Mozilla has a bug that doesn't hide the tooltip
		//when moving from one object to another
		self.setToolTip = function(value)
		{
			if (browserType=="ie")
				self.title = value;
			else
			{
				if (!self.jstooltip)
				{
					self.jstooltip = new JsToolTip();

					self.setEvent("mouseover",showToolTip);
					self.setEvent("mousemove",showToolTip);
					self.setEvent("mouseout",hideToolTip);
					self.setEvent("click",hideToolTip);
					self.setEvent("mousedown",hideToolTip);
					self.setEvent("mouseup",hideToolTip);
				}

				self.jstooltip.setValue(value);
			}

		};

		//sets a Context Menu to the object - right-click menu
		self.setMenu = function(obj)
		{
			self.setEvent("contextmenu",obj.showContextMenu);
			self.menu = obj;
		};

		//method called on any event... Sets a lot of ambient
		//variables usefull on your callbacks.
		//it reads the self.events array and executes
		//the events in there...
		//Internet Explorer does it as FILO and mozilla as FIFO
		//this is why I had fixed that way... also because I gain
		//better control over the Events...
		self.execEvent = function(jsEvent)
		{
			if (browserType=="ie")
			{
				if (!jsEvent)
					jsEvent = window.event;

				jsRealTarget = jsEvent.srcElement;
				if (!jsRealTarget)
					jsRealTarget = self;
				jsTarget = jsRealTarget.js_parent;
			}
			else
			{
				jsRealTarget = jsEvent.target;
				jsTarget = jsEvent.target.js_parent;
			}

			jsEventType = jsEvent.type;

			if (jsEvent.shiftKey)
				jsShiftKey = true;
			else
				jsShiftKey = false;

			if (jsEvent.ctrlKey)
				jsCtrlKey = true;
			else
				jsCtrlKey = false;

			if (jsEvent.altKey)
				jsAltKey = true;
			else
				jsAltKey = false;

			jsEvent.cancelBubble = true;

			if (self.events[jsEventType])
			{
				for (var js_i=0;js_i<self.events[jsEventType].length;js_i++)
				{
					//if the programmer shows an alert, then we lose it all and
					//need to stop to avoid any error on IE (of course it would be in IE, any doubts?)
					self.events[jsEventType][js_i](jsEvent);
					if (!self.events[jsEventType])
					{
						if (browserType=="ie")
							jsEvent.returnValue = false;
						else
							jsEvent.preventDefault();
						break;
					};
				};
			}

			if (activehidden && jsEventType=="click")
			{
				activehidden.hideActiveHidden();
				activehidden = null;
			}

			jsEvent = null;
			jsEventType = null;
			jsRealTarget = null;
			jsTarget = null;
			jsShiftKey = false;
			jsCtrlKey = false;
			jsAltKey = false;

			//return false;
		};

		//Add an Event to the object...
		//this means that when you call an event like click ou dblclick
		//it calls the method above telling it to run the callbacks setted
		//for this event...
		self.addEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				self.attachEvent("on" + eventStr, self.execEvent);
			}
			else
			{
				self.addEventListener(eventStr, self.execEvent, false);
			}
		};

		self.delEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				self.detachEvent("on" + eventStr, self.execEvent);
			}
			else
			{
				self.removeEventListener(eventStr, self.execEvent, false);
			}
		};


		//sets a callback to an event
		self.setEvent = function(eventStr,jscallback)
		{
			if (self.events[eventStr])
			{
				eventindex = self.events[eventStr].length;
			}
			else
			{
				self.events[eventStr] = new Array(); eventindex = 0;
			};
			eventregistered = false;
			for (var js_i in self.events[eventStr])
			{
				if(self.events[eventStr][js_i] == jscallback)
				{
					eventregistered=true;
				};
			}

			if(!eventregistered)
			{
				self.events[eventStr][eventindex] = jscallback;
			}

			if (eventindex == 0)
			{
				self.addEvent(eventStr);
			}
		};

		//removes a callback from the array of callbacks for
		//an event.
		self.unsetEvent = function(eventStr,jscallback)
		{
			for (var js_i in self.events[eventStr])
				if(self.events[eventStr][js_i] == jscallback)
				{
					self.events[eventStr].splice(js_i,1);
					if (self.events[eventStr].length == 0)
					{
						for (var js_j in self.events)
						{
							if (js_j == eventStr)
							{
								self.events.splice(js_j,1);
								if (browserType == "ie")
								{
									self.detachEvent("on" + eventStr, self.execEvent);
								}
								else
								{
									self.removeEventListener(eventStr, self.execEvent, false);
								}
							}
						}
					}
				}
		};

		//sets that the object can receive drops
		//you can pass as argument a Javascript CallBack (called on mouse release)
		//your callback is responsible for handling any instructions you need.
		//so if you have to filter if the object is of certain type,
		//you must do it on your callback
		self.setDropTarget = function(jscallback)
		{
			var index = jsDropTargets.length;
			jsDropTargets[index] = Array();
			jsDropTargets[index][0] = self;
			jsDropTargets[index][1] = jscallback;
		};

		//the object becames draggable... Remember to set a drop target,
		//or nothing will happen
		self.setDraggable = function()
		{
			self.setEvent("mousedown",function ()
			{
				jsDragged = self;

				if (browserType=="ie")
					jsEvent.returnValue = false;
				else
					jsEvent.stopPropagation();

				return false;
			});

			//if it's a complete click, it's not a drag, so I must reset the jsDragged var
			self.setEvent("click", function ()
			{
				jsDragged = null;
				return false;
			});
		};

		self.move = function (jsEvent)
		{
			if (browserType!="ie")
			{
				self.correctX = jsEvent.pageX - getObjLeft(self);
				self.correctY = jsEvent.pageY - getObjTop(self);
			}
			else
			{
				self.correctX = jsEvent.clientX - getObjLeft(self) + self.parentNode.scrollLeft;
				self.correctY = jsEvent.clientY - getObjTop(self) + self.parentNode.scrollTop;
			}

			if (self.js_tempNode)
			{
				cloneY = getObjTop(self) + self.parentNode.scrollTop;
				cloneX = getObjLeft(self) + self.parentNode.scrollLeft;

				if(browserType=="ie" && self.type=="JsDialog" && self.parentNode == document.body)
				{
					cloneY -=1;
					cloneX -=1;
				}

				if(browserType!="ie" && self.type=="JsDialog" && self.parentNode == document.body)
				{
					cloneY -=2;
					cloneX -=2;
				}

				self.js_tempNode.style.top = cloneY;
				self.js_tempNode.style.left = cloneX;
			}

			jsMoved = self;

			if (browserType=="ie")
				jsEvent.returnValue = false;
			else
				jsEvent.stopPropagation();

			return false;
		};

		//sets that the object can be moved around the screen
		//tt will stand still where you release it. just that. just move
		//you may pass a callback to be called when you stop moving around
		self.setMovable = function(jscallback)
		{
			if (jscallback)
				self.jscallback = jscallback;

			self.setEvent("mousedown",self.move);

			//if it's a complete click, it's not a drag, so I must reset the jsDragged var
			self.setEvent("click", function ()
			{
				jsMoved = null;
				return false;
			});
		};

		self.unsetMovable = function()
		{
			self.unsetEvent("mousedown",self.move);
		};

		//Resize widget functions
		self.resize = function (jsEvent)
		{
			if (browserType=="ie")
				jsEvent = window.event;

			self.beginPosX = jsEvent.clientX;
			self.beginPosY = jsEvent.clientY;
			jsResized = self;

			jsEvent.cancelBubble = true;

			return false;
		};

		if (browserType=="ie")
		{
			self.widgetcorner.attachEvent("onmousedown", self.resize);
			self.widgetcorner.attachEvent("onclick", function ()
			{
				jsResized = null;
				return false;
			});
		}
		else
		{
			self.widgetcorner.addEventListener("mousedown", self.resize, false);
			self.widgetcorner.addEventListener("click", function ()
			{
				jsResized = null;
				return false;
			}, false);
		}

		self.setResizable = function(jscallback)
		{
			if (jscallback)
				self.resize_jscallback = jscallback;

			self.appendChild(self.widgetcorner);
		};

		self.unsetResizable = function()
		{
			self.removeChild(self.widgetcorner);
		};

		//sets the position on page
		self.setPosition = function(value)
		{
			self.style.position = value;
		};

		//sets the position on X axis
		self.setXPos = function(value)
		{
			self.setPosition("absolute");
			self.style.left = value;
		};

		//sets the position on Y axis
		self.setYPos = function(value)
		{
			self.setPosition("absolute");
			self.style.top = value;
		};

		self.setHeight = function(value)
		{
			self.style.height = value;
		};

		self.setWidth = function(value)
		{
			self.style.width = value;
		};

		self.setClass = function(value)
		{
			self.className = value;
		};

		self.setCursor = function(value)
		{
			self.style.cursor = value;
		};

		self.setFont = function(value)
		{
			self.style.fontFamily = value;
		};

		self.setFontColor = function(value)
		{
			self.style.color = value;
		};

		self.setFontSize = function(value)
		{
			self.style.fontSize = value;
		};

		self.setFontWeight = function(value)
		{
			self.style.fontWeight = value;
		};

		self.setFontStyle = function(value)
		{
			self.style.fontStyle = value;
		};

		self.disabledWidget = function(JsEvent)
		{
			if (browserType=="ie")
			{
				jsEvent.returnValue = false;
			}
			else
			{
				jsEvent.preventDefault();
				jsEvent.stopPropagation();
				jsEvent.stopPropagation();
			}
		};

		self.disable = function(value)
		{
			if (self.input && self.type != "JsIcon")
			{
				//self.input.disabled = value;
				self.input.readOnly = value;

				if (value)
				{
					for (var js_i in self.events)
					{
						self.delEvent(js_i);
						self.setEvent(js_i,self.disabledWidget);
					}
					self.setEvent("click",self.disabledWidget);
				}
				else
				{
					for (var js_i in self.events)
					{
						self.unsetEvent(js_i,self.disabledWidget);
						self.addEvent(js_i);
					}
					self.unsetEvent("click",self.disabledWidget);
				}
			}
		};

		self.focus = function()
		{
			if (self.input && self.type != "JsIcon")
				self.input.focus();
		};

		self.readOnly = function(value)
		{
			if (self.input)
			{
				self.input.readOnly = value;
			}
		};

		//returns a pointer to itself
		return self;
	};