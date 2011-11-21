describe("List Validation", function () {
  var l;
  it("should be defined", function () {
    l = new List();
    expect(l).toBeDefined();
  });
  it("should return the proper length", function () {
    l.create({firstname: 'Taylor', lastname: 'Mali'});
    expect(l.length).toBe(1);
    l.at(0).destroy();
  });

  xit("ignore", function () {
    var test = l.any(function(item,key) {
      console.log(item);
      return item.get('firstname') === 'Taylor' && item.get('lastname') === 'Mali';
    });
    expect(test).toBe(true);
  });

  it("should not allow you to enter the same name twice", function () {
    var e = jQuery.Event("keypress", { keyCode: 13 });
    $('#add').val('Ed Mabrey').trigger(e);

    e = jQuery.Event("keypress", { keyCode: 13 });
    $('#add').val('Ed Mabrey').trigger(e);

    expect($('#poet-list li').size()).toBe(1);
  });
});
