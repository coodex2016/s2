const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const env = process.env.npm_config_apps || process.env.apps;

const i18nConf = require(`../src/products/${env}/i18n/config`);
const GeneraterAssetPlugin = require('generate-asset-webpack-plugin');
let GenAssetPluginArr = [];
(i18nConf['langs'] || ['zh-CN']).forEach((value, index, array) => {
    let proI18n = {};
    if (fs.existsSync(path.join(__dirname, `../src/products/${env}/i18n/${value}.json`))) {
        proI18n = require(`../src/products/${env}/i18n/${value}.json`);
    }
    let commonI18n = {};
    if (fs.existsSync(path.join(__dirname, `../src/commons/s2/i18n/${value}.json`))) {
        commonI18n = require(`../src/commons/s2/i18n/${value}.json`);
    }
    let moduleI18n = {};
    i18nConf['modules'].forEach((module, i) => {
        let cModuleI18n = {};
        if (fs.existsSync(path.join(__dirname, `../src/modules/${module}/i18n/${value}.json`))) {
            cModuleI18n = require(`../src/modules/${module}/i18n/${value}.json`);
        }
        moduleI18n = Object.assign({}, moduleI18n, cModuleI18n);
    });
    GenAssetPluginArr.push(new GeneraterAssetPlugin({
        filename: `assets/i18n/${value}.json`,
        fn: (compilation, cb) => {
            cb(null, JSON.stringify(Object.assign({}, commonI18n, moduleI18n, proI18n), null, 2));
        },
    }));
});
module.exports = {
    devtool: 'source-map',
    plugins: [
        ...GenAssetPluginArr,
        new webpack.DefinePlugin({
            langs: JSON.stringify(i18nConf['langs'] || ['zh-CN']),
            defaultLang: JSON.stringify(i18nConf['defaultLang'] || 'zh-CN'),
        }),
        // new webpack.NamedChunksPlugin()
    ],
};
