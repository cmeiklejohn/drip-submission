var Repository = Backbone.Model.extend({

  initialize: function (attrs) {
    if (attrs.name) { this.id = attrs.name; }
  },

  urlRoot: '/repositories',

  validate: function (attrs) {
    if (!attrs.url) {
      return "Please enter a github repository url";
    }
  },
  
  url: function () {
    var urlError = function() {
      throw new Error('A "url" property or function must be specified');
    };
    
    var base = this.urlRoot || urlError();
        base = base + (base.charAt(base.length - 1) === '/' ? '' : '/');
    
    // when a new instance: /repositories
    var url = base;
    
    if(!this.isNew()) {
      // when an existing instance: /repositories/:ownerName/:id
      url = base + this.owner.name + '/' + this.id;
    }
    
    return url;
  },
  
  // Override toJSON so we can wrap the attrs in {"repository": ... }
  toJSON : function() {
    return _.clone({"repository" : this.attributes})
  },
  
  isSuccessful: function () {
    var successful = true;
    if (this.builds) {
      
    }
    return successful;
  }

});
