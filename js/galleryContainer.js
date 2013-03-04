define(["dojo/_base/declare", "24-hours/baseWidget", "dojo/dom-style", "dojo/_base/fx"],
	function(declare, baseWidget, domStyle, fx){
	
	return declare("24-hours.galleryContainer", [baseWidget], {
					
        imgSrc: '',
        imgAlt: '',
        mouseAnim: '',
        imageHandler: '',
        
		templateString: dojo.cache("24-hours.galleryContainer", "../templates/gallerycontainer.html"),

        postCreate: function(){
            domStyle.set(this.domNode, "display", "none")
        }		
		
	});	
});
