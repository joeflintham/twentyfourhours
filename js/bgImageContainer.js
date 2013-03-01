define(["dojo/_base/declare", "dojo/dom-construct", "dojo/query", "dojo/dom-attr", "dijit/registry"],
	function(declare, domConstruct, query, domAttr, registry){
	
	return declare("24-hours.bgImageContainer", null, {

        listOfBGImages: [],
        curImage: -1,
        nextImage: 0,
        imageToHide: '',
        playing: false,
        
        startup: function(){
            // going to parse children and build image swapper
        
            childNodes = query(".backgroundImagePane").forEach(
                dojo.hitch(
                    this,
                    function(node){
                        w = registry.byNode(node)
                        this.listOfBGImages.push(w);
                        w.inject(this)
                    }
                )
            )
            
            this.hideImages()
            this.init()
        },
        
        hideImages: function(){
            for (key in this.listOfBGImages){
                bgImage = this.listOfBGImages[key];
                if (bgImage.hide) { bgImage.hide() }
            }
        },
        
        init: function(){
            this.triggerTransition()
        },
        
        triggerTransition: function(targetImage){
        
            if (targetImage == this.curImage) { return false; }
            if (this.playing) { return false; }
            
            this.playing = true;
                    
            if (!targetImage) targetImage = this.nextImage;
            if (!targetImage < 0) targetImage = 0;
            
            if (this.curImage > -1){
                this.imageToHide = this.listOfBGImages[this.curImage]
                this.imageToHide.forceBehind();
            } else {
                this.playing = false;
            }
            
            imageToShow = this.listOfBGImages[targetImage];

            this.listOfBGImages[targetImage].sendToFront();
            this.listOfBGImages[targetImage].show({
                callback: dojo.hitch(
                    this,
                    function(){
                        if (this.imageToHide &&
                            this.imageToHide.hide){
                            this.imageToHide.hide()
                            this.playing = false;
                        }
                    }
                    
                    
                )
            });
            
            this.curImage = targetImage;
            this.nextImage = ((targetImage + 1) > this.listOfBGImages.length - 1)? 0 : targetImage + 1;
        
        }
    });
});
