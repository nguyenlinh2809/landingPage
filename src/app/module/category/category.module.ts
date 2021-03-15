import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/share/share.module';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';

const route: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CategoryListComponent
      },
      {
        path: 'add',
        component: CategoryAddComponent
      },
      {
        path: 'edit/:id',
        component: CategoryAddComponent
      }
    ]
  }
];

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent, CategoryAddComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(route)
  ]
})
export class CategoryModule { }
