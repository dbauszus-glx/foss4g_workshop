const map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([-2,55]),
        zoom: 6,
        minZoom: 6,
        maxZoom: 15
    })
});

map.addLayer(new ol.layer.Tile({
    source: new ol.source.OSM({
        url: 'https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png',
        opaque: false,
        attributions: []
    })
}));

//load geojson in case there is no internet connection during the workshop
map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'uk_outline.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(0,0,0,0.1)'}),
        stroke: new ol.style.Stroke({color: '#000', width: 1})
    })
}));

let gridLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
});

map.addLayer(gridLayer);

map.addLayer(new ol.layer.Tile({
    source: new ol.source.OSM({
        url: 'https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png',
        opaque: false,
        attributions: []
    })
}));