initFrameSettings();
function clearDefaultEvents () {
  var body = document.body;

  body.onclick = function(event) { };
  body.onmousemove = function(event) { event.preventDefault();};
  body.onmousedown = function(event) {};

}
clearDefaultEvents();





var currentElement;
var moving = false;
var resizing = false;
var resizingType = 0;
var startX;
var startY;
var rect;
var startTop = 0;
var startLeft = 0;
var currentElementHeight;
var currentElementWidth;
var currentBottom;
var currentRigth;
var editor = document.getElementById("editor");
var interactingWithChild;
var interactingWithChild2;


function onMouseDown(el) {
  if(el=="[object MouseEvent]") {
    el = window.event.target;
  }

  console.log(el);
// replace elements inside div blocks
  if(el == interactingWithChild) {      
    interactingWithChild = undefined;
    return;
  }
  if(el == interactingWithChild2) {
    
    interactingWithChild2 = undefined;
    return ;
  }
  interactingWithChild = el.parentNode;
  if(el.parentNode!=null) {
  interactingWithChild2 = el.parentNode.parentNode;
}
  elem = document.getElementById("settings");
// create settings menu for every element and delete previous
  if(elem!=null)
  
  elem.parentNode.removeChild(elem);
  
  initSettingsBarContent(el, initSettingsBar());
  // get current Element
  currentElement = el;
  
  // change style for selected element
  currentElement.style.opacity  = 0.6;


  myFunction1();

  moving = true;   
  // get initial position 
  function myFunction1() {
    startTop = parseFloat(window.getComputedStyle(el,null).getPropertyValue("top"));
    startLeft = parseFloat(window.getComputedStyle(el,null).getPropertyValue("left"));

    if(isNaN(startTop)==true) {

      startTop = 0;
      startLeft = 0;

    }
  //get current mouse point
    startX = window.event.x;
    startY = window.event.y;

    rect = el.getBoundingClientRect();

    currentElementWidth = parseFloat(window.getComputedStyle(currentElement,null).getPropertyValue("width"));
  
    currentElementHeight = parseFloat(window.getComputedStyle(currentElement,null).getPropertyValue("height"));
    currentRigth = parseFloat(window.getComputedStyle(currentElement,null).getPropertyValue("right"));
    currentBottom = parseFloat(window.getComputedStyle(currentElement,null).getPropertyValue("bottom"));
    //detect what action is intended  
    // resize left edge 
    if(rect.top <= startY && rect.bottom>=startY && Math.abs(rect.right - startX) < 5)
    {
      resizing = true;
      resizingType = 0;
      
      moving = false;

    }
    // resize right edge
    if(rect.top<=startY && rect.bottom>=startY && Math.abs(rect.left - startX)<5)
    {
      resizing = true;
      resizingType = 1;
      

      moving = false;

    }
    // resize top edge

    if(rect.left<=startX && rect.right>=startX && Math.abs(rect.bottom - startY)<5)
    {
      resizing = true;
      resizingType = 2;
      
      moving = false;

    }
    // resize bottom edge
    if(rect.left<=startX && rect.right>=startX && Math.abs(rect.top - startY)<5)
    {
      resizing = true;
      resizingType = 3;
      
      moving = false;

    }
  } 

  // mouse up event
  editor.addEventListener("mouseup", function() {
   moving = false;
   resizing = false;
   currentElement.style.opacity = 1;

 });
  // moving
  editor.addEventListener("mousemove", function() {
   myFunction(window.event);
 });

  function myFunction(e) {

   if(moving==true && resizing==false) {
 
    // get shift 
    var x = e.clientX-startX;
    var y = e.clientY-startY;
    // shift element to x 
   currentElement.style.top = startTop + y  + "px";
   currentElement.style.left = startLeft + x  + "px";


 }
 if(resizing==true && resizingType==0) {
  var x = e.clientX-startX;
  var y = e.clientY-startY;

   currentElement.style.width = currentElementWidth + x  + "px";
   

 }
 if(resizing==true && resizingType==1) {
  var x = e.clientX-startX;
  var y = e.clientY-startY;
   currentElement.style.left = startLeft + x  + "px";

   currentElement.style.width = currentElementWidth - x  + "px";

   
 }
 if(resizing==true && resizingType==2) {
   var x = e.clientX-startX;
   var y = e.clientY-startY;
   currentElement.style.height = currentElementHeight + y  + "px";
   
 }

 //var currentBodyHeight = window.getComputedStyle(document.getElementById("editor"),null).getPropertyValue("height");
 if(resizing==true && resizingType==3) {
  var x = e.clientX-startX;
  var y = e.clientY-startY;
  currentElement.style.top = startTop + y  + "px";

  currentElement.style.height = currentElementHeight - y  + "px";

  //document.getElementById("editor").style.height = currentBodyHeight;

  
}

}
}
