import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ALAIN_I18N_TOKEN, SettingsService } from '@delon/theme';
import { InputBoolean } from '@delon/util';
import { I18NService } from '@common/core';
import { ThemeService } from '@common/s2/theme/theme.service';
import { merge as mergeObject } from 'lodash';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'header-theme',
    template: `
        <div nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="menuTpl" [hidden]="!showThemeChange">
            <div *ngIf="showThemeText" nz-dropdown>
                <i nz-icon nzType="skin"></i>
                {{ 'menu.theme' | translate }}
                <i nz-icon nzType="down"></i>
            </div>
            <i *ngIf="!showThemeText" nz-dropdown nz-icon nzType="skin"></i>
        </div>
        <nz-dropdown-menu #menuTpl="nzDropdownMenu">
            <ul nz-menu>
                <li nz-menu-item *ngFor="let item of themes" [nzSelected]="item.key === curCode"
                    (click)="change(item.key)">
                    <span role="img" [attr.aria-label]="item.key" [class]="'theme-'+item.key+' theme-item-lable pr-xs'">
                        <i nz-icon nzType="skin" nzTheme="fill"></i> {{ item.label }}</span>
                </li>
            </ul>
        </nz-dropdown-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderThemeComponent {
    /** Whether to display theme text */
    @Input() @InputBoolean() showThemeText = true;
    _theme = this.settings.app.theme;
    curCode: string = '';
    showThemeChange = true;
    themes = [];

    constructor(private settings: SettingsService, @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService, @Inject(DOCUMENT) private doc: any,
                protected themeService: ThemeService, private message: NzMessageService) {
        let _temp = this._theme.merge ? mergeObject({}, this._theme.options, this._theme.systemTheme) : this._theme.options;
        if (Object.keys(_temp).length == 1) {
            // 最终结果为1个，则不提供换肤功能，并且自动切换到该主题（default失效）
            for (let opt in _temp) {
                this.curCode = opt;
                this.showThemeChange = false;
                themeService.changeTheme(this.curCode);
                break;
            }
        } else if (Object.keys(_temp).length > 1) {
            this.curCode = settings.layout.theme || this._theme.default;
            let curInThemes = false;
            //最终数量大于一个时，提供切换主题功能
            for (let opt in _temp) {
                curInThemes = curInThemes || opt == this.curCode;
                this.themes.push({ key: opt, label: _temp[opt] });
            }
            // 默认主题不再可选的主题范围内
            if (!curInThemes) {
                this.curCode = this.themes[0].key;
                this.message.error('默认主题设置有误,主题将切换为可选主题其中的一种');
            }
            themeService.changeTheme(this.curCode);
        } else {
            this.showThemeChange = false;
        }
    }

    change(type) {
        this.themeService.changeTheme(type);
        this.curCode = type;
    }
}
