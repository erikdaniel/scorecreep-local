define(
  ['models/poet'],
  (Poet) ->
    return Backbone.Collection.extend
      model: Poet
      localStorage: new Store('Poets')
      getNextOrder: ->
        if !@length
          return 0
        return @last().get('order') + 1
      comparator: (item) ->
        item.get('order')
    
)
