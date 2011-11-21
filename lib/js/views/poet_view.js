
  define(['templates/templates'], function(Templates) {
    var PoetView;
    return PoetView = Backbone.View.extend({
      tagName: 'li',
      events: {
        'click span.poet-remove': 'del',
        'click span.up': 'updateOrder',
        'click span.down': 'updateOrder',
        'dblclick span.poet': 'edit',
        'keypress input.poet-edit': 'updatePoet',
        'blur input.poet-edit': 'cancelUpdate'
      },
      initialize: function() {
        _.bindAll(this, 'render', 'unrender', 'del', 'updateOrder', 'edit', 'updatePoet', 'cancelUpdate');
        this.model.bind('destroy', this.unrender, this);
        this.model.bind('change', this.render, this);
      },
      unrender: function() {
        return $(this.el).remove();
      },
      del: function() {
        return this.model.destroy();
      },
      render: function() {
        $(this.el).html(Templates.poet({
          order: this.model.get('order'),
          firstname: this.model.escape('firstname'),
          lastname: this.model.escape('lastname')
        }));
        this.input = this.$('.poet-edit');
        return this;
      },
      edit: function() {
        $(this.el).addClass('editing');
        return this.input.focus();
      },
      updateOrder: function(e) {
        var classname, currentorder, dir, othermodel;
        classname = e.target.className;
        dir = /down/.test(classname) ? 1 : -1;
        currentorder = this.model.get('order');
        othermodel = this.model.collection.at(currentorder + dir);
        if (othermodel) {
          othermodel.set({
            order: currentorder
          });
          othermodel.save();
        }
        this.model.set({
          order: this.model.get('order') + dir
        });
        return this.model.save();
      },
      updatePoet: function(e) {
        var poet, text;
        text = this.input.val();
        if (!text || e.keyCode !== 13) return;
        text = text.split(' ');
        poet = {
          firstname: text.shift() || '',
          lastname: text.join(' ') || ''
        };
        this.model.set(poet);
        this.model.save();
        $(this.el).removeClass('editing');
      },
      cancelUpdate: function() {
        this.$('input').val(this.model.escape('firstname') + ' ' + this.model.escape('lastname'));
        return $(this.el).removeClass('editing');
      }
    });
  });
