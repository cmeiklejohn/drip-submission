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
        frag = $(_.template($("#repository_show_template").html(), {name: this.model.get("name")}));

    if (this.model.isSuccessful) {
      frag.find(".build_result").addClass("success");
    }
    else {
      frag.find(".build_result").addClass("failure");
    }

    if (el.length === 0) {
      el = this.el = $(this.el);
    }

    el.html(frag);

    if (this.model.get('builds') && this.model.get('builds').length > 0) { 
      el.append(new BuildListView({
        collection: new BuildList(this.model.get('builds'))
      }).render().el);
    }
    else {
      el.append("This repository has no builds yet ☹");
    }

    return this;
  }

});
