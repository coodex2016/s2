
// 命令行参数
let app = process.env.npm_config_app;

// npm script 参数
if (!app) {
    const argv = process.argv;
    for (let i of argv) {
        if (/--app=((\w)+)$/g.test(i)) {
            app = i.match(/(\w)+$/g);
            break;
        }
    }
}
const exec = require('child_process').execSync;
exec(`set apps=${app}&& ng serve -o --proxy-config proxy.config.json --extra-webpack-config scripts/webpack.partial.js --plugin ~scripts/webpack.plugin.js`, { stdio: 'inherit' });
