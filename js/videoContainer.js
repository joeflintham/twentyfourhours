define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "dojo/dom-geometry", "24-hours/baseWidget", "24-hours/videoBox"],
	function(declare, domConstruct, query, domAttr, domStyle, registry, domGeom, baseWidget, videoBox){
	
	return declare("24-hours.videoContainer", baseWidget, {
    
        videosrc: '',
        videoAttachment: '',
        position: '',
                   
		templateString: dojo.cache("24-hours.videoContainer", "../templates/videocontainer.html"),
        
        postCreate: function(){
                    
            domStyle.set(this.domNode, "opacity", "0");
            this.preload();
            this.play();

        },
                
        preload: function(){
            // to do, open video stream for pre-loading
        },
        
        play: function(){
        
        
            if (this.videoAttachment && this.videoAttachment.play) {
                domStyle.set(this.videoAttachment, "opacity", "1")
                domStyle.set(this.videoAttachment, "display", "auto")
                this.videoAttachment.play();
                return;
            }
            
            videoPosition = this.getPosition();
            videoTop = (videoPosition && videoPosition[0]) ? videoPosition[0] : 0;
            videoLeft = (videoPosition && videoPosition[1]) ? videoPosition[1] : 0;
            
            
            positions = (videoLeft) ? "left: " + videoLeft + ";" : "";
            
            this.videoAttachment = new videoBox({
                    container: this,
                    src: this.videosrc,
                    autoplay: true,
                    class: "videoBox",
                    style: "position: absolute; margin-right: 1px; " + positions,
                }).placeAt(this.videoNode);

            this.register();
            this._fadeUp();
        },
                
        pause: function(){
        
            this.videoAttachment.pause();
            domStyle.set(this.videoAttachment, "opacity", "0.5")
            this.inherited(arguments);
        },
        
        register: function(){

            this.containerPos = domGeom.position(this.domNode);
            if (!HOURS_REGISTER.players){ HOURS_REGISTER.players = []; }
            HOURS_REGISTER.players.push(this);            
        },
        
        returnChain: function(){
            this._fadeOut("detach")
        }
        
    });
});
