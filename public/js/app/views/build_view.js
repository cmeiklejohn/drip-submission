var BuildView = Backbone.View.extend({
    
  tagName: 'div',
  className: 'pane build_details',

  initialize: function () {
    _.bindAll(this);
    this.model.bind("change", this.render);
  },

  render: function () {
    this.el = $(this.el);
    var tmpl = $(_.template($("#build_view_template").html(), {
          label: this.model.get("label"),
          output: this.parsedOutput()
        })),
        pane = $(".pane.build_details");

    tmpl.find(".build_result").addClass(this.model.status());

    this.el.html(tmpl);

    if (pane.length > 0) {
      pane.replaceWith(this.el);
    }
    else {
      $(".pane").append(this.el);
    }
    return this;
  },
  
  parsedOutput: function() {
    // TODO: parse ansi sequences
    return this.model.get("output").replace(/\n/g,'<br>');
  }

});
