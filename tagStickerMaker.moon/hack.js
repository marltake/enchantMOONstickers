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
		var c=[[768,1024][0,0]];
		//var buf="";
		//for(st in pj['strokes']){ buf+=(" "+st['data'].length); }
                MOON.alert(pj['strokes'][0]['data'].slice(0,6), MOON.finish);
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
