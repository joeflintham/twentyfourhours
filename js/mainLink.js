define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "24-hours/baseWidget", "24-hours/pauseButton"],
	function(declare, domConstruct, query, domAttr, domStyle, registry, baseWidget, pauseButton){
	
	return declare("24-hours.mainLink", baseWidget, {

        linkName: '',
        imgSrc: '',
        clickFunction: '',
        
		templateString: dojo.cache("24-hours.mainLink", "../templates/mainlink.html"),
        
        postCreate: function(){

            /*
			this.connect(this.domNode, 'onclick', dojo.hitch(this,
			function(e) {
                if (this.clickFunction == 'loadHome'){ this.loadHome(); }
                else if (this.clickFunction == 'loadAbout'){ this.loadAbout(); }
                else if (this.clickFunction == 'loadGallery'){ this.loadGallery(); }
			}));
            */
        },
        
        loadHome: function(){
            audioController = this.getAudioController();
            audioController.play();
        },

        loadAbout: function(){
            alert("loading Home");        
        },

        loadGallery: function(){
            audioController = this.getAudioController();
            audioController.pause();
        },
        
        getAudioController: function(){
            audioControllerNode = dojo.query('.audioController')[0];
            audioController = registry.byNode(audioControllerNode);
            return audioController;
        }


    });
});
