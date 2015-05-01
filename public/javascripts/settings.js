var targetProperties = {
	"userheader" : ["img", "height", "width", "background-color", "borderRadius"],
	"userfooter" : ["height", "width", "background-color", "borderRadius", "innerHTML"],
	"usermain" : ["height", "width", "background-color", "borderRadius"],
	"usernavigation" : ["height", "width", "background-color", "borderRadius"],
	"userheadernews" : ["height", "width", "background-color", "borderRadius", "color", "padding", "innerHTML"],
	"userheaderarticle" : ["height", "width", "background-color", "borderRadius", "color", "padding", "innerHTML"],
	"usernews" : ["height", "width","background-color", "borderRadius"],
	"usernavitem" : ["height", "width","background-color", "borderRadius", "innerHTML"]
};

var mapping = {
	"height" : "Висота",
	"width" : "Ширина",
	"background-color" : "Колір фону",
	"innerHTML" : "Текс",
	"color" : "Колір тексту",
	"borderRadius" : "Округлість країв",
	"padding" : "Відступ"
}
var content;
var lastPositionTop;
var lastPositionLeft; 

//create Settings Bar div 
function initSettingsBar() {       

// header --- img height width background color border

//footer ---   height width background color border . Text value  

//navigation --- number of points width height backgroundcolor colors

//navigation item --- padding margin

//MainMenu  ---  width height  backgroundColor backgroundImage padding 

//FirstHeader  --- padding text color

//SecondHeader  --- padding text color

//News items   --- width height 

//common information  --- color fonts  line weight   
var header = document.createElement("p");
header.innerHTML = "Налаштування<hr/>";
header.style.fontSize = "20px";
header.style.textAlign = "center";
if(lastPositionTop==null) {

	lastPositionTop = 0;
}

if(lastPositionLeft==null) {

	lastPositionLeft = 0;
}

var div = document.createElement("div");


var startX;
var startY;

var positionTop;
var positionLeft;




div.addEventListener("mousedown", function() {
	positionTop = parseFloat(window.getComputedStyle(this, null).getPropertyValue("top"));
	positionLeft = parseFloat(window.getComputedStyle(this, null).getPropertyValue("left"));
	var movingBar = true;
	startX = window.event.x;
	startY = window.event.y;



	if(positionTop == "auto") {
		positionTop = 0;
	}

	if(positionLeft == "auto") {
		positionLeft = 0;
	}

	div.addEventListener("mousemove", function() {
		if(movingBar == true) {
			var shiftX = window.event.x - startX;
			var shiftY = window.event.y - startY;	

			div.style.top = positionTop + shiftY +"px";
			div.style.left = positionLeft + shiftX +"px";
		}

	});

	div.addEventListener("mouseup", function() {
		movingBar = false;

		lastPositionTop = parseFloat(window.getComputedStyle(div, null).getPropertyValue("top")) + "px";
		lastPositionLeft = parseFloat(window.getComputedStyle(div, null).getPropertyValue("left")) + "px";

	});

});
div.appendChild(header);

return div;
}

//create form's input based on target properties and append them to parent
function initSettingsBarContent(target, parent) {

	parent.style.width = "250px";
	parent.id = "settings";
	parent.style.maxHeight = "700px";
	parent.style.overflow = "scroll";
	parent.style.backgroundColor = "#EBEBEB";
	parent.style.position = "fixed";
	parent.style.top = lastPositionTop;
	parent.style.borderStyle = "solid";
	parent.style.borderWidth = "2px";
	parent.style.borderColor = "#011845";
	parent.addEventListener("resize", function () {alert("hello");});
	parent.style.left = lastPositionLeft;

	document.body.appendChild(parent);

	var propertiesValues = window.getComputedStyle(target, null);
	var targetID =  target.id.toLowerCase() == "" ?  target.className.toLowerCase() : target.id.toLowerCase();
	var availibleProperties = targetProperties[targetID]; 


	var amount = 0;
	content = {};
	var form = document.createElement("form");

	if(availibleProperties!=null)
		for(var i = 0; i < availibleProperties.length; ++i) {
			amount++;
			if(propertiesValues.getPropertyValue(availibleProperties[i]) == null) {
				if(availibleProperties[i] == "innerHTML") {
					content[availibleProperties[i]] = target.innerHTML;
				}
				else 
					content[availibleProperties[i]] = "Не задано";
			}
			else {
				content[availibleProperties[i]] = propertiesValues.getPropertyValue(availibleProperties[i]);
			}

		}

		for(var p in content) {
			var name = document.createElement("p");

			name.style.marginLeft = "10px";
			name.style.marginBottom = "5px";
			name.addEventListener("resize", function () {alert("hello");});
			name.innerHTML = mapping[p];
			var field = document.createElement("input");
			field.addEventListener("resize", function () {});
			field.type = "text";
			field.style.width = "190px";
			field.name = p;
			field.id = p;
			field.style.padding = "10px";
			field.style.marginLeft = "10px";
			field.addEventListener("change",function () {
				if(this.name == "innerHTML") {
					target.innerHTML = this.value;
				} else {target.style[this.name]= this.value;}

			});
			field.defaultValue = content[p];

			form.appendChild(name);
			form.appendChild(field);
			var hr = document.createElement('hr');
			form.appendChild(hr);

		}
		if(targetID == "usernavigation") {
			addExtraFunctionality(form);
		}
		parent.appendChild(form);

	}
	var counter = 0;

	var navigationItems = [];
	function addExtraFunctionality (formElement) {

		var ul = document.getElementById("usernavigation");

		var children = ul.children;


		console.log(children.length);

		var headerName = document.createElement("p");
		headerName.innerHTML = "Змінити вміст";
		headerName.style.paddingLeft = "58px";
		headerName.style.marginBottom = "5px";
		headerName.marginTop = "10px";
		headerName.style.float = "left";
		formElement.appendChild(headerName);

		var container = document.createElement("div");
		container.style.display = "none";
		var existingItems = document.createElement("div");
		var expanded = false;

		var extendButton = document.createElement("input");
		extendButton.type = "button";
		extendButton.style.backgroundImage = "url('/images/icons/expand_icon.png')";
		extendButton.style.width = "18px";
		extendButton.style.height = "18px";
		extendButton.style.marginLeft = "6px";
		extendButton.style.marginTop = "20px";
		extendButton.addEventListener("click", function() {
			if(expanded == false) {
				container.style.display = "block"; 
				extendButton.style.transform ='rotate(180deg)'; 
				expanded = true;
			} else {
				container.style.display = "none";
				extendButton.style.transform ='rotate(0deg)'; 
				expanded = false;
			}

		});
		formElement.appendChild(extendButton);


		for(var i = 0 ; i < children.length; ++i) {

			var info = {};
			info.content = children[i].innerHTML;
			info.id = children[i].id;
			info.idInput = "input" + i;

			navigationItems[i] = info;
			var cont = document.createElement("div");
              
			var field = document.createElement("input");

			field.type = "text";
			field.style.width = "190px";
			field.id = "input" + i;
			field.style.float = "left";
			field.style.padding = "10px";
			field.style.marginLeft = "10px";
			field.value = info.content;
			cont.id = field.id;
			field.addEventListener("change", function () {

				for (j = 0; j < navigationItems.length; ++j) {
					if(navigationItems[j].idInput == this.id) {
						var item = document.getElementById(navigationItems[j].id);
						item.innerHTML = this.value;
					}

				}



         /*var newItem = document.createElement("li");
      	 var mainNav = document.getElementById("usernavigation");
      	 newItem.innerHTML = this.value;
      	 mainNav.appendChild(newItem);
      	 */


      	});
			counter++;
			var deleteIcon = document.createElement("input");



			deleteIcon.type = "button";
			deleteIcon.style.backgroundImage = "url('/images/icons/delete_icon.png')";
			deleteIcon.style.width = "18px";
			deleteIcon.style.height = "18px";
			deleteIcon.style.marginLeft = "10px";
			deleteIcon.style.marginTop = "10px";
			
			deleteIcon.id = field.id;
			deleteIcon.mydata = info;

			deleteIcon.addEventListener("click", function() {
				var cElement = document.getElementById(this.mydata["id"]);
				cElement.parentNode.removeChild(cElement);

				var cElement = document.getElementById(this.mydata["idInput"]);
				cElement.parentNode.removeChild(cElement);

			});
			cont.style.overflow = "auto";
			cont.style.width ="300px";
			cont.appendChild(field);
			cont.appendChild(deleteIcon);

			existingItems.appendChild(cont);

		}
		container.appendChild(existingItems);
		var headerName = document.createElement("p");
		headerName.innerHTML = "Додати елемент";
		headerName.style.paddingLeft = "58px";
		headerName.style.marginBottom = "5px";
		headerName.marginTop = "10px";
		headerName.style.float = "left";
		container.appendChild(headerName);
		var field = document.createElement("input");
		counter++;
		field.type = "text";
		field.style.width = "190px";
		field.id = "addNew"+counter;

		field.style.padding = "10px";
		field.style.marginLeft = "10px";
		field.addEventListener("change", function(){



			var cont = document.createElement("div");
			
			var newItem = document.createElement("li");
			newItem.id = "item" + counter;
			var mainNav = document.getElementById("usernavigation");
			newItem.innerHTML = this.value;
			mainNav.appendChild(newItem);

			var info = {};
			info.content = this.value;
			info.id = "item" + counter;
			info.idInput = "addNew"+counter;

			navigationItems[i] = info;

			var field = document.createElement("input");

			field.type = "text";
			field.style.width = "190px";
			field.id = "addNew"+counter;
			field.style.padding = "10px";
			field.style.marginLeft = "10px";
			field.value = info.content;
			field.addEventListener("change", function () {

				for (j = 0; j < navigationItems.length; ++j) {
					if(navigationItems[j].idInput == this.id) {
						var item = document.getElementById(navigationItems[j].id);
						item.innerHTML = this.value;
					}

				}


			});







             var deleteIcon = document.createElement("input");



			deleteIcon.type = "button";
			deleteIcon.style.backgroundImage = "url('/images/icons/delete_icon.png')";
			deleteIcon.style.width = "18px";
			deleteIcon.style.height = "18px";
			deleteIcon.style.marginLeft = "10px";
			deleteIcon.style.marginTop = "10px";
			deleteIcon.id = field.id;
			deleteIcon.mydata = info;

			deleteIcon.addEventListener("click", function() {
				var cElement = document.getElementById(this.mydata["id"]);
				cElement.parentNode.removeChild(cElement);

				var cElement = document.getElementById(this.mydata["idInput"]);
				cElement.parentNode.removeChild(cElement);

			});
			cont.id = field.id;
			cont.style.overflow = "auto";
			cont.style.width ="300px";
			cont.appendChild(field);
			cont.appendChild(deleteIcon);










			existingItems.appendChild(cont);
		});
		container.appendChild(field);

		formElement.appendChild(container);



/*
	var name = document.createElement("p");
	name.style.padding = "10px";
	name.style.marginLeft = "10px";
	name.innerHTML = "Text:"; */

	






}
