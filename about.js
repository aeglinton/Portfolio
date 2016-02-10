var map = L.map('map-container', {
    touchZoom: false,
    scrollWheelZoom: false
});
map.setView([35, -60], 3);
L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
                            '<img src="' + feature.properties.url + '" width = "200" />' +
                        '</a>' +
                        "<br>Location: " + feature.properties.place + 
                        "<br>Activity: " + feature.properties.activity + 
                        "<br>Description: " + feature.properties.description;
            layer.bindPopup(popupContent, {
                closeButton: false
            }); }
        });
    dataLayer.addTo(map);
}

$.getJSON("http://aeglinton.github.io/markers/businesses.json", function(data) { addDataToMap(data, map); });