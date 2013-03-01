define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin"],
	function(declare, WidgetBase, TemplatedMixin, template){
	
	return declare("24-hours.baseWidget", [WidgetBase, TemplatedMixin], {
		
		name: '', 
		templateString: dojo.cache("24-hours.baseWidget", "../templates/basewidget.html")
				
	});
}); 