var BuildView = Backbone.View.extend({
    
  tagName: 'div',
  className: 'pane build_details',

  initialize: function () {
    _.bindAll(this);
    this.model.bind("change", this.render);
  },

  render: function () {
    var el = this.el = $(this.el);
    return this;
  }

});
