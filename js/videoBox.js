define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-style", "dojo/_base/fx", "dojo/dom-geometry", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, registry, domStyle, fx, domGeom, baseWidget){
	
	return declare("24-hours.videoBox", baseWidget, {

        container: '',
        src: '',
        autoplay: true,
        class: "videoBox",
        onended: '',                            
		templateString: dojo.cache("24-hours.videoBox", "../templates/videobox.html"),
		
		postCreate: function(){
            this.connect(this.videoElement, "onended", 
                dojo.hitch(
                    this,
                    "_fadeOut"
                )
            );
		},
		
		_fadeOut: function(){
            if (this.container && this.container.returnChain){
                this.container.returnChain()
            }
		}
    });
    
});
