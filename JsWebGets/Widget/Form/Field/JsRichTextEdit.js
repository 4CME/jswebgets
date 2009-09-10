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
	JsRichTextEdit = function(name)
	{
		var self = new JsWidget(name);

		self.type = "JsRichTextEdit";
		self.js_parent = self;

		self.className = "jsrichtext";

		//JsObject properties
		self.name				= name;
		self.id					= name;

		//Creates the editable area according to the browser type
		self.textarea = new JsRichTextField();

		self.textarea.style.border="0px solid #7f7f7f";
		self.textarea.style.borderTop="1px solid #7f7f7f";

		self.style.border="1px solid #7f7f7f";

		//Bold
		self.boldbt = new JsImageButton();
		self.boldbt.target = self;
		self.boldbt.command = "bold";
		self.boldbt.setSource(jsimages_path+"bold.gif");
		self.boldbt.setWidth(25);
		self.boldbt.setHeight(24);
		self.boldbt.style.top = 0;
		self.boldbt.style.left = 0;
		self.boldbt.style.position = "relative";
		if (browserType=="ie")
			self.boldbt.style.styleFloat = "left";
		else
			self.boldbt.style.cssFloat = "left";

		//Italic
		self.italicbt = new JsImageButton();
		self.italicbt.target = self;
		self.italicbt.command = "italic";
		self.italicbt.setSource(jsimages_path+"italic.gif");
		self.italicbt.setWidth(25);
		self.italicbt.setHeight(24);
		self.italicbt.style.position = "relative";
		if (browserType=="ie")
			self.italicbt.style.styleFloat = "left";
		else
			self.italicbt.style.cssFloat = "left";

		//Underlined
		self.underbt = new JsImageButton();
		self.underbt.target = self;
		self.underbt.command = "underline";
		self.underbt.setSource(jsimages_path+"underline.gif");
		self.underbt.setWidth(25);
		self.underbt.setHeight(24);
		if (browserType=="ie")
			self.underbt.style.styleFloat = "left";
		else
			self.underbt.style.cssFloat = "left";

		//Align Left
		self.aleftbt = new JsImageButton();
		self.aleftbt.target = self;
		self.aleftbt.command = "justifyleft";
		self.aleftbt.setSource(jsimages_path+"aleft.gif");
		self.aleftbt.setWidth(25);
		self.aleftbt.setHeight(24);
		if (browserType=="ie")
			self.aleftbt.style.styleFloat = "left";
		else
			self.aleftbt.style.cssFloat = "left";

		//Align Center
		self.acenterbt = new JsImageButton();
		self.acenterbt.target = self;
		self.acenterbt.command = "justifycenter";
		self.acenterbt.setSource(jsimages_path+"acenter.gif");
		self.acenterbt.setWidth(25);
		self.acenterbt.setHeight(24);
		if (browserType=="ie")
			self.acenterbt.style.styleFloat = "left";
		else
			self.acenterbt.style.cssFloat = "left";

		//Align Center
		self.arightbt = new JsImageButton();
		self.arightbt.target = self;
		self.arightbt.command = "justifyright";
		self.arightbt.setSource(jsimages_path+"aright.gif");
		self.arightbt.setWidth(25);
		self.arightbt.setHeight(24);
		if (browserType=="ie")
			self.arightbt.style.styleFloat = "left";
		else
			self.arightbt.style.cssFloat = "left";

		//HR
		self.hrbt = new JsImageButton();;
		self.hrbt.target = self;
		self.hrbt.command = "inserthorizontalrule";
		self.hrbt.setSource(jsimages_path+"hr.gif");
		self.hrbt.setWidth(25);
		self.hrbt.setHeight(24);
		if (browserType=="ie")
			self.hrbt.style.styleFloat = "left";
		else
			self.hrbt.style.cssFloat = "left";

		//OL
		self.olbt = new JsImageButton();
		self.olbt.target = self;
		self.olbt.command = "insertorderedlist";
		self.olbt.setSource(jsimages_path+"ol.gif");
		self.olbt.setWidth(25);
		self.olbt.setHeight(24);
		if (browserType=="ie")
			self.olbt.style.styleFloat = "left";
		else
			self.olbt.style.cssFloat = "left";

		//UL
		self.ulbt = new JsImageButton();
		self.ulbt.target = self;
		self.ulbt.command = "insertunorderedlist";
		self.ulbt.setSource(jsimages_path+"ul.gif");
		self.ulbt.setWidth(25);
		self.ulbt.setHeight(24);
		if (browserType=="ie")
			self.ulbt.style.styleFloat = "left";
		else
			self.ulbt.style.cssFloat = "left";

		//Outdent
		self.outbt = new JsImageButton();
		self.outbt.target = self;
		self.outbt.command = "outdent";
		self.outbt.setSource(jsimages_path+"out.gif");
		self.outbt.setWidth(25);
		self.outbt.setHeight(24);
		if (browserType=="ie")
			self.outbt.style.styleFloat = "left";
		else
			self.outbt.style.cssFloat = "left";

		//Indent
		self.inbt = new JsImageButton();
		self.inbt.target = self;
		self.inbt.command = "indent";
		self.inbt.setSource(jsimages_path+"in.gif");
		self.inbt.setWidth(25);
		self.inbt.setHeight(24);
		if (browserType=="ie")
			self.inbt.style.styleFloat = "left";
		else
			self.inbt.style.cssFloat = "left";

		//Txt Color
		self.txtcbt = new JsImageButton();
		self.txtcbt.target = self;
		self.txtcbt.command = "forecolor";
		self.txtcbt.setSource(jsimages_path+"txtcbt.gif");
		self.txtcbt.setWidth(25);
		self.txtcbt.setHeight(24);
		if (browserType=="ie")
			self.txtcbt.style.styleFloat = "left";
		else
			self.txtcbt.style.cssFloat = "left";

		//Txt BG Color
		self.bgcbt = new JsImageButton();
		self.bgcbt.target = self;
		self.bgcbt.command = "hilitecolor";
		self.bgcbt.setSource(jsimages_path+"bgcolor.gif");
		self.bgcbt.setWidth(25);
		self.bgcbt.setHeight(24);
		if (browserType=="ie")
			self.bgcbt.style.styleFloat = "left";
		else
			self.bgcbt.style.cssFloat = "left";

		//Link
		self.linkbt = new JsImageButton();
		self.linkbt.target = self;
		self.linkbt.command = "insertHTML";
		self.linkbt.setSource(jsimages_path+"link.gif");
		self.linkbt.setWidth(25);
		self.linkbt.setHeight(24);
		if (browserType=="ie")
			self.linkbt.style.styleFloat = "left";
		else
			self.linkbt.style.cssFloat = "left";

		//Table
		self.tablebt = new JsImageButton();
		self.tablebt.target = self;
		self.tablebt.command = "insertHTML";
		self.tablebt.setSource(jsimages_path+"table.gif");
		self.tablebt.setWidth(25);
		self.tablebt.setHeight(24);
		if (browserType=="ie")
			self.tablebt.style.styleFloat = "left";
		else
			self.tablebt.style.cssFloat = "left";

		self.buttonsdiv = new JsWidget();
		self.buttonsdiv.setWidth("100%");

		if (browserType=="ie")
			self.buttonsdiv.style.styleFloat = "none";

		self.buttonsdiv.appendChild(self.boldbt);
		self.buttonsdiv.appendChild(self.italicbt);
		self.buttonsdiv.appendChild(self.underbt);
		self.buttonsdiv.appendChild(self.aleftbt);
		self.buttonsdiv.appendChild(self.acenterbt);
		self.buttonsdiv.appendChild(self.arightbt);
		self.buttonsdiv.appendChild(self.hrbt);
		self.buttonsdiv.appendChild(self.olbt);
		self.buttonsdiv.appendChild(self.ulbt);
		self.buttonsdiv.appendChild(self.outbt);
		self.buttonsdiv.appendChild(self.inbt);
		self.buttonsdiv.appendChild(self.txtcbt);
		self.buttonsdiv.appendChild(self.bgcbt);
		self.buttonsdiv.appendChild(self.linkbt);
		self.buttonsdiv.appendChild(self.tablebt);
		self.appendChild(self.buttonsdiv);

		//color picker, used to set font and background colors

		self.colorpicker = new JsColorPicker();
		self.appendChild(self.colorpicker);

		//Table Builder
		self.tablebuilder = new JsTableBuilder();
		self.appendChild(self.tablebuilder);

		//URL/Links

		self.linkbuilder = new JsURLBuilder();
		self.appendChild(self.linkbuilder);

		self.combosdiv = new JsWidget();
		self.combosdiv.setWidth("100%");

		if (browserType=="ie")
			self.combosdiv.style.styleFloat = "none";

		//style combo
		self.stylecb = new JsComboBox();
		self.stylecb.setWidth(150);
		self.stylecb.style.left = 0;
		if (browserType=="ie")
			self.stylecb.style.styleFloat = "left";
		else
			self.stylecb.style.cssFloat = "left";

		for (var i in styles_arr)
		{
			self.stylecb.addItem(styles_arr[i][0],styles_arr[i][1]);
		};

		self.stylecb.target = self.name;
		self.stylecb.command = "formatblock";

		self.combosdiv.appendChild(self.stylecb);

		//style combo
		self.fontcb = new JsComboBox();
		self.fontcb.setWidth(100);
		self.fontcb.style.left = 0;
		if (browserType=="ie")
			self.fontcb.style.styleFloat = "left";
		else
			self.fontcb.style.cssFloat = "left";

		for (var i in fonts_arr)
		{
			self.fontcb.addItem(fonts_arr[i][0],fonts_arr[i][1]);
		};

		self.fontcb.target = self.name;
		self.fontcb.command = "fontname";

		self.combosdiv.appendChild(self.fontcb);

		//fontsize combo
		self.sizecb = new JsComboBox();
		self.sizecb.setWidth(100);
		self.sizecb.style.top = 0;
		if (browserType=="ie")
			self.sizecb.style.styleFloat = "left";
		else
			self.sizecb.style.cssFloat = "left";

		for (var i in size_arr)
		{
			self.sizecb.addItem(size_arr[i][0],size_arr[i][1]);
		};

		self.sizecb.target = self.name;
		self.sizecb.command = "fontsize";

		self.combosdiv.appendChild(self.sizecb);

		if (browserType=="ie")
			self.textarea.style.styleFloat = "none";

		self.appendChild(self.combosdiv);
		self.appendChild(self.textarea);

		/********************************************
					   Visual Methods
		********************************************/

		self.setHeight = function(value)
		{
			self.style.height = value;
			self.textarea.style.height=parseInt(self.style.height)-48;
		};

		self.setWidth = function(value)
		{
			if (value >=380)
			{
				self.style.width = value;
			}
			else
			{
				alert(translation[lang]["error"][5]);
			}
		};

		//Methods to set and get value for the editor
		self.getValue = function()
		{
			self.value = self.textarea.getValue();
			return self.value;
		};

		self.setValue = function(value)
		{
			self.value = value;
			self.textarea.setValue(value);
		};

		self.disable = function(value)
		{
			if (value)
				self.removeChild(self.textarea);
			else
				self.appendChild(self.textarea);
		};

		self.readOnly = function(value)
		{
			if (value)
				self.removeChild(self.textarea);
			else
				self.appendChild(self.textarea);
		};

		self.editCommand = function(jsEvent)
		{
			jsTarget.target.textarea.textarea.contentDocument.execCommand(jsTarget.command, false, '');
		};

		self.fontCommand = function(jsEvent)
		{
			self.textarea.textarea.contentDocument.execCommand(jsTarget.command, false, jsTarget.getValue());
			self.resetFontCombos(jsEvent);
		};

		self.resetFontCombos = function(jsEvent)
		{
			self.stylecb.selectedIndex = 0;
			self.fontcb.selectedIndex = 0;
			self.sizecb.selectedIndex = 0;
		};

		self.colorPicker = function (jsEvent)
		{
			if (browserType=="ie")
				if (jsTarget.command == "hilitecolor") jsTarget.command = "backcolor";

			command = jsTarget.command;

			self.colorpicker.showDialog();

			currJsEditor = self;
		};

		self.tableBuilder = function (jsEvent)
		{
			if (browserType=="ie")
				if (jsTarget.command == "hilitecolor") jsTarget.command = "backcolor";

			command = jsTarget.command;

			self.tablebuilder.showDialog();

			currJsEditor = self;
		};

		self.linkBuilder = function (jsEvent)
		{
			if (browserType=="ie")
				if (jsTarget.command == "hilitecolor") jsTarget.command = "backcolor";

			command = jsTarget.command;

			self.linkbuilder.showDialog();

			self.linkbuilder.hrefle.setValue("");
			self.linkbuilder.textle.setValue("");

			currJsEditor = self;
		};

		/*
		self.setLastPosition = function(jsEvent)
		{
			self.textarea.insertInPosition(self.textarea.cc);
			self.textarea.findString(self.textarea.cc);
		};

		self.unsetLastPosition = function(jsEvent)
		{
			self.textarea.findString(self.textarea.cc,'');
		};

		if (browserType=="ie")
		{
			self.textarea.setEvent("blur",self.setLastPosition);
			self.textarea.setEvent("focus",self.unsetLastPosition);
		}
		*/

		self.boldbt.setEvent("click",self.editCommand);
		self.italicbt.setEvent("click",self.editCommand);
		self.underbt.setEvent("click",self.editCommand);
		self.aleftbt.setEvent("click",self.editCommand);
		self.acenterbt.setEvent("click",self.editCommand);
		self.arightbt.setEvent("click",self.editCommand);
		self.hrbt.setEvent("click",self.editCommand);
		self.olbt.setEvent("click",self.editCommand);
		self.ulbt.setEvent("click",self.editCommand);
		self.outbt.setEvent("click",self.editCommand);
		self.inbt.setEvent("click",self.editCommand);
		self.stylecb.setEvent("click",self.resetFontCombos);
		self.stylecb.setEvent("change",self.fontCommand);
		self.fontcb.setEvent("click",self.resetFontCombos);
		self.fontcb.setEvent("change",self.fontCommand);
		self.sizecb.setEvent("click",self.resetFontCombos);
		self.sizecb.setEvent("change",self.fontCommand);
		self.txtcbt.setEvent("click",self.colorPicker);
		self.bgcbt.setEvent("click",self.colorPicker);
		self.tablebt.setEvent("click",self.tableBuilder);
		self.linkbt.setEvent("click",self.linkBuilder);

		return self;
	};

	//if you want to limit the styles avaliable on the editor, redeclare this array
	styles_arr = new Array(
		new Array("",translation[lang]["richtexteditor"][0]),
		new Array("<p>",translation[lang]["richtexteditor"][1]),
		new Array("<h1>",translation[lang]["richtexteditor"][2]),
		new Array("<h2>",translation[lang]["richtexteditor"][3]),
		new Array("<h3>",translation[lang]["richtexteditor"][4]),
		new Array("<h4>",translation[lang]["richtexteditor"][5]),
		new Array("<h5>",translation[lang]["richtexteditor"][6]),
		new Array("<h6>",translation[lang]["richtexteditor"][7]),
		new Array("<address>",translation[lang]["richtexteditor"][8]),
		new Array("<pre>",translation[lang]["richtexteditor"][9])
	);

	//if you want to limit the fonts avaliable on the editor, redeclare this array
	fonts_arr = new Array(
		new Array("",translation[lang]["richtexteditor"][10]),
		new Array("Arial, Helvetica, sans-serif","Arial"),
		new Array("Courier New, Courier, mono","Courier"),
		new Array("Times New Roman, Times, serif","Times"),
		new Array("Verdana, Arial, Helvetica, sans-serif","Verdana")
	);

	//if you want to limit the sizes avaliable on the editor, redeclare this array
	size_arr = new Array(
		new Array("",translation[lang]["richtexteditor"][11]),
		new Array(1,1),
		new Array(2,2),
		new Array(3,3),
		new Array(4,4),
		new Array(5,5),
		new Array(6,6)
	);