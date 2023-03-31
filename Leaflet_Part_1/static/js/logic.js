var myMap = L.map("map", {
    //corrdinates found by googling lat and long of center of usa
    center: [39.8283, -98.5795],
    zoom: 5
});

var normalmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Terrain = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'", {
    attribution:'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
});

normalmap.addTo(myMap);

//will add menu bar
var baseMaps = {
    "Terrain": Terrain,
    "Global View": normalmap,
  
  };

  //
  var tectonicplates = new L.LayerGroup();
  var earthquakes = new L.LayerGroup();
  
  var overlays = {
    "Tectonic Plates": tectonicplates,
    "Earthquakes": earthquakes
  };
  
  L.control.layers(baseMaps, overlays).addTo(myMap);

  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  d3.json(url).then(function (data){


        function marker_color(x) {
            if (x > 50 ) {
              return  color = "#FF4500";
            }
            else if (x > 25) {
               return color = "#FFA500";
            }
            else if (x > 10) {
               return color = "#FFD700";
            }
            else {
               return color = "#ADFF2F";
            };
        };
    
    
      function getRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
        };
        return magnitude * 5;
      };
    
      L.geoJson(data, {
        
        pointToLayer: function (x, y) {
       return L.circleMarker(y, {
        opacity: 1,
        fillOpacity: .5,
        color: marker_color(x.geometry.coordinates[2]),
        radius: getRadius(x.properties.mag),
        stroke: true,
        weight: 1
       });
     },

         onEachFeature: function (x, y) {
       y.bindPopup(
         "Magnitude: "
         + x.properties.mag
         + "<br>Depth: "
         + x.geometry.coordinates[2]
         + "<br>Location: "
         + x.properties.place
         + "<br>Tsunami: "
         + x.properties.tsunami
         + "<br>url: "
         + x.properties.url
       );
     }
    
   }).addTo(earthquakes);
 

earthquakes.addTo(myMap);

    var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    //var limits = geojson.options.limits;
    var colors = [
          "#ADFF2F",
          "#FFD700",
          "#FFA500",
          "#FF4500",
        ];
    var labels = [-10, 10, 25, 50];

   
    var legendInfo = "<h1>Depth of Earthquake</h1>" ;
      "<div class=\"labels\">" +
      "</div>";

    div.innerHTML = legendInfo;

    for (var i = 0; i < labels.length; i++) {
              div.innerHTML += "<i style='background: "
                + colors[i]
                + "'></i> "
                + labels[i]
                + (labels[i + 1] ? "&ndash;" + labels[i + 1] + "<br>" : "+");
          };
    

    //div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);

    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (x) {
        L.geoJson(x, {
        color: "green",
        weight: 2
      })
        .addTo(tectonicplates);
  
    
    });
  
  });
   


  // var features = data.features;
  // let geometry = features.map(function (x) {
  //     return x.geometry;
  // });
  // console.log("geometry");
  // console.log(geometry);
  // let coordinates = geometry.map(function (x) {
  //     return x.coordinates;
  // });
  // console.log(coordinates);
  // var depth = []
  // let properties = features.map(function (x) {
  //     return x.properties;
  // });
  // console.log(properties);
  // let mag = properties.map(function (x) {
  //     return x.mag;
  // });
  // console.log("mag")
  // console.log(mag);
  // var lat = []
  // var lon = []
  
  // for (var i = 0; i < mag.length; i++) {
  //     let x = coordinates[i];
  //     depth.push(x[2]);
  //     lat.push(x[0]);
  //     lon.push(x[1]);
  // };

   // function styleGraph(feature) {
    //     return {
    //       opacity: 1,
    //       fillOpacity: 1,
    //       //fillColor: marker_color(feature.geometry.coordinates[2]),
    //       color: marker_color(feature.geometry.coordinates[2]),
    //       radius: getRadius(feature.properties.mag),
    //       stroke: true,
    //       weight: 0.5
    //     };
    //   };

// d3.json(url).then(function (data) {
//     // Once we get a response, send the data.features object to the createFeatures function.
//     console.log(data);
//     var features = data.features;
//     let geometry = features.map(function (x) {
//         return x.geometry;
//     });
//     console.log("geometry");
//     console.log(geometry);
//     let coordinates = geometry.map(function (x) {
//         return x.coordinates;
//     });
//     console.log(coordinates);
//     var depth = []
//     let properties = features.map(function (x) {
//         return x.properties;
//     });
//     console.log(properties);
//     let mag = properties.map(function (x) {
//         return x.mag;
//     });
//     console.log("mag")
//     console.log(mag);
//     var lat = []
//     var lon = []
    
//     for (var i = 0; i < mag.length; i++) {
//         let x = coordinates[i];
//         depth.push(x[2]);
//         lat.push(x[0]);
//         lon.push(x[1]);
//     };

//     console.log("lat");
//     console.log(lat[0]);


//     function marker_color(x) {
//         for (let i = 0; i < x.length; i++) {
//             var color = "";
//             if (x[i] > 20) {
//                 color = "red";
//             }
//             else if (x[i] > 7) {
//                 color = "orange";
//             }
//             else if (x[i] > 0) {
//                 color = "yellow";
//             }
//             else {
//                 color = "green";
//             };
//         };
//     };
//     function marker_size(x) {
//         return x * 500;
//     };
//     for (var i = 0; i < mag.length; i++) {
    
//             //console.log("mag");
//             //console.log(i);
//             var circle = L.circleMarker([lat[0], lon[0]], {
//                 color: marker_color(depth[0]),
//                 //fillColor: '#f03',
//                 fillOpacity: 0.5,
//                 radius: marker_size(mag[0]),
//             }).addTo(myMap);


//     };

//     // var newMarker = L.marker([lat, lon], {
    //     icon: 'circle',
    //     iconSize: [marker_size(mag)],
    //     markerColor: marker_color(depth),
    //   });
    // newMarker.addTo(myMap);

// });

// var info = L.control({
//     position: "bottomright"
//   });

// info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
//   };
//   // Add the info legend to the map.
//   info.addTo(map);
//functions for color and radius
//     var color = "";
//     if (mag[i] > 5) {
//         color = "red";
//     }
//     else if (mag[i] > 3) {
//         color = "orange";
//     }
//     else if (mag[i] > 2) {
//         color = "yellow";
//     }
//     else {
//         color = "green";
//     };
// //feed into circle
// //check is circle or circle marker
//     L.circle([lat[i], lon[i]], {
//         fillOpacity: 0.75,
//         color: "white",
//         fillColor: color,
//         // Adjust the radius.
//         radius: mag[i] * 5
//     }).bindPopup(`<h1>${mag[i]}</h1>`).addTo(myMap);
//   };

// });
