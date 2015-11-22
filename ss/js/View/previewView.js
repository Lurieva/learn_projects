'use strict';

var PreviewView = Backbone.View.extend({
    events: {
        'click #edit': 'hide'
    },

    template: _.template(previewTpl),

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.removeClass('invisible');
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    hide: function () {
        this.$el.addClass('invisible');
        $('#editForm').removeClass('invisible');
    }
});