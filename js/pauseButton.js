define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "dojo/_base/fx", "24-hours/controllerButton"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, fx, controllerButton){
	
	return declare("24-hours.pauseButton", controllerButton, {

        audioController: '',
        
		templateString: dojo.cache("24-hours.pauseButton", "../templates/pausebutton.html"),
        
        postCreate: function(){
    		
            if (this.audioController && this.audioController.pause) {

                this.inherited(arguments);

    			this.connect(this.pauseButtonImage, 'onmouseenter', function(e) {
    				this.pauseButtonImage.style.cursor = "pointer";
    			});
    
    			this.connect(this.pauseButtonImage, 'onclick', function(e) {
                    this.audioController.pause();
                    this._fadeOut();
                    //this.detach("pause");
    			});
            }

        },

    });
    
});
