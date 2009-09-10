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
	//Base for JsWebGets. All should have at least those attributes
	JsObject = function()
	{
		//this class is not suposed to be instantiated, only methods should be copied
		this.type = "JsObject";
		return false;
	};
	
	/********************************************
					Values Methods
	********************************************/
	
	JsObject.prototype.setValue = function (value)
	{
		var value;
		this.value = value;
	};
	
	JsObject.prototype.getValue = function ()
	{
		return this.value;
	};
	
	JsObject.prototype.setAttribute = function (name, value)
	{
		var name;
		var value;
		eval("this."+name+" = value");
		for (js_i=0; js_i< this.childNodes.length; js_i++)
		{
			if (!eval("this.childNodes[js_i]."+name))
			{
				if (this.childNodes[js_i].setAttribute && this.childNodes[js_i].origin=="jswebgets")
					eval("this.childNodes["+js_i+"].setAttribute('"+name+"',value)");
				else 
					eval("this.childNodes["+js_i+"]."+name+" = value");
			}
		}
	};
	
	JsObject.prototype.getAttribute = function (name)
	{
		var name;
		return eval("this."+name);
	};
	
	/********************************************
				End of Values Methods
	********************************************/