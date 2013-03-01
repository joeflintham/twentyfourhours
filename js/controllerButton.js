define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "dojo/_base/fx", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, fx, baseWidget){
	
	return declare("24-hours.pauseButton", baseWidget, {

        audioController: '',
        
		templateString: dojo.cache("24-hours.pauseButton", "../templates/pausebutton.html"),
        
        postCreate: function(){

            this._fadeUp();
    		
            if (this.audioController && this.audioController.pause) {

    			this.connect(this.pauseButtonImage, 'onmouseenter', function(e) {
    				this.pauseButtonImage.style.cursor = "pointer";
    			});
    
    			this.connect(this.pauseButtonImage, 'onclick', function(e) {
                    this.audioController.pause();
                    this._fadeOut();
    			});
            }

        },

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
		
		
		detach: function(){
            dojo.destroy(this.domNode);
		}

    });
    
});
