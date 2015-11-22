'use strict';

var EditView = Backbone.View.extend({    events: {
        'click #preview': 'renderPreviewView',
        'click #save': 'savePersonChange'
    },

    template: _.template(editTpl),

    render: function () {
        this.$el.removeClass('invisible');
        this.$el.html(this.template(this.model.toJSON()));
    },

    renderPreviewView: function () {
        this.$el.addClass('invisible');
        this.model = this.setAttributesPerson();
        mediator.publish('Module EditView: preview', this.model);
    },

    savePersonChange: function () {
        this.$el.addClass('invisible'); 
        this.model = this.setAttributesPerson();
        mediator.publish('Module EditView: save', this.model);
        this.model.off();
    },

    setAttributesPerson: function () {
        var value, data,
            self = this;    
    
        $('input').each(function (key, item) {
            value = item.value;
            data = {};
            data[item.name] = value;
            self.model.set(data);
        });

        return this.model;
    }
});