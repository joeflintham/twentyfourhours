define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, baseWidget){
	
	return declare("24-hours.pauseButton", baseWidget, {

        audioController: '',
        
		templateString: dojo.cache("24-hours.pauseButton", "../templates/pausebutton.html"),
        
        postCreate: function(){

            this._fadeUp();
    		
        }
		
    });
    
});
