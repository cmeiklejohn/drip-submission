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

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    var el = this.el = $(this.el);
    el.html(this.model.get("_id"));
    return this;
  }

});

var LatestBuildView = Backbone.View.extend({
  tagName: 'div',
  className: 'latest_build_results',

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    var el = this.el = $(this.el);
    this.el.addClass("success");
    this.el.html(this.model.get("_id"));
    return this;
  }
});
