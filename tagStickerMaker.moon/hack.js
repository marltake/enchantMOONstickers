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
                var xmin=768; var xmax=0;
                var ymin=1024; var ymax=0;
                var st={}; var i=0;
                for( st in pj["strokes"]{
                    for(dt in st['data']){
                        if(i==0){
                            if(dt<xmin){xmin=dt;}
                            if(dt>xmax){xmax=dt;}
                            i=1;
                        }esle if(i==1){
                            if(dt<ymin){ymin=dt;}
                            if(dt>ymax){ymax=dt;}
                            i=2;
                        }else{
                            i=0;
                        }
                    }
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
                MOON.alert("x "+xmin+","+xmax+" y "+ymin+","+ymax",", MOON.finish);
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
