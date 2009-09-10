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

	//JsWebServiceConnector, binds to a webservice and create the same calls
	//directly on javascript, making it much easier to use it.
	JsWebServiceConnector = function ()
	{
		//create the object as a native object from HTML
		var self = new JsHTTPRequest();

		self.type = "JsWebServiceConnector";
		self.targetNamespace = null;

		self.callws = function(handler, targetNamespace, method_name, args_name, args_value)
		{
			var call_str  = "<\?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
			call_str += "<soap:Envelope xmlns:xsi=\"http:\/\/www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http:\/\/www.w3.org/2001/XMLSchema\" xmlns:soap=\"http:\/\/schemas.xmlsoap.org/soap/envelope/\">\n";
			call_str += "<soap:Body>\n";
			call_str += "<" + method_name + " xmlns=\"" + targetNamespace + "\">\n";
			for (var js_i=0; js_i<args_name.length;js_i++)
			{
				call_str += "<" + args_name[js_i] + ">";
				call_str += args_value[js_i];
				call_str += "</" + args_name[js_i] + ">\n";
			};
			call_str += "</" + method_name + ">\n";
			call_str += "</soap:Body>\n";
			call_str += "</soap:Envelope>";

			if (jsDebug)
			{
				if (!jsDebugWindow)
					jsDebugWindowBuild();

				if (!jsDebugWindow.parentNode || jsDebugWindow.style.display == "none")
					jsDebugWindow.showWindow();
				var previous = jsDebugDisplay.getValue();
			}

			wsCall = new JsXML(call_str);

			if (self.httprequest.readyState==0 || self.httprequest.readyState==4)
			{
				document.body.appendChild(self.warning);
				document.body.appendChild(self.warningblock);
				//gets Web Service definition
				self.httprequest.open ("POST", handler, true);
				self.httprequest.setRequestHeader("Host", getHostURL(handler));
				self.httprequest.setRequestHeader("Content-type", "text/xml");
				self.httprequest.setRequestHeader("SOAPAction", targetNamespace + "" + method_name);
				self.httprequest.send(wsCall);

				self.httprequest.onreadystatechange = function()
				{
					if (self.httprequest.readyState==4)
					{
						document.body.removeChild(self.warning);
						document.body.removeChild(self.warningblock);

						if (jsDebug)
						{
							var debugtxt = previous;
							debugtxt += "====REQUEST====\n\n" + call_str;
							debugtxt += "\n\n====RESPONSE STATUS====\n\n" + self.httprequest.status;
							debugtxt += "\n\n====RESPONSE====\n\n" + self.httprequest.responseText;
							debugtxt += "\n\n====CALLBACK====\n\n" + self.onload_callback + "\n\n";
							debugtxt += "\n\n====FALLBACK====\n\n" + self.onload_fallback + "\n\n";

							jsDebugDisplay.setValue(debugtxt);
						}

						if (self.httprequest.status == 200)
						{
							if (self.onload_callback)
								self.onload_callback();
						}
						else
						{
							if (self.onload_fallback)
								self.onload_fallback();
							else
							{
								if (browserType=="ie")
									alert(translation[lang]["error"][0] + "\n" + self.httprequest.statusText + "\n" + self.httprequest.responseXML.getElementsByTagName("faultcode")[0].text + "\n" + self.httprequest.responseXML.getElementsByTagName("faultstring")[0].text);
									//alert(translation[lang]["error"][0] + "\n" + self.httprequest.statusText + "\n" + self.httprequest.responseXML.getElementsByTagName("faultcode")[0].text + "\n" + self.httprequest.responseXML.getElementsByTagName("faultstring")[0].text + "\n" + self.httprequest.responseXML.getElementsByTagName("faultactor")[0].text + "\n" + self.httprequest.responseXML.getElementsByTagName("detail")[0].text);
								else
									alert(translation[lang]["error"][0] + "\n" + self.httprequest.statusText + "\n" + self.httprequest.responseXML.getElementsByTagName("faultcode")[0].textContent + "\n" + self.httprequest.responseXML.getElementsByTagName("faultstring")[0].textContent);
									//alert(translation[lang]["error"][0] + "\n" + self.httprequest.statusText + "\n" + self.httprequest.responseXML.getElementsByTagName("faultcode")[0].textContent + "\n" + self.httprequest.responseXML.getElementsByTagName("faultstring")[0].textContent + "\n" + self.httprequest.responseXML.getElementsByTagName("faultactor")[0].textContent + "\n" + self.httprequest.responseXML.getElementsByTagName("detail")[0].textContent);
							}
						}
					}
				};
			}
		};

		self.buildAPI = function()
		{
			XMLobj = new JsXML(self.httprequest.responseText);

			// Clear
			if(XMLobj.getElementsByTagName('definitions')[0] != undefined)
			{
			// Clear
				self.targetNamespace = XMLobj.getElementsByTagName('definitions')[0].getAttribute("targetNamespace");

				//new
				var nlMethods = XMLobj.getElementsByTagName("definitions")[0].getElementsByTagName("portType")[0].getElementsByTagName("operation");
				var nlMessages = XMLobj.getElementsByTagName("definitions")[0].getElementsByTagName("message");
				for (var n=0;n<nlMethods.length;n++)
				{
					if (nlMethods[n].getAttribute("name"))
					{
						method_name = nlMethods[n].getAttribute("name");
						var method_str = "self." + method_name + " = function(";
						messagein_name = nlMethods[n].getElementsByTagName("input")[0].getAttribute("message").split(":");

						for (var js_j=0;js_j<nlMessages.length;js_j++)
						{
							if (nlMessages[js_j].getAttribute("name")==messagein_name[1])
							{
								nlParams = nlMessages[js_j].getElementsByTagName("part");
								comma = "";
								for (var j=0;j<nlParams.length;j++)
								{
									method_str += comma + nlParams[j].getAttribute("name");
									comma = ",";
								}
								method_str += comma + "callback";
								method_str += comma + "fallback";
								method_str += ")";
								method_str += "{";
								method_str += "var args_name = new Array();\n";
								for (var j=0;j<nlParams.length;j++)
									method_str += "args_name["+j+"] = '"+nlParams[j].getAttribute("name")+"';";
								method_str += "self.onload_callback = callback;";
								method_str += "self.onload_fallback = fallback;";
								method_str += "self.callws('" + self.handler + "','" + self.targetNamespace + "','" + method_name + "', args_name, arguments);\n";
								method_str += "}";

								eval(method_str);
								break;
							}
						}
					}
				}
			}

			if (self.onload_callback)
				self.onload_callback();
		};

		self.waitXML = function()
		{
			if (self.httprequest.readyState==4)
			{
				document.body.removeChild(self.warning);
				document.body.removeChild(self.warningblock);
				if (self.httprequest.status == 200)
				{
					self.buildAPI();
				}
				else
				{
					alert(translation[lang]["error"][0] + "\n" + self.httprequest.statusText);
				}
			}
		};

		self.bind = function(wsurl, onload_callback)
		{
			self.setHandler(wsurl);

			self.onload_callback = onload_callback;

			document.body.appendChild(self.warning);
			document.body.appendChild(self.warningblock);

			self.XML = true;

			self.createHandler(self.waitXML);

			//gets Web Service definition
			self.httprequest.open ("GET", self.handler + "?WSDL", true);
			self.httprequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			self.httprequest.send(null);
		};

		//returns a pointer to itself
		return self;
	};