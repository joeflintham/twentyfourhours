define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "24-hours/baseWidget", "dojox/timing"],
	function(declare, domConstruct, query, domAttr, domStyle, registry, baseWidget, timing){
	
	return declare("24-hours.tw_textBox", baseWidget, {
    
        text: '',
        duration: 5000,
                   
		templateString: dojo.cache("24-hours.tw_textBox", "../templates/tw_textbox.html"),
        
        postCreate: function(){
            
            this.register();
            domStyle.set(this.domNode, "opacity", "0");
            this._fadeUp()

            this.createTimer(
                this, 
                "complete",
                this.duration
            );

            
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
