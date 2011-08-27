var AddRepositoryView = Backbone.View.extend({

  tagName: "div",
  className: "add_repository",

  events: {
    "click .btn.add": "save"
  },

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    $(this.el).html(_.template($("#add_repository_tmpl").html()));
    return this;
  },

  save: function () {
    var input             = this.$(".repository_url_input"),
        errorMessageNode  = this.$(".error_message");

    this.reset();

    this.model.bind("error", function (model, error) {
      errorMessageNode.html(error);
      errorMessageNode.fadeIn(200);
      input.addClass("error");
    });

    this.model.save({"githubURL": input.val()});
  },

  reset: function () {
    var errorMessageNode = this.$(".error_message");
    this.$(".repository_url_input").removeClass("error");
    errorMessageNode.html("");
    errorMessageNode.hide();
  }

});
