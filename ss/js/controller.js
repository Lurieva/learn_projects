'use strict';

function Controller () {
	var groupView,
        editView,
        previewView;

    groupView = new GroupView({
        el: $('#tableContainer')
    });

    mediatorInit();

    function mediatorInit() {
        mediator.subscribe('Module PersonView: edit', renderEditView);
        mediator.subscribe('Module EditView: preview', renderPreviewView);
        mediator.subscribe('Module EditView: save', changeGroupView);
    }

    function renderEditView (person) {
        editView = new EditView({
            el: $('#editForm'),
            model: person
        });
        editView.render();
    }

    function renderPreviewView (person) {
        previewView = new PreviewView({
            el: $('#previewForm'),
            model: person
        });
    }

    function changeGroupView (person) {
        return person;
    }
 
    return this;
}