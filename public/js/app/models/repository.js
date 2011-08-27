var Repository = Backbone.Model.extend({

  initialize: function (attrs) {
    if (attrs.name) { this.id = attrs.name; }
  },

  urlRoot: '/repositories',

  validate: function (attrs) {
    /*
    if (!attrs.repository.url) {
      return "Please enter a github repository url";
    }
    */
  },

  isSuccessful: function () {
    var successful = true;
    if (this.builds) {
      
    }
    return successful;
  }

});
