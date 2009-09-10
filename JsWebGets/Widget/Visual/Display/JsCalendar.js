	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago Sanchez
	
	self library is free software; you can redistribute it and/or
	modify it under the terms of the GNU Lesser General Public
	License as published by the Free Software Foundation; either
	version 2.1 of the License, or (at your option) any later version.
	
	self library is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public
	License along with self library; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	******************************************************************/
	
	//
	JsCalendar = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		
		self.type = "JsCalendar";
		
		self.childList			= new Array();
		
		self.date				= new Date;
		self.day				= self.date.getDate();
		self.month				= self.date.getMonth();
		self.year				= self.date.getYear();
		
		if (browserType == "ie")
		{
			self.year = self.date.getYear();
		}
		else
		{
			self.year = self.date.getYear() + 1900;
		}

		// array of total days in each month
		self.totalDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		// leap year correction
		if (self.year % 4 == 0)
			self.totalDays[1] = 29;
		
		self.build = function ()
		{
			self.date = new Date(self.year, self.month, 1);
			self.firstDayOfMonth = self.date.getDay();
			self.date.setDate(31);
			self.lastDayOfMonth = self.date.getDay();
	
			self.cellCount = 0;
			self.rowCount  = 1;
			self.currRow   = 2;
	
			for (var js_i in self.childList)
			{
				if(self.childList[js_i].parentNode)
					self.childList[js_i].parentNode.removeChild(self.childList[js_i]);
			};
	
			// start displaying dates
			// display blank spaces until the first day of the month
			var temp = self.datetable.rows[self.currRow];
			for (var js_i=0; js_i<self.firstDayOfMonth; js_i++)
			{
				var cell = temp.cells[js_i];
				cell.className = "jscalendarEmptyCell";
				cell.innerHTML = "&nbsp;";
				self.cellCount++;
			};
	
			self.currCell = self.cellCount;
	
			// counter to track the current date
			self.dayCount=1;
			while (self.dayCount <= self.totalDays[self.month])
			{
				if (self.cellCount % 7 == 0 && (self.firstDayOfMonth != 0 || self.dayCount > 7))
				{
					self.currRow++;
					temp = self.datetable.rows[self.currRow];
					self.rowCount++;
					self.currCell = 0;
				};
	
				// print date
				var cell = temp.cells[self.currCell];
				cell.innerHTML = "";
				cell.appendChild(self.childList[self.dayCount]);
				cell.className = "jscalendarDayCell";
				self.dayCount++;
				self.cellCount++;
				self.currCell++;
			};
	
			while (self.cellCount % 7 != 0)
			{
				var cell = temp.cells[self.currCell];
				cell.className = "jscalendarEmptyCell";
				cell.innerHTML = "&nbsp;";
				self.cellCount++;
				self.currCell++;
			};
	
			if (self.currRow < 7)
			{
				self.currRow++;
				temp = self.datetable.rows[self.currRow];
				for (var js_i=0; js_i<7; js_i++)
				{
					var cell = temp.cells[js_i];
					cell.className = "jscalendarEmptyCell";
					cell.innerHTML = "&nbsp;";
					self.cellCount++;
				}
			}
		};
		
		self.changeMonth = function()
		{
			var month = self.month;
			var year = self.year;
	
			if (jsTarget.action == "increase")
			{
				month++;
				if (month == 12)
				{
					month = 0;
					year++;
				}
			}
			else
			{
				month--;
				if (month == -1)
				{
					month = 11;
					year--;;
				}
			};
			
			self.month = month;
			self.setYear(year);
		};
		
		
		self.setCalendarItemOver = function()
		{
			jsTarget.className = "jscalendarDayCellOver";
		};
		
		self.setCalendarItemOut = function ()
		{
			jsTarget.className = "jscalendarDayCell";
		};
		
		self.setCalValue = function()
		{
			self.setDay(jsTarget.getValue());
		};
		
		self.getValue = function()
		{
			var js_day = self.day;
			var js_month = parseInt(self.month) + 1;
			var js_year = self.year;
	
			if (parseInt(js_month) < 10)
				js_month = "0" + js_month;
	
			return js_year + "-" +  js_month + "-" + js_day;
		};
	
		self.setValue = function(value)
		{
			js_day = value.substring(8,10);
			js_month = value.substring(5,7);
			js_year = value.substring(0,4);
			self.setDay(js_day);
			self.year = js_year;
			self.setMonth(js_month);
		};
	
		self.setDay = function(value)
		{
			self.day = value;
		};
	
		self.setMonth = function(value)
		{
			self.month = value - 1;
			self.monthcell.innerHTML = translation[lang]["month"][self.month] + " " + self.year;
			self.build();
		};
	
		self.setYear = function(value)
		{
			self.year = value;
			self.monthcell.innerHTML = translation[lang]["month"][self.month] + " " + self.year;
	
			// array of total days in each month
			self.totalDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			// leap year correction
			if (self.year % 4 == 0)
				self.totalDays[1] = 29;
	
			self.build();
		};
		
		self.buildObject = function ()
		{
			self.datetable			= document.createElement("table");
			self.monthrow			= self.datetable.insertRow(0);
			self.weekdayrow			= self.datetable.insertRow(1);
	
			self.previouscell		= self.monthrow.insertCell(0);
			self.monthcell			= self.monthrow.insertCell(1);
			self.nextcell			= self.monthrow.insertCell(2);
			
			self.datetable.js_parent = self.js_parent;
			self.monthrow.js_parent = self.js_parent;
			self.weekdayrow.js_parent = self.js_parent;
			self.previouscell.js_parent = self.js_parent;
			self.monthcell.js_parent = self.js_parent;
			self.nextcell.js_parent = self.js_parent;
	
			self.previousbutton = eval(self.name + "button = new JsImageButton('" + self.id + "button')");
			self.nextbutton = eval(self.name + "button = new JsImageButton('" + self.id + "button')");
			
			self.previousbutton.js_parent = self.js_parent;
			self.nextbutton.js_parent = self.js_parent;
			
			self.previousbutton.setEvent("click", self.changeMonth);
			self.nextbutton.setEvent("click", self.changeMonth);
	
			self.previousbutton.setSource(jsimages_path+"prev_arrow.gif");
			self.nextbutton.setSource(jsimages_path+"next_arrow.gif");
	
			self.previousbutton.setAttribute("action", "decrease");
			self.nextbutton.setAttribute("action", "increase");
			
			self.previouscell.appendChild(self.previousbutton);
			self.nextcell.appendChild(self.nextbutton);
	
			self.nextcell.align = "right";
			
			self.monthcell.colSpan = 5;
			self.monthcell.innerHTML = translation[lang]["month"][self.month] + " " + self.year;
			self.monthcell.align = "center";
	
			self.className	= "jscalendarOutput";
			self.style.width = "200";
			self.style.height = "156";
			self.datetable.className	= "jscalendarTable";
			self.datetable.style.width	= "100%";
			self.previouscell.className	= "jscalendarMonthCell";
			self.monthcell.className	= "jscalendarMonthCell";
			self.nextcell.className	= "jscalendarMonthCell";
			
			for (var js_i in translation[lang]["week_abreviation"])
			{
				currentcell = self.weekdayrow.insertCell(js_i);
				currentcell.js_parent = self.js_parent;
				currentcell.innerHTML = translation[lang]["week_abreviation"][js_i];
				currentcell.className	= "jscalendarWeekCell";
			};
	
			for (var js_i=0; js_i<6; js_i++)
			{
				temp = self.datetable.insertRow(2);
				for (var js_j=0; js_j<=6; js_j++)
				{
					cell = temp.insertCell(temp.cells.length);
					cell.js_parent = self.js_parent;
					cell.innerHTML = "&nbsp;";
					cell.className = "jscalendarEmptyCell";
				};
			};
	
			for (var js_i=0; js_i <= 31; js_i++)
			{
				labelname = self.id + "callabel"+js_i;
				obj = eval(labelname+" = new JsLabel('"+labelname+"')");
				//obj.js_parent = self.js_parent;
				self.childList[js_i] = obj;
				if (js_i < 10)
				{
					var dayValue = "0" + js_i;
				}
				else
				{
					var dayValue = js_i;
				}
				
				self.childList[js_i].setAttribute("parent",labelname);
				self.childList[js_i].setEvent("mousedown",self.setCalValue);
				self.childList[js_i].setEvent("mouseover",self.setCalendarItemOver);
				self.childList[js_i].setEvent("mouseout",self.setCalendarItemOut);
				self.childList[js_i].setEvent("click",self.setCalendarItemOut);
				//self.childList[js_i].setEvent("click",hideActiveHidden);
				self.childList[js_i].setValue(dayValue);
				self.childList[js_i].setHeight(18);
				self.childList[js_i].setClass("jscalendarDayCell");
				
			}
	
			self.appendChild(self.datetable);
			self.style.width = 200;
			self.style.height = 156;

			self.build();		
		};

		self.buildObject();
		
		
		return self;
	};