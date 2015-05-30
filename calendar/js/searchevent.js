;(function(database, mediator, bind, changeClass, addElem){

	"use strict";

	function templater(string, data) {
		return string.replace(/\$([^\$]+)\$/g, function (match_string, param_name) {
			return data[param_name];
		});
	}

	function SearchEvent(node) {
		if (!node) return;
		this.node = document.querySelector(node);
		this.rightItem = [];
		this.addEvents();
		this.itemPattern = '<span class="name">$name$</span><span class="date">$date$</span><span class="time">$time$</span><span class="participants">$participants$</span><span class="description">$description$</span>';
	};

	SearchEvent.prototype.addEvents = function() {
		var v_this = this;
		var focusSearchInput = this.node.querySelector('.searchImage');
		var clear = this.node.querySelector('.searchClear');
		var searchInput = this.node.querySelector('.searchEvent');
		if (!focusSearchInput || !clear || !searchInput) return;
		this.findResult = this.node.addElem("ul", {className: "findResult"});
		
		function clearValue() {
			v_this.hideResult();
			searchInput.value = '';
			changeClass.addClass(clear, 'hide');
		};

		this.item = -1;
		this.currentItem = -1;
		v_this.findItemsLenght = 0;
		this.items = [];

		var ENTER_KEY = 13;
		var UP_KEY = 38;
		var DOWN_KEY = 40;

		bind(searchInput, 'keyup', function(event) {
			var keyCode = event.keyCode;
			if (keyCode == ENTER_KEY) {
				if (v_this.currentItem > -1) {
					if (!v_this.items[v_this.currentItem]) return false;
					var date = v_this.items[v_this.currentItem].querySelector('.date').innerHTML.split('-');
					mediator.publish('createCalendar', new Date(date));
					v_this.hideResult();
					searchInput.value = '';
				};
			} else if (keyCode == UP_KEY) { 
				if (this.value && this.value.length > 0) {
					v_this.item = v_this.item <= 0 ? v_this.findItemsLenght : v_this.item - 1;
					v_this.selectItem(v_this.item);
				};
			} else if (keyCode == DOWN_KEY) {
				if (this.value && this.value.length > 0) {
					v_this.item = v_this.item === v_this.findItemsLenght? 0 : v_this.item + 1;
					v_this.selectItem(v_this.item);
				};
			} else {
				v_this.checkObject(this.value);
				if (this.value.length > 0) {
					changeClass.removeClass(clear,'hide');
				} else {
					changeClass.addClass(clear, 'hide');
				}
			}
		});	

		bind(clear, 'click', function() {
			clearValue();
		});

		bind(focusSearchInput, 'click', function(){
			searchInput.focus();
		});

		bind(v_this.findResult, 'mouseover', function(event) {
	    	var target = event.target;
	    	while (target !== this) {
	    		if (target.nodeName === 'LI') {
	    			v_this.item = target.id;	
	    			v_this.selectItem(v_this.item); 
	    			return false;
	    		}
	    		target = target.parentNode;
	    	}
	    });

	    bind(v_this.findResult,'mouseleave', function() {
	    	changeClass.addClass(this, 'hide');
	    });

	    bind(v_this.findResult, 'click', function(event) {
	    	var target = event.target;
	    	while (target !== this) {
	    		if (target.nodeName === 'LI') {
					var date = target.querySelector('.date').innerHTML.split('-');
					clearValue();
					mediator.publish('createCalendar', new Date(date));
					return false;
	    		}
	    		target = target.parentNode;
	    	}
	    });
	};

	SearchEvent.prototype.checkObject = function(text) {
		this.items = [];
		if (text && text.length > 0) {
			this.rightItem = this.searchRightItem(text, database.getAllItem());
			if (this.rightItem.length > 0) {
				this.findItemsLenght = this.rightItem.length - 1;
				this.showResult();	
			} else {
				this.findItemsLenght = 0;
				this.hideResult();
			}
		} else {
			this.findItemsLenght = 0;
			this.hideResult();
		}
	};

	SearchEvent.prototype.searchRightItem = function(text, items) {
		var rightItems = [];
		var regexp = new RegExp(text, 'ig');
		items.forEach(function(item) {
			for (var i in item) {
				if (item.hasOwnProperty(i)) {
					var array = regexp.exec(item[i]);
					if (array && array.length > 0) {
						rightItems.push(item);
						break;
					}
				}
			}
		});
		return rightItems; 
	}	

	SearchEvent.prototype.selectItem = function(item) {
    	if (this.currentItem !== this.item) {
    		changeClass.removeClass(this.items[this.currentItem], 'selectedItem');
        	changeClass.addClass(this.items[this.item], 'selectedItem');
    	}
    	this.currentItem = this.item;		
	};

	SearchEvent.prototype.showResult = function(obj) {
		var v_this = this;
		var i = 0;
		var fragment = document.createDocumentFragment();
		this.rightItem.forEach(function(obj) {
			var li = document.createElement('li');
			li.id = i;
			i += 1;
			li.innerHTML = templater(v_this.itemPattern, obj);
			v_this.items.push(li);
			fragment.appendChild(li);
		});
		this.findResult.innerHTML = '';
		this.findResult.appendChild(fragment);
		changeClass.removeClass(this.findResult, 'hide');
	};


	SearchEvent.prototype.hideResult = function() {
		changeClass.addClass(this.findResult, 'hide');
		this.findResult.innerHTML = '';
	};

window.SearchEvent = SearchEvent;

})(window.database, window.app.mediator, window.app.bind, window.changeClass, window.addElem);