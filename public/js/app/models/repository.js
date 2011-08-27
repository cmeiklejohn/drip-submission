(function () {

	var URLregexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  window.Repository = Backbone.Model.extend({

    initialize: function (attrs) {
      if (attrs._id) {
        this.id = attrs._id;
      }
    },

    // git@github.com:hojberg/routr.js.git

    // url: '/receive',
    urlRoot: '/repositories',


    validate: function (attrs) {
      if (!attrs.url) {
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
