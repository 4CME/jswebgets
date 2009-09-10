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
	JsUpLoad = function (name)
	{
		//sets itself as a div
		var self = new JsInput(name);
		
		self.type = "JsUpLoad";
		
		self.input.type = "file";
		self.input.style.width = "100%";
		self.style.width = "100%";
		self.setEvent("click",function(){self.input.focus();});
		
		self.input.getValue = function ()
		{
			return this.parentNode.getValue();
		};
		
		self.setValue = function ()
		{
			return;
		};
		
		self.clearData = function ()
		{
			self.removeChild(self.input);
			self.unsetEvent("click",self.input.focus);
			
			self.input = document.createElement("input");
			self.input.type = "file";
			self.input.style.width = "100%";
		
			self.input.name = "js_input_" + self.name;
			self.input.id = "js_input_" + self.name;
			self.setEvent("click",self.input.focus);
			
			self.buildObject();
		};
		
		//This has to come after setting input.type, or IE will hang
		self.buildObject();
		
		return self;
	};