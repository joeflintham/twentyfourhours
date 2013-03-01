define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "24-hours/baseWidget", "24-hours/pauseButton"],
	function(declare, domConstruct, query, domAttr, registry, baseWidget, pauseButton){
	
	return declare("24-hours.mainLink", baseWidget, {

        linkName: '',
        imgSrc: '',
        
		templateString: dojo.cache("24-hours.mainLink", "../templates/mainlink.html"),
        
        postCreate: function(){

            /*

			this.connect(this.domNode, 'onclick', dojo.hitch(this,
			function(e) {
                bgImageDiv = dojo.byId(this.refToImage);
                bgImageObj = registry.byNode(bgImageDiv);
                
                if (bgImageObj
                && bgImageObj.triggerTransition
                ){
                    bgImageObj.triggerTransition(this.imageCounter)
                }
			}));
			*/
        }

    });
});
