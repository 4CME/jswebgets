TODO

On JsDesigner

	- When clicking a ComboBox inside of a container, it doesn't select the item

	Widgets Edit Dialogs

		JsToolBar & MiniToolBar

		JsListView & JsDataView	- still needs icons

		JsRadio && JsComboBox && JsListBox - add del itens

		JsWidgetStack && JsTab - add and del tabs && stacks buttons. Also nav buttons for stacks

		JsMenu - will need a button/icon to represent it! And when the button is clicked,
			the menu is showned up, when you dlbclick, it opens the menu edit dialog.
			ContextMenus icons should be placed on bottom 0 and left 0, with left floating

		JsToolBox		- add/del boxes
						- JsBox - add/del buttons
							- JsBoxButton 	- setCallbacks

	Missing Properties for edition

	All (JsWidget)
		setDraggable				bool
		setDropTarget(callback)		bool/callback
		setMovable					bool/callback
		setResizable				bool/callback
		setClass					string
		setCursor					combo
		setFont						combo?
		setFontColor				colorpicker?
		setFontSize					string?
		setFontWeight				combo / normal,bold,bolder,lighter
		setFontStyle				combo / normal,italic,oblique

		FORMS
		JsInput

			BUTTONS

			JsCheckBox
				setChecked			bool

			JsIcon && JsImageButton && JsMiniToolBarButton && JsToolBarButton && JsImage
				setSource			imgstr

			JsRadioButton
				setOrientation		combo

			FIELDS
			JsLineEdit
				setMaxLength		int
				setPassword			bool
				setNumeric			bool
				setFloat			bool

			JsLineEditAdv
				setMinSearchLength	int
				setHandler			string

			JsComboBox && JsListBox
				setOrdered			bool

			JsCodeEdit
				setLanguage			combo

			JsSpinBox
				setRaiseFactor		int

		VISUAL
			CONTAINERS

				JsBox
					setTitle		string
					setIcon			imgstr

				JsDialog && JsWindow
					setModal

				JsDock
					setAlign		combo

				JsFieldSet
					setLegend		string
					setIcon			imgstr

				JsWebWrapper
					setPage			string

			DISPLAY

				JsLabel
					setIcon			imgstr

			View
				setOrdered			bool

	Create Extended Interface

	IMAGES
	Person chooses from a dlbclick combo
	there's always the option "[New Image]" which displays an upload form
	Upload Images, generate the base64 code, and returns it to an array on the interface identfied by it's name
	when saving images, it must save the reference, and not the img string, as the source...

	add JsBoxButtons to the widget toolbox? or build a dialog?

	Save Interface
		Special threatments for:
			JsMiniToolBar && JsToolBar
			JsMenu - loop when subiten is another menu?
			JsMenuBar - loop for menu
			JsToolBox

Improvements:
Containers: when clicked, or any of the children, must be set as the Active Container,
to receive the keypress actions (ctrl+tab when it's tab, keyup-down when it's
listview or menu, alt for menubar, keyup-down-left-right when it's menu and menubar,
etc)
JsListView & JsTab & JsMenu- Keybindigs (up and down arrows for changing selected item, and
alt+tab for switching tabs
Fix JsDock resize (it really should follow the mouse all time!)
Create JsHPanel and JsVPanel

Review validation
	DateEdit
	TimeEdit
	IPEdit

Oxide
	System Navigator
		Add
			Interface
			Dialog
			Control
			Object
	Database Explorer
	Data Sources
