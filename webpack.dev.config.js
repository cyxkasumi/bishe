/**
 * Created by zhu on 2016/10/20.
 */
var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackDevServer=require('webpack-dev-server');
var fs = require('fs');
config.devtool = '#source-map';                             // source-map
config.output.publicPath = '/dist/';                        // 资源路径
config.output.filename = '[name].js';                       // 入口js命名
config.output.chunkFilename = 'js/[name].chunk.js';         // 路由js命名
config.vue = {
    loaders: {
    	 css: ExtractTextPlugin.extract('style-loader', 'css'),
        less: ExtractTextPlugin.extract('vue-style-loader', 'css!less')
    }
};

config.plugins = (config.plugins || []).concat([
    // 提取CSS
    new ExtractTextPlugin("css/[name].css",{ 
            allChunks : true,
            resolve : ['modules']
    }),
    // 提取第三方库
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.HotModuleReplacementPlugin()
]);

var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot:true,
    historyApiFallback: true
});

app.listen(8080);
module.exports = config;