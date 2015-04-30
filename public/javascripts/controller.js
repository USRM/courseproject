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
  interactingWithChild2 = el.parentNode.parentNode;

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
      console.log(0);
      moving = false;

    }
    // resize right edge
    if(rect.top<=startY && rect.bottom>=startY && Math.abs(rect.left - startX)<5)
    {
      resizing = true;
      resizingType = 1;
      console.log(1);
      moving = false;

    }
    // resize top edge

    if(rect.left<=startX && rect.right>=startX && Math.abs(rect.bottom - startY)<5)
    {
      resizing = true;
      resizingType = 2;
      console.log(2);
      moving = false;

    }
    // resize bottom edge
    if(rect.left<=startX && rect.right>=startX && Math.abs(rect.top - startY)<5)
    {
      resizing = true;
      resizingType = 3;
      console.log(3);
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
/*function Main
%% ----- TASK 1 -----
% Variant 13
% (2b)  (3b)  (4e)  (5a)  (6a)

p_intial = str2num('0.8 -0.01 -0.3 0.1 -0.7 0.2 0.1 -0.2'); 

Y0 = str2num('1 2');

t0_te = str2num('0 100');

U0 = str2num('-0.0088 0.1125');



function res = F( ~, y, p )
res = [p(1)*y(1) + p(2)*y(1)^2 + (p(5)*y(1)*y(1))*y(2)/(1+p(6)*y(1)+p(7)*y(1)*y(1));
       p(3)*y(2) + p(4)*y(2)^2 + p(8)*(p(5)*y(1)*y(1))*y(2)/(1+p(6)*y(1)+p(7)*y(1)*y(1))];
end
 

options = odeset('RelTol',1e-4,'AbsTol',[1e-5 1e-5]);
sol = ode15s(@F, t0_te, Y0, options, p_intial);
  
figure('Name', 'Solution', 'OuterPosition', [100, 150, 1080, 501]);
  
subplot(1,2,1);
    plot(sol.x, sol.y(1,:), 'r', sol.x, sol.y(2,:))
    legend('Preys', 'Predators')
    title('Populations timeline')
    xlabel('Time')
    ylabel('Populations')

subplot(1,2,2);
    plot(sol.y(1,:), sol.y(2,:))
    title('Phase plane')
    xlabel('y_1 - Preys')
    ylabel('y_2 - Predators')

alpha = 0.5;

%% ----- TASK 2 -----

disp('2-------------------------------------');
  

pn = p_intial - alpha * abs(p_intial);
pv = p_intial + alpha * abs(p_intial);
disp('pn');
disp(pn);

disp('pv');
disp(pv);

%% ----- TASK 3 -----
disp('3-------------------------------------');

k = 13;
kp = 8;

nz = [ max(5,mod(k,8))  max(4,mod(k,7)) ];

htz = [(t0_te(2)-t0_te(1))*0.9 / (nz(1)-1) (t0_te(2)-t0_te(1))*0.9 / (nz(2)-1)];

tz1 = t0_te(1) + (0.1*(t0_te(2)-t0_te(1))):htz(1):t0_te(2);
tz2 = t0_te(1) + (0.1*(t0_te(2)-t0_te(1))):htz(2):t0_te(2);

function [ gz1, gz2 ] = calculate_gz( k, sol, tz1, tz2, u)


    yz1 = deval(sol, tz1); 
    y1z1 = yz1(1,:);
    yz2 = deval(sol, tz2); 
    y2z2 = yz2(2,:);
            gz1 = y1z1*u(1);
            gz2 = y2z2;
end

kn = [mod(k,3)+1  kp-mod(k,4)];

calcGz = @(sol, tz1, tz2, u, dy)calculate_gz(k, sol, tz1, tz2, u);
[gz1, gz2] = calcGz(sol, tz1, tz2, p_intial(kn), [0, 0]);

disp('g1');
disp(gz1);

disp('g2');
disp(gz2);

%% ----- TASK 4 -----

indu = zeros(1, length(p_intial));

indu(kn) = 1;
display(indu);


%% ----- TASK 5 -----

U0 = str2num('-0.0070 0.1400');

disp('Task 5');
disp('------------------------------------------------------------------');
% Form the new vector of the ODE system parameters
 new_p = p_intial;
    oii = find(indu==1);
    for i=1:1:length(U0)
        new_p(oii(i)) = U0(i);
    end


options = odeset('RelTol',1e-4,'AbsTol',[1e-5 1e-5]);
sol_new = ode15s(@F, t0_te, Y0, options, new_p);


[gz1_new, gz2_new] = calcGz(sol_new, tz1, tz2, U0, [0, 0]);

disp('g1New');
disp(gz1_new);

disp('g2New');
disp(gz2_new);

disp('psiu0 =');
disp(Psi(gz1_new, gz2_new, gz1, gz2));

figure('Name', 'gz', 'OuterPosition', [200, 200, 880, 450]);
        subplot(1,2,1);     plot(tz1, gz1, 'pb', tz1, gz1_new, 'pr');
                            xlabel('tz_1');  ylabel('gz_1');
                            legend('gz_1','gz_1new');
        subplot(1,2,2);     plot(tz2, gz2, 'pb', tz2, gz2_new, 'pr');
                            xlabel('tz_2');  ylabel('gz_2');
                            legend('gz_2','gz_2new');

function psi = calculate_psi(u, tz1, tz2, gz1, gz2, t0, te, pnew, Y0, options)
    pnew(kn) = u;
    sol = ode15s(@F, [t0 te], Y0, options, pnew);
    [gz1_n, gz2_n] = calcGz(sol, tz1, tz2,  u, pnew);
    psi =  sum((gz1 - gz1_n).^2) + sum((gz2 - gz2_n).^2);
end


%% ----- TASK 9 -----

disp('Task 9');
disp('------------------------------------------------------------------');

myfun = @(u)calculate_psi( u, tz1, tz2, gz1, gz2, t0_te(1), t0_te(2), new_p, Y0, options );
UminFmCDD = fminsearch(myfun, U0);
display(UminFmCDD);


end*/