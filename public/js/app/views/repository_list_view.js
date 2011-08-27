var RepositoryListView = Backbone.View.extend({

  initialize: function () {
    _.bindAll(this);
    this.collection.bind("reset", this.render);
    this.collection.bind("add", this.add);
  },

  render: function () {
    var innerNode = $(".repositories").find(".repository_list ul");

    _.each(this.collection.toArray(), function (repository) {
      innerNode.append(new RepositoryListItemView({
        model: repository
      }).render().el);
    });

    return this;
  },

  add: function () {
    $(this.el).find(".repository_list ul").append(new RepositoryListItemView({
      model: repository
    }).render().el);
  }

});

var RepositoryListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'repository_list_item',

  events: {
    "click": "show"
  },

  intialize: function () {
    _.bindAll(this);
    this.model.bind("reset", this.render);
  },

  render: function () {
    $(this.el).html(this.model.get("name"));
    return this;
  },

  show: function () {
    appRouter.navigate("/" + this.model.get("ownerName") + "/" + this.model.get("name"));

    var repository = new Repository(this.model.attributes);
    new RepositoryView({model: repository});
    repository.fetch({success: function () {
      repository.trigger("change");
    }});
  }

});
