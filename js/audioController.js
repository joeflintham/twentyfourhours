define(["dojo/parser", "dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dijit/registry", "dojox/timing", "dojox/json/query", "24-hours/baseWidget", "24-hours/playButton", "24-hours/pauseButton", "24-hours/muteButton", "24-hours/hideButton", "24-hours/tw_textBox", "24-hours/videoContainer", "24-hours/imageContainer", "24-hours/audioBar", "24-hours/contentWidget", "24-hours/timelineIcon"],
	function(parser, declare, domConstruct, query, domAttr, domStyle, registry, timing, dojson, baseWidget, playButton, pauseButton, muteButton, hideButton, tw_textBox, videoContainer, imageContainer, audioBar, contentWidget, timelineIcon){
	
	return declare("24-hours.audioController", contentWidget, {
    
        template: '',
        audiosrc: '',
        sequenceFile: '',
        myPauseButton: '',
        myPlayButton: '',
        audioPlayerData: '',
        sequenceList: '',
        sequenceTimer: '',
        currentSequence: '-1',    
        
		templateString: dojo.cache("24-hours.audioController", "../templates/audiocontroller.html"),
        
        postCreate: function(){
        
            this.inherited(arguments);
            HOURS_REGISTER.audioPlayer = this;
            this.activate();
            sequenceFile = this.sequenceFile;
            if (sequenceFile){
                this.loadJson(sequenceFile);
            }
            
        },
        
        deactivate: function(){
        
            this.inherited(arguments);
            if (this.pause){
                this.pause();
            }
        },
        
        loadJson: function(jsonFile){
        
            if (jsonFile){

			var def = dojo.xhrGet({		
				url: jsonFile,
				handleAs: 'json',
				load: dojo.hitch(		
					this,				
                    "loadData"
				)
			});
                
            }
        },
        
        loadData: function(data){

            if (!data.audioPlayer) return false;
        
            this.audioPlayerData = data.audioPlayer;

            this.sequenceList = this.audioPlayerData.sequence;

            this.currentSequence = 0;
            
            this.nextTrigger = this.convertToTime(this.sequenceList[this.currentSequence].triggerTime);
            
            this.createTimer(
                this, 
                "checkElapsedTime",
                100 
            );
            
            this.createPlayer(data);
            
        },

        createPlayer: function(data){
                    
            audioFile = this.audioPlayerData.audiosrc;

            if (audioFile){

                this.audioPlayer = dojo.create(
                "audio",
                {
                    src: audioFile,
                    style: {
                        visbility: "auto"
                    },
                    onended: dojo.hitch(
                        this,
                        "reset"
                    )
                }
                );
                
                dojo.place(this.audioPlayer, this.audioPlayerNode, "last")

            }
            
            this.pause();
            
            this.audioBar = new audioBar({audioController: this})
            .placeAt(this.audioBarAttachPoint);

            this.preFetch(data);
        },
        
        preFetch: function(data){
        
            /* going to perform some JSONpath queries */
            
            /* giving us triggerTimes for the 'skip to next' functionality */
            
            
            this.triggerTimes = new Array();
            this.transitionTriggerTimes = new Array();
            getTriggers = dojox.json.query('..triggerTime');
            triggerTimes = getTriggers(data);
            
            for (a=0; a<triggerTimes.length; a++) {
                
                triggerTime = triggerTimes[a]
                triggerType = data.audioPlayer.sequence[a].events[0].type;
                triggerDuration = data.audioPlayer.sequence[a].events[0].duration;
                
                showIcon = {
                    transition: true,
                    videoContainer: true,
                    imageContainer: true,
                }
                if (showIcon[triggerType]){
                    var triggerIcon = new timelineIcon({
                        time: triggerTime,
                        type: triggerType,
                        duration: triggerDuration,
                        audioController: this
                    })
                    this.audioBar.queueTimelineIcon(triggerIcon)
                }                

                this.triggerTimes[a] = triggerTime;
                if (triggerType == "transition"){
                    this.transitionTriggerTimes.push(triggerTimes[a]);
                }
            }

            /* and a list of media files we need to start preloading for smooth playback */
            /* to do */            
        },
        
        triggerNextSequence: function(){
        
            if (this.currentSequence >= this.sequenceList.length){
                this.currentSequence = 0;
                this.complete = true;
            }

            if (!this.complete){
                eventArray = this.sequenceList[this.currentSequence].events
                if (eventArray && eventArray.length > 0){
                    for (_event in eventArray){
                        this.triggerEvent(eventArray[_event]);
                    }
                }
                
                this.currentSequence ++;
                nextSequence = this.sequenceList[this.currentSequence];
                if (nextSequence && nextSequence.triggerTime){
                    this.nextTrigger = this.convertToTime(nextSequence.triggerTime)
                }
            }
        },
        
        triggerEvent: function(_event){
        
            console.log(_event)
            if (_event.type == "textBox"){
                this.fireTextBox(_event)
            }
            if (_event.type == "transition"){
                this.fireTransition(_event)
            }
            if (_event.type == "videoContainer"){
                this.fireVideo(_event)
            }
            if (_event.type == "imageContainer"){
                this.fireImage(_event)
            }

        },
        
        fireTextBox: function(obj){

            if (!(obj && obj.text)) { return false; }
            if (!(obj && obj.duration)) { obj.duration = 1000; }
            
            var mytextBox = new tw_textBox({
                text: obj.text,
                duration: obj.duration
            })
            
            .placeAt(dojo.byId("contentHook"));
            
        },
        
        fireTransition: function(obj){

            if (!(obj && obj.bgImage)) { return false; }
            if (!(obj && obj.duration)) { obj.duration = 1000; }

            if (HOURS_REGISTER && HOURS_REGISTER.bgContainer) {
                HOURS_REGISTER.bgContainer.triggerTransition(obj.bgImage, obj.duration);
            }
        },
        
        fireVideo: function(obj){

            if (!(obj && obj.videosrc)) { return false; }
            if (!(obj && obj.position)) { obj.position = '50%,30%'; }

            var myvideoContainer = new videoContainer({
                videosrc: obj.videosrc,
                position: obj.position
            })
            
            this.audioBar.attachMedia(myvideoContainer)
            
        },
        
        fireImage: function(obj){

            if (!(obj && obj.imagesrc)) { return false; }
            if (!(obj && obj.position)) { obj.position = '30%,30%'; }
            if (!(obj && obj.duration)) { obj.duration = 12000; }

            var myimageContainer = new imageContainer({
                imagesrc: obj.imagesrc,
                duration: obj.duration,
                position: obj.position
            })

            this.audioBar.attachMedia(myimageContainer)
            
        },
        
        checkElapsedTime: function(){

            //console.log(this.nextTrigger + " : " + this.audioPlayer.currentTime);
            
            if (this.audioPlayer && this.audioPlayer.currentTime && this.nextTrigger){
                if (this.audioPlayer.currentTime >= this.nextTrigger){
                    this.triggerNextSequence();
                }
            }
        },
        
        play: function(){

            if (this.complete){
                HOURS_REGISTER.bgContainer.triggerTransition(0)          
            }
            
            this.paused = false;
            
            if (this.audioPlayer){

                if (this.audioBar){
                    this.audioBar.play();
                }
                this.audioPlayer.play();

                /*
                if (!this.myMuteButton){
                    this.myMuteButton = new muteButton({audioController: this}).placeAt(
                        dojo.byId('muteButtonAttachPoint')
                    );
                }
                */
                if (!this.myHideButton){
                    this.myHideButton = new hideButton({audioController: this}).placeAt(
                        dojo.byId('hideButtonAttachPoint')
                    );
                }                

                if (HOURS_REGISTER.players && HOURS_REGISTER.players.length > 0){ 
                    for (a in HOURS_REGISTER.players){
                        p = HOURS_REGISTER.players[a];        
                        if (p && p.play) { p.play(); }
                    }
                }
                
                if (this.myPlayButton && this.myPlayButton._fadeOut){
                    this.myPlayButton._fadeOut("detach");
                }
            }

        },
        
        pause: function(){
    
            this.paused = true;
            if (this.audioPlayer){
                if (this.audioBar){
                    this.audioBar.pause();
                }
                if (this.myPlayButton){
                    this.myPlayButton.destroy();
                }
                this.myPlayButton = new playButton({audioController: this}).placeAt(this.domNode);
                this.audioPlayer.pause();

                if (HOURS_REGISTER.players && HOURS_REGISTER.players.length > 0){ 
                    for (a in HOURS_REGISTER.players){
                        p = HOURS_REGISTER.players[a];        
                        if (p && p.pause) { p.pause(); }
                    }
                }
            }
        },
        
        skipTo: function(which){
                
            if (HOURS_REGISTER.players && HOURS_REGISTER.players.length > 0){ 
                for (a in HOURS_REGISTER.players){
                    p = HOURS_REGISTER.players[a];        
                    if (p && p.detach) { p.detach(); }
                }
                HOURS_REGISTER.players = new Array();
            }
        
            targetTime = this.convertToTime(this.transitionTriggerTimes[which]); 

            if (this.audioPlayer) {
                for (a=0; a < this.triggerTimes.length; a++){
                
                    if (which == 0){
                        this.currentSequence = "0";
                        this.nextTrigger = this.convertToTime(this.triggerTimes[0])
                    } else if (this.triggerTimes[a] == this.transitionTriggerTimes[which]){
                        this.currentSequence = a;
                        this.nextTrigger = this.convertToTime(this.triggerTimes[which])
                    }
                }
                this.audioPlayer.currentTime = targetTime;
                this.play();
            }
            
        },
        
        hide: function(){
            domStyle.set(this.domNode, "display", "none");
        },
        
        hideAll: function(){
            this._fadeOut("mainMenu");
            this._fadeOut("daytimeIcons");
            this._fadeOut();
        },
        
        unhideAll: function(){
            this._fadeUp("mainMenu");
            this._fadeUp("daytimeIcons");
            this._fadeUp();
        },
        
        show: function(){
            domStyle.set(this.domNode, "display", "auto");
            this.pause();
        },
        
        reset: function(){
            this.pause();
            HOURS_REGISTER.contentWidgets["about"].activate();                    
        }, 
        
        mute: function(){
        }, 
        
        unmute: function(){
        }
    });
});
