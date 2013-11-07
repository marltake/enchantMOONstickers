impor://marltake@github.com/marltake/enchantMOONstickers.githttps://marltake@github.com/marltake/enchantMOONstickers.githttps://marltake@github.com/marltake/enchantMOONstickers.gittJS(["lib/MOON.js", "lib/enchant.js", "lib/ui.enchant.js", "lib/color.enchant.js", "lib/stylus.enchant.js", "lib/puppet.enchant.js", "lib/moon.puppet.enchant.js"], function() {
    enchant();
    enchant.puppet.prepareTheatre({
        assets: []
    });
    StickerPuppet.create("シール", {
        behavior: [{
            stickertap: function(event) {
                var p = MOON.getCurrentPage();
                var pj = MOON.getPaperJSON(p.backing);
                var searchArea=function(d,c){
                    var l=d.length-3;
                    if( c==null ){
                        c={min:{x:d[l],y:d[l+1]},max:{x:d[l],y:d[l+1]}};
                        l=l-3;
                    }
                    for(;l>=0;l-=3){
                        if(c.min.x>d[l]){c.min.x=d[l];}
                        if(c.max.x<d[l]){c.max.x=d[l];}
                        if(c.min.y>d[l+1]){c.min.y=d[l+1];}
                        if(c.max.y<d[l+1]){c.max.y=d[l+1];}
                    }
                    return c;
                };
                var c=null;
                for(s in pj.strokes){c=searchArea(pj.strokes[s].data,c);}
                c=[[Math.round(c.min.x),Math.round(c.min.y)],[Math.round(c.max.x),Math.round(c.max.y)]];
                MOON.alert(c,MOON.finish);
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
