'use strict';

function PreviewView (parentNode, person, previewForm) {
    var previewForm,
        previewHTML;

    this.init = function () {
        renderPreviewForm();
        addEvents();
    };

    function renderPreviewForm () {      
        parentNode.innerHTML = previewForm;
        parentNode.innerHTML = helper.templater(previewForm, {
            name: person.name || '', 
            lastName: person.lastName || '',
            age: person.age || '',
            gender: person.gender || '',
            skype: person.skype || ''
        });
    }

    function addEvents () {
        var editBtn = document.querySelector('#edit');

        helper.on('click', editBtn, function () {
            mediator.publish('edit', person);
        });
    }
    
    return this;  
}