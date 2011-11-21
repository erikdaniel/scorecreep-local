describe("Order", function () {

  it("should have a disabled reorder button", function () {
    expect($('#reorder').attr('disabled')).toBe('disabled');
  });

  it("should enable the reorder button when there are more than 1 items in list", function () {
    generate5();
    expect($('#reorder').attr('disabled')).toBe(undefined);
  });

  it("should not display order buttons by default", function () {
    generate5();
    expect($('#poet-list li .up').eq(0).is(':visible')).toBe(false);
    expect($('#poet-list li .down').eq(0).is(':visible')).toBe(false);
  });

  it("should display the order buttons when the reorder button is clicked", function () {
    generate5();
    var item = $('#poet-list li').eq(1);
    $('#reorder').trigger('click');
    expect(item.find('.up').is(':visible')).toBe(true)
    expect(item.find('.down').is(':visible')).toBe(true)
  });

  it("should hide the order buttons when the reorder button is clicked again", function () {
    generate5();
    var item = $('#poet-list li').eq(1);
    $('#reorder').trigger('click');
    $('#reorder').trigger('click');
    expect(item.find('.up').is(':visible')).not.toBe(true)
    expect(item.find('.down').is(':visible')).not.toBe(true)
  });

  it("should move the item up in the order when the up button is clicked", function () {
    generate5();
    var item = $('#poet-list li').eq(1);
    $('#reorder').trigger('click');
    item.find('.up').click();
    expect($('#poet-list li .poet').eq(0).text()).toBe('Reggie Gibson');
  });
});
