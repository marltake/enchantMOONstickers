function wrtCnv(str){
if(localStorage[sid]!=str){
localStorage[sid]=str;
var cnv = document.createElement("canvas");
var ctx = cnv.getContext("2d");
cnv.width = str.length*32;
cnv.height = 48 ;
ctx.strokeStyle = '#555555';
ctx.font="32px Futura";
var res = MOON.int2rgba(MOON.getDefaultPenColorBW());
ctx.fontStyle="rgb("+res[0]+","+res[1]+","+res[2]+")";
ctx.fillText(str,0,32,str.length*32);
sinf.width = cnv.width;
sinf.height = cnv.height;
var bg = MOON.saveImage(cnv);
sinf.image = bg;
MOON.setPaperJSON(sid, sinf);
}MOON.finish();}
