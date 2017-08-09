const express = require('express');
const router = express.Router();
const jsr = require('jsrender');
const md = require('mobile-detect');

const grid = require('./mod/grid');

router.get('/leaflet', function (req, res) {
    let _md = new md(req.headers['user-agent']),
        platform_css = (_md.mobile() === null || _md.tablet() !== null) ?
            'desktop.css' : 'mobile.css';

    res.send(jsr.templates('./views/main.html')
        .render({
            engine_css: 'leaflet.css',
            platform_css: platform_css,
            engine_js: 'leaflet.js',
            bundle_js: 'leaflet_bundle.js'
        }));
});

router.get('/openlayers', function (req, res) {
    let _md = new md(req.headers['user-agent']),
        platform_css = (_md.mobile() === null || _md.tablet() !== null) ?
            'desktop.css' : 'mobile.css';

    res.send(jsr.templates('./views/main.html')
        .render({
            engine_css: 'ol.css',
            platform_css: platform_css,
            engine_js: 'ol.js',
            bundle_js: 'openlayers_bundle.js'
        }));
});

router.get('/my_app', function (req, res) {
    let _md = new md(req.headers['user-agent']),
        platform_css =
            (_md.mobile() === null || _md.tablet() !== null) ?
                'my_desktop.css' : 'my_mobile.css';

    res.send(jsr.templates('./views/my_main.html').render({
        engine_css: 'ol.css',
        platform_css: platform_css,
        engine_js: 'ol.js',
        my_script_js: 'my_script.js'
    }));
});

router.get('/q_grid', grid.grid);

module.exports = router;