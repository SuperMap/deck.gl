const webpack = require('webpack');
const {resolve} = require('path');
const ALISES = require('./aliases');
const pkg = require('../package.json');
const banner = `
    deck.gl.js (https://github.com/SuperMap/deck.gl.git)
    license: ${pkg.license}
    
    origin: 'https://github.com/uber/deck.gl.git'
    fork: 'https://github.com/SuperMap/deck.gl.git'
    branch: 'https://github.com/SuperMap/deck.gl/tree/deck.gl-for-iclient'

`;

module.exports = {
    //  页面入口文件配置
    entry: {
        lib: resolve('./src/bundle.js')
    },
    //  入口文件输出配置
    output: {
        path: resolve('./dist'),
        filename: (function a() {
            console.log("################package##############"); // eslint-disable-line
            return 'deck.gl.js'
        })(),
        library: "deckgl",
        libraryTarget: 'umd'
    },

    //  其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: Object.assign({}, ALISES, {
            'luma.gl': resolve('./node_modules/luma.gl'),
            'probe.gl': resolve('./node_modules/probe.gl')
        })
    },

    module: {
        rules: [
            {
                // Inline shaders
                test: /\.glsl$/,
                exclude: /node_modules/,
                loader(content) {
                    this.cacheable && this.cacheable(); // eslint-disable-line
                    this.value = content;
                    return "module.exports = " + JSON.stringify(content); // eslint-disable-line
                }
            },    {
                test: /\.js/,
                exclude: /node_modules[\/\\]/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                }
            }]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new webpack.DefinePlugin({
            DECK_VERSION: JSON.stringify(require('./package.json').version)
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};