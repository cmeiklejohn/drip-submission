var Repository = Backbone.Model.extend({
  defaults: { buildList: null },

  urlRoot: '/repositories',

  initialize: function (attrs) {
    if (attrs.name) { this.id = attrs.name; }
    this.bind("change", this.setupBuildList, this);
  },

  setupBuildList: function () {
    var repo = this,
        builds = repo.get("builds"),
        bl;

    if (!this.get("buildList") && builds && builds.length > 0) { 
      bl = new BuildList();

      // enrich builds with repository meta data
      _.each(builds, function (b) {
        b.repository = {
          name: repo.get("name"),
          ownerName: repo.get("ownerName")
        };
        bl.add(new Build(b))
      });

      this.set({buildList: bl}, {silent:true});
    }
  },

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
      url = base + ((this.owner ? this.owner.name : null) || this.get('ownerName')) + '/' + this.id;
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
