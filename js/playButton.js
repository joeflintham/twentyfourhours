define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "dojo/_base/fx", "24-hours/controllerButton"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, fx, controllerButton){
	
	return declare("24-hours.playButton", controllerButton, {

        audioController: '',
        
		templateString: dojo.cache("24-hours.playButton", "../templates/playbutton.html"),
        
        postCreate: function(){

            if (this.audioController && this.audioController.play) {
    		
                this.inherited(arguments);
    		
    			this.connect(this.playButtonImage, 'onmouseenter', function(e) {
    				this.playButtonImage.style.cursor = "pointer";
    			});
    
    			this.connect(this.playButtonImage, 'onclick', function(e) {
                    this.audioController.play();
                    //this._fadeOut(this.detach)
                    this.detach();
    			});
            }

        },

    });
    
});
