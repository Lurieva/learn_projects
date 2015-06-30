;(function(){

    'use strict'

    function fixEvent(event) {
        event = event || window.event;
        if (event.pageX == null && event.clientX != null) {
            var html = document.documentElement;
            var body = document.body;
            event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
            event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
        }
        if (!event.which && event.button) {
            event.which = event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0));
        }
        return event;
    }


    var dragMaster = (function() {
        var dragObject;
        var mouseOffset;
  
        function getMouseOffset(target, e) {
            var docPos = getPosition(target);
            return {
                x : e.pageX - docPos.x, 
                y : e.pageY - docPos.y
            }
        }

        function mouseUp(){
            dragObject = null;
            document.onmousemove = null;
            document.onmouseup = null;
            document.ondragstart = null;
            document.body.onselectstart = null;
        }

        function mouseMove(e){
            e = fixEvent(e);
            dragObject.style.position = 'absolute';
            dragObject.style.top = e.pageY - mouseOffset.y + 'px';
            dragObject.style.left = e.pageX - mouseOffset.x + 'px';
            return false;
        }

        function mouseDown(e) {
            e = fixEvent(e);
            if (e.which != 1) return;
            dragObject = this;
            mouseOffset = getMouseOffset(this, e);
            document.onmousemove = mouseMove;
            document.onmouseup = mouseUp;
            document.ondragstart = function() { 
                return false; 
            }
            document.body.onselectstart = function() {
                return false;
            }
            return false;
        }

        return {
            makeDraggable: function(element){
                element.onmousedown = mouseDown;
            }
        }
    }())

    function getPosition(e){
        var left = 0;
        var top  = 0;
        while (e.offsetParent){
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent;
        }
        left += e.offsetLeft;
        top  += e.offsetTop;

        return {
            x:left,
            y:top
        }
    }

    window.dragMaster = dragMaster;

})();