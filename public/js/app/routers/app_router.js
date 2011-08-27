var AppRouter = Backbone.Router.extend({

  routes: {
    "": "root",
    "/repositories/new": "repositories.add",
    "/repositories":     "repositoriesList",
    "/:ownerName/":       "repositoriesList",
    "/:ownerName/:name":  "repositories.show"
  },

  beforeFilter: function () {
    var repositoryList = new RepositoryList();
    var repositoryListView = new RepositoryListView({
      collection: repositoryList
    });

    repositoryList.fetch();
  },

  root: function () {
    this.navigate("/repositories/new", true);
  },

  repositoriesAdd: function () {
    var addRepositoryView = new AddRepositoryView({
      model: new Repository()
    });
    $("#main_content").html(addRepositoryView.render().el);
  },

  repositoriesList: function (ownerName) {
    console.log("here");
    this.beforeFilter(ownerName);
  },

  repositoriesShow: function (ownerName, name) {
    this.beforeFilter(ownerName);
  }
});
