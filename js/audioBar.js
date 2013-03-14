define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/fx", "dojo/on", "24-hours/baseWidget", "24-hours/pauseButton"],
	function(declare, domConstruct, query, domAttr, registry, domGeom, domStyle, fx, on, baseWidget, pauseButton){
	
	return declare("24-hours.audioBar", baseWidget, {

        audioController: '',
        
		templateString: dojo.cache("24-hours.audioBar", "../templates/audiobar.html"),
		
		postCreate: function(){

            this.createTimer(
                this, 
                "moveCursor",
                100 
            );
		
            HOURS_REGISTER.audioBar = this;
		},
		
		pause: function(){
		  this._fadeOut();
		},
		
		play: function(){

            if (this.myPauseButton) {
                this.myPauseButton._fadeUp();
            } else {
                this.myPauseButton = new pauseButton({audioController: this.audioController}).placeAt(this.pauseButtonNode);      
            }
            this._fadeUp();
            this.attachTimelineIcons();
		},
		
		attachMedia: function(obj){
            if (obj){
                domConstruct.place(obj.domNode, this.mediaNode, "last");
            }
		},
		
		moveCursor: function(){
            percentageElapsed = (this.audioController.audioPlayer.currentTime / this.audioController.audioPlayer.duration);
 //           console.log(this.audioController.audioPlayer.currentTime + " is " + percentageElapsed + "% of " + this.audioController.audioPlayer.duration)
            
            timelineWidth = this.getTimelineWidth();

            cursorPos = (timelineWidth * percentageElapsed) + "px";
            
//            console.log(cursorPos + " : " + timelineWidth + " : " + percentageElapsed)
//            console.log(this.cursorNode)
            domStyle.set(this.cursorNode, "width", cursorPos);

		},
		
		getTimelineWidth: function(){
            return (domGeom.position(this.timelineNode)).w		
		},
		
		queueTimelineIcon: function(obj){
		
            if (!this.iconQueue) { this.iconQueue = new Array; }
            if (!obj) return;
            if (!obj.time) return;

            this.iconQueue.push(obj);

                this._resizer = null;
                on(window, "resize", dojo.hitch(
                    this,
                    function(){
                        if (this._resizer != null) clearTimeout(this._resizer);
                        this._resizer = setTimeout(
                            dojo.hitch(
                                this,
                                "resizeTimeline"
                            )
                        , 500);
                })); 
    

		},
		
		attachTimelineIcons: function(){
            if (this.iconQueue && this.iconQueue.length > 0){
                for (a=0; a < this.iconQueue.length; a++){
                    obj = this.iconQueue[a]

                    objTime = obj.time;
                    percentAlong = this.convertToTime(obj.time) / this.audioController.audioPlayer.duration;
                    percentDuration = (obj.duration / 1000) / this.audioController.audioPlayer.duration;
                    
                    timelineRatio = (42 / this.getTimelineWidth()) * 100;

                    horPos = ((percentAlong * 100) - (timelineRatio)) + "%";
                    iconWidth = (this.getTimelineWidth() * percentDuration) + "px";
                    
                    //console.log(iconWidth + " : " + percentDuration + " : " + percentAlong + " : " + this.getTimelineWidth());
                    
                    if (!obj.placed){
                        domConstruct.place(obj.domNode, this.timelineNode, "last");
                        if (obj.locate) { obj.locate(horPos, iconWidth); }
                        obj._fadeUp()
                    }
                }
            }
		},
		
		resizeTimeline: function(){
            if (this.iconQueue && this.iconQueue.length > 0){
                for (a=0; a < this.iconQueue.length; a++){
                    obj = this.iconQueue[a]
                    obj.placed = false;
                    domConstruct.destroy(obj.domNode);
                }
            } 
            this.attachTimelineIcons();        
		}
        
    });
    
});
