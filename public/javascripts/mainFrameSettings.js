function initFrameSettings() {
var menuCreated = false;
var menuVisible = false;
function adjustMain () {
  var temp = document.getElementById("editor");
  switch (this.name) {
    case "mainHeight":
    temp.style.height = this.value;
    break;
    case "mainWidth":
    temp.style.width = this.value;
    break;
    case "mainBackground":
    temp.style.background
    Color = this.value;
    break;
  }

}
window.onkeydown = function () {


  if (window.event.keyCode == 83) {

    if(menuCreated == false && menuVisible == false) {
      var div = document.createElement("div");
      div.id = "mainFrame";
      div.style.position = "fixed";
      div.style.bottom = 0;
      div.style.height = "40px";
      div.style.backgroundColor = "#1b818d";
      div.style.width = "100%";

      var field = document.createElement("input");

      field.type = "text";
      field.name = "mainHeight";
      field.id = "mainHeight";
      field.style.height = "100%";
      field.style.fontSize = "1.3em";
      field.addEventListener("change",adjustMain);
      
      var propertyValue = window.getComputedStyle(document.getElementById("editor"),null).getPropertyValue("height");
      var defaultValue = parseFloat(propertyValue);
      field.defaultValue = Math.round(defaultValue).toString() + "px" ;

      var field1 = document.createElement("input");
    
      field1.type = "text";
      field1.name = "mainWidth";
      field1.id = "mainWidth";
      field1.addEventListener("change",adjustMain);
      field1.style.height = "100%";
      field1.style.fontSize = "1.3em";
      
      var propertyValue = window.getComputedStyle(document.getElementById("editor"),null).getPropertyValue("width");
      var defaultValue = parseFloat(propertyValue);
      field1.defaultValue = Math.round(defaultValue).toString() + "px" ;

      var field2 = document.createElement("input");

      field2.type = "text";
      field2.name = "mainBackground";
      field2.id = "mainBackground";
      field2.style.height = "100%";
      field2.addEventListener("change",adjustMain);
      field2.style.fontSize = "1.3em";
      field2.defaultValue = document.getElementById("editor").style.backgroundColor;

      div.appendChild(field);
      div.appendChild(field1);
      div.appendChild(field2);

      document.body.appendChild(div);
      menuCreated = true;
      menuVisible = true;
    }
    else {
      var div = document.getElementById("mainFrame");
      if(menuVisible == false) {

        div.style.visibility = "visible";
        menuVisible = true;
      }
      else {
        div.style.visibility = "hidden";
        menuVisible = false;
      }

    } 
  }
  if(window.event.keyCode == 46) {
    if(currentElement != null)
    currentElement.parentNode.removeChild(currentElement);
  }
}
}