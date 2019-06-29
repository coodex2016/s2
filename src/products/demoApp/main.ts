import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { environment } from '@env/environment';

import { preloaderFinished } from '@delon/theme';
import { hmrBootstrap } from '../../hmr';
import { Router } from '@angular/router';

preloaderFinished();

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => {
    return platformBrowserDynamic().bootstrapModule(AppModule, {
        defaultEncapsulation: ViewEncapsulation.Emulated,
    }).then((res) => {
        if ((<any>window).appBootstrap) {
            (<any>window).appBootstrap();
        }
        return res;
    });
};

if (environment.hmr) {
    if (module['hot']) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap();
}

