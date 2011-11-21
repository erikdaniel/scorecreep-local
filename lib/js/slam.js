
  define(['views/list_page', 'collections/list'], function(ListPage, List) {
    return Backbone.View.extend({
      id: 'slam-app',
      className: 'rounded shadow',
      initialize: function() {
        _.bindAll(this, 'render');
        return this.render();
      },
      render: function() {
        var PoetList, listPage;
        $('body').append(this.el);
        $(this.el).html('<h1>Test App</h1>');
        PoetList = new List();
        listPage = new ListPage({
          plist: PoetList
        });
        $(this.el).append(listPage.render().el);
        this.reset = function() {
          return listPage.clearList();
        };
        return this;
      }
    });
  });

