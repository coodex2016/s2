import { Inject, Injectable, Injector } from '@angular/core';

import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class AppInitService {
    constructor(
        iconSrv: NzIconService,
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private injector: Injector,
    ) {
    }

    load(){
        const tokenData = this.tokenService.get(); // 简单认证
        // const tokenData = this.tokenService.get<JWTTokenModel>(JWTTokenModel); //JWT认证
        if (!tokenData.token) {
            this.injector.get(Router).navigateByUrl(this.tokenService.login_url!); // '/login'
            return;
        }
        const user: any= {
            name: tokenData.name,
            avatar: './assets/tmp/img/avatar.jpg',
            email: tokenData.email,
            token: tokenData.token
        };
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);
        // ACL：设置权限为全量(一般为管理员权限，无限制)
        //this.aclService.setFull(true);
        // setFull(参数)：参数为布尔型为true，否则为false
        // 设置权限
        this.aclService.setFull(typeof tokenData.role === 'boolean' ? tokenData.role : false);// 不为全量，设置权限
        this.aclService.set({ role: [tokenData.role as string] });
        this.menuService.resume();
        // resolve({});
    }
}
