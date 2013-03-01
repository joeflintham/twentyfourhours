define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "24-hours/baseWidget", "24-hours/playButton", "24-hours/pauseButton"],
	function(declare, domConstruct, query, domAttr, registry, baseWidget, playButton, pauseButton){
	
	return declare("24-hours.audioController", baseWidget, {
    
        audiosrc: '',
            
		templateString: dojo.cache("24-hours.audioController", "../templates/audiocontroller.html"),
        
        postCreate: function(){
            
            if (this.audiosrc){
                this.audioPlayer = dojo.create(
                "audio",
                {
                    src: this.audiosrc,
                    style: {
                        visbility: "auto"
                    }
                }
                );
                
                dojo.place(this.audioPlayer, this.audioPlayerNode, "last")
            }
            
            this.pause();
            
        },
        
        play: function(){

            if (this.audioPlayer){
                pauseAttachPoint = dojo.byId('pauseButtonContainer');
                var pButton = new pauseButton({audioController: this}).placeAt(pauseAttachPoint);
                this.audioPlayer.play();
            }

        },
        
        pause: function(){
    
            if (this.audioPlayer){
               var pButton = new playButton({audioController: this}).placeAt(this.domNode);
               this.audioPlayer.pause();
            }
        }
    });
});
