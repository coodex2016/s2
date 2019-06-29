import { SettingsService, _HttpClient, MenuService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
    SocialService,
    SocialOpenType,
    ITokenService,
    DA_SERVICE_TOKEN, JWTTokenModel, ITokenModel,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
// import { StartupService } from '@core';
import { HttpHeaders } from '@angular/common/http';
import { AppInitService } from '@global/appinit.service';

@Component({
    selector: 'sign-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService],
})
export class LoginComponent implements OnDestroy {
    form: FormGroup;
    error = '';
    type = 0;

    constructor(
        fb: FormBuilder,
        modalSrv: NzModalService,
        private router: Router,
        private settingsService: SettingsService,
        private socialService: SocialService,
        @Optional()
        @Inject(ReuseTabService)
        private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private appInitService: AppInitService,
        public http: _HttpClient,
        public msg: NzMessageService,
    ) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true],
        });
        modalSrv.closeAll();
    }

    // #region fields

    get userName() {
        return this.form.controls.userName;
    }

    get password() {
        return this.form.controls.password;
    }

    get mobile() {
        return this.form.controls.mobile;
    }

    get captcha() {
        return this.form.controls.captcha;
    }

    // #endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // #region get captcha

    count = 0;
    interval$: any;


    // #endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.userName.markAsDirty();
            this.userName.updateValueAndValidity();
            this.password.markAsDirty();
            this.password.updateValueAndValidity();
            if (this.userName.invalid || this.password.invalid) return;
        } else {
            this.mobile.markAsDirty();
            this.mobile.updateValueAndValidity();
            this.captcha.markAsDirty();
            this.captcha.updateValueAndValidity();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }
        // 模拟后端数据，真实环境中res数据从后端获取
        const role= this.userName.value == 'admin' ? 'ADMIN':'USER';
        // TODO token从 RuntimeContext 获取
        const token= this.userName.value == 'admin' ? '123456':'654321';
        const name = this.userName.value;
        let res = {
            msg: 'ok',
            user: {
                email: 'lyy230439@gmail.com',
                id: '12345678',
                name: name,
                phone: '18888888888',
                role: role,
                time: '2019-06-30 12:00:00',
                token: token,
            },
        };
        if (res.msg !== 'ok') {
            this.error = res.msg;
            return;
        }


        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.appInitService.load();
        this.router.navigateByUrl('/');
    }

    // #region social

   /* open(type: string, openType: SocialOpenType = 'href') {
        let url = ``;
        let callback = ``;
        if (environment.production) {
            callback = 'https://ng-alain.github.io/ng-alain/#/callback/' + type;
        } else {
            callback = 'http://localhost:4200/#/callback/' + type;
        }
        switch (type) {
            case 'auth0':
                url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
                    callback,
                )}`;
                break;
            case 'github':
                url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
                    callback,
                )}`;
                break;
            case 'weibo':
                url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
                    callback,
                )}`;
                break;
        }
        if (openType === 'window') {
            this.socialService
                .login(url, '/', {
                    type: 'window',
                })
                .subscribe(res => {
                    if (res) {
                        this.settingsService.setUser(res);
                        this.router.navigateByUrl('/');
                    }
                });
        } else {
            this.socialService.login(url, '/', {
                type: 'href',
            });
        }
    }*/

    // #endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
