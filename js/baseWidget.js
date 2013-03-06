define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/_base/fx", "dojo/dom-style"],
	function(declare, WidgetBase, TemplatedMixin, fx, domStyle){
	
	return declare("24-hours.baseWidget", [WidgetBase, TemplatedMixin], {
		
		name: '', 
		templateString: dojo.cache("24-hours.baseWidget", "../templates/basewidget.html"),

		_fadeOut: function() {
	
			if (this.mouseAnim) { this.mouseAnim.stop(); }
			
			this.mouseAnim = fx.animateProperty({
				node: this.domNode,
				properties: {
					opacity: 0,
				},
				duration: 1000,
				onEnd: dojo.hitch(
				    this,
				    function(e){
				        this.detach();
				      
				    })
			}).play();
		},

		_fadeUp: function() {
	
			if (this.mouseAnim) { this.mouseAnim.stop(); }
			
			this.mouseAnim = fx.animateProperty({
				node: this.domNode,
				properties: {
					opacity: 1,
				},
				duration: 1000
			}).play();
		},

		hide: function(){
            domStyle.set(this.domNode, "display", "none")
            domStyle.set(this.domNode, "opacity", "0")
		},
		
		show: function(data){
            if (data && data.callback) { this.callback = data.callback }
            domStyle.set(this.domNode, "opacity", "0")
            domStyle.set(this.domNode, "display", "block")
            this.transition("1");
		},
								
	});
}); 