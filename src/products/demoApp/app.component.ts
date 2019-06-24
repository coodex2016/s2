import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsService, TitleService, VERSION as VERSION_ALAIN } from '@delon/theme';
import { NzModalService, VERSION as VERSION_ZORRO } from 'ng-zorro-antd';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../style-icons-auto';
import { ICONS } from '../../style-icons';
import { global_data } from '@global/global-data';
import { local_data } from './local_data';


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
    ) {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
        // TODO 真 深拷贝
        setting.setApp(Object.assign({}, global_data, local_data));
        renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
        renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
    }

    ngOnInit() {
        this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
            // TODO 设置当前应用的标题，i18n
            this.titleSrv.setTitle();
            this.modalSrv.closeAll();
        });
    }
}
