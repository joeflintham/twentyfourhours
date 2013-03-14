define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/_base/fx", "dojo/dom-style", "dojo/dom-geometry", "dojox/timing"],
	function(declare, WidgetBase, TemplatedMixin, fx, domStyle, domGeom, timing){
	
	return declare("24-hours.baseWidget", [WidgetBase, TemplatedMixin], {
		
		name: '', 
		
		templateString: dojo.cache("24-hours.baseWidget", "../templates/basewidget.html"),

        createTimer: function(caller, func, duration){

            if (!(caller && caller[func])) { return false; }
            if (!duration) { duration = 1000; }
            
            this.sequenceTimer = new timing.Timer(duration);
            this.sequenceTimer.onTick = dojo.hitch(
                this,
                dojo.hitch(
                    caller,
                    caller[func]
                )
            );
            this.sequenceTimer.start();
        
        },
        
		_fadeOut: function(func) {
	
            domNode = this.domNode;
            if (func && !(func == "detach")){
                domNode = func;
            }
			//if (this.mouseAnim) { this.mouseAnim.stop(); }
			
			this.mouseAnim = fx.animateProperty({
				node: domNode,
				properties: {
					opacity: 0,
				},
				duration: 1000,
				onEnd: dojo.hitch(
                    this,
                    function(){ if (func == "detach") { this.detach() } }
				)
			}).play();
			return this
		},

		_fadeUp: function(func) {

            domNode = this.domNode;
            if (func && !(func == "detach")){
                domNode = func;
            }
	
			//if (this.mouseAnim) { this.mouseAnim.stop(); }
			
			
			this.mouseAnim = fx.animateProperty({
				node: domNode,
				properties: {
					opacity: 1,
				},
				duration: 1000
			}).play();
		},

		hide: function(){
            domStyle.set(this.domNode, "display", "none")
            domStyle.set(this.domNode, "opacity", "0")
		},
		
		show: function(data){
            if (data && data.callback) { this.callback = data.callback }
            domStyle.set(this.domNode, "opacity", "0")
            domStyle.set(this.domNode, "display", "block")
            this.transition("1");
		},
		
		detach: function(){
            dojo.destroy(this.domNode);
		},	
		
		pause: function(){
            if (this.sequenceTimer) {
                this.sequenceTimer.stop();
                domStyle.set(this.domNode, "opacity", "0.5")
            }
		},

		play: function(){
            if (this.sequenceTimer) {
                this.sequenceTimer.start();
                domStyle.set(this.domNode, "opacity", "1")
            }
		},

        checkPosition: function(){
            videoComputedWidth = domGeom.position(this.domNode);
            console.log(videoComputedWidth);
        },

        returnChain: function(){
        },

        getPosition: function(pos){
            positions = {};
            position = '';
            if (this.position) position = this.position;
            if (pos) position = pos;
            if (position) {
                positions = this.position.split(",");
            }
            return positions
        },

        convertToTime: function(timeString){

            if (!timeString) return 0;
            msArray = timeString.split(".")
            milliseconds = msArray.pop()
            timeArray = (msArray.shift()).split(":")

            seconds = (timeArray.length > 0) ? parseInt(timeArray.pop()) : 0;
            minutes = (timeArray.length > 0) ? parseInt(timeArray.pop()) : 0;
            hours = (timeArray.length > 0) ? parseInt(timeArray.pop()) : 0;

            totalSeconds = (
                (
                    (minutes * 60)
                    +
                    seconds
                )
            )

            return totalSeconds; 
        }
                
	});
}); 