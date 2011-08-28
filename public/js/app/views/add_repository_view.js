var AddRepositoryView = Backbone.View.extend({

  tagName: "div",
  className: "add_repository",

  events: {
    "submit #add_repo_form": "save"
  },

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    $(this.el).html(_.template($("#add_repository_tmpl").html()));
    return this;
  },

  save: function (ev) {
    ev.preventDefault();
    
    var input             = this.$(".repository_url_input"),
        errorMessageNode  = this.$(".error_message"),
        url               = input.val().replace(/\.git$/,""),
        urlChunks         = url.split('/'),
        name              = urlChunks[urlChunks.length-1],
        ownerName         = urlChunks[urlChunks.length-2];
    
    this.reset();

    this.model.bind("error", function (model, error) {
      errorMessageNode.html(error);
      errorMessageNode.fadeIn(200);
      input.addClass("error");
    });

    this.model.save({url: url,
                    name: name,
                    owner:{name: ownerName},
                   });
  },

  reset: function () {
    var errorMessageNode = this.$(".error_message");
    this.$(".repository_url_input").removeClass("error");
    errorMessageNode.html("");
    errorMessageNode.hide();
  }

});
