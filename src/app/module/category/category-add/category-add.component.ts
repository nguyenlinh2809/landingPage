import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CategoryModel } from 'src/app/model/category.model';
import { ResponseModel } from 'src/app/model/response.model';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  modelForm: FormGroup;
  model: CategoryModel;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getCategoryFromId();
  }

  getCategoryFromId(): void {
    const categoryId = this.activedRoute.params
    .subscribe(
      params => {
        if (params.id) {
          this.categoryService.getById(params.id)
            .subscribe(
              (response: ResponseModel<CategoryModel>) => {
                if (response.status === 'ok' && !Array.isArray(response.data)) {
                  this.model = response.data;
                  this.initForm();
                }
              },
              (error: HttpErrorResponse) => {
                this.toastService.showErrorMessage(error.statusText);
              }
            );
        } else {
          this.initModel();
          this.initForm();
        }
      }
    );
  }

  initForm(): void {
    this.modelForm = new FormGroup({
      name: new FormControl(this.model.name, Validators.required),
    });
  }
  initModel(): void {
    this.model = new CategoryModel(null, null, null, null);
  }

  submitForm(): void {
    if (this.modelForm.invalid) {
      return;
    }
    this.model.name = this.modelForm.controls.name.value;
    this.model.code = 'Code';
    this.categoryService.create(this.model).subscribe(
      (response: ResponseModel<CategoryModel>) => {
        if (response.status === 'created') {
          this.router.navigate(['../'], { relativeTo: this.activedRoute });
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.showErrorMessage(error.statusText);
      }
    );
  }
}
