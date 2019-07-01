import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from '@common/s2/layout/default/default.component';
import { Menu } from '@delon/theme';
import { ACLGuard } from '@delon/acl';
export const menus: Menu[] = [
        {
            text: '演示',
            group: true,
            icon: { type: 'icon', value: 'database' },
            acl: ['ADMIN', 'USER'],
            link: '/demo',
            children: [
                {
                    text: '演示demo',
                    link: '/',
                    icon: { type: 'icon', value: 'appstore' },
                    acl: ['ADMIN', 'USER'],
                },
                {
                    text: '演示child-demo',
                    link: '/demo/child/list',
                    acl: 'ADMIN',
                },
            ],
        }
    ];
const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        // canActivate: [ACLGuard],// TODO Guard 使用常量
        children: [
            { path: '', redirectTo: 'demo', pathMatch: 'full' },
            { path: 'demo', loadChildren: () => import('@module/demo-module/demo-module.module').then(m => m.DemoModuleModule),
                canLoad: [ ACLGuard ],  data: {guard:  ['ADMIN', 'USER'], title: '演示child-demo' }},
           //{ path: 'exception', loadChildren: './exception/exception.module#ExceptionModule' },
            // 业务子模块
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
    { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutesModule {
}
