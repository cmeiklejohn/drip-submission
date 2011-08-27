var RepositoryView = Backbone.View.extend({

  tagName: 'div',
  className: 'pane',

  events: {},

  initialize: function () {
    _.bindAll(this);
    this.model.bind("change", this.render);
  },

  render: function () {
    var el = $(".pane"),
        tmpl = $(_.template($("#repository_show_template").html(), {name: this.model.get("name")}));

    if (this.model.isSuccessful) {
      tmpl.find(".build_result").addClass("success");
    }
    else {
      tmpl.find(".build_result").addClass("failure");
    }

    if (el.length === 0) {
      el = this.el = $(this.el);
    }

    el.html(tmpl);

    return this;
  }

});
