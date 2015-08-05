;(function(){
 
   'use strict' 

 	var addEvent = function(elem, type, handler) {
    if (!elem) return;
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);  
    } else {
      elem.attachEvent("on" + type, handler);
    }
  };

  function removeEvent(event) {
    event = event || window.event;
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }

  Function.prototype.inheritsFrom = function(superClass) {
    var Inheritance = function(){};
    Inheritance.prototype = superClass.prototype;
    this.prototype = new Inheritance();
    this.prototype.constructor = this;
    this.superClass = superClass;
  };


   var FormObj = function(params) {
    this.title = params.title || "FormObj";
    this.message = params.message || " ";
    this.createFormObj();
  };

  FormObj.prototype.createFormObj = function(){
    var v_this = this;
    v_this.renderTitle();
    v_this.renderBody();
    v_this.positionFormObj(this.form);
    dragMaster.makeDraggable(this.form);
    v_this.blockScreen();
    addEvent(document.querySelector('.close'), 'click', function(){
      v_this.closeForm();
    });
  };

  FormObj.prototype.renderTitle = function() {
    this.form = document.body.addElem("div", {id : "formOverlay"});
    this.form.addElem("div", {className : "close", innerHTML: "&times"});
    this.form.addElem("div", {className : "title", innerHTML: this.title});
  };
  
  FormObj.prototype.renderBody = function() {  
    var v_this = this;
    this.msg = this.form.addElem("div", {className : "msgField"});
    this.msg.addElem("div", {className : "message", innerHTML: this.message});

    var groupButton = v_this.form.addElem("div", {id : "groupButton"});
      for (var key in v_this.button) {
        (function(){
          var val = v_this.button[key];
          groupButton.addElem("div", {className : "button-message ", innerHTML : key}).onclick = function(){
            if (!val.action) {
              val.action = function(){};
            }
            val.action();  
            v_this.closeForm();
            return false;
          }    
        })();
      }
  };

  FormObj.prototype.closeForm = function(){
    document.body.removeChild(document.getElementById("formOverlay"));
    document.body.removeChild(document.getElementById("screenOverlay"));
  };

  FormObj.prototype.positionFormObj = function(form) {
    form.style.position = 'absolute';
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    form.style.top = scroll + 100 + 'px';
    form.style.left = Math.floor(document.body.clientWidth/2) - 150 + 'px';
  };

  FormObj.prototype.blockScreen = function() {
    document.body.addElem("div", {id : "screenOverlay"});
  };

  FormObj.prototype.closeForm = function(){
    document.body.removeChild(document.getElementById("formOverlay"));
    document.body.removeChild(document.getElementById("screenOverlay"));
  };

  FormObj.prototype.positionFormObj = function(form) {
    form.style.position = 'absolute';
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    form.style.top = scroll + 100 + 'px';
    form.style.left = Math.floor(document.body.clientWidth/2) - 150 + 'px';
  };

  FormObj.prototype.blockScreen = function() {
    document.body.addElem("div", {id : "screenOverlay"});
  };

 

  var ToolBoxObj = function(params) {
    this.title = params.title || "ToolBoxObj";
    this.button = params.buttons;
    this.array = params.select;
    ToolBoxObj.superClass.apply(this, arguments);
  };
  ToolBoxObj.inheritsFrom(FormObj)

  ToolBoxObj.prototype.renderBody = function() {
    ToolBoxObj.superClass.prototype.renderBody.apply(this, arguments);
    this.renderSelectField(this.msg, this.array);
  };

  ToolBoxObj.prototype.renderSelectField = function(parent, array) {
    this.select = parent.addElem("select", {className: "selectList"});
    this.select.onmousedown = function(){
      removeEvent(event);
    }
    for (var i = 0; i < array.length; i += 1) {
      this.select.addElem("option", {value : array[i], innerHTML : array[i]});
    }
  };


  var ActionToolObj = function(params) {
    this.title = params.title || "ToolBoxObj";
    this.button = params.buttons;
    this.array = params.select;
    ActionToolObj.superClass.apply(this, arguments);
  };
  ActionToolObj.inheritsFrom(FormObj)

  ActionToolObj.prototype.renderBody = function() {
    ActionToolObj.superClass.prototype.renderBody.apply(this, arguments);
    this.groupSelect = this.form.addElem("div", {id : "groupSelect"});
    for (var key in this.array) {
      this.select = this.groupSelect.addElem("select", {className : "selectList"});
      this.select.onmousedown = function(){
        removeEvent(event);
      }
      for (var i = 0; i < this.array[key].length; i += 1) {
        this.select.addElem("option", {innerHTML : this.array[key][i]});
      }
    }
  };

  

  var DialogObj = function(params) {
    this.title = params.title || "DialogObj";
    this.message = params.message || "Some message";
    this.button = params.buttons;
    DialogObj.superClass.apply(this, arguments);
  };
  DialogObj.inheritsFrom(FormObj) 

 


  var AlertObj = function(params) {
    this.title = params.title || "AlertObj";
    this.button = params.buttons;
    AlertObj.superClass.apply(this, arguments);
  };
  AlertObj.inheritsFrom(DialogObj)

  AlertObj.prototype.renderBody = function() {
    AlertObj.superClass.prototype.renderBody.apply(this, arguments);
    if (this.imgClassName) {
      this.renderImg(this.imgClassName);
    }
  };

  AlertObj.prototype.renderImg = function(classNameImg) {
    var img = this.msg.addElem('div', {className : classNameImg});
    this.msg.insertBefore(img, document.querySelector(".message"));
  }  


  var ErrorObj = function(params) {
    this.title = params.title || "ErrorObj";
    this.imgClassName = "msgImg errorMsgImg";
    ErrorObj.superClass.apply(this, arguments);
  };
  ErrorObj.inheritsFrom(AlertObj)


  var InfoObj = function(params) {
    this.title = params.title || "InfoObj";
    this.imgClassName = "msgImg infoMsgImg"
    InfoObj.superClass.apply(this, arguments);
  };
  InfoObj.inheritsFrom(AlertObj) 


  var StopObj = function(params) {
    this.title = params.title || "StopObj";
    this.imgClassName = "msgImg stopMsgImg";
    StopObj.superClass.apply(this, arguments);
  };
  StopObj.inheritsFrom(AlertObj) 


  var ConfirmObj = function(params) {
    this.title = params.title || "ConfirmObj";
    ConfirmObj.superClass.apply(this, arguments);
  };
  ConfirmObj.inheritsFrom(AlertObj)  


  var PromptObj = function(params) {
    this.title = params.title || "ConfirmObj";
    PromptObj.superClass.apply(this, arguments);
  };
  PromptObj.inheritsFrom(AlertObj)  

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
          case "dialog":  new DialogObj({
                            "title" : "DialogObj",
                            "message" : "Some message",
                            "buttons" : {
                              "Ok" : {
                                "action" : function(){
                                  console.log('You click ok');
                                }
                              }
                            }
                          });
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
          case "actionTool": new ActionToolObj({
                              "title" : "ActionToolObj",
                              "message" : "Some message",
                              "select" : {
                                "First" : ["Apple", "Tomato", "Cherry"],
                                "Second" : ["Red", "Green", "Blue"]
                                },
                              "buttons" : {
                                "Save" : {
                                  "action" : function(){
                                    console.log(true);
                                  }
                                }, 
                                "Cancel" : {
                                  "action" : function(){}
                                }
                              }
                            }); 
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
                              "Cancel" : {}
                            }
                          });
			 	  break;
          case "prompt":  new PromptObj({ 
                            "title" : "Сonfirm", 
                            "message" : "Какое-то сообщение", 
                            "buttons" : {
                              "Ok" : {
                                "action" : function(){
                                  console.log(document.querySelector(".inputField").value);
                                }
                              }, 
                              "Cancel" : {}
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


})();