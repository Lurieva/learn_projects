'use strict';

window.addEventListener('load', main, false);

function main () {
    var parentNodeGroup = document.querySelector('#tableContainer'),
        parentNodeEdit = document.querySelector('#editForm'),
        parentNodePreview = document.querySelector('#previewForm'),
        controller;

    controller = new Controller(parentNodeGroup, parentNodeEdit, parentNodePreview);
}

