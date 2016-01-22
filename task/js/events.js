'use strict';

function addEvents () {
	var input = document.getElementById('field'),
		inputField, result,
		search, replace, changeInputValue;

	var undostore = new Store(null);
	
	addEventsStr(handlersList);


	document.getElementById('clear').addEventListener('click', clearInputField, false);
	document.getElementById('copy').addEventListener('click', copyToClipboard, false);
	document.getElementById('undo').addEventListener('click', function () {
		undostore.undo();
	}, false);
	document.getElementById('redo').addEventListener('click', function () {
		undostore.redo();
	}, false);
	document.getElementById('replace').addEventListener('click', function () {
		search = document.getElementById('searchWord').value;
		replace = document.getElementById('replaceWord').value;
		inputField = document.getElementById('field').value;

		input.value = replaceWord(inputField, search, replace);
		addActionStore();
	}, false);

	function addEventsStr (handlers) {
		for (var key in handlers) {
			(function (id) {
				document.getElementById(id).addEventListener('click', function () {
					inputField = document.getElementById('field').value;
					input.value = handlers[id](inputField);
					addActionStore();
				}, false);
			})(key);
		}
	}


	function addActionStore() {
		changeInputValue = document.getElementById('field').value;
		pushAction(function (redo, data) {
			input.value = redo ? data[1]: data[0]
		}, [inputField, changeInputValue]);
	}

	function pushAction (perform, data) {
    	var return_value;
    	return_value = perform.call(this, true, data);
    	undostore.push(perform, data);
    	return return_value;
	};

	function clearInputField () {
		input.value = '';
	}

	function copyToClipboard () {
		var range, successful, message;

		input = document.getElementById('field');  
  		range = document.createRange();  
  		range.selectNode(input);  
  		window.getSelection().addRange(range);  
    
  		try {  
    		successful = document.execCommand('copy');  
    		message = successful ? 'successful' : 'unsuccessful';  
    		console.log('Copy text was ' + message);  
  		} catch (err) {  
    		console.log('Unable to copy');  
  		}  
    
  		window.getSelection().removeAllRanges();
	}
}