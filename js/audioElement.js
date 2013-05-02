define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/fx", "dojo/on", "24-hours/baseWidget"],
	function(declare, domConstruct, query, domAttr, registry, domGeom, domStyle, fx, on, baseWidget){
	
	return declare("24-hours.audioElement", baseWidget, {

        src: '',
        onended: '',
            refToBar: '',

		templateString: dojo.cache("24-hours.audioElement", "../templates/audioelement.html"),
		
		play: function(){
		    if (navigator.userAgent.toLowerCase().indexOf("android") > -1 && (!this.audioElementNode.src)){
			this.audioElementNode.src = this.src + ".mp3";
			if (this.refToBar && this.refToBar.resizeTimeline) { this.refToBar.resizeTimeline(); }
		    }
		    this.audioElementNode.play();
		},

		pause: function(){
            this.audioElementNode.pause();
		},

        movePlayHeadTo: function(targetTime){
            this.audioElementNode.currentTime = targetTime;
        },
        
        getTime: function(){
            return this.audioElementNode.currentTime;
        },

        getDuration: function(){
            return this.audioElementNode.duration;
        }
    });	    
});
