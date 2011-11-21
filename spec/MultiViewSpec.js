describe("Multiviews", function () {
  beforeEach(function () {
  });

  afterEach(function () {
  });
  
  it("should be reset", function () {
   $('#reset').trigger('click');
   expect($("#poet-list li").size()).toBe(0);
 });

 it("should have 5 poets", function () {
  generate5();
  expect($('#poet-list li').size()).toBe(5);
 });

});
