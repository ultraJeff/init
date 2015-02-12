define([
	"spa/templates"
	],
	function(templates){
		var Layout = Backbone.Marionette.LayoutView.extend({
		  template: function(){
			return window.JST["layout.html"];
		  },
		  regions: {
		    menu: "#menu",
		    content: "#content"
		  }
		});
		return Layout;
	});