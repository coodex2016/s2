import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from '@common/s2/layout/default/default.component';
import { DemoComponentComponent } from '@module/demo-module/demo-component/demo-component.component';
import { Menu } from '@delon/theme';


export const menus: Menu[] = [
        {
            text: '流水',
            group: true,
            icon: { type: 'icon', value: 'database' },
            'acl': ['ADMIN', 'USER'],
            children: [
                {
                    text: '停车流水',
                    link: '/stream/parking',
                    acl: ['ADMIN', 'USER'],
                },
                {
                    text: '财务流水',
                    link: '/stream/finance',
                    acl: 'ADMIN',
                },
            ],
        },
        {
            text: '报表',
            icon: { type: 'icon', value: 'database' },
            acl: ['ADMIN', 'USER'],
            children: [
                {
                    text: '停车报表',
                    link: '/report/parking/list',
                    acl: ['ADMIN', 'USER'],
                },
                {
                    text: '财务报表',
                    link: '/report/finance/list',
                    acl: 'ADMIN',
                },
            ],
        },
        /*{
            text: 'DEMO',
            link: '/demo',
            icon: { type: 'icon', value: 'appstore' }
        }*/
    ];
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
            // { path: 'sign', loadChildren: 'src/modules/sign/sign.module#SignModule' },
            // { path: 'stream', loadChildren: 'src/modules/stream/stream.module#StreamModule' },
            // { path: 'report', loadChildren: 'src/modules/report/report.module#ReportModule' },
            { path: 'stream', loadChildren: './../../modules/stream/stream.module#StreamModule' },
            { path: 'report', loadChildren: './../../modules/report/report.module#ReportModule' },

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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutesModule {
}
