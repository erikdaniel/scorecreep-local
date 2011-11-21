
  require.config({
    baseUrl: 'lib/js'
  });

  require(['slam'], function(App) {
    $(function() {
      var app;
      app = new App();
    });
  });
