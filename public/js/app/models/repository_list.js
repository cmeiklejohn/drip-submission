var RepositoryList = Backbone.Collection.extend({
  url: '/repositories',

  initialize: function () {
    this.socket = io.connect('http://localhost');
    this.socket.on('repository', function (data) {
      console.log('socket.io received data:' + data);
    });
  },

  addOrUpdateRepository: function () {
  }


});
