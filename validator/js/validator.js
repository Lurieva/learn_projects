;(function(){
 
   'use strict'  

	var validator = (function(fieldOfForm, send) {
      var errorArray = [];

		   function isSpace(value) {
   			return /\s/.test(value);
   		}

         function isFirstBigLetter(value) {
   			return /^[A-ZА-Я][a-zа-я]/.test(value);
   		}

   		function isUsername(value) {
   			return /[a-z0-9_-]{3,15}/.test(value);
   		}

   		function isNumber(value) {
   			return /[0-9]/.test(value);
   		}

   		function isCorrectEmail(value) {
   			return /([a-zA-Z0-9-_]+@[a-zA-Z-_]+?\.[a-zA-Z]{2,4})/.test(value);
   		}

   		function isCorrectPassword(value) {
   			return /((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\-\_\~\!\@\#\$\%\^\&\*\(\)\+\=\{\}\[\]\\\|\:\;\"\'\<\>\,\.\?\/])){6,15}/.test(value);
   		}
   		
   		function isEmpty(value) {
   			return /^$/.test(value);
   		}

         
   	function checkFirstName(field) {
   		var value = field.value;
    		if (value.length < 4) {
   			showError(field,"Имя должно содержать от 4 символов");
            return false;
         }
   		if (isSpace(value)) {
   			showError(field,"В имени не должно быть пробелов");
            return false;
         }
   		if (isNumber(value)) {
   			showError(field,"Имя не должно содержать цифры");
            return false;
         }
   		if (!isFirstBigLetter(value)) {
   			showError(field,"Имя должно начинаться с большой буквы");
            return false;
         }
         return true;
     	}

   	function checkLastName(field) {
   		var value = field.value;
         if (value.length < 4) {
            showError(field,"Фамилия должна содержать от 4 символов");
            return false;
         }
   		if (isNumber(value)) {
   			showError(field,"Фамилия не должна содержать цифры");
            return false;
   		}
   		if (isSpace(value)) {
   			showError(field,"Фамилия не может содержать пробелы");
            return false;
   		}
         if (!isFirstBigLetter(value)) {
            showError(field,"Фамилия должна начинаться с большой буквы");
            return false;
         }
   		return true;
   	}

   	function checkEmail(field) {
   		var value = field.value;
         if (isEmpty(value)) {
            showError(field,"Поле не должно быть пустым");
            return false;
         }
        	if (isSpace(value)) {
   			showError(field,"Пароль не может содержать пробелы");
            return false;
   		}
   		if (!isCorrectEmail(value)) {
   			showError(field,"Недопустимый адрес почты");
            return false;
   		}
   		return true;
   	}

      function checkUserName(field) {
   		var value = field.value;
      	if (value.length < 6) {
   			showError(field,"Недопустимая длина имени пользователя");
            return false;
   		}   	
   		if (isSpace(value)) {
   			showError(field,"Пароль не может содержать пробелы");
            return false;
   		}
   		if (!isUsername(value)) {
   			showError(field,"Недопустимое имя пользователя");
            return false;
   		}
   		return true;
   	}

   	function checkPassword(field) {
   		var value = field.value;
         if (isEmpty(value)) {
            showError(field,"Поле не должно быть пустым");
            return false;
         }
   		if (value.length < 6 && value.length > 15) {
   			showError(field,"Недопустимая длина пароля. Пароль должен содержать от 6 до 15 символов");
            return false;
   		}   		
   		if (isSpace(value)) {
   			showError(field,"Пароль не может содержать пробелы");
            return false;
   		}
   		if (!isCorrectPassword(value)) {
   			showError(field,"Пароль должен содержать один из символов(a-zA-Z0-9) и хотя бы один спецсимвол");
            return false;
     		}
   		return true;
   	}

   	function checkRepeatPassword(fieldRepeatPassword, fieldPassword) {
         if (isEmpty(fieldRepeatPassword.value)) {
            showError(fieldRepeatPassword,"Поле не должно быть пустым");
            return false;
         }
   		if (fieldPassword.value !== fieldRepeatPassword.value) {  
   			showError(fieldRepeatPassword,"Пароли не совпадают!");
            return false;
   		}
   		return true;
   	}

      function insertAfter(elem, refElem) {
         return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
      }


   	function showError(parent, message) {
         var messageField = document.createElement('span');
         messageField.className = 'show-error';
         messageField.innerHTML = message;
         insertAfter(messageField, parent);
         errorArray.push(messageField);
      }
   	      

      function clearForm() {
         for (var i = 0; i < errorArray.length; i += 1) {
            errorArray[i].className = 'invisible';
         }
      }


      function initForm(fieldOfForm, send) {
         var validate = [];
         function initObj(name) {
            var obj = {
               'firstName': function() {checkFirstName(fieldOfForm[0])},
               'lastName': function() {checkLastName(fieldOfForm[1])},
               'email': function() {checkEmail(fieldOfForm[2])},
               'userName': function() {checkUserName(fieldOfForm[3])},
               'password': function() {checkPassword(fieldOfForm[4])},
               'repeatPassword': function() {checkRepeatPassword(fieldOfForm[5], fieldOfForm[4])}
            };
            return obj[name]();
         };
         send.onclick = function(event) {
            debugger
            event = event || window.event
            if (event.preventDefault) {  
               event.preventDefault();
            } else {
               event.returnValue = false;
            }
            clearForm()
            for (var i = 0; i < fieldOfForm.length; i += 1) {
               console.log(initObj(fieldOfForm[i].name) == true);
            }
            
        }
     }


   return {
      init:initForm
   }

})();


	window.onload = function () {
      var send = document.querySelector("input[type='submit']");
		var fieldOfForm = document.querySelectorAll("fieldset input");
      validator.init(fieldOfForm, send); 
   }

})();