define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "24-hours/baseWidget", "24-hours/pauseButton"],
	function(declare, domConstruct, query, domAttr, domStyle, registry, baseWidget, pauseButton){
	
	return declare("24-hours.mainLink", baseWidget, {

        linkName: '',
        imgSrc: '',
        refToContent: '',
        
		templateString: dojo.cache("24-hours.mainLink", "../templates/mainlink.html"),
        
        postCreate: function(){

			this.connect(this.domNode, 'onclick', dojo.hitch(this,
			function(e) {

                if (HOURS_REGISTER 
                    && HOURS_REGISTER.contentWidgets 
                    && HOURS_REGISTER.contentWidgets[this.refToContent]
                    && HOURS_REGISTER.contentWidgets[this.refToContent].activate
                ){
                    HOURS_REGISTER.contentWidgets[this.refToContent].activate();                    
                }
			}));
        },
                
        getAudioController: function(){
            audioControllerNode = dojo.query('.audioController')[0];
            audioController = registry.byNode(audioControllerNode);
            return audioController;
        }


    });
});
