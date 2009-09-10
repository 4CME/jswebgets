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

	Parts of this code were borrowed from Codepress, an code editor
	build in Javascript, and also licensed under LGPL.

	More information at: http://codepress.fermads.net/

	******************************************************************/

	//
	JsCodeEdit = function(name)
	{
		var self = new JsRichTextField(name);

		//if (browserType=="ie")
		self.textarea.className = "js_code";
		self.type = "JsCodeEdit";

		//a few properties
		self.language = null;
		self.scrolling = false; //controls if we are scrolling or typing...

		//creates the line numbers
		self.line_numbers_back = document.createElement("div");
		self.line_numbers_back.className = "js_code_line_numbers_background";
		self.line_numbers_back.js_parent = self;

		self.line_numbers = document.createElement("div");
		self.line_numbers.className = "js_code_line_numbers";
		self.line_numbers.js_parent = self;
		self.line_numbers.innerHTML = "1</br>";

		/*
		33 = pgdown
		34 = pgup
		13 = enter
		46 = delete
		62 =
		9 = tab
		*/

		if (browserType=="ie")
		{
			self.textarea.style.paddingLeft = 40;
			self.chars = '|33|34|32|46|62|'; // charcodes that trigger syntax highlighting
		}
		else
		{
			self.textarea.style.left = 42;
			self.textarea.style.right = 0;
			self.chars = '|33|34|32|46|62|13|9|'; // charcodes that trigger syntax highlighting
		}

		self.appendChild(self.line_numbers_back);
		self.appendChild(self.line_numbers);

		//fix width
		self.setWidth = function(value)
		{
			self.style.width = value;
			if (browserType != "ie")
				self.textarea.style.width = parseInt(value) - 42;
		};

		//possible options are: JS, PHP, SQL, HTML/XML, CSS (all uppercase)
		self.setLanguage = function(language)
		{
			self.language = language.type;
			ProgLanguage = language;
			ProgLanguage.syntax = language.syntax;
		};

		//hadle almost all key events that fires the highlighting process
		self.keyHandler = function(jsEvent)
		{
			if(self.chars.indexOf('|'+jsEvent.keyCode+'|')!=-1 && !jsShiftKey)
			{
		 		self.syntaxHighlight(jsEvent);
			}
			self.getLineNumbers();
		};

		//for IE only: check the pressed key, do it enters the correct behaviour
		self.checkKey = function(jsEvent)
		{
			if (jsEvent.keyCode==13)
			{
				jsEvent.cancelBubble = true;
				jsEvent.returnValue = false;
				self.insertInPosition("&nbsp;<br>","html");
				self.syntaxHighlight(jsEvent);
			}
			if (jsCtrlKey)
			{
				if (jsEvent.keyCode == 86)
				{
					self.IEPaste(jsEvent);
				}
			}
			if (jsTabKey)
			{
				jsEvent.cancelBubble = true;
				jsEvent.returnValue = false;
				self.insertInPosition("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","html");
				//jsCodeTimeCounter = 0;
				//self.syntaxHighlight(jsEvent);
			}
		};

		//filters what IE pastes, so tabs are pasted correctly
		self.IEPaste = function(jsEvent)
		{
			var code = window.clipboardData.getData("Text");
			jsEvent.cancelBubble = true;
			jsEvent.returnValue = false;
			code = code.replace(/\t/g,'js_tabbed_spacing');
			self.insertInPosition(code);
			jsCodeTimeCounter = 0;
			self.syntaxHighlight(jsEvent);
		};

		//splits code to get a faster highlighting...
		self.split = function(code, size)
		{
			var position = code.indexOf(self.cc);
			var partcode;

			begin = position - size;
			end = position + size;

			if (begin < 0)
			{
				begin = 0;
				end = size*2;
			}
			if (end > code.length)
			{
				begin = code.length - (size*2);
				end = code.length;
			}

			partcode = code.substring(begin, end);

			return partcode;
		};

		//the full highlighting process, fired by keyup or scroll
		self.syntaxHighlight = function(jsEvent)
		{
			if (jsCodeTimeCounter == 0)
			{
				//if we are scrolling, we need to highlight everything
				if (jsEventType=="scroll" || (jsEventType=="keyup" && jsEvent.keyCode && (jsEvent.keyCode == 33 || jsEvent.keyCode==34)))
				{
					//if we had just highlight everything, why highlight it again?
					if (self.scrolling)
					{
						jsCodeTimeCounter = 0;
						return;
					}
					else
					{
						//tell us we are scrolling
						self.scrolling = true;
						var size = self.textarea.contentDocument.body.innerHTML.length;
					}
				}
				else
				{
					self.scrolling = false;
					var size = 2000;
				}

				self.insertInPosition(self.cc);
				var code = self.getValue4HighLight();

				var partcodeoriginal;
				var partcode;

				partcode = self.split(code, size);
				partcodeoriginal = partcode;

				if (self.language != ProgLanguage.type)
				{
					ProgLanguage = eval(self.language);
				}

				for(var i=0;i<ProgLanguage.syntax.length;i++)
					partcode = partcode.replace(ProgLanguage.syntax[i].input,ProgLanguage.syntax[i].output);

				code = code.replace(partcodeoriginal, partcode);

				self.setValue4HighLight(code);

				jsCodeTimeCounter = 1;
			}

			self.findString(self.cc,'');
		};

		//set the value for the highlighting process
		self.setValue4HighLight = function(code)
		{
			if (browserType=="ie")
				code = code.replace(/\n/g,' <br>');
			else 
				code = code.replace(/\n/g,'<br>');
			code = "<pre>" + code + "</pre>";

			if (self.textarea.contentDocument)
				self.textarea.contentDocument.body.innerHTML = code;

			self.getLineNumbers();
		};

		//set the value for the document body
		self.setValue = function(code)
		{
			self.value = code;

			var code = code.replace(/\</g,'&lt;');
			code = code.replace(/\>/g,'&gt;');

			self.setValue4HighLight(code);

			if (browserType!="ie")
				window.setTimeout(self.syntaxHighlight,1100);
		};

		//get the value for the highlighting process
		self.getValue4HighLight = function()
		{
			if (self.textarea.contentDocument)
			{
				var code = self.textarea.contentDocument.body.innerHTML;

				code = code.replace(/\&nbsp\;\&nbsp\;\&nbsp\;\&nbsp\;\&nbsp\;\&nbsp\;\&nbsp\;\&nbsp\;/ig,'\t');
				code = code.replace(/js_tabbed_spacing/ig,'\t');
				code = code.replace(/\&nbsp\;/ig,' ');
				code = code.replace(/\<pre\>/ig,'');
				code = code.replace(/\<\pre\>/ig,'\n');
				code = code.replace(/\<br\>/ig,'\n');
				code = code.replace(/<.*?>/g,'');

				if (browserType=="ie")
					code = code.replace(/(\s*?)\n/ig,'\n');
				else
				{
					//fix an odd moz behaviour that created a new line
					//at the end, no matter what
					var pos = code.lastIndexOf('\n');
					//var poscc = code.lastIndexOf(self.cc);
					//var partcode = code.substring(pos-3);
					//if ((pos + 1) == code.length && (poscc + 1) != pos && partcode.indexOf('\n') == partcode.lastIndexOf('\n'))
					//if ((pos + 1) == code.length && partcode.indexOf('\n') == partcode.lastIndexOf('\n'))
					//if ((pos + 1) == code.length && (poscc + 1) != pos)
					if ((pos + 1) == code.length)
					{
						code = code.substring(0,pos);
					}
				}

				return code;
			}
			else 
				return "";
		};

		//get the value for the document body
		self.getValue = function()
		{
			var code = self.getValue4HighLight();

			code = code.replace(/\&lt\;/g,'<');
			code = code.replace(/\&gt\;/g,'>');
			code = code.replace(/\&amp\;/g,'&');

			return code;
		};

		//reposition the line numbers
		self.numbers_position = function(jsEvent)
		{
			/*
			this fix has been done for IE when the textarea was a div...
			I should fix it to work with iframe too, since IE still doesn't know
			how to scroll properly...
			if (browserType=="ie")
			{

				if (jsEventType=="keyup" && (jsEvent.keyCode==33 || jsEvent.keyCode==34))
				{

					var range = self.textarea.contentDocument.selection.createRange();
					var stored_range = range.duplicate();
					stored_range.moveToElementText(self.textarea);
					stored_range.setEndPoint('EndToEnd',range);

					//how many line breaks are there in the selection
					var temp_text = stored_range.htmlText;
					var js_i = 0;

					while(temp_text.indexOf("<BR>") > -1)
					{
						temp_text = temp_text.replace("<BR>","");
						js_i++;
					}

					self.textarea.contentDocument.body.scrollTop = js_i * 16;
				}


				self.line_numbers.style.top = -self.textarea.contentDocument.body.scrollTop;
			}
			else */
			self.getLineNumbers();

			self.line_numbers.style.top = -self.textarea.contentDocument.body.scrollTop;
		};

		self.getLineNumbers = function()
		{
			if (self.textarea.contentDocument && self.textarea.contentDocument.body.firstChild.offsetHeight >= self.line_numbers.offsetHeight)
			{
				var missing_number_of_lines = parseInt(self.textarea.contentDocument.body.firstChild.offsetHeight) / 16;
				var current_number_of_lines = parseInt(self.line_numbers.offsetHeight) / 16;

				//alert(current_number_of_lines);
				var numbers = new Array();

				for (var js_i=current_number_of_lines + 1; js_i<=missing_number_of_lines;js_i++)
				{
					numbers.push(js_i + "</br>");
				}
				newnumbers = numbers.join("");
				self.line_numbers.innerHTML = self.line_numbers.innerHTML + newnumbers;
			}
		};

		//enabling designMode for IE is a bit different
		self.enableDesignModeIE = function()
		{
			if (!isNaN(getObjLeft(self)))
			{
				if (self.textarea.parentNode == self && self.textarea.contentWindow && !self.textarea.contentDocument)
				{
					self.textarea.contentDocument = self.textarea.contentWindow.document;
					self.textarea.contentDocument.body.className = "js_code";
					self.textarea.contentWindow.js_parent = self;
					return true;
				}
				else 
					return false;
			}
			return false;
		};

		//moz need this event to be set to the iframe and IE to acquire the events
		if (browserType=="ie")
			self.setEvent("keydown",setJsEventJsTarget);
		self.setEvent("keypress",setJsEventJsTarget);

		//handle keys events
		self.setEvent("keyup",self.keyHandler);

		//scrolls line numbers
		self.setEvent("scroll",self.syntaxHighlight);
		//scrolls line numbers
		self.setEvent("scroll",self.numbers_position);

		//IE specifics
		if (browserType=="ie")
		{
			//checkKey
			self.setEvent("keydown",self.checkKey);
			//when deleting, it wasn't replacing, so I had to put it here
			self.setEvent("keyup",self.numbers_position);
		}

		return self;
	};

	/**************************************************
				LANGUAGES SINTAX AND MARKS
	**************************************************/

	/**************************************************
							JS
	**************************************************/
	JS = {};
	JS.type = "JS";
	JS.syntax = [ // JavaScript
	{
		input : 	/\"(.*?)\"/g,
		output : 	'<SPAN CLASS="js_dbquote">\"$1\"</SPAN>' // strings double quote
	},
	{
		input :		/\'(.*?)\'/g,
		output :	'<SPAN CLASS="js_quote">\'$1\'</SPAN>' // strings single quote
	},
	{
		input :		/\b(break|continue|do|for|new|this|void|case|default|else|function|return|typeof|while|if|label|switch|var|with|catch|boolean|int|try|false|throws|null|true|goto)\b/g,
		output :	'<SPAN CLASS="js_reserved">$1</SPAN>' // reserved words
	},
	{
		input :		/\b(alert|isNaN|parent|Array|parseFloat|parseInt|blur|clearTimeout|prompt|prototype|close|confirm|length|Date|location|Math|document|element|name|self|elements|setTimeout|navigator|status|String|escape|Number|submit|eval|Object|event|onblur|focus|onerror|onfocus|onclick|top|onload|toString|onunload|unescape|open|valueOf|window|onmouseover)\b/g,
		output :	'<SPAN CLASS="js_special">$1</SPAN>' // special words
	},
	{
		input :		/\/\/(.*?)\n/g,
		output :	'<SPAN CLASS="js_comments">\/\/$1</SPAN>\n' // single line comments
	},
	{
		input : 	/(\/\*)(.*?)/g,
		output : 	'<SPAN CLASS="js_comments">$1$2' // multi line comments begin
	},
	{
		input : 	/(.*?)\*\/(.*?)/g,
		output : 	'$1*/</SPAN>$2' // comments multi line comments end
	}

	];

	/**************************************************
							PHP
	**************************************************/
	PHP = {};
	PHP.type = "PHP";
	PHP.syntax = [ // PHP
	{
		input : 	/\"(.*?)\"/g,
		output : 	'<SPAN CLASS="js_dbquote">\"$1\"</SPAN>' // strings double quote
	},
	{
		input :		/\'(.*?)\'/g,
		output :	'<SPAN CLASS="js_quote">\'$1\'</SPAN>' // strings single quote
	},
	{
		input :		/\b(false|true|and|or|xor|__FILE__|exception|__LINE__|array|as|break|case|class|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|include|include_once|isset|list|new|print|require|require_once|return|static|switch|unset|use|while|__FUNCTION__|__CLASS__|__METHOD__|final|php_user_filter|interface|implements|extends|public|private|protected|abstract|clone|try|catch|throw|this)\b/g,
		output :	'<SPAN CLASS="js_reserved">$1</SPAN>' // reserved words
	},
	{
		input :		/(\&lt;\?|\?\&gt;)/g,
		output :	'<SPAN CLASS="js_special">$1</SPAN>' // special words
	},
	{
		input :		/(\$[\w\.]*)/g,
		output :	'<SPAN CLASS="js_special">$1</SPAN>' // special words
	},
	{
		input :		/\/\/(.*?)\n/g,
		output :	'<SPAN CLASS="js_comments">\/\/$1</SPAN>\n' // single line comments
	},
	{
		input : 	/(\/\*)(.*?)/g,
		output : 	'<SPAN CLASS="js_comments">$1$2' // multi line comments begin
	},
	{
		input : 	/(.*?)\*\/(.*?)/g,
		output : 	'$1*/</SPAN>$2' // comments multi line comments end
	}

	];

	/**************************************************
							SQL
	**************************************************/
	SQL = {};
	SQL.type = "SQL";
	SQL.syntax = [ // SQL
	{
		input :		/\'(.*?)\'/g,
		output :	'<SPAN CLASS="js_quote">\'$1\'</SPAN>' // strings single quote
	},
	{
		input :		/\b(select|insert|update|delete|from|where|inner|outer|join|on|into|values|set)\b/gi,
		output :	'<SPAN CLASS="js_reserved">$1</SPAN>' // reserved words
	},
	{
		input :		/(\&lt;\?|\?\&gt;|\+|\-|\*|\(|\))/g,
		output :	'<SPAN CLASS="js_special">$1</SPAN>' // special words
	}

	];
	/**************************************************
							HTML
	**************************************************/

	/**************************************************
							CSS
	**************************************************/