;(function(DayEvent, database, mediator, bind, changeClass){
	
	'use strict';

	function NavigationForDayEvent(nodeDayEvent, nodeControl) {
		if (!nodeDayEvent || !nodeControl) return;
		this.nodeDayEvent = document.querySelector(nodeDayEvent);
		this.nodeControl = document.querySelector(nodeControl);	
		this.addEvents();
	}	

	NavigationForDayEvent.prototype.addEvents = function() {
		var v_this = this;
		if (!document.querySelector('.total')) return;
		this.nodeMainForm = document.querySelector('.total');
		v_this.dayEvent = new DayEvent({
			callbackAdd: function(dayEventObj) {
				v_this.actionEvent(dayEventObj, add);
			},
			callbackRemove: function(dayEventObj) {
				v_this.actionEvent(dayEventObj, remove);
			},
			callbackClose: function() {
				v_this.actionEvent(close);
			}
		});
		
		function stopAction(event) {
    		event = event || window.event;
			if (event.preventDefault) { 
    			event.preventDefault();
  			} else { 
    			event.returnValue = false;
  			}
  			event.stopImmediatePropagation();
		}

		v_this.dayEventElement = v_this.dayEvent.getDayEvent();
		v_this.nodeDayEvent.appendChild(v_this.dayEventElement);
		v_this.hideDayEvent();

		bind(v_this.nodeControl, 'click', function(event) { 
			var target = event.target;
			while (target !== v_this) {
				if (target.nodeName === 'TH') { 
					return;
				}
				else if (target.nodeName === 'TD') {
					if (target.className === "empty") return;
						var item = target.id;

						v_this.deactivateForm();
						bind(document.querySelector('.control'), 'click', function(event) {
							stopAction();
						});
						
						v_this.printEvent(item); 
						return false;
				}
				target = target.parentNode;
			}
		});
	};

	NavigationForDayEvent.prototype.actionEvent = function(dayEventObj, action) {
		var item = dayEventObj['date'];
		switch (action) {
			case add: database.setItem(item, dayEventObj); break;
			case remove: database.removeItem(item); break;
			case close: this.hideDayEvent(); break;
		    default: break;
		}
		mediator.publish('ShowEvent', item);
		this.hideDayEvent();
		this.activateForm();
	};
	
	NavigationForDayEvent.prototype.deactivateForm = function() {
		changeClass.addClass(this.nodeMainForm, 'transparency');
	}

	NavigationForDayEvent.prototype.activateForm = function() {
		changeClass.removeClass(this.nodeMainForm, 'transparency');
	}

	NavigationForDayEvent.prototype.printEvent = function(item) {	
		var obj = database.getItem(item) || { name: '', date: item, time: '08:00', participants: '', description: ''};
		this.dayEvent.setDayEvent(obj)
		this.showDayEvent();
	};

	NavigationForDayEvent.prototype.hideDayEvent = function() {
		changeClass.addClass(this.dayEventElement, 'hide');
	};

	NavigationForDayEvent.prototype.showDayEvent = function() {
		changeClass.removeClass(this.dayEventElement, 'hide');
	};


	window.NavigationForDayEvent = NavigationForDayEvent;

})(window.DayEvent, window.database, window.app.mediator, window.app.bind, window.changeClass);