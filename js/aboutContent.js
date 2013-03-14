define(["dojo/_base/declare", "24-hours/contentWidget", "dojo/dom-style", "dojo/_base/fx"],
	function(declare, contentWidget, domStyle, fx){
	
	return declare("24-hours.aboutContent", [contentWidget], {
					
        imgSrc: '',
        imgAlt: '',
        mouseAnim: '',
        imageHandler: '',
        
		templateString: dojo.cache("24-hours.aboutContent", "../templates/aboutcontent.html"),

        postCreate: function(){
            this.inherited(arguments)
            domStyle.set(this.domNode, "display", "none")
        }		
		
	});	
});
