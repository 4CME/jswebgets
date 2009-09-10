	/******************************************************************
	JsObjects - Web User Interface Library
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

	//JsXML, object used to get a common and simple way to handle XML on IE and Gecko
	JsXML = function (XML)
	{
		var self;

		if (!XML)
			XML = "<document></document>";

		//Creates the XML object
		//Internet Explorer
		if (browserType=="ie")
		{
			try
			{
				self = new ActiveXObject("Msxml2.DOMDocument");
				self.async = false;
				self.loadXML(XML);
			}
			catch (e)
			{
				try
				{
					self = new ActiveXObject("Microsoft.DOMDocument");
					self.async = false;
					self.loadXML(XML);
				}
				catch (E)
				{
					self = false;
				}
			}
		}
		//firefox/mozilla
		else
		{
			try
			{
				parser = new DOMParser();
				self = parser.parseFromString(XML, 'text/xml');
			}
			catch (e)
			{
				self = false;
			}
		};

		//sets default to true
		self.async = true;

		//returns a pointer to itself
		return self;
	};