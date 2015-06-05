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

  Function.prototype.inheritsFrom = function(superClass) {
    var Inheritance = function(){};
    Inheritance.prototype = superClass.prototype;
    this.prototype = new Inheritance();
    this.prototype.constructor = this;
    this.superClass = superClass;
  }


  var FormObj = function(params) {
    this.title = params.title||"FormObj";
    this.message = params.message || " ";
    this.createFormObj();
  }

  FormObj.prototype.createFormObj = function(){
    this.createForm();
    this.closeForm(this.form);
    this.positionFormObj(this.form);
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

  FormObj.prototype.positionFormObj = function(form){
    form.style.position = 'absolute';
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    form.style.top = scroll + 100 + 'px'
    form.style.left = Math.floor(document.body.clientWidth/2) - 150 + 'px';
  };


  var DialogObj = function(params){
    this.title = params.title || "DialogObj";
    DialogObj.superClass.apply(this, arguments);
  }
  DialogObj.inheritsFrom(FormObj);   


  var AlertObj = function(params) {
    this.title = params.title || "AlertObj";
    this.button = params.buttons;
    AlertObj.superClass.apply(this, arguments);
  }
  AlertObj.inheritsFrom(DialogObj);   

  AlertObj.prototype.createForm = function() {
    AlertObj.superClass.prototype.createForm.apply(this, arguments);
    var groupButton = this.form.addElem("div", {id : "groupButton"});
    var but = this.button;
      for (var key in but) { // no need
        // were are the cheking for standart inner properties of objects
        (function(){  // i don't like this
          var val = but[key];
          groupButton.addElem("div", {className : "button-message ", innerHTML : key}).onclick = function(){
            if (!val.action) {
              val.action = function(){};
            }
          val.action();  
          document.body.removeChild(document.getElementById("formOverlay"));
          return false;
          }    
        })();
      } 
  };


  var ConfirmObj = function(params) {
    this.title = params.title || "ConfirmObj";
    ConfirmObj.superClass.apply(this, arguments);
  }
  ConfirmObj.inheritsFrom(AlertObj);   


  var PromptObj = function(params) {
    this.title = params.title || "ConfirmObj";
    PromptObj.superClass.apply(this, arguments);
  }
  PromptObj.inheritsFrom(AlertObj);   

  /*PromptObj.prototype.createForm = function() {
    PromptObj.superClass.prototype.createForm.apply(this, arguments);
    document.querySelector("message").addElem("input", {className : "inputField"}) 
  };*/





window.onload = function() {
	var groupOfButtons = document.querySelector('.groupOfButtons');
	addEvent(groupOfButtons, 'click', function(event) {
		var event = event || window.event; 
        var target = event.target || event.srcElement;
        while (target != this) {
          if (target.tagName == 'DIV') {
            switch (target.id) {
              case "dialog": new DialogObj("","");
              break;
              case "window":
              break;
              case "toolBox":
              break;
              case "actionTool":
              break;
              case "alert": new AlertObj({
                              "title" : "AlertObj", 
                              "message" : "Какое-то сообщение", 
                              "buttons" : {
                                "Ok" : {
                                  "action" : function(){
                                     console.log('You click ok');
                                  }
                                }
                              }
                            });
              break;
              case "error":              
              break;
              case "info":  
              break;
              case "stop":  
              break;
              case "confirm": new ConfirmObj({ 
                                "title" : "Сonfirm", 
                                "message" : "Какое-то сообщение", 
                                "buttons" : {
                                  "Ok" : {
                                    "action" : function(){
                                      console.log('You click ok');
                                    }
                                  }, 
                                  "Cancel" : {
                                    "action" : function(){}
                                  }
                                }
                              });
			 	      break;
              case "prompt":  new PromptObj("","","")
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