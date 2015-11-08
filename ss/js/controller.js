'use strict';

function Controller (nodeGroup, nodeEdit, nodePreview) {
	var list,
        group,
        groupForm,
        editForm,
        previewForm;

    list = new Group();
    list.setGroup();
    if (database.isLocalStorageAvailable) {
        database.setItem('group', list.getGroup());
       //database.clearStorage();
    }


    groupForm = new GroupView(nodeGroup, tableHeaderTpl, tableStringTpl);
    groupForm.init();

    mediator.subscribe('edit', function (person) {
        editForm = new EditView(nodeEdit, person, editTpl);
        editForm.init();
        nodeEdit.classList.remove('invisible');
        nodePreview.classList.add('invisible');
    });

    mediator.subscribe('preview', function (person) {
        previewForm = new PreviewView(nodePreview, person, previewTpl);
        previewForm.init();
        nodeEdit.classList.add('invisible');
        nodePreview.classList.remove('invisible');
    });

    mediator.subscribe('save', function () {
        nodeEdit.classList.add('invisible');
        //nodeEdit.classList.add('invisible');
    });

    return this;
}