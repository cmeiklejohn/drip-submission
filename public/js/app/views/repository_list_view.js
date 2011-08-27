var RepositoryListView = Backbone.View.extend({
  tagName: 'div',
  className: 'clearfix repositories',

  initialize: function () {
    _.bindAll(this);
    this.collection.bind("reset", this.render);
    this.collection.bind("add", this.add);
  },

  render: function () {
    var tmpl = _.template($("#repository_list_template").html()),
        innerNode;

    this.el = $(this.el);
    this.el.html(tmpl);

    var innerNode = this.el.find(".repository_list ul");

    _.each(this.collection.toArray(), function (repository) {
      innerNode.append(new RepositoryListItemView({
        model: repository
      }).render().el);

    });

    $("#main_content").html(this.el);

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
    //this.model.bind("reset", this.render);
  },

  render: function () {
    $(this.el).html(this.model.get("name"));
    return this;
  },

  show: function () {
    var repository = new Repository(this.model.attributes);
    //appRouter.navigate("/" + this.model.get("ownerName") + "/" + this.model.get("name"));
    new RepositoryView({model: repository});
    repository.fetch();
  }

});
