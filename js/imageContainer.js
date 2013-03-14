define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, domStyle, registry, baseWidget){
	
	return declare("24-hours.imageContainer", baseWidget, {
    
        imagesrc: '',
        altText: '',
        position: '100,100',
        duration: '',
                   
		templateString: dojo.cache("24-hours.imageContainer", "../templates/imagecontainer.html"),
        
        postCreate: function(){
                    
            imageposition = this.getPosition();
            domStyle.set(this.domNode, "position", "relative");
            domStyle.set(this.domNode, "z-index", "5004");
            domStyle.set(this.domNode, "top", imageposition[0]);
            domStyle.set(this.domNode, "left", imageposition[1]);
            domStyle.set(this.domNode, "opacity", "0");
            this.register();
            this._fadeUp();

            this.createTimer(
                this, 
                "complete",
                this.duration
            );


        },
                
        play: function(){
            domStyle.set(this.domNode, "opacity", "1")            
            this.inherited(arguments);
        },
        
        pause: function(){
        
            domStyle.set(this.domNode, "opacity", "0.5")
            this.inherited(arguments);
        },

        register: function(){
            if (!HOURS_REGISTER.players){ HOURS_REGISTER.players = []; }
            HOURS_REGISTER.players.push(this);            
        },

        complete: function(){
            this._fadeOut("detach");
        }
        
    });
});
