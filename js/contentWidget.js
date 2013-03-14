define(["dojo/_base/declare", "24-hours/baseWidget", "dojo/dom-style", "dojo/_base/fx"],
	function(declare, baseWidget, domStyle, fx){
	
	return declare("24-hours.contentWidget", [baseWidget], {
					
        template: '',
            
		templateString: dojo.cache("24-hours.contentWidget", "../templates/contentwidget.html"),

        activate: function(){
            if (HOURS_REGISTER && HOURS_REGISTER.contentWidgets){
                for (a in HOURS_REGISTER.contentWidgets){
                    if (HOURS_REGISTER.contentWidgets[a].deactivate) { HOURS_REGISTER.contentWidgets[a].deactivate(); }
                }        
            }
            
            domStyle.set(this.domNode, "opacity", "0");
            domStyle.set(this.domNode, "display", "block");
            //domStyle.set(this.domNode, "z-index", "5001");
            this._fadeUp();
        },
        
        deactivate: function(){
            
            //domStyle.set(this.domNode, "z-index", "5000");
            domStyle.set(this.domNode, "display", "none");
        },
        
        postCreate: function(){ 

            if (!HOURS_REGISTER){ HOURS_REGISTER = {}; }
            if (!HOURS_REGISTER.contentWidgets){ HOURS_REGISTER.contentWidgets = {}; }
            if (!this.template) { this.template = ''; }
            HOURS_REGISTER.contentWidgets[this.template] = this;

            domStyle.set(this.domNode, "display", "none")
        }		
		
	});	
});
