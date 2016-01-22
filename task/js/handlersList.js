'use strict';

var handlersList = {
	'btn-1': toLowerCaseStr,
	'btn-2': toUpperCaseStr, 
	'btn-3': capitalizeAllWords,
	'btn-4': capitalizeFirstLetter,
	'btn-5': addPlusWord,
	'btn-6': deletePlus,
	'btn-7': addQuotes,
	'btn-8': addBrackets,
	'btn-9': addHyphenBeginStr,
	'btn-10': addHyphenQuotes,
	'btn-11': addHyphenBrackets,
	'btn-12': deleteSpaces,
	'btn-13': deleteTabs,
	'btn-14': deleteAfterSpacesAndHyphen,
	'btn-15': replaceSpacesForUnderscore,
	'btn-16': deleteSpecialCharacters,
	'btn-17': replaceSpecialCharactersForSpaces,
	'btn-18': sortAscending,
	'btn-19': sortDescending,
	'btn-20': deleteDublicateString
}

function toLowerCaseStr (input) {
		return input.toLowerCase();
	}

	function toUpperCaseStr (input) {
		return input.toUpperCase();
	}

	function capitalizeAllWords (input) {
		return input.replace(/(^|\s)(.)/gi, function (match) {
    		return match.toUpperCase();
  		});
	}

	function capitalizeFirstLetter (input) {
		return input.replace(/^./gm, function (match) {
    		return match.toUpperCase();
  		});
	}

	function addPlusWord (input) {
		return input.replace(/([^\s]+)/gm, '+$1');
	}

	function deletePlus (input) {
		return input.replace(/\+/gm, '');
	}

	function addQuotes (input) {
		return input.replace(/^(.*?)$/gm, '\"$&\"');
	}

	function addBrackets (input) {
		return input.replace(/^(.*?)$/gm, '\[$&\]');
	}

	function addHyphenQuotes (input) {
		return input.replace(/^(.*?)$/gm, '-\"$&\"');
	}

	function addHyphenBrackets (input) {
		return input.replace(/^(.*?)$/gm, '-\[$&\]');
	}

	function addHyphenBeginStr (input) {
		return input.replace(/^(.*?)$/gm, '-$&');
	}

	function deleteSpaces (input) {
		return input.replace(/\s+[^\S\n]/g, ' ');
	}

	function deleteTabs (input) {
		return input.replace(/\t+/g, '');
	}

	function replaceSpacesForUnderscore (input) {
		return input.replace(/[\s]/g, '_');
	}

	function replaceSpecialCharactersForSpaces (input) {
		return input.replace(/[\$\@\%\\\/\(\)\#\`\~\<\>\{\}\[\]\|\_\=\'\:\"\,\+\;\^\?\!\&\*]/g, ' ');
	}

	function deleteSpecialCharacters (input) {
		return input.replace(/[\$\@\%\\\/\(\)\#\`\~\<\>\{\}\[\]\|\_\=\'\:\"\,\+\;\^\?\!\&\*]/g, '');
	}

	function deleteAfterSpacesAndHyphen (input) {
		return input.split(' -')[0];
	}

	function sort (a, b) {
		return a - b;
	}

	function sortAscending (input) {
		return input.split(/\r?\n+/).sort().join('\r\n');
	}

	function sortDescending (input) {
		var inputSort = input.split(/\r?\n+/).sort();
		return inputSort.reverse().join('\r\n');
	}

	function deleteDublicateString (input) {
		var inputField,
			uniqueString,
			obj = {};

		inputField = input.split(/\r?\n+/);
		inputField.forEach(function (item) {
			uniqueString = item;
			obj[uniqueString] = true;
		});
		return Object.keys(obj).join('\r\n');
	}

	function replaceWord (input, search, replace) {
		var search = document.getElementById('searchWord').value,
			replace = document.getElementById('replaceWord').value,
			regExp = new RegExp(search,'gm');
		return input.replace(regExp, replace);
	}