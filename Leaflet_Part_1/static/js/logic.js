var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


var myMap = L.map("map", {
    //corrdinates found by googling lat and long of center of usa
    center: [39.8283, -98.5795],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    console.log(data);
    var features = data.features;
    let geometry = features.map(function (x) {
        return x.geometry;
    });
    console.log("geometry");
    console.log(geometry);
    let coordinates = geometry.map(function (x) {
        return x.coordinates;
    });
    console.log(coordinates);
    var depth = []
    let properties = features.map(function (x) {
        return x.properties;
    });
    console.log(properties);
    let mag = properties.map(function (x) {
        return x.mag;
    });
    console.log("mag")
    console.log(mag);
    var lat = []
    var lon = []
    
    for (var i = 0; i < mag.length; i++) {
        let x = coordinates[i];
        depth.push(x[2]);
        lat.push(x[0]);
        lon.push(x[1]);
    };

    console.log("lat");
    console.log(lat[0]);


    function marker_color(x) {
        for (let i = 0; i < x.length; i++) {
            var color = "";
            if (x[i] > 20) {
                color = "red";
            }
            else if (x[i] > 7) {
                color = "orange";
            }
            else if (x[i] > 0) {
                color = "yellow";
            }
            else {
                color = "green";
            };
        };
    };
    function marker_size(x) {
        return x * 500;
    };
    for (var i = 0; i < mag.length; i++) {
    
            //console.log("mag");
            //console.log(i);
            var circle = L.circleMarker([lat[0], lon[0]], {
                color: marker_color(depth[0]),
                //fillColor: '#f03',
                fillOpacity: 0.5,
                radius: marker_size(mag[0]),
            }).addTo(myMap);


    };

    // var newMarker = L.marker([lat, lon], {
    //     icon: 'circle',
    //     iconSize: [marker_size(mag)],
    //     markerColor: marker_color(depth),
    //   });
    // newMarker.addTo(myMap);

});

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
