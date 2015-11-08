'use strict';

function PersonView (person, strTpl) {
    var trPerson;

    this.personRender = function () {
        trPerson = helper.templater(strTpl, {
            name: person.name, 
            lastName: person.lastName,
            age: person.age,
            gender: person.gender,
            skype: person.skype
        });
        return trPerson;
    };

    return this;
}