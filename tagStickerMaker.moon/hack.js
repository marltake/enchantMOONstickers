importJS(["lib/MOON.js", "lib/enchant.js", "lib/ui.enchant.js", "lib/color.enchant.js", "lib/stylus.enchant.js", "lib/puppet.enchant.js", "lib/moon.puppet.enchant.js"], function() {
    enchant();
    enchant.puppet.prepareTheatre({
        assets: []
    });
    StickerPuppet.create("シール", {
        behavior: [{
            stickertap: function(event) {
                var p = MOON.getCurrentPage();
                var pj = MOON.getPaperJSON(p["backing"]);
		var c={x:768,y:1024,X:0,Y:0};
		for(var i=pj['strokes'].length-1; i>=0; i--){
			var dt=pj['strokes'][i]['data'];
			for(var j=dt.length-3;j>=0;j-=3){
				var x=dt[j];
				var y=dt[j+1];
				if(c['x']>x){c['x']=x;}
				if(c['y']>y){c['y']=y;}
				if(c['X']<x){c['X']=x;}
				if(c['Y']<y){c['Y']=y;}
			}
		}
                MOON.alert(c, MOON.finish);
                enchant.puppet.stopTheatre();
            },
            stickerattach: function(event) {
                enchant.puppet.stopTheatre();
            },
            stickerdetach: function(event) {
                enchant.puppet.stopTheatre();
            }
        }]
    });
});
