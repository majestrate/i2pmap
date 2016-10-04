
function getInfo(entry, t) {
  var rank = 0.1;
  var caps = null;
  if(entry && entry.options) {
    var caps = entry.options.caps;
  }
  if (caps) {
    if (caps.indexOf("X") >= 0) rank += 0.5;
    if (caps.indexOf("f") >= 0) rank += 0.75;
    if (caps.indexOf("O") >= 0) rank += 0.3;
  }
  return [rank / 5.0, [entry, t]];
}

var i2patob = function(str) {
  str = str.replace(/-/g, '+').replace(/~/g, '/');
  return atob(str);
}

var i2pmap_run = function (canvas) {
  var globe = DAT.Globe(canvas, {
    imgDir: 'static/',
    colorFn: function(x) {
      var e = x[0];
      var a = x[1];
      var c = new THREE.Color();
      var b = i2patob(e.pubkey);
      var r = b.charCodeAt(0) / 255;
      var g = b.charCodeAt(1) / 255;
      var b = b.charCodeAt(2) / 255;
      c.setRGB(r, g, b);
      return c;
    }
  });

  
  var img = new Image();
	img.src = "static/world.jpg";
	img.onload = function() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "api/netdb.json");
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 ) {
        var data = [];
        console.log("parsing netdb data");
        var netdb = JSON.parse(ajax.responseText);
        for (var idx = 0; idx < netdb.length; idx ++) {
          if (netdb[idx] != null) {
            var e = netdb[idx];
            var addrs  = e.addrs;
            for (var i = 0; i < addrs.length; i++ ) {
              var a = addrs[i];
              if(a.location) {
                var lat = a.location.latitude;
                var lon = a.location.longitude;
                if(lat && lon) {
                  var nfo = getInfo(e, a);
                  data.push(lat, lon, nfo[0], nfo[1]);
                }
              }
            }
          }
        }
        console.log("globe data loaded");
        globe.addData(data, {format: 'legend', name: 'i2p'});
        console.log("creating points");
        globe.createPoints();
        globe.animate();
        console.log("ready");
      }
    }
    console.log("loading netdb data");
    ajax.send();
  }
}
