define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "dojo/_base/fx", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, fx, baseWidget){
	
	return declare("24-hours.timelineIcon", baseWidget, {

        audioController: '',
        time: '',
        type: '',
        
		templateString: dojo.cache("24-hours.timelineIcon", "../templates/timelineicon.html"),
        
        postCreate: function(){
            domStyle.set(this.domNode, "opacity", "0");
        },
        
        locate: function(pos, width){
            if (pos) domStyle.set(this.domNode, "left", pos);
            if (width) domStyle.set(this.domNode, "width", width);
            this.placed = true;
        }

    });
    
});
