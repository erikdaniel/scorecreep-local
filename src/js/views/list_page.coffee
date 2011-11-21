define(
  ['views/list_view'],
  (ListView) ->
    return Backbone.View.extend
      id: 'list-tab'
      tagName: 'div'
      events: {
        'keypress input#add': 'onEnterHandler',
        'click input#reset': 'confirmReset'
        'click input#reorder': 'reorderClickHandler'
      }
      initialize: ->
        _.bindAll(this, 'render', 'confirmReset', 'changedList', 'onEnterHandler')
        @plist = this.options.plist
        @plist.bind('clear', @confirmReset, this)
        @plist.bind('all', @changedList, this)
        @plist.bind('change', @changedList, this)
        return

      render: ->
        $(@el).append("<input id='add' name='add' placeholder='Add item' />")
        $(@el).append("<input type='button' id='reset' value='Reset' disabled />")
        $(@el).append("<input type='button' id='reorder' value='Order' disabled />")
        listView = new ListView({plist: @plist})
        @$('#add').after(listView.render().el)
        @plist.fetch()
        if  @plist.length > 0
          @$('#reset').removeAttr('disabled')
        if @plist.length > 1
          @$('#reorder').removeAttr('disabled')

        return this

      changedList:(e, f, g) ->
        if @plist.length is 0
          $('#reset').attr('disabled', 'disabled')
        else
          $('#reset').removeAttr('disabled')

        if @plist.length < 2
          $('#reorder').attr('disabled', 'disabled')
        else
          $('#reorder').removeAttr('disabled')

        return
       
      onEnterHandler: (e) ->
        text = @$('#add').val()
        if (!text || e.keyCode != 13)
          return
        text = text.split(' ')
        poet =
          firstname: text.shift() || ''
          lastname: text.join(' ') || ''
          order: @plist.getNextOrder()
        if @addPoet(poet)
          @$('#add').val('').focus()

      addPoet: (poet) ->
        test = @plist.any((item,key) ->
          return item.get('firstname').toLowerCase() is poet.firstname.toLowerCase() and item.get('lastname').toLowerCase() is poet.lastname.toLowerCase()
        )
        if not test
          @plist.create(poet)
          return true

        return false

      confirmReset: ->
        agree = window.confirm("Are you sure you want to delete the list?")
        if agree
          @clearList()
          return true
        return false

      clearList: ->
        arr = []
        @plist.each( (item) -> arr.push(item))
        _.each(arr, (item) -> item.destroy())
        return true

      reorderClickHandler: ->
        $(@el).toggleClass('ordering')
        label = if @$('#reorder').val() is 'Order' then 'Done' else 'Order'
        @$('#reorder').val(label)
        return
)
