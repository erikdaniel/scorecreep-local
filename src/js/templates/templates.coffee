define(
  ['text!templates/poet.html'],
  (Poet) ->
    return {
      poet: _.template(Poet)
    }
)


