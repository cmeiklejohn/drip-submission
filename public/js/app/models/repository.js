(function () {

	var URLregexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  window.Repository = Backbone.Model.extend({

    url: '/repositories',

    validate: function (attrs) {
      if (!attrs.githubURL) {
        return "Please enter a github repository url";
      }
      /*
      if (!URLregexp.test(attrs.githubURL)) {
        return "Please enter a valid github repository url";
      }
      */
    }

  });
}());
