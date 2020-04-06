const path = require('path')
const webpack = require('webpack')
const webpackDev = require('./webpack.dev');
const webpackProd = require('./webpack.prod');

// module.exports = env => {
//     if (env.NODE_ENV === 'development') {
//         return webpackDev;
//     }

//     return webpackProd;
// };