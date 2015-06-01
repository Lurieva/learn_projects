;(function(){

	"use strict";
	
	Element.prototype.addElem = function(nodeName) {
		if (!nodeName) return;
		var node = document.createElement(nodeName);
		setAttributeOfElement(node, typeof arguments[1] == 'string' ? { innerHTML: arguments[1] } : arguments[1] || {});
		this.appendChild(node);
		return node;
	};

	function setAttributeOfElement(node, attributes) {
		if (attributes) {	
			for (var i in attributes) {
				if (i == 'style') { 
					extendObj(node[i], attributes[i]);
				} else {
					if (i == 'innerText') {
						('innerText' in node) ? node[i] = attributes[i] : node.textContent = attributes[i];
					} else {
						node[i] = attributes[i];
					}
				}
			}
		}
		return node;
	};

	function extendObj(element, attribute) {
		if (!element) {
			element = {};
		}
		for (var i in attribute) {
			element[i] = attribute[i];
		}
		return element;
	};

	
	var changeClass = (function() {

		function addClass(el, cls) {
			if (!el) return;
			var c = el.className.split(' ');
			if (c.indexOf(cls) !== -1) { 
				return
			}
			/*for (var i = 0; i < c.length; i += 1) {
				if (c[i] == cls) {
					return;
				}
			}*/
			c.push(cls);
			el.className = c.join(' ');
		}

		function removeClass(el, cls) {
			if (!el) return;
			var c = el.className.split(' ');
			if (c.indexOf(cls) !== -1) { 
				c.splice(c.length--, 1);
			}
			/*for (var i = 0; i < c.length; i += 1) {
				if (c[i] == cls) {
					c.splice(i--, 1);
				}
			}*/
			el.className = c.join(' ');
		}

		function hasClass(el, cls) {
			if (!el) return;
			var c = el.className.split(' ');
			if (c.indexOf(cls) !== -1) {
				return true;
			}
			for (c = el.className.split(' '), i = c.length - 1; i >= 0; i--) {
				if (c[i] == cls) return true;
			}
			return false;
		}

		function toggleClass(el, cls) {
			if (hasClass(el, cls)) {
					removeClass(el, cls);
				} else {
					addClass(el, cls);
				}
			return false;
		}

		return {
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass
		}
	
	})();

	window.changeClass = changeClass;
})();
