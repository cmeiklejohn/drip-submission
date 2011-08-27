var BuildListView = Backbone.View.extend({
  tagName: 'div',
  className: 'builds',

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    var el = this.el = $(this.el),
        frag = $(_.template($("#build_list_template").html(), {}));

    _.each(this.collection.toArray(), function (build) {
      frag.append("BUILD");
    });

    el.html(frag);

    return this;
  }

});
