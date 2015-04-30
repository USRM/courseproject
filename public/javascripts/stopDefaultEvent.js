function clearDefaultEvents () {


   document.body.onclick = function(event) {console.log("body click"); };
   document.body.onmousemove = function(event) {console.log("body move"); event.preventDefault();};
   document.body.onmousedown = function(event) {console.log("body down"); };

}