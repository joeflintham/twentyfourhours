define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, registry, baseWidget){
	
	return declare("24-hours.transitionButton", baseWidget, {

        iconSrc: '',
        refToImage: '',
        imageCounter: '',
        
		templateString: dojo.cache("24-hours.transitionButton", "../templates/transitionbutton.html"),
        
        postCreate: function(){            
        
			this.connect(this.domNode, 'onclick', dojo.hitch(this,
			function(e) {
                bgImageDiv = dojo.byId(this.refToImage);
                bgImageObj = registry.byNode(bgImageDiv);
                
                if (bgImageObj
                    && bgImageObj.triggerTransition
                ){
                
                    bgImageObj.triggerTransition(this.imageCounter)
                    if (HOURS_REGISTER.audioPlayer && HOURS_REGISTER.audioPlayer.skipTo){ 
                        HOURS_REGISTER.audioPlayer.skipTo(this.imageCounter)
                    }

                    if (HOURS_REGISTER 
                        && HOURS_REGISTER.contentWidgets){
                    
                        for (a in HOURS_REGISTER.contentWidgets){
                            if (HOURS_REGISTER.contentWidgets[a].deactivate) { HOURS_REGISTER.contentWidgets[a].deactivate(); }
                        }        
                        if (HOURS_REGISTER.contentWidgets.home
                            && HOURS_REGISTER.contentWidgets.home.activate
                        ){
                            HOURS_REGISTER.contentWidgets.home.activate();     
                            HOURS_REGISTER.contentWidgets.home.play()               
                        }
                    }
                }
			}));
        }

    });
});
