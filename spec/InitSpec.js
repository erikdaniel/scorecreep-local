describe("Init", function () {
 
  it("should be running tests", function () {
    expect(true).toEqual(true);
  });
  
  describe("Setup", function () {

    it("should have a list", function () {
      expect($("#poet-list").size()).toEqual(1);
    });
    
    it("should have an #add input", function () {
      expect($('#add').size()).toEqual(1);
    });

    it("should catch keypress values", function () {
      generate5();
      var arr = [];
      $('#poet-list li .poet').each(function (index) {
        arr.push($(this).text());
      });
      expect(arr).toContain('Reggie Gibson');
    });
  });

  describe("List", function () {

    it("should allow you to add items to the list", function () {
      var e = jQuery.Event("keypress", { keyCode: 13 });
      $('#add').val('Foobie Bletch');
      $('#add').trigger(e);
      expect($('#poet-list li').size()).toEqual(1);
    });



    it("should be able to delete individual poets from the list", function () {
      generate5();
      $("#poet-list li").eq(0).find('.poet-remove').trigger('click'); 
      expect($('#poet-list li').size()).toEqual(4);
    });
    
    it("should display poets saved in storage", function () {
      //resetList();
      generate5();
      expect($('#poet-list li').size()).toEqual(5);
    });

    it("should escape special characters when displaying the model", function () {
      var e = jQuery.Event("keypress", { keyCode: 13 });
      $('#add').val('& <');
      $('#add').trigger(e);

      expect($('#poet-list li').size()).toEqual(1);
      expect($('#poet-list li span.poet').eq(0).html()).toBe('&amp; &lt;');
    });

  });
});
