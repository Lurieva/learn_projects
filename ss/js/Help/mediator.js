'use strict';

var mediator = (function () {
    var events = {};

    function subscribe (eventName, handler) {
        if (!events[eventName]) {
            events[eventName] = [];
        }
        events[eventName].push(handler);
    }

    function publish (eventName, data) {
        var handlers = events[eventName];
        if (handlers && handlers.length !== 0) {
            handlers.forEach(function (handler) {
                handler.call(undefined, data);
            });
        }
    }

    function unsubscribe (eventName, handler) {
        if (arguments.length === 1) {
            delete events[eventName];
        } else if (events[eventName]) {
            events[eventName] = events[eventName].filter(function (_handler) {
                return _handler !== handler;
            });
        }
    }

    return {
        subscribe: subscribe,
        publish: publish,
        unsubscribe: unsubscribe
    }
})();