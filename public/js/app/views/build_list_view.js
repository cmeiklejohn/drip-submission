var BuildListView = Backbone.View.extend({
  tagName: 'div',
  className: 'builds',

  initialize: function () {
    _.bindAll(this);
  },

  render: function () {
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
  },

  render: function () {
    var el = this.el = $(this.el);
    var stateClass = (this.model.get("completed") ? (this.model.get("successful") ? "success" : "failure") : (this.model.get("running") ? "running" : "unknown"));
    el.addClass(stateClass);
    el.html(this.model.get("receivedAt"));
    return this;
  },

  show: function () {
    appRouter.navigate("/" + this.model.get("ownerName") + "/" + this.model.get("name") + "/" + this.model.id);
    
    var build = new Build(this.model.attributes);
    new BuildView({model: build});
        
    build.fetch({success: function () {
      build.trigger("change");
    }});
  }

});
