var AddRepositoryView = Backbone.View.extend({

  tagName: "div",
  className: "add_repository",

  events: {
    "click .button.add": "addRepository"
  },

  render: function () {
    $(this.el).html(_.template($("#add_repository_tmpl").html()));
    return this;
  },

  addRepository: function () {
    var repository = new Repository({
    });

    repository.save();
  }

});
