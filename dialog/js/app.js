;(function(addElem){
 
   'use strict' 

 	var addEvent = function(elem, type, handler) {
    if (!elem) return;
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);  
    } else {
      elem.attachEvent("on" + type, handler)
    }
  };

  function positionFormObj(messageBox) {
    messageBox.style.position = 'absolute';
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    messageBox.style.top = scroll + 100 + 'px'
    messageBox.style.left = Math.floor(document.body.clientWidth/2) - 150 + 'px'
	};

  Function.prototype.inheritsFrom = function(superClass) {
    var Inheritance = function(){};
    Inheritance.prototype = superClass.prototype;
    this.prototype = new Inheritance();
    this.prototype.constructor = this;
    this.superClass = superClass;
  }


  var FormObj = function(title, message) {
    this.title = title||"FormObj";
    this.message = message || " ";
    this.createFormObj();
  }

  FormObj.prototype.createFormObj = function(){
    this.createForm();
    this.closeForm(this.form);
    this.movingForm(this.form);
  };

  FormObj.prototype.createForm = function() {
    this.form = document.body.addElem("div", {id : "formOverlay"});
    this.form.addElem("div", {className : "close", innerHTML: "&times"});
    this.form.addElem("div", {className : "title", innerHTML: this.title});
    this.form.addElem("div", {className : "message", innerHTML: this.message});
  };

  FormObj.prototype.closeForm = function(form) {
    addEvent(document.querySelector('.close'), 'click', function() {
      document.body.removeChild(form);
    });
  };

  FormObj.prototype.movingForm = function(form){
    positionFormObj(form);
  };


  var DialogObj = function(title, message){
    this.title = title || "DialogObj";
    this.message = message || " ";
    DialogObj.superClass.apply(this, arguments);
  }
  DialogObj.inheritsFrom(FormObj);   



  var AlertObj = function(title, message, btnArray, btnClicker) {
    this.title = title || "AlertObj";
    this.btnArray = btnArray;
    this.btnClicker = btnClicker;

    AlertObj.superClass.apply(this, arguments);
  }
  AlertObj.inheritsFrom(DialogObj);   

  AlertObj.prototype.createForm = function() {
    AlertObj.superClass.prototype.createForm.apply(this, arguments);
    this.groupButton = this.form.addElem("div", {id : "groupButton"});
    this.groupButton.addElem("div", {className : "button-message", innerHTML: this.btnArray}).onclick = function(){
        console.log(this.btnClicker);
        document.body.removeChild(document.getElementById("formOverlay"));
      } 
  }

window.onload = function() {
	var groupOfButtons = document.querySelector('.groupOfButtons');
	addEvent(groupOfButtons, 'click', function(event) {
		var event = event || window.event; 
        var target = event.target || event.srcElement;
        while (target != this) {
          if (target.tagName == 'DIV') {
            switch (target.id) {
              case "dialog": new DialogObj();
              break;
              case "window":
              break;
              case "toolBox":
              break;
              case "actionTool":
              break;
              case "alert": new AlertObj("","This is message","Ok", function(){console.log('alertObj')});
              break;
              case "error":              
              break;
              case "info":  
              break;
              case "stop":  
              break;
              case "confirm": new FormObj();
			 	      break;
              case "prompt":  
              break;
              default: break; 
            }
            return false;
          }
          target = target.parentNode;
          return false;
        }
    });
}


})(window.htmlHelper);