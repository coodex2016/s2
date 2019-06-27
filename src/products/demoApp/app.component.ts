import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ALAIN_I18N_TOKEN, SettingsService, TitleService, VERSION as VERSION_ALAIN } from '@delon/theme';
import { NzModalService, VERSION as VERSION_ZORRO } from 'ng-zorro-antd';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../style-icons-auto';
import { ICONS } from '../../style-icons';
import { globalData } from '@global/global-data';
import { localData } from './local-data';
import { merge as mergeObject } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '@core';


@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `,
})
export class AppComponent implements OnInit {
    constructor(
        el: ElementRef,
        renderer: Renderer2,
        private router: Router,
        iconSrv: NzIconService,
        setting: SettingsService,
        private titleSrv: TitleService,
        private modalSrv: NzModalService,
        private httpClient: HttpClient,
        private translate: TranslateService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    ) {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
        setting.setApp(mergeObject({}, globalData, localData));
        renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
        renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
    }

    ngOnInit() {
        this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
            // TODO 设置当前应用的标题，i18n
            this.titleSrv.setTitle();
            this.modalSrv.closeAll();
        });
        this.i18nHttp();
    }


    i18nHttp() {
        this.httpClient.get(`assets/i18n/${this.i18n.defaultLang}.json`).subscribe(langData => {
                this.translate.setTranslation(this.i18n.defaultLang, langData);
                this.translate.setDefaultLang(this.i18n.defaultLang);
            });
    }
}
