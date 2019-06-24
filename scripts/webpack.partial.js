// const webpack = require('webpack');
// const env = process.env.npm_config_apps || process.env.apps;
// const appInfo = env ? Object.assign({}, require(`./src/projects/appInfo`), require(`./src/projects/${env}/appInfo`)) : require(`./src/projects/appInfo`);
// const GeneraterAssetPlugin = require('generate-asset-webpack-plugin');
// let GenAssetPluginArr = [];
// appInfo.i18nLang.forEach((value, index, array) => {
//     let proI18n = require(`./src/projects/${env}/i18n/${value}.json`);
//     let commonI18n = require(`./src/app/common/i18n/${value}.json`);
//     let moduleI18n = {};
//     appInfo.i18nModules.forEach((module, i) => {
//         let cModuleI18n = require(`./src/app/modules/${module}/i18n/${value}.json`);
//         moduleI18n = Object.assign({}, moduleI18n, cModuleI18n);
//     });
//     let defaultI18n = require(`./src/assets/tmp/i18n/${value}.json`);
//     GenAssetPluginArr.push(new GeneraterAssetPlugin({
//         filename: `assets/tmp/i18n/${value}.json`,
//         fn: (compilation, cb) => {
//             cb(null, JSON.stringify(Object.assign({},defaultI18n, commonI18n, moduleI18n, proI18n), null, 2));
//         },
//     }));
// });
// module.exports = {
//     devtool: 'source-map',
//     plugins: [
//         ...GenAssetPluginArr,
//         new webpack.DefinePlugin({ appinfo: JSON.stringify(appInfo) }),
//         new webpack.NamedChunksPlugin()
//     ],
// };
//
//
//


module.exports = {
    devtool: 'source-map',
    plugins: [
        // new webpack.DefinePlugin({ appinfo: JSON.stringify(appInfo) })
    ],
};


