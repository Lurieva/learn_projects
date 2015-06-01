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
    

	function f_confirm(params) {
		var messageBox = document.body.addElem("div", {id : "confirmOverlay"})
    	messageBox.addElem("div", {className : "close", innerHTML: "&times"});
    	messageBox.addElem("div", {className : "title", innerHTML: params.title})
    	messageBox.addElem("div", {className : "message", innerHTML: params.message});
    	var confirmButton = messageBox.addElem("div", {id : "confirmButton"}); 
  		var but = params.buttons;
  		for (var key in but) {
  			(function() {
  			var val = but[key]; 
  			confirmButton.addElem("div", {className : "button-message " + val['className'], innerHTML: val['className'].toUpperCase()}).onclick = function(){
    			if (!val.action) {
      				val.action = function(){};
    			}
				val.action();
				document.body.removeChild(messageBox);
				return false;
    		}})(this);
    	}
    	addEvent(document.querySelector('.close'), 'click', function() {
    		document.body.removeChild(messageBox)
    	});
    	positionMessageBox(messageBox);
	}

	var positionMessageBox = function(messageBox) {
    	messageBox.style.position = 'absolute';
    	var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    	messageBox.style.top = scroll + 100 + 'px'
    	messageBox.style.left = Math.floor(document.body.clientWidth/2) - 150 + 'px'
	}


window.onload = function() {
	var groupOfButtons = document.querySelector('.groupOfButtons');
	addEvent(groupOfButtons, 'click', function(event) {
		var event = event || window.event; 
        var target = event.target || event.srcElement;
        while (target != this) {
          if (target.tagName == 'DIV') {
            switch (target.id) {
                case "confirmation": f_confirm({
										"title" : "Сonfirm", 
		    							"message" : "Какое-то сообщение", 
		    							"buttons" : {
		   									"Yes" : {
		   										"className" : "ok", 
		   										"action" : function(){
		   											console.log('You click ok');
		   										}
		   									}, 
		   									"No" : {
		   										"className" : "cancel", 
		   										"action" : function(){}
		   									}
		   								}
									});
			 	break;
              //case "alert": f_alert(); break;
              //case "error": f_error(); break;
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