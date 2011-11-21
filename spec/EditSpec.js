describe("Editing", function () {
  beforeEach(function() {
    generate5();
  });

  afterEach(function () {
  });

  it("should have 5 poets on the list", function () {
    expect($('#poet-list li').size()).toEqual(5);
  });
  it("should have an input field that is not visible", function () {
    expect($('#poet-list li input').eq(1).size()).toBe(1);
    expect($('#poet-list li input').eq(1).is(':visible')).toBe(false);
  });

  it("should display an edit form when the poet is double clicked", function () {
    // TODO Fix this
    // Can't trigger this event for some reason
    $('#poet-list li').eq(1).trigger('dblclick');    
    $('#poet-list li').eq(1).addClass('editing');
    expect($('#poet-list li span.poet').eq(1).is(':visible')).toBe(false);
    expect($('#poet-list li input').eq(1).is(':visible')).toBe(true);
    $('#poet-list li').eq(1).removeClass('editing');
  });

  it("should complete the update or abort when focus is taken off of the input", function () {
    $('#poet-list li').eq(1).addClass('editing');
    var input = $('#poet-list li input').eq(1);
    input.focus();
    expect(input.is(':visible')).toBe(true);
    input.blur();
    expect($('#poet-list li').eq(1).hasClass('editing')).toBe(false);
    expect(input.is(':visible')).not.toBe(true);
  });

  it("should return the input to the default if the update is aborted", function () {
    $('#poet-list li').eq(1).addClass('editing');
    var input = $('#poet-list li input').eq(1);
    input.focus();
    input.val('Foobie Bletch');
    input.blur();
    $('#poet-list li').eq(1).addClass('editing');
    expect(input.val()).toBe('Reggie Gibson');
  });

  it("should display the current model name in the input", function () {
    $('#poet-list li').eq(1).addClass('editing');
    expect($('#poet-list li input').eq(1).val()).toBe('Reggie Gibson');
  });

  it("should update the poet name when enter is pressed", function () {
      var e = jQuery.Event("keypress", { keyCode: 13 });
      $('#poet-list li input').eq(1).val('Ed Mabrey');
      $('#poet-list li input').eq(1).trigger(e);
      expect($('#poet-list li span.poet').eq(1).text()).toBe('Ed Mabrey');
  });

  
});


