require.config(
  {
    baseUrl: 'lib/js'
  }
)
require(
  ['slam'],
  (App) ->
    $ ->
      app = new App()
      return
    return
)
