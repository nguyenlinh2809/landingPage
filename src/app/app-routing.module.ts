import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { GlobalLoadingComponent } from './component/global-loading/global-loading.component';
import { LandingComponent } from './component/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./module/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
      },
      {
        path: 'category',
        loadChildren: () => import('./module/category/category.module').then(mod => mod.CategoryModule)
      },
      {
        path: 'editor',
        loadChildren: () => import('./module/editor/editor.module').then(mod => mod.EditorModule)
      },
      {
        path: 'manage',
        loadChildren: () => import('./module/landing-manage/landing-manage.module').then(mod => mod.LandingManageModule)
      }
    ]
  },
  {
    path: '**',
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
