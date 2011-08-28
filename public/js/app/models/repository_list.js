var RepositoryList = Backbone.Collection.extend({
  url: '/repositories',

  initialize: function () {
    var list = this;
    window.socket.on('repository', function (data) {
      console.log('socket.io received data:' + data);

      var repo = data.repository,
          repository = list.find(function (r) {
            return repo._id === r.get("_id");
          });
      
      if (repository) {
        repository.set(repository);
      }
      else {
        console.log("new");
        list.add(new Repository(repo));
      }

    });
  },

  addOrUpdateRepository: function () {
  }


});
