<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"/>
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="map" style="height: 500px; width: 500px"></div>
    <script>
      var map = L.map('map', {attributionControl: false}).setView([39.635113, 118.175393], 8);
      // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //     maxZoom: 19,
      //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      // }).addTo(map);
    //   var url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
    //   var url = "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" 
      var url = "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" 
      L.tileLayer(url, {
        maxZoom: 18
      }).addTo(map)

      var marker = L.marker([39.635113, 118.175393]).addTo(map);

    //   var circle = L.circle([29.16175, 112.40661], 
    //                         {
    //                           color: 'red',
    //                           fillColor: '#f03',
    //                           fillOpacity: 0.5,
    //                           radius: 10000 // 半径 单位m
    //                         }).addTo(map);

    //   var polygon = L.polygon([
    //     [29.22409, 113.21960],
    //     [28.80135, 112.87902],
    //     [28.74358, 113.543701]
    //   ]).addTo(map);


      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    //   circle.bindPopup("I am a circle.");
    //   polygon.bindPopup("I am a polygon.");

      var popup = L.popup();

      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }

      map.on('click', onMapClick);
    </script>
  </body>
</html>
