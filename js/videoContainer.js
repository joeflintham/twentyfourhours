define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, domStyle, registry, baseWidget){
	
	return declare("24-hours.videoContainer", baseWidget, {
    
        videosrc: '',
        videoAttachment: '',
        position: '',
                   
		templateString: dojo.cache("24-hours.videoContainer", "../templates/videocontainer.html"),
        
        postCreate: function(){
                    
            this.setStyles();
            this.preload();
            this.play();
        },
        
        setStyles: function(){

            domStyle.set(this.domNode, "position", "absolute");
            domStyle.set(this.domNode, "opacity", "0");
            domStyle.set(this.domNode, "top", "100");
            positions = this.getPosition();
            t = positions[0];
            l = positions[1];
            domStyle.set(this.domNode, "left", l);
            
        },
        
        getPosition: function(){
            positions = this.position.split(",");
            return positions
        },
        
        preload: function(){
            // to do, open video stream for pre-loading
        },
        
        play: function(){
            this.videoAttachment = domConstruct.create(
            "video",
                {
                    src: this.videosrc,
                    autoplay: true,
                }
            );
            
            dojo.place(this.videoAttachment, this.videoNode, "last");
            this._fadeUp()
            
        }
        
    });
});
