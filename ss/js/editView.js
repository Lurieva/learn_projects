'use strict';

function EditView (parentNode, person, editForm) {

    this.init = function () {
        renderEditForm();
        addEvents();
    };

    function renderEditForm () {
        var inputArray;
        
        parentNode.innerHTML = editForm;     
        inputArray = document.querySelectorAll('input');  
        helper.each(inputArray, function (item) {
            item.value = person[item.name] || '';
        });
    }

    function addEvents () {
        var attributesPerson = {},
            saveBtn = parentNode.querySelector('#save'),
            previewBtn = parentNode.querySelector('#preview');

        helper.on('click', previewBtn, function () {
            helper.each(document.querySelectorAll('input'), function(item) {
                attributesPerson[item.name] = item.value;
            })
            mediator.publish('preview', attributesPerson);
        });
        helper.on('click', saveBtn, function () {  
            mediator.publish('save', attributesPerson);
        });
	}
    
    return this;
}