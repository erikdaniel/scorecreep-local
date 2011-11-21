define(
  ['views/list_page', 'collections/list'],
  (ListPage, List) ->
    return Backbone.View.extend
      id: 'slam-app'
      className: 'rounded shadow'

      initialize: ->
        _.bindAll(this, 'render')
        @render()

      render: ->
        $('body').append(@el)
        $(@el).html('<h1>Test App</h1>')
        PoetList = new List()
        listPage = new ListPage(plist:PoetList)
        $(@el).append(listPage.render().el)
        @reset= ->
          listPage.clearList()
        return this

)
