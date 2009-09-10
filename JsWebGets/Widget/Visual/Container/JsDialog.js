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
	JsDialog = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsDialog";

		self.className = "jsdialog";
		self.style.overflow = "hidden";

		self.modalFrame = document.createElement("div");
		self.modalFrame.style.width = "100%";
		self.modalFrame.style.height = "100%";
		self.modalFrame.style.top = "0";
		self.modalFrame.style.left = "0";
		self.modalFrame.style.backgroundColor = "#FFFFFF";
		if (browserType=="ie")
			self.modalFrame.style.filter = "alpha(opacity=5)";
		else
		{
			self.modalFrame.style.opacity = "0.05";
			self.modalFrame.style.mozOpacity = "0.05";
		}
		self.modalFrame.style.position 	 = "absolute";
		self.modalFrame.style.visibility = "hidden";
		self.modalFrame.style.display 	 = "none";

		self.modal = false;

		self.setModal = function(value)
		{
			self.modal = value;
		};

		self.setHeight = function(value)
		{
			if (!isNaN(value))
			{
 				if (browserType=="ie")
 					self.style.height = parseInt(value) + 26;
 				else 
					self.style.height = parseInt(value);
			}
			else
			{
				self.style.height = value;
			}
		};

		self.setWidth = function(value)
		{
			if (!isNaN(value))
			{
 				if (browserType=="ie")
 					self.style.width = parseInt(value) + 16;
 				else 
					self.style.width = parseInt(value);
			}
			else
			{
				self.style.width = value;
			}
		};

		/*
		self.showChildCombos = function(parent)
		{
			if (!parent)
				parent = self;

			if (parent.childNodes.length)
			{
				for (var js_i = 0; js_i < parent.childNodes.length; js_i++)
				{
					if (parent.childNodes[js_i].type=="JsListBox" || parent.childNodes[js_i].type=="JsComboBox")
					{
						parent.childNodes[js_i].input.style.visibility = "visible";
					}
					if (parent.childNodes[js_i].childNodes.length)
					{
						self.showChildCombos(parent.childNodes[js_i]);
					}
				}
			}
		};
		*/

		self.hideDialog = function()
		{
			if (self.modal)
			{
				if (self.modalFrame.parentNode == document.body)
					document.body.removeChild(self.modalFrame);
				self.modalFrame.style.display = "none";
				self.modalFrame.style.visibility = "hidden";
			}

			self.style.display = "none";
			self.style.visibility = "hidden";

			/*
			if (browserType=="ie")
			{
				if (self.parentNode == document.body)
					document.body.removeChild(self);

				selects = document.getElementsByTagName("select");
				for (var js_i=0; js_i<selects.length;js_i++)
				{
					if (!selects[js_i].jslineeditadv)
						selects[js_i].style.visibility = "visible";
				}
			}
			*/
		};

		self.showDialog = function()
		{
			if (self.modal)
			{
				document.body.appendChild(self.modalFrame);
				self.modalFrame.style.position = "absolute";
				self.modalFrame.style.display = "block";
				self.modalFrame.style.visibility = "visible";
			}

			if (!self.parentNode || !self.parentNode.innerHTML)
				document.body.appendChild(self);

			if (self.modal)
				self.parentNode.appendChild(self.modalFrame);
			self.parentNode.appendChild(self);

			self.style.position = "absolute";
			self.style.display = "block";
			self.style.visibility = "visible";
			self.style.top = "50%";
			self.style.left = "50%";
			self.style.margin = (parseInt(self.style.height)/2 * -1) + " " + (parseInt(self.style.width)/2 * -1);

			if (parseInt(self.style.top) < 0)
				self.style.top = 0;

			if (parseInt(self.style.left) < 0)
				self.style.left = 0;

			/*
			if (browserType=="ie")
			{
				selects = document.getElementsByTagName("select");
				for (var js_i=0; js_i<selects.length;js_i++)
				{
					if (!selects[js_i].jslineeditadv)
						selects[js_i].style.visibility = "hidden";
				}
				self.showChildCombos();
			}
			*/

		};

		return self;
	};