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
header.innerHTML = "Settings";


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

console.log("Top: " + positionTop + "Left: " +positionLeft+ "startX: " + startX+"startY"+startY);

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
console.log(lastPositionTop);
console.log(lastPositionLeft);
});

});
div.appendChild(header);

return div;
}

//create form's input based on target properties and append them to parent
function initSettingsBarContent(target, parent) {

parent.style.width = "10%";
parent.id = "settings";
parent.style.height = "40%";
parent.style.backgroundColor = "#FFFFFF";
parent.style.position = "fixed";
parent.style.top = lastPositionTop;
parent.style.borderStyle = "solid";
parent.style.borderWidth = "2px";
parent.style.borderColor = "#011845";
parent.addEventListener("resize", function () {});
parent.style.left = lastPositionLeft;

document.body.appendChild(parent);

var propertiesValues = window.getComputedStyle(target, null);
var targetID =  target.id.toLowerCase() == "" ?  target.className.toLowerCase() : target.id.toLowerCase();
var availibleProperties = targetProperties[targetID]; 
console.log(targetID);

var amount = 0;
content = {};
var form = document.createElement("form");
form.style.backgroundColor = "#FF00FF";

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
		console.log("Property: " + availibleProperties[i] + "Value: " + propertiesValues.getPropertyValue(availibleProperties[i]));
}

for(var p in content) {
var name = document.createElement("p");
name.innerHTML = mapping[p];
var field = document.createElement("input");
field.type = "text";
field.style.width = "100%";
field.name = p;
field.id = p;
field.addEventListener("change",function () {
  if(this.name == "innerHTML") {
  	target.innerHTML = this.value;
  } else {target.style[this.name]= this.value;}
  
});
field.defaultValue = content[p];

form.appendChild(name);
form.appendChild(field);

}
if(targetID == "usernavigation") {
	addExtraFunctionality(form);
}
parent.appendChild(form);

}
var counter = 0 ;
function addExtraFunctionality (formElement) {
	var headerName = document.createElement("p");
	headerName.innerHTML = "Add new Item";
	var name = document.createElement("p");
	name.innerHTML = "Text:"; 
	var field = document.createElement("input");
    field.type = "text";
    field.style.width = "100%";
    field.name = "name" + counter;
    field.id = "addnew" + counter;

    field.addEventListener("change", function () {
       var newItem = document.createElement("li");
       var mainNav = document.getElementById("usernavigation");
       newItem.innerHTML = this.value;
       mainNav.appendChild(newItem);

    });
    counter++;

    formElement.appendChild(headerName);
    formElement.appendChild(name);
    formElement.appendChild(field);
 
}
