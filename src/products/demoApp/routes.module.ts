import { NgModule } from '@angular/core';

import { SharedModule } from '../../commons/shared';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from '@common/s2/layout/default/default.component';
import { DemoComponentComponent } from '@module/demo-module/demo-component/demo-component.component';
import { DemoModuleModule } from '@module/demo-module/demo-module.module';

const COMPONENTS = [
];
const COMPONENTS_NOROUNT = [];


const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        // canActivate: [SimpleGuard],// TODO Guard 使用常量
        children: [
            { path: '', redirectTo: 'demo', pathMatch: 'full' },
            { path: 'demo', component: DemoComponentComponent, data: { title: '仪表盘' } },
            // { path: 'exception', loadChildren: './exception/exception.module#ExceptionModule' },
            // 业务子模块
            // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
        ],
    },
    // // 全屏布局
    // // {
    // //     path: 'fullscreen',
    // //     component: LayoutFullScreenComponent,
    // //     children: [
    // //     ]
    // // },
    // // passport
    // {
    //     path: 'passport',
    //     component: LayoutPassportComponent,
    //     children: [
    //         { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
    //         { path: 'register', component: UserRegisterComponent, data: { title: '注册' } },
    //         { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果' } },
    //         { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
    //     ],
    // },
    // // 单页不包裹Layout
    // { path: 'callback/:type', component: CallbackComponent },
    // { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
    imports: [SharedModule,DemoModuleModule,RouterModule.forRoot(routes)],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
    ],
    exports:[RouterModule],
    entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {
}
