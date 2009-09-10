<?php

	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago Sánchez

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

	class JsDesignerControl
	{
		private $currInterface;

		private $classes_path;
		private $extension = "js";

		public function setClassesPath($path)
		{
			$this->classes_path = $path;
		}
		public function setExtension($extension)
		{
			$this->extension = $extension;
		}

		//Here we read the directories contained on the classes_path atribute
		//Each interface class is saved on a single directory
		public function loadInterfacesList()
		{
			$dir = scandir($this->classes_path);
			$interfaces_list = "interfaces_list = new Array();\n";

			$j=0;
			for ($i=0;$i<count($dir);$i++)
			{
				if (strstr($this->classes_path."/".$dir[$i],".".$this->extension) && $dir[$i]!="." && $dir[$i]!="..")
				{
					$interfaces_list .= "interfaces_list[".$j."] = '".str_replace(".".$this->extension,"",$dir[$i])."';\n";
					$j++;
				}
			}

			echo $interfaces_list;
		}

		public function loadInterface()
		{
			$_REQUEST["interface_name"];

			$string = file_get_contents($this->classes_path."/".$_REQUEST["interface_name"].".".$this->extension);
			$string = str_replace("self.initInterface()","true",$string);
			$string = str_replace("var self = new JsWidget(","var self = new JsWindow(",$string);

			echo "openedInterface = ".$string;
		}

		public function saveInterface()
		{
			$interface_name = $this->classes_path."/".$_REQUEST["interface_name"];

			if (!strstr($interface_name,".".$this->extension))
				$interface_name .= ".".$this->extension;

			$interface_code = str_replace('"%u','"\u',$_REQUEST["interface_code"]);

			set_magic_quotes_runtime(0);

			if (!get_magic_quotes_runtime())
				$interface_code = str_replace("\\","",$_REQUEST["interface_code"]);


			file_put_contents($interface_name,$interface_code);

			return true;
		}

		//this function receives an uploaded image and encodes it using base64
		//so the string can be directly added to the interface code
		public function generateBase64ImageCode()
		{
			$tempfile = $_FILES["js_input_file_select_upload"];

			//get the base64 encoded imag
			$handle = fopen($tempfile["tmp_name"],'rb');
			$file_content = fread($handle,filesize($tempfile["tmp_name"]));
			fclose($handle);

			$encoded = base64_encode($file_content);

			//then echo to parent as (remember it's handled by an iframe)
			echo "<script>\n";
			echo "parent.currInterface.images['".$tempfile["name"]."'] = 'data:".$_FILES[0]["type"].";base64,".$encoded."';\n";
			echo "</script>\n";

			return true;
		}
	}

?>