var BuildListView = Backbone.View.extend({
  tagName: 'div',
  className: 'builds',

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    var el = this.el = $(this.el),
        frag = $( $("#build_list_template").html() ),
        latestBuildNode = frag.find(".latest_build"),
        listNode = frag.find(".build_list");

    var lastestBuildView = new LatestBuildView({
      model: this.collection.at(0)
    });

    latestBuildNode.append(lastestBuildView.render().el);

    _.each(this.collection.toArray(), function (build, i) {
      if (i === 0) { return }
      listNode.append(new BuildListItemView({
        model: build
      }).render().el);
    });

    el.html(frag);

    return this;
  }

});

var BuildListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'build_list_item',

  events: {"click": "show"},

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    var el = this.el = $(this.el);
    var stateClass = (this.model.get("completed") ? (this.model.get("successful") ? "success" : "failure") : (this.model.get("running") ? "running" : "unknown_state"));
    el.attr('class', this.className+" "+stateClass);
    el.html(this.model.get("receivedAt"));
    return this;
  },

  show: function () {
    $(".pane").append(new BuildView({
      model: this.model
    }).render().el);
  }

});

// Shouldn't this simply be the first in the BuildList collection?
var LatestBuildView = Backbone.View.extend({
  tagName: 'div',
  className: 'latest_build_results',

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    var el = this.el = $(this.el);
    this.el.addClass("success");
    this.el.html(this.model.get("receivedAt"));
    return this;
  }
});
