var AppRouter = Backbone.Router.extend({

  routes: {
    "/": "root",
    "repositories/new": "newRepository"
  },

  root: function () {
  },

  newRepository: function () {
    var addRepositoryView = new AddRepositoryView({});
    console.log("test");
  }

});
