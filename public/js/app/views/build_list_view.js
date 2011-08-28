var BuildListView = Backbone.View.extend({
  tagName: 'div',
  className: 'builds',

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    var el = this.el = $(this.el),
        frag = $(_.template($("#build_list_template").html(), {}))
        listNode = frag.find(".build_list");

    _.each(this.collection.toArray(), function (build) {
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
