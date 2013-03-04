define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "24-hours/baseWidget", "24-hours/playButton", "24-hours/pauseButton"],
	function(declare, domConstruct, query, domAttr, domStyle, registry, baseWidget, playButton, pauseButton){
	
	return declare("24-hours.audioController", baseWidget, {
    
        audiosrc: '',
        myPauseButton: '',
        myPlayButton: '',
            
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
                if (!this.myPauseButton){
                    pauseAttachPoint = dojo.byId('pauseButtonContainer');
                    this.myPauseButton = new pauseButton({audioController: this}).placeAt(pauseAttachPoint);
                }
                this.audioPlayer.play();
            }

        },
        
        pause: function(){
    
            if (this.audioPlayer){
                if (this.myPauseButton) {dojo.destroy(this.myPauseButton); this.myPauseButton = '';}
               this.playButton = new playButton({audioController: this}).placeAt(this.domNode);
               this.audioPlayer.pause();
            }
        },
        
        hide: function(){
            domStyle.set(this.domNode, "display", "none");
        },
        
        show: function(){
            domStyle.set(this.domNode, "display", "auto");
            this.pause();
        }
    });
});
