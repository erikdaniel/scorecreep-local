
  define(['models/poet'], function(Poet) {
    return Backbone.Collection.extend({
      model: Poet,
      localStorage: new Store('Poets'),
      getNextOrder: function() {
        if (!this.length) return 0;
        return this.last().get('order') + 1;
      },
      comparator: function(item) {
        return item.get('order');
      }
    });
  });
