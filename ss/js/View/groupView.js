'use strict';

var GroupView = Backbone.View.extend({

    initialize: function () {
        var self = this,
            list = new Group();
 
        list.fetch({
            success: function () {
                self.render(list.toJSON());
            }
        });
    },

    render: function (list) {
        var listGroup,
            table;

        table = $('<table></table>');
        this.$el.append(table); 
        table.append(tableHeaderTpl);
        
        listGroup = new Group();
        list.forEach(function (item) {
            listGroup.add(new Person(item))
        });

        listGroup.forEach(function (item) {
            table.append(this.renderOne(item))
        }, this);
    },

    renderOne: function (person) {
        var personView = new PersonView({model: person});
        return personView.render().el;
    }
});