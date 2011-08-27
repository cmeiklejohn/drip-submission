var MainRouter = Backbone.Router.extend({

  routes: {
    "": "root",
    "repositories/new": "newRepository"
  },

  root: function () {
  },

  newRepository: function () {
    var addRepositoryView = new addRepositoryView({});
  }

});
