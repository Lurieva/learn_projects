'use strict';

var PersonView = Backbone.View.extend({
    tagName: 'tr',

    events: {
        'click td.button': 'renderEditView'
    },

    template: _.template(tableStringTpl),

    initialize: function () {
        this.model.on('change', this.render, this);
    },

    renderEditView: function () {
        mediator.publish('Module PersonView: edit', this.model);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});