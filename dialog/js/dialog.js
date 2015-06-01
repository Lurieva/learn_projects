;(function(addElem){
 
   'use strict' 

    function DialogBox(messageTitle, messageBody, buttons) {
      var messageBox = this.createMessageBox(messageTitle, messageBody, buttons);
      this.positionMessageBox();
      this.closeMessageBox(messageBox, buttons);
    }


    function bind(obj, eventName, handler) {
		  var handlerWraper = function(event) {
		  var event = event || window.event;
		  if (!event.target || event.srcElement) {
			  event.target = event.srcElement;
		  }
		  return handler.call(obj, event);
		  }
		  if (obj.addEventListener) {
			  obj.addEventListener(eventName, handlerWraper, false);
		  } else if (obj.detachEvent){
			  obj.detachEvent('on' + eventName, handlerWraper);
		  }
	  };


	    this.createMessageBox = function(messageTitle, messageBody, buttons){
        var but = [];
		    var messageBox = document.body.addElem("div", {className: "container"});
        var title = messageBox.addElem("span", {id:"title", innerHTML: messageTitle})
        var close = messageBox.addElem("span", {id:"close", innerHTML: "&times"});
        var body = messageBox.addElem("span", {id:"text", innerHTML: messageBody});
        if (buttons) {
          for (var i in buttons) {
            if (i = 'classButton') {
            var but = messageBox.addElem("div", {className: classButton, innerText: buttons[i].value});
            }
          }
        }
        return messageBox;
      }

      this.positionMessageBox = function(messageBox) {
        messageBox.style.position = 'absolute';
        var scroll = document.documentElement.scrollTop || document.body.scrollTop;
        messageBox.style.top = scroll + 200 + 'px'
        messageBox.style.left = Math.floor(document.body.clientWidth/2) - 150 + 'px'
      }

	    this.closeMessageBox = function(messageBox, buttons){
        var but = messageBox.querySelector("but");
        bind(but, 'click', function(event) {
          while(target != this) {
            if (target.tagName == 'DIV') {
              if (buttons) {
                for (var i in buttons) {
                  if (i = 'action') {
                    buttons.action();
                  }
                }
              }
              return false;
            }
              target = target.parentNode;
              return false;
          }
          messageBox.parentNode.removeChild(messageBox);
        });
      }


   	window.onload = function() {
      var groupOfButtons = document.querySelector(".groupOfButtons");
       bind(groupOfButtons, 'click', function(event) {
        while(target != this) {
          if (target.tagName == 'DIV') {
            switch (target.id) {
              case "confirmation": new DialogBox("Confirmation", "Текст сообщения", "Ok" : {classButton: "okButton"}, "Cancel"); break;
              case "alert": new DialogBox("Alert", "Текст сообщения", {"Ok"}); break;
              case "error": new DialogBox("Error", "Текст сообщения", {"Ok"}); break;
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