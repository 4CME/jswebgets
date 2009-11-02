	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago S�nchez

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

	/***********************************/
	/**************GLOBALS**************/
	/***********************************/
	//global variables for use on the interface control
	//DO NOT USE THEM IN YOUR CODE!

	var currInterface 		= null;
	var currContainer 		= null;
	var currDialog 			= null;
	var interfaceType 		= null;
	var currWidget 			= null;
	var JsCounter 			= null;
	var currPropTarget  	= null;
	var currListDataView 	= null;
	var currToolBar		 	= null;
	var currIconComboTarget	= null;
	var openedInterface		= null;
	var interfaces_list		= new Array();

	//Regular Expression for class/object/method/callback name validation
	var valid_name_regexp = /^[A-Za-z_][A-Za-z0-9_]*$/;

	var events_list = new Array();
	events_list[0] = "click";
	events_list[1] = "dblclick";
	events_list[2] = "mousedown";
	events_list[3] = "mouseup";
	events_list[4] = "mouseover";
	events_list[5] = "mousemove";
	events_list[6] = "mouseout";
	events_list[7] = "keypress";
	events_list[8] = "keydown";
	events_list[9] = "keyup";
	events_list[10] = "change";
	events_list[11] = "focus";
	events_list[12] = "blur";
	events_list[13] = "";

	/***********************************/
	/***********CONFIGURATION***********/
	/***********************************/

	//JsDesigner variables -- you will need to set these according to your application needs
	var jsdesigner_images = "";

	//used for correct placement of the widgets on screen
	if (browserType=="ie")
	{
		var decreasefactor = 70;
		var decreasefactorwindow = 70;
	}
	else
	{
		var decreasefactor = 70;
		var decreasefactorwindow = 84;
	}

	/***********************************/
	/**************UI CLASS*************/
	/***********************************/

	//JsDesigner User Interface Class
	JsDesigner = function()
	{
		//this is the referer to the object itself.
		//using self as a local var allow us to create
		//inheritance on Javascript.
		//in the end of the object, thou, it must return
		//the self reference, otherwise it won't work
		var self = new JsWidget();

		self.style.height="100%";

		self.setPosition("relative");

		/***********************************/
		/****************DATA***************/
		/***********************************/

		self.loadData = function(data)
		{
		}

		self.dumpData = function()
		{
			var data = "";
			return data;
		}

		self.resetData = function()
		{
		}

		/***********************************/
		/*************INTERFACE*************/
		/***********************************/

		//this is the function used to build the interface
		//it contains references to all the widgets
		self.buildInterface = function()
		{
			//used by JsDesigner, to load and save the interface
			self.UIcomponents = new Array();

				/***************User defined**************/

				//New Interface Dialog
				self.UIcomponents.newdialog = new JsDialog();
				self.UIcomponents.newdialog.setWidth(400);
				self.UIcomponents.newdialog.setHeight(200);
				self.UIcomponents.newdialog.setModal(true);

				self.UIcomponents.newlabel = new JsLabel();
				self.UIcomponents.newinterfacebt = new JsImageButton();
				self.UIcomponents.newdialogbt = new JsImageButton();
				self.UIcomponents.newwindowbt = new JsImageButton();
				self.UIcomponents.newopenbt = new JsImageButton();
				self.UIcomponents.newlabel.setValue("Create New Interface");

				self.UIcomponents.newinterfacebt.setWidth(48);
				self.UIcomponents.newinterfacebt.setHeight(48);
				self.UIcomponents.newinterfacebt.setAttribute("interfaceType","JsWindow");
				self.UIcomponents.newinterfacebt.setAttribute("realType","JsInterface");
				self.UIcomponents.newinterfacebt.setToolTip("New Interface");
				self.UIcomponents.newinterfacebt.setSource(jsdesigner_images + "newinterface.png");

				self.UIcomponents.newdialogbt.setWidth(48);
				self.UIcomponents.newdialogbt.setHeight(48);
				self.UIcomponents.newdialogbt.setAttribute("interfaceType","JsDialog");
				self.UIcomponents.newdialogbt.setAttribute("realType","JsDialog");
				self.UIcomponents.newdialogbt.setToolTip("New Dialog");
				self.UIcomponents.newdialogbt.setSource(jsdesigner_images + "newdialog.png");

				self.UIcomponents.newwindowbt.setWidth(48);
				self.UIcomponents.newwindowbt.setHeight(48);
				self.UIcomponents.newwindowbt.setAttribute("interfaceType","JsWindow");
				self.UIcomponents.newwindowbt.setAttribute("realType","JsWindow");
				self.UIcomponents.newwindowbt.setToolTip("New Window");
				self.UIcomponents.newwindowbt.setSource(jsdesigner_images + "newwindow.png");

				self.UIcomponents.newopenbt.setWidth(48);
				self.UIcomponents.newopenbt.setHeight(48);
				self.UIcomponents.newopenbt.setToolTip("Open Existing Interface");
				self.UIcomponents.newopenbt.setSource(jsdesigner_images + "fileopen.png");

				self.UIcomponents.newlabel.setXPos(10);
				self.UIcomponents.newlabel.setYPos(10);
				self.UIcomponents.newinterfacebt.setXPos(90);
				self.UIcomponents.newinterfacebt.setYPos(50);
				self.UIcomponents.newdialogbt.setXPos(90);
				self.UIcomponents.newdialogbt.setYPos(130);
				self.UIcomponents.newwindowbt.setXPos(270);
				self.UIcomponents.newwindowbt.setYPos(50);
				self.UIcomponents.newopenbt.setXPos(270);
				self.UIcomponents.newopenbt.setYPos(130);

				self.UIcomponents.newdialog.addItem(self.UIcomponents.newlabel);
				self.UIcomponents.newdialog.addItem(self.UIcomponents.newinterfacebt);
				self.UIcomponents.newdialog.addItem(self.UIcomponents.newdialogbt);
				self.UIcomponents.newdialog.addItem(self.UIcomponents.newwindowbt);
				self.UIcomponents.newdialog.addItem(self.UIcomponents.newopenbt);

				//Open Interface Dialog
				self.UIcomponents.opendialog = new JsDialog();
				self.UIcomponents.opendialog.setWidth(600);
				self.UIcomponents.opendialog.setHeight(390);
				self.UIcomponents.opendialog.setModal(true);

				self.UIcomponents.opendialoglabel = new JsLabel();
				self.UIcomponents.opendialoglabel.setWidth(100);
				self.UIcomponents.opendialoglabel.setValue("Open Dialog");
				self.UIcomponents.opendialoglabel.setYPos(10);
				self.UIcomponents.opendialoglabel.setFontWeight("Bold");

				self.UIcomponents.filelist = new JsListView();
				self.UIcomponents.filelist.setWidth(590);
				self.UIcomponents.filelist.setHeight(340);
				self.UIcomponents.filelist.setYPos(30);
				self.UIcomponents.filelist.addColumn("Interface Name",600);

				self.UIcomponents.openbutton = new JsPushButton();
				self.UIcomponents.openbutton.setValue("Open");
				self.UIcomponents.openbutton.setYPos(380);
				self.UIcomponents.openbutton.setWidth(100);

				self.UIcomponents.opencancelbutton = new JsPushButton();
				self.UIcomponents.opencancelbutton.setValue("Cancel");
				self.UIcomponents.opencancelbutton.setYPos(380);
				self.UIcomponents.opencancelbutton.setXPos(495);
				self.UIcomponents.opencancelbutton.setWidth(100);

				self.UIcomponents.opendialog.addItem(self.UIcomponents.opendialoglabel);
				self.UIcomponents.opendialog.addItem(self.UIcomponents.filelist);
				self.UIcomponents.opendialog.addItem(self.UIcomponents.openbutton);
				self.UIcomponents.opendialog.addItem(self.UIcomponents.opencancelbutton);

				//Save Interface Dialog
				self.UIcomponents.savedialog = new JsDialog();
				self.UIcomponents.savedialog.setWidth(600);
				self.UIcomponents.savedialog.setHeight(390);
				self.UIcomponents.savedialog.setModal(true);

				self.UIcomponents.savedialoglabel = new JsLabel();
				self.UIcomponents.savedialoglabel.setWidth(100);
				self.UIcomponents.savedialoglabel.setValue("Save Dialog");
				self.UIcomponents.savedialoglabel.setYPos(10);
				self.UIcomponents.savedialoglabel.setFontWeight("Bold");

				self.UIcomponents.filesavelist = new JsListView();
				self.UIcomponents.filesavelist.setWidth(590);
				self.UIcomponents.filesavelist.setHeight(310);
				self.UIcomponents.filesavelist.setYPos(30);
				self.UIcomponents.filesavelist.addColumn("Interface Name",600);

				self.UIcomponents.filesavename = new JsLineEdit();
				self.UIcomponents.filesavename.setWidth(590);
				self.UIcomponents.filesavename.setYPos(348);

				self.UIcomponents.savebutton = new JsPushButton();
				self.UIcomponents.savebutton.setValue("Save");
				self.UIcomponents.savebutton.setYPos(375);
				self.UIcomponents.savebutton.setWidth(100);

				self.UIcomponents.savecancelbutton = new JsPushButton();
				self.UIcomponents.savecancelbutton.setValue("Cancel");
				self.UIcomponents.savecancelbutton.setYPos(375);
				self.UIcomponents.savecancelbutton.setXPos(495);
				self.UIcomponents.savecancelbutton.setWidth(100);

				self.UIcomponents.savedialog.addItem(self.UIcomponents.savedialoglabel);
				self.UIcomponents.savedialog.addItem(self.UIcomponents.filesavelist);
				self.UIcomponents.savedialog.addItem(self.UIcomponents.filesavename);
				self.UIcomponents.savedialog.addItem(self.UIcomponents.savebutton);
				self.UIcomponents.savedialog.addItem(self.UIcomponents.savecancelbutton);

				//File Menu
				self.UIcomponents.menubaritem1 = new JsMenu();

				self.UIcomponents.menubaritemsubitem1_1 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem1_2 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem1_3 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem1_4 = new JsMenuItem();

				self.UIcomponents.menubaritem1.setValue("File");
				self.UIcomponents.menubaritemsubitem1_1.setValue("New Interface Class");
				self.UIcomponents.menubaritemsubitem1_2.setValue("Open Interface Class");
				self.UIcomponents.menubaritemsubitem1_3.setValue("Save Interface Class");
				self.UIcomponents.menubaritemsubitem1_4.setValue("Close Interface Class");

				self.UIcomponents.menubaritemsubitem1_1.setIcon(jsdesigner_images + "interface_new.png");
				self.UIcomponents.menubaritemsubitem1_2.setIcon(jsdesigner_images + "interface_open.png");
				self.UIcomponents.menubaritemsubitem1_3.setIcon(jsdesigner_images + "interface_save.png");
				self.UIcomponents.menubaritemsubitem1_4.setIcon(jsdesigner_images + "interface_close.png");

				self.UIcomponents.menubaritem1.addItem(self.UIcomponents.menubaritemsubitem1_1);
				self.UIcomponents.menubaritem1.addItem(self.UIcomponents.menubaritemsubitem1_2);
				self.UIcomponents.menubaritem1.addItem(self.UIcomponents.menubaritemsubitem1_3);
				self.UIcomponents.menubaritem1.addItem(self.UIcomponents.menubaritemsubitem1_4);

				//this requires an instance of the JsMainWindow widget
				document.body.addMenu(self.UIcomponents.menubaritem1);

				//Tool Menu
				self.UIcomponents.menubaritem2 = new JsMenu();

				self.UIcomponents.menubaritemsubitem2_1 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem2_2 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem2_3 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem2_4 = new JsMenuItem();

				self.UIcomponents.menubaritem2.setValue("Tools");
				self.UIcomponents.menubaritemsubitem2_1.setValue("Show/Hide Widget Box");
				self.UIcomponents.menubaritemsubitem2_2.setValue("Show/Hide Object Navigator");
				self.UIcomponents.menubaritemsubitem2_3.setValue("Show/Hide Properties Editor");
				self.UIcomponents.menubaritemsubitem2_4.setValue("Show/Hide Events Editor");

				self.UIcomponents.menubaritemsubitem2_1.setIcon(jsdesigner_images + "showhide.png");
				self.UIcomponents.menubaritemsubitem2_2.setIcon(jsdesigner_images + "showhide.png");
				self.UIcomponents.menubaritemsubitem2_3.setIcon(jsdesigner_images + "showhide.png");
				self.UIcomponents.menubaritemsubitem2_4.setIcon(jsdesigner_images + "showhide.png");

				self.UIcomponents.menubaritem2.addItem(self.UIcomponents.menubaritemsubitem2_1);
				self.UIcomponents.menubaritem2.addItem(self.UIcomponents.menubaritemsubitem2_2);
				self.UIcomponents.menubaritem2.addItem(self.UIcomponents.menubaritemsubitem2_3);
				self.UIcomponents.menubaritem2.addItem(self.UIcomponents.menubaritemsubitem2_4);

				self.UIcomponents.menubaritemsubitem2_1.setAttribute("jswindow","widgetwindow");
				self.UIcomponents.menubaritemsubitem2_2.setAttribute("jswindow","object_window");
				self.UIcomponents.menubaritemsubitem2_3.setAttribute("jswindow","properties_window");
				self.UIcomponents.menubaritemsubitem2_4.setAttribute("jswindow","events_window");

				document.body.addMenu(self.UIcomponents.menubaritem2);

				//Help Menu
				self.UIcomponents.menubaritem3 = new JsMenu();

				self.UIcomponents.menubaritemsubitem3_1 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem3_2 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem3_3 = new JsMenuItem();
				self.UIcomponents.menubaritemsubitem3_4 = new JsMenuItem();

				self.UIcomponents.menubaritem3.setValue("Help");
				self.UIcomponents.menubaritemsubitem3_1.setValue("Documentation");
				self.UIcomponents.menubaritemsubitem3_2.setValue("About JsDesigner");
				self.UIcomponents.menubaritemsubitem3_3.setValue("About JsWebGets");
				self.UIcomponents.menubaritemsubitem3_4.setValue("About IDSL");

				self.UIcomponents.menubaritemsubitem3_1.setIcon(jsdesigner_images + "help.png");

				self.UIcomponents.menubaritem3.addItem(self.UIcomponents.menubaritemsubitem3_1);
				self.UIcomponents.menubaritem3.addDiv();
				self.UIcomponents.menubaritem3.addItem(self.UIcomponents.menubaritemsubitem3_2);
				self.UIcomponents.menubaritem3.addItem(self.UIcomponents.menubaritemsubitem3_3);
				self.UIcomponents.menubaritem3.addItem(self.UIcomponents.menubaritemsubitem3_4);

				document.body.addMenu(self.UIcomponents.menubaritem3);

				//Left Dock - Widgets

				self.UIcomponents.dock = new JsDock();
				self.UIcomponents.dock.setAlign("left");

				var windowHeight = document.body.clientHeight;

				self.UIcomponents.widgetwindow = new JsWindow();
				self.UIcomponents.widgetwindow.setWidth(250);
				self.UIcomponents.widgetwindow.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
				self.UIcomponents.widgetwindow.setTitle("Widget Box");

				//Widgets ToolBox

				self.UIcomponents.widgettools = new JsToolBox();

				self.UIcomponents.widgettools.addBox("Buttons");
				self.UIcomponents.widgettools.addBox("Fields");
				self.UIcomponents.widgettools.addBox("Containers");
				self.UIcomponents.widgettools.addBox("Displays");
				self.UIcomponents.widgettools.addBox("Views");

				self.UIcomponents.widgetwindow.addItem(self.UIcomponents.widgettools);

				//Buttons Widgets
				self.UIcomponents.wid_bt1 = new JsBoxButton();
				self.UIcomponents.wid_bt2 = new JsBoxButton();
				self.UIcomponents.wid_bt3 = new JsBoxButton();
				self.UIcomponents.wid_bt4 = new JsBoxButton();
				self.UIcomponents.wid_bt5 = new JsBoxButton();

				self.UIcomponents.wid_bt1.setValue("JsCheckBox");
				self.UIcomponents.wid_bt2.setValue("JsIcon");
				self.UIcomponents.wid_bt3.setValue("JsImageButton");
				self.UIcomponents.wid_bt4.setValue("JsPushButton");
				self.UIcomponents.wid_bt5.setValue("JsRadioButton");

				self.UIcomponents.wid_bt1.setIcon(jsdesigner_images + "check.png");
				self.UIcomponents.wid_bt2.setIcon(jsdesigner_images + "icon.png");
				self.UIcomponents.wid_bt3.setIcon(jsdesigner_images + "imagebutton.png");
				self.UIcomponents.wid_bt4.setIcon(jsdesigner_images + "pushbutton.png");
				self.UIcomponents.wid_bt5.setIcon(jsdesigner_images + "radio.png");

				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_bt1,0);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_bt2,0);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_bt3,0);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_bt4,0);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_bt5,0);

				//Field Widgets
				self.UIcomponents.wid_fd1 = new JsBoxButton();
				self.UIcomponents.wid_fd2 = new JsBoxButton();
				self.UIcomponents.wid_fd3 = new JsBoxButton();
				self.UIcomponents.wid_fd4 = new JsBoxButton();
				self.UIcomponents.wid_fd5 = new JsBoxButton();
				self.UIcomponents.wid_fd6 = new JsBoxButton();
				self.UIcomponents.wid_fd7 = new JsBoxButton();
				self.UIcomponents.wid_fd8 = new JsBoxButton();
				self.UIcomponents.wid_fd9 = new JsBoxButton();
				self.UIcomponents.wid_fd10 = new JsBoxButton();
				self.UIcomponents.wid_fd11 = new JsBoxButton();
				self.UIcomponents.wid_fd12 = new JsBoxButton();
				self.UIcomponents.wid_fd13 = new JsBoxButton();
				self.UIcomponents.wid_fd14 = new JsBoxButton();
				self.UIcomponents.wid_fd15 = new JsBoxButton();

				self.UIcomponents.wid_fd1.setValue("JsCNPJEdit");
				self.UIcomponents.wid_fd2.setValue("JsComboBox");
				self.UIcomponents.wid_fd3.setValue("JsCPFEdit");
				self.UIcomponents.wid_fd4.setValue("JsDateEdit");
				self.UIcomponents.wid_fd5.setValue("JsIPEdit");
				self.UIcomponents.wid_fd6.setValue("JsLineEdit");
				self.UIcomponents.wid_fd7.setValue("JsLineEditAdv");
				self.UIcomponents.wid_fd8.setValue("JsListBox");
				self.UIcomponents.wid_fd9.setValue("JsMoneyEdit");
				self.UIcomponents.wid_fd10.setValue("JsRichTextEdit");
				self.UIcomponents.wid_fd11.setValue("JsSpinBox");
				self.UIcomponents.wid_fd12.setValue("JsTextEdit");
				self.UIcomponents.wid_fd13.setValue("JsTimeEdit");
				self.UIcomponents.wid_fd14.setValue("JsUpLoad");
				self.UIcomponents.wid_fd15.setValue("JsCodeEdit");

				self.UIcomponents.wid_fd1.setIcon(jsdesigner_images + "lineedit.png");
				self.UIcomponents.wid_fd2.setIcon(jsdesigner_images + "combobox.png");
				self.UIcomponents.wid_fd3.setIcon(jsdesigner_images + "lineedit.png");
				self.UIcomponents.wid_fd4.setIcon(jsdesigner_images + "datetime.png");
				self.UIcomponents.wid_fd5.setIcon(jsdesigner_images + "lineedit.png");
				self.UIcomponents.wid_fd6.setIcon(jsdesigner_images + "lineedit.png");
				self.UIcomponents.wid_fd7.setIcon(jsdesigner_images + "lineedit.png");
				self.UIcomponents.wid_fd8.setIcon(jsdesigner_images + "listbox.png");
				self.UIcomponents.wid_fd9.setIcon(jsdesigner_images + "lineedit.png");
				self.UIcomponents.wid_fd10.setIcon(jsdesigner_images + "richtextedit.png");
				self.UIcomponents.wid_fd11.setIcon(jsdesigner_images + "spinbox.png");
				self.UIcomponents.wid_fd12.setIcon(jsdesigner_images + "textedit.png");
				self.UIcomponents.wid_fd13.setIcon(jsdesigner_images + "datetime.png");
				self.UIcomponents.wid_fd14.setIcon(jsdesigner_images + "lineedit.png");
				self.UIcomponents.wid_fd15.setIcon(jsdesigner_images + "richtextedit.png");

				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd1,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd2,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd15,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd3,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd4,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd5,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd6,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd7,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd8,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd9,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd10,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd11,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd12,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd13,1);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_fd14,1);

				//Container Widgets
				self.UIcomponents.wid_ct1 = new JsBoxButton();
				self.UIcomponents.wid_ct2 = new JsBoxButton();
				self.UIcomponents.wid_ct3 = new JsBoxButton();
				self.UIcomponents.wid_ct4 = new JsBoxButton();
				self.UIcomponents.wid_ct5 = new JsBoxButton();
				self.UIcomponents.wid_ct6 = new JsBoxButton();
				self.UIcomponents.wid_ct8 = new JsBoxButton();
				self.UIcomponents.wid_ct9 = new JsBoxButton();

				self.UIcomponents.wid_ct1.setValue("JsDialog");
				self.UIcomponents.wid_ct2.setValue("JsDock");
				self.UIcomponents.wid_ct3.setValue("JsFieldSet");
				self.UIcomponents.wid_ct4.setValue("JsTab");
				self.UIcomponents.wid_ct5.setValue("JsToolBox");
				self.UIcomponents.wid_ct6.setValue("JsWebWrapper");
				self.UIcomponents.wid_ct8.setValue("JsWidgetStack");
				self.UIcomponents.wid_ct9.setValue("JsWindow");

				self.UIcomponents.wid_ct1.setIcon(jsdesigner_images + "dialog.png");
				self.UIcomponents.wid_ct2.setIcon(jsdesigner_images + "dock.png");
				self.UIcomponents.wid_ct3.setIcon(jsdesigner_images + "fieldset.png");
				self.UIcomponents.wid_ct4.setIcon(jsdesigner_images + "tab.png");
				self.UIcomponents.wid_ct5.setIcon(jsdesigner_images + "toolbox.png");
				self.UIcomponents.wid_ct6.setIcon(jsdesigner_images + "webwrapper.png");
				self.UIcomponents.wid_ct8.setIcon(jsdesigner_images + "widgetstack.png");
				self.UIcomponents.wid_ct9.setIcon(jsdesigner_images + "window.png");

				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct1,2);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct2,2);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct3,2);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct4,2);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct5,2);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct6,2);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct8,2);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_ct9,2);

				//Display Widgets
				self.UIcomponents.wid_dp1 = new JsBoxButton();
				self.UIcomponents.wid_dp2 = new JsBoxButton();
				self.UIcomponents.wid_dp3 = new JsBoxButton();
				self.UIcomponents.wid_dp4 = new JsBoxButton();
				self.UIcomponents.wid_dp5 = new JsBoxButton();
				self.UIcomponents.wid_dp6 = new JsBoxButton();
				self.UIcomponents.wid_dp7 = new JsBoxButton();
				self.UIcomponents.wid_dp9 = new JsBoxButton();

				self.UIcomponents.wid_dp1.setValue("JsCalendar");
				self.UIcomponents.wid_dp2.setValue("JsImage");
				self.UIcomponents.wid_dp3.setValue("JsLabel");
				self.UIcomponents.wid_dp4.setValue("JsLine");
				self.UIcomponents.wid_dp5.setValue("JsMenu");
				self.UIcomponents.wid_dp6.setValue("JsMenuBar");
				self.UIcomponents.wid_dp7.setValue("JsMiniToolBar");
				self.UIcomponents.wid_dp9.setValue("JsToolBar");

				self.UIcomponents.wid_dp1.setIcon(jsdesigner_images + "datetime.png");
				self.UIcomponents.wid_dp2.setIcon(jsdesigner_images + "imagebutton.png");
				self.UIcomponents.wid_dp3.setIcon(jsdesigner_images + "label.png");
				self.UIcomponents.wid_dp4.setIcon(jsdesigner_images + "line.png");
				self.UIcomponents.wid_dp5.setIcon(jsdesigner_images + "menu.png");
				self.UIcomponents.wid_dp6.setIcon(jsdesigner_images + "menubar.png");
				self.UIcomponents.wid_dp7.setIcon(jsdesigner_images + "minitoolbar.png");
				self.UIcomponents.wid_dp9.setIcon(jsdesigner_images + "toolbar.png");

				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp1,3);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp2,3);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp3,3);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp4,3);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp5,3);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp6,3);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp7,3);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_dp9,3);

				//Views Widgets
				self.UIcomponents.wid_vw1 = new JsBoxButton();
				self.UIcomponents.wid_vw2 = new JsBoxButton();

				self.UIcomponents.wid_vw1.setValue("JsDataView");
				self.UIcomponents.wid_vw2.setValue("JsListView");

				self.UIcomponents.wid_vw1.setIcon(jsdesigner_images + "dataview.png");
				self.UIcomponents.wid_vw2.setIcon(jsdesigner_images + "listview.png");

				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_vw1,4);
				self.UIcomponents.widgettools.addItemToBox(self.UIcomponents.wid_vw2,4);

				//Right Dock - Edit Tools
				self.UIcomponents.dock2 = new JsDock();
				self.UIcomponents.dock2.setAlign("right");

				//self.UIcomponents.dock.setHeight(windowHeight - decreasefactor);
				//self.UIcomponents.dock2.setHeight(windowHeight - decreasefactor);

				self.UIcomponents.dock.setWidth(280);
				self.UIcomponents.dock2.setWidth(280);

				//Object Navigator
				self.UIcomponents.object_window = new JsWindow();
				self.UIcomponents.object_window.setWidth(260);
				self.UIcomponents.object_window.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
				self.UIcomponents.object_window.setTitle("Object Navigator");

				//Object view
				self.UIcomponents.obj_view = new JsListView();
				self.UIcomponents.obj_view.addColumn("Object",150);
				self.UIcomponents.obj_view.addColumn("Class",110);

				if (browserType=="ie")
				{
					self.UIcomponents.obj_view.setWidth("100%");
					self.UIcomponents.obj_view.setHeight("100%");
				}
				else
				{
					self.UIcomponents.obj_view.style.position = "absolute";
					self.UIcomponents.obj_view.style.top = 0;
					self.UIcomponents.obj_view.style.bottom = 0;
					self.UIcomponents.obj_view.style.left = 0;
					self.UIcomponents.obj_view.style.right = 0;
				}

				self.UIcomponents.object_window.addItem(self.UIcomponents.obj_view);

				//Properties Editor
				self.UIcomponents.properties_window = new JsWindow();
				self.UIcomponents.properties_window.setWidth(260);
				self.UIcomponents.properties_window.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
				self.UIcomponents.properties_window.setTitle("Properties Editor");

				//properties view
				self.UIcomponents.prop_view = new JsListView();
				self.UIcomponents.prop_view.addColumn("Property",110);
				self.UIcomponents.prop_view.addColumn("Value",150);
				if (browserType=="ie")
				{
					self.UIcomponents.prop_view.setWidth("100%");
					self.UIcomponents.prop_view.setHeight("100%");
				}
				else
				{
					self.UIcomponents.prop_view.style.position = "absolute";
					self.UIcomponents.prop_view.style.top = 0;
					self.UIcomponents.prop_view.style.bottom = 0;
					self.UIcomponents.prop_view.style.left = 0;
					self.UIcomponents.prop_view.style.right = 0;
				}
				self.UIcomponents.properties_window.addItem(self.UIcomponents.prop_view);

				//properties itens
				//name
				self.UIcomponents.prop_name = new JsListViewItem();

				//value
				self.UIcomponents.prop_value = new JsListViewItem();

				//label
				self.UIcomponents.prop_label = new JsListViewItem();

				//top
				self.UIcomponents.prop_top = new JsListViewItem();

				//left
				self.UIcomponents.prop_left = new JsListViewItem();

				//height
				self.UIcomponents.prop_height = new JsListViewItem();

				//width
				self.UIcomponents.prop_width = new JsListViewItem();

				//tooltip (title)
				self.UIcomponents.prop_tooltip = new JsListViewItem();

				//contextMenu (obj.menu)
				self.UIcomponents.prop_menu = new JsListViewItem();

				//icon
				self.UIcomponents.prop_iconsrc = new JsListViewItem();

				//image
				self.UIcomponents.prop_imagesrc = new JsListViewItem();

				//checked
				self.UIcomponents.prop_checked = new JsListViewItem();

				//window_title
				self.UIcomponents.prop_window_title = new JsListViewItem();

				//wrapper_src
				self.UIcomponents.prop_wrapper_src = new JsListViewItem();

				//fieldset legend
				self.UIcomponents.prop_legend = new JsListViewItem();

				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_name);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_value);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_label);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_top);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_left);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_height);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_width);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_tooltip);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_menu);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_iconsrc);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_imagesrc);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_checked);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_window_title);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_wrapper_src);
				self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_legend);

				self.UIcomponents.prop_name.addItem("Name");
				self.UIcomponents.prop_name.addItem("",null,true);
				self.UIcomponents.prop_value.addItem("Value");
				self.UIcomponents.prop_value.addItem("",null,true);
				self.UIcomponents.prop_label.addItem("Label");
				self.UIcomponents.prop_label.addItem("",null,true);
				self.UIcomponents.prop_top.addItem("Top");
				self.UIcomponents.prop_top.addItem("",null,true,true);
				self.UIcomponents.prop_left.addItem("Left");
				self.UIcomponents.prop_left.addItem("",null,true,true);
				self.UIcomponents.prop_height.addItem("Height");
				self.UIcomponents.prop_height.addItem("",null,true,true);
				self.UIcomponents.prop_width.addItem("Width");
				self.UIcomponents.prop_width.addItem("",null,true,true);
				self.UIcomponents.prop_tooltip.addItem("Tool Tip");
				self.UIcomponents.prop_tooltip.addItem("",null,true);
				self.UIcomponents.prop_menu.addItem("Context Menu");
				self.UIcomponents.prop_menu.addItem("");
				self.UIcomponents.prop_iconsrc.addItem("Icon");
				self.UIcomponents.prop_iconsrc.addItem("",null,true);
				self.UIcomponents.prop_imagesrc.addItem("Image");
				self.UIcomponents.prop_imagesrc.addItem("",null,true);
				self.UIcomponents.prop_checked.addItem("Checked");
				self.UIcomponents.prop_checked.addItem("",null,true);
				self.UIcomponents.prop_window_title.addItem("Window Title");
				self.UIcomponents.prop_window_title.addItem("",null,true);
				self.UIcomponents.prop_wrapper_src.addItem("Page Source");
				self.UIcomponents.prop_wrapper_src.addItem("",null,true);
				self.UIcomponents.prop_legend.addItem("Legend");
				self.UIcomponents.prop_legend.addItem("",null,true);

				self.UIcomponents.prop_view.clearData();

				self.UIcomponents.menuscombo = new JsComboBox();
				self.UIcomponents.menuscombo.propMethod = "setMenu";

				/*
					ANY KIND
						dropTarget -> 1 callback
						movable -> 1 callback
						event -> N callback

					BOXBUTTON ONLY
						setCallback -> 1 callback
				*/

				//Events Editor
				self.UIcomponents.events_window = new JsWindow();
				self.UIcomponents.events_window.setWidth(260);
				self.UIcomponents.events_window.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
				self.UIcomponents.events_window.setTitle("Events Editor");

				//events tab
				self.UIcomponents.events_tab = new JsTab();
				self.UIcomponents.events_tab.addTab("Methods/CallBacks");
				self.UIcomponents.events_tab.addTab("Handlers");
				if (browserType=="ie")
				{
					self.UIcomponents.events_tab.setWidth("100%");
					self.UIcomponents.events_tab.setHeight("100%");
				}
				else
				{
					self.UIcomponents.events_tab.style.position = "absolute";
					self.UIcomponents.events_tab.style.top = 0;
					self.UIcomponents.events_tab.style.bottom = 0;
					self.UIcomponents.events_tab.style.left = 0;
					self.UIcomponents.events_tab.style.right = 0;
				}

				//callbacks edit buttons
				self.UIcomponents.callback_add = new JsImageButton();
				self.UIcomponents.callback_del = new JsImageButton();
				self.UIcomponents.callback_edt = new JsImageButton();

				self.UIcomponents.callback_add.setSource(jsdesigner_images + "add.png");
				self.UIcomponents.callback_del.setSource(jsdesigner_images + "del.png");
				self.UIcomponents.callback_edt.setSource(jsdesigner_images + "edt.png");

				self.UIcomponents.callback_add.setToolTip("Add a CallBack");
				self.UIcomponents.callback_del.setToolTip("Del Selected CallBack");
				self.UIcomponents.callback_edt.setToolTip("Edit Selected CallBack");

				self.UIcomponents.callback_add.setWidth(16);
				self.UIcomponents.callback_add.setHeight(16);
				self.UIcomponents.callback_add.setXPos(5);
				self.UIcomponents.callback_add.setYPos(5);

				self.UIcomponents.callback_del.setWidth(16);
				self.UIcomponents.callback_del.setHeight(16);
				self.UIcomponents.callback_del.setXPos(31);
				self.UIcomponents.callback_del.setYPos(5);

				self.UIcomponents.callback_edt.setWidth(16);
				self.UIcomponents.callback_edt.setHeight(16);
				self.UIcomponents.callback_edt.setXPos(57);
				self.UIcomponents.callback_edt.setYPos(5);

				self.UIcomponents.events_tab.addItemToTab(self.UIcomponents.callback_add,0);
				self.UIcomponents.events_tab.addItemToTab(self.UIcomponents.callback_del,0);
				self.UIcomponents.events_tab.addItemToTab(self.UIcomponents.callback_edt,0);

				//callbacks view
				self.UIcomponents.callbacks_view = new JsListView();
				self.UIcomponents.callbacks_view.addColumn("CallBack",256);
				if (browserType=="ie")
				{
					self.UIcomponents.callbacks_view.setWidth("100%");
					self.UIcomponents.callbacks_view.setHeight("80%");
					self.UIcomponents.callbacks_view.setYPos(26);
				}
				else
				{
					self.UIcomponents.callbacks_view.style.position = "absolute";
					self.UIcomponents.callbacks_view.style.top = 26;
					self.UIcomponents.callbacks_view.style.bottom = 0;
					self.UIcomponents.callbacks_view.style.left = 0;
					self.UIcomponents.callbacks_view.style.right = 0;
				}

				//handlers edit buttons
				self.UIcomponents.handler_add = new JsImageButton();
				self.UIcomponents.handler_del = new JsImageButton();

				self.UIcomponents.handler_add.setSource(jsdesigner_images + "add.png");
				self.UIcomponents.handler_del.setSource(jsdesigner_images + "del.png");

				self.UIcomponents.handler_add.setToolTip("Add a CallBack Handler");
				self.UIcomponents.handler_del.setToolTip("Del Selected CallBack Handler");

				self.UIcomponents.handler_add.setWidth(16);
				self.UIcomponents.handler_add.setHeight(16);
				self.UIcomponents.handler_add.setXPos(5);
				self.UIcomponents.handler_add.setYPos(5);

				self.UIcomponents.handler_del.setWidth(16);
				self.UIcomponents.handler_del.setHeight(16);
				self.UIcomponents.handler_del.setXPos(31);
				self.UIcomponents.handler_del.setYPos(5);

				self.UIcomponents.events_tab.addItemToTab(self.UIcomponents.handler_add,1);
				self.UIcomponents.events_tab.addItemToTab(self.UIcomponents.handler_del,1);

				//handlers view
				self.UIcomponents.handlers_view = new JsListView();
				self.UIcomponents.handlers_view.addColumn("Handler",90);
				self.UIcomponents.handlers_view.addColumn("Event",80);
				self.UIcomponents.handlers_view.addColumn("CallBack",90);
				if (browserType=="ie")
				{
					self.UIcomponents.handlers_view.setWidth("100%");
					self.UIcomponents.handlers_view.setHeight("80%");
					self.UIcomponents.handlers_view.setYPos(26);
				}
				else
				{
					self.UIcomponents.handlers_view.style.position = "absolute";
					self.UIcomponents.handlers_view.style.top = 26;
					self.UIcomponents.handlers_view.style.bottom = 0;
					self.UIcomponents.handlers_view.style.left = 0;
					self.UIcomponents.handlers_view.style.right = 0;
				}

				self.UIcomponents.events_tab.addItemToTab(self.UIcomponents.callbacks_view,0);
				self.UIcomponents.events_tab.addItemToTab(self.UIcomponents.handlers_view,1);
				self.UIcomponents.events_window.addItem(self.UIcomponents.events_tab);
				//self.UIcomponents.events_window.addItem(self.UIcomponents.handlers_view);
				/**/

				//Build Left Dock
				self.UIcomponents.dock.addItem(self.UIcomponents.widgetwindow);
				self.UIcomponents.dock.addItem(self.UIcomponents.events_window);

				//Build Right Dock
				self.UIcomponents.dock2.addItem(self.UIcomponents.object_window);
				self.UIcomponents.dock2.addItem(self.UIcomponents.properties_window);

				//Build IDE
				self.addItem(self.UIcomponents.dock);
				self.addItem(self.UIcomponents.dock2);

				self.UIcomponents.dock.style.zIndex=2;
				self.UIcomponents.dock2.style.zIndex=2;

				//Code Editor
				self.UIcomponents.codeeditorwindow = new JsDialog("JsWindow");
				self.UIcomponents.codeeditorwindow.setModal(true);
				//self.UIcomponents.codeeditorwindow.setTitle("Method/CallBack Editor");
				self.UIcomponents.codeeditorwindow.setWidth(870);
				self.UIcomponents.codeeditorwindow.setHeight(460);

				self.UIcomponents.codeeditorlabel = new JsLabel("codeeditorlabel");
				self.UIcomponents.codeeditorlabel.setWidth(240);
				self.UIcomponents.codeeditorlabel.setXPos(5);
				self.UIcomponents.codeeditorlabel.setYPos(15);
				self.UIcomponents.codeeditorlabel.setValue("Method/CallBack Name: self.UIcallbacks.");

				self.UIcomponents.codeeditorwindow.addItem(self.UIcomponents.codeeditorlabel);

				self.UIcomponents.codeeditorname = new JsLineEdit("codeeditorname");
				self.UIcomponents.codeeditorname.setWidth(200);
				self.UIcomponents.codeeditorname.setXPos(235);
				self.UIcomponents.codeeditorname.setYPos(10);

				self.UIcomponents.codeeditorwindow.addItem(self.UIcomponents.codeeditorname);

				self.UIcomponents.codeeditor = new JsCodeEdit("codeeditor");
				self.UIcomponents.codeeditor.setWidth(873);
				self.UIcomponents.codeeditor.setHeight(400);
				self.UIcomponents.codeeditor.setXPos(5);
				self.UIcomponents.codeeditor.setYPos(40);
				self.UIcomponents.codeeditor.setLanguage(JS);

				self.UIcomponents.codeeditorwindow.addItem(self.UIcomponents.codeeditor);

				self.UIcomponents.codeeditorbuttonok = new JsPushButton("codeeditorbuttonok");
				self.UIcomponents.codeeditorbuttonok.setWidth(110);
				self.UIcomponents.codeeditorbuttonok.setHeight(24);
				self.UIcomponents.codeeditorbuttonok.setXPos(655);
				self.UIcomponents.codeeditorbuttonok.setYPos(450);
				self.UIcomponents.codeeditorbuttonok.setLabel("Ok");

				self.UIcomponents.codeeditorwindow.addItem(self.UIcomponents.codeeditorbuttonok);

				self.UIcomponents.codeeditorbuttoncancel = new JsPushButton("codeeditorbuttoncancel");
				self.UIcomponents.codeeditorbuttoncancel.setWidth(110);
				self.UIcomponents.codeeditorbuttoncancel.setHeight(24);
				self.UIcomponents.codeeditorbuttoncancel.setXPos(769);
				self.UIcomponents.codeeditorbuttoncancel.setYPos(450);
				self.UIcomponents.codeeditorbuttoncancel.setLabel("Cancel");

				self.UIcomponents.codeeditorwindow.addItem(self.UIcomponents.codeeditorbuttoncancel);

				//handlers
				self.UIcomponents.handlerscombo = new JsComboBox();
				self.UIcomponents.eventscombo = new JsComboBox();
				self.UIcomponents.callbackscombo = new JsComboBox();

				self.UIcomponents.handlerscombo.setWidth("100%")
				self.UIcomponents.eventscombo.setWidth("100%")
				self.UIcomponents.callbackscombo.setWidth("100%")

				//Menu Dialog
				self.UIcomponents.menu_dialog = new JsDialog("menu_dialog");
				self.UIcomponents.menu_dialog.setWidth(500);
				self.UIcomponents.menu_dialog.setHeight(300);
				self.UIcomponents.menu_dialog.setModal(true);

				self.UIcomponents.menu_item_view = new JsListView("menu_item_view");
				self.UIcomponents.menu_item_view.setOrdered(false);
				self.UIcomponents.menu_item_view.setWidth(180);
				self.UIcomponents.menu_item_view.setHeight(275);
				self.UIcomponents.menu_item_view.setXPos(10);
				self.UIcomponents.menu_item_view.setYPos(30);
				self.UIcomponents.menu_item_view.addColumn("Item Label",105);
				self.UIcomponents.menu_item_view.addColumn("CallBack",100);

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_item_view);

				self.UIcomponents.menu_move_up_bt = new JsPushButton("menu_move_up_bt");
				self.UIcomponents.menu_move_up_bt.setWidth(24);
				self.UIcomponents.menu_move_up_bt.setHeight(24);
				self.UIcomponents.menu_move_up_bt.setXPos(200);
				self.UIcomponents.menu_move_up_bt.setYPos(130);
				self.UIcomponents.menu_move_up_bt.setLabel("\u25B2");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_move_up_bt);

				self.UIcomponents.menu_move_down_bt = new JsPushButton("menu_move_down_bt");
				self.UIcomponents.menu_move_down_bt.setWidth(24);
				self.UIcomponents.menu_move_down_bt.setHeight(24);
				self.UIcomponents.menu_move_down_bt.setXPos(200);
				self.UIcomponents.menu_move_down_bt.setYPos(160);
				self.UIcomponents.menu_move_down_bt.setLabel("\u25BC");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_move_down_bt);

				self.UIcomponents.menu_edt_label = new JsLabel("menu_edt_label");
				self.UIcomponents.menu_edt_label.setWidth(183);
				self.UIcomponents.menu_edt_label.setXPos(10);
				self.UIcomponents.menu_edt_label.setYPos(10);
				self.UIcomponents.menu_edt_label.setValue("Menu/MenuBar Editor");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_edt_label);

				self.UIcomponents.menu_item_label = new JsLabel("menu_item_label");
				self.UIcomponents.menu_item_label.setWidth(97);
				self.UIcomponents.menu_item_label.setXPos(240);
				self.UIcomponents.menu_item_label.setYPos(35);
				self.UIcomponents.menu_item_label.setValue("Item Label");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_item_label);

				self.UIcomponents.menu_item_callback = new JsLabel("menu_item_callback");
				self.UIcomponents.menu_item_callback.setWidth(90);
				self.UIcomponents.menu_item_callback.setXPos(240);
				self.UIcomponents.menu_item_callback.setYPos(65);
				self.UIcomponents.menu_item_callback.setValue("Click CallBack");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_item_callback);

				self.UIcomponents.menu_item_icon = new JsLabel("menu_item_icon");
				self.UIcomponents.menu_item_icon.setWidth(60);
				self.UIcomponents.menu_item_icon.setXPos(240);
				self.UIcomponents.menu_item_icon.setYPos(95);
				self.UIcomponents.menu_item_icon.setValue("Icon");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_item_icon);

				self.UIcomponents.menu_icon_combo = new JsComboBox("menu_icon_combo");
				self.UIcomponents.menu_icon_combo.setWidth(180);
				self.UIcomponents.menu_icon_combo.setXPos(325);
				self.UIcomponents.menu_icon_combo.setYPos(90);

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_icon_combo);

				self.UIcomponents.menu_callback_combo = new JsComboBox("menu_callback_combo");
				self.UIcomponents.menu_callback_combo.setWidth(180);
				self.UIcomponents.menu_callback_combo.setXPos(325);
				self.UIcomponents.menu_callback_combo.setYPos(60);

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_callback_combo);

				self.UIcomponents.menu_item_label_edit = new JsLineEdit("menu_item_label_edit");
				self.UIcomponents.menu_item_label_edit.setWidth(180);
				self.UIcomponents.menu_item_label_edit.setXPos(325);
				self.UIcomponents.menu_item_label_edit.setYPos(30);

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_item_label_edit);

				self.UIcomponents.menu_ok = new JsPushButton("menu_ok");
				self.UIcomponents.menu_ok.setWidth(130);
				self.UIcomponents.menu_ok.setHeight(24);
				self.UIcomponents.menu_ok.setXPos(380);
				self.UIcomponents.menu_ok.setYPos(255);
				self.UIcomponents.menu_ok.setLabel("Ok");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_ok);

				self.UIcomponents.menu_cancel = new JsPushButton("menu_cancel");
				self.UIcomponents.menu_cancel.setWidth(130);
				self.UIcomponents.menu_cancel.setHeight(24);
				self.UIcomponents.menu_cancel.setXPos(380);
				self.UIcomponents.menu_cancel.setYPos(285);
				self.UIcomponents.menu_cancel.setLabel("Cancel");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_cancel);

				self.UIcomponents.menu_save_button = new JsPushButton("menu_save_button");
				self.UIcomponents.menu_save_button.setWidth(130);
				self.UIcomponents.menu_save_button.setHeight(24);
				self.UIcomponents.menu_save_button.setXPos(245);
				self.UIcomponents.menu_save_button.setYPos(225);
				self.UIcomponents.menu_save_button.setLabel("Save Item");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_save_button);

				self.UIcomponents.menu_add_button = new JsPushButton("menu_add_button");
				self.UIcomponents.menu_add_button.setWidth(130);
				self.UIcomponents.menu_add_button.setHeight(24);
				self.UIcomponents.menu_add_button.setXPos(245);
				self.UIcomponents.menu_add_button.setYPos(195);
				self.UIcomponents.menu_add_button.setLabel("Add Item");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_add_button);

				self.UIcomponents.menu_delete_button = new JsPushButton("menu_delete_button");
				self.UIcomponents.menu_delete_button.setWidth(130);
				self.UIcomponents.menu_delete_button.setHeight(24);
				self.UIcomponents.menu_delete_button.setXPos(245);
				self.UIcomponents.menu_delete_button.setYPos(255);
				self.UIcomponents.menu_delete_button.setLabel("Delete Item");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_delete_button);

				self.UIcomponents.menu_add_divisor = new JsPushButton("menu_add_divisor");
				self.UIcomponents.menu_add_divisor.setWidth(130);
				self.UIcomponents.menu_add_divisor.setHeight(24);
				self.UIcomponents.menu_add_divisor.setXPos(245);
				self.UIcomponents.menu_add_divisor.setYPos(285);
				self.UIcomponents.menu_add_divisor.setLabel("Add Divisor");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_add_divisor);

				self.UIcomponents.menu_add_sub = new JsPushButton("menu_add_sub");
				self.UIcomponents.menu_add_sub.setWidth(130);
				self.UIcomponents.menu_add_sub.setHeight(24);
				self.UIcomponents.menu_add_sub.setXPos(380);
				self.UIcomponents.menu_add_sub.setYPos(195);
				self.UIcomponents.menu_add_sub.setLabel("Add as SubMenu");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_add_sub);

				self.UIcomponents.menu_save_sub = new JsPushButton("menu_save_sub");
				self.UIcomponents.menu_save_sub.setWidth(130);
				self.UIcomponents.menu_save_sub.setHeight(24);
				self.UIcomponents.menu_save_sub.setXPos(380);
				self.UIcomponents.menu_save_sub.setYPos(225);
				self.UIcomponents.menu_save_sub.setLabel("Save SubMenu");

				self.UIcomponents.menu_dialog.addItem(self.UIcomponents.menu_save_sub);

				//toolbar dialog
				self.UIcomponents.toolbar_dialog = new JsDialog("ToolBarEditor");
				self.UIcomponents.toolbar_dialog.setWidth(500);
				self.UIcomponents.toolbar_dialog.setHeight(300);
				self.UIcomponents.toolbar_dialog.setModal(true)

				self.UIcomponents.toolbar_item_view = new JsListView("toolbar_item_view");
				self.UIcomponents.toolbar_item_view.setOrdered(false);
				self.UIcomponents.toolbar_item_view.setWidth(180);
				self.UIcomponents.toolbar_item_view.setHeight(275);
				self.UIcomponents.toolbar_item_view.setXPos(10);
				self.UIcomponents.toolbar_item_view.setYPos(30);
				self.UIcomponents.toolbar_item_view.addColumn("Button",105);
				self.UIcomponents.toolbar_item_view.addColumn("CallBack",100);

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_item_view);

				self.UIcomponents.toolbar_move_up_bt = new JsPushButton("toolbar_move_up_bt");
				self.UIcomponents.toolbar_move_up_bt.setWidth(24);
				self.UIcomponents.toolbar_move_up_bt.setHeight(24);
				self.UIcomponents.toolbar_move_up_bt.setXPos(200);
				self.UIcomponents.toolbar_move_up_bt.setYPos(130);
				self.UIcomponents.toolbar_move_up_bt.setLabel("\u25B2");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_move_up_bt);

				self.UIcomponents.toolbar_move_down_bt = new JsPushButton("toolbar_move_down_bt");
				self.UIcomponents.toolbar_move_down_bt.setWidth(24);
				self.UIcomponents.toolbar_move_down_bt.setHeight(24);
				self.UIcomponents.toolbar_move_down_bt.setXPos(200);
				self.UIcomponents.toolbar_move_down_bt.setYPos(160);
				self.UIcomponents.toolbar_move_down_bt.setLabel("\u25BC");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_move_down_bt);

				self.UIcomponents.toolbar_label = new JsLabel("toolbar_label");
				self.UIcomponents.toolbar_label.setWidth(183);
				self.UIcomponents.toolbar_label.setXPos(10);
				self.UIcomponents.toolbar_label.setYPos(10);
				self.UIcomponents.toolbar_label.setValue("ToolBar/MiniToolBar Editor");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_label);

				self.UIcomponents.toolbar_tooltip_label = new JsLabel("toolbar_tooltip_label");
				self.UIcomponents.toolbar_tooltip_label.setWidth(97);
				self.UIcomponents.toolbar_tooltip_label.setXPos(240);
				self.UIcomponents.toolbar_tooltip_label.setYPos(35);
				self.UIcomponents.toolbar_tooltip_label.setValue("Button Tooltip");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_tooltip_label);

				self.UIcomponents.toolbar_callback_label = new JsLabel("toolbar_callback_label");
				self.UIcomponents.toolbar_callback_label.setWidth(90);
				self.UIcomponents.toolbar_callback_label.setXPos(240);
				self.UIcomponents.toolbar_callback_label.setYPos(64);
				self.UIcomponents.toolbar_callback_label.setValue("Click CallBack");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_callback_label);

				self.UIcomponents.toolbar_icon_label = new JsLabel("toolbar_icon_label");
				self.UIcomponents.toolbar_icon_label.setWidth(60);
				self.UIcomponents.toolbar_icon_label.setXPos(240);
				self.UIcomponents.toolbar_icon_label.setYPos(95);
				self.UIcomponents.toolbar_icon_label.setValue("Icon");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_icon_label);

				self.UIcomponents.toolbar_icon_combo = new JsComboBox("toolbar_icon_combo");
				self.UIcomponents.toolbar_icon_combo.setWidth(180);
				self.UIcomponents.toolbar_icon_combo.setXPos(325);
				self.UIcomponents.toolbar_icon_combo.setYPos(90);

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_icon_combo);

				self.UIcomponents.toolbar_callback_combo = new JsComboBox("toolbar_callback_combo");
				self.UIcomponents.toolbar_callback_combo.setWidth(180);
				self.UIcomponents.toolbar_callback_combo.setXPos(325);
				self.UIcomponents.toolbar_callback_combo.setYPos(60);

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_callback_combo);

				self.UIcomponents.toolbar_tooltip_edit = new JsLineEdit("toolbar_tooltip_edit");
				self.UIcomponents.toolbar_tooltip_edit.setWidth(180);
				self.UIcomponents.toolbar_tooltip_edit.setXPos(325);
				self.UIcomponents.toolbar_tooltip_edit.setYPos(30);

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_tooltip_edit);

				self.UIcomponents.toolbar_ok = new JsPushButton("toolbar_ok");
				self.UIcomponents.toolbar_ok.setWidth(130);
				self.UIcomponents.toolbar_ok.setHeight(24);
				self.UIcomponents.toolbar_ok.setXPos(380);
				self.UIcomponents.toolbar_ok.setYPos(255);
				self.UIcomponents.toolbar_ok.setLabel("Ok");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_ok);

				self.UIcomponents.toolbar_cancel = new JsPushButton("toolbar_cancel");
				self.UIcomponents.toolbar_cancel.setWidth(130);
				self.UIcomponents.toolbar_cancel.setHeight(24);
				self.UIcomponents.toolbar_cancel.setXPos(380);
				self.UIcomponents.toolbar_cancel.setYPos(285);
				self.UIcomponents.toolbar_cancel.setLabel("Cancel");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_cancel);

				self.UIcomponents.toolbar_save = new JsPushButton("toolbar_save");
				self.UIcomponents.toolbar_save.setWidth(130);
				self.UIcomponents.toolbar_save.setHeight(24);
				self.UIcomponents.toolbar_save.setXPos(245);
				self.UIcomponents.toolbar_save.setYPos(225);
				self.UIcomponents.toolbar_save.setLabel("Save Button");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_save);

				self.UIcomponents.toolbar_add = new JsPushButton("toolbar_add");
				self.UIcomponents.toolbar_add.setWidth(130);
				self.UIcomponents.toolbar_add.setHeight(24);
				self.UIcomponents.toolbar_add.setXPos(245);
				self.UIcomponents.toolbar_add.setYPos(195);
				self.UIcomponents.toolbar_add.setLabel("Add Button");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_add);

				self.UIcomponents.toolbar_delete = new JsPushButton("toolbar_delete");
				self.UIcomponents.toolbar_delete.setWidth(130);
				self.UIcomponents.toolbar_delete.setHeight(24);
				self.UIcomponents.toolbar_delete.setXPos(245);
				self.UIcomponents.toolbar_delete.setYPos(255);
				self.UIcomponents.toolbar_delete.setLabel("Delete Button");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_delete);

				self.UIcomponents.toolbar_add_divisor = new JsPushButton("toolbar_add_divisor");
				self.UIcomponents.toolbar_add_divisor.setWidth(130);
				self.UIcomponents.toolbar_add_divisor.setHeight(24);
				self.UIcomponents.toolbar_add_divisor.setXPos(245);
				self.UIcomponents.toolbar_add_divisor.setYPos(285);
				self.UIcomponents.toolbar_add_divisor.setLabel("Add Divisor");

				self.UIcomponents.toolbar_dialog.addItem(self.UIcomponents.toolbar_add_divisor);

				//ListView/DataView Editor
				self.UIcomponents.listdata_dialog = new JsDialog("listdata_dialog");
				self.UIcomponents.listdata_dialog.setWidth(500);
				self.UIcomponents.listdata_dialog.setHeight(300);
				self.UIcomponents.listdata_dialog.setModal(true);

				self.UIcomponents.lv_dv_item_view = new JsListView("lv_dv_item_view");
				self.UIcomponents.lv_dv_item_view.setOrdered(false);
				self.UIcomponents.lv_dv_item_view.setWidth(180);
				self.UIcomponents.lv_dv_item_view.setHeight(275);
				self.UIcomponents.lv_dv_item_view.setXPos(10);
				self.UIcomponents.lv_dv_item_view.setYPos(30);
				self.UIcomponents.lv_dv_item_view.addColumn("Column Name",105);
				self.UIcomponents.lv_dv_item_view.addColumn("Width",100);

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.lv_dv_item_view);

				self.UIcomponents.move_up_bt = new JsPushButton("move_up_bt");
				self.UIcomponents.move_up_bt.setWidth(24);
				self.UIcomponents.move_up_bt.setHeight(24);
				self.UIcomponents.move_up_bt.setXPos(200);
				self.UIcomponents.move_up_bt.setYPos(130);
				self.UIcomponents.move_up_bt.setLabel("\u25B2");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.move_up_bt);

				self.UIcomponents.move_down_bt = new JsPushButton("move_down_bt");
				self.UIcomponents.move_down_bt.setWidth(24);
				self.UIcomponents.move_down_bt.setHeight(24);
				self.UIcomponents.move_down_bt.setXPos(200);
				self.UIcomponents.move_down_bt.setYPos(160);
				self.UIcomponents.move_down_bt.setLabel("\u25BC");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.move_down_bt);

				self.UIcomponents.lv_dv_label = new JsLabel("lv_dv_label");
				self.UIcomponents.lv_dv_label.setWidth(183);
				self.UIcomponents.lv_dv_label.setXPos(10);
				self.UIcomponents.lv_dv_label.setYPos(10);
				self.UIcomponents.lv_dv_label.setValue("JsListView/JsDataView Editor");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.lv_dv_label);

				self.UIcomponents.column_name_label = new JsLabel("column_name_label");
				self.UIcomponents.column_name_label.setWidth(97);
				self.UIcomponents.column_name_label.setXPos(240);
				self.UIcomponents.column_name_label.setYPos(35);
				self.UIcomponents.column_name_label.setValue("Column Name");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.column_name_label);

				self.UIcomponents.column_width_label = new JsLabel("column_width_label");
				self.UIcomponents.column_width_label.setWidth(91);
				self.UIcomponents.column_width_label.setXPos(240);
				self.UIcomponents.column_width_label.setYPos(65);
				self.UIcomponents.column_width_label.setValue("Column Width");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.column_width_label);

				self.UIcomponents.column_icon_label = new JsLabel("column_icon_label");
				self.UIcomponents.column_icon_label.setWidth(60);
				self.UIcomponents.column_icon_label.setXPos(240);
				self.UIcomponents.column_icon_label.setYPos(95);
				self.UIcomponents.column_icon_label.setValue("Icon");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.column_icon_label);

				self.UIcomponents.column_icon_cb = new JsComboBox("column_icon_cb");
				self.UIcomponents.column_icon_cb.setWidth(180);
				self.UIcomponents.column_icon_cb.setXPos(325);
				self.UIcomponents.column_icon_cb.setYPos(90);

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.column_icon_cb);

				self.UIcomponents.column_width_sb = new JsSpinBox("column_width_sb");
				self.UIcomponents.column_width_sb.setWidth(180);
				self.UIcomponents.column_width_sb.setXPos(326);
				self.UIcomponents.column_width_sb.setYPos(60);

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.column_width_sb);

				self.UIcomponents.column_name_le = new JsLineEdit("column_name_le");
				self.UIcomponents.column_name_le.setWidth(180);
				self.UIcomponents.column_name_le.setXPos(325);
				self.UIcomponents.column_name_le.setYPos(30);

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.column_name_le);

				self.UIcomponents.lv_dv_ok_bt = new JsPushButton("lv_dv_ok_bt");
				self.UIcomponents.lv_dv_ok_bt.setWidth(130);
				self.UIcomponents.lv_dv_ok_bt.setHeight(24);
				self.UIcomponents.lv_dv_ok_bt.setXPos(380);
				self.UIcomponents.lv_dv_ok_bt.setYPos(255);
				self.UIcomponents.lv_dv_ok_bt.setLabel("Ok");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.lv_dv_ok_bt);

				self.UIcomponents.lv_dv_cancel_bt = new JsPushButton("lv_dv_cancel_bt");
				self.UIcomponents.lv_dv_cancel_bt.setWidth(130);
				self.UIcomponents.lv_dv_cancel_bt.setHeight(24);
				self.UIcomponents.lv_dv_cancel_bt.setXPos(380);
				self.UIcomponents.lv_dv_cancel_bt.setYPos(285);
				self.UIcomponents.lv_dv_cancel_bt.setLabel("Cancel");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.lv_dv_cancel_bt);

				self.UIcomponents.lv_dv_save_bt = new JsPushButton("lv_dv_save_bt");
				self.UIcomponents.lv_dv_save_bt.setWidth(130);
				self.UIcomponents.lv_dv_save_bt.setHeight(24);
				self.UIcomponents.lv_dv_save_bt.setXPos(245);
				self.UIcomponents.lv_dv_save_bt.setYPos(225);
				self.UIcomponents.lv_dv_save_bt.setLabel("Save Column");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.lv_dv_save_bt);

				self.UIcomponents.lv_dv_add_bt = new JsPushButton("lv_dv_add_bt");
				self.UIcomponents.lv_dv_add_bt.setWidth(130);
				self.UIcomponents.lv_dv_add_bt.setHeight(24);
				self.UIcomponents.lv_dv_add_bt.setXPos(245);
				self.UIcomponents.lv_dv_add_bt.setYPos(255);
				self.UIcomponents.lv_dv_add_bt.setLabel("Add Column");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.lv_dv_add_bt);

				self.UIcomponents.lv_dv_del_bt = new JsPushButton("lv_dv_del_bt");
				self.UIcomponents.lv_dv_del_bt.setWidth(130);
				self.UIcomponents.lv_dv_del_bt.setHeight(24);
				self.UIcomponents.lv_dv_del_bt.setXPos(245);
				self.UIcomponents.lv_dv_del_bt.setYPos(285);
				self.UIcomponents.lv_dv_del_bt.setLabel("Delete Column");

				self.UIcomponents.listdata_dialog.addItem(self.UIcomponents.lv_dv_del_bt);

				//File Upload Select Dialog
				self.UIcomponents.file_select_dialog = new JsDialog();
				self.UIcomponents.file_select_dialog.setWidth(234);
				self.UIcomponents.file_select_dialog.setHeight(85);
				self.UIcomponents.file_select_dialog.setModal(true);

				self.UIcomponents.file_select_upload = new JsUpLoad("file_select_upload");
				self.UIcomponents.file_select_upload.setWidth(223);
				self.UIcomponents.file_select_upload.setXPos(15);
				self.UIcomponents.file_select_upload.setYPos(35);

				self.UIcomponents.file_select_dialog.addItem(self.UIcomponents.file_select_upload);

				self.UIcomponents.file_select_cancel = new JsPushButton("file_select_cancel");
				self.UIcomponents.file_select_cancel.setWidth(110);
				self.UIcomponents.file_select_cancel.setHeight(24);
				self.UIcomponents.file_select_cancel.setXPos(15);
				self.UIcomponents.file_select_cancel.setYPos(65);
				self.UIcomponents.file_select_cancel.setLabel("Cancel");

				self.UIcomponents.file_select_dialog.addItem(self.UIcomponents.file_select_cancel);

				self.UIcomponents.file_select_ok = new JsPushButton("file_select_ok");
				self.UIcomponents.file_select_ok.setWidth(110);
				self.UIcomponents.file_select_ok.setHeight(24);
				self.UIcomponents.file_select_ok.setXPos(130);
				self.UIcomponents.file_select_ok.setYPos(65);
				self.UIcomponents.file_select_ok.setLabel("Ok");

				self.UIcomponents.file_select_dialog.addItem(self.UIcomponents.file_select_ok);

				self.UIcomponents.file_select_label = new JsLabel("file_select_label");
				self.UIcomponents.file_select_label.setWidth(93);
				self.UIcomponents.file_select_label.setXPos(15);
				self.UIcomponents.file_select_label.setYPos(15);
				self.UIcomponents.file_select_label.setValue("File Selector");

				self.UIcomponents.file_select_dialog.addItem(self.UIcomponents.file_select_label);

				//loads Events Combo
				for (var i in events_list)
				{
					self.UIcomponents.eventscombo.addItem(events_list[i]);
				}

				/************End of User defined**********/
		};

		/***********************************/
		/***************EVENTS**************/
		/***********************************/

		self.createEvents = function()
		{
			//we place the events on an array so we can easily recover
			//them when loading the interface on JsDesigner
			self.UIcallbacks = new Array();

				/***************User defined**************/
				//sets the resize action ok
				self.UIcallbacks.resizeMe = function()
				{
					windowHeight = document.body.clientHeight;
					self.setHeight(parseInt(windowHeight) - 70);
					if (currDialog.style.visibility == "visible")
					currDialog.showDialog();
					self.UIcomponents.widgetwindow.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
					self.UIcomponents.object_window.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
					self.UIcomponents.properties_window.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
					self.UIcomponents.events_window.setHeight(parseInt((windowHeight - decreasefactorwindow)/2));
				}

				//shows the new dialog window
				self.UIcallbacks.showNewDialog = function(jsEvent)
				{
					if (currInterface)
					{
						if (confirm("Are you sure you want to create a New Interface?\nThis action will close the current one, without saving."))
						{
							if (currDialog)
								currDialog.hideDialog();
							currDialog = self.UIcomponents.newdialog;
							self.UIcomponents.newdialog.showDialog();
							self.delItem(currInterface);
							self.UIcomponents.obj_view.clearData();
							self.UIcomponents.prop_view.clearData();
							self.UIcomponents.callbacks_view.clearData();
							self.UIcomponents.handlers_view.clearData();
							currInterface = null;
						}
					}
					else
					{
						if (currDialog)
							currDialog.hideDialog();
						currDialog = self.UIcomponents.newdialog;
						self.UIcomponents.newdialog.showDialog();
					}
				}

				self.UIcallbacks.hideOpenDialog = function(jsEvent)
				{
					if (currInterface)
					{
						self.UIcomponents.opendialog.hideDialog();
					}
					else
					{
						self.UIcallbacks.showNewDialog();
					}
				}

				//loads the list of created interfaces to open
				self.UIcallbacks.loadInterfaceOpenList = function(jsEvent)
				{
					for (var i=0; i< interfaces_list.length;i++)
					{
						obj = new JsListViewItem();
						self.UIcomponents.filelist.addItem(obj);

						obj.addItem(interfaces_list[i]);
						obj.setEvent("dblclick",self.UIcallbacks.openInterface);
					}
				}

				//shows the open dialog
				self.UIcallbacks.showOpenDialog = function(jsEvent)
				{
					if (currInterface)
					{
						if (confirm("Are you sure you want to create a New Interface?\nThis action will close the current one, without saving."))
						{
							self.UIcomponents.filelist.clearData();

							if (currDialog)
								currDialog.hideDialog();
							currDialog = self.UIcomponents.opendialog;

							self.UIcomponents.opendialog.showDialog();
							document.body.request.setFieldValue("control_msg","loadInterfacesList");
							document.body.request.postData(self.loadInterfaceOpenList);
							self.delItem(currInterface);
							self.UIcomponents.obj_view.clearData();
							self.UIcomponents.prop_view.clearData();
							self.UIcomponents.callbacks_view.clearData();
							self.UIcomponents.handlers_view.clearData();
							currInterface = null;
						}
					}
					else
					{
						self.UIcomponents.filelist.clearData();

						if (currDialog)
							currDialog.hideDialog();
						currDialog = self.UIcomponents.opendialog;
						self.UIcomponents.opendialog.showDialog();
						document.body.request.setFieldValue("control_msg","loadInterfacesList");
						document.body.request.postData(self.loadInterfaceOpenList);
					}
				}

				//load the currInterface
				self.UIcallbacks.openInterface = function(jsEvent)
				{
					if (!self.UIcomponents.filelist.selectedItem)
					{
						alert("Select an interface");
						return false;
					}
					else
					{
						document.body.request.setFieldValue("control_msg","loadInterface");
						document.body.request.setFieldValue("interface_name",self.UIcomponents.filelist.selectedItem.getValue()[0]);
						document.body.request.postData(self.UIcallbacks.processOpenedInterface);
						currDialog.hideDialog();
					}
				}

				//process the opened interface, so it can be edited
				self.UIcallbacks.processOpenedInterface = function()
				{
					try
					{
						currInterface = new openedInterface;
						currContainer = currInterface;

						if (currInterface.type == "JsWindow")
							currInterface.windowarea.style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
						else
							currInterface.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";

						if (currContainer.type == "JsWindow")
							currContainer.unsetClosable();

						self.UIcallbacks.processInterface(false);

						//load UI components
						for (var js_i in currInterface.UIcomponents)
						{
							currInterface.UIcomponents[js_i].jsGridStep = 10;
							self.UIcallbacks.addEventsToWidget(currInterface.UIcomponents[js_i]);
							currInterface.UIcomponents[js_i].name = js_i;
							currContainer = currInterface.UIcomponents[js_i].js_parent_container;
							if (JsCounter[currInterface.UIcomponents[js_i].type])
								JsCounter[currInterface.UIcomponents[js_i].type]++;
							else
								JsCounter[currInterface.UIcomponents[js_i].type] = 1;
							self.UIcallbacks.createNavigator(currInterface.UIcomponents[js_i]);

							if (currInterface.UIcomponents[js_i].type=="JsLabel")
								currInterface.UIcomponents[js_i].setEditable();

							if (currInterface.UIcomponents[js_i].type == "JsMenuBar" || currInterface.UIcomponents[js_i].type == "JsMenu")
								currInterface.UIcomponents[js_i].setEvent("dblclick",self.UIcallbacks.show_menu_dialog)

							if (currInterface.UIcomponents[js_i].type == "JsToolBar" || currInterface.UIcomponents[js_i].type == "JsMiniToolBar")
								currInterface.UIcomponents[js_i].setEvent("dblclick",self.UIcallbacks.show_toolbar_dialog)

							if (currInterface.UIcomponents[js_i].type=="JsTab")
							{
								currInterface.UIcomponents[js_i].stack.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";

								for (js_j=0;js_j<currInterface.UIcomponents[js_i].tabrow.childNodes.length;js_j++)
								{
									currInterface.UIcomponents[js_i].tabrow.childNodes[js_j].setEditable();
								}

								currInterface.UIcomponents[js_i].showTab(0);
							}

							if (currInterface.UIcomponents[js_i].type=="JsFieldSet")
							{
								if (currInterface.UIcomponents[js_i].parentNode.type == "JsDialog")
								{
									currInterface.UIcomponents[js_i].fieldset.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";
									currInterface.UIcomponents[js_i].style.backgroundColor = "#22262f";
								}
								else
								{
									currInterface.UIcomponents[js_i].fieldset.style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
									currInterface.UIcomponents[js_i].style.backgroundColor = "#FFFFFF";
								}
							}

							if (currInterface.UIcomponents[js_i].type=="JsWidgetStack")
							{
								if (currInterface.UIcomponents[js_i].parentNode.type == "JsDialog")
								{
									currInterface.UIcomponents[js_i].style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";
									currInterface.UIcomponents[js_i].style.backgroundColor = "#22262f";
								}
								else
								{
									currInterface.UIcomponents[js_i].style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
									currInterface.UIcomponents[js_i].style.backgroundColor = "#FFFFFF";
								}

								currInterface.UIcomponents[js_i].style.border = "1px dashed #AAAAAA";

								currInterface.UIcomponents[js_i].showStack(0);
							}

							if (currInterface.UIcomponents[js_i].type=="JsListView")
							{
								currInterface.UIcomponents[js_i].setEvent("dblclick",self.UIcallbacks.show_listdata_dialog);

								for (js_j=0;js_j<currInterface.UIcomponents[js_i].lvheaderdiv.childNodes.length;js_j++)
								{
									currInterface.UIcomponents[js_i].lvheaderdiv.childNodes[js_j].setEditable();
								}
							}

							if (currInterface.UIcomponents[js_i].type=="JsDataView")
							{
								currInterface.UIcomponents[js_i].setEvent("dblclick",self.UIcallbacks.show_listdata_dialog);

								for (js_j=0;js_j<currInterface.UIcomponents[js_i].dtheaderdiv.childNodes.length;js_j++)
								{
									currInterface.UIcomponents[js_i].dtheaderdiv.childNodes[js_j].setEditable();
								}
							}
						}

						//load UI callbacks
						for (var js_i in currInterface.UIcallbacks)
						{
							var temp = new JsListViewItem();
							self.UIcomponents.callbacks_view.addItem(temp);

							temp.setEvent("dblclick",self.UIcallbacks.editCallBack);

							temp.addItem(js_i);
							temp.code = currInterface.UIcallbacks[js_i]+"";
						}

						//load UI handlers
						for (var js_i in currInterface.UIcallbacksHandlers)
						{
							if (currInterface.UIcallbacksHandlers[js_i][1].type != "JsMenuBar" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMenu" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMenuItem" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsToolBar" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsToolBarButton" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMiniToolBar" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMiniToolBarButton")
							{
								var temp = new JsListViewItem();
								self.UIcomponents.handlers_view.addItem(temp);

								temp.setEvent("dblclick",self.UIcallbacks.editCallBack);

								temp.addItem(currInterface.UIcallbacksHandlers[js_i][1].name);
								temp.addItem(currInterface.UIcallbacksHandlers[js_i][0]);
								for (var js_j in currInterface.UIcallbacks)
									if (currInterface.UIcallbacksHandlers[js_i][2] == currInterface.UIcallbacks[js_j])
									{
										temp.addItem(js_j);
										break;
									}

								temp.cells[0].setEvent("dblclick",self.UIcallbacks.editHandlers)
								temp.cells[1].setEvent("dblclick",self.UIcallbacks.editEvents)
								temp.cells[2].setEvent("dblclick",self.UIcallbacks.editCallBacks)

								//unset events so we don't get odd behaviours on jsdesigner
								currInterface.UIcallbacksHandlers[js_i][1].unsetEvent(currInterface.UIcallbacksHandlers[js_i][0],currInterface.UIcallbacksHandlers[js_i][2]);
							}
						}


						self.addItem(currInterface);

						if (currInterface.type == "JsDialog")
							currInterface.showDialog();
						else
							currInterface.showWindow();
					}
					catch (e)
					{
						self.UIcomponents.obj_view.clearData();
						self.UIcomponents.handlers_view.clearData();
						self.UIcomponents.prop_view.clearData();
						self.UIcomponents.callbacks_view.clearData();
						alert("Unable to process this interface. Maybe it's not JsDesigner compatible. Try to fix it manually.\n\nException thrown: " + e);
					}
				}

				//load the list of already saved files
				self.UIcallbacks.loadInterfaceSaveList = function(jsEvent)
				{
					for (var i=0; i< interfaces_list.length;i++)
					{
						obj = new JsListViewItem();
						self.UIcomponents.filesavelist.addItem(obj);

						obj.addItem(interfaces_list[i]);
						obj.setEvent("click",function(jsEvent){self.UIcomponents.filesavename.setValue(jsTarget.getValue()[0])})
						obj.setEvent("dblclick",self.UIcallbacks.saveInterface);
					}

					self.UIcomponents.filesavename.setValue(self.UIcomponents.obj_view.childList[0].cells[0].getValue());
				}

				//show the save dialog
				self.UIcallbacks.showSaveDialog = function(jsEvent)
				{
					if (currInterface)
					{
						self.UIcomponents.filesavelist.clearData();

						if (currDialog)
							currDialog.hideDialog();
						currDialog = self.UIcomponents.savedialog;

						self.UIcomponents.savedialog.showDialog();
						document.body.request.setFieldValue("control_msg","loadInterfacesList");
						document.body.request.postData(self.loadInterfaceSaveList);
					}
					else
					{
						alert("You are not editing any interface.");
					}
				}

				//save the currInterface
				self.UIcallbacks.saveInterface = function(jsEvent)
				{
					if (!self.UIcomponents.filesavename.getValue())
					{
						alert("Please, specify a name");
						return false;
					}
					else
					{
						var name = self.UIcomponents.filesavename.getValue();
						if (name.search(valid_name_regexp) == -1)
						{
							alert("Invalid Class name\n\nValid names must start with a letter and have no spaces");
							return false;
						}
						else
						{
							if (self.UIcomponents.filesavelist.selectedItem)
							{
								if (!confirm("Are you sure you want to overwrite the selected interface?"))
								{
									self.UIcomponents.filesavelist.selectedItem.setUnselected();
									return false;
								}
							}
							else
							{
								for (var i in interfaces_list)
								{
									if (interfaces_list[i] == name)
									{
										if (!confirm("There is an existent interface with this name. \nAre you sure you want to overwrite it?"))
										{
											return false;
										}
									}
								}
							}

							self.UIcallbacks.processInterfaceForSaving(name);
						}
					}
				}

				self.UIcallbacks.buildInterfaceCode = function(obj)
				{
					 var obj_code = "";
					 obj_code += "\t\tself.UIcomponents."+obj.name+" = new "+obj.type+"(\""+obj.name+"\");\n";
					 if (!isNaN(parseInt(obj.style.width)))
					 	obj_code += "\t\tself.UIcomponents."+obj.name+".setWidth("+parseInt(obj.style.width)+");\n";
					 if (!isNaN(parseInt(obj.style.height)))
					 	obj_code += "\t\tself.UIcomponents."+obj.name+".setHeight("+parseInt(obj.style.height)+");\n";
					 if (!isNaN(parseInt(obj.style.left)))
					 	obj_code += "\t\tself.UIcomponents."+obj.name+".setXPos("+parseInt(obj.style.left)+");\n";
					 if (!isNaN(parseInt(obj.style.top)))
					 	obj_code += "\t\tself.UIcomponents."+obj.name+".setYPos("+parseInt(obj.style.top)+");\n";

					 if (obj.title)
					 	obj_code += "\t\tself.UIcomponents."+obj.name+".setToolTip(\""+obj.title+"\");\n";

					//JsLabel
					if (obj.type=="JsLabel")
						obj_code += "\t\tself.UIcomponents."+obj.name+".setValue(\""+obj.getValue()+"\");\n";

					//JsWindow
					if (obj.type=="JsWindow")
						obj_code += "\t\tself.UIcomponents."+obj.name+".setTitle(\""+obj.titlebar.getValue()+"\");\n";

					//JsFieldSet
					if (obj.type=="JsFieldSet")
						obj_code += "\t\tself.UIcomponents."+obj.name+".setLegend(\""+obj.legendlabel.getValue()+"\");\n";

					//JsTab
					if (obj.type=="JsTab")
						for (var i=0; i<obj.stack.childNodes.length;i++)
							obj_code += "\t\tself.UIcomponents."+obj.name+".addTab(\""+obj.tabrow.childNodes[i].getValue()+"\");\n";

					//JsWidgetStack
					if (obj.type=="JsWidgetStack")
						for (var i=0; i<obj.childNodes.length;i++)
							obj_code += "\t\tself.UIcomponents."+obj.name+".addStack();\n";

					//JsRadioButton
					if (obj.type=="JsRadioButton")
						for (var i=0; i<obj.childNodes.length;i++)
							obj_code += "\t\tself.UIcomponents."+obj.name+".addItem(\""+obj.childNodes[i].input.value+"\", \""+obj.childNodes[i].label.innerHTML+"\");\n";

					//JsCheckbox, JsPushButton, JsIcon labels
					if (obj.type=="JsCheckBox")
					{
						obj_code += "\t\tself.UIcomponents."+obj.name+".setLabel(\""+obj.label.innerHTML+"\");\n";
					}
					if (obj.type=="JsIcon")
					{
						obj_code += "\t\tself.UIcomponents."+obj.name+".setLabel(\""+obj.label.label.innerHTML+"\");\n";
					}
					if (obj.type=="JsPushButton")
					{
						obj_code += "\t\tself.UIcomponents."+obj.name+".setLabel(\""+obj.input.value+"\");\n";
					}

					//JsIcon, JsImage, JsImageButton image source
					if (obj.type == "JsImageButton")
						obj_code += "\t\tself.UIcomponents."+obj.name+".setSource(\""+obj.input.src+"\");\n";
					if (obj.type=="JsIcon")
						obj_code += "\t\tself.UIcomponents."+obj.name+".setSource(\""+obj.input.input.src+"\");\n";
					if (obj.type=="JsImage")
						obj_code += "\t\tself.UIcomponents."+obj.name+".setSource(\""+obj.img.src+"\");\n";

					//JsListView
					if (obj.type=="JsListView")
					{
						//add Columns
						for (var i=0; i<obj.lvheaderdiv.childNodes.length;i++)
							obj_code += "\t\tself.UIcomponents."+obj.name+".addColumn(\""+obj.lvheaderdiv.childNodes[i].getValue()+"\","+parseInt(obj.lvheaderdiv.childNodes[i].style.width)+");\n";
					}

					//JsDataView
					if (obj.type=="JsDataView")
					{
						//add Columns
						for (var i=0; i<obj.dtheaderdiv.childNodes.length;i++)
							obj_code += "\t\tself.UIcomponents."+obj.name+".addColumn(\""+obj.dtheaderdiv.childNodes[i].getValue()+"\","+parseInt(obj.dtheaderdiv.childNodes[i].style.width)+");\n";
					}

					//JsDataView
					if (obj.type=="JsComboBox" || obj.type=="JsListBox")
					{
						//add Itens
						for (var i=0; i<obj.input.options.length;i++)
							obj_code += "\t\tself.UIcomponents."+obj.name+".addItem(\""+obj.input.options[i].value+"\",\""+obj.input.options[i].text+"\");\n";
					}

					//JsWebWrapper
					if (obj.type=="JsWebWrapper")
					{
						//set page source
						obj_code += "\t\tself.UIcomponents."+obj.name+".setPage(\""+obj.iframe.src+"\");\n";
					}

					//JsToolBox
					if (obj.type=="JsToolBox")
					{
					 	obj_code += "\t\tself.UIcomponents."+obj.name+".setWidth(\""+obj.style.width+"\");\n";
					 	obj_code += "\t\tself.UIcomponents."+obj.name+".setHeight(\""+obj.style.height+"\");\n";

						//add JsBox
						for (var i=0; i<obj.childNodes.length;i++)
						{
							if (obj.childNodes[i].boxtitle.icon.src.indexOf("blank.gif") == -1)
								obj_code += "\t\tself.UIcomponents."+obj.name+".addBox(\""+obj.childNodes[i].boxtitle.getValue()+"\",\""+obj.childNodes[i].boxtitle.icon.src+"\");\n";
							else
								obj_code += "\t\tself.UIcomponents."+obj.name+".addBox(\""+obj.childNodes[i].boxtitle.getValue()+"\");\n";
						}
							//add JsBxButtons
					}

					//JsToolBar
					if (obj.type=="JsToolBar")
					{
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.position = \"\";\n";
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.left = 0;\n";
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.top = 0;\n";

						//add buttons
						for (var i=0; i<obj.childNodes.length;i++)
						{
							if (obj.childNodes[i].type == "JsToolBarButton")
							{
								self.UIcallbacks.buildInterfaceCode(obj.childNodes[i]);
							}
							else if (obj.childNodes[i].className == "jstoolbardiv")
							{
								obj_code += "\t\tself.UIcomponents."+obj.name+".addDiv();\n";
							}
						}
					}

					//JsMiniToolBar
					if (obj.type=="JsMiniToolBar")
					{
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.position = \"\";\n";
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.left = 0;\n";
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.top = 0;\n";

						//add buttons
						for (var i=0; i<obj.childNodes.length;i++)
						{
							if (obj.childNodes[i].type == "JsMiniToolBarButton")
							{
								self.UIcallbacks.buildInterfaceCode(obj.childNodes[i]);
							}
							else if (obj.childNodes[i].className == "jsminitoolbardiv")
							{
								obj_code += "\t\tself.UIcomponents."+obj.name+".addDiv();\n";
							}
						}
					}

					//JsMenu
					if (obj.type=="JsMenu")
					{
						//add menu itens
						//if menuitem is another menu
						//self.UIcallbacks.buildInterfaceCode();
						//sets the context menu
						for (var js_i in currInterface.UIcomponents)
						{
							if (currInterface.UIcomponents[js_i].menu && currInterface.UIcomponents[js_i].type != "JsMenu")
							{
								obj_code += "\n\t\t//Object Contextmenu\n";
								obj_code += "\t\tself.UIcomponents."+currInterface.UIcomponents[js_i].name+".setMenu(self.UIcomponents."+obj.menu.name+");\n";
							}
						}
					}

					//JsMenuBar
					if (obj.type=="JsMenuBar")
					{
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.position = \"\";\n";
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.left = 0;\n";
						obj_code += "\t\tself.UIcomponents."+obj.name+".style.top = 0;\n";
						obj.style.position = "";
							obj.style.left = 0;
							obj.style.top = 0;
						//add menus
						//self.UIcallbacks.buildInterfaceCode();
					}


					//add to parent
					//parent jstab r jswidgetstack?
					if (obj.js_parent_container.type == "JsTab")
						obj_code += "\n\t\tself.UIcomponents."+obj.js_parent_container.name+".addItemToTab(self.UIcomponents."+obj.name+","+obj.js_parent_stack+");\n";
					else if (obj.js_parent_container.type == "JsWidgetStack")
						obj_code += "\n\t\tself.UIcomponents."+obj.js_parent_container.name+".addItemToStack(self.UIcomponents."+obj.name+","+obj.js_parent_stack+");\n";
					else if (obj.js_parent_container.type == "JsToolBox")
						obj_code += "\n\t\tself.UIcomponents."+obj.js_parent_container.name+".addItemToBox(self.UIcomponents."+obj.name+","+obj.js_parent_box+");\n";
					else if (obj.js_parent_container == currInterface)
						obj_code += "\n\t\tself.addItem(self.UIcomponents."+obj.name+");\n";
					else
						obj_code += "\n\t\tself.UIcomponents."+obj.js_parent_container.name+".addItem(self.UIcomponents."+obj.name+");\n";

					//that's all folks!
					return obj_code + "\n";
				};

				self.UIcallbacks.processObjectNavigator = function(objs)
				{
					var interface_code = "";
					var main_obj = false;

					//if no object passed, get the currInterface and process it
					if (!objs)
					{
						var main_obj = true;
						var objs = self.UIcomponents.obj_view.childList[0].childList;

						var name = self.UIcomponents.filesavename.getValue();
						self.UIcomponents.obj_view.childList[0].cells[0].setValue(name);

						interface_code = name + " = function()\n{\n\tvar self = new ";

						if (currInterface.realType == "JsWindow")
						{
							interface_code += "JsWindow(\""+name+"\");\n";
							interface_code += "\tself.setTitle(\""+currInterface.titlebar.getValue()+"\");\n";
							interface_code += "\tself.realType = self.type;\n";
						}
						if (currInterface.realType == "JsDialog")
						{
							interface_code += "JsDialog(\""+name+"\");\n";
							interface_code += "\tself.realType = self.type;\n";
							if (browserType=="ie")
							{
								interface_code += "\tself.setWidth("+(parseInt(currInterface.style.width) - 16)+");\n";
								interface_code += "\tself.setHeight("+(parseInt(currInterface.style.height) - 26)+");\n\n";
							}
						}
						if (currInterface.realType == "JsInterface")
						{
							interface_code += "JsWidget(\""+name+"\");\n";
							interface_code += "\tself.realType = \"JsInterface\";\n";
						}

						if (browserType != "ie" || currInterface.realType != "JsDialog")
						{
							interface_code += "\tself.setWidth("+parseInt(currInterface.style.width)+");\n";
							interface_code += "\tself.setHeight("+parseInt(currInterface.style.height)+");\n\n";
						}

						if (currInterface.title)
							interface_code += "\tself.setToolTip(\""+currInterface.title+"\");\n";

						interface_code += "\n\t/***********************************/\n";
						interface_code += "\t/*************BASE64IMG*************/\n";
						interface_code += "\t/***********************************/\n\n";
						interface_code += "\tself.images = new Array();\n";

						interface_code += "\n\t/***********************************/\n";
						interface_code += "\t/*************initInterface***********/\n";
						interface_code += "\t/***********************************/\n\n";
						interface_code += "\tself.initInterface = false;\n";

						for (i in currInterface.images)
						{
							interface_code += "\tself.images[\""+i+"\"] = \"" + currInterface.images[i] + "\";\n";
						}

						interface_code += "\n\t/***********************************/\n";
						interface_code += "\t/*************INTERFACE*************/\n";
						interface_code += "\t/***********************************/\n\n";

						interface_code += "\t//this is the function used to build the interface\n";
						interface_code += "\t//it contains references to all the widgets\n\n";
						interface_code += "\tself.buildInterface = function()\n";
						interface_code += "\t{\n";
						interface_code += "\t\t//used by JsDesigner, to load and save the interface\n\n";
						interface_code += "\t\tself.UIcomponents = new Array();\n\n";
					}

					if (objs)
					{
						for (var i in objs)
						{
							interface_code += self.UIcallbacks.buildInterfaceCode(objs[i].parentWidget);

							if (objs[i].childList.length)
							{
								childobjs = objs[i].childList;
								interface_code += self.UIcallbacks.processObjectNavigator(childobjs);
							}
						}
					}

					if (main_obj)
					{
						if (currInterface.menu)
						{
							interface_code += "\t\t//Interface Contextmenu\n";
							interface_code += "\t\tself.setMenu(self.UIcomponents."+currInterface.menu.name+");\n\n";
						}
						interface_code += "\t\t//this will put the widgets accessible on a more OO way\n";
						interface_code += "\t\tfor (i in self.UIcomponents)\n";
						interface_code += "\t\t\tself[i] = self.UIcomponents[i];\n";
						interface_code += "\t};\n\n";

						interface_code += "\t/***********************************/\n";
						interface_code += "\t/***************EVENTS**************/\n";
						interface_code += "\t/***********************************/\n\n";

						interface_code += "\tself.createEvents = function()\n";
						interface_code += "\t{\n";
						interface_code += "\t\t//we place the events on an array so we can easily recover\n";
						interface_code += "\t\t//them when loading the interface on JsDesigner\n\n";
						interface_code += "\t\tself.UIcallbacks = new Array();\n\n";

						interface_code += "\t\t/***************User defined**************/\n";

						for (var i in self.UIcomponents.callbacks_view.childList)
						{
							interface_code += "\t\tself.UIcallbacks." + self.UIcomponents.callbacks_view.childList[i].cells[0].getValue() + " = " + self.UIcomponents.callbacks_view.childList[i].code.replace(/\n/g,"\n\t\t") + ";\n\n";
						}

						interface_code += "\t\t/************End of User defined**********/\n\n";

						interface_code += "\t\t//this will put the methods accessible on a more OO way\n";
						interface_code += "\t\tfor (i in self.UIcallbacks)\n";
						interface_code += "\t\t\tself[i] = self.UIcallbacks[i];\n";
						interface_code += "\t};\n\n";

						interface_code += "\t/***********************************/\n";
						interface_code += "\t/**EVENTS AND HANDLERS ATTACHMENTS**/\n";
						interface_code += "\t/***********************************/\n\n";

						interface_code += "\tself.attachEvents = function()\n";
						interface_code += "\t{\n";
						interface_code += "\t\t//Widgets events\n";
						interface_code += "\t\tself.UIcallbacksHandlers = new Array();\n\n";

						interface_code += "\t\t/*\n";
						interface_code += "\t\tArray Structure\n";
						interface_code += "\t\tself.UIcallbacksHandlers[0] = new Array();\n";
						interface_code += "\t\tself.UIcallbacksHandlers[0][0] = \"click\"	//event\n";
						interface_code += "\t\tself.UIcallbacksHandlers[0][1] = object //handler\n";
						interface_code += "\t\tself.UIcallbacksHandlers[0][2] = callback //callback\n";
						interface_code += "\t\t*/\n\n";

						for (var i in self.UIcomponents.handlers_view.childList)
						{
							var handler = self.UIcomponents.handlers_view.childList[i].cells[0].getValue();
							if (handler == currInterface.name)
								handler = "self";
							else
								handler = "self.UIcomponents." + handler;
							interface_code += "\t\tself.UIcallbacksHandlers[" + i + "] = new Array();\n";
							interface_code += "\t\tself.UIcallbacksHandlers[" + i + "][0] = \"" + self.UIcomponents.handlers_view.childList[i].cells[1].getValue() + "\";	//event\n";
							interface_code += "\t\tself.UIcallbacksHandlers[" + i + "][1] = " + handler + "; //handler\n";
							interface_code += "\t\tself.UIcallbacksHandlers[" + i + "][2] = self.UIcallbacks." + self.UIcomponents.handlers_view.childList[i].cells[2].getValue() + "; //callback\n\n";
						}

						interface_code += "\t\tfor (var js_i in self.UIcallbacksHandlers)\n";
						interface_code += "\t\t{\n";
						interface_code += "\t\t\tif (self.UIcallbacksHandlers[js_i][0] == \"callback\")\n";
						interface_code += "\t\t\t\tself.UIcallbacksHandlers[js_i][1].setCallback(self.UIcallbacksHandlers[js_i][2]);\n";
						interface_code += "\t\t\telse\n";
						interface_code += "\t\t\t\tself.UIcallbacksHandlers[js_i][1].setEvent(self.UIcallbacksHandlers[js_i][0],self.UIcallbacksHandlers[js_i][2]);\n";
						interface_code += "\t\t}\n";
						interface_code += "\t};\n\n";

						interface_code += "\t//now, we build the interface\n";
						interface_code += "\tself.buildInterface();\n";
						interface_code += "\t//we create all the events it will have\n";
						interface_code += "\tself.createEvents();\n";
						interface_code += "\t//we attach the events to it's handler\n";
						interface_code += "\tself.attachEvents();\n\n";
						interface_code += "\t//now, we init the interface\n";
						interface_code += "\tif (self.initInterface)\n\t\tself.initInterface();\n\n";


						interface_code += "\treturn self;\n\n";
						interface_code += "}\n";
					}

					return interface_code;
				};

				self.UIcallbacks.processInterfaceForSaving = function(name)
				{
					//loop object navigator
					var interface_code = self.UIcallbacks.processObjectNavigator();

					document.body.dc.setFieldValue("control_msg","saveInterface");
					document.body.dc.setFieldValue("interface_name",name);
					document.body.dc.setFieldValue("interface_code",interface_code);
					document.body.dc.postData();
					currDialog.hideDialog();
				};

				//sets the clicked object as the current widget being edited
				self.UIcallbacks.setCurrWidget = function(jsEvent)
				{
					if (jsTarget)
					{
						if (currWidget)
						{
							if (currWidget.oldbgcolor != undefined)
								currWidget.style.backgroundColor = currWidget.oldbgcolor;
							if (currWidget.type != "JsWindow")
							currWidget.unsetResizable();
						}

						if (jsTarget && jsTarget.parentWidget)
							currWidget = jsTarget.parentWidget;
						else
							currWidget = jsTarget;
						if (currWidget && currWidget.objectNavigator)
						{
							currWidget.setResizable(self.UIcallbacks.loadProperties);
							currWidget.oldbgcolor = currWidget.style.backgroundColor;
							currWidget.style.backgroundColor = "#AAAAAA";

							currWidget.objectNavigator.setSelected();
							currWidget.objectNavigator.parentWidget = currWidget;
							currWidget.objectNavigator.setEvent("click",self.UIcallbacks.setCurrWidget);

							self.UIcallbacks.loadProperties();
						}
					}
				};

				//sets the clicked container as the current container being edited
				self.UIcallbacks.setCurrContainer = function(jsEvent)
				{
					currContainer = jsTarget;

					if (jsBoxButton)
					{
						jsBoxButton.toolboxaction(jsEvent);
					}
				};

				//Create a new interface and closes the opened one
				self.UIcallbacks.createNewInterface = function(jsEvent)
				{
					if (currInterface)
						self.delItem(currInterface);

					interfaceType = jsTarget.interfaceType;

					currInterface = eval("new " + interfaceType + "()");
					currInterface.realType = jsTarget.realType;

					//arrays used by JsDesigner
					currInterface.UIcomponents = new Array();
					currInterface.UIcallbacks = new Array();
					currInterface.UIcallbacksHandlers = new Array();

					currContainer = currInterface;

					self.addItem(currInterface);
					currInterface.style.zIndex=1;

					if (currInterface.realType=="JsWindow")
					{
						currInterface.setTitle("New Window");
						currInterface.setWidth(890);
						currInterface.setHeight(508);
						currInterface.showWindow();
						currInterface.unsetClosable();
						currInterface.windowarea.style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
					}

					if (currInterface.realType=="JsInterface")
					{
						currInterface.setTitle("New Interface");
						currInterface.setWidth(996);
						currInterface.setHeight(520);
						currInterface.showWindow();
						currInterface.windowarea.style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
					}

					/*
					if (currInterface.realType=="JsMainWindow")
					{
						currInterface.setTitle("New MainWindow");
						currInterface.setWidth(890);
						currInterface.setHeight(500);
						currInterface.showWindow();
					}
					*/

					if (currInterface.realType=="JsDialog")
					{
						currInterface.setWidth(500);
						currInterface.setHeight(300);
						currInterface.showDialog();
						currInterface.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";
					}

					currInterface.images = new Array();

					self.UIcallbacks.processInterface(true);

					self.UIcomponents.newdialog.hideDialog();
				};

				self.UIcallbacks.processInterface = function(newinterface)
				{
					currInterface.style.zIndex=1;

					currInterface.setMovable(self.UIcallbacks.loadProperties);

					JsCounter = new Array();

					if (JsCounter[currInterface.realType])
						JsCounter[currInterface.realType]++;
					else
						JsCounter[currInterface.realType] = 1;

					if (newinterface)
						currInterface.name = currInterface.realType + "_" + JsCounter[currInterface.realType];

					currInterface.setEvent("mousedown",self.UIcallbacks.setCurrContainer);
					currInterface.setEvent("click",self.UIcallbacks.setCurrWidget);

					currInterface.objectNavigator = new JsListViewItem();
					self.UIcomponents.obj_view.addItem(currInterface.objectNavigator);
					currInterface.objectNavigator.addItem(currInterface.name);
					currInterface.objectNavigator.addItem(currInterface.realType);

					currInterface.objectNavigator.parentWidget = currInterface;
					currInterface.objectNavigator.setEvent("click",self.UIcallbacks.setCurrWidget);
				};

				//hide or show the window choose from the menu, according to it's status
				self.UIcallbacks.showhideWindow = function (jsEvent)
				{
					obj = self.UIcomponents[jsTarget.jswindow];

					if (obj.style.display == "none")
					{
						obj.style.display = "block";
						obj.style.visibility = "visible";
					}
					else
					{
						obj.style.display = "none";
						obj.style.visibility = "hidden";
					}

					obj.parentNode.addItem(obj);
				};

				//sets a lot of default values for the object being instantiated on the interface
				self.UIcallbacks.applyNewObjFilter = function(obj)
				{
					switch(obj.type)
					{
						case "JsCheckBox":
							obj.setHeight(20);
							obj.setWidth(75);
							obj.setLabel("checkbox");
						break;
						case "JsRadioButton":
							obj.addItem("Radio 1");
							obj.addItem("Radio 2");
							obj.setHeight(48);
							obj.setWidth(110);
						break;
						case "JsIcon":
							obj.setSource(jsdesigner_images + "default_icon.png");
							obj.setLabel("Icon");
						break;
						case "JsImageButton":
							obj.setSource(jsdesigner_images + "default_imagebutton.png");
							obj.setHeight(32);
							obj.setWidth(32);
						break;
						case "JsPushButton":
							obj.setValue("Push button");
							obj.setHeight(24);
							obj.setWidth(110);
						break;
						case "JsComboBox":
							obj.addItem("Option 1");
							obj.addItem("Option 2");
							obj.setWidth(200);
							obj.disable(true); //mozilla refuses mousedown if disabled, which causes the move obj action to stop working! Damn!
						break;
						case "JsListBox":
							obj.addItem("Option 1");
							obj.addItem("Option 2");
							obj.setHeight(100);
							obj.setWidth(200);
							obj.disable(true);
						break;
						case "JsDateEdit":
							var currDate = new Date();
							obj.setValue(currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate());
						break;
						case "JsTimeEdit":
							var currDate = new Date();
							obj.setValue(currDate.getHours() + ":" + currDate.getMinutes());
						break;
						case "JsLineEdit":
							obj.setWidth("200");
						break;
						case "JsLineEditAdv":
							obj.setWidth("200");
						break;
						case "JsUpLoad":
							obj.setWidth("230");
						break;
						case "JsTextEdit":
							obj.setWidth("400");
							obj.setHeight("200");
						break;
						case "JsRichTextEdit":
							obj.setWidth("400");
							obj.setHeight("200");
						break;
						case "JsCodeEdit":
							obj.setWidth("400");
							obj.setHeight("200");
						break;
						case "JsDialog":
							obj.setWidth("400");
							obj.setHeight("200");
							obj.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";
						break;
						case "JsDock":
							obj.setAlign("left");
							obj.style.position = "";
							obj.style.left = 0;
							obj.style.top = 0;
						break;
						case "JsFieldSet":
							obj.setLegend("Field Set");
							obj.legendlabel.setEditable();
							obj.setWidth("400");
							obj.setHeight("200");
							if (obj.parentNode.type == "JsDialog")
							{
								obj.fieldset.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";
								obj.style.backgroundColor = "#22262f";
							}
							else
							{
								obj.fieldset.style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
								obj.style.backgroundColor = "#FFFFFF";
							}
						break;
						case "JsTab":
							obj.addTab("Tab 1");
							obj.addTab("Tab 2");
							obj.setWidth("400");
							obj.setHeight("200");
							obj.showTab(0);
							obj.tabrow.childNodes[0].setEditable();
							obj.tabrow.childNodes[1].setEditable();
							obj.stack.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";
						break;
						case "JsToolBox":
							obj.addBox("Box 1");
							obj.addBox("Box 2");
							obj.addBox("Box 3");
							obj.addBox("Box 4");
							obj.setWidth("100%");
							obj.setHeight("100%");
							obj.style.position = "";
							obj.style.left = 0;
							obj.style.top = 0;
							obj.showBox(0);
						break;
						case "JsWebWrapper":
							obj.setWidth("400");
							obj.setHeight("200");
						break;
						case "JsWidgetStack":
							obj.addStack();
							obj.addStack();
							obj.setWidth("400");
							obj.setHeight("200");
							obj.style.border = "1px dashed #AAAAAA";
							obj.showStack(0);
							if (obj.parentNode.type == "JsDialog")
							{
								obj.style.backgroundImage = "url(\"" + jsdesigner_images + "grid_white.png\")";
								obj.style.backgroundColor = "#22262f";
							}
							else
							{
								obj.style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
								obj.style.backgroundColor = "#FFFFFF";
							}
							obj.style.border = "1px dashed #CCCCCC";
						break;
						case "JsWindow":
							obj.setWidth("400");
							obj.setHeight("200");
							obj.windowarea.style.backgroundImage = "url(\"" + jsdesigner_images + "grid.png\")";
						break;
						case "JsImage":
							obj.setSource(jsdesigner_images + "default_icon.png");
							obj.setHeight(32);
							obj.setWidth(32);
						break;
						case "JsLabel":
							obj.setValue("Label");
							obj.setWidth("60");
							obj.setHeight("20");
							obj.setEditable();
						break;
						case "JsLine":
							obj.setWidth("200");
						break;
						case "JsMenu":
							tmpobj = new JsMenuItem();
							tmpobj2 = new JsMenuItem();
							tmpobj.setValue("Item 1");
							tmpobj2.setValue("Item 2");
							obj.addItem(tmpobj);
							obj.addItem(tmpobj2);
							obj.showMenu(obj,0,0);
						break;
						case "JsMenuBar":
							obj.style.position = "";
							obj.style.left = 0;
							obj.style.top = 0;
						break;
						case "JsMiniToolBar":
							obj.style.position = "";
							obj.style.left = 0;
							obj.style.top = 0;
						break;
						case "JsToolBar":
							obj.style.position = "";
							obj.style.left = 0;
							obj.style.top = 0;
						break;
						case "JsListView":
							obj.setWidth(400);
							obj.setHeight(200);
							obj.addColumn("teste lv1",120);
							obj.addColumn("teste lv2",100);
							obj.lvheaderdiv.childNodes[0].setEditable();
							obj.lvheaderdiv.childNodes[1].setEditable();
						break;
						case "JsDataView":
							obj.setWidth(400);
							obj.setHeight(200);
							obj.addColumn("teste dv1",100);
							obj.addColumn("teste dv2",150);
							obj.dtheaderdiv.childNodes[0].setEditable();
							obj.dtheaderdiv.childNodes[1].setEditable();
						break;
					}

					self.UIcallbacks.addEventsToWidget(obj);
				};

				//add events to a widget
				self.UIcallbacks.addEventsToWidget = function(obj)
				{
					obj.readOnly(true);
					obj.disable(true);

					if (obj.type != "JsToolBox" && obj.type != "JsDock" && obj.type != "JsToolBar" && obj.type != "JsMiniToolBar" && obj.type != "JsMenuBar")
						obj.setMovable(self.UIcallbacks.loadProperties);

					if (obj.type == "JsDialog" || obj.type == "JsDock" || obj.type == "JsFieldSet" || obj.type == "JsTab" || obj.type == "JsWidgetStack" || obj.type == "JsWindow" || obj.type == "JsToolBox")
					{
						obj.setEvent("mousedown",self.UIcallbacks.setCurrContainer);
					}

					if (obj.type == "JsMenu" || obj.type == "JsMenuBar")
					{
						obj.setEvent("dblclick",self.UIcallbacks.show_menu_dialog);
					}

					if (obj.type == "JsToolBar" || obj.type == "JsMiniToolBar")
					{
						obj.setEvent("dblclick",self.UIcallbacks.show_toolbar_dialog);
					}

					if (obj.type == "JsListView" || obj.type == "JsDataView")
					{
						obj.setEvent("dblclick",self.UIcallbacks.show_listdata_dialog);
					}

					obj.setEvent("mousedown",self.UIcallbacks.setCurrWidget);
				}

				//deletes a widget from the interface:
				self.UIcallbacks.keyeffectscurrWidget = function(jsEvent)
				{
					if (browserType=="ie")
						jsEvent = window.event;

					//deletes currWidget if del and shift key are pressed together
					if (jsEvent.keyCode==46 && jsEvent.shiftKey && currWidget)
					{
						if (currWidget && currWidget != currInterface)
						{
							if (confirm("Are you sure you wish to remove the selected widget?"))
							{
								var parentContainer = currWidget.parentNode.js_parent;
								currWidget.objectNavigator.parentNode.js_parent.delItem(currWidget.objectNavigator);
								parentContainer.delItem(currWidget);
								self.UIcomponents.prop_view.clearData();

								if (currInterface.menu == currWidget)
									currInterface.menu = null;

								for (var js_i in currInterface.UIcomponents)
								{
									//removes the refered menus
									if (currInterface.UIcomponents[js_i].menu == currWidget)
										currInterface.UIcomponents[js_i].menu = null;

									if (currInterface.UIcomponents[js_i] == currWidget)
									{
										currInterface.UIcomponents.splice(js_i,1);
										//if it's a menu, we still gotta clean all
										//the references to it on the other objects
										if (currWidget.type != "JsMenu")
											break;
									}
								}
								currContainer = currInterface;
								currWidget = null;
							}
						}
						else
						{
							alert("I cannot delete the main container!");
						}
					}

					//open dialog
					if (jsEvent.keyCode == 79 && jsEvent.altKey)
					{
						self.showOpenDialog();
						return false;
					}

					//open dialog
					if (jsEvent.keyCode == 83 && jsEvent.altKey)
					{
						self.showSaveDialog();
						return false;
					}

					//new dialog or close current interface
					if ((jsEvent.keyCode == 78 || jsEvent.keyCode == 87) && jsEvent.altKey)
					{
						self.showNewDialog();
						return false;
					}

					//for moving currWidget on the screen
					if (currWidget)
					{
						var increase = 10;
						if (jsEvent.ctrlKey)
							var increase = 1;

						if (jsEvent.keyCode==38)//up
						{
							if (parseInt(currWidget.style.top) >= 0)
							{
								currWidget.setYPos(parseInt(currWidget.style.top) -increase);
								if (parseInt(currWidget.style.top) < 0)
									currWidget.style.top = 0;
								self.UIcomponents.prop_top.cells[1].setValue(parseInt(currWidget.style.top));
							}
						}
						if (jsEvent.keyCode==37)//left
						{
							if (parseInt(currWidget.style.left) >= 0)
							{
								currWidget.setXPos(parseInt(currWidget.style.left) -increase);
								if (parseInt(currWidget.style.left) < 0)
									currWidget.style.left = 0;
								self.UIcomponents.prop_left.cells[1].setValue(parseInt(currWidget.style.left));
							}
						}
						if (jsEvent.keyCode==39)//right
						{
							if (parseInt(currWidget.style.left) >= 0)
							{
								currWidget.setXPos(parseInt(currWidget.style.left) +increase);
								if (parseInt(currWidget.style.left) < 0)
									currWidget.style.left = 0;
								self.UIcomponents.prop_left.cells[1].setValue(parseInt(currWidget.style.left));
							}
						}
						if (jsEvent.keyCode==40)//down
						{
							if (parseInt(currWidget.style.top) >= 0)
							{
								currWidget.setYPos(parseInt(currWidget.style.top) +increase);
								if (parseInt(currWidget.style.top) < 0)
									currWidget.style.top = 0;
								self.UIcomponents.prop_top.cells[1].setValue(parseInt(currWidget.style.top));
							}
						}
					}

					if (browserType=="ie")
						jsEvent.returnValue = false;
					else
						jsEvent.preventDefault();
				};

				self.UIcallbacks.setcurrPropTarget = function ()
				{
					currPropTarget = currWidget;
				}



				//load the properties of the currWidget on the properties editor window
				self.UIcallbacks.loadProperties = function (jsTarget)
				{
					if (currWidget)
					{

						if (self.UIcomponents.prop_view.selectedItem)
							self.UIcomponents.prop_view.selectedItem.setUnselected();

						self.UIcomponents.prop_view.clearData();

						self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_name);
						self.UIcomponents.prop_name.cells[1].setValue(currWidget.name);

						if (currWidget.type != "JsDialog" && currWidget.type != "JsWindow" && currWidget.type != "JsLabel" && currWidget.type != "JsCheckBox" && currWidget.type != "JsImageButton" && currWidget.type != "JsIcon" && currWidget.type != "JsRadioButton" && currWidget.type != "JsComboBox" && currWidget.type != "JsListBox" && currWidget.type != "JsWidgetStack" && currWidget.type != "JsWebWrapper" && currWidget.type != "JsFieldSet" && currWidget.type != "JsTab" && currWidget.type != "JsDock" && currWidget.type != "JsToolBox" && currWidget.type != "JsMenu")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_value);
							self.UIcomponents.prop_value.cells[1].setValue(currWidget.getValue());
						}

						if (currWidget.type == "JsCheckBox")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_value);
							self.UIcomponents.prop_value.cells[1].setValue(currWidget.input.value);
						}

						if (currWidget.type == "JsLabel" || currWidget.type == "JsCheckBox" || currWidget.type == "JsIcon")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_label);
							if (currWidget.type == "JsIcon")
								self.UIcomponents.prop_label.cells[1].setValue(currWidget.label.label.innerHTML);
							else
								self.UIcomponents.prop_label.cells[1].setValue(currWidget.label.innerHTML);
						}

						self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_top);
						self.UIcomponents.prop_top.cells[1].setValue(parseInt(currWidget.style.top));

						self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_left);
						self.UIcomponents.prop_left.cells[1].setValue(parseInt(currWidget.style.left));

						if (currWidget.type != "JsIcon" && currWidget.type != "JsCNPJEdit" && currWidget.type != "JsComboBox" && currWidget.type != "JsCPFEdit" && currWidget.type != "JsDateEdit" && currWidget.type != "JsIPEdit" && currWidget.type != "JsLineEdit" && currWidget.type != "JsLineEditAdv" && currWidget.type != "JsMoneyEdit" && currWidget.type != "JsSpinBox" && currWidget.type != "JsTimeEdit" && currWidget.type != "JsUpLoad")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_height);
							if (currWidget.type == "JsDialog" && browserType=="ie")
								self.UIcomponents.prop_height.cells[1].setValue(parseInt(currWidget.style.height) - 16);
							else
								self.UIcomponents.prop_height.cells[1].setValue(parseInt(currWidget.style.height));
						}

						if (currWidget.type != "JsIcon" && currWidget.type != "JsToolBar" && currWidget.type != "JsMiniToolBar" && currWidget.type != "JsMenuBar")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_width);

							if (currWidget.type == "JsDialog" && browserType=="ie")
								self.UIcomponents.prop_width.cells[1].setValue(parseInt(currWidget.style.width) - 16);
							else
								self.UIcomponents.prop_width.cells[1].setValue(parseInt(currWidget.style.width));
						}

						self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_tooltip);
						self.UIcomponents.prop_tooltip.cells[1].setValue(currWidget.title);

						if (currWidget.type!="JsMenu")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_menu);

							if (currWidget.menu)
								self.UIcomponents.prop_menu.cells[1].setValue(currWidget.menu.name);
							else
								self.UIcomponents.prop_menu.cells[1].setValue("");
						}

						if (currWidget.type == "JsLabel")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_iconsrc);
							if (currWidget.icon)
								self.UIcomponents.prop_iconsrc.cells[1].setValue(currWidget.icon.src);
							else
								self.UIcomponents.prop_iconsrc.cells[1].setValue("");
						}

						if (currWidget.type == "JsImageButton" || currWidget.type == "JsImage" || currWidget.type == "JsIcon")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_imagesrc);
							if (currWidget.type == "JsImageButton")
								self.UIcomponents.prop_imagesrc.cells[1].setValue(currWidget.input.src);
							if (currWidget.type == "JsImage")
								self.UIcomponents.prop_imagesrc.cells[1].setValue(currWidget.img.src);
							if (currWidget.type == "JsIcon")
								self.UIcomponents.prop_imagesrc.cells[1].setValue(currWidget.input.input.src);
						}

						if (currWidget.type == "JsCheckBox")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_checked);
							self.UIcomponents.prop_checked.cells[1].setValue(currWidget.input.checked);
						}

						if (currWidget.realType == "JsWindow")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_window_title);
							self.UIcomponents.prop_window_title.cells[1].setValue(currWidget.titlebar.getValue());
						}

						if (currWidget.type == "JsWebWrapper")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_wrapper_src);
							self.UIcomponents.prop_wrapper_src.cells[1].setValue(currWidget.iframe.src);
						}

						if (currWidget.type == "JsFieldSet")
						{
							self.UIcomponents.prop_view.addItem(self.UIcomponents.prop_legend);
							self.UIcomponents.prop_legend.cells[1].setValue(currWidget.legendlabel.getValue());
						}
					}
				};

				//callback for the toolbox, responsible for creating an objet inside the currContainer
				self.UIcallbacks.createWidget = function (jsEvent)
				{
					if (currContainer)
					{
						var newX = jsEvent.clientX - getObjLeft(currContainer);
						var newY = jsEvent.clientY - getObjTop(currContainer);

						if (currContainer.type=="JsWindow")
						{
							newX -= 4;
							newY -= 24;
						}

						if (currContainer.type=="JsTab")
						{
							newX -= 10;
							newY -= 36;
						}

						if (currContainer.type=="JsToolBox")
						{
							if (browserType=="ie")
							{
								newX -= 2;
								newY -= ((26 * currContainer.box_index) + 31);
							}
							else
							{
								newX -= 4;
								newY -= ((26 * currContainer.box_index) + 10);
							}
						}

						if (currContainer.type=="JsDialog")
						{
							newX -= 3;
							newY -= 6;
						}

						if (currContainer.type=="JsWidgetStack")
						{
							newX -= 3;
							newY -= 5;
						}

						if (currContainer.type=="JsFieldSet")
						{
							if (browserType == "ie")
							{
								newX -= 8;
								newY -= 20;
							}
							else
							{
								newX -= 14;
								newY -= 21;
							}
						}

						var objType = this.getValue();
						obj = eval("new " + objType + "()");

						obj.jsGridStep = 10;

						obj.style.position = "absolute";
						obj.style.left = Math.ceil((newX)/obj.jsGridStep) * obj.jsGridStep;
						obj.style.top = Math.ceil((newY)/obj.jsGridStep) * obj.jsGridStep;

						currContainer.addItem(obj);

						self.UIcallbacks.applyNewObjFilter(obj);

						if (JsCounter[obj.type])
							JsCounter[obj.type]++;
						else
							JsCounter[obj.type] = 1;

						obj.name = obj.type + "_" + JsCounter[obj.type];

						self.UIcallbacks.createNavigator(obj);

						currInterface.UIcomponents[currInterface.UIcomponents.length] = obj;
					}
				};

				self.UIcallbacks.createNavigator = function(obj)
				{
					obj.objectNavigator = new JsListViewItem();
					currContainer.objectNavigator.addItem(obj.objectNavigator);
					obj.objectNavigator.addItem(obj.name);
					obj.objectNavigator.addItem(obj.type);
					obj.objectNavigator.parentWidget = obj;
					obj.objectNavigator.setEvent("click",self.UIcallbacks.setCurrWidget);
				}


				self.UIcallbacks.setcurrPropTargetName = function (jsEvent)
				{
					var newname = jsTarget.getValue();
					if (newname.search(valid_name_regexp) == -1)
					{
						alert("Invalid Object name\n\nValid names must start with a letter and have no spaces");
						return false;
					}
					else
					{
						old_name = currPropTarget.name;
						currPropTarget.name = newname;
						currPropTarget.objectNavigator.cells[0].setValue(currPropTarget.name);

						self.UIcallbacks.propagateObjectNewName(old_name, newname);
					}
				};

				self.UIcallbacks.setcurrPropTargetValue = function (jsEvent)
				{
					currPropTarget.setValue(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetLabel = function (jsEvent)
				{
					if (currPropTarget.type == "JsLabel")
						currPropTarget.setValue(jsTarget.getValue());
					else
						currPropTarget.setLabel(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetTop = function (jsEvent)
				{
					currPropTarget.setYPos(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetLeft = function (jsEvent)
				{
					currPropTarget.setXPos(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetHeight = function (jsEvent)
				{
					currPropTarget.setHeight(parseInt(jsTarget.getValue()));
				};

				self.UIcallbacks.setcurrPropTargetWidth = function (jsEvent)
				{
					currPropTarget.setWidth(parseInt(jsTarget.getValue()));
				};

				self.UIcallbacks.setcurrPropTargetTooltip = function (jsEvent)
				{
					currPropTarget.setToolTip(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetMenu = function (jsEvent)
				{
					//currPropTarget.setToolTip(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetIcon = function (jsEvent)
				{
				};

				self.UIcallbacks.setcurrPropTargetImage = function (jsEvent)
				{
				};

				self.UIcallbacks.setcurrPropTargetChecked = function (jsEvent)
				{
				};

				self.UIcallbacks.setcurrPropTargetTitle = function (jsEvent)
				{
					currPropTarget.setTitle(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetSrc = function (jsEvent)
				{
					currPropTarget.setPage(jsTarget.getValue());
				};

				self.UIcallbacks.setcurrPropTargetLegend = function (jsEvent)
				{
					currPropTarget.setLegend(jsTarget.getValue());
				};

				//Methods used by the Callback editor
				self.UIcallbacks.addCallBack = function(jsEvent)
				{
					if (!currInterface)
					{
						alert("You are not editing any interface.");
						return;
					}
					else
					{
						if (JsCounter["CallBack"])
							JsCounter["CallBack"]++;
						else
							JsCounter["CallBack"] = 1;

						var temp = new JsListViewItem();
						self.UIcomponents.callbacks_view.addItem(temp);

						temp.setEvent("dblclick",self.UIcallbacks.editCallBack);

						temp.addItem("CallBack_" + JsCounter["CallBack"]);
						temp.code = "function(jsEvent)\n{\n\t\n}"
					}
				};

				self.UIcallbacks.delCallBack = function(jsEvent)
				{
					if (!currInterface)
					{
						alert("You are not editing any interface.");
						return;
					}
					if (self.UIcomponents.callbacks_view.selectedItem)
					{
						var check_handlers = "";
						var callback_name = self.UIcomponents.callbacks_view.selectedItem.getValue();
						for (var i in self.UIcomponents.handlers_view.childList)
						{
							if (self.UIcomponents.handlers_view.childList[i].cells[2].getValue() == callback_name)
							{
								check_handlers = "\nThere are handlers associated to this event. \nRemoving it will remove the association too.";
								break;
							}
						}
						if (confirm("Are you sure you wish to remove this callback?" + check_handlers))
						{
							self.UIcomponents.callbacks_view.delItem(self.UIcomponents.callbacks_view.selectedItem);

							if (check_handlers)
								for (var i = (self.UIcomponents.handlers_view.childList.length - 1); i >= 0 ; i--)
									if (self.UIcomponents.handlers_view.childList[i].cells[2].getValue() == callback_name)
										self.UIcomponents.handlers_view.delItem(self.UIcomponents.handlers_view.childList[i]);
						}
					}
					else
					{
						alert("Select a CallBack before");
						return;
					}
				};

				self.UIcallbacks.editCallBack = function(jsEvent)
				{
					if (!currInterface)
					{
						alert("You are not editing any interface.");
						return;
					}
					else
					{
						if (self.UIcomponents.callbacks_view.selectedItem)
						{
							self.UIcomponents.codeeditorwindow.showDialog();
							currDialog = self.UIcomponents.codeeditorwindow;
							self.UIcomponents.codeeditor.setValue(self.UIcomponents.callbacks_view.selectedItem.code);
							self.UIcomponents.codeeditorname.setValue(self.UIcomponents.callbacks_view.selectedItem.getValue()[0]);
						}
						else
						{
							alert("Select a CallBack before");
							return;
						}
					}
				};

				self.UIcallbacks.addCallBackHandler = function(jsEvent)
				{
					if (!currInterface)
					{
						alert("You are not editing any interface.");
						return;
					}
					else
					{
						var temp = new JsListViewItem();
						self.UIcomponents.handlers_view.addItem(temp);

						temp.addItem("");
						temp.addItem("");
						temp.addItem("");

						temp.cells[0].setEvent("dblclick",self.UIcallbacks.editHandlers)
						temp.cells[1].setEvent("dblclick",self.UIcallbacks.editEvents)
						temp.cells[2].setEvent("dblclick",self.UIcallbacks.editCallBacks)
					}
				};

				self.UIcallbacks.getObjectsList = function(arr)
				{
					var tmp = "";
					var comma = ",";

					if (!arr)
					{
						var arr = self.UIcomponents.obj_view.getValue();
						var comma = "";
					}

					for (var i in arr)
					{
						tmp += comma + arr[i][0];
						if (arr[i][2])
							tmp += self.UIcallbacks.getObjectsList(arr[i][2]);
					}
					return tmp;
				};

				self.UIcallbacks.editHandlers = function(jsEvent)
				{
					//handlers
					self.UIcomponents.handlerscombo.clearData();
					var handlers = self.UIcallbacks.getObjectsList().split(",");

					for (var i in handlers)
					{
						//gotta make this work ok
						//ignore JsMenu and so, on the handlers list
						//if (currInterface.UIcallbacksHandlers[js_i][1].type != "JsMenuBar" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMenu" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMenuItem" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsToolBar" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsToolBarButton" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMiniToolBar" && currInterface.UIcallbacksHandlers[js_i][1].type != "JsMiniToolBarButton")
							self.UIcomponents.handlerscombo.addItem(handlers[i]);
					}

					self.UIcomponents.handlerscombo.addItem("");

					self.UIcomponents.handlerscombo.setValue(jsTarget.cells[0].getValue());
					jsTarget.cells[0].removeChild(jsTarget.cells[0].label);
					jsTarget.cells[0].appendChild(self.UIcomponents.handlerscombo);
					self.UIcomponents.handlerscombo.input.focus();
				};

				self.UIcallbacks.editEvents = function(jsEvent)
				{
					//events
					self.UIcomponents.eventscombo.setValue(jsTarget.cells[1].getValue());
					jsTarget.cells[1].removeChild(jsTarget.cells[1].label);
					jsTarget.cells[1].appendChild(self.UIcomponents.eventscombo);
					self.UIcomponents.eventscombo.input.focus();
				};

				self.UIcallbacks.editCallBacks = function(jsEvent)
				{

					//callbacks
					self.UIcomponents.callbackscombo.clearData();

					var calls = self.UIcomponents.callbacks_view.getValue();

					for (var i in calls)
					{
						self.UIcomponents.callbackscombo.addItem(calls[i]);
					}

					self.UIcomponents.callbackscombo.addItem("");

					self.UIcomponents.callbackscombo.setValue(jsTarget.cells[2].getValue());
					jsTarget.cells[2].removeChild(jsTarget.cells[2].label);
					jsTarget.cells[2].appendChild(self.UIcomponents.callbackscombo);
					self.UIcomponents.callbackscombo.input.focus();
				};

				self.UIcallbacks.endHandlers = function(jsEvent)
				{
					var label = jsTarget.parentNode;
					label.removeChild(jsTarget);
					label.appendChild(label.label);
					label.setValue(jsTarget.getValue());
				};

				self.UIcallbacks.delCallBackHandler = function(jsEvent)
				{
					if (!currInterface)
					{
						alert("You are not editing any interface.");
						return;
					}
					if (self.UIcomponents.handlers_view.selectedItem)
					{
						if (confirm("Are you sure you wish to remove this handler?"))
						{
							self.UIcomponents.handlers_view.delItem(self.UIcomponents.handlers_view.selectedItem);
						}
					}
					else
					{
						alert("Select a handler before");
						return;
					}
				};

				self.UIcallbacks.saveCallBack = function(jsEvent)
				{
					if (!currInterface)
					{
						alert("You are not editing any interface.");
						return;
					}
					var valid_name = self.UIcomponents.codeeditorname.getValue();
					if (valid_name.search(valid_name_regexp) == -1)
					{
						alert("Invalid Method/CallBack name\n\nValid names must start with a letter and have no spaces");
						return false;
					}
					else
					{
						old_name = self.UIcomponents.callbacks_view.selectedItem.cells[0].getValue();
						self.UIcomponents.callbacks_view.selectedItem.code = self.UIcomponents.codeeditor.getValue();
						self.UIcomponents.callbacks_view.selectedItem.cells[0].setValue(self.UIcomponents.codeeditorname.getValue());
						self.UIcomponents.codeeditorwindow.hideDialog();

						self.UIcallbacks.propagateCallBackNewName(old_name,valid_name);
					}
				};

				//those methods habe been created to allow people to rename any object
				//or methos and the action propagates to every place where the object
				//is refered
				//DAMN! I'm so nice to people... :-D
				self.UIcallbacks.propagateObjectNewName = function(old_name,new_name)
				{
					for (var i in self.UIcomponents.handlers_view.childList)
						if (self.UIcomponents.handlers_view.childList[i].cells[0].getValue() == old_name)
							self.UIcomponents.handlers_view.childList[i].cells[0].setValue(new_name);

					for (var i in self.UIcomponents.callbacks_view.childList)
					{
						var code = self.UIcomponents.callbacks_view.childList[i].code;
						//gotta find a better way to do this regexp
						var reg_exp = new RegExp("\\b" + old_name + "\\b", "g");
						code = code.replace(reg_exp,new_name);
						self.UIcomponents.callbacks_view.childList[i].code = code;
					}
				};

				self.UIcallbacks.propagateCallBackNewName = function(old_name,new_name)
				{
					for (var i in self.UIcomponents.handlers_view.childList)
						if (self.UIcomponents.handlers_view.childList[i].cells[2].getValue() == old_name)
							self.UIcomponents.handlers_view.childList[i].cells[2].setValue(new_name);

					for (var i in self.UIcomponents.callbacks_view.childList)
					{
						var code = self.UIcomponents.callbacks_view.childList[i].code;
						var reg_exp = new RegExp("\\b" + old_name + "\\b", "g");
						code = code.replace(reg_exp,new_name);
						self.UIcomponents.callbacks_view.childList[i].code = code;
					}
				};

				self.UIcallbacks.editContextMenu = function(jsEvent)
				{
					//handlers
					self.UIcomponents.menuscombo.clearData();
					//var menus = self.UIcallbacks.getObjectsList().split(",");

					//for (var i in menus)
					for (var i in currInterface.UIcomponents)
					{
						if (currInterface.UIcomponents[i].type=='JsMenu')
							self.UIcomponents.menuscombo.addItem(i,currInterface.UIcomponents[i].name);
					}

					self.UIcomponents.menuscombo.addItem("");

					self.UIcomponents.menuscombo.setValue(jsTarget.cells[1].getValue());
					jsTarget.cells[1].removeChild(jsTarget.cells[1].label);
					jsTarget.cells[1].appendChild(self.UIcomponents.menuscombo);
					self.UIcomponents.menuscombo.input.focus();
				};

				self.UIcallbacks.endPropCombo = function(jsEvent)
				{
					var label = jsTarget.parentNode;
					label.removeChild(jsTarget);
					label.appendChild(label.label);
					label.setValue(jsTarget.getLabel());

					eval("currWidget."+jsTarget.propMethod+"(currInterface.UIcomponents['"+jsTarget.getValue()+"'])");
				};

				//method used to load a combo with all images avaliable on the interface
				self.UIcallbacks.loadIconList = function(obj)
				{

					if (obj && obj.type == "JsComboBox")
						currIconComboTarget = obj;
					else
						obj = currIconComboTarget;

					obj.clearData();
					obj.addItem("","");
					obj.addItem("jsdesigner_addimage","[--Upload a new image--]");
					for (var i in currInterface.images)
					{
						obj.addItem(currInterface.images[i],i);
					}
				};

				self.UIcallbacks.showFileDialog = function(jsEvent)
				{
					if (jsTarget.getValue() == "jsdesigner_addimage")
					{
						self.UIcomponents.file_select_dialog.showDialog();
						currIconComboTarget.setValue();
					}
				};

				self.UIcallbacks.uploadIcon = function()
				{
					var file = self.UIcomponents.file_select_upload.getValue().toLowerCase();
					if (!file || (file.indexOf(".gif") !=  -1 || file.indexOf(".jpg") != -1 || file.indexOf(".png") != -1))
					{
						self.UIcomponents.file_select_dialog.hideDialog();
						currIconComboTarget.setValue("");
						document.body.dc.setFieldValue("control_msg","generateBase64ImageCode");
						document.body.dc.setFile(self.UIcomponents.file_select_upload);
						document.body.dc.postData(self.UIcallbacks.loadIconList);
					}
					else
					{
						alert("You must select a GIF, JPEG or PNG image to upload.")
					}
				};

				self.UIcallbacks.test = function()
				{
					for (i in currInterface.images)
						alert("test");
				};

				self.UIcallbacks.hideFileDialog = function(jsEvent)
				{
					self.UIcomponents.file_select_dialog.hideDialog();
					currIconComboTarget.setValue("");
				};

				//Menu Dialog methods
				self.UIcallbacks.show_menu_dialog = function(jsEvent)
				{
					currDialog = self.UIcomponents.menu_dialog;
					self.UIcomponents.menu_dialog.showDialog();
				};

				//Toolbar Dialog methods
				self.UIcallbacks.show_toolbar_dialog = function(jsEvent)
				{
					//clear fields
					self.UIcomponents.toolbar_item_view.clearData();
					self.UIcomponents.toolbar_icon_combo.setValue("");
					self.UIcomponents.toolbar_callback_combo.setValue("");
					self.UIcomponents.toolbar_tooltip_edit.setValue("");

					currToolBar	= jsTarget;

					for (var i=0;i<jsTarget.childNodes.length;i++)
					{
						var tmp = new JsListViewItem();
						self.UIcomponents.toolbar_item_view.addItem(tmp);

						if (jsTarget.childNodes[i].type)
						{
							tmp.addItem(jsTarget.childNodes[i].title,jsTarget.childNodes[i].input.src);
							tmp.addItem(jsTarget.childNodes.length);

							tmp.setEvent("click",self.UIcallbacks.load_column_data);
						}
						else
						{
							tmp.addItem("--Divisor--");
							tmp.addItem("--Divisor--");
						}
					}

					currDialog = self.UIcomponents.toolbar_dialog;
					self.UIcomponents.toolbar_dialog.showDialog();
				};

				self.UIcallbacks.load_button_data = function(jsEvent)
				{
					var values = self.UIcomponents.toolbar_item_view.selectedItem.getValue();

					//I can only edit buttons, not divs!
					if (values[0]!="--Divisor--" && values[1]!="--Divisor--")
					{

					}
				}

				self.UIcallbacks.save_button_data = function(jsEvent)
				{
					var tmp = new self.UIcomponents.toolbar_item_view.selectedItem;
					tmp.cells[0].setValue();
					tmp.cells[0].setIcon();
					tmp.cells[1].setValue();
				}

				self.UIcallbacks.add_button_data = function(jsEvent)
				{
					var tmp = new JsListViewItem();
					self.UIcomponents.toolbar_item_view.addItem(tmp);
					tmp.addItem(jsTarget.childNodes[i].title,jsTarget.childNodes[i].input.src);
					tmp.addItem(jsTarget.childNodes.length);

					tmp.setEvent("click",self.UIcallbacks.load_column_data);
				}

				self.UIcallbacks.del_button_data = function(jsEvent)
				{
					if (confirm("Are you sure you wish do delete this item?"))
					{
						self.UIcomponents.toolbar_item_view.delItem(self.UIcomponents.toolbar_item_view.selectedItem);
					}
				}

				self.UIcallbacks.add_divisor = function(jsEvent)
				{
					var tmp = new JsListViewItem();
					self.UIcomponents.toolbar_item_view.addItem(tmp);

					if (self.UIcomponents.toolbar_item_view.selectedItem)
					{
						for (var i=0; i < self.UIcomponents.toolbar_item_view.lvbodydiv.childNodes.length; i++)
						{
							if (self.UIcomponents.toolbar_item_view.lvbodydiv.childNodes[i] == self.UIcomponents.toolbar_item_view.selectedItem)
							{
								if (i < (self.UIcomponents.toolbar_item_view.lvbodydiv.childNodes.length-1))
									self.UIcomponents.toolbar_item_view.lvbodydiv.insertBefore(tmp,self.UIcomponents.toolbar_item_view.lvbodydiv.childNodes[(i+1)]);
								break;
							}
						}
					}

					tmp.addItem("--Divisor--");
					tmp.addItem("--Divisor--");
				}

				self.UIcallbacks.save_buttons = function(jsEvent)
				{
					self.UIcomponents.toolbar_dialog.hideDialog();
				}

				//ListView/DataView Dialog methods
				self.UIcallbacks.show_listdata_dialog = function(jsEvent)
				{
					//clear fields
					self.UIcomponents.lv_dv_item_view.clearData();
					self.UIcomponents.column_icon_cb.setValue("");
					self.UIcomponents.column_width_sb.setValue("100");
					self.UIcomponents.column_name_le.setValue("");

					self.UIcallbacks.loadIconList(self.UIcomponents.column_icon_cb);

					currListDataView = jsTarget;
					if (currListDataView.type == "JsDataView")
						currListDataView.lvheaderdiv = currListDataView.dtheaderdiv;

					for (var i=0;i<jsTarget.lvheaderdiv.childNodes.length;i++)
					{
						var tmp = new JsListViewItem();
						self.UIcomponents.lv_dv_item_view.addItem(tmp);
						tmp.addItem(jsTarget.lvheaderdiv.childNodes[i].getValue());
						tmp.addItem(parseInt(jsTarget.lvheaderdiv.childNodes[i].style.width));
						tmp.setEvent("click",self.UIcallbacks.load_column_data);
						tmp.icon = jsTarget.lvheaderdiv.childNodes[i].icon;
					}

					currDialog = self.UIcomponents.listdata_dialog;
					self.UIcomponents.listdata_dialog.showDialog();
				};

				self.UIcallbacks.load_column_data = function(jsEvent)
				{
					self.UIcomponents.column_name_le.setValue(self.UIcomponents.lv_dv_item_view.selectedItem.cells[0].getValue());
					self.UIcomponents.column_width_sb.setValue(self.UIcomponents.lv_dv_item_view.selectedItem.cells[1].getValue());
					self.UIcomponents.column_icon_cb.setValue(self.UIcomponents.lv_dv_item_view.selectedItem.icon);
				};

				self.UIcallbacks.save_column_data = function(jsEvent)
				{
					if (self.UIcomponents.lv_dv_item_view.selectedItem)
					{
						self.UIcomponents.lv_dv_item_view.selectedItem.cells[0].setValue(self.UIcomponents.column_name_le.getValue());
						self.UIcomponents.lv_dv_item_view.selectedItem.cells[1].setValue(self.UIcomponents.column_width_sb.getValue());
						self.UIcomponents.column_name_le.setValue("");
						self.UIcomponents.column_width_sb.setValue("100");
						self.UIcomponents.lv_dv_item_view.selectedItem.setUnselected();
					}
					else
					{
						alert("To save the column, an item must be selected.\nTry adding a column instead.");
					}
				};

				self.UIcallbacks.add_column_data = function(jsEvent)
				{
					var tmp = new JsListViewItem();
					self.UIcomponents.lv_dv_item_view.addItem(tmp);
					tmp.addItem(self.UIcomponents.column_name_le.getValue());
					tmp.addItem(parseInt(self.UIcomponents.column_width_sb.getValue()));
					tmp.setEvent("click",self.UIcallbacks.load_column_data);
					self.UIcomponents.column_name_le.setValue("");
					self.UIcomponents.column_width_sb.setValue("100");
					if (self.UIcomponents.lv_dv_item_view.selectedItem)
						self.UIcomponents.lv_dv_item_view.selectedItem.setUnselected();
				};

				self.UIcallbacks.del_column_data = function(jsEvent)
				{
					if (confirm("Are you sure you wish do delete this column?"))
					{
						self.UIcomponents.lv_dv_item_view.delItem(self.UIcomponents.lv_dv_item_view.selectedItem);
						self.UIcomponents.column_name_le.setValue("");
						self.UIcomponents.column_width_sb.setValue("100");
					}
				};

				self.UIcallbacks.save_columns = function(jsEvent)
				{
					var values = self.UIcomponents.lv_dv_item_view.getValue();
					if (values.length > 0)
					{
						currListDataView.lvheaderdiv.innerHTML = "";
						currListDataView.lvheaderdiv.style.width = 1;

						for (var i = 0; i< values.length;i++)
						{
							currListDataView.addColumn(values[i][0],values[i][1]);
							currListDataView.lvheaderdiv.childNodes[i].setEditable();
						}

						self.UIcomponents.listdata_dialog.hideDialog();
						currListDataView = null;
					}
					else
					{
						alert("Can't create ListView/Dataview with no Columns!");
					}
				};

				self.UIcallbacks.move_up = function(jsEvent)
				{
					if (currDialog == self.UIcomponents.listdata_dialog)
						var item_view = self.UIcomponents.lv_dv_item_view;
					if (currDialog == self.UIcomponents.toolbar_dialog)
						var item_view = self.UIcomponents.toolbar_item_view;
					if (currDialog == self.UIcomponents.menu_dialog)
						var item_view = self.UIcomponents.menu_item_view;

					for (var i=0; i < item_view.lvbodydiv.childNodes.length; i++)
					{
						if (item_view.lvbodydiv.childNodes[i] == item_view.selectedItem)
						{
							if (i > 0)
								item_view.lvbodydiv.insertBefore(item_view.lvbodydiv.childNodes[i],item_view.lvbodydiv.childNodes[(i-1)]);
							break;
						}
					}
				};

				self.UIcallbacks.move_down = function(jsEvent)
				{
					if (currDialog == self.UIcomponents.listdata_dialog)
						var item_view = self.UIcomponents.lv_dv_item_view;
					if (currDialog == self.UIcomponents.toolbar_dialog)
						var item_view = self.UIcomponents.toolbar_item_view;
					if (currDialog == self.UIcomponents.menu_dialog)
						var item_view = self.UIcomponents.menu_item_view;

					for (var i=0; i < item_view.lvbodydiv.childNodes.length; i++)
					{
						if (item_view.lvbodydiv.childNodes[i] == item_view.selectedItem)
						{
							if (i < (item_view.lvbodydiv.childNodes.length - 1))
							{
								item_view.lvbodydiv.insertBefore(item_view.lvbodydiv.childNodes[(i+1)],item_view.lvbodydiv.childNodes[i]);
							}
							break;
						}
					}
				};

				/************End of User defined**********/

			//this will put the methods accessible on a more OO way
			for (i in self.UIcallbacks)
				self[i] = self.UIcallbacks[i];
		};

		//JsRadioButton Edit Dialog - for itens
		//JsTab Edit Dialog - add tabs and set names
		//JsToolBox Edit Dialog - add toolboxes and set names
		//JsWidgetGrid Edit Dialog - add Columns and Cells
		//JsWidgetStack Edit Dialog - Add Stacks
		//JsMenu Edit Dialog - Add Itens and Submenus - treeview
		//JsMenuBar Edit Dialog - Add Menus, MenuItens and Submenus - treeview
		//JsMiniToolBar Edit Dialog - add buttons and set buttons source and event
		//JsToolBar Edit Dialog - add buttons and set buttons source and event
		//JsDataView Edit Dialog - add Columns and Rows
		//JsListView Edit Dialog - add Columns and ListViewItens - also sets treeview

		/***********************************/
		/**EVENTS AND HANDLERS ATTACHMENTS**/
		/***********************************/

		self.attachEvents = function()
		{
			//Set methods to the elements of the interface, defined in
			//the self.UIcomponents.h.js file

			self.UIcallbacksHandlers = new Array();

				/***************User defined**************/
				//Menus
				self.UIcallbacksHandlers[0] = new Array();
				self.UIcallbacksHandlers[0][0] = "click"	//event
				self.UIcallbacksHandlers[0][1] = self.UIcomponents.menubaritemsubitem2_1 //handler
				self.UIcallbacksHandlers[0][2] = self.showhideWindow //callback

				self.UIcallbacksHandlers[1] = new Array();
				self.UIcallbacksHandlers[1][0] = "click"	//event
				self.UIcallbacksHandlers[1][1] = self.UIcomponents.menubaritemsubitem2_2 //handler
				self.UIcallbacksHandlers[1][2] = self.showhideWindow //callback

				self.UIcallbacksHandlers[2] = new Array();
				self.UIcallbacksHandlers[2][0] = "click"	//event
				self.UIcallbacksHandlers[2][1] = self.UIcomponents.menubaritemsubitem2_3 //handler
				self.UIcallbacksHandlers[2][2] = self.showhideWindow //callback

				self.UIcallbacksHandlers[2.1] = new Array();
				self.UIcallbacksHandlers[2.1][0] = "click"	//event
				self.UIcallbacksHandlers[2.1][1] = self.UIcomponents.menubaritemsubitem2_4 //handler
				self.UIcallbacksHandlers[2.1][2] = self.showhideWindow //callback
				/************End of User defined**********/

			//Toolbox CallBacks
			//Buttons

				/***************User defined**************/
				self.UIcallbacksHandlers[3] = new Array();
				self.UIcallbacksHandlers[3][0] = "callback";
				self.UIcallbacksHandlers[3][1] = self.UIcomponents.wid_bt1;
				self.UIcallbacksHandlers[3][2] = self.createWidget;
				self.UIcallbacksHandlers[4] = new Array();
				self.UIcallbacksHandlers[4][0] = "callback";
				self.UIcallbacksHandlers[4][1] = self.UIcomponents.wid_bt2;
				self.UIcallbacksHandlers[4][2] = self.createWidget;
				self.UIcallbacksHandlers[5] = new Array();
				self.UIcallbacksHandlers[5][0] = "callback";
				self.UIcallbacksHandlers[5][1] = self.UIcomponents.wid_bt3;
				self.UIcallbacksHandlers[5][2] = self.createWidget;
				self.UIcallbacksHandlers[6] = new Array();
				self.UIcallbacksHandlers[6][0] = "callback";
				self.UIcallbacksHandlers[6][1] = self.UIcomponents.wid_bt4;
				self.UIcallbacksHandlers[6][2] = self.createWidget;
				self.UIcallbacksHandlers[7] = new Array();
				self.UIcallbacksHandlers[7][0] = "callback";
				self.UIcallbacksHandlers[7][1] = self.UIcomponents.wid_bt5;
				self.UIcallbacksHandlers[7][2] = self.createWidget;

				//Fields
				self.UIcallbacksHandlers[8] = new Array();
				self.UIcallbacksHandlers[8][0] = "callback";
				self.UIcallbacksHandlers[8][1] = self.UIcomponents.wid_fd1;
				self.UIcallbacksHandlers[8][2] = self.createWidget;
				self.UIcallbacksHandlers[9] = new Array();
				self.UIcallbacksHandlers[9][0] = "callback";
				self.UIcallbacksHandlers[9][1] = self.UIcomponents.wid_fd2;
				self.UIcallbacksHandlers[9][2] = self.createWidget;
				self.UIcallbacksHandlers[10] = new Array();
				self.UIcallbacksHandlers[10][0] = "callback";
				self.UIcallbacksHandlers[10][1] = self.UIcomponents.wid_fd3;
				self.UIcallbacksHandlers[10][2] = self.createWidget;
				self.UIcallbacksHandlers[11] = new Array();
				self.UIcallbacksHandlers[11][0] = "callback";
				self.UIcallbacksHandlers[11][1] = self.UIcomponents.wid_fd4;
				self.UIcallbacksHandlers[11][2] = self.createWidget;
				self.UIcallbacksHandlers[12] = new Array();
				self.UIcallbacksHandlers[12][0] = "callback";
				self.UIcallbacksHandlers[12][1] = self.UIcomponents.wid_fd5;
				self.UIcallbacksHandlers[12][2] = self.createWidget;
				self.UIcallbacksHandlers[13] = new Array();
				self.UIcallbacksHandlers[13][0] = "callback";
				self.UIcallbacksHandlers[13][1] = self.UIcomponents.wid_fd6;
				self.UIcallbacksHandlers[13][2] = self.createWidget;
				self.UIcallbacksHandlers[14] = new Array();
				self.UIcallbacksHandlers[14][0] = "callback";
				self.UIcallbacksHandlers[14][1] = self.UIcomponents.wid_fd7;
				self.UIcallbacksHandlers[14][2] = self.createWidget;
				self.UIcallbacksHandlers[15] = new Array();
				self.UIcallbacksHandlers[15][0] = "callback";
				self.UIcallbacksHandlers[15][1] = self.UIcomponents.wid_fd8;
				self.UIcallbacksHandlers[15][2] = self.createWidget;
				self.UIcallbacksHandlers[16] = new Array();
				self.UIcallbacksHandlers[16][0] = "callback";
				self.UIcallbacksHandlers[16][1] = self.UIcomponents.wid_fd9;
				self.UIcallbacksHandlers[16][2] = self.createWidget;
				self.UIcallbacksHandlers[17] = new Array();
				self.UIcallbacksHandlers[17][0] = "callback";
				self.UIcallbacksHandlers[17][1] = self.UIcomponents.wid_fd10;
				self.UIcallbacksHandlers[17][2] = self.createWidget;
				self.UIcallbacksHandlers[18] = new Array();
				self.UIcallbacksHandlers[18][0] = "callback";
				self.UIcallbacksHandlers[18][1] = self.UIcomponents.wid_fd11;
				self.UIcallbacksHandlers[18][2] = self.createWidget;
				self.UIcallbacksHandlers[19] = new Array();
				self.UIcallbacksHandlers[19][0] = "callback";
				self.UIcallbacksHandlers[19][1] = self.UIcomponents.wid_fd12;
				self.UIcallbacksHandlers[19][2] = self.createWidget;
				self.UIcallbacksHandlers[20] = new Array();
				self.UIcallbacksHandlers[20][0] = "callback";
				self.UIcallbacksHandlers[20][1] = self.UIcomponents.wid_fd13;
				self.UIcallbacksHandlers[20][2] = self.createWidget;
				self.UIcallbacksHandlers[21] = new Array();
				self.UIcallbacksHandlers[21][0] = "callback";
				self.UIcallbacksHandlers[21][1] = self.UIcomponents.wid_fd14;
				self.UIcallbacksHandlers[21][2] = self.createWidget;
				self.UIcallbacksHandlers[82] = new Array();
				self.UIcallbacksHandlers[82][0] = "callback";
				self.UIcallbacksHandlers[82][1] = self.UIcomponents.wid_fd15;
				self.UIcallbacksHandlers[82][2] = self.createWidget;

				//Containers
				self.UIcallbacksHandlers[22] = new Array();
				self.UIcallbacksHandlers[22][0] = "callback";
				self.UIcallbacksHandlers[22][1] = self.UIcomponents.wid_ct1;
				self.UIcallbacksHandlers[22][2] = self.createWidget;
				self.UIcallbacksHandlers[23] = new Array();
				self.UIcallbacksHandlers[23][0] = "callback";
				self.UIcallbacksHandlers[23][1] = self.UIcomponents.wid_ct2;
				self.UIcallbacksHandlers[23][2] = self.createWidget;
				self.UIcallbacksHandlers[24] = new Array();
				self.UIcallbacksHandlers[24][0] = "callback";
				self.UIcallbacksHandlers[24][1] = self.UIcomponents.wid_ct3;
				self.UIcallbacksHandlers[24][2] = self.createWidget;
				self.UIcallbacksHandlers[25] = new Array();
				self.UIcallbacksHandlers[25][0] = "callback";
				self.UIcallbacksHandlers[25][1] = self.UIcomponents.wid_ct4;
				self.UIcallbacksHandlers[25][2] = self.createWidget;
				self.UIcallbacksHandlers[26] = new Array();
				self.UIcallbacksHandlers[26][0] = "callback";
				self.UIcallbacksHandlers[26][1] = self.UIcomponents.wid_ct5;
				self.UIcallbacksHandlers[26][2] = self.createWidget;
				self.UIcallbacksHandlers[27] = new Array();
				self.UIcallbacksHandlers[27][0] = "callback";
				self.UIcallbacksHandlers[27][1] = self.UIcomponents.wid_ct6;
				self.UIcallbacksHandlers[27][2] = self.createWidget;
				self.UIcallbacksHandlers[28] = new Array();
				self.UIcallbacksHandlers[28][0] = "callback";
				self.UIcallbacksHandlers[28][1] = self.UIcomponents.wid_ct8;
				self.UIcallbacksHandlers[28][2] = self.createWidget;
				self.UIcallbacksHandlers[29] = new Array();
				self.UIcallbacksHandlers[29][0] = "callback";
				self.UIcallbacksHandlers[29][1] = self.UIcomponents.wid_ct9;
				self.UIcallbacksHandlers[29][2] = self.createWidget;

				//Displays
				self.UIcallbacksHandlers[30] = new Array();
				self.UIcallbacksHandlers[30][0] = "callback";
				self.UIcallbacksHandlers[30][1] = self.UIcomponents.wid_dp1;
				self.UIcallbacksHandlers[30][2] = self.createWidget;
				self.UIcallbacksHandlers[31] = new Array();
				self.UIcallbacksHandlers[31][0] = "callback";
				self.UIcallbacksHandlers[31][1] = self.UIcomponents.wid_dp2;
				self.UIcallbacksHandlers[31][2] = self.createWidget;
				self.UIcallbacksHandlers[32] = new Array();
				self.UIcallbacksHandlers[32][0] = "callback";
				self.UIcallbacksHandlers[32][1] = self.UIcomponents.wid_dp3;
				self.UIcallbacksHandlers[32][2] = self.createWidget;
				self.UIcallbacksHandlers[33] = new Array();
				self.UIcallbacksHandlers[33][0] = "callback";
				self.UIcallbacksHandlers[33][1] = self.UIcomponents.wid_dp4;
				self.UIcallbacksHandlers[33][2] = self.createWidget;
				self.UIcallbacksHandlers[34] = new Array();
				self.UIcallbacksHandlers[34][0] = "callback";
				self.UIcallbacksHandlers[34][1] = self.UIcomponents.wid_dp5;
				self.UIcallbacksHandlers[34][2] = self.createWidget;
				self.UIcallbacksHandlers[35] = new Array();
				self.UIcallbacksHandlers[35][0] = "callback";
				self.UIcallbacksHandlers[35][1] = self.UIcomponents.wid_dp6;
				self.UIcallbacksHandlers[35][2] = self.createWidget;
				self.UIcallbacksHandlers[36] = new Array();
				self.UIcallbacksHandlers[36][0] = "callback";
				self.UIcallbacksHandlers[36][1] = self.UIcomponents.wid_dp7;
				self.UIcallbacksHandlers[36][2] = self.createWidget;
				self.UIcallbacksHandlers[37] = new Array();
				self.UIcallbacksHandlers[37][0] = "callback";
				self.UIcallbacksHandlers[37][1] = self.UIcomponents.wid_dp9;
				self.UIcallbacksHandlers[37][2] = self.createWidget;


				self.UIcallbacksHandlers[38] = new Array();
				self.UIcallbacksHandlers[38][0] = "callback";
				self.UIcallbacksHandlers[38][1] = self.UIcomponents.wid_vw1;
				self.UIcallbacksHandlers[38][2] = self.createWidget;
				self.UIcallbacksHandlers[39] = new Array();
				self.UIcallbacksHandlers[39][0] = "callback";
				self.UIcallbacksHandlers[39][1] = self.UIcomponents.wid_vw2;
				self.UIcallbacksHandlers[39][2] = self.createWidget;

				//File Menu
				self.UIcallbacksHandlers[40] = new Array();
				self.UIcallbacksHandlers[40][0] = "click";
				self.UIcallbacksHandlers[40][1] = self.UIcomponents.menubaritemsubitem1_1;
				self.UIcallbacksHandlers[40][2] = self.showNewDialog;
				self.UIcallbacksHandlers[41] = new Array();
				self.UIcallbacksHandlers[41][0] = "click";
				self.UIcallbacksHandlers[41][1] = self.UIcomponents.menubaritemsubitem1_2;
				self.UIcallbacksHandlers[41][2] = self.showOpenDialog;
				self.UIcallbacksHandlers[42] = new Array();
				self.UIcallbacksHandlers[42][0] = "click";
				self.UIcallbacksHandlers[42][1] = self.UIcomponents.menubaritemsubitem1_3;
				self.UIcallbacksHandlers[42][2] = self.showSaveDialog;

				//new interface
				self.UIcallbacksHandlers[43] = new Array();
				self.UIcallbacksHandlers[43][0] = "click";
				self.UIcallbacksHandlers[43][1] = self.UIcomponents.newinterfacebt;
				self.UIcallbacksHandlers[43][2] = self.createNewInterface;

				self.UIcallbacksHandlers[44] = new Array();
				self.UIcallbacksHandlers[44][0] = "click";
				self.UIcallbacksHandlers[44][1] = self.UIcomponents.newdialogbt;
				self.UIcallbacksHandlers[44][2] = self.createNewInterface;

				self.UIcallbacksHandlers[45] = new Array();
				self.UIcallbacksHandlers[45][0] = "click";
				self.UIcallbacksHandlers[45][1] = self.UIcomponents.newwindowbt;
				self.UIcallbacksHandlers[45][2] = self.createNewInterface;

				self.UIcallbacksHandlers[46] = new Array();
				self.UIcallbacksHandlers[46][0] = "click";
				self.UIcallbacksHandlers[46][1] = self.UIcomponents.newopenbt;
				self.UIcallbacksHandlers[46][2] = self.showOpenDialog;


				//Properties Editor
				self.UIcallbacksHandlers[47] = new Array();
				self.UIcallbacksHandlers[47][0] = "change";
				self.UIcallbacksHandlers[47][1] = self.UIcomponents.prop_name.cells[1];
				self.UIcallbacksHandlers[47][2] = self.setcurrPropTargetName;

				self.UIcallbacksHandlers[48] = new Array();
				self.UIcallbacksHandlers[48][0] = "change";
				self.UIcallbacksHandlers[48][1] = self.UIcomponents.prop_value.cells[1];
				self.UIcallbacksHandlers[48][2] = self.setcurrPropTargetValue;

				self.UIcallbacksHandlers[49] = new Array();
				self.UIcallbacksHandlers[49][0] = "change";
				self.UIcallbacksHandlers[49][1] = self.UIcomponents.prop_label.cells[1];
				self.UIcallbacksHandlers[49][2] = self.setcurrPropTargetLabel;

				self.UIcallbacksHandlers[50] = new Array();
				self.UIcallbacksHandlers[50][0] = "change";
				self.UIcallbacksHandlers[50][1] = self.UIcomponents.prop_top.cells[1];
				self.UIcallbacksHandlers[50][2] = self.setcurrPropTargetTop;

				self.UIcallbacksHandlers[51] = new Array();
				self.UIcallbacksHandlers[51][0] = "change";
				self.UIcallbacksHandlers[51][1] = self.UIcomponents.prop_left.cells[1];
				self.UIcallbacksHandlers[51][2] = self.setcurrPropTargetLeft;

				self.UIcallbacksHandlers[52] = new Array();
				self.UIcallbacksHandlers[52][0] = "change";
				self.UIcallbacksHandlers[52][1] = self.UIcomponents.prop_height.cells[1];
				self.UIcallbacksHandlers[52][2] = self.setcurrPropTargetHeight;

				self.UIcallbacksHandlers[53] = new Array();
				self.UIcallbacksHandlers[53][0] = "change";
				self.UIcallbacksHandlers[53][1] = self.UIcomponents.prop_width.cells[1];
				self.UIcallbacksHandlers[53][2] = self.setcurrPropTargetWidth;

				self.UIcallbacksHandlers[54] = new Array();
				self.UIcallbacksHandlers[54][0] = "change";
				self.UIcallbacksHandlers[54][1] = self.UIcomponents.prop_tooltip.cells[1];
				self.UIcallbacksHandlers[54][2] = self.setcurrPropTargetTooltip;

				self.UIcallbacksHandlers[55] = new Array();
				self.UIcallbacksHandlers[55][0] = "change";
				self.UIcallbacksHandlers[55][1] = self.UIcomponents.prop_menu.cells[1];
				self.UIcallbacksHandlers[55][2] = self.setcurrPropTargetMenu;

				self.UIcallbacksHandlers[56] = new Array();
				self.UIcallbacksHandlers[56][0] = "change";
				self.UIcallbacksHandlers[56][1] = self.UIcomponents.prop_iconsrc.cells[1];
				self.UIcallbacksHandlers[56][2] = self.setcurrPropTargetIcon;

				self.UIcallbacksHandlers[57] = new Array();
				self.UIcallbacksHandlers[57][0] = "change";
				self.UIcallbacksHandlers[57][1] = self.UIcomponents.prop_imagesrc.cells[1];
				self.UIcallbacksHandlers[57][2] = self.setcurrPropTargetImage;

				self.UIcallbacksHandlers[58] = new Array();
				self.UIcallbacksHandlers[58][0] = "change";
				self.UIcallbacksHandlers[58][1] = self.UIcomponents.prop_checked.cells[1];
				self.UIcallbacksHandlers[58][2] = self.setcurrPropTargetChecked;

				self.UIcallbacksHandlers[59] = new Array();
				self.UIcallbacksHandlers[59][0] = "change";
				self.UIcallbacksHandlers[59][1] = self.UIcomponents.prop_window_title.cells[1];
				self.UIcallbacksHandlers[59][2] = self.setcurrPropTargetTitle;

				self.UIcallbacksHandlers[60] = new Array();
				self.UIcallbacksHandlers[60][0] = "change";
				self.UIcallbacksHandlers[60][1] = self.UIcomponents.prop_wrapper_src.cells[1];
				self.UIcallbacksHandlers[60][2] = self.setcurrPropTargetSrc;

				self.UIcallbacksHandlers[61] = new Array();
				self.UIcallbacksHandlers[61][0] = "change";
				self.UIcallbacksHandlers[61][1] = self.UIcomponents.prop_legend.cells[1];
				self.UIcallbacksHandlers[61][2] = self.setcurrPropTargetLegend;

				//open dialog buttons

				self.UIcallbacksHandlers[62] = new Array();
				self.UIcallbacksHandlers[62][0] = "click";
				self.UIcallbacksHandlers[62][1] = self.UIcomponents.opencancelbutton;
				self.UIcallbacksHandlers[62][2] = self.UIcallbacks.hideOpenDialog;

				self.UIcallbacksHandlers[63] = new Array();
				self.UIcallbacksHandlers[63][0] = "click";
				self.UIcallbacksHandlers[63][1] = self.UIcomponents.openbutton;
				self.UIcallbacksHandlers[63][2] = self.UIcallbacks.openInterface;

				//save dialog buttons

				self.UIcallbacksHandlers[64] = new Array();
				self.UIcallbacksHandlers[64][0] = "click";
				self.UIcallbacksHandlers[64][1] = self.UIcomponents.savecancelbutton;
				self.UIcallbacksHandlers[64][2] = self.UIcomponents.savedialog.hideDialog;

				self.UIcallbacksHandlers[65] = new Array();
				self.UIcallbacksHandlers[65][0] = "click";
				self.UIcallbacksHandlers[65][1] = self.UIcomponents.savebutton;
				self.UIcallbacksHandlers[65][2] = self.UIcallbacks.saveInterface;

				//Properties Editor
				self.UIcallbacksHandlers[66] = new Array();
				self.UIcallbacksHandlers[66][0] = "click";
				self.UIcallbacksHandlers[66][1] = self.UIcomponents.prop_name.cells[1];
				self.UIcallbacksHandlers[66][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[67] = new Array();
				self.UIcallbacksHandlers[67][0] = "click";
				self.UIcallbacksHandlers[67][1] = self.UIcomponents.prop_value.cells[1];
				self.UIcallbacksHandlers[67][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[68] = new Array();
				self.UIcallbacksHandlers[68][0] = "click";
				self.UIcallbacksHandlers[68][1] = self.UIcomponents.prop_label.cells[1];
				self.UIcallbacksHandlers[68][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[69] = new Array();
				self.UIcallbacksHandlers[69][0] = "click";
				self.UIcallbacksHandlers[69][1] = self.UIcomponents.prop_top.cells[1];
				self.UIcallbacksHandlers[69][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[70] = new Array();
				self.UIcallbacksHandlers[70][0] = "click";
				self.UIcallbacksHandlers[70][1] = self.UIcomponents.prop_left.cells[1];
				self.UIcallbacksHandlers[70][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[71] = new Array();
				self.UIcallbacksHandlers[71][0] = "click";
				self.UIcallbacksHandlers[71][1] = self.UIcomponents.prop_height.cells[1];
				self.UIcallbacksHandlers[71][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[72] = new Array();
				self.UIcallbacksHandlers[72][0] = "click";
				self.UIcallbacksHandlers[72][1] = self.UIcomponents.prop_width.cells[1];
				self.UIcallbacksHandlers[72][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[73] = new Array();
				self.UIcallbacksHandlers[73][0] = "click";
				self.UIcallbacksHandlers[73][1] = self.UIcomponents.prop_tooltip.cells[1];
				self.UIcallbacksHandlers[73][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[74] = new Array();
				self.UIcallbacksHandlers[74][0] = "click";
				self.UIcallbacksHandlers[74][1] = self.UIcomponents.prop_menu.cells[1];
				self.UIcallbacksHandlers[74][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[75] = new Array();
				self.UIcallbacksHandlers[75][0] = "click";
				self.UIcallbacksHandlers[75][1] = self.UIcomponents.prop_iconsrc.cells[1];
				self.UIcallbacksHandlers[75][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[76] = new Array();
				self.UIcallbacksHandlers[76][0] = "click";
				self.UIcallbacksHandlers[76][1] = self.UIcomponents.prop_imagesrc.cells[1];
				self.UIcallbacksHandlers[76][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[77] = new Array();
				self.UIcallbacksHandlers[77][0] = "click";
				self.UIcallbacksHandlers[77][1] = self.UIcomponents.prop_checked.cells[1];
				self.UIcallbacksHandlers[77][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[78] = new Array();
				self.UIcallbacksHandlers[78][0] = "click";
				self.UIcallbacksHandlers[78][1] = self.UIcomponents.prop_window_title.cells[1];
				self.UIcallbacksHandlers[78][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[79] = new Array();
				self.UIcallbacksHandlers[79][0] = "click";
				self.UIcallbacksHandlers[79][1] = self.UIcomponents.prop_wrapper_src.cells[1];
				self.UIcallbacksHandlers[79][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[80] = new Array();
				self.UIcallbacksHandlers[80][0] = "click";
				self.UIcallbacksHandlers[80][1] = self.UIcomponents.prop_legend.cells[1];
				self.UIcallbacksHandlers[80][2] = self.setcurrPropTarget;

				self.UIcallbacksHandlers[81] = new Array();
				self.UIcallbacksHandlers[81][0] = "keydown";
				self.UIcallbacksHandlers[81][1] = self.UIcomponents.filesavename;
				self.UIcallbacksHandlers[81][2] = self.UIcomponents.filesavename.fix;

				//next value is 83 - 82 is for JsCodeEdit

				self.UIcallbacksHandlers[83] = new Array();
				self.UIcallbacksHandlers[83][0] = "click";
				self.UIcallbacksHandlers[83][1] = self.UIcomponents.callback_add;
				self.UIcallbacksHandlers[83][2] = self.addCallBack;

				self.UIcallbacksHandlers[84] = new Array();
				self.UIcallbacksHandlers[84][0] = "click";
				self.UIcallbacksHandlers[84][1] = self.UIcomponents.callback_del;
				self.UIcallbacksHandlers[84][2] = self.delCallBack;

				self.UIcallbacksHandlers[85] = new Array();
				self.UIcallbacksHandlers[85][0] = "click";
				self.UIcallbacksHandlers[85][1] = self.UIcomponents.callback_edt;
				self.UIcallbacksHandlers[85][2] = self.editCallBack;

				self.UIcallbacksHandlers[86] = new Array();
				self.UIcallbacksHandlers[86][0] = "click";
				self.UIcallbacksHandlers[86][1] = self.UIcomponents.handler_add;
				self.UIcallbacksHandlers[86][2] = self.addCallBackHandler;

				self.UIcallbacksHandlers[87] = new Array();
				self.UIcallbacksHandlers[87][0] = "click";
				self.UIcallbacksHandlers[87][1] = self.UIcomponents.handler_del;
				self.UIcallbacksHandlers[87][2] = self.delCallBackHandler;

				self.UIcallbacksHandlers[88] = new Array();
				self.UIcallbacksHandlers[88][0] = "click";
				self.UIcallbacksHandlers[88][1] = self.UIcomponents.codeeditorbuttonok;
				self.UIcallbacksHandlers[88][2] = self.saveCallBack;

				self.UIcallbacksHandlers[89] = new Array();
				self.UIcallbacksHandlers[89][0] = "click";
				self.UIcallbacksHandlers[89][1] = self.UIcomponents.codeeditorbuttoncancel;
				self.UIcallbacksHandlers[89][2] = self.UIcomponents.codeeditorwindow.hideDialog;

				self.UIcallbacksHandlers[90] = new Array();
				self.UIcallbacksHandlers[90][0] = "keydown";
				self.UIcallbacksHandlers[90][1] = self.UIcomponents.codeeditorname;
				self.UIcallbacksHandlers[90][2] = self.UIcomponents.codeeditorname.fix;

				self.UIcallbacksHandlers[91] = new Array();
				self.UIcallbacksHandlers[91][0] = "change";
				self.UIcallbacksHandlers[91][1] = self.UIcomponents.handlerscombo;
				self.UIcallbacksHandlers[91][2] = self.UIcallbacks.endHandlers;

				self.UIcallbacksHandlers[92] = new Array();
				self.UIcallbacksHandlers[92][0] = "change";
				self.UIcallbacksHandlers[92][1] = self.UIcomponents.eventscombo;
				self.UIcallbacksHandlers[92][2] = self.UIcallbacks.endHandlers;

				self.UIcallbacksHandlers[93] = new Array();
				self.UIcallbacksHandlers[93][0] = "change";
				self.UIcallbacksHandlers[93][1] = self.UIcomponents.callbackscombo;
				self.UIcallbacksHandlers[93][2] = self.UIcallbacks.endHandlers;

				self.UIcallbacksHandlers[94] = new Array();
				self.UIcallbacksHandlers[94][0] = "blur";
				self.UIcallbacksHandlers[94][1] = self.UIcomponents.handlerscombo;
				self.UIcallbacksHandlers[94][2] = self.UIcallbacks.endHandlers;

				self.UIcallbacksHandlers[95] = new Array();
				self.UIcallbacksHandlers[95][0] = "blur";
				self.UIcallbacksHandlers[95][1] = self.UIcomponents.eventscombo;
				self.UIcallbacksHandlers[95][2] = self.UIcallbacks.endHandlers;

				self.UIcallbacksHandlers[96] = new Array();
				self.UIcallbacksHandlers[96][0] = "blur";
				self.UIcallbacksHandlers[96][1] = self.UIcomponents.callbackscombo;
				self.UIcallbacksHandlers[96][2] = self.UIcallbacks.endHandlers;

				self.UIcallbacksHandlers[97] = new Array();
				self.UIcallbacksHandlers[97][0] = "change";
				self.UIcallbacksHandlers[97][1] = self.UIcomponents.menuscombo;
				self.UIcallbacksHandlers[97][2] = self.UIcallbacks.endPropCombo;

				self.UIcallbacksHandlers[98] = new Array();
				self.UIcallbacksHandlers[98][0] = "blur";
				self.UIcallbacksHandlers[98][1] = self.UIcomponents.menuscombo;
				self.UIcallbacksHandlers[98][2] = self.UIcallbacks.endPropCombo;

				self.UIcallbacksHandlers[99] = new Array();
				self.UIcallbacksHandlers[99][0] = "dblclick";
				self.UIcallbacksHandlers[99][1] = self.UIcomponents.prop_menu.cells[1];
				self.UIcallbacksHandlers[99][2] = self.UIcallbacks.editContextMenu;

				//widget dialogs

				//move up and down buttons
				self.UIcallbacksHandlers[100] = new Array();
				self.UIcallbacksHandlers[100][0] = "click";
				self.UIcallbacksHandlers[100][1] = self.UIcomponents.move_up_bt;
				self.UIcallbacksHandlers[100][2] = self.UIcallbacks.move_up;

				self.UIcallbacksHandlers[101] = new Array();
				self.UIcallbacksHandlers[101][0] = "click";
				self.UIcallbacksHandlers[101][1] = self.UIcomponents.move_down_bt;
				self.UIcallbacksHandlers[101][2] = self.UIcallbacks.move_down;

				self.UIcallbacksHandlers[102] = new Array();
				self.UIcallbacksHandlers[102][0] = "click";
				self.UIcallbacksHandlers[102][1] = self.UIcomponents.menu_move_up_bt;
				self.UIcallbacksHandlers[102][2] = self.UIcallbacks.move_up;

				self.UIcallbacksHandlers[103] = new Array();
				self.UIcallbacksHandlers[103][0] = "click";
				self.UIcallbacksHandlers[103][1] = self.UIcomponents.menu_move_down_bt;
				self.UIcallbacksHandlers[103][2] = self.UIcallbacks.move_down;

				self.UIcallbacksHandlers[104] = new Array();
				self.UIcallbacksHandlers[104][0] = "click";
				self.UIcallbacksHandlers[104][1] = self.UIcomponents.toolbar_move_up_bt;
				self.UIcallbacksHandlers[104][2] = self.UIcallbacks.move_up;

				self.UIcallbacksHandlers[105] = new Array();
				self.UIcallbacksHandlers[105][0] = "click";
				self.UIcallbacksHandlers[105][1] = self.UIcomponents.toolbar_move_down_bt;
				self.UIcallbacksHandlers[105][2] = self.UIcallbacks.move_down;

				//list/dataview dialog
				self.UIcallbacksHandlers[106] = new Array();
				self.UIcallbacksHandlers[106][0] = "click";
				self.UIcallbacksHandlers[106][1] = self.UIcomponents.lv_dv_save_bt;
				self.UIcallbacksHandlers[106][2] = self.UIcallbacks.save_column_data;

				self.UIcallbacksHandlers[107] = new Array();
				self.UIcallbacksHandlers[107][0] = "click";
				self.UIcallbacksHandlers[107][1] = self.UIcomponents.lv_dv_add_bt;
				self.UIcallbacksHandlers[107][2] = self.UIcallbacks.add_column_data;

				self.UIcallbacksHandlers[108] = new Array();
				self.UIcallbacksHandlers[108][0] = "click";
				self.UIcallbacksHandlers[108][1] = self.UIcomponents.lv_dv_del_bt;
				self.UIcallbacksHandlers[108][2] = self.UIcallbacks.del_column_data;

				self.UIcallbacksHandlers[109] = new Array();
				self.UIcallbacksHandlers[109][0] = "click";
				self.UIcallbacksHandlers[109][1] = self.UIcomponents.lv_dv_ok_bt;
				self.UIcallbacksHandlers[109][2] = self.UIcallbacks.save_columns;

				self.UIcallbacksHandlers[110] = new Array();
				self.UIcallbacksHandlers[110][0] = "click";
				self.UIcallbacksHandlers[110][1] = self.UIcomponents.lv_dv_cancel_bt;
				self.UIcallbacksHandlers[110][2] = self.UIcomponents.listdata_dialog.hideDialog;

				self.UIcallbacksHandlers[111] = new Array();
				self.UIcallbacksHandlers[111][0] = "keydown";
				self.UIcallbacksHandlers[111][1] = self.UIcomponents.column_name_le;
				self.UIcallbacksHandlers[111][2] = self.UIcomponents.column_name_le.fix;

				//NEEDS SET ICON!!!
				//112 is occupied

				//toolbar dialog
				self.UIcallbacksHandlers[113] = new Array();
				self.UIcallbacksHandlers[113][0] = "click";
				self.UIcallbacksHandlers[113][1] = self.UIcomponents.toolbar_save;
				self.UIcallbacksHandlers[113][2] = self.UIcallbacks.save_button_data;

				self.UIcallbacksHandlers[114] = new Array();
				self.UIcallbacksHandlers[114][0] = "click";
				self.UIcallbacksHandlers[114][1] = self.UIcomponents.toolbar_add;
				self.UIcallbacksHandlers[114][2] = self.UIcallbacks.add_button_data;

				self.UIcallbacksHandlers[115] = new Array();
				self.UIcallbacksHandlers[115][0] = "click";
				self.UIcallbacksHandlers[115][1] = self.UIcomponents.toolbar_delete;
				self.UIcallbacksHandlers[115][2] = self.UIcallbacks.del_button_data;

				self.UIcallbacksHandlers[116] = new Array();
				self.UIcallbacksHandlers[116][0] = "click";
				self.UIcallbacksHandlers[116][1] = self.UIcomponents.toolbar_add_divisor;
				self.UIcallbacksHandlers[116][2] = self.UIcallbacks.add_divisor;

				self.UIcallbacksHandlers[117] = new Array();
				self.UIcallbacksHandlers[117][0] = "click";
				self.UIcallbacksHandlers[117][1] = self.UIcomponents.toolbar_ok;
				self.UIcallbacksHandlers[117][2] = self.UIcallbacks.save_buttons;

				self.UIcallbacksHandlers[118] = new Array();
				self.UIcallbacksHandlers[118][0] = "click";
				self.UIcallbacksHandlers[118][1] = self.UIcomponents.toolbar_cancel;
				self.UIcallbacksHandlers[118][2] = self.UIcomponents.toolbar_dialog.hideDialog;

				self.UIcallbacksHandlers[119] = new Array();
				self.UIcallbacksHandlers[119][0] = "keydown";
				self.UIcallbacksHandlers[119][1] = self.UIcomponents.toolbar_tooltip_edit;
				self.UIcallbacksHandlers[119][2] = self.UIcomponents.toolbar_tooltip_edit.fix;

				self.UIcallbacksHandlers[120] = new Array();
				self.UIcallbacksHandlers[120][0] = "change";
				self.UIcallbacksHandlers[120][1] = self.UIcomponents.column_icon_cb;
				self.UIcallbacksHandlers[120][2] = self.UIcallbacks.showFileDialog;

				self.UIcallbacksHandlers[121] = new Array();
				self.UIcallbacksHandlers[121][0] = "click";
				self.UIcallbacksHandlers[121][1] = self.UIcomponents.file_select_ok;
				self.UIcallbacksHandlers[121][2] = self.UIcallbacks.uploadIcon;

				self.UIcallbacksHandlers[122] = new Array();
				self.UIcallbacksHandlers[122][0] = "click";
				self.UIcallbacksHandlers[122][1] = self.UIcomponents.file_select_cancel;
				self.UIcallbacksHandlers[122][2] = self.UIcallbacks.hideFileDialog;

				//sets the delete key for deleting objects
				document.onkeydown = self.keyeffectscurrWidget;

				/************End of User defined**********/

			for (var js_i in self.UIcallbacksHandlers)
			{
				if (self.UIcallbacksHandlers[js_i])
				{
					if (self.UIcallbacksHandlers[js_i][0] == "callback")
						self.UIcallbacksHandlers[js_i][1].setCallback(self.UIcallbacksHandlers[js_i][2])
					else
						self.UIcallbacksHandlers[js_i][1].setEvent(self.UIcallbacksHandlers[js_i][0],self.UIcallbacksHandlers[js_i][2])
				}
			}
		};

		//now, we build the interface
		self.buildInterface();
		//we create all the events it will have
		self.createEvents();
		//we attach the events to it's handler
		self.attachEvents();

		return self;
	}