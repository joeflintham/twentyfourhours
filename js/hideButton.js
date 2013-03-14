define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "dojo/_base/fx", "dojo/on", "dojo/mouse", "24-hours/controllerButton"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, fx, on, mouse, controllerButton){
	
	return declare("24-hours.hideButton", controllerButton, {

        audioController: '',
        
		templateString: dojo.cache("24-hours.hideButton", "../templates/hidebutton.html"),
        
        postCreate: function(){
    		
            if (this.audioController && this.audioController.mute) {

                this.inherited(arguments);

    			on(this.hideButtonImage, mouse.enter, dojo.hitch(
                    this,
                    function() {
        				this.hideButtonImage.style.cursor = "pointer";
                        this.audioController.hideAll();
                        //this._fadeOut();
                        //this.detach("pause");
                    })
                );

    			on(this.hideButtonImage, mouse.leave, dojo.hitch(
                    this,
                    function() {

        				this.hideButtonImage.style.cursor = "pointer";
                        this.audioController.unhideAll();
                        //this._fadeOut();
                        //this.detach("pause");
                    })
    			);
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
