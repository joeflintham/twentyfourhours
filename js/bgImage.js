define(["dojo/_base/declare", "24-hours/baseWidget", "dojo/dom-style", "dojo/_base/fx"],
	function(declare, baseWidget, domStyle, fx){
	
	return declare("24-hours.bgImage", [baseWidget], {
					
        imgSrc: '',
        imgAlt: '',
        mouseAnim: '',
        imageHandler: '',
        
		templateString: dojo.cache("24-hours.bgImage", "../templates/bgimage.html"),
		
		inject: function(caller){
            this.imageHandler = caller;
		},
		
		triggerTransition: function(imageCounter){
			if (this.imageHandler && 
			    this.imageHandler.triggerTransition){
			        
			        this.imageHandler.triggerTransition(imageCounter)
			    }
		},
		
		transition: function(targetOpacity) { 	
	
			if (this.mouseAnim) { 
                this.mouseAnim.stop();
                if (this.imageHandler && this.imageHandler.stop) {
                    this.imageHandler.stop()
                } 
            }
			this.mouseAnim = fx.animateProperty({
				node: this.domNode,
				properties: {
					opacity: targetOpacity,
				},
				duration: 1000,
				onEnd: dojo.hitch(this, function() {
					this.mouseAnim = null;
					if (this.callback) this.callback()
				})
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
		
		forceBehind: function(){
            domStyle.set(this.domNode, "z-index", "1")
		},
		
		sendToFront: function(){
            domStyle.set(this.domNode, "z-index", "99")
		
		}
		
	});	
});
