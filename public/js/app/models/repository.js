var Repository = Backbone.Model.extend({

  initialize: function (attrs) {
    if (attrs.name) { this.id = attrs.name; }

    this.builds = new BuildList([
      new Build({_id: "ASD3213123", completed: false, running: true}),
      new Build({_id: "ASD3213123", completed: true, running: false}),
      new Build({_id: "ASD3213123", completed: true, running: false}),
      new Build({_id: "ASD3213123", completed: true, running: false}),
      new Build({_id: "ASD3213123", completed: true, running: false})
    ]);

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
