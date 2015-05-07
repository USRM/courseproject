var targetProperties = {
	"userheader" : ["img", "height", "width", "background-color", "borderRadius"],
	"userfooter" : ["height", "width", "background-color", "borderRadius", "innerHTML"],
	"usermain" : ["height", "width", "background-color", "borderRadius"],
	"usernavigation" : ["height", "width", "background-color", "borderRadius"],
	"userheadernews" : ["height", "width", "background-color", "borderRadius", "color", "padding", "innerHTML"],
	"userheaderarticle" : ["height", "width", "background-color", "borderRadius", "color", "padding", "innerHTML"],
	"usernews" : ["height", "width","background-color", "borderRadius"],
	"news" : ["height", "width","background-color", "borderRadius"],
	"headermenu" : ["height", "width","background-color", "borderRadius", "innerHTML"],
	"usernavitem" : ["height", "width","background-color", "borderRadius", "innerHTML"],
	"newscontainer" : ["height", "width","background-color", "borderRadius", "padding"],
	"asidebar": ["height", "width","background-color", "borderRadius", "padding"]
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
var targetElement;
//create form's input based on target properties and append them to parent
function initSettingsBarContent(target, parent) {
	targetElement = target;
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
		if(targetID == "news") {
			addChangeFeature(form);
		}
		parent.appendChild(form);

	}
	var counter = 0;

	var navigationItems = [];
function addExtraFunctionality (formElement) {

		var ul = document.getElementById("usernavigation");
		if(ul!=null)
		var children = ul.children;


		

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

		if(ul!=null)
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
}

var targetToDelete;
var addedElements=[];
var prevElem;
function deletable(element) {
	if(prevElem!=null) {
		prevElem.style.opacity = 1;
	}
	targetToDelete = element;
	targetToDelete.style.opacity = 0.8;
	prevElem = targetToDelete;
}
var toDelete = [];

function addChangeFeature(formElement ) {
	var changeButton = document.createElement("input");
	changeButton.type = "button";
	changeButton.style.width = "190px";
	changeButton.value = "Змінити вигляд";
	changeButton.style.marginLeft ="10px";
	changeButton.addEventListener("click", function() {
     	if(document.getElementById("newsEditor") != null) {
        var elem = document.getElementById("newsEditor");
        elem.parentNode.removeChild(elem);
    	}

		var extraEditor = document.createElement("div");

		extraEditor.style.width = "700px";
		extraEditor.style.height = "400px";
		extraEditor.style.position = "fixed";
		extraEditor.style.top = "100px";
		extraEditor.style.margin ="0 auto";
		extraEditor.style.left = "50%";
		extraEditor.style.marginLeft = "-400px";
		extraEditor.id = "newsEditor";
		extraEditor.style.backgroundColor = "rgba(255,255,255,1)";
		var html = targetElement.innerHTML;

	
		var replaced;
		replaced = html.replace("<h2","<h2 onclick='deletable(this)' ");//.html.
		replaced = replaced.replace("<img", "<img onclick='deletable(this)' ");
		replaced = replaced.replace("<p", "<p onclick='deletable(this)' ");
		
		extraEditor.innerHTML = replaced;

		var deleteIcon = document.createElement("input");
        deleteIcon.type = "button";
	    deleteIcon.style.width = "130px";
	    deleteIcon.value ="Видалити";
		deleteIcon.style.position = "absolute";
		deleteIcon.style.bottom = "10px";
		deleteIcon.style.right = "146px";
		deleteIcon.addEventListener("click", function() {
			
			if(targetToDelete!=null) {
				console.log(targetToDelete.className);
				toDelete.push(targetToDelete.className);
				targetToDelete.parentNode.removeChild(targetToDelete);
			}

		});
		extraEditor.appendChild(deleteIcon);



		var applyIcon = document.createElement("input");
        applyIcon.type = "button";
		applyIcon.style.width = "130px";
		applyIcon.value ="Застосувати";
		applyIcon.style.position = "absolute";
		applyIcon.style.bottom = "10px";
		applyIcon.style.right = "10px";
		applyIcon.addEventListener("click", function() {
				
			for(var i = 0; i<toDelete.length; ++i) {
				var temp = document.getElementsByClassName(toDelete[i]);
				console.log(temp.length);
				for(var j = temp.length-1; j>=0; --j) {
					console.log(temp[j].innerHTML);
					temp[j].parentNode.removeChild(temp[j]);
				}
			} 


			for(var i = 0; i<addedElements.length; ++i) {
				var temp = document.getElementsByClassName("news");
				console.log(temp.length);
				for(var j = temp.length-1; j>=0; --j) {
					
					temp[j].innerHTML = temp[j].innerHTML + addedElements[i];
				}
			}

			extraEditor.parentNode.removeChild(extraEditor);

		});
		extraEditor.appendChild(applyIcon);

        document.body.appendChild(extraEditor);


        var options = document.createElement("INPUT");
        options.setAttribute("list", "soptions");
        options.style.position = "absolute";
		options.style.bottom = "10px";
		options.style.right = "400px";
        extraEditor.appendChild(options);

        var y = document.createElement("DATALIST");
        y.setAttribute("id", "soptions");
        extraEditor.appendChild(y);

        var z = document.createElement("OPTION");
        z.setAttribute("value", "Абзац");
        var z1 = document.createElement("OPTION");
        z1.setAttribute("value", "Заголовок");
        var z2 = document.createElement("OPTION");
        z2.setAttribute("value", "Зображення");
        y.appendChild(z);
        y.appendChild(z1);

        y.appendChild(z2);



        var addElement = document.createElement("input");
        addElement.type = "button";
		addElement.style.width = "130px";
		addElement.value ="Добавити";
		addElement.style.position = "absolute";
		addElement.style.bottom = "10px";
		addElement.style.right = "567px";
		addElement.addEventListener("click", function() {
			if(options.value=="") {
				alert("Виберіть тип елементу!");
			}
			if(options.value=="Абзац") {
				var nHTML = "<p ondblclick='changeInnerContent(this)'>Новий Абзац</p>";
				addedElements.push(nHTML);
				console.log(addedElements.length);
			}
			if(options.value=="") {
				alert("Виберіть тип елементу!");
			}
			
		});
		extraEditor.appendChild(addElement);
        document.body.appendChild(extraEditor);
	});
	formElement.appendChild(changeButton);
}

