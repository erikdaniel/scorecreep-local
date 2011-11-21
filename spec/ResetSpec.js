describe("Reset", function () {
  it("should have a reset button that is disabled", function () {
    $('#poet-list li').remove();
    expect($('#poet-list li').size()).toBe(0);
    expect($('#reset').size()).toBe(1);
    expect($('#reset').attr('disabled')).toBe('disabled');
  });

  it("should enable the reset button when there are poets on the list", function () {
    generate5();
    expect($('#reset').attr('disabled')).toBe(undefined);
  });
  // This just fails. The spy probably has to be declared before the app is first setup
  xit("should display a confirmation when the reset button is clicked", function () {
    spyOn(window, "confirm");
    delete app;
    $('#slam-app').remove();
    app = new App();
    $('#reset').trigger('click');
    expect(window.confirm).toHaveBeenCalled();
    //expect(true).not.toBe(true);
  });

  it("should be able to remove poets via reset", function () {
    spyOn(window, "confirm").andReturn(true);
    $('#reset').trigger('click');
    expect($('#poet-list li').size()).toEqual(0);
  });

  it("should set the reset button to disabled if you remove all the poets by hand", function () {
    generate5();

    $(".poet-remove").each(function () {
      $(this).trigger('click');
    });

    expect($('#poet-list li').size()).toEqual(0);
    expect($('#reset').attr('disabled')).toBe('disabled');
    expect($('#reset').size()).toBe(1);
  });

  it("should enable the reset button if there are saved poets", function () {
    generate5();
    expect($('#poet-list li').size()).toEqual(5);
    expect($('#reset').attr('disabled')).toBeUndefined();
  });
});
