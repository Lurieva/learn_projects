;(function(){
 
   'use strict'  

	function DropDown(array, parent) {
		this.array = array;
		this.arraySingle = [];
		this.parent = parent;
		this.currentIndex = 0;
		this.step = 0;
		this.opened = false;
	};

	DropDown.prototype.init = function () {
		this.createElementOfForm();
		this.buildList();
		this.addEvents();
	};

	DropDown.prototype.createElementOfForm = function () {
		
		function create (name, attributes) {
    		var el = document.createElement(name);
      		for (var i in attributes) {
      			el.setAttribute(i, attributes[i]);
  			}
    		return el;
  		};

  		var div = create('div', {class: "center"});
			this.parent.appendChild(div);
			div.innerHTML = "Список областных центров Украины";
		this.divBox = create('div', {class: "box"});
			this.divBox.focus();
			this.parent.appendChild(this.divBox);
		this.spanCity = create('span', {class: "city"});
			this.divBox.appendChild(this.spanCity);
			this.spanCity.innerHTML = "Город";
		this.spanOpen = create('span', {class: "open"});	
			this.divBox.appendChild(this.spanOpen);
		this.divList = create('div', {class: "list"});
			this.divBox.appendChild(this.divList);
	};


	var bind = (function(){
		function bind(obj, eventName, handler) {
			var handlerWraper = function(event) {
				event = event || window.event;
				if (!event.target && event.srcElement) {
					event.target || event.srcElement;
				}
				return handler.call(obj,event);
			};
			if (obj.addEventListener) {
				obj.addEventListener(eventName, handlerWraper, false);
			} else if (obj.attachEvent) {
				obj.attachEvent('on'+eventName, handlerWraper);
			}
			return handlerWraper;
		}
		return bind;
	})();
	

	DropDown.prototype.addEvents = function () {
		var v_this = this;

		bind(document.documentElement, 'click', function(event) {
			if (this.opened) {
				v_this.close();
       		} else return;
        });
	

        bind(document.documentElement, 'keydown', function (event) { 
        	var SPACE_KEY = 32;					
			var PAGE_UP_KEY = 38;				
			var PAGE_DOWN_KEY = 40;				
			var PAGE_LEFT_KEY = 37;				
			var PAGE_RIGHT_KEY = 39;			
			var ESC_KEY = 27;					
			var ALT_KEY = 18;					
			var ENTER_KEY = 13;		
				if (event.keyCode ==  SPACE_KEY) {
					v_this.setClass();
				}
				else if (event.keyCode == ENTER_KEY || (event.altKey&&event.keyCode) == PAGE_DOWN_KEY) {
					v_this.open();
				}
				else if (event.keyCode == ESC_KEY || (event.altKey&&event.keyCode) == PAGE_UP_KEY) {
					v_this.close();
				}
				else if (event.keyCode == PAGE_UP_KEY || event.keyCode == PAGE_RIGHT_KEY) {
					v_this.step = 1;
					v_this.change();
				}
				else if (event.keyCode == PAGE_LEFT_KEY || event.keyCode == PAGE_DOWN_KEY) {
					v_this.step = -1;
					v_this.change();
				}
		});


		bind(this.divList, 'mouseover', function (event) {
			var target = event.target || event.srcElement;
			while (target != this) {
        		if (target.tagName == 'DIV') {
        			v_this.makeSelectSingle(v_this.arraySingle,target);
        			return false;
        		}
        		target = target.parentNode;
	    	}
		});
	
	
		bind(this.spanOpen, 'click', function () {v_this.setClass()});


		bind(this.divList, 'mousedown', function (event) {
			var target = event.target || event.srcElement;
			while (target != this) {
        		if (target.tagName == 'DIV') {
        			v_this.spanCity.innerHTML = target.innerHTML;
        			v_this.makeSelectSingle(v_this.arraySingle,target);
        			v_this.close();
        			return false;
        		}
        		target = target.parentNode;
	    	}
		});

	};


	DropDown.prototype.change = function () {
		this.currentIndex += 1;
    	this.spanCity.innerHTML = this.array[this.currentIndex];
        this.makeSelectSingle(this.arraySingle, this.divList.children[this.currentIndex]);
    };


	DropDown.prototype.setClass = function () {
		if (this.divList.classList.contains('menu-open')) {
			this.close()
		} else {
			this.open();
		}
	};

	DropDown.prototype.open = function() {
		if (this.opened) return;
		this.divList.classList.add('menu-open');
		this.opened = true;
	};

	DropDown.prototype.close = function () {
		if (!this.opened) return;
		this.divList.classList.remove('menu-open');
		this.opened = false;
	}

	DropDown.prototype.makeSelectSingle = function(arraySingle, elem) {
		this.arraySingle.push(elem);
		for (var i = 0; i < this.arraySingle.length; i += 1) {
			this.arraySingle[i].className = '';
		}
		elem.className = 'selected';
	};

	DropDown.prototype.buildList = function () {
		this.divList.innerHTML = '';
   		var node = this.divList;
    	var v_str = "";
    	for (var i = 0; i < this.array.length; i += 1) {
      		v_str = v_str + "<div>" + this.array[i] + "</div>";
    	}
    	if (!node) return;                             
    	node.innerHTML = v_str;
	};



	window.onload = function () {
		var arrayCities = ['Днепропетровск', 'Киев', 'Донецк', 'Луганск', 'Запорожье', 'Николаев', 'Одесса', 'Херсон', 'Винница', 'Харьков', 'Кировогорад', 
							'Черкассы', 'Чернигов', 'Сумы', 'Ровно', 'Львов', 'Ивано-Франковск', 'Хмельницкий', 'Житомир', 'Ужгород', 'Полтава', 'Черновцы', 'Тернополь'];
		arrayCities = arrayCities.sort();			
		var first = document.getElementById('first');
    	var dropDownFirst = new DropDown(arrayCities, first);
    		dropDownFirst.init();
	}
	
})();



			