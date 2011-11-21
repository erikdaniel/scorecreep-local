define(
  [],
  ->
    return Backbone.Model.extend
      defaults: ->
        return {
          firstname: 'First'
          lastname: 'Last'
          }
)
