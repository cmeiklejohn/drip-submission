var Build = Backbone.Model.extend({
  urlRoot: '/repositories',
  
  url: function () {
    var urlError = function() {
      throw new Error('A "url" property or function must be specified');
    };
    
    var url = [],
        base = this.urlRoot || urlError();
    
    // http://localhost:8000/repositories/visionmedia/stats/builds/4e59c85770da665d7200027b
    url.push(base);
    url.push(this.get('ownerName'));
    url.push(this.get('name'));
    url.push('builds');
    url.push(this.id);
    
    return url.join('/');
  }
  
});
