let apps = [];
let envAppStr = process.env.npm_config_apps;
if (envAppStr) {
    apps = envAppStr.split(',');
} else {
    const argv = process.argv;
    for (let i of argv) {
        if (/--apps=((\w+,)*(\w)+)$/g.test(i)) {
            let appArr = i.match(/(\w+,)*(\w)+$/g);
            if (appArr && appArr[0]) {
                apps = appArr[0].split(',');
                break;
            }
        }
    }
}
const spawn = require('child_process').spawn;
let count = 0;
apps.forEach((app, index) => {
    let ls = spawn(`set apps=${app}&&ng build --prod --build-optimizer --baseHref=./ --outputPath=dist/${app}  --extraWebpackConfig scripts/webpack.partial.js  --main src/products/${app}/main.ts`, []/*args*/, { shell: true }/*options, [optional]*/);

    console.time(`${app}运行时间`);
    count ++;
    ls.stdout.on('data', function(data) {
        console.log(`stdout(${app}):` + data);
    });
    ls.stderr.on('data', function(data) {
        console.log(`stderr(${app}):` + data);
    });
    ls.on('exit', function(code) {
        console.log(`child process  exited with code (${app}):` + code);
        console.timeEnd(`${app}运行时间`);
    });

});





