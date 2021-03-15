import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base/base.component';
import { CategoryModel } from 'src/app/model/category.model';
import { ResponseModel } from 'src/app/model/response.model';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent extends BaseComponent<CategoryModel> implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'status', 'action'];
  constructor(
    protected categoryService: CategoryService,
    protected toastService: ToastService,
    protected router: Router,
    protected activedRoute: ActivatedRoute,
  ) {
    super(toastService, categoryService, router, activedRoute);
  }

  ngOnInit(): void {
    this.getList();
  }
  edit(categoryId: number): void {
    this.router.navigate([`../edit/${categoryId}`], { relativeTo: this.activedRoute });
  }
}
