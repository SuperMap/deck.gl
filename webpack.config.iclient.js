const webpack = require('webpack');
const {resolve} = require('path');
const ALISES = require('./aliases');
//
// var ensureModuleMap = {
//     "GL": "webgl/gl-constants.js",
//     "Model": "core/model.js",
//     "Geometry": "geometry/geometry.js",
//     "AnimationLoop": "core/animation-loop.js",
//     "createGLContext": "geometry/geometry.js",
//     "setParameters": "webgl/context-state.js",
//     "withParameters": "webgl/context-state.js",
//     "ShaderCache": "shadertools/lib/shader-cache.js",
//     "Framebuffer": "webgl/framebuffer.js",
//     "fp64": "shadertools/modules/fp64/fp64.js",
//     "fp32": "shadertools/modules/fp32/fp32.js",
//     "TransformFeedback": "webgl/transform-feedback.js",
//     "Buffer": "webgl/buffer.js",
//     "registerShaderModules": "shadertools/lib/shader-modules.js",
//     "setDefaultShaderModules": "shadertools/lib/shader-modules.js",
//     "picking": "shadertools/modules/picking/picking.js"
// };
module.exports = {
  /*  mode: "production",*/
    //  页面入口文件配置
    entry: {
        lib: resolve('./src/bundle.js')
    },
    //  入口文件输出配置
    output: {
        path: resolve('./dist'),
        filename: (function a() {
            console.log("#######################################################################################"); // eslint-disable-line
            return 'deck.gl.js'
        })(),
        library: "deckgl",
        libraryTarget: 'umd'
    },
   /* // 不显示打包文件大小相关警告
    performance: {
        hints: false
    },
    // 是否启用压缩
    optimization: {
        minimize: false
    },*/

    //  其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: Object.assign({}, ALISES, {

            'luma.gl': resolve('./node_modules/luma.gl'),
            'probe.gl': resolve('./node_modules/probe.gl')
        })
    },
    externals: {
        /*'webgl-debug': 'function(){try{return webgl-debug}catch(e){return {}}}()'*/
    },
    module: {
        rules: [
            {
                // Inline shaders
                test: /\.glsl$/,
                exclude: /node_modules/,
                loader(content) {
                    console.log("xxxxxxxxxxxxxxxxxxxxx"); // eslint-disable-line
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
        new webpack.DefinePlugin({
            DECK_VERSION: JSON.stringify(require('./package.json').version)
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
;