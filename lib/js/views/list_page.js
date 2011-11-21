define(
  ['views/list_view'],
  function (ListView) {
   return Backbone.View.extend({
      id: 'list-tab',
      tagName: 'div',
      events: {
        'keypress input#add': 'onEnterHandler',
        'click input#reset': 'confirmReset',
        'click input#reorder': 'reorderClickHandler'
      },
      initialize: function() {
        _.bindAll(this, 'render', 'confirmReset', 'changedList', 'onEnterHandler');
        this.plist = this.options.plist;
        this.plist.bind('clear', this.confirmReset, this);
        this.plist.bind('all', this.changedList, this);
        this.plist.bind('change', this.changedList, this);
      },
      render: function() {
        var listView;
        $(this.el).append("<input id='add' name='add' placeholder='Add item' />");
        $(this.el).append("<input type='button' id='reset' value='Reset' disabled />");
        $(this.el).append("<input type='button' id='reorder' value='Order' disabled />");
        listView = new ListView({
          plist: this.plist
        });
        this.$('#add').after(listView.render().el);
        this.plist.fetch();
        if (this.plist.length > 0) this.$('#reset').removeAttr('disabled');
        if (this.plist.length > 1) this.$('#reorder').removeAttr('disabled');
        return this;
      },
      changedList: function(e, f, g) {
        if (this.plist.length === 0) {
          $('#reset').attr('disabled', 'disabled');
        } else {
          $('#reset').removeAttr('disabled');
        }
        if (this.plist.length < 2) {
          $('#reorder').attr('disabled', 'disabled');
        } else {
          $('#reorder').removeAttr('disabled');
        }
      },
      onEnterHandler: function(e) {
        var poet, text;
        text = this.$('#add').val();
        if (!text || e.keyCode !== 13) return;
        text = text.split(' ');
        poet = {
          firstname: text.shift() || '',
          lastname: text.join(' ') || '',
          order: this.plist.getNextOrder()
        };
        if (this.addPoet(poet)) return this.$('#add').val('').focus();
      },
      addPoet: function(poet) {
        var test;
        test = this.plist.any(function(item, key) {
          return item.get('firstname').toLowerCase() === poet.firstname.toLowerCase() && item.get('lastname').toLowerCase() === poet.lastname.toLowerCase();
        });
        if (!test) {
          this.plist.create(poet);
          return true;
        }
        return false;
      },
      confirmReset: function() {
        var agree;
        agree = window.confirm("Are you sure you want to delete the list?");
        if (agree) {
          this.clearList();
          return true;
        }
        return false;
      },
      clearList: function() {
        var arr;
        arr = [];
        this.plist.each(function(item) {
          return arr.push(item);
        });
        _.each(arr, function(item) {
          return item.destroy();
        });
        return true;
      },
      reorderClickHandler: function() {
        var label;
        $(this.el).toggleClass('ordering');
        label = this.$('#reorder').val() === 'Order' ? 'Done' : 'Order';
        this.$('#reorder').val(label);
      }
    });
  }
);
