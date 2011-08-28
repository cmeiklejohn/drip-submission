var AppRouter = Backbone.Router.extend({

  routes: {
    "": "root",
    "/repositories/new":      "repositoriesAdd",
    "/repositories":          "repositoriesList",
    "/:ownerName/":           "repositoriesList",
    "/:ownerName/:name":      "repositoriesShow",
    "/:ownerName/:name/:id":  "buildShow"
  },

  beforeFilter: function () {
    $("#main_logo").show();
    var appView = new AppView().render();
    var repositoryList = new RepositoryList();
    var repositoryListView = new RepositoryListView({
      el: $(".repositories"),
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
    this.beforeFilter();
  },

  repositoriesShow: function (ownerName, name) {
    this.beforeFilter();

    var repository      = new Repository({ownerName: ownerName, name: name}),
        repositoryView  = new RepositoryView({model: repository});
        
    repository.fetch();
  },
  
  buildShow: function (ownerName, name, id) {
    this.beforeFilter();

    var repository      = new Repository({ownerName: ownerName, name: name}),
        repositoryView  = new RepositoryView({model: repository});
        
    repository.fetch();

    var build      = new Build({_id: id, repository: {ownerName: ownerName, name: name} }),
        buildView  = new BuildView({model: build});
        
    build.fetch();
  }
});
