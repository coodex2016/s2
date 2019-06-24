import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
// #region Http Interceptors
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// #region default language
// 参考：https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd';
import { ALAIN_I18N_TOKEN, DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
// register angular
import { registerLocaleData } from '@angular/common';
// #endregion
// #region i18n services
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18NService } from '../../commons/core';
// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from '../../commons/shared/json-schema/json-schema.module';
import { DelonModule } from './delon.module';
import { CoreModule } from '../../commons/core/core.module';
import { SharedModule } from '../../commons/shared';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes.module';
import { LayoutModule } from '@common/s2/layout/layout.module';
// import { StartupService } from './startup.service';

const LANG = {
    abbr: 'zh',
    ng: ngLang,
    zorro: zorroLang,
    delon: delonLang,
};

registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
    { provide: LOCALE_ID, useValue: LANG.abbr },
    { provide: NZ_I18N, useValue: LANG.zorro },
    { provide: DELON_LOCALE, useValue: LANG.delon },
];

// 加载i18n语言文件
export function I18nHttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

const I18NSERVICE_MODULES = [
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: I18nHttpLoaderFactory,
            deps: [HttpClient],
        },
    }),
];

const I18NSERVICE_PROVIDES = [
    { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
];
// #region

const FORM_MODULES = [JsonSchemaModule];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES = [];
// #endregion

// #region Startup Service
// export function StartupServiceFactory(startupService: StartupService): Function {
//     return () => startupService.load();
// }

const APPINIT_PROVIDES = [
    // StartupService,
    // {
    //     provide: APP_INITIALIZER,
    //     useFactory: StartupServiceFactory,
    //     deps: [StartupService],
    //     multi: true,
    // },
];
// #endregion

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DelonModule.forRoot(),
        CoreModule,
        SharedModule,
        LayoutModule,
        RoutesModule,
        ...I18NSERVICE_MODULES,
        ...FORM_MODULES,
        ...GLOBAL_THIRD_MODULES,
    ],
    providers: [
        ...LANG_PROVIDES,
        ...I18NSERVICE_PROVIDES,
        ...APPINIT_PROVIDES,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
