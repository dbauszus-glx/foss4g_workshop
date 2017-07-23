const express = require('express');
const router = express.Router();
const jsr = require('jsrender');
// const md = require('mobile-detect');

//const grid = require('./mod/grid');

router.get('/', function (req, res) {
    // let _md = new md(req.headers['user-agent']),
    //     _md_mobile = _md.mobile(),
    //     _md_tablet = _md.tablet(),
    //     tmpl;
    //
    // if (_md_mobile === null || _md_tablet !== null) {
    //     tmpl = jsr.templates('./views/desktop.html');
    // } else {
    //     tmpl = jsr.templates('./views/mobile.html');
    // }

    res.send(jsr.templates('./views/desktop.html').render());
});

// router.get('/q_grid', grid.grid);

module.exports = router;