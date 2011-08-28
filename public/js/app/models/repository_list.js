var RepositoryList = Backbone.Collection.extend({
  url: '/repositories',

  initialize: function () {
    var list = this;
    window.socket.on('repository', function (data) {
      console.log('socket.io received data:' + data);

      console.log(repo._id);
      console.log(repository);

      var repo = data.repository,
          repository = list.get(repo._id);

      if (repository) {
        console.log("found");
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
