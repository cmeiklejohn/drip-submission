var BuildView = Backbone.View.extend({
    
  tagName: 'div',
  className: 'pane build_details',

  initialize: function () {
    _.bindAll(this);
    this.model.bind("change", this.render);
  },

  render: function () {
    this.el = $(this.el);
    var tmpl = _.template($("#build_view_template").html(), {
          label: this.model.get("label"),
          output: this.model.get("output")
        }),
        pane = $(".pane.build_details");

    this.el.html(tmpl);

    if (pane.length > 0) {
      pane.replaceWith(this.el);
    }
    else {
      $(".pane").append(this.el);
    }
    return this;
  }

});
