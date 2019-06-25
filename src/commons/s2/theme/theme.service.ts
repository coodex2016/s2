import { Inject, Injectable } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    defaultTheme: String = 'default';

    constructor(private settings: SettingsService, @Inject(DOCUMENT) private doc: any) {
        this.changeTheme(settings.layout.theme || this.defaultTheme);
    }

    changeTheme(className: string) {
        className = className || 'default';
        if (className === this.settings.layout.theme) {
            return;
        }
        this.settings.layout.theme = className;
        const bodyEl = document.querySelector('app-root');
        const removeArr = [];
        for (let i = 0; i < bodyEl.classList.length; i++) {
            if (bodyEl.classList[i].startsWith('theme-')) {
                removeArr.push(bodyEl.classList[i]);
            }
        }
        if (removeArr.length) bodyEl.classList.remove(...removeArr);
        bodyEl.classList.add(`theme-${className.toLowerCase()}`);
    }
}
