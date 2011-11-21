define(
  ['views/poet_view'],
  (PoetView) ->
    return Backbone.View.extend
      id: 'poet-list'
      tagName: 'ul'
      initialize: ->
        _.bindAll(this, 'render', 'appendItem', 'changeOrder', 'addAll')
        @plist = @options.plist
        @plist.bind('add', @appendItem, this)
        @plist.bind('change:order', @changeOrder, this)
        #@plist.bind('all', @render, this)
        @plist.bind('reset', @addAll, this)
        return
       
      render: ->
        return this
      changeOrder: (e, target, cont) ->
        # rerender?
        @plist.sort()#this should be unnecessary
        $('#poet-list').html('')
        @addAll()

      addAll: ->
        @plist.each(@appendItem)
        return

      appendItem: (poet) ->
        poetView = new PoetView({model: poet})
        $(@el).append(poetView.render().el)
        return

)
