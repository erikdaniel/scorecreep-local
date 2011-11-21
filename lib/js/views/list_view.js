
  define(['views/poet_view'], function(PoetView) {
    return Backbone.View.extend({
      id: 'poet-list',
      tagName: 'ul',
      initialize: function() {
        _.bindAll(this, 'render', 'appendItem', 'changeOrder', 'addAll');
        this.plist = this.options.plist;
        this.plist.bind('add', this.appendItem, this);
        this.plist.bind('change:order', this.changeOrder, this);
        this.plist.bind('reset', this.addAll, this);
      },
      render: function() {
        return this;
      },
      changeOrder: function(e, target, cont) {
        this.plist.sort();
        $('#poet-list').html('');
        return this.addAll();
      },
      addAll: function() {
        this.plist.each(this.appendItem);
      },
      appendItem: function(poet) {
        var poetView;
        poetView = new PoetView({
          model: poet
        });
        $(this.el).append(poetView.render().el);
      }
    });
  });
