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
	JsColorPicker = function(name)
	{
		var self = new JsDialog(name);

		self.colorgrid = new JsWidgetGrid();
		self.colorcancelbt = new JsPushButton();

		self.colorcancelbt.setValue(translation[lang]["richtexteditor"][12]);
		self.colorcancelbt.target = self.name;
		self.colorcancelbt.setEvent("click",self.hideDialog);

		self.setWidth(165);
		self.setHeight(120);
		self.hideDialog();

		self.colorgrid.setWidth(160);
		self.colorgrid.setHeight(96);

		self.getColor = function(jsEvent)
		{
			self.hideDialog();
			currJsEditor.textarea.textarea.contentDocument.execCommand(command, false, jsTarget.color);

			if (browserType=="ie")
			{
				currJsEditor.stylecb.style.display = "inline";
				currJsEditor.fontcb.style.display = "inline";
				currJsEditor.sizecb.style.display = "inline";
			};

			currJsEditor = null;
		};

		self.colorgrid.addRow();

		for (var i in color_arr)
		{
			if (!(i % 10))
				self.colorgrid.addRow();

			tmp_img = new JsImageButton();

			tmp_img.setSource(jsimages_path + "blank.gif");
			tmp_img.setWidth(16);
			tmp_img.setHeight(16);
			tmp_img.color = color_arr[i];
			tmp_img.setEvent("click",self.getColor);

			self.colorgrid.addCell(16,16,null,null,null,null,color_arr[i]);
			self.colorgrid.addItem(tmp_img);
		};

		self.colorgrid.addRow();
		self.colorgrid.addCell(null,null,null,null,10);
		self.colorgrid.addItem(self.colorcancelbt);

		self.addItem(self.colorgrid);
		self.addItem(self.colorcancelbt);

		return self;
	};

	//color array for the color picker
	color_arr = new Array(
		"#FFFFFF","#FFCCCC","#FFCC99","#FFFF99","#FFFFCC","#99FF99","#99FFFF","#CCFFFF","#CCCCFF","#FFCCFF","#CCCCCC","#FF6666","#FF9966","#FFFF66",
		"#FFFF33","#66FF99","#33FFFF","#66FFFF","#9999FF","#FF99FF","#C0C0C0","#FF0000","#FF9900","#FFCC66","#FFFF00","#33FF33","#66CCCC","#33CCFF",
		"#6666CC","#CC66CC","#999999","#CC0000","#FF6600","#FFCC33","#FFCC00","#33CC00","#00CCCC","#3366FF","#6633FF","#CC33CC","#666666","#990000",
		"#CC6600","#CC9933","#999900","#009900","#339999","#3333FF","#6600CC","#993399","#333333","#660000","#993300","#996633","#666600","#006600",
		"#336666","#000099","#333399","#663366","#000000","#330000","#663300","#663333","#333300","#003300","#003333","#000066","#330099","#330033"
	);