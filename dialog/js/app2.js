;(function(addElem, move, makeDraggable){
 
   'use strict' 

 	var addEvent = function(elem, type, handler) {
    if (!elem) return;
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);  
    } else {
      elem.attachEvent("on" + type, handler)
    }
  };


  function closeForm(){
    document.body.removeChild(document.getElementById("formOverlay"));
    document.body.removeChild(document.getElementById("screenOverlay"));
  }

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
    this.renderTitle();
    this.renderBody();
    this.positionFormObj(this.form);
    dragMaster.makeDraggable(this.form);
    this.blockScreen();
    addEvent(document.querySelector('.close'), 'click', function() {
      closeForm()
    });
  };

  FormObj.prototype.renderTitle = function() {
    this.form = document.body.addElem("div", {id : "formOverlay"});
    this.form.addElem("div", {className : "close", innerHTML: "&times"});
    this.form.addElem("div", {className : "title", innerHTML: this.title});
  }
  
  FormObj.prototype.renderBody = function() {  
    this.msg = this.form.addElem("div", {className : "msgField"});
    this.msg.addElem("div", {className : "message", innerHTML: this.message});

    var groupButton = this.form.addElem("div", {id : "groupButton"});
    var but = this.button;
      for (var key in but) { // no need
        (function(){
          var val = but[key];
          groupButton.addElem("div", {className : "button-message ", innerHTML : key}).onclick = function(){
            if (!val.action) {
              val.action = function(){};
            }
          val.action();  
          closeForm();
          return false;
          }    
        })();
      }
  };

  FormObj.prototype.positionFormObj = function(form) {
    form.style.position = 'absolute';
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    form.style.top = scroll + 100 + 'px'
    form.style.left = Math.floor(document.body.clientWidth/2) - 150 + 'px';
  };

  FormObj.prototype.blockScreen = function() {
    document.body.addElem("div", {id : "screenOverlay"});
  }



  var ToolBoxObj = function(params) {
    this.title = params.title || "ToolBoxObj";
    this.button = params.buttons;
    this.array = params.select;
    ToolBoxObj.superClass.apply(this, arguments);
  };
  ToolBoxObj.inheritsFrom(FormObj);

  ToolBoxObj.prototype.renderBody = function() {
    ToolBoxObj.superClass.prototype.renderBody.apply(this, arguments);
    this.select = this.msg.addElem("select", {className: "selectList"});
    for (var i = 0; i < this.array.length; i += 1) {
      this.select.addElem("option", {innerHTML : this.array[i]});
    }
  };



  var DialogObj = function(params) {
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


  var ErrorObj = function(params) {
    this.title = params.title || "ErrorObj";
    ErrorObj.superClass.apply(this, arguments);
  }
  ErrorObj.inheritsFrom(AlertObj); 

  ErrorObj.prototype.renderBody = function() {
    ErrorObj.superClass.prototype.renderBody.apply(this, arguments);
    var img = this.msg.addElem('div', {className : "msgImg errorMsgImg"});
    this.msg.insertBefore(img, document.querySelector(".message"));
  }


  var InfoObj = function(params) {
    this.title = params.title || "InfoObj";
    InfoObj.superClass.apply(this, arguments);
  }
  InfoObj.inheritsFrom(AlertObj); 

  InfoObj.prototype.renderBody = function() {
    InfoObj.superClass.prototype.renderBody.apply(this, arguments);
    var img = this.msg.addElem('div', {className : " msgImg infoMsgImg"});
    this.msg.insertBefore(img, document.querySelector(".message"));
  }


  var StopObj = function(params) {
    this.title = params.title || "StopObj";
    StopObj.superClass.apply(this, arguments);
  }
  StopObj.inheritsFrom(AlertObj); 

  StopObj.prototype.renderBody = function() {
   StopObj.superClass.prototype.renderBody.apply(this, arguments);
    var img = this.msg.addElem('div', {className : " msgImg stopMsgImg"});
    this.msg.insertBefore(img, document.querySelector(".message"));
  }


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

  PromptObj.prototype.renderBody = function() { 
    PromptObj.superClass.prototype.renderBody.apply(this, arguments);
    this.text = this.msg.addElem("input", {className : "inputField"});
    this.text.focus();
  };



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
          case "toolBox": new ToolBoxObj({
                            "title" : "ToolBoxObj",
                            "message" : "Some message",
                            "select" : ["Apple", "Tomato", "Cherry"],
                            "buttons" : {
                              "Save" : {
                                "action" : function(){
                                  var sel = document.querySelector(".selectList").options.selectedIndex;
                                  console.log(document.querySelector(".selectList").options[sel].text);
                                }
                              }, 
                              "Cancel" : {
                                "action" : function(){}
                              }
                            }
                          }); 
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
          case "error": new ErrorObj({
                          "title" : "ErrorObj", 
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
          case "info":  new InfoObj({
                          "title" : "InfoObj", 
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
          case "stop":  new StopObj({
                          "title" : "StopObj", 
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
          case "prompt":  new PromptObj({ 
                            "title" : "Сonfirm", 
                            "message" : "Какое-то сообщение", 
                            "buttons" : {
                              "Ok" : {
                                "action" : function(){
                                  console.log(document.querySelector(".inputField").value);;
                                }
                              }, 
                              "Cancel" : {
                                "action" : function(){}
                              }
                            }
                          }); 
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


})(window.htmlHelper/*, window.dragMaster*/);