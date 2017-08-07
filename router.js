const express = require('express');
const router = express.Router();
const jsr = require('jsrender');
const md = require('mobile-detect');

const grid = require('./mod/grid');

router.get('/leaflet', function (req, res) {
    let _md = new md(req.headers['user-agent']),
        _md_mobile = _md.mobile(),
        _md_tablet = _md.tablet(),
        platform_css,
        tmpl = jsr.templates('./views/main.html');

    if (_md_mobile === null || _md_tablet !== null) {
        platform_css = 'desktop.css';
    } else {
        platform_css = 'mobile.css';
    }

    res.send(tmpl.render({
        engine_css: 'leaflet.css',
        platform_css: platform_css,
        engine_js: 'leaflet.js',
        bundle_js: 'leaflet_bundle.js'
    }));
});

router.get('/openlayers', function (req, res) {
    let _md = new md(req.headers['user-agent']),
        _md_mobile = _md.mobile(),
        _md_tablet = _md.tablet(),
        platform_css,
        tmpl = jsr.templates('./views/main.html');

    if (_md_mobile === null || _md_tablet !== null) {
        platform_css = 'desktop.css';
    } else {
        platform_css = 'mobile.css';
    }

    res.send(tmpl.render({
        engine_css: 'ol.4.css',
        platform_css: platform_css,
        engine_js: 'ol.4.js',
        bundle_js: 'openlayers_bundle.js'
    }));
});

router.get('/q_grid', grid.grid);

module.exports = router;