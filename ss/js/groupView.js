'use strict';

function GroupView (parentNode, headerTpl, strTpl) {
    var table,
        listGroup,
        person;

    this.init = function () {
        ajax.load('/students', '', '', renderGroupView);
    };

    function renderGroupView (listGroup) {
        if (!listGroup) {
            listGroup = database.getItem('group');        
        }
        
        listGroup = JSON.parse(listGroup);
        table = document.createElement('table'); 
        parentNode.appendChild(table);  
        table.innerHTML = headerTpl;
        helper.each(listGroup, function (item, i) {
            person = new PersonView(item, strTpl);
            table.innerHTML += person.personRender();
        });
        addEvents(listGroup);
    }

    function addEvents (listGroup) {
        var inputBtn = document.querySelectorAll('.input');
        helper.each(inputBtn, function (item, i) {
            helper.on('click', item, function () {
                mediator.publish('edit', listGroup[i]);
            });
        });
    }

   return this;
}