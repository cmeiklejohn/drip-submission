var RepositoryView = Backbone.View.extend({

  tagName: 'div',
  className: 'pane',

  events: {},

  intialize: function () {
    _.bindAll(this);
  },

  render: function () {
    console.log("render");
    var el = $(".pane"),
        tmpl = $(_.template($("#repository_show_template").html(), {name: this.model.get("name")}));

    tmpl.find(".build_result").addClass("success");

    if (el.length === 0) {
      console.log("no panel!?");
      el = this.el = $(this.el);
    }

    el.html(tmpl);

    return this;
  }

});
