;(function(){
 
   'use strict'  
  
  function Rotator(array, currentIndex) {
    this.array = array || [];  
    this.currentIndex = currentIndex || 0;
    this.movesRange = 5;
    this.step = 0;
    this.maxStep = Math.floor(this.movesRange/2)*(-1);
    this.setMoveRange = function(movesRange) {
      this.movesRange += this.movesRange%2 == 0 ? 1 : 0;
    };

    Rotator.prototype.createRotator = function(parent) {
      this.parent = parent;
      this.createElementOfForm();
      this.buildList();
      this.addEvents();
    };

    var addEvent = function(elem, type, handler) {
      if (!elem) return;
        if (elem.addEventListener) {
          elem.addEventListener(type, handler, false);  
        } else {
          elem.attachEvent("on" + type, handler)
        }
    };
    
    Rotator.prototype.addEvents = function() {
      var v_this = this;
      addEvent(this.divBack, 'click', function() { v_this.step = -1; v_this.changeImg();});
      addEvent(this.divForward, 'click', function() { v_this.step = 1; v_this.changeImg();});
      addEvent(this.divCopy, 'click', function() {v_this.copyImg()});      
      addEvent(this.divDelete, 'click', function() {v_this.deleteImg()});   
      addEvent(this.divList, 'click', function(event) {
        
        var event = event || window.event; 
        var target = event.target || event.srcElement;
        while (target != this) {
          if (target.tagName == 'SPAN') {
            v_this.divImg.src = target.innerHTML;
            v_this.divName.innerHTML = target.innerHTML;
            return false;
          }
          target = target.parentNode;
          return false;
        }
      });
      addEvent(this.divRadio, 'click', function(event) { debugger;
        var event = event || window.event; 
        var target = event.target || event.srcElement;
        while (target != this) {
          if (target.tagName == 'INPUT' && target.type == 'radio') {
            v_this.step = target._move; 
            v_this.changeImg();
            }  
          target = target.parentNode;
          return false;
        }
      });
    }
  }

  Rotator.prototype.createElementOfForm = function() {

  function create(name, attributes) {
    var el = document.createElement(name);
      for (var i in attributes) {
      el.setAttribute(i, attributes[i]);
  }
    return el;
  }

    var div = create('div',{class: "body-style"});
    this.parent.appendChild(div);

    this.divName = create('div', {class: "name"});
    div.appendChild(this.divName);
    var divForm = create('div', {class: "form"});
    div.appendChild(divForm);
    this.divBack = create('div', {class: "back"});
    this.divBack.innerHTML = "Back";
    divForm.appendChild(this.divBack);
    var divCenter = create('div', {class: "center"});
    divForm.appendChild(divCenter);
    this.divImg = create('img', {name: "images", src: this.array[0], class: "images", alt: "Image dont found", width: "300", height: "200"});
    divCenter.appendChild(this.divImg);
    this.divRadio = create('div', {class: "moveRadio"});
    divCenter.appendChild(this.divRadio);

    for (var i = 0; i<this.movesRange; i+=1) {
      var v_radio = document.createElement("input");
      v_radio.type = 'radio';
      v_radio._move = this.maxStep;
      if (this.maxStep == 0) {
        this.middleRadio = v_radio;
        this.middleRadio.checked = true;
      }
      this.maxStep += 1;
    v_radio.onclick = function(event) { 
      var event = event || window.event
      if (event.preventDefault) {  
          event.preventDefault();
        } else { 
          event.returnValue = false;   
        }
      };
      this.divRadio.appendChild(v_radio);
    }

    this.divForward = create('div', {class: "forward"});
    this.divForward.innerHTML = "Forward";
    divForm.appendChild(this.divForward);
    this.divList = create('div', {class: "list"});
    div.appendChild(this.divList);
    this.divDelete = create('div', {class: "delete"});
    this.divDelete.innerHTML = "Delete";
    document.body.appendChild(this.divDelete);
    this.divCopy = create('div', {class: "copy"});
    this.divCopy.innerHTML = "Copy";
    document.body.appendChild(this.divCopy);
  };


  Rotator.prototype.buildList = function () {
    this.divList.innerHTML = '';
    var node = this.divList;
    var v_str = "";
    for (var i = 0; i < this.array.length; i += 1) {
      v_str = v_str + "<li><span>" + this.array[i] + "</span></li>";
    }
    if(!node) return;                             
    node.innerHTML = v_str;
  };

  
  Rotator.prototype.changeImg = function() {
    if(this.step <= 0) {
      this.currentIndex = this.currentIndex + this.step < 0 ? this.array.length + this.step : this.currentIndex + this.step;
    } else {
      this.currentIndex = this.currentIndex + this.step > this.array.length - this.step ? 0 : this.currentIndex + this.step;
    }
    this.divImg.src = this.array[this.currentIndex];
    this.divName.innerHTML = this.array[this.currentIndex];
    this.middleRadio.checked = true;
  };

  Rotator.prototype.deleteImg = function() {
    this.step = 0;
    this.array.splice(this.currentIndex, 1);
    this.changeImg();
    this.buildList(); 
  };

  Rotator.prototype.copyImg = function() {
    this.array.splice(this.array.length, 0, this.array[this.currentIndex]);   
    this.buildList();                                 
  };

  window.onload = function() {
    
    var currentIndex;
    var arrayAnimal = [
      "img1.jpg",
      "img2.jpg",
      "img3.jpg",
      "img4.jpg",
      "img5.jpg",
      "img6.jpg",
      "img7.jpg",
      "img8.jpg",
      "img9.jpg",
      "img10.jpg"]; 

    var first = document.getElementById('first');
    var rotator = new Rotator(arrayAnimal, 0);
    rotator.createRotator(first);

  }

})();


