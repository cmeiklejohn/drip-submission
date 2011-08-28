var BuildListView = Backbone.View.extend({
  tagName: 'div',
  className: 'builds',

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
    console.log("render list");
    var el = this.el = $(this.el),
        frag = $( $("#build_list_template").html() ),
        latestBuildNode = frag.find(".latest_build"),
        listNode = frag.find(".build_list"),
        latestListNode = listNode.clone();
        
    latestBuildNode.append(latestListNode);

    _.each(this.collection.toArray(), function (build, i) {
      if (i === 0) {
        latestListNode.append(new BuildListItemView({
          model: build
        }).render().el);
        
        return;
      }
      
      listNode.append(new BuildListItemView({
        model: build
      }).render().el);
    });

    el.html(frag);

    return this;
  }

});

var BuildListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'build_list_item',

  events: {"click": "show"},

  initialize: function () {
    _.bindAll(this);
    this.model.bind("change:completed", this.render);
  },

  render: function () {
    console.log("render item");
    var el = this.el = $(this.el);
    el.removeClass("running");
    el.addClass(this.model.status());
    el.html("<span class='build_icon'></span>" + this.model.get("label"));
    return this;
  },

  show: function () {
    appRouter.navigate("/" + this.model.get("repository").ownerName + "/" + this.model.get("repository").name + "/" + this.model.id);
    
    var build = new Build(this.model.attributes);
    new BuildView({model: build});
        
    build.fetch();
  }

});
