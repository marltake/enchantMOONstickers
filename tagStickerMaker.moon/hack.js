importJS(["lib/MOON.js", "lib/enchant.js", "lib/ui.enchant.js", "lib/color.enchant.js", "lib/stylus.enchant.js", "lib/puppet.enchant.js", "lib/moon.puppet.enchant.js"], function() {
    enchant();
    enchant.puppet.prepareTheatre({
        assets: []
    });
    StickerPuppet.create("シール", {
        behavior: [{
            stickertap: function(event) {
                var p = MOON.getCurrentPage();
                var pj = MOON.getPaperJSON(p.backing);
                var searchArea=function(d){
                    var l=d.length-3;
                    var c={min:{x:d[l],y:d[l+1]},min:{x:d[l],y:d[l+1]}};
                    for(l=l-3;l>=0;l-=3){
                        if(c.min.x>d[l]){c.min.x=d[l];}
                        if(c.max.x<d[l]){c.max.x=d[l];}
                        if(c.min.y>d[l+1]){c.min.y=d[l+1];}
                        if(c.max.y<d[l+1]){c.max.y=d[l+1];}
                    }
                    return c;
                };
                var areas=[];
                for( st in pj.strokes ){
                    var s="";
                    for(k in st){s=s+" "+k;}
                    MOON.alert(s, MOON.finish);
                //    areas.append(seaerchArea(st.data));
                }
                //var sj0 = MOON.getPaperJSON(p["papers"][0]);
                //var sj1 = MOON.getPaperJSON(p["papers"][1]);
                //sj0["x"] = 0; sj1["x"] = 0;
                //sj0["y"] = 0;
                //MOON.setPaperJSON(p["papers"][0], sj0);
                //sj0["clip"]["data"] = sj0["clip"]["data"].slice(0, 15);
                //sj1["clip"]["data"] = sj1["clip"]["data"].slice(0, 15);
                //sj0["strokes"] = sj0["strokes"].slice(0, 1);
                //sj1["strokes"] = sj1["strokes"].slice(0, 1);
                MOON.alert(areas, MOON.finish);
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
