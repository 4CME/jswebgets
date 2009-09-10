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
	JsTableBuilder = function(name)
	{
		var self = new JsDialog();
		
		self.tablegrid = document.createElement("table");
		self.tablelb = document.createElement("p");
		self.tablelb.className = "jslabel";
		self.wlb = document.createElement("p");
		self.wlb.className = "jslabel";
		self.wle = new JsLineEdit();
		self.blb = document.createElement("p");
		self.blb.className = "jslabel";
		self.ble = new JsLineEdit();
		self.rowlb = document.createElement("p");
		self.rowlb.className = "jslabel";
		self.rowle = new JsLineEdit();
		self.collb = document.createElement("p");
		self.collb.className = "jslabel";
		self.colle = new JsLineEdit();
		self.cpdlb = document.createElement("p");
		self.cpdlb.className = "jslabel";
		self.cpdle = new JsLineEdit();
		self.csplb = document.createElement("p");
		self.csplb.className = "jslabel";
		self.csple = new JsLineEdit();
		self.tbokbt = document.createElement("input");
		self.tbccbt = document.createElement("input");
		
		self.wle.type = "text";
		self.ble.type = "text";
		self.rowle.type = "text";
		self.colle.type = "text";
		self.cpdle.type = "text";
		self.csple.type = "text";
		self.wle.type = "text";
		self.wle.type = "text";
		self.tbokbt.type = "button";
		self.tbccbt.type = "button";
		
		self.tbokbt.target = self.name;
		self.tbccbt.target = self.name;
		
		self.wle.style.width = 50;
		self.ble.style.width = 50;
		self.rowle.style.width = 50;
		self.colle.style.width = 50;
		self.cpdle.style.width = 50;
		self.csple.style.width = 50;
		self.wle.style.width = 50;
		self.wle.style.width = 50;
		
		if (browserType=="ie")
		{
			self.tablelb.innerText = translation[lang]["richtexteditor"][16];
			self.wlb.innerText = translation[lang]["richtexteditor"][17];
			self.blb.innerText = translation[lang]["richtexteditor"][18];
			self.rowlb.innerText = translation[lang]["richtexteditor"][19];
			self.collb.innerText = translation[lang]["richtexteditor"][20];
			self.cpdlb.innerText = translation[lang]["richtexteditor"][21];
			self.csplb.innerText = translation[lang]["richtexteditor"][22];
			self.tbokbt.value = "OK";
			self.tbccbt.value = translation[lang]["richtexteditor"][12];
		}
		else
		{
			self.tablelb.innerHTML = translation[lang]["richtexteditor"][16];
			self.wlb.innerHTML = translation[lang]["richtexteditor"][17];
			self.blb.innerHTML = translation[lang]["richtexteditor"][18];
			self.rowlb.innerHTML = translation[lang]["richtexteditor"][19];
			self.collb.innerHTML = translation[lang]["richtexteditor"][20];
			self.cpdlb.innerHTML = translation[lang]["richtexteditor"][21];
			self.csplb.innerHTML = translation[lang]["richtexteditor"][22];
			self.tbokbt.value = "OK";
			self.tbccbt.value = translation[lang]["richtexteditor"][12];
		};
		
		self.tablelb.style.fontWeight = "bold";
		
		self.wle.setValue(300);
		self.ble.setValue(1);
		self.rowle.setValue(2);
		self.colle.setValue(2);
		self.cpdle.setValue(5);
		self.csple.setValue(0);
		
		self.tbokbt.target = self.name;
		self.tbccbt.target = self.name;
		
		row = self.tablegrid.insertRow(self.tablegrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.colSpan = 5;
		cell.appendChild(self.tablelb);
		
		row = self.tablegrid.insertRow(self.tablegrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.width = 70;
		cell.appendChild(self.wlb);
		cell = row.insertCell(row.cells.length);
		cell.width = 50;
		cell.appendChild(self.wle);
		cell = row.insertCell(row.cells.length);
		cell = row.insertCell(row.cells.length);
		cell.width = 70;
		cell.appendChild(self.blb);
		cell = row.insertCell(row.cells.length);
		cell.width = 50;
		cell.appendChild(self.ble);
		
		row = self.tablegrid.insertRow(self.tablegrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.rowlb);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.rowle);
		cell = row.insertCell(row.cells.length);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.collb);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.colle);
		
		row = self.tablegrid.insertRow(self.tablegrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.cpdlb);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.cpdle);
		cell = row.insertCell(row.cells.length);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.csplb);
		cell = row.insertCell(row.cells.length);
		cell.appendChild(self.csple);
		
		row = self.tablegrid.insertRow(self.tablegrid.rows.length);
		cell = row.insertCell(row.cells.length);
		cell.colSpan = 2;
		cell.appendChild(self.tbokbt);
		cell = row.insertCell(row.cells.length);
		cell = row.insertCell(row.cells.length);
		cell.colSpan = 2;
		cell.appendChild(self.tbccbt);
		
		self.appendChild(self.tablegrid);
		
		self.tbokbt.style.width = 100;
		self.tbccbt.style.width = 100;
		
		self.tablegrid.style.width = 250;
		self.tablegrid.style.height = 150;
		
		self.style.position = "absolute";
		self.setWidth(250);
		self.setHeight(150);
		self.style.backgroundColor = "#DDDDDD";
		self.style.borderTop = "1px solid #EEEEEE";
		self.style.borderLeft = "1px solid #EEEEEE";
		self.style.borderRight = "1px solid #AAAAAA";
		self.style.borderBottom = "1px solid #AAAAAA";
		self.style.display = "none";
		self.style.visibility = "hidden";
		
		self.buildTable = function (jsEvent)
		{
			width = self.wle.getValue();
			border = self.ble.getValue();
			rows = self.rowle.getValue();
			cols = self.colle.getValue();
			padd = self.cpdle.getValue();
			space = self.csple.getValue();
			
			if (width > 0 && rows > 0 && cols > 0)
			{		
				var html;
				html = "<table border=\""+border+"\" width=\""+width+"\" cellpadding=\""+padd+"\" cellspacing=\""+space+"\">\n";
				for (var js_i=0;js_i<rows;js_i++)
				{
					html += "<tr>\n";
					for (var js_j=0;js_j<cols;js_j++)
					{
						html += "<td>&nbsp;</td>\n";
					};
					html += "</tr>\n";
				};
				html += "</table>\n";
				
				if (browserType=="ie")
				{
					//This currently makes all new tables to be add
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
				alert(translation[lang]["error"][6]);
			};
		};
		
		self.tbokbt.onclick = self.buildTable;
		self.tbccbt.onclick = self.hideDialog;
	
		return self;
	};