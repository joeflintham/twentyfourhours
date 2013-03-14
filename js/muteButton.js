define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "dojo/_base/fx", "24-hours/controllerButton"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, fx, controllerButton){
	
	return declare("24-hours.muteButton", controllerButton, {

        audioController: '',
        
		templateString: dojo.cache("24-hours.muteButton", "../templates/mutebutton.html"),
        
        postCreate: function(){
    		
            if (this.audioController && this.audioController.mute) {

                this.inherited(arguments);

    			this.connect(this.muteButtonImage, 'onmouseenter', function(e) {
    				this.muteButtonImage.style.cursor = "pointer";
                    this.audioController.mute();
                    //this._fadeOut();
                    //this.detach("pause");
    			});

    			this.connect(this.muteButtonImage, 'onmouseleave', function(e) {
    				this.muteButtonImage.style.cursor = "pointer";
                    this.audioController.unmute();
                    //this._fadeOut();
                    //this.detach("pause");
    			});
            }

        },

		play: function(){
            this._fadeUp();
		},
		
		pause: function(){
            this._fadeOut();
		},
		

    });
    
});
