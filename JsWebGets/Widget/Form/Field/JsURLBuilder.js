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
	JsURLBuilder = function(name)
	{
		var self = new JsDialog();
		
		self.linkgrid = document.createElement("table");
		self.linkbtgrid = document.createElement("table");
		self.linklb = document.createElement("p");
		self.linklb.className = "jslabel";
		self.hreflb = document.createElement("p");
		self.hreflb.className = "jslabel";
		self.hrefle = new JsLineEdit();
		self.textlb = document.createElement("p");
		self.textlb.className = "jslabel";
		self.textle = new JsLineEdit();
		self.urlokbt = document.createElement("input");
		self.urlccbt = document.createElement("input");
		
		self.urlokbt.type = "button";
		self.urlccbt.type = "button";
		
		if (browserType=="ie")
		{
			self.linklb.innerText = translation[lang]["richtexteditor"][13];
			self.hreflb.innerText = translation[lang]["richtexteditor"][14];
			self.textlb.innerText = translation[lang]["richtexteditor"][15];
		}
		else
		{
			self.linklb.innerHTML = translation[lang]["richtexteditor"][13];
			self.hreflb.innerHTML = translation[lang]["richtexteditor"][14];
			self.textlb.innerHTML = translation[lang]["richtexteditor"][15];
		};
		
		self.linklb.style.fontWeight = "Bold";
		
		self.urlokbt.value = "OK";
		self.urlccbt.value = translation[lang]["richtexteditor"][12];
		
		self.urlokbt.style.width = 100;
		self.urlccbt.style.width = 100;
		
		self.hrefle.style.width = "100%";
		self.textle.style.width = "100%";
		
		self.urlokbt.target = self.name;
		self.urlccbt.target = self.name;
		
		row = self.linkgrid.insertRow(self.linkgrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.colSpan = 3;
		cell.appendChild(self.linklb);
		
		row = self.linkgrid.insertRow(self.linkgrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.style.width = 50;
		cell.appendChild(self.hreflb);
		cell = row.insertCell(row.cells.length);
		cell.style.width = 10;
		cell = row.insertCell(row.cells.length);
		cell.style.width = 195;
		cell.appendChild(self.hrefle);
		
		row = self.linkgrid.insertRow(self.linkgrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.textlb);
		cell = row.insertCell(row.cells.length);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.textle);
		
		row = self.linkgrid.insertRow(self.linkgrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.colSpan = 3;
		cell.align = "center";
		cell.appendChild(self.linkbtgrid);
		
		row = self.linkbtgrid.insertRow(self.linkbtgrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.style.width = 100;
		cell.appendChild(self.urlokbt);
		cell = row.insertCell(row.cells.length);
		cell.style.width = 10;
		cell = row.insertCell(row.cells.length);
		cell.style.width = 100;
		cell.appendChild(self.urlccbt);
		
		self.appendChild(self.linkgrid);
		
		self.style.position = "absolute";
		self.setWidth(255);
		self.setHeight(110);
		self.style.backgroundColor = "#DDDDDD";
		self.style.borderTop = "1px solid #EEEEEE";
		self.style.borderLeft = "1px solid #EEEEEE";
		self.style.borderRight = "1px solid #AAAAAA";
		self.style.borderBottom = "1px solid #AAAAAA";
		self.style.display = "none";
		self.style.visibility = "hidden";
		
		self.insertLink = function (jsEvent)
		{
			var urltxt = self.textle.getValue();
			var urlhref = self.hrefle.getValue();
			
			if (urlhref.length > 0)
			{
				if (urltxt == "")
					urltxt = urlhref;
				
				var html;
				html = "<a href=\""+urlhref+"\">"+urltxt+"</a>";
				
				if (browserType=="ie")
				{
					//This currently makes all new URLs to be add
					//to the end of the document instead of the cursor place
					//No time to fix right now, there is problably a solution
					//for this on MSDN site... just no time. Nobody will die if
					//I leave it this way for now.
					var oldhtml = currJsEditor.getValue();
					currJsEditor.setValue(oldhtml + html);
				}
				else
				{
					//gotta find a way to make IE work with this
					currJsEditor.textarea.insertInPosition(html,"html");
				};
					
				self.hideDialog();
			}
			else
			{
				alert(translation[lang]["error"][7]);
			};
		};
		
		self.urlokbt.onclick = self.insertLink;
		self.urlccbt.onclick = self.hideDialog;
		
		return self;
	};