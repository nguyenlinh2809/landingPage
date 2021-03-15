import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { EmailEditorModule } from 'angular-email-editor';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor.component';

const route: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'category/:categoryId/editor-page/:editorId',
        component: EditorPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [EditorComponent, CategoryComponent, EditorPageComponent],
  imports: [
    CommonModule,
    EmailEditorModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class EditorModule { }
