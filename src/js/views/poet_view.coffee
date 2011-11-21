define(
  ['templates/templates'],
  (Templates) ->
    PoetView = Backbone.View.extend
      tagName: 'li'
      events:
        'click span.poet-remove': 'del'
        'click span.up': 'updateOrder'
        'click span.down': 'updateOrder'
        'dblclick span.poet': 'edit'
        'keypress input.poet-edit': 'updatePoet'
        'blur input.poet-edit': 'cancelUpdate'
      
      initialize: ->
        _.bindAll(this, 'render', 'unrender', 'del', 'updateOrder', 'edit', 'updatePoet', 'cancelUpdate')
        @model.bind('destroy', this.unrender, this)
        @model.bind('change', this.render, this)
        return

      unrender: ->
        $(@el).remove()

      del: ->
        @model.destroy()

      render: ->
        $(@el).html(Templates.poet({order: @model.get('order'),firstname: @model.escape('firstname'), lastname: @model.escape('lastname')}))
        @input = this.$('.poet-edit')
        return this

      edit: ->
        $(@el).addClass('editing')
        @input.focus()

      updateOrder: (e) ->
        classname = e.target.className 
        dir = if /down/.test(classname) then 1 else -1
        currentorder = @model.get('order')
        othermodel = @model.collection.at(currentorder + dir)
        if othermodel
          othermodel.set({order: currentorder})
          othermodel.save()
        @model.set(
          order: @model.get('order') + dir
        )
        @model.save()

      updatePoet: (e) ->
        text = @input.val()
        if (!text || e.keyCode != 13)
          return
        text = text.split(' ')
        poet =
          firstname: text.shift() || ''
          lastname: text.join(' ') || ''
        @model.set(poet)
        @model.save()
        $(@el).removeClass('editing')
        return

      cancelUpdate: ->
        @$('input').val(@model.escape('firstname') + ' ' + @model.escape('lastname'))
        $(@el).removeClass('editing')
)
