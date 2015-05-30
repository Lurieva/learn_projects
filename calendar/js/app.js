;(function(){
	
	'use strict';

	function App(setting) {
		this.modules = setting.modules || [];
		this.mediator = (function() {
			var events = {}
			return {
				subscribe: function(eventName, handler) {
					if(!events[eventName]) {
						events[eventName] = [];
					}
					events[eventName].push(handler);
				},

				unsubscribe: function(eventName, handler) {
					if(arguments.length == 1) {
						delete events[eventName];
					} else {
						if(events[eventName] ){
							events[eventName] = events[eventName].filter(function(_handler) {
								return _handler !== handler;
							});
						}
					}
				},

				publish: function(eventName, data) {
					var handlers = events[eventName];
					if(handlers && handlers.length !== 0) {
						handlers.forEach(function(handler) {
							handler.call(undefined, data);
						});
					}
				}
			}

		})();


	this.handlerForThisEvent = {};
	var v_this =  this;

		this.bind = (function(){
			function bind(obj, eventName ,handler) {
				var handlerWraper = function(event) {
					var event = event || window.event;
					var target =  event.target || event.srcElement;
					return handler.call(obj, event);
				}
				if (obj.addEventListener) {
					obj.addEventListener(eventName, handlerWraper, false);
				} else if (obj.detachEvent){
					obj.detachEvent('on' + eventName, handlerWraper);
				}
				if (!v_this.handlerForThisEvent[eventName]) {
					v_this.handlerForThisEvent[eventName] = [];
				}
				v_this.handlerForThisEvent[eventName].push({obj: obj, handler: handlerWraper});
				return handlerWraper;
			}

			return bind;
		})();

		this.unbind = (function(){
			function unbind(obj, eventName) {
				var eventsHandlers = v_this.handlerForThisEvent[eventName];
				var handler;
				if (eventsHandlers) {
					eventsHandlers.forEach(function(eventHandlers) {
						if (eventHandlers.obj === obj) {
							handler = eventHandlers.handler;
						}
					});
				}
				if (handler) {
					if (obj.removeListener) {
						obj.removeListener(eventName, handler, false);
					} else if (obj.detachEvent) {
						obj.detachEvent('on' + eventName, handler);
					}
				}

			}
			return unbind;
		})();
	}


	App.prototype.init = function() {
		this.initModules();
	};

	App.prototype.initModules = function() {
		new Calendar('.calendar', '.content');
		new NavigationForDayEvent('body', '.calendar');
		new ShowEvent('.calendar');
		new SearchEvent('.header');
	};

	App.prototype.loadModules = function() {
		this.modules.forEach(function(module) {
			document.write('<script src="js/' + module.toLowerCase() + '.js"></script>')
		});
	};

	window.app = new App({
		modules: ['htmlhelper', 'calendar', 'moveobject', 'dayevent', 'database', 'navigationfordayevent', 'searchevent', 'showevent']
	});


	window.app.loadModules();
	window.onload = function() {
		window.app.init();
	}

})();