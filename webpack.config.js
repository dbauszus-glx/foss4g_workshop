const path = require('path');

module.exports = {
    entry: {
        leaflet: './public/js/leaflet_entry.js',
        openlayers: './public/js/openlayers_entry.js',
        my_bundle: './public/js/my_script.js'
    },
    output: {
        filename: 'build/[name]_bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        cacheDirectory: true
                    }
                }
            }
        ]
    }
};
