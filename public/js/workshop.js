//map definition
const map = L.map('map', {
    renderer: L.svg(),
    scrollWheelZoom: true,
    //maxBounds: L.latLngBounds(L.latLng(30, -25), L.latLng(72, 47)),
    minZoom: 6,
    maxZoom: 15
}).setView([54, -2], 6);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png').addTo(map);
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png',{pane: 'labels'}).addTo(map);
