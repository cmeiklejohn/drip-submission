var BuildView = Backbone.View.extend({
    
  tagName: 'div',
  className: 'pane build_details',

  render: function () {
    var el = this.el = $(this.el);
    return this;
  }

});
