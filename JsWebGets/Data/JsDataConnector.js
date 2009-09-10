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

	//JsDataConnector, used to send forms fields and files to a webserver, old style...
	JsDataConnector = function ()
	{
		//create the object as a native object from HTML
		var self = document.createElement('div');

		self.type = "JsDataConnector";

		//some visual things, to keep JsDC hidden
		//comment the two lines above if you need to see what is going on the server side

		self.style.display = 'none';
		self.style.visibility = 'hidden';

		name = randomizer();

		//self.name = name;
		//self.id = name;

		//inherit common things from JsObject
		inherit(self, JsObject);

		//start exclusive attributes
		self.files = new Array();

		self.iframe = document.createElement("iframe");
		self.appendChild(self.iframe);
		self.iframe.name = "jsdc_iframe_"+self.id;
		self.iframe.id = "jsdc_iframe_"+self.id;

		if (browserType=="ie")
			self.iframe.outerHTML = '<iframe name="jsdc_iframe_'+self.id+ '" id="jsdc_iframe_'+self.id+ '"></iframe>';

		if (browserType=="ie")
		{
			self.form = document.createElement("<form method=post enctype=multipart/form-data target=" + self.iframe.id + ">");
		}
		else
		{
			self.form = document.createElement("form");
			self.form.method		= "POST";
			self.form.enctype		= "multipart/form-data";
			self.form.target		= self.iframe.id;
		}

		self.iframe.style.width = "98%";
		self.iframe.style.height = "200";

		self.appendChild(self.form);

		//append itself to the body, so it can be used
		document.body.appendChild(self);

		//methods used on this object
		self.setHandler = function(value)
		{
			self.childNodes[1].action = value;
		};

		self.setFieldValue = function(fieldname, value)
		{
			var obj = document.createElement("input");
			obj.type = "hidden";
			self.childNodes[1].appendChild(obj);
			obj.name = fieldname;
			obj.value = value;
		};

		self.setFile = function(uploadobj)
		{
			var js_i = self.files.length;

			self.files[js_i] = uploadobj;

			self.childNodes[1].appendChild(uploadobj.input);
		};

		self.debug = function()
		{
			var debugtxt = self.previous;
			debugtxt += "====SUBMIT====\n\n" + self.previous_form;
			debugtxt += "\n\n====RESPONSE====\n\n" + self.iframe.contentDocument.body.innerHTML;
			debugtxt += "\n\n====CALLBACK====\n\n" + self.onload_callback + "\n\n";

			jsDebugDisplay.setValue(debugtxt);
		};

		self.callback = function()
		{
			if (jsDebug)
				self.debug();

			if (self.onload_callback)
				self.onload_callback();
		};

		self.postData = function(jscallback)
		{
			if (self.files[0] && self.files[0].input.value)
				alert(translation[lang]["error"][9]);

			self.childNodes[1].submit();

			for (var js_i = 0 ; js_i < self.files.length; js_i++)
			{
				self.files[js_i].appendChild(self.files[js_i].input);
			}

			self.onload_callback = null;
			self.iframe.onload = self.callback;

			if (jscallback)
				self.onload_callback = jscallback;

			if (jsDebug)
			{
				if (!jsDebugWindow)
					jsDebugWindowBuild();

				if (!jsDebugWindow.parentNode || jsDebugWindow.style.display == "none")
					jsDebugWindow.showWindow();
				self.previous = jsDebugDisplay.getValue();
				self.previous_form = self.childNodes[1].outerHTML;
			}

			self.clearData();
		};

		self.clearData = function()
		{
			self.files = new Array();
			self.childNodes[1].innerHTML = "";
		};

		//returns a pointer to itself
		return self;
	};