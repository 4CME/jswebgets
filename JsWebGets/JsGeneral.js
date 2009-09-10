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
	/********************************************

	This lib sets a lot of variables used to
	make the lib as compatible as possible
	with all browsers.

	********************************************/

	/********************************************
	variables required for correct functionality
	********************************************/
	//by default, sets language to english
	var lang = "en";
	var jsimages_path = "";
	//reference for the active hidden element that's being
	//shown. Used on menus, combobox, etc.
	activeShown = null;
	activehidden = null;
	showmenus = null;

	/********************************************
				Browser detection
	********************************************/
	var browserType;
	var detect = navigator.userAgent.toLowerCase();

	function checkIt(string)
	{
		place = detect.indexOf(string) + 1;
		return place;
	};

	if (checkIt('konqueror')) browserType = "kq";
	else if (checkIt('safari')) browserType = "Safari";
	else if (checkIt('omniweb')) browserType = "OmniWeb";
	else if (checkIt('opera')) browserType = "Opera";
	else if (checkIt('webtv')) browserType = "WebTV";
	else if (checkIt('icab')) browserType = "iCab";
	else if (checkIt('msie')) browserType = "ie";
	else if (!checkIt('compatible')) browserType = "ns";
	else browserType = "An unknown browser";

	/********************************************
	        Super trooper randomizer!!!!
	     Creates dinamic object valid names
		   Used to create random strings
		    to be used as object names
	********************************************/
	function randomizer()
	{
		var randomstr = "";
		var alpha = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
		for (var js_i=0;js_i<32;js_i++)
		{
			var randomnumber=Math.floor(Math.random()*26);
			randomstr += alpha[randomnumber];
		}
		return randomstr;
	};

	/********************************************
				General use functions
	********************************************/
	//This function should be changed to fit your needs.
	//It's used to detect if changes were made to the page
	//like field edition, for instance.
	function setHasChanges(e)
	{
		hasChanges = true;
	};

	//By default:
	var hasChanges = false;
	
	function strtoascii(str)
	{
		str = str.replace("ã","a");
		str = str.replace("á","a");
		str = str.replace("à","a");
		str = str.replace("é","e");
		str = str.replace("ê","e");
		str = str.replace("í","i");
		str = str.replace("õ","o");
		str = str.replace("ô","o");
		str = str.replace("ó","o");
		str = str.replace("ú","u");
		str = str.replace("ç","c");
		str = str.replace("Ã","A");
		str = str.replace("Á","A");
		str = str.replace("À","A");
		str = str.replace("É","E");
		str = str.replace("Ê","E");
		str = str.replace("Í","I");
		str = str.replace("Õ","O");
		str = str.replace("Ô","O");
		str = str.replace("Ó","O");
		str = str.replace("Ú","U");
		str = str.replace("Ç","C");
		str = str.replace("\n","");
		str = str.replace("\r","");
		str = str.replace("  "," ");

		return str;
	}

	/*****************************************************
	Pretty nasty function to make heritage possible on
	EcmaScript. Works on IE and Mozilla/Firefox
	Crazy Stuff. :D
	Both parameters have to be strings (orignal class name
	and new class name)

	This only extends prototyped methods. For complete
	heritage, you must use the "var self = new Obj()" method
	*****************************************************/

	function inherit(new_class,original_class)
	{
		for (var i in original_class.prototype)
			new_class[i] = original_class.prototype[i];
	};

	/********************************************
		 Blocks edition and mouse selection
	********************************************/

	function disableSelection()
	{
		document.onselectstart	= new Function ("return false");
		document.onmousedown 	= new Function ("return false");
	};

	function enableSelection()
	{
		document.onselectstart	= new Function ("return true");
		document.onmousedown 	= new Function ("return true");
	};

	disableSelection();

	/********************************************
	  Sets uniques pointer for the Window Event
	********************************************/

	//pointer to the event, so I don't need to make ugly code everywhere just
	//because Mozilla and IE do it diferently
	var jsEvent = null;
	//the type of the event
	var jsEventType = null;
	//HTML target for the event
	var jsRealTarget = null;
	//JsWebGet target for the event
	var jsTarget = null;
	//ctrlKey status
	var jsCtrlKey = false;
	//shiftKey status
	var jsShiftKey = false;
	//altKey status
	var jsAltKey = false;
	//tabKey status
	var jsTabKey = false;
	//keycode for ie and charcode for moz
	var jsKeyCode = null;
	//for RichTextEdits...
	var currJsEditor = null;
	//for Movable itens
	var jsGridStep = 1;
	//sets something is being moved, to fix unwanted moves when clicking
	var jsMoving = false;
	//Debug var, still in implementation, so far will be used for WebServices debugging
	var jsDebug = false;
	var jsDebugWindow = null;
	var jsDebugDisplay = null;

	function setJsEventJsTarget(e)
	{
		if (browserType=="ie")
		{
			if (!e)
				jsEvent = window.event;
			else 
				jsEvent = e;
			jsRealTarget = jsEvent.srcElement;
			jsTarget = jsRealTarget.js_parent;
		}
		else
		{
			jsEvent = e;
			jsRealTarget = jsEvent.target;
			jsTarget = jsEvent.target.js_parent;
		}

		if (jsEvent.shiftKey)
			jsShiftKey = true;
		else 
			jsShiftKey = false;

		if (jsEvent.ctrlKey)
			jsCtrlKey = true;
		else 
			jsCtrlKey = false;

		if (jsEvent.altKey)
			jsAltKey = true;
		else 
			jsAltKey = false;

		if (jsEvent.type == "keydown")
		{
			if (jsEvent.keyCode == 9)
				jsTabKey = true;
			else 
				jsTabKey = false;
		}

		if (jsEvent.type == "keypress")
		{
			if (browserType=="ie" && jsEvent.keyCode)
				jsKeyCode = jsEvent.keyCode;
			else if (jsEvent.charCode > 0)
				jsKeyCode = jsEvent.charCode;
			else if (jsEvent.keyCode > 0)
				jsKeyCode = jsEvent.keyCode;
		}
	};

	document.onmouseover = setJsEventJsTarget;

	/********************************************
				Drag'n'Drop Support
	********************************************/

	var jsDragged = null;
	var jsDraggedItens = null;
	var jsMoved = null;
	var jsResized = null;
	var jsDropTargets = new Array();
	var jsDocks = new Array();
	var jsBoxButton = null;

	function mouseCoords(e)
	{
		if(e.pageX || e.pageY)
		{
			return {x:e.pageX, y:e.pageY};
		}
		return {
			x:e.clientX + document.body.scrollLeft - document.body.clientLeft,
			y:e.clientY + document.body.scrollTop  - document.body.clientTop
		};
	};

	function getPosition(target)
	{
		return {x:getObjLeft(target), y:getObjTop(target)};
	};

	function dragJsWebGet(e)
	{
		if (browserType=="ie")
		{
			jsEvent = window.event;
			jsTarget = jsEvent.srcElement.js_parent;
		}
		else 
		{
			jsEvent = e;
			jsTarget = jsEvent.target.js_parent;
		}

		if (jsDragged)
		{
			jsMoving = true;

			if (!jsDragged.js_tempNode)
			{
				jsDragged.js_tempNode = jsDragged.cloneNode(true);
				jsDragged.js_tempNode.style.position = "absolute";

				if (browserType=="ie")
					jsDragged.js_tempNode.style.filter = "alpha(opacity=25)";
				else 
				{
					jsDragged.js_tempNode.style.opacity = "0.25";
					jsDragged.js_tempNode.style.mozOpacity = "0.25";
				}
			}

			if (jsDragged.js_tempNode.parentNode != document.body)
				document.body.appendChild(jsDragged.js_tempNode);

			jsDragged.js_tempNode.style.left = jsEvent.clientX + document.body.scrollLeft + 5;
			jsDragged.js_tempNode.style.top = jsEvent.clientY + document.body.scrollTop + 5;
		}
		else if (jsDraggedItens)
		{
			jsMoving = true;

			if (jsDraggedItens.js_itensIcon.parentNode != document.body)
				document.body.appendChild(jsDraggedItens.js_itensIcon);

			jsDraggedItens.js_itensIcon.style.left = jsEvent.clientX + document.body.scrollLeft + 5;
			jsDraggedItens.js_itensIcon.style.top = jsEvent.clientY + document.body.scrollTop + 5;
		}
		else if (jsMoved)
		{
			jsMoving = true;
			if (!jsMoved.js_tempNode)
			{
				if (jsMoved.type == "JsCheckBox" || jsMoved.type == "JsIcon" || jsMoved.type == "JsRadioButton" || jsMoved.type == "JsLabel" || jsMoved.type == "JsCNPJEdit" || jsMoved.type == "JsComboBox" || jsMoved.type == "JsCPFEdit" || jsMoved.type == "JsDateEdit" || jsMoved.type == "JsIPEdit" || jsMoved.type == "JsLineEdit" || jsMoved.type == "JsLineEditAdv" || jsMoved.type == "JsMoneyEdit" || jsMoved.type == "JsSpinBox" || jsMoved.type == "JsTimeEdit" || jsMoved.type == "JsUpLoad")
					jsMoved.js_tempNode = jsMoved.cloneNode(true);
				else 
					jsMoved.js_tempNode = jsMoved.cloneNode(false);

				jsMoved.js_tempNode.style.position = "absolute";
				jsMoved.js_tempNode.style.backgroundColor = "#AAAAAA";
				jsMoved.js_tempNode.style.margin = "";

				if (browserType=="ie")
					jsMoved.js_tempNode.style.filter = "alpha(opacity=50)";
				else 
				{
					jsMoved.js_tempNode.style.opacity = "0.5";
					jsMoved.js_tempNode.style.mozOpacity = "0.5";
				}
			}

			jsMoved.js_tempNode.style.width = jsMoved.style.width;
			jsMoved.js_tempNode.style.height = jsMoved.style.height;

			if (jsMoved.type == "JsCheckBox" || jsMoved.type == "JsIcon" || jsMoved.type == "JsRadioButton" || jsMoved.type == "JsCNPJEdit" || jsMoved.type == "JsComboBox" || jsMoved.type == "JsCPFEdit" || jsMoved.type == "JsDateEdit" || jsMoved.type == "JsIPEdit" || jsMoved.type == "JsLineEdit" || jsMoved.type == "JsLineEditAdv" || jsMoved.type == "JsMoneyEdit" || jsMoved.type == "JsSpinBox" || jsMoved.type == "JsTimeEdit" || jsMoved.type == "JsUpLoad")
				jsMoved.js_tempNode.innerHTML = jsMoved.innerHTML;

			jsMoved.parentNode.appendChild(jsMoved.js_tempNode);

			if (jsMoved.parentNode != document.body && browserType!="ie")
			{
				var scrollX = document.body.scrollLeft - jsMoved.parentNode.scrollLeft;
				var scrollY = document.body.scrollTop - jsMoved.parentNode.scrollTop;
			}
			else
			{
				var scrollX = document.body.scrollLeft;
				var scrollY = document.body.scrollTop;
			}

			jsMoved.js_tempNode.style.left = Math.round((jsEvent.clientX + scrollX - jsMoved.correctX - getObjLeft(jsMoved.parentNode))/jsMoved.jsGridStep) * jsMoved.jsGridStep;
			jsMoved.js_tempNode.style.top = Math.round((jsEvent.clientY + scrollY - jsMoved.correctY - getObjTop(jsMoved.parentNode))/jsMoved.jsGridStep) * jsMoved.jsGridStep;
		}
		else if (jsResized)
		{
			jsMoving = true;
			resX = jsEvent.clientX - jsResized.beginPosX;
			var newwidth = (parseInt(jsResized.style.width) + resX);
			jsResized.beginPosX = jsEvent.clientX;

			if (jsResized.type=="JsDock")
			{
				if (jsResized.alignment == "right")
					var newwidth = (parseInt(jsResized.style.width) - resX);
				if (newwidth < (jsResized.parentNode.offsetWidth/2) && newwidth > 12 &&
					(
						(jsEvent.clientX < (jsResized.parentNode.offsetWidth/2) && jsResized.alignment == "left")
						||
						(jsEvent.clientX > (jsResized.parentNode.offsetWidth/2) && jsResized.alignment == "right")
					)
				)
					jsResized.setWidth(newwidth);
			}
			else 
			{
				resY = jsEvent.clientY - jsResized.beginPosY;

				var newheight = (parseInt(jsResized.style.height) +  resY);

				jsResized.beginPosY = jsEvent.clientY;

				if (jsResized.oldwidth)
				{
					jsResized.oldtop = null;
					jsResized.oldleft = null;
					jsResized.oldwidth = null;
					jsResized.oldheight = null;
				}


				if (jsResized.type=="JsWindow")
				{
					var minwidth = 100;
					var minheight = 36;
				}
				else if (jsResized.type!="JsLine")
				{
					var minwidth = 10;
					var minheight = 10;
				}
				else
				{
					var minwidth = 0;
					var minheight = 0;
				}

				if (jsResized.type=="JsDialog" && browserType=="ie")
				{
					newwidth = newwidth - 16;
					newheight = newheight - 16;
				}

				if (newwidth> minwidth && newwidth <= jsResized.js_parent_container.offsetWidth && jsResized.parentNode.js_parent.type != "JsDock")
					jsResized.setWidth(newwidth);
					//jsResized.setWidth(Math.round(newwidth/jsResized.jsGridStep)*jsResized.jsGridStep);

				if (newheight > minheight && newheight <= jsResized.js_parent_container.offsetHeight)
					jsResized.setHeight(newheight);
					//jsResized.setHeight(Math.round(newheight/jsResized.jsGridStep)*jsResized.jsGridStep);
			}

		}
		//return false;
	};

	function endDragJsWebGet(e)
	{
		if (browserType=="ie")
		{
			jsEvent = window.event;
			jsTarget = jsEvent.srcElement.js_parent;
		}
		else
		{
			jsEvent = e;
			jsTarget = jsEvent.target.js_parent;
		}

		if (jsMoving)
		{
			if (jsDragged || jsDraggedItens)
			{
				if (jsDragged)
					var curDrag = jsDragged;
				else if (jsDraggedItens)
					var curDrag = jsDraggedItens;

				var mousePos = mouseCoords(jsEvent);

				jsTarget = null;

				var hasTarget = false;

				for(var i=0; i<jsDropTargets.length; i++)
				{
					var curTarget  = jsDropTargets[i][0];
					var targPos    = getPosition(curTarget);
					var targWidth  = parseInt(curTarget.offsetWidth);
					var targHeight = parseInt(curTarget.offsetHeight);

					if((mousePos.x > targPos.x)&&(mousePos.x <= (targPos.x + targWidth))&&(mousePos.y > targPos.y)&&(mousePos.y <= (targPos.y + targHeight)))
					{
						jsTarget = curTarget;
						jsDropTargets[i][1]();
						hasTarget = true;
						break;
					}
				}

				if (jsDragged && curDrag.js_tempNode)
					document.body.removeChild(curDrag.js_tempNode);
				else if (curDrag.js_itensIcon.parentNode == document.body)
					document.body.removeChild(curDrag.js_itensIcon);
			}
			else if (jsMoved)
			{
				if (jsMoved.js_tempNode)
				{
					jsMoved.style.margin = "";
					if (jsMoved.parentNode != document.body)
					{
						var newX = Math.round((parseInt(jsMoved.js_tempNode.style.left) + jsMoved.parentNode.scrollLeft)/jsMoved.jsGridStep) * jsMoved.jsGridStep;
						var newY = Math.round((parseInt(jsMoved.js_tempNode.style.top)  + jsMoved.parentNode.scrollTop)/jsMoved.jsGridStep) * jsMoved.jsGridStep;

						if (newX<0)
						{
							/*
							if (jsMoved.parentNode.js_parent.type != "JsDock")
							{
								newX = (-1*newX);
								for (var js_i=0; js_i<jsMoved.parentNode.childNodes.length;js_i++)
								{
									if (isNaN(parseInt(jsMoved.parentNode.childNodes[js_i].style.left)))
										jsMoved.parentNode.childNodes[js_i].style.left = newX;
									else
										jsMoved.parentNode.childNodes[js_i].style.left = parseInt(jsMoved.parentNode.childNodes[js_i].style.left) + newX;

								}
							}
							*/

							jsMoved.style.left = 0;

						}
						else
						{
							if (jsMoved.parentNode.js_parent.type == "JsDock")
							{
								jsMoved.style.left = 0;
							}
							else
							{
								jsMoved.style.left = newX;
							}
						}

						if (newY<0)
						{
							/*
							newY = (-1*newY);
							for (var js_i=0; js_i<jsMoved.parentNode.childNodes.length;js_i++)
							{
								if (isNaN(parseInt(jsMoved.parentNode.childNodes[js_i].style.top)))
									jsMoved.parentNode.childNodes[js_i].style.top = newY;
								else
									jsMoved.parentNode.childNodes[js_i].style.top = parseInt(jsMoved.parentNode.childNodes[js_i].style.top) + newY;

							}
							*/

							jsMoved.style.top = 0;
						}
						else
						{
							jsMoved.style.top = newY;
						}
					}
					else
					{
						var newX = Math.round(parseInt(jsMoved.js_tempNode.style.left)) * jsMoved.jsGridStep;
						var newY = Math.round(parseInt(jsMoved.js_tempNode.style.top)) * jsMoved.jsGridStep;

						if (newX<0)
							jsMoved.style.left = 0;
						else 
							jsMoved.style.left = newX;

						if (newY<0)
							jsMoved.style.top = 0;
						else
							jsMoved.style.top = newY;
					}

					//if (jsMoved.js_tempNode.parentNode == document.body)
					//	document.body.removeChild(jsMoved.js_tempNode);

					if (jsMoved.js_tempNode.parentNode)
						jsMoved.js_tempNode.parentNode.removeChild(jsMoved.js_tempNode);

					//this crashes widgets on IE... And Mozilla forgets about the
					//events on lineedit and derivatives
					//if (browserType != "ie")
						jsMoved.parentNode.appendChild(jsMoved);

					if (jsMoved.jscallback)
						jsMoved.jscallback(jsEvent);

					//checks is I dropped a window into a dock
					if (jsMoved.type == "JsWindow" && jsMoved.dockable)
					{
						var mousePos = mouseCoords(jsEvent);

						jsTarget = null;

						for(var js_i=0; js_i<jsDocks.length; js_i++)
						{
							var curTarget  = jsDocks[js_i];
							var targPos    = getPosition(curTarget);
							var targWidth  = parseInt(curTarget.offsetWidth);
							var targHeight = parseInt(curTarget.offsetHeight);

							//fix the horizontal position
							if (mousePos.x < 0)
								mousePos.x = 0;
							if (mousePos.x > document.body.clientWidth)
								mousePos.x = document.body.clientWidth;

							/*
							alert(mousePos.x);
							alert(targPos.x);
							alert(mousePos.y);
							alert(targPos.y);
							*/

							if((mousePos.x >= targPos.x)&&(mousePos.x <= (targPos.x + targWidth))&&(mousePos.y >= targPos.y)&&(mousePos.y <= (targPos.y + targHeight)))
							{
								jsTarget = curTarget;
								curTarget.addItem(jsMoved);
								break;
							}
						}

					}
				}
			}
			else if (jsResized)
			{
				if (jsResized.resize_jscallback)
					jsResized.resize_jscallback(jsEvent);
			};
		}

		jsDragged = null;
		jsDraggedItens = null;
		jsMoved = null;
		jsResized = null;
		jsMoving = false;

		//return false;
	};

	document.onmousemove = dragJsWebGet;
	document.onmouseup   = endDragJsWebGet;

	/********************************************
				Blocks right button
	********************************************/
	document.oncontextmenu	= new Function ("return false");

	/********************************************
			Gets event correct position
	********************************************/

	function getObjTop(obj)
	{
		var obj;

		if (browserType == "ie")
		{
			if (obj.nodeName != "TR" && obj.nodeName != "TD" && obj.type != "JsListViewContainer" && obj.type != "JsListViewItemBody" && obj.type != "JsDock")
				var value = obj.offsetTop;
			else 
				var value = 0;

			if (obj.parentNode && obj.parentNode != document)
				value += getObjTop(obj.parentNode);

			if (obj.type == "JsWindow")
				value += 2;
			if (obj.type == "JsWidgetStack")
				value += 1;
			if (obj.type == "JsDialog")
				value += 1;
		}
		else
		{
			var value = obj.offsetTop;

			if (obj.offsetParent && obj.offsetParent != document)
			{

				value += getObjTop(obj.offsetParent);

				if (obj.type == "JsWindow")
					value += 4;
				if (obj.type == "JsWidgetStack")
					value += 2;
				if (obj.type == "JsDialog")
					value += 2;
				if (obj.type == "JsFieldSetDiv")
					value += 17;
			}
		}

		return parseInt(value);
	};

	function getObjLeft(obj)
	{
		var value = obj.offsetLeft;

		if (browserType == "ie")
		{
			if (obj.parentNode && obj.parentNode != document)
				value += getObjLeft(obj.parentNode);

			if (obj.type == "JsWindow")
				value += 2;
			if (obj.type == "JsWidgetStack")
				value += 1;
			if (obj.type == "JsDialog")
				value += 1;
			if (obj.type == "JsFieldSetDiv")
				value += 2;


			//alert(value);
			//alert(obj.innerHTML);
			//alert(obj.style.position);

		}
		else
		{
			if (obj.offsetParent && obj.offsetParent != document)
			{
				value += getObjLeft(obj.offsetParent);

				if (obj.type == "JsWindow")
					value += 4;
				if (obj.type == "JsWidgetStack")
					value += 2;
				if (obj.type == "JsDialog")
					value += 2;
				if (obj.type == "JsFieldSetDiv")
					value += 10;
			}
		}

		return parseInt(value);
	};

	/*
	function getObjTop(obj)
	{
		var obj;
		var value = obj.offsetTop;

		if (browserType == "ie")
		{
			if (obj.parentNode && obj.parentNode != document)
				value += getObjTop(obj.parentNode);
		}
		else
		{
			if (obj.offsetParent && obj.offsetParent != document)
				value += getObjTop(obj.offsetParent);
		}

		return parseInt(value);
	};

	function getObjLeft(obj)
	{
		var value = obj.offsetLeft;

		if (browserType == "ie")
		{
			if (obj.parentNode && obj.parentNode != document)
				value += getObjLeft(obj.parentNode);
		}
		else
		{
			if (obj.offsetParent && obj.offsetParent != document)
				value += getObjLeft(obj.offsetParent);
		}

		return parseInt(value);
	};

	/********************************************
			Gets Host URL for Web Services
	********************************************/

	function getHostURL(wsurl)
	{
		var arr = wsurl.split("/");
		return arr[2];
	}

	/********************************************
	     Fix position of the listview headers
	********************************************/
	jsViews = new Array();

	function fixLVHeaderTop()
	{
		if (jsViews.length > 0)
			for (var js_i=0; js_i<jsViews.length;js_i++)
				jsViews[js_i].adjustlvheader();

		window.setTimeout("fixLVHeaderTop()",1000);
	}

	window.setTimeout("fixLVHeaderTop()",1000);

	/********************************************
	    	  Sets Richtexts as editable
	********************************************/
	jsRichTexts = new Array();

	function setRichTextsEditable()
	{
		if (jsRichTexts.length > 0)
			for (var js_i=0; js_i<jsRichTexts.length;js_i++)
			{
				jsRichTexts[js_i].enableDesignMode();
			}

		window.setTimeout("setRichTextsEditable()",1000);
	}

	//if (browserType=="ns")
		window.setTimeout("setRichTextsEditable()",1000);


	/********************************************
			For Mozilla/Firefox compat IE
			- set/get outerHTML
	********************************************/

	if (browserType != "ie")
	{
		XMLDocument.prototype.__defineGetter__("xml", function()
		{
			return (new XMLSerializer()).serializeToString(this);
		});

		Node.prototype.__defineGetter__("xml", function ()
		{
			return (new XMLSerializer()).serializeToString(this);
		});

		XMLDocument.prototype.__defineSetter__("xml", function ()
		{
		   throw "You can't set the XML string directly, unless when you are building the JsXML object. Use loadXML() instead.";
		});

		XMLDocument.prototype.__defineGetter__("text", function()
		{
			return this.textContent;
		});

		Node.prototype.__defineGetter__("text", function ()
		{
			return this.textContent;
		});

		XMLDocument.prototype.__defineSetter__("text", function (text)
		{
		   this.textContent = text;
		});

		Node.prototype.__defineSetter__("text", function (text)
		{
		   this.textContent = text;
		});

		HTMLElement.prototype.insertAdjacentElement = function (where, obj)
		{
			this.appendChild(obj);
			return obj;
		};

		HTMLElement.prototype.__defineGetter__("outerHTML", function()
		{
		   var node = this;
		   var str = "";

		   switch (node.nodeType)
		   {
		      case 1: // ELEMENT_NODE
		         str += "<" + node.nodeName;
		         for (var i=0; i<node.attributes.length; i++)
		         {
		            if (node.attributes.item(i).nodeValue != null)
		            {
		               str += " ";
		               str += node.attributes.item(i).nodeName;
		               str += "=\"";
		               str += node.attributes.item(i).nodeValue;
		               str += "\"";
		            };
		         };

		         if (node.childNodes.length == 0)
		         {
		            str += ">";
		         }
		         else
		         {
		            str += ">";
		            str += node.innerHTML;
		            str += "</" + node.nodeName + ">";
		         };
		         break;

		      case 3:   //TEXT_NODE
		         str += node.nodeValue;
		         break;

		      case 4: // CDATA_SECTION_NODE
		         str += "<![CDATA[" + node.nodeValue + "]]>";
		         break;

		      case 5: // ENTITY_REFERENCE_NODE
		         str += "&" + node.nodeName + ";";
		         break;

		      case 8: // COMMENT_NODE
		         str += "<!--" + node.nodeValue + "-->";
		         break;
		   };

		   return str;
		});

		HTMLElement.prototype.__defineSetter__("outerHTML", function (str)
		{
		   var r = this.ownerDocument.createRange();
		   r.setStartBefore(this);
		   var df = r.createContextualFragment(str);
		   this.parentNode.replaceChild(df, this);
		   return str;
		});
	};

	/******************************************
				JsCodeEdit specials
	******************************************/
	var jsCodeTimeCounter = 0;

	function resetjsCodeTimeCounter()
	{
		if (jsCodeTimeCounter > 0)
		{
			jsCodeTimeCounter--;
		}
		window.setTimeout("resetjsCodeTimeCounter()",1000);
	};

	window.setTimeout("resetjsCodeTimeCounter()",1000);

	/******************************************
					JsDebug
	******************************************/

	jsDebugWindowBuild = function()
	{
		jsDebugWindow = new JsWindow();
		jsDebugDisplay = new JsTextEdit();
		jsDebugReset = new JsPushButton();

		jsDebugWindow.setTitle("Communication Debug Window");
		jsDebugWindow.setHeight(460);
		jsDebugWindow.setWidth(705);
		jsDebugWindow.unsetResizable();

		jsDebugDisplay.setHeight(400);
		jsDebugDisplay.setWidth(700);
		jsDebugDisplay.setXPos(0);
		jsDebugDisplay.setYPos(0);

		jsDebugReset.setWidth(100);
		jsDebugReset.setValue("Clear Window");
		jsDebugReset.setEvent("click", function(){jsDebugDisplay.setValue("");});
		jsDebugReset.setXPos(10);
		jsDebugReset.setYPos(410);

		jsDebugWindow.addItem(jsDebugDisplay);
		jsDebugWindow.addItem(jsDebugReset);
	};
	
	activateDebug = function()
	{
		if (jsDebug)
		{
			jsDebug = false;
			if (jsDebugWindow)
				jsDebugWindow.hideWindow();
		}
		else
		{
			jsDebug = true;
			if (jsDebugWindow)
				jsDebugWindow.showWindow();
		}

		alert("jsDebug is set to " + jsDebug);
	};

	keyeffects = function(jsEvent)
	{
		if (browserType=="ie")
			jsEvent = window.event;

		if (jsEvent.ctrlKey && jsEvent.altKey && jsEvent.keyCode == 68)
			activateDebug();
	};

	document.onkeydown = keyeffects;