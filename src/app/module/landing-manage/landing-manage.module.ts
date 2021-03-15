import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingManageComponent } from './landing-manage.component';
import { RouterModule, Routes } from '@angular/router';
import { SavedPageComponent } from './saved-page/saved-page.component';
import { CreatedPageComponent } from './created-page/created-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { EmailEditorModule } from 'angular-email-editor';

const route: Routes = [
  {
    path: '',
    component: LandingManageComponent,
    children: [
      {
        path: '',
        redirectTo: 'saved-page',
        pathMatch: 'full'
      },
      {
        path: 'saved-page',
        component: SavedPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: CreatedPageComponent
          },
          {
            path: ':id',
            component: PageDetailComponent
          }
        ]
      },
      {
        path: 'created-page',
        component: CreatedPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [LandingManageComponent, SavedPageComponent, CreatedPageComponent, PageDetailComponent],
  imports: [
    CommonModule,
    ShareModule,
    EmailEditorModule,
    RouterModule.forChild(route)
  ]
})
export class LandingManageModule { }
