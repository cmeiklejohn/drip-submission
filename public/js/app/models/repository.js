var Repository = Backbone.Model.extend({

  initialize: function (attrs) {
    if (attrs.name) {
      this.id = attrs.name;
    }
  },

  urlRoot: '/repositoriesSNAOSDN',
  validate: function (attrs) {
    if (!attrs.url) {
      return "Please enter a github repository url";
    }
  }

});
