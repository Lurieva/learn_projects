;(function(database, mediator, bind, addElem){
	"use strict";


	function ShowEvent(node) {
		this.node = node;
		this.addEvents();
	}

	ShowEvent.prototype.addEvents = function() {
		var v_this = this;
		mediator.subscribe('ShowEvent', function(id) {
			v_this.showEventNode(id);
		});
	}

	ShowEvent.prototype.showEventNode = function(id) {
		var eventArray = [];
		if (!id) {
			eventArray = document.querySelectorAll(this.node + ' td');
		} else {
			eventArray.push(document.getElementById(id));
		}
		for (var i = 0; i < eventArray.length; i += 1) {
			var cell = eventArray[i];
			this.removeDayEvent(cell);
			this.addDayEvent(cell);
		}
	}

	ShowEvent.prototype.removeDayEvent = function(cell) {
		var removeDayEvent = cell.querySelector('.spanEvent');
			if (removeDayEvent) {
				cell.removeChild(removeDayEvent);
			}
	}

	ShowEvent.prototype.addDayEvent = function(cell) {
		var item = database.getItem(cell.id);
		if (item) {
			var eventSpan = cell.addElem("span", {className: "spanEvent", innerHTML: item['name']});
		}
	}

	window.ShowEvent = ShowEvent;

})(window.database, window.app.mediator, window.app.bind, window.htmlHelper);