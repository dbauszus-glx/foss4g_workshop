const promise = require('bluebird');
const pgp = require('pg-promise')({promiseLib: promise, noWarnings: true});
const db = pgp(process.env.POSTGRES || 'postgres://user:user@localhost:5432/ghs');

function grid(req, res) {
    let q = 'SELECT lon, lat, ' +
        req.query.c + ' c, ' +
        req.query.v + ' v, ' +
        req.query.id + ' id FROM ' +
        req.query.layer + ' WHERE ST_DWithin(ST_MakeEnvelope(' +
        req.query.west + ', ' +
        req.query.south + ', ' +
        req.query.east + ', ' +
        req.query.north + ', 4326), geomcntr, 0) AND ' +
        req.query.c + ' >= 1 LIMIT 10000';
    console.log(q);
    db.any(q)
        .then(function (data) {
            res.status(200).json(data);
        });
}

module.exports = {grid: grid};