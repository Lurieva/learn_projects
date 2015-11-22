'use strict';

var Group = Backbone.Collection.extend({
    model: Person,

    url: '/students'
});