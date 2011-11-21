describe("Storage", function () {
  var key = "Poets",
    store,
    val;

  beforeEach(function () {
    //store = localStorage.getItem(key);
  });
  afterEach(function () {
  });

  it("should retain the list in storage", function () {
    store = localStorage.getItem(key);
    expect(store).toBeDefined();
  });

  it("should save new poets in local storage", function () {
    generate5(); 
    store = localStorage.getItem(key);
    var records = (store && store.split(",")) || [];
    var arr =  _.map(records, function(id){return JSON.parse(localStorage.getItem(key+"-"+id));}, this);
    expect(records.length).toBe(5);
    expect(arr[0].firstname).toBe('Patricia');
  });

  it("should remove records from storage when the remove link is clicked", function () {
    generate5();
    $("#poet-list li").eq(0).find('.poet-remove').trigger('click'); 
    store = localStorage.getItem(key);
    var records = (store && store.split(",")) || [];
    expect(records.length).toEqual(4);
  });

  it("should persist edits to storage", function () {
    var e = jQuery.Event("keypress", { keyCode: 13 });
    generate5();
    $('#poet-list li').eq(0).addClass('editing');
    $('#poet-list li input').eq(0).val('Ed Mabrey');
    $('#poet-list li input').eq(0).trigger(e);
    store = localStorage.getItem(key);
    var records = (store && store.split(",")) || [];
    var arr =  _.map(records, function(id){return JSON.parse(localStorage.getItem(key+"-"+id));}, this);
    expect(records.length).toBe(5);
    expect(arr[0].firstname).toBe('Ed');
  });
});
