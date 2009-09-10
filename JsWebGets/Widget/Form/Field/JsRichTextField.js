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
	JsRichTextField = function(name)
	{
		var self = new JsWidget(name);

		jsRichTexts[jsRichTexts.length] = self;

		self.type = "JsRichTextField";
		self.js_parent = self;
		self.cc = "\u2009"; // control char

		self.value = "";

		self.className = "jsrichtext";

		self.style.position = "relative";

		//Creates the editable area according to the browser type
		self.textarea = document.createElement("iframe");
		//self.textarea.style.overflow="auto";

		if (browserType=="ie")
		{
			//self.textarea.contentDocument = self.textarea.contentWindow;
			self.textarea.src = document.body.theme + "/blank.html";
		}

		self.textarea.style.position = "absolute";

		if (browserType=="ie")
		{
			self.textarea.style.width="100%";
			self.textarea.style.height="100%";
		}
		else
		{
			self.textarea.style.left = 0;
			self.textarea.style.right = 0;
			self.textarea.style.bottom = 0;
			self.textarea.style.top = 0;
		}

		self.textarea.style.backgroundColor="#FFFFFF";
		self.style.border="1px solid #7f7f7f";
		self.textarea.js_parent = self;

		self.appendChild(self.textarea);

		/*******************************************
		       IFrame need to be set editable
		*******************************************/

		//used by IE to see if it's appended

		self.enableDesignModeIE = function()
		{
			if (!isNaN(getObjLeft(self)))
			{
				if (!self.textarea.contentDocument)
				{
					self.textarea.contentDocument = self.textarea.contentWindow.document;
					self.textarea.contentWindow.js_parent = self;
					return true;
				}
				else 
					return false;
			}
			return false;
		};

		self.enableDesignModeMoz = function()
		{
			if (getObjLeft(self) !=0 && self.textarea.contentDocument && self.textarea.contentDocument.designMode == "off")
			{
				try
				{
					if (!self.textarea.src)
					{
						self.textarea.src = document.body.theme + "/blank.html";
					}
					self.textarea.contentDocument.designMode = "on";
					self.textarea.contentDocument.body.className = self.textarea.className;
				}
				catch(e)
				{
					alert(e);
				};
				return true;
			}
			else 
				return false;
		};

		self.enableDesignMode = function()
		{
			if (browserType=="ie")
			{
				var enabled = self.enableDesignModeIE();
			}
			else
			{
				var enabled = self.enableDesignModeMoz();
			}

			if (enabled)
			{
				self.textarea.js_parent = self;
				if (browserType=="ie")
					self.textarea.contentWindow.js_parent = self;
				self.textarea.contentDocument.js_parent = self;
				self.textarea.contentDocument.body.js_parent = self;
				self.setValue(self.value);
				for (var i in self.events)
				{
					self.addEvent(i);
				}
			}
		};

		//find where the cursor was, so it can be replaced after highlighting
		self.findString = function(value,replace)
		{
			if (!value)
				var value = self.cc;
			if (!replace)
				var replace = '';

			if (browserType=="ie")
			{
				range = self.textarea.contentDocument.body.createTextRange();
				if(range.findText(value))
				{
					range.select();
					range.text = replace;
				}
			}
			else
			{
				self.textarea.contentWindow.find(value);
				self.textarea.contentWindow.getSelection().getRangeAt(0).deleteContents();
			}
		};

		//insert the passed value where the cursor is
		self.insertInPosition = function(value,type)
		{
			if (browserType=="ie")
			{
				var range = self.textarea.contentDocument.selection.createRange();
				if (!type)
					range.text = value;
				else if(type=="html")
					range.pasteHTML(value);
			}
			else 
				self.textarea.contentDocument.execCommand("insertHTML", false, value);
		};

		//Methods to set and get value for the editor
		self.getValue = function()
		{
			if (self.textarea.contentDocument)
				self.value = self.textarea.contentDocument.body.innerHTML;
			return self.value;
		};

		self.setValue = function(value)
		{
			self.value = value;
			self.textarea.contentDocument.body.innerHTML = value;
		};

		self.addEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				if (self.textarea.contentDocument)
				{
					self.textarea.contentDocument.attachEvent("on" + eventStr, self.execEvent);
					self.textarea.contentWindow.attachEvent("on" + eventStr, self.execEvent);
				}
				self.attachEvent("on" + eventStr, self.execEvent);
			}
			else
			{
				if (self.textarea.contentDocument)
					self.textarea.contentDocument.addEventListener(eventStr, self.execEvent, false);

				self.textarea.addEventListener(eventStr, self.execEvent, false);
				self.addEventListener(eventStr, self.execEvent, false);
			}
		};

		self.setHeight = function(value)
		{
			self.style.height = value;
			self.textarea.style.height = value;
		};

		self.setWidth = function(value)
		{
			self.style.width = value;
			self.textarea.style.width = value;
		};

		self.disable = function(value)
		{
			if (value && self.textarea.parentNode == self)
				self.removeChild(self.textarea);
			else if (!value)
				self.appendChild(self.textarea);
		};

		self.readOnly = function(value)
		{
			if (value && self.textarea.parentNode == self)
				self.removeChild(self.textarea);
			else if (!value)
				self.appendChild(self.textarea);
		};

		return self;
	};