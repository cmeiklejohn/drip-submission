var AppRouter = Backbone.Router.extend({

  routes: {
    "":                   "root",
    "!/repositories/new": "addRepository",
    "!/repositories":     "repositories"
  },

  root: function () {
    this.navigate("!/repositories/new", true);
  },

  addRepository: function () {
    var addRepositoryView = new AddRepositoryView({
      model: new Repository()
    });
    $("#main_content").html(addRepositoryView.render().el);
  },

  respositories: function () {
    var repositoryList = new RepositoryView(),
        repositoryView = new RepositoryView({
      collection: repositoryList
    });

    repositoryList.fetch();
  }

});
