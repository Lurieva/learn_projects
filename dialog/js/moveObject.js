;(function(){

    'use strict'


    var addEvent = function(elem, type, handler) {
        if (!elem) return;
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false); 
        } else {
            elem.attachEvent("on" + type, handler)
        }
    };


    var moveObject = (function() {

        function move(obj) {
            if (!obj) return;
            var objectMoving = obj;

            addEvent(objectMoving,'mousedown', function(e) {
                var coords = getCoords(objectMoving);
                var shiftX = e.pageX - coords.left;
                var shiftY = e.pageY - coords.top;
                objectMoving.style.position = 'absolute';
                document.body.appendChild(objectMoving);
                moveAt(e);
                objectMoving.style.zIndex = 1000; 

                function getCoords(elem) { 
                    var obj = elem.getBoundingClientRect();
                    return {
                        top: obj.top + pageYOffset,
                        left: obj.left + pageXOffset
                    };
                };

                function moveAt(e) {
                    objectMoving.style.left = e.pageX - shiftX + 'px';
                    objectMoving.style.top = e.pageY - shiftY + 'px';
                };

                document.onmousemove = function(e) {
                    moveAt(e);
                };

                addEvent(objectMoving, 'mouseup', function() {
                    document.onmousemove = null;
                    objectMoving.onmouseup = null;
                });

            });

            objectMoving.ondragstart = function() {
                return false;
            };

        }

        return {
            move: move
        };

    })();

    window.moveObject = moveObject;

})();