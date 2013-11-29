importJS(["lib/MOON.js", "lib/enchant.js"], function() {
    enchant();

    var Font_strokes = [];
    Font_strokes['0'] = [{data:[2,0,1, 6,0,1, 7,1,1, 7,6,1, 6,7,1, 2,7,1, 1,6,1, 1,1,1, 2,0,1]}];
    Font_strokes['1'] = [{data:[3,1,1, 4,0,1, 4,7,1]},{data:[3,7,1, 5,7,1]}];
    Font_strokes['2'] = [{data:[1,2,1, 1,1,1, 2,0,1, 6,0,1, 7,1,1, 7,2,1, 1,7,1, 7,7,1]}];
    Font_strokes['3'] = [{data:[1,2,1, 1,1,1, 2,0,1, 6,0,1, 7,1,1, 7,2,1, 6,3,1, 5,3,1, 7,5,1, 7,6,1, 6,7,1, 2,7,1, 1,6,1, 1,5,1]}];
    Font_strokes['4'] = [{data:[5,7,1, 5,0,1, 1,6,1, 7,6,1]}];
    Font_strokes['5'] = [{data:[7,0,1, 1,0,1, 1,3,1, 6,3,1, 7,4,1, 7,6,1, 6,7,1, 2,7,1, 1,6,1, 1,5,1]}];
    Font_strokes['6'] = [{data:[7,2,1, 7,1,1, 6,0,1, 2,0,1, 1,1,1, 1,6,1, 2,7,1, 6,7,1, 7,6,1, 7,5,1, 6,4,1, 1,4,1]}];
    Font_strokes['7'] = [{data:[1,1,1, 1,0,1, 7,0,1, 7,1,1, 4,7,1]}];
    Font_strokes['8'] = [{data:[2,3,1, 1,2,1, 1,1,1, 2,0,1, 6,0,1, 7,1,1, 7,2,1, 6,3,1, 2,3,1, 1,4,1, 1,6,1, 2,7,1, 6,7,1, 7,6,1, 7,4,1, 6,3,1]}];
    Font_strokes['9'] = [{data:[7,3,1, 2,3,1, 1,2,1, 1,1,1, 2,0,1, 6,0,1, 7,1,1, 7,6,1, 6,7,1, 2,7,1, 1,6,1, 1,5,1]}];
    Font_strokes['/'] = [{data:[7,0,1, 1,7,1]}];
    Font_strokes[':'] = [{data:[3,1,1, 4,1,1, 4,2,1, 3,2,1, 3,1,1]}, {data:[3,5,1, 4,5,1, 4,6,1, 4,5,1, 3,5,1]}];

	//　サンプルの暗号化シールから流用
    function setBackingData(jsonString) {
        var page = MOON.getCurrentPage();
        return MOON.setPaperJSON(page.backing, jsonString);
    }

    //　サンプルの暗号化シールから流用
    function getBackingData() {
        var page = MOON.getCurrentPage();
        return MOON.getPaperJSON(page.backing);
    }

    //　サンプルの暗号化シールから流用
    function alertThenFinish(message) {
        MOON.alert(message, function() {
            MOON.finish();
        });
    }

	function rgba2int(r, g, b, a) {
            return ((a << 24) | (r << 16) | (g << 8) | (b << 0)) | 0;
    }

	function getPageID() {
		var relURL = window.location.getAbsoluteURL("").split("/Data/")[1];
		return relURL.split( "/" )[1];
	}

	function getStickerID() {
		var relURL = window.location.getAbsoluteURL("").split("/Data/")[1];
		return relURL.split( "/" )[2];
	}

	function getRect(strokes) {
		var minX = 1024, minY = 768;
		var maxX = 0, maxY = 0;
		for (var i = 0; i < strokes.length; i++) {
			var data = strokes[i].data;
			for (var j = 0; j < data.length; j+=3) {
				minX = Math.min(minX, data[j]);
				maxX = Math.max(maxX, data[j]);
				minY = Math.min(minY, data[j+1]);
				maxY = Math.max(maxY, data[j+1]);
			}
		}
		return {"x":minX, "y":minY, "width":(maxX-minX), "height":(maxY-minY)};
	}

	function draw_char(x, y, ch, col, size, penWidth) {
		var outStrokes = [];
		var fontStrokes = Font_strokes[ch];
		for (var i=0; i<fontStrokes.length; i++) {
			var fontStroke = fontStrokes[i];
			var oneStroke = {"width":penWidth,"color":col,"type":"pen","data":[]};
			for (var j=0; j<fontStroke.data.length/3; j++) {
				var index = j * 3;
				oneStroke.data.push(fontStroke.data[index+0] * size[0] / 8 + x);
				oneStroke.data.push(fontStroke.data[index+1] * size[1] / 8 + y);
				oneStroke.data.push(fontStroke.data[index+2]);
			}
			outStrokes.push(oneStroke);
		}
		return outStrokes
	}

    function draw_string(aX, aY, str, col, size, penWidth) {
        var strokes = [];
		var x = aX;
		var y = aY;
		for (var i=0, l=str.length; i<l; i++) {
			var ch = str.charAt(i);
			if (ch == '\n') {
				x = aX;
				y += size[1];
				continue;
			} else if (ch != ' ') {
				strokes = strokes.concat(draw_char(x, y, ch, col, size, penWidth));
			}
			x += size[0];
        }
		return strokes;
	}

	function setDateStroke(destID) {
		var margin = 10;
		var penC = rgba2int(255, 255, 255, 255);
		var penW = 2;
		var size = [12, 24];
		var d = new Date();
		var dateStr = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() ;
		var timeStr = d.getHours() + ":";
		if (d.getMinutes() < 10) {
			timeStr += "0";
		}
		timeStr += d.getMinutes();
		var str = dateStr + " " + timeStr;
		var srcStrokes = draw_string(margin, margin, str, penC, size, penW);
/*
		var wakuW = size[0]*10+margin*2;
		var wakuH = size[1]+margin*2;
		srcStrokes.push({"width":penW,"color":penC,"type":"pen","data":[0,0,1, wakuW,0,1, wakuW,wakuH,1, 0,wakuH,1, 0,0,1]});
*/

		var dest = MOON.getPaperJSON(destID);
		dest.strokes = srcStrokes
		var w = size[0]*16 + margin*2;
		var h = size[1] + margin*2;
		dest.clip = {"width":5.0, "color":-1, "type":"pen", "data":[0,0,1.0, w,0,1.0, w,h,1.0, 0,h,1.0, 0,0,1.0]};
		dest.width = w;
		dest.height = h;
		MOON.setPaperJSON(destID, dest);
	}

    var sticker = Sticker.create();
    sticker.onattach = function() {
		var paperID = MOON.getCurrentPage().backing;
		var stickerID = getStickerID();
		setDateStroke(stickerID);
        MOON.finish();
    };
    sticker.ondetach = function() {
        MOON.finish();
    };
    sticker.ontap = function() {
        var searchPageTag = function(str){
            str="function matches(j){for(k in j){if(k.matches(/"+str+"/) && j[k]>0){return true;}}return false;}";
            MOON.searchStorage(str);MOON.finish();
            };
        MOON.penPrompt("search pattern","^2003",{fieldLength:16,fieldSize:56,inputType:"any"},searchPageTag(str));
        MOON.finish();
    };
    sticker.register();
});
