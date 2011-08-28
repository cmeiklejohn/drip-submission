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
    this.beforeFilter(ownerName);
  },

  repositoriesShow: function (ownerName, name) {
    this.beforeFilter(ownerName);

    var repository      = new Repository({ownerName: ownerName, name: name}),
        repositoryView  = new RepositoryView({model: repository});
        
    repository.fetch({success: function () {
      repository.trigger("change");
    }});
  },
  
  buildShow: function (ownerName, name, id) {
    this.beforeFilter(ownerName); // This method doesn't take a param... ?
    
    var build      = new Build({ownerName: ownerName, name: name, id: id}),
        buildView  = new BuildView({model: build});
        
    build.fetch({success: function () {
      build.trigger("change");
    }});
  }
});
