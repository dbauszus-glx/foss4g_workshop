const L = require('./leaflet-src');

function Grid(_this) {

    _this.map.on('movestart', function () {
        if (_this.layer) _this.map.removeLayer(_this.layer);
    });

    _this.map.on('resize', function () {
        if (_this.layer) _this.map.removeLayer(_this.layer);
    });

    _this.map.on('moveend', function () {
        getGridData(_this);
    });

    getGridData(_this);

}

function gridStyle(_f, _layer){
    let dot,
        arrayStyle = _layer.arrayStyle,
        arraySize = _layer.arraySize,
        arrayColor = _layer.arrayColor,
        c = _f.properties.c,
        v = _f.properties.v;

    let size = c < arraySize[1] ? 7 :
        c < arraySize[2] ? 8 :
            c < arraySize[3] ? 9 :
                c < arraySize[4] ? 10 :
                    c <= arraySize[5] ? 11 :
                        c < arraySize[6] ? 12 :
                            c < arraySize[7] ? 14 :
                                c < arraySize[8] ? 16 :
                                    18;

    if (v === null || v === 0 || isNaN(v)) {
        dot = arrayStyle[0];
    } else {
        dot = v < arrayColor[1] ? arrayStyle[0] :
            v < arrayColor[2] ? arrayStyle[1] :
                v < arrayColor[3] ? arrayStyle[2] :
                    v < arrayColor[4] ? arrayStyle[3] :
                        v < arrayColor[5] ? arrayStyle[4] :
                            v < arrayColor[6] ? arrayStyle[5] :
                                v < arrayColor[7] ? arrayStyle[6] :
                                    v < arrayColor[8] ? arrayStyle[7] :
                                        v <= arrayColor[9] ? arrayStyle[8] :
                                            arrayStyle[9];
    }

    return {
        icon: L.icon({
            iconUrl: dot,
            iconSize: size
        }),
        interactive: false
    };
}

function gridLegend(_this){
    let legend_text_v = document.getElementsByClassName('legend_text_v'),
        fractionDigits = 0,
        fractionMinutes = 1;

    if (_this.calcRatio === true) fractionDigits = 2;

    legend_text_v[0].innerHTML = (_this.arrayColor[1] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[1].innerHTML = (_this.arrayColor[2] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[2].innerHTML = (_this.arrayColor[3] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[3].innerHTML = (_this.arrayColor[4] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[4].innerHTML = (_this.arrayColor[5] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[5].innerHTML = (_this.arrayColor[6] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[6].innerHTML = (_this.arrayColor[7] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[7].innerHTML = (_this.arrayColor[8] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});
    legend_text_v[8].innerHTML = (_this.arrayColor[9] * fractionMinutes).toLocaleString('en-GB', {maximumFractionDigits: fractionDigits});

    let legend_text_c = document.getElementsByClassName('legend_text_c');

    legend_text_c[0].innerHTML = _this.arraySize[9].toLocaleString('en-GB', {maximumFractionDigits: 0});
    legend_text_c[1].innerHTML = _this.arraySize[5].toLocaleString('en-GB', {maximumFractionDigits: 0});
    legend_text_c[2].innerHTML = _this.arraySize[0].toLocaleString('en-GB', {maximumFractionDigits: 0});
}

function drawGrid(_this, _data) {
    let avg_c = 0,
        avg_v = 0,
        arrayColor = [],
        arraySize = [],
        n = _data.length,
        dots = {
            type: "FeatureCollection",
            features: []
        };

    for (let i = 0; i < n; i++) {
        let c = parseFloat(_data[i].c),
            v = parseFloat(_data[i].v);

        if (c > 0) {

            if (_this.calcRatio === true && v > 0) {
                v /= c;
                _data[i].v = v;
            }

            let g = {
                    "type": "Point",
                    "coordinates": [_data[i].lon, _data[i].lat]
                },
                p = {
                    "c": c,
                    "v": v,
                    "id": _data[i].id || null
                };

            avg_c += c;
            avg_v += v;

            dots.features.push({
                "geometry": g,
                "type": "Feature",
                "properties": p
            });
        }
    }

    let min = getMath(_data, 'c', 'min'),
        max = getMath(_data, 'c', 'max'),
        avg = avg_c / n,
        step_lower = (avg - min) / 5,
        step_upper = (max - avg) / 4;

    arraySize[0] = min;
    arraySize[1] = min + step_lower;
    arraySize[2] = min + (step_lower * 2);
    arraySize[3] = min + (step_lower * 3);
    arraySize[4] = min + (step_lower * 4);
    arraySize[5] = avg;
    arraySize[6] = avg + step_upper;
    arraySize[7] = avg + (step_upper * 2);
    arraySize[8] = avg + (step_upper * 3);
    arraySize[9] = max;

    _this.arraySize = arraySize;

    if (avg_v > 0) {
        min = getMath(_data, 'v', 'min');
        max = getMath(_data, 'v', 'max');
        avg = avg_v / n;
        step_lower = (avg - min) / 5;
        step_upper = (max - avg) / 4;

        arrayColor[0] = min;
        arrayColor[1] = min + step_lower;
        arrayColor[2] = min + (step_lower * 2);
        arrayColor[3] = min + (step_lower * 3);
        arrayColor[4] = min + (step_lower * 4);
        arrayColor[5] = avg;
        arrayColor[6] = avg + step_upper;
        arrayColor[7] = avg + (step_upper * 2);
        arrayColor[8] = avg + (step_upper * 3);
        arrayColor[9] = max;
    }

    _this.arrayColor = arrayColor;
    //gridLegend(_this);

    if (_this.layer) _this.map.removeLayer(_this.layer);

    _this.layer = new L.geoJson(dots, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, gridStyle(feature, _this));
        }
    }).addTo(_this.map);
}

function getMath(_arr, _key, _type) {
    return Math[_type].apply(null, _arr.map(function (obj) {
        return obj[_key];
    }))
}

function paramString(object) {
    let encodedString = '';
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}

function getGridData(_this){
    let zoom = _this.map.getZoom(),
        zoomKeys = Object.keys(_this.arrayZoom),
        maxZoomKey = parseInt(zoomKeys[zoomKeys.length - 1]);

    zoom > maxZoomKey ?
        _this.grid_layer = _this.arrayZoom[maxZoomKey] :
        zoom < zoomKeys[0] ?
            _this.grid_layer = null :
            _this.grid_layer = _this.arrayZoom[zoom];

    if (_this.grid_layer) {
        let xhr = new XMLHttpRequest(),
            bounds = _this.map.getBounds(),
            requestURL = paramString({
                c: _this.queryCount,
                v: _this.queryValue,
                id: _this.queryID || null,
                layer: _this.grid_layer,
                west: bounds.getWest(),
                south: bounds.getSouth(),
                east: bounds.getEast(),
                north: bounds.getNorth()
            });

        xhr.open('GET', '/q_grid?' + requestURL);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                drawGrid(_this, JSON.parse(xhr.responseText))
            }
        };
        xhr.send();
    }

}

module.exports = Grid;