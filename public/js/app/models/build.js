var Build = Backbone.Model.extend({
  urlRoot: '/repositories',

  initialize: function (attrs) {
    if (attrs._id) { this.id = attrs._id; }

    var label = new Date(attrs.receivedAt).getTime();
    this.set({"label": label}, {silent: true});
  },
  
  url: function () {
    var urlError = function() {
      throw new Error('A "url" property or function must be specified');
    };
    
    var url = [],
        base = this.urlRoot || urlError();
    
    // http://localhost:8000/repositories/visionmedia/stats/builds/4e59c85770da665d7200027b
    url.push(base);
    url.push(this.get('repository').ownerName);
    url.push(this.get('repository').name);
    url.push('builds');
    url.push(this.id);
    
    return url.join('/');
  }
  
});
