// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

var fs = require('fs');

const path = require("path")

require('module-alias/register');

require("@babel/polyfill")

require('@babel/register')({
    ignore: [/\/(build|node_modules)\//],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        'dynamic-import-node'
    ]
});

var conf = require("./conf.dist");

if (fs.existsSync(__dirname + "/conf.js")) {
    let _conf = require(__dirname + "/conf.js");
    conf = {
        ...conf,
        ..._conf
    }
}

if (fs.existsSync(__dirname + "/../../conf/conf.js")) {
    let _conf = require(__dirname + "/../../conf/conf.js");
    if (_conf.installer) {
        conf = {
            ...conf,
            ..._conf.installer
        }
    }
}

module.exports = {
    conf
}
