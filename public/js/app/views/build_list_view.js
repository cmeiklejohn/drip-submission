var BuildListView = Backbone.View.extend({

  initialize: function () {
    _.bindAll(this);
    this.collection.bind("reset", this.render);
  },

  render: function () {
  }

});
