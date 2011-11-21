
  define([], function() {
    return Backbone.Model.extend({
      defaults: function() {
        return {
          firstname: 'First',
          lastname: 'Last'
        };
      }
    });
  });
