var appWrapper,
  app,
  spy;

beforeEach(function () {
  app = new App();
});

afterEach(function () {
  app.reset(); // delete all the items 
  delete app; // delete the app instance
  $('#slam-app').remove(); // clear the ui
});

function resetList() {
}

function generate5() {
  $('#reset').trigger('click');
  var e;
  var poets = ['Patricia Smith', 'Reggie Gibson', 'Taylor Mali', 'Buddy Wakefield', 'Sonya Renee'];
  _.each(poets, function(poet){
    e = jQuery.Event("keypress", { keyCode: 13 });
    $('#add').val(poet);
    $('#add').trigger(e);
  });
}
