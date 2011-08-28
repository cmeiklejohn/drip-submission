var BuildView = Backbone.View.extend({
    
  tagName: 'div',
  className: 'pane build_details',

  initialize: function () {
    _.bindAll(this);
    this.model.bind("change:output", this.render);
  },

  render: function () {
    console.log("render thing");
    this.el = $(this.el);
    var tmpl = $(_.template($("#build_view_template").html(), {
          label: this.model.get("label"),
          output: this.parsedOutput(),
          branch: this.model.get("branch")
        })),
        pane = $(".pane.build_details");

    tmpl.find(".build_result").addClass(this.model.status());

    this.el.html(tmpl);

    if (pane.length > 0) {
      pane.replaceWith(this.el);
    }
    else {
      $(".pane").append(this.el);
    }

    var objDiv = $(".build_output").get(0);
    objDiv.scrollTop = objDiv.scrollHeight;
    

    return this;
  },
  
  parsedOutput: function() {
    // TODO: parse ansi sequences
    return this.model.get("output").replace(/\n/g,'<br>').replace(/\033\[[0-9;]*m/g,"").replace(/✓/g, "<span class='green'>✓</span>");
  }

});
