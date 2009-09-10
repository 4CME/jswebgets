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

	//JsHTTPRequest, base for Ajax use with JsObjects
	JsHTTPRequest = function ()
	{
		var self = document.createElement("div");
		self.style.visibility = "hidden";
		self.style.display = "none";
		self.style.position = "absolute";

		self.type = "JsHTTPRequest";

		self.warning = document.createElement("div");
		self.warning.style.position = "absolute";
		self.warning.className = "jswarning";
		self.warning.innerHTML = "Loading...";
		
		self.warning.style.top = "50%";
		self.warning.style.left = "47%";

		self.warningblock = document.createElement("div");
		self.warningblock.style.position = "absolute";
		self.warningblock.style.top = 0;
		self.warningblock.style.right = 0;
		self.warningblock.style.height = "100%";
		self.warningblock.style.width = "100%";
		self.warningblock.style.backgroundColor = "#FFFFFF";
		if (browserType == "ie")
			self.warningblock.style.filter = "alpha(opacity=25)";
		else 
			self.warningblock.style.opacity = "0.25";

		self.warningblock.className = "jswarningblock";

		self.strBody = null;
		self.XML = null;

		self.setHandler = function(value)
		{
			self.handler = value;
		};

		self.createHandler = function(function_name)
		{
			//Creates the XMLHTTP Request object
			//Internet Explorer
			if (browserType=="ie")
			{
				try
				{
					self.httprequest = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e)
				{
					try
					{
						self.httprequest = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (E)
					{
						self.httprequest = false;
					}
				}
			}
			//firefox/mozilla
			else
			{
				try
				{
					self.httprequest = new XMLHttpRequest();
				}
				catch (e)
				{
					self.httprequest = false;
				}
			}
			if (self.XML==null)
			{
				if (!function_name)
				{
					self.httprequest.onreadystatechange = function()
					{
						if (self.httprequest.readyState==4)
						{
							document.body.removeChild(self.warning);
							document.body.removeChild(self.warningblock);
							if (self.httprequest.status == 200)
							{
								eval(self.httprequest.responseText);
							}
							else
							{
								alert(translation[lang]["error"][12] + "\n" + self.httprequest.status + "\n" + self.httprequest.statusText);
							}

						}
					};

				}
				else
				{
					self.httprequest.onreadystatechange = function()
					{
						if (self.httprequest.readyState==4)
						{
							document.body.removeChild(self.warning);
							document.body.removeChild(self.warningblock);
							if (self.httprequest.status == 200)
							{
								eval(self.httprequest.responseText);
								function_name();
							}
						}
					};
				}
			}
			else
			{
				if (!function_name)
				{
					self.httprequest.onreadystatechange = function()
					{
						if (self.httprequest.readyState==4)
						{
							document.body.removeChild(self.warning);
							document.body.removeChild(self.warningblock);
							if (self.httprequest.status == 200)
							{
								return self.httprequest.responseXML;
							}
							else
							{
								alert(translation[lang]["error"][0] + "\n" + self.httprequest.status + "\n" + self.httprequest.statusText);
							}
						}
					};
				}
				else
				{
					self.httprequest.onreadystatechange = function_name;
				}
			}
		};

		//sets the fields and values hat will be sent for plain text submits
		self.setFieldValue = function(fieldname, fieldvalue)
		{
			if (self.strBody != null)
			{
				var added = "&";
			}
			else
			{
				var added = "";
				self.strBody = "";
			}

			self.strBody += added + fieldname + "=" + escape(fieldvalue);
		};

		//sets the XML object to be sent
		self.setXML = function(xmlObj)
		{
			self.XML = xmlObj;
		};

		//send data
		self.postData = function(function_name)
		{
			self.createHandler(function_name);

			if (self.httprequest.readyState==4 || self.httprequest.readyState==0)
			{
				document.body.appendChild(self.warning);
				document.body.appendChild(self.warningblock);
				self.httprequest.open('POST', self.handler, true);
				if (self.XML == null)
				{
					self.httprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
					self.httprequest.send(self.strBody);
					self.strBody = null;
				}
				else
				{
					self.httprequest.setRequestHeader("Content-Type", "text/xml");
					self.httprequest.overrideMimeType('text/xml');
					self.httprequest.send(self.XML);
					self.XML = null;
				}
			}
		};

		//returns a pointer to itself
		return self;
	};