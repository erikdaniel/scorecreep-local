/**
 * Non-AMD dependencies should be in script 
 * tags in the header of the SpecRunner.html
 * or the app index.html file.
 *
 * These types of dependencies should not be
 * used in the require scripts for browser
 * apps, as they exist in the global scope
 * anyway.
 *
 * This is not a good solution for many 
 * dependancies.
 */
require.config({
  baseUrl: 'lib/js' // this is necessary to retain correct app structure TODO: confirm
});
require(
  [
    'slam' // The app entry point
  , 'collections/list' // List class

  // add jasmine specs here
  , '../../spec/SpecHelper' // helper
  , '../../spec/InitSpec'
  , '../../spec/EditSpec'
  , '../../spec/MultiViewSpec'
  , '../../spec/ResetSpec'
  , '../../spec/ListSpec'
  , '../../spec/StorageSpec'
  , '../../spec/OrderSpec'
  ],
  function (App, List) {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var trivialReporter = new jasmine.TrivialReporter();

      jasmineEnv.addReporter(trivialReporter);

      jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
      };

    $(function() {
      // Hack
      // TODO why isn't the List class in scope with jasmine?
      window.List = List;
      window.App = App;
      jasmineEnv.execute();
    });
  }
);
